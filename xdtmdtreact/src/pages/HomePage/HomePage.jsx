import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct, WrapperSlider, WrapperButtonMore, WrapperProducts } from './style'; // Import WrapperSlider
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import banner1 from '../../accsets/images/banner1.png';
import banner2 from '../../accsets/images/banner2.png'; 
import banner3 from '../../accsets/images/banner3.png'; 
import CardComponent from '../../components/CardComponent/CardComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { Color } from 'antd/es/color-picker';
import {useQuery} from '@tanstack/react-query'
import * as ProductService from '../../service/ProductService';

const HomePage = () => {
    const arr = ['TV', 'Tủ lạnh', 'Máy tính']
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res
    }
    const {data: products} = useQuery(['products'], fetchProductAll, {retry: 3, retryDelay: 1000});    
    console.log('data', products);
    
    return (
        <>
            <div style={{width: '1270px', margin: '0 auto'}}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name = {item} key={item}/>
                        );
                    })}
                </WrapperTypeProduct>
            </div>
            <div className="body" style={{ width: '100%', backgroundColor: '#fefefe' }}>
                <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
                    <SliderComponent arrImages={[banner1,banner2,banner3]} /> 
                    <WrapperProducts>
                        {products?.data?.map((product) => {
                            return <CardComponent 
                                key = {product._id}
                                type = {product.type}
                                rating = {product.rating}
                                price = {product.price}
                                name = {product.name}
                                image = {product.image}
                                description = {product.description}
                                countInStock = {product.countInStock}
                                discount = {product.discount}
                                selled = {product.selled}
                            />
                        })}
                    </WrapperProducts>
                    
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
                            border: '1px solid rgb(11, 116, 229)',
                            color: 'rgb(11, 116, 229)',
                            width: '240px',
                            height: '38px',
                            borderRadius: '4px'
                        }} 
                        styleTextButton={{ fontWeight: 500 }} 
                        />
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default HomePage;
