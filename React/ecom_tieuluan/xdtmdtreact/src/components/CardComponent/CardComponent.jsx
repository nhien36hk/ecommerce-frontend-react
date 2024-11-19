import React from 'react';
import { Card } from 'antd';
import { StarFilled} from '@ant-design/icons';
import { WrapperStyleTextSell, WrapperPriceText,WrapperDiscountText, StyleNameProduct, WrapperReportText } from './style';
import {useNavigate} from 'react-router-dom';

const { Meta } = Card;

const CardComponent = (props) => {
  const {id,name, type,rating ,price,image ,description ,countInStock, discount, selled} = props
  const navigate = useNavigate();

  const handleDetailsProduct = (id) => {
      navigate(`/product-details/${id}`)
  }

  return (
    <Card
    hoverable
    style={{ width: 200 }}
    cover={<img alt="example" src={image} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>}
    onClick={() => handleDetailsProduct(id)}
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
  </Card>
  );
};

export default CardComponent;
