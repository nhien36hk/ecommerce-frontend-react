import axios from 'axios';

export const createPayment = async (data) => {
    try {
        console.log('Payment service sending data:', data);

        const paymentData = {

            orderItems: data.orderItems,
            fullName: data.fullName,
            address: data.address,
            phone: data.phone,
            city: data.city,    
            paymentMethod: data.paymentMethod,
            itemsPrice: data.itemsPrice,
            shippingPrice: data.shippingPrice,
            totalPrice: data.totalPrice,
            user: data.user
        };

        const res = await axios.post(
            `${process.env.REACT_APP_API_URL_BACKEND}/payment/create_payment_url`, 
            paymentData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        );
        return res;
    } catch (error) {
        console.error('Payment service error:', error);
        throw error;
    }
}; 