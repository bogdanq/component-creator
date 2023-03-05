import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Elements } from '../../../models'

// @TODO позции елементов на доске, драг родитель для елементов, поэтому тут указаны индексы
// isActive - поднять выбранный елемент по позиции на самый верх
export const Wrapper = styled.div<{ type: Elements; isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  ${({ type }) =>
    type === 'button' &&
    css`
      z-index: 6;
    `}
  ${({ type }) =>
    type === 'text' &&
    css`
      z-index: 5;
    `}
  ${({ type }) =>
    type === 'image' &&
    css`
      z-index: 3;
    `}
  ${({ type }) =>
    type === 'shape' &&
    css`
      z-index: 4;
    `}
  ${({ type }) =>
    type === 'link' &&
    css`
      z-index: 7;
    `}

    ${({ isActive }) =>
    isActive &&
    css`
      z-index: 60;
      opacity: 0.85;
    `}
`
