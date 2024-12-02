import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../service/OrderService.js';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading.jsx';
import './MyOrderPage.css'; // Tạo file CSS riêng

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);

  const fetchMyOrders = async () => {
    if (!user?.id || !user?.access_token) {
      throw new Error("User ID hoặc Access Token bị thiếu");
    }
    const res = await OrderService.getMyOrders(user?.id, user?.access_token);
    return res.data; // Trả về danh sách đơn hàng
  };

  const queryOrders = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: fetchMyOrders,
    enabled: !!user?.id && !!user?.access_token,
  });

  const { isLoading, isError, data: orders } = queryOrders;

  if (isLoading) return <Loading isLoading={true} />;
  if (isError) return <div>Lỗi khi lấy danh sách đơn hàng</div>;

  return (
    <div className="order-history-container">
      <h1 className="page-title">Lịch sử đơn hàng</h1>
      {orders?.length ? (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <span className="order-id">Mã đơn: {order._id}</span>
              <span className={`order-status ${order.isDelivered ? 'delivered' : 'pending'}`}>
                {order.isDelivered ? 'Đã giao' : 'Chưa giao'}
              </span>
            </div>
            <div className="order-details">
              <div className="order-products">
                {order.orderItems.map((item) => (
                  <div className="product-item" key={item.product}>
                    <img src={item.image} alt={item.name} className="product-image" />
                    <div className="product-info">
                      <h3 className="product-name">{item.name}</h3>
                      <p className="product-amount">Số lượng: {item.amount}</p>
                      <p className="product-price">
                        Giá: {item.price.toLocaleString('vi-VN')} VND
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-summary">
                <p>Phương thức thanh toán: {order.paymentMethod}</p>
                <p>
                  Địa chỉ giao hàng: {order.shippingAddress.address}, {order.shippingAddress.city}
                </p>
                <p>Thành tiền: {order.totalPrice.toLocaleString('vi-VN')} VND</p>
                <button className="btn-detail">Xem chi tiết</button>
                <button className="btn-reorder">Mua lại</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-orders">Chưa có đơn hàng nào</p>
      )}
    </div>
  );
};

export default MyOrderPage;