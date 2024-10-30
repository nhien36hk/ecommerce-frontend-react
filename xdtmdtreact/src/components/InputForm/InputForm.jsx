import React, { useState } from 'react'; 
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';
import { WrapperInputStyle } from './style';

// Styled component cho Input
const StyledInput = styled(AntdInput)`
  border: 1px solid #ddd; // Viền màu xanh
  border-radius: 5px; // Bo góc cho Input
`;

const InputForm = ({ placeholder = 'Nhập text', style }) => {  
  const [valueInput, setValueInput] = useState('');  
  
  const handleChange = (e) => {  // Hàm xử lý khi nhập dữ liệu
    setValueInput(e.target.value);
  };

  return (
    <WrapperInputStyle 
      placeholder={placeholder} 
      value={valueInput}  
      onChange={handleChange}  
      style={style} // Thêm style nếu cần
    />
  );
};

export default InputForm;
