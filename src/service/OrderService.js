// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/product/create`,data)
//     return res.data;
// }

import { axiosJWT } from "./UserService";

export const createOder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/order/create`,data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });    
    return res.data
}

export const getOderDetails = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/order/get-order-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });    
    return res.data
}

export const getMyOrders = async (userId, accessToken) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/order/get-my-orders/${userId}`, {
        headers: {
            token: `Bearer ${accessToken}`
        }
    });
    return res.data; // Trả về danh sách đơn hàng
};

