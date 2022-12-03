import styled from "@emotion/styled";

export const BoxWrapper = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 10px;
  width: 150px;
  top: 80px;
  background-color: #ebebebd9;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 90px);
  border-radius: 4px;
  z-index: 1;
`;

export const BoxHeader = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 0 18px 0 20px;
`;
