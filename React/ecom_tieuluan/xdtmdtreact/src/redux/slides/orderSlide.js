import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const {orderItem} = action.payload;

            //Kiểm tra xem cái sản phẩm đó đẫ có trong giỏ hàng chưa
            //product: productDetails?._id
            //itemOrder sẽ chứa đối tượng sản phẩm trong orderItems 
            //nếu tìm thấy sản phẩm có cùng product ID với sản phẩm mới được thêm
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
            if(itemOrder) {
                itemOrder.amount += orderItem.amount
            }
            else {
                state.orderItems.push(orderItem);
            }
        },
        increaseAmount: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const {idProduct} = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder.amount ++;
        },
        decreaseAmount: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const {idProduct} = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            itemOrder.amount--;
        },
        removeOrderProduct: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const {idProduct} = action.payload;
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
            
            state.orderItems = itemOrder;
        },
        removeAllOrderProduct: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const {idProduct} = action.payload;
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
            
            state.orderItems = itemOrder;
        },
        setOrderItems: (state, action) => {
            state.orderItems = action.payload;
          },
    },
})

export const { addOrderProduct,removeOrderProduct, increaseAmount, decreaseAmount,removeAllOrderProduct,setOrderItems } = orderSlide.actions

export default orderSlide.reducer
