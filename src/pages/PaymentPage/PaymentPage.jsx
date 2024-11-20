import { Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { WrapperInfo, WrapperLeft, WrapperRight, WrapperTotal } from './style.js';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.jsx';
import InputComponent from '../../components/InputComponent/InputComponent.jsx';
import Loading from '../../components/LoadingComponent/Loading.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllOrderProduct, selectedOrder } from '../../redux/slides/orderSlide.js';
import { convertPrice } from '../../utils.js';
import { Modal } from 'antd';
import { message } from 'antd';
import * as UserService from '../../service/UserService.js';
import * as OrderService from '../../service/OrderService.js';
import { useMutationHooks } from '../../hooks/useMutationHook.js';
import {
  WrapperPaymentSection,
  SectionTitle,
  PaymentOptions,
  PaymentOption,
  PaymentButton,
} from './style';
import { useLocation, useNavigate } from 'react-router-dom';



const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const orderItemsSelected =
    location.state?.orderItemsSelected?.length > 0
      ? location.state.orderItemsSelected
      : order.orderItemsSelected;
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [deliveryMethod, setDeliveryMethod] = useState('fast'); // Lưu phương thức giao hàng
  const [payment, setPayment] = useState('later_money'); // Mặc định là Thanh toán khi nhận hàng


  const [listChecked, setListChecked] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isopenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const totalPriceMemo = order.totalPriceMemo;
  const priceDeliveryMemo = order.priceDeliveryMemo;
  const priceDiscountMemo = order.priceDiscountMemo;
  const priceMemo = order.priceMemo;

  const mutationAddOrder = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = OrderService.createOder(
        { ...rests }, token)
      return res
    },
  )

  const {data: dataAdd, isLoading: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder;


  const handleDeliveryChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };


  const dispatch = useDispatch()
  useEffect(() => {
    if (location.state?.orderItemsSelected?.length > 0) {
      dispatch(
        selectedOrder({
          listChecked: location.state.orderItemsSelected.map((item) => item.product),
        })
      );
    }
  }, [location.state, dispatch]);

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

  console.log('orderItemsSelected:', orderItemsSelected);

  const handleAddOrder = () => {
    if (user?.access_token && orderItemsSelected && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
      mutationAddOrder.mutate({ token: user?.access_token, orderItems: orderItemsSelected, fullName: user?.name, address: user?.address, phone: user?.phone, city: user?.city, paymentMethod: payment, itemsPrice: priceMemo, shippingPrice: priceDeliveryMemo, totalPrice: totalPriceMemo, user: user?.id }, {
        onSuccess: () => {
          const arrayOrdered = [];
          orderItemsSelected.forEach(element => {
            arrayOrdered.push(element.product)
          });
          dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
          message.success("Đặt hàng thành công!")
          navigate('/ordersuccess', {
            state: { deliveryMethod, payment, orderItemsSelected, totalPriceMemo}, // Sao chép dữ liệu
          });
        }
      })
    }
  };

  console.log("order", order, user);

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

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <Loading isLoading={isLoadingAddOrder}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Thanh toán</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperLeft>
              <WrapperPaymentSection>
                <SectionTitle>Chọn phương thức giao hàng</SectionTitle>
                <PaymentOptions>
                  <PaymentOption>
                    <input
                      type="radio"
                      name="delivery"
                      value="FAST"
                      checked={deliveryMethod === 'FAST'}
                      onChange={handleDeliveryChange}
                    />
                    FAST Giao hàng tiết kiệm
                  </PaymentOption>
                  <PaymentOption>
                    <input
                      type="radio"
                      name="delivery"
                      value="GO_JEK"
                      checked={deliveryMethod === 'GO_JEK'}
                      onChange={handleDeliveryChange}
                    />
                    GO_JEK Giao hàng tiết kiệm
                  </PaymentOption>
                </PaymentOptions>

                <SectionTitle>Chọn phương thức thanh toán</SectionTitle>
                <PaymentOptions>
                  <PaymentOption>
                    <input
                      type="radio"
                      name="payment"
                      value="later_money"
                      checked={payment === 'later_money'}
                      onChange={handlePaymentChange}
                    />
                    Thanh toán tiền mặt khi nhận hàng
                  </PaymentOption>
                </PaymentOptions>
              </WrapperPaymentSection>
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
                onClick={handleAddOrder}
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
      </Loading>
    </div>
  );
}

export default OrderPage