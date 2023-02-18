import styled from '@emotion/styled'

export const Grid = styled.div`
  top: -250vh;
  left: 0;
  position: absolute;
  width: 60px;
  height: 400vh;
  z-index: -1;
  border-left: 1px solid #8b8bea5c;
  border-right: 1px solid #8b8bea5c;
`

export const ContentWrapper = styled.div`
  width: 100%;
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
`
