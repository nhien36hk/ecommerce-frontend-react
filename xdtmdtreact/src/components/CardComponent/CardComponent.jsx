import React from 'react';
import { Card } from 'antd';
import { StarFilled} from '@ant-design/icons';
import { WrapperStyleTextSell, WrapperPriceText,WrapperDiscountText, StyleNameProduct, WrapperReportText } from './style';
import {useNavigate} from 'react-router-dom';

const { Meta } = Card;

const CardComponent = (props) => {
  const {key,name, type,rating ,price,image ,description ,countInStock, discount, selled} = props
  const navigate = useNavigate();

  const handleNavigateProductDetail = () => {
      navigate('/product-details')
  }

  return (
    <Card
    hoverable
    style={{ width: 200 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
    onClick={handleNavigateProductDetail}
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
