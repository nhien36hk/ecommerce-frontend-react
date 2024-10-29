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

const HomePage = () => {
    const arr = ['TV', 'Tủ lạnh', 'Máy tính']
    return (
        <div style={{padding: '0 120px'}}>
            <WrapperTypeProduct>
                {arr.map((item) => {
                    return (
                        <TypeProduct name = {item} key={item}/>
                    );
                })}
            </WrapperTypeProduct>
            <div id='container' style={{backgroundColor:'efefef', padding: '0 120px', height:'160px', width: '100%' }}>
                <SliderComponent arrImages={[banner1,banner2,banner3]} />    
            </div>

            <WrapperProducts>
                <CardComponent />    
                <CardComponent />    
                <CardComponent />    
                <CardComponent />    
                <CardComponent />    
                <CardComponent />    
                <CardComponent />    
            </WrapperProducts>   
           <div style={{width: '100%',display:'flex', justifyContent: 'center', marginTop: '10px' }}>
           <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
                border: '1px solid rgb(11, 116, 229)', Color: 'rgb(11, 116, 229)',
                width: '240px', height: '38px', borderRadius: '4px'
            }}
            styleTextButton={{ fontWeight: 500}} />
           </div>
        </div>
    );
};

export default HomePage;
