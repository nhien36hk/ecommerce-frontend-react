import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';

const SliderComponent = ({ arrImages, style }) => {  // Thêm style vào props
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Hiển thị 4 hình ảnh mỗi lần
    slidesToScroll: 4, // Cuộn 4 hình ảnh mỗi lần
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={style}>  {/* Áp dụng style */}
      <Slider {...settings}>
        {arrImages.map((image, index) => (
          <Image 
            key={index}  // Thêm key duy nhất cho mỗi phần tử
            src={image} 
            alt="slider" 
            style={{ width: '300px', height: '200px', maxHeight: '300px', padding: '10' }} 
            preview={false} 
          />
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
