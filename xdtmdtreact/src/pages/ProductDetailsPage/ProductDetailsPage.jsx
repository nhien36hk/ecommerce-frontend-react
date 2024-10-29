import React from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'; 
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';
const ProductDetailPage = () => {
  return (
    <div style={{padding: '0 120px', background: '#efefef', height: '1000px'}}>
      <h5>Trang chủ</h5>
        <ProductDetailsComponent />
    </div>
  );
};

export default ProductDetailPage;
