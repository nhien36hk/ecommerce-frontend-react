import axios from 'axios';

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,data)
        return res.data;
    } catch (error) {
        if(error.response && error.response.data) {
            return Promise.reject(error.response.data)
        }
        throw error;
    }
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
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`,{
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data;
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data;
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/log-out`)
    return res.data;
}

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`, data,{
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}