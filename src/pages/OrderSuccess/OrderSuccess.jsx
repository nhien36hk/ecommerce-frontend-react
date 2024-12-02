import React, { useEffect, useState } from 'react';
import { WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo, WrapperPaymentSection, SectionTitle, PaymentOptions } from './style.js';
import Loading from '../../components/LoadingComponent/Loading.jsx';
import { useLocation, useSearchParams } from 'react-router-dom';
import { convertPrice } from '../../utils.js';
import { orderContant } from '../../contant.js';

const OrderSuccess = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { state } = location;
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        // Xử lý dữ liệu từ URL (VNPAY)
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');
        const paymentMethod = searchParams.get('paymentMethod');
        const orderItemsParam = searchParams.get('orderItems');
        const totalPrice = searchParams.get('totalPrice');

        if (orderItemsParam) {
            try {
                const parsedOrderItems = JSON.parse(decodeURIComponent(orderItemsParam));
                setOrderData({
                    orderItems: parsedOrderItems,
                    paymentMethod,
                    totalPrice: totalPrice,
                    deliveryMethod: 'Giao hàng tiết kiệm'
                });
            } catch (error) {
                console.error('Error parsing order items:', error);
            }
        }
        // Nếu có state (thanh toán tiền mặt), sử dụng state
        else if (state) {
            setOrderData({
                orderItems: state.orderItemsSelected,
                paymentMethod: state.payment,
                totalPrice: state.totalPriceMemo,
                deliveryMethod: state.deliveryMethod
            });
        }
    }, [searchParams, state]);

    if (!orderData) {
        return <Loading isLoading={true} />;
    }

    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <Loading isLoading={loading}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h3>Đơn đặt hàng thành công</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperPaymentSection>
                                <SectionTitle>Phương thức giao hàng</SectionTitle>
                                <PaymentOptions>
                                    <WrapperValue>
                                        <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                                            {orderData.deliveryMethod}
                                        </span>
                                    </WrapperValue>
                                </PaymentOptions>

                                <SectionTitle>Phương thức thanh toán</SectionTitle>
                                <PaymentOptions>
                                    <WrapperValue>
                                        {orderData.paymentMethod === 'vnpay' ? 'Thanh toán VNPAY' : 'Thanh toán khi nhận hàng'}
                                    </WrapperValue>
                                </PaymentOptions>

                                <WrapperItemOrderInfo>
                                    {orderData.orderItems.map((order, index) => (
                                        <WrapperItemOrder key={index}>
                                            <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} alt={order?.name} />
                                                <div style={{ width: 260, overflow: 'hidden' }}>{order?.name}</div>
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    Giá tiền: {convertPrice(order?.price)}
                                                </span>
                                                <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>
                                                    Số lượng: {order?.amount}
                                                </span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    Tổng: {convertPrice(order?.price * order?.amount)}
                                                </span>
                                            </div>
                                        </WrapperItemOrder>
                                    ))}
                                </WrapperItemOrderInfo>

                                <div>
                                    <span style={{ fontSize: '16px', color: 'red', fontWeight: 'bold' }}>
                                        Tổng tiền: {convertPrice(orderData.totalPrice)}
                                    </span>
                                </div>
                            </WrapperPaymentSection>
                        </WrapperContainer>
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default OrderSuccess;