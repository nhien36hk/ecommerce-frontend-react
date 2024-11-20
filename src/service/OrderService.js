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
