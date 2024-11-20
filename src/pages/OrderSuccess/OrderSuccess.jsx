import React, { useEffect, useMemo, useState } from 'react';
import { WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo } from './style.js';
import Loading from '../../components/LoadingComponent/Loading.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  WrapperPaymentSection,
  SectionTitle,
  PaymentOptions,
} from './style';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant.js';
import { convertPrice } from '../../utils.js';



const OrderSuccess = () => {
  const location = useLocation();
  const order = useSelector((state) => state.order);
  const { state } = location;

  console.log("location", location);


  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <Loading isLoading={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Đơn đặt hàng thành công</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperPaymentSection>
                <SectionTitle>Phương thức giao hàng</SectionTitle>
                <PaymentOptions>
                  <div>
                    <WrapperValue>
                      <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.deliveryMethod]} </span> Giao hàng tiết kiệm
                    </WrapperValue>
                  </div>
                </PaymentOptions>

                <SectionTitle>Phương thức thanh toán</SectionTitle>
                <PaymentOptions>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </PaymentOptions>
                <WrapperItemOrderInfo>
                  {state.orderItemsSelected?.map((order) => {
                    return (
                      <WrapperItemOrder>
                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>

                          <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                          <div style={{
                            width: 260,
                            overflow: 'hidden'
                          }}>{order?.name}</div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>
                            <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền {convertPrice(order?.price)}</span>

                          </span>

                          <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>Số lương {order?.amount}</span>
                          <span>
                            <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền {convertPrice(order?.price)}</span>

                          </span>

                        </div>
                      </WrapperItemOrder>

                    )
                  })}

                </WrapperItemOrderInfo>
                <div>
                  <span style={{ fontSize: '16px', color: 'red' , fontWeight: 'bold'}}>Tổng tiền {convertPrice(state?.totalPriceMemo)}</span>
                </div>
              </WrapperPaymentSection>
            </WrapperContainer>

          </div>
        </div>
      </Loading>
    </div>
  );
}

export default OrderSuccess