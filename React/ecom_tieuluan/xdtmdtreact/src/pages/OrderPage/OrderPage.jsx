import { Checkbox, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { WrapperPriceDiscount } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import Loading from '../../components/LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlide';



const OrderPage = () => {

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  
  const [listChecked, setListChecked] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const dispatch = useDispatch()  

  const handleChangeCount = (type, idProduct) => {
    if(type === 'increase') {
      dispatch(increaseAmount({idProduct}))
    }
    else{
      dispatch(decreaseAmount({idProduct}))
    }
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({idProduct}))
  }
  
  const handleOnchangeCheckAll = (e) => {
    
  }

  const onChange = (e) => {
    if(listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked);
    }
    else {
      setListChecked([...listChecked, e.target.value])
    }
  };
  
  // Tính tổng tiền khi orderItems thay đổi
  useEffect(() => {
    const total = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    setTotalAmount(total);
  }, [order.orderItems]);

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

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <h4>Phí giao hàng</h4>
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
                    <span style={{ fontSize: '13px', color: '#242424' }}>{order?.price}</span>
                    
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
                  <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{totalPrice}</span>
                  <DeleteOutlined style={{ cursor: 'pointer'}} onClick={() => handleDeleteOrder(order?.product)} />
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
                  <span style={{ fontWeight: 'bold' }}>Địa chỉ của người dùng</span>
                  <span style={{ color: '#9255FD', cursor: 'pointer' }}>Thay đổi</span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 VND</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{totalAmount} VND</span>
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
              onClick={handlePayment}
              textButton ={'Thank toán bằng VNPAY'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      {/* <div title="Cập nhật thông tin giao hàng" open={false}>
        <Loading isLoading={false}>
          <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} autoComplete="on">
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <InputComponent name="name" />
            </Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please input your city!' }]}>
              <InputComponent name="city" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone!' }]}>
              <InputComponent name="phone" />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
              <InputComponent name="address" />
            </Form.Item>
          </Form>
        </Loading>
      </div> */}
    </div>
  );
}

export default OrderPage