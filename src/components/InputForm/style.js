import styled from "styled-components";
import { Input as AntdInput } from 'antd'; // Nhập AntdInput

export const WrapperInputStyle = styled(AntdInput)` // Sử dụng AntdInput
    border-top: none;
    border-right: none;
    border-left: none; 
`;
export const StyledInput = styled(AntdInput)`
  border: 1px solid #ddd; // Viền màu xanh
  border-radius: 5px; // Bo góc cho Input
`;