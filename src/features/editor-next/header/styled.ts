import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const MenuWrapper = styled.div`
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  height: 70px;
  background-color: rgba(235, 235, 235, 0.85);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 110;
`

export const AddButton = styled.button`
  text-align: center;
  background-image: url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M27 19.2H20.8V13H19.2V19.2H13V20.8H19.2V27H20.8V20.8H27V19.2Z' fill='white'/></svg>");
  width: 40px;
  height: 40px;
  background-color: #329d9d;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 100ms linear;
`

export const Image = styled.img<{ imageActive: boolean }>`
  margin-left: 15px;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.2s;

  ${(p) =>
    p.imageActive &&
    css`
      opacity: 1;
    `}

  &:hover {
    opacity: 1;
  }
`
