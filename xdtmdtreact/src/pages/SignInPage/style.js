import styled from "styled-components";

export const WrapperLoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Chiều cao chiếm toàn bộ màn hình */
  background-color: #f0f2f5; /* Nền nhẹ nhàng */
`;

export const WrapperContainerLeft = styled.div`
  padding: 40px; /* Tăng padding cho khung */
  background-color: #fff; /* Nền trắng */
  border-radius: 15px; /* Bo góc */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
  width: 350px; /* Chiều rộng cố định */
  border: 2px solid #87e8de; /* Viền màu xanh */
`;

export const WrapperContainerRight = styled.div`
  /* Phần này có thể để trống hoặc thêm hình ảnh */
`;
