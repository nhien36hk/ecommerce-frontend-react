import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
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
    priceMemo: 0,
    priceDiscountMemo: 0,
    priceDeliveryMemo: 0,
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const { orderItem } = action.payload;

            //Kiểm tra xem cái sản phẩm đó đẫ có trong giỏ hàng chưa
            //product: productDetails?._id
            //itemOrder sẽ chứa đối tượng sản phẩm trong orderItems 
            //nếu tìm thấy sản phẩm có cùng product ID với sản phẩm mới được thêm
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem.amount
            }
            else {
                state.orderItems.push(orderItem);
            }
        },
        increaseAmount: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            itemOrder.amount++;
            itemOrderSelected.amount++;
        },
        decreaseAmount: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
            itemOrder.amount--;
            itemOrderSelected.amount--;
        },
        removeOrderProduct: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
            const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct);

            state.orderItems = itemOrder;
            state.orderItemsSelected = itemOrderSelected;
        },
        removeAllOrderProduct: (state, action) => {
            //Lấy orderItem trong ProductDetailsComponent có _id để kiểm tra
            const { listChecked } = action.payload;
            const itemOrder = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
            const itemOrderSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product));

            state.orderItems = itemOrder;
            state.orderItemsSelected = itemOrderSelected;
        },
        setOrderItems: (state, action) => {
            state.orderItems = action.payload;
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload;
            state.orderItemsSelected = state.orderItems.filter((order) =>
                listChecked.includes(order.product)
            );
        },
        setTotalPriceMemo: (state, action) => {
            state.totalPriceMemo = action.payload;
        },
        setPriceDeliveryMemo: (state, action) => {
            state.priceDeliveryMemo = action.payload;
        },
        setPriceDiscountMemo: (state, action) => {
            state.priceDiscountMemo = action.payload;
        },
        setPriceMemo: (state, action) => {
            state.priceMemo = action.payload;
        },
    },
})

export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount, removeAllOrderProduct, selectedOrder, setOrderItems,
    setTotalPriceMemo,
    setPriceDeliveryMemo,
    setPriceDiscountMemo,
    setPriceMemo, } = orderSlide.actions

export default orderSlide.reducer
