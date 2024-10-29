import React from 'react';
import { Card } from 'antd';
import { StarFilled} from '@ant-design/icons';
import { WrapperStyleTextSell, WrapperPriceText,WrapperDiscountText, StyleNameProduct, WrapperReportText } from './style';
import anh1 from '../../accsets/images/anh1.jpg'; 
import anh2 from '../../accsets/images/anh2.jpg'; 
import anh3 from '../../accsets/images/anh3.jpg'; 
import anh4 from '../../accsets/images/anh4.jpg'; 
import anh5 from '../../accsets/images/anh5.jpg'; 
import anh6 from '../../accsets/images/anh6.jpg'; 
import anh7 from '../../accsets/images/anh7.jpg'; 
import anh8 from '../../accsets/images/anh8.jpg'; 
import anh9 from '../../accsets/images/anh9.jpg'; 
import anh10 from '../../accsets/images/anh10.jpg'; 
import anh11 from '../../accsets/images/anh11.jpg'; 
import anh12 from '../../accsets/images/anh12.jpg'; 
import anh13 from '../../accsets/images/anh13.jpg'; 
import anh14 from '../../accsets/images/anh14.jpg'; 
import anh15 from '../../accsets/images/anh15.jpg'; 

const { Meta } = Card;




const cardData = [
  { image: anh1, title: 'Sản phẩm 1', price: '10.000.000đ' },
  { image: anh2, title: 'Sản phẩm 2', price: '20.000.000đ' },
  { image: anh3, title: 'Sản phẩm 3', price: '20.000.000đ' },
  { image: anh4, title: 'Sản phẩm 4', price: '20.000.000đ' },
  { image: anh5, title: 'Sản phẩm 5', price: '20.000.000đ' },
  { image: anh6, title: 'Sản phẩm 6', price: '20.000.000đ' },
  { image: anh7, title: 'Sản phẩm 7', price: '20.000.000đ' },
  { image: anh8, title: 'Sản phẩm 8', price: '20.000.000đ' },
  { image: anh9, title: 'Sản phẩm 9', price: '20.000.000đ' },
  { image: anh10, title: 'Sản phẩm 10', price: '20.000.000đ' },
  { image: anh11, title: 'Sản phẩm 11', price: '20.000.000đ' },
  { image: anh12, title: 'Sản phẩm 12', price: '20.000.000đ' },
  { image: anh13, title: 'Sản phẩm 13', price: '20.000.000đ' },
  { image: anh14, title: 'Sản phẩm 14', price: '20.000.000đ' },
  { image: anh15, title: 'Sản phẩm 15', price: '20.000.000đ' },



  // Thêm nhiều sản phẩm ở đây
];

const CardComponent = () => {
  return (
    <Card
    hoverable
    headStyle={{width: '200px', height: '200px'}}
    style={{ width: 200 }}
    bodyStyle={{padding:'10px'}}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <StyleNameProduct>Áo nữ</StyleNameProduct>
    <WrapperReportText>
        <span>
          <span>4.96</span><StarFilled style={{fontSize: '10px', color: 'yellow'}} />
        </span>
        <span> | Đã bán 1000+ </span>
    </WrapperReportText>
    <WrapperPriceText>
      100.000đ
      <WrapperDiscountText>
        -5%
      </WrapperDiscountText>
    </WrapperPriceText>
  </Card>
  );
};

export default CardComponent;
