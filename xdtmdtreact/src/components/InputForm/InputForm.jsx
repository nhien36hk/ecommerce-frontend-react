import React, { useState } from 'react'; 
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';

// Styled component cho Input
const StyledInput = styled(AntdInput)`
  border: 2px solid #87e8de; // Viền màu xanh
  border-radius: 5px; // Bo góc cho Input
`;

const InputForm = ({ placeholder = 'Nhập text', style }) => {  
  const [valueInput, setValueInput] = useState('');  
  
  const handleChange = (e) => {  // Hàm xử lý khi nhập dữ liệu
    setValueInput(e.target.value);
  };

  return (
    <StyledInput 
      placeholder={placeholder} 
      value={valueInput}  
      onChange={handleChange}  
      style={style} // Thêm style nếu cần
    />
  );
};

export default InputForm;
