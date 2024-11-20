import { Checkbox, Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperStyleHeaderDilivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { WrapperPriceDiscount } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import Loading from '../../components/LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct, selectedOrder, setTotalPriceMemo, setPriceDeliveryMemo, setPriceDiscountMemo, setPriceMemo } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { Modal } from 'antd';
import { message } from 'antd';
import * as UserService from '../../service/UserService.js';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/Step/StepComponent.js';



const OrderPage = () => {

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const [listChecked, setListChecked] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentDelivery, setCurrentDelivery] = useState(0);
  const [isopenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });


  const dispatch = useDispatch()

  const handleChangeCount = (type, idProduct) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ idProduct }))
    }
    else {
      dispatch(decreaseAmount({ idProduct }))
    }
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }

  const handleOnchangeCheckAll = (e) => {

  }

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked);
    }
    else {
      setListChecked([...listChecked, e.target.value])
    }
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0);
    dispatch(setPriceMemo(result)); // Dispatch to Redux
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + (Number(cur.discount || 0) * Number(cur.amount || 0)); // Đảm bảo số hợp lệ
    }, 0) || 0; // Giá trị mặc định nếu result là undefined hoặc NaN

    dispatch(setPriceDiscountMemo(result)); // Dispatch to Redux
    return result;
  }, [order]);


  const priceDeliveryMemo = useMemo(() => {
    let delivery = 0; // Biến tạm thời để tính toán
    let deliveryPrice = 0; // Giá trị phí giao hàng
  
    if (priceMemo === 0) {
      deliveryPrice = 0;
      delivery = 0;
    } else if (priceMemo > 100000 && priceMemo <= 500000) {
      deliveryPrice = 10000;
      delivery = 2;
    } else if (priceMemo <= 100000) {
      deliveryPrice = 20000;
      delivery = 1;
    } else if (priceMemo > 500000) {
      deliveryPrice = 0;
      delivery = 3;
    }
  
    setCurrentDelivery(delivery); // Cập nhật state
    return deliveryPrice; // Trả về phí giao hàng
  }, [priceMemo]);
  

  console.log("order", order);

  const totalPriceMemo = useMemo(() => {
    const result = Number(priceMemo) - Number(priceDiscountMemo) + Number(priceDeliveryMemo);
    dispatch(setTotalPriceMemo(result)); // Dispatch to Redux
    dispatch(setPriceDeliveryMemo(priceDeliveryMemo)); // Dispatch to Redux
    return result;
  }, [priceMemo, priceDiscountMemo, priceDeliveryMemo]);


  // Tính tổng tiền khi orderItems thay đổi
  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked]);

  useEffect(() => {
    if (isopenModalUpdateInfo) {
      setStateUderDetails({
        ...stateUserDetails,
        city: user?.city || '',
        name: user?.name || '',
        address: user?.address || '',
        phone: user?.phone || '',
      });
    }
  }, [isopenModalUpdateInfo]);

  useEffect(() => {
    if (listChecked && listChecked.length > 0) {
      dispatch(selectedOrder({ listChecked }));
    }
  }, [listChecked, dispatch]);


  useEffect(() => {
    if (form && stateUserDetails) {
      form.setFieldsValue(stateUserDetails);
    }
  }, [form, stateUserDetails]);

  // Hàm xử lý thanh toán
  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payment/create_payment_url', {
        method: 'POST',
        body: JSON.stringify({
          vnp_Version: '2.1.0',                       // Phiên bản của VNPAY
          vnp_Command: 'pay',                         // Lệnh thanh toán
          vnp_TmnCode: '2TZHSPUE',               // Mã website của bạn trên VNPAY
          vnp_Amount: totalAmount * 100,              // Số tiền thanh toán (tính theo đơn vị VND * 100)
          vnp_BankCode: null,                         // Để null nếu cho phép người dùng chọn ngân hàng
          vnp_OrderInfo: 'Thanh toán đơn hàng',       // Thông tin mô tả đơn hàng
          vnp_OrderType: 'billpayment',               // Loại giao dịch (ví dụ: billpayment)
          vnp_Locale: 'vn',                           // Ngôn ngữ hiển thị (vn cho tiếng Việt, en cho tiếng Anh)
          vnp_ReturnUrl: 'http://localhost:3001/vnpay_return', // URL trả về sau khi thanh toán
          vnp_IpAddr: '127.0.0.1',                    // Địa chỉ IP của người dùng
          vnp_CreateDate: new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14) // Ngày giờ tạo giao dịch (YYYYMMDDHHMMSS)
        })
      });

      const paymentUrl = await response.text(); // Nhận URL thanh toán từ API
      window.location.href = paymentUrl; // Chuyển hướng đến URL của VNPAY
    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
    }
  };

  const handelAddCard = () => {
    if (!order?.orderItemsSelected?.length) {
      message.error('Vui lòng chọn sản phẩm!');
    } else if (!user.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate('/payment', {
        state: { orderItemsSelected: [...order.orderItemsSelected] }, // Sao chép dữ liệu
      });
    }
  };

  const handleChangeAddress = () => {
    console.log('User info:', user); // Xác minh dữ liệu người dùng
    if (!order?.orderItemsSelected?.length) {
      message.error('Vui lòng chọn sản phẩm!')
    } else {
      if (!user.phone || !user.address || !user.name || user.city) {
        setIsOpenModalUpdateInfo(true);
      }
    }
  }



  const handleCancelUpdate = () => {
    setStateUderDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }

  const handelUpdateInfoUser = async () => {
    try {
      // Kiểm tra tất cả các trường trong form
      const values = await form.validateFields();
      console.log('Validated values:', values);

      const { name, city, phone, address } = stateUserDetails;

      if (name && city && phone && address) {
        // Gọi API cập nhật thông tin người dùng
        await UserService.updateUser(user?.id, { name, city, phone, address }, user?.access_token);

        // Nếu không lỗi, thông báo thành công và đóng modal
        message.success('Thông tin đã được cập nhật!');
        setIsOpenModalUpdateInfo(false); // Đóng modal
      }
    } catch (error) {
      // Nếu có lỗi, thông báo cho người dùng
      console.error('Validation failed:', error);
      message.error('Vui lòng điền đầy đủ thông tin!');
    }
  };


  const handleOnchangeDetails = (e) => {
    setStateUderDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: "Dưới 100.000 VND",
    },
    {
      title: '10.000 VND',
      description: "Trên 100.000 VND",
    },
    {
      title: '0 VND',
      description: "Trên 500.000 VND",
    },
  ]

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <h4>Phí giao hàng</h4>
            <WrapperStyleHeader>
              <StepComponent items={itemsDelivery} current={Number(currentDelivery)}>
              </StepComponent>
            </WrapperStyleHeader>
            <WrapperStyleHeaderDilivery>
              {/* <StepComponent items={itemsDelivery} /> */}
            </WrapperStyleHeaderDilivery>
            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <CustomCheckbox onChange={handleOnchangeCheckAll}></CustomCheckbox>
                <span> Tất cả {order?.orderItems?.length} sản phẩm</span>
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                const price = Number(order?.price);
                const totalPrice = price * order?.amount;
                return (
                  <WrapperItemOrder>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Checkbox onChange={onChange} value={order?.product}></Checkbox>
                      <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div style={{
                        width: 260,
                        overflow: 'hidden'
                      }}>{order?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>

                      </span>
                      <WrapperCountOrder>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product)}>
                          <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                        <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product)}>
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                      </WrapperCountOrder>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(totalPrice)}</span>
                      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`}</span>
                  <span onClick={handleChangeAddress} style={{ color: '#9255FD', cursor: 'pointer' }}>Thay đổi</span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{`${priceDiscountMemo} %`}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDeliveryMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px',
              }}
              onClick={handelAddCard}
              textButton={'Mua hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <Modal
        title="Cập nhật thông tin giao hàng"
        visible={isopenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handelUpdateInfoUser} // Gọi hàm kiểm tra khi nhấn OK
      >
        <Loading isLoading={false}>
          <Form
            form={form} // Gắn instance của form vào đây
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            autoComplete="on"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent
                value={form.getFieldValue('city')}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Please input your phone!' },
                { pattern: /^[0-9]{10,11}$/, message: 'Invalid phone number!' },
              ]}
            >
              <InputComponent
                value={form.getFieldValue('phone')}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <InputComponent
                value={form.getFieldValue('address')}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
}

export default OrderPage