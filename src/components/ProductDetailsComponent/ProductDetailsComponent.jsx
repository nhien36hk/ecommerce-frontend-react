import React, { useState } from 'react'
import imageProduct from '../../accsets/images/anh1.jpg'
import { Col, Image, Rate, Row } from 'antd'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { StarFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../service/ProductService'
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slides/orderSlide';

const ProductDetailsComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispact = useDispatch();
  
    const onChange = (value) => { 
      setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (context) => {
      const id = context?.queryKey && context?.queryKey[1];
      if(id) {
        const res = await ProductService.getDetailsProduct(id);
        return res.data;
      }      
    } 
    const { data: productDetails } = useQuery(['product-details',idProduct], fetchGetDetailsProduct, {enabled: !!idProduct});
    console.log('productDetails',productDetails);
    

    const handleChangeCount = (type) => {
      if(type === 'increase') {
        setNumProduct(numProduct + 1)
      }
      else {
        setNumProduct(numProduct - 1)
      }
    }

    const handleAddOrderProduct = () => {
      if(!user?.id) {
        navigate('/sign-in', {state: location?.pathname})
      }
      else {
        dispact(addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id
          }
        }));
      }
    }
    
  return (
    <Row style={{ padding: '16px', background: '#fff' }}>
      <Col span={10} style={{borderRight: "1px solid #e5e5e5", paddingRight: "8px", borderRadius: "4px"}}>
        <Image src={productDetails?.image} alt="image product" preview={false} />
        <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
          <WrapperStyleColImage span={4}>
            <Image src={imageProduct} alt="image small" preview={false} />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image src={imageProduct} alt="image small" preview={false} />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image src={imageProduct} alt="image small" preview={false} />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image src={imageProduct} alt="image small" preview={false} />
          </WrapperStyleColImage>
        </Row>
      </Col>

      <Col span={14} style={{paddingLeft: "10px"}}>
        <WrapperStyleNameProduct>
          {productDetails?.name}
        </WrapperStyleNameProduct>
        <div style={{width: '100%', height:'100px', fontSize: '20px'}}>
          {productDetails?.description}
        </div>
        <div>
          <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/>
          <WrapperStyleTextSell> | Đã bán {productDetails?.countInStock || 200} </WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>{productDetails?.price} đ</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến địa chỉ: </span>
          <span className='address'> {user?.address}</span> -
          <span className='change-address'>Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div style={{ margin: "10px 0 20px", padding: "10px 0", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
          <div style={{marginBottom: "10px"}}>Số lượng</div>
          <WrapperQualityProduct>
            <button style={{ border: "none", background: "transparent", cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
            <WrapperInputNumber onChange={onChange} value={numProduct} size='small' />
            <button style={{ border: "none", background: "transparent", cursor: 'pointer'}} onClick={() => handleChangeCount('increase')}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ButtonComponent
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              border: 'none',
              height: '48px',
              width: '220px',
              borderRadius: '4px'
            }}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            textButton={'Chọn mua'}
            onClick = {handleAddOrderProduct}
          />
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: '#fff',
              border: '1px solid rgb(13, 92, 182)',
              height: '48px',
              width: '220px',
              borderRadius: '4px'
            }}
            styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px', fontWeight: '700' }}
            textButton={'Mua trả sau'}
          />
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetailsComponent