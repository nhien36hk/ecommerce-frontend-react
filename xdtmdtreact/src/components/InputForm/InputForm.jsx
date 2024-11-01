import React, { useState } from 'react'; 
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';
import { WrapperInputStyle } from './style';

const InputForm = (props) => {  
  const {placeholder = 'Nhập text', ...rest} = props;
  const handleOnchangeInput = (e) => {
    props.onChange(e.target.value);
    
  }
  return (
    <WrapperInputStyle 
      placeholder={placeholder} 
      value={props.value}  
      onChange={handleOnchangeInput}  
      style={props.style}
      type={props.type}
    />
  );
};

export default InputForm;
