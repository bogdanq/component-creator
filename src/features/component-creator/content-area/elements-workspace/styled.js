import styled from "@emotion/styled";
import ContentEditableDefault from "react-contenteditable";

export const ContentEditable = styled(ContentEditableDefault)`
  outline: none;
  overflow-wrap: anywhere;
`;

export const Button = styled.div`
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px 10px;
`;

export const Image = styled.img`
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

export const ComputedStyles = styled.span`
  position: absolute;
  background-color: #8b8bea;
  padding: 0px 5px;
  color: #fff;
  font-weight: normal;
  font-size: 12px;
  bottom: -22px;
  left: calc(50% - 30px);
  line-height: 20px;
`;

export const Text = styled.div`
  outline: none;
  overflow-wrap: anywhere;
`;

export const Wrapper = styled.div`
  ${(p) =>
    p.type === "text" &&
    `
      position: absolute !important;
      top: 70px;
      left: 0;
      text-align: left;
      font-size: 20px;
      line-height: 31px;
      font-weight: 400;
      letter-spacing: 0px;
      width: 200px;
      border: 1px solid transparent;
    `}
  ${(p) =>
    p.type === "button" &&
    `
      position: absolute !important;
      text-align: center;
      font-size: 14px;
      line-height: 22px;
      font-family: Arial;
      font-weight: 600;
      letter-spacing: 0px;
      width: 150px;
      height: 40px;
      border: 1px solid transparent;
    `}
  ${(p) =>
    p.type === "image" &&
    `
      width: 200px;
      height: 200px;
      position: absolute !important;
      top: 280px;
      left: 0;
      display: block;
    `}
  ${(p) =>
    p.type === "shape" &&
    `
      width: 100px;
      height: 100px;
      position: absolute !important;
      top: 0px;
      left: 200px;
    `}

  border: ${(p) => (p.isActive ? "1px solid #8b8bea" : "none")};

  ${(p) =>
    p.dubbleActive &&
    `
      border: 1px solid #e5e5ff;
      background: rgba(0, 0, 0, 0.05);
      cursor: text;

      & .react-resizable-handle {
        display: block;
      }
  `}
`;
