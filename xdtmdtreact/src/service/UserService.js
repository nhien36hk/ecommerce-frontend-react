import axios from 'axios';

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,data)
    return res.data;
}

export const signupUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`, data);
        return res.data;
    } catch (error) {
        // Nếu API trả về lỗi, lấy dữ liệu lỗi từ `error.response.data`
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data); // Trả về dữ liệu lỗi từ server
        }
        throw error;
    }
};

export const getDetailsUser = async (id,access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`,{
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data;
}