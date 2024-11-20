import styled from "styled-components";

export const WrapperLoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Chiều cao chiếm toàn bộ màn hình */
  background-color: #f0f2f5; /* Nền nhẹ nhàng */
`;

export const WrapperContainerLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 45px 24px; /* Tăng padding cho khung */
  background-color: #fff; /* Nền trắng */
  border-radius: 15px; /* Bo góc */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
  width: 350px; /* Chiều rộng cố định */
`;

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const WrapperTextLight = styled.span`
  color: rgb(13, 92, 182);
  font-size: 13px;
`
