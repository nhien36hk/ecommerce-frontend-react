import React from 'react';
import { Card } from 'antd';
import { StarFilled} from '@ant-design/icons';
import { WrapperStyleTextSell, WrapperPriceText,WrapperDiscountText, StyleNameProduct, WrapperReportText, WrapperCardStyle } from './style';
import {useNavigate} from 'react-router-dom';

const { Meta } = Card;

const CardComponent = (props) => {
  const {id,name, type,rating ,price,image ,description ,countInStock, discount, selled} = props
  const navigate = useNavigate();

  const handleDetailsProduct = (id) => {
      navigate(`/product-details/${id}`)
  }

  return (
    <WrapperCardStyle
    hoverable
    style={{ width: 200 }}
    cover={<img alt="example" src={image} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>}
    onClick={() => countInStock !== 1 && handleDetailsProduct(id)}
    disabled = {countInStock===0}
  >
    <StyleNameProduct>{name}</StyleNameProduct>
    <WrapperReportText>
        <span>
          <span>{rating}</span><StarFilled style={{fontSize: '10px', color: 'yellow'}} />
        </span>
        <span> | Đã bán {selled || 200} </span>
    </WrapperReportText>
    <WrapperPriceText>
      <span style={{marginRight:'8px'}}>{price}</span>
      <WrapperDiscountText>
        {discount || -5} %
      </WrapperDiscountText>
    </WrapperPriceText>
  </WrapperCardStyle>
  );
};

export default CardComponent;
