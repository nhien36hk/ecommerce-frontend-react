import React from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import CardComponent from '../CardComponent/CardComponent';
import { Col, Row } from 'antd';
const TypeProduct = ({name}) => {
  return (
    <div style={{padding:'0 10px'}}>
      {name}
    </div>
  );
};

export default TypeProduct;
