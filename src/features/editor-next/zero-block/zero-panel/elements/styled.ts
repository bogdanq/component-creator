import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ContentEditableDefault from "react-contenteditable";

export const ContentEditable = styled<any>(ContentEditableDefault)`
  outline: none;
  overflow-wrap: anywhere;
`;

export const Button = styled(ContentEditable)<{ hoverStyles?: string }>`
  color: rgb(255, 255, 255);
  background-color: rgb(0, 0, 0);
  opacity: 1;
  border-radius: 30px;
  border-color: transparent;
  border-style: solid;
  border-width: 0;
  transition: background-color 0.2s ease-in-out 0s, color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;
  outline: none;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 10px;
  transition: all 0.3s;
  align-items: center;

  ${({ hoverStyles }) => {
    if (hoverStyles) {
      return css`
        &:hover {
          ${hoverStyles}
        }
      `;
    }
  }}
`;

export const Image = styled.div`
  opacity: 1;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
  width: 100%;
  height: 100%;
  display: block;
`;

export const Shape = styled.div`
  background-color: beige;
  width: 100%;
  height: 100%;
`;

export const Link = styled(ContentEditable)`
  width: 100%;
  text-decoration: none;
  cursor: pointer;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled(ContentEditable)`
  outline: none;
  overflow-wrap: anywhere;
  /* height: 100%; */
`;

export const OutlineSize = styled.span<{ isActive?: boolean }>`
  cursor: ${(p) => (p.isActive ? "grab" : "")};
  position: absolute;
  background-color: #8b8bea;
  padding: 0px 5px;
  color: #fff;
  font-weight: normal;
  font-size: 12px;
  bottom: -22px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  left: calc(50% - 40px);
  line-height: 20px;
  width: 80px;
`;

export const TextRelative = styled.span`
  position: absolute;
  color: #8b8bea;
  font-weight: normal;
  font-size: 12px;
  top: -22px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  left: 0;
  line-height: 20px;
`;

export const ElementWrapper = styled.div<{
  isActive: boolean;
  isDragged?: boolean;
}>`
  position: absolute;
  width: 0;

  &:hover .handle1 {
    ${({ isDragged }) =>
      !isDragged &&
      css`
        border: 1px solid #8b8bea;
      `}
  }

  ${({ isActive, isDragged }) =>
    isActive &&
    !isDragged &&
    css`
      & .handle1 {
        border: 1px solid #8b8bea;
      }
    `}

  ${({ isDragged }) =>
    isDragged &&
    css`
      & .handle1 {
        border: 1px solid transparent;
      }
    `}
`;
