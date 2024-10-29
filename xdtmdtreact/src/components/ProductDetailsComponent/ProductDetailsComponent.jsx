import React from 'react'
import imageProduct from '../../accsets/images/anh1.jpg'
import { Col, Image, Row } from 'antd'
import { WrapperStyleColImage } from './style'

const ProductDetailsComponent = () => {
  return (
    <Row style={{padding: '16px', background: '#fff'}}>
      <Col span={10}>
        <Image src={imageProduct} alt = "image product" preview = {false} />
        <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
          <WrapperStyleColImage span={4}>
            <Image src={imageProduct} alt = "image small" preview = {false}/>
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image src={imageProduct} alt = "image small" preview = {false} />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image src={imageProduct} alt = "image small" preview = {false}/>
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image src={imageProduct} alt = "image small" preview = {false} />
          </WrapperStyleColImage>
        </Row>
      </Col>

      <Col span = {14}>
      test
      </Col>
    </Row>
  )
}

export default ProductDetailsComponent