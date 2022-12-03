import styled from "@emotion/styled";

export const BoxWrapper = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 10px;
  width: 320px;
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

export const PanelItem = styled.div`
  position: relative;
  padding: 15px;
  background-color: #f5f5f5c4;
  border-radius: 3px;
  margin: 0 5px 5px 5px;
`;
