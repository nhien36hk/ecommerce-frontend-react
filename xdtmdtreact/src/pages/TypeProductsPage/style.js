import styled from "styled-components";
import { Col } from "antd"; // Chỉ cần nhập Col ở đây

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 115px; /* Giảm gap để phù hợp với giao diện hẹp hơn */
    justify-content: flex-start;
    border-bottom: 3px solid #5cdbd3;
    border-top: 3px solid #ffffff;
    font-size: 18px;  
    font-family: 'Dancing Script', cursive;
    color: #000;
    background-color: #f6ffed; 
    padding: 10px 0; 
    margin-bottom: 20px; 
`;

export const WrapperNavbar = styled(Col)`
    background: #e6fffb; 
    margin-right: 20px; 
    padding: 10px; 
    border-radius: 6px; 
    height: fit-content; 
`;

export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top:20px;
    flex-wrap: wrap;
`
