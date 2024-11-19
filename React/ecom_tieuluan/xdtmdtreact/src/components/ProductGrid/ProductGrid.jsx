// src/components/ProductGrid.js
import React from 'react';
import { Row, Col } from 'antd'; // Nhập các component Row, Col từ Ant Design
import CustomCard from './CardComponent/CardComponent'; // Nhập CustomCard

const ProductGrid = () => {
  // Tạo một mảng giả lập các sản phẩm
  const products = Array.from({ length: 25 }, (_, index) => ({ id: index, name: `Sản phẩm ${index + 1}` }));

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col span={4} key={product.id}> {/* Mỗi cột chiếm 4 ô (12 ô = 1 hàng) */}
          <CustomCard productName={product.name} /> {/* Truyền tên sản phẩm */}
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
