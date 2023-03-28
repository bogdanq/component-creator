import styled from "@emotion/styled";

export const ZeroBlockWrapper = styled.div`
  width: 1200px;
  height: 600px;
  text-align: center;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 0px 8px 12px #6c757c33;
  z-index: 0;
  background-attachment: scroll;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  & > .react-resizable-handle {
    display: block;
  }
`;
