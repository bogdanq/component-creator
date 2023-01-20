import styled from '@emotion/styled/macro'

export const Close = styled.div`
  position: absolute;
  background: #565656;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s;
`

export const Guide = styled.div`
  display: block;
  background-color: transparent;
  position: absolute;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${Close} {
      opacity: 1;
    }
  }
`

export const GuideVertical = styled(Guide)`
  width: 6px;
  height: 100vh;
  left: 400px;
  cursor: col-resize;

  ${Close} {
    top: 200px;
    left: -9px;
  }
`

export const GuideHorizontal = styled(Guide)`
  width: 100vw;
  height: 6px;
  top: 300px;
  cursor: row-resize;

  ${Close} {
    top: -9px;
    left: 200px;
  }
`

export const GuideItemVertical = styled.div`
  background-color: red;
  width: 1px;
  height: 100vh;
`

export const GuideItemHorizontal = styled.div`
  background-color: red;
  height: 1px;
  width: 100vw;
`
