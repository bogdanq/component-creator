import { Resizable, ResizableProps } from "re-resizable";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

//@ts-ignore
const Wrapper = styled(Resizable)<ResizableProps & { isActive: boolean }>`
  ${({ isActive }) =>
    isActive &&
    css`
      &:after {
        content: "";
        position: absolute;
        background: #fff;
        border: 1px solid #8b8bea;
        right: -7px;
        width: 10px;
        height: 10px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
      }

      &:before {
        content: "";
        position: absolute;
        background: #fff;
        border: 1px solid #8b8bea;
        left: 50%;
        width: 10px;
        height: 10px;
        bottom: -7px;
        transform: translateX(-50%);
        pointer-events: none;
      }
    `}
`;

type Props = {
  isActive: boolean;
  children?: JSX.Element;
} & ResizableProps;

export const ResizablePoints = ({ children, isActive, ...rest }: Props) => {
  return (
    <Wrapper isActive={isActive} {...rest}>
      {children}
    </Wrapper>
  );
};
