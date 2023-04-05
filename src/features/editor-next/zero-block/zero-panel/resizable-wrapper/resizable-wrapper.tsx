import { Resizable, ResizableProps } from "re-resizable";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Element, handleChangeElementSize } from "../../../model";
import { useCallback } from "react";
import { useZoom } from "../../../use-zoom";

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

export const ResizableWrapper = ({
  children,
  isActive,
  element,
}: {
  children: JSX.Element;
  isActive: boolean;
  element: Element;
}) => {
  const zoom = useZoom();

  const onResize = useCallback((ref: HTMLElement, id: number) => {
    handleChangeElementSize({
      width: parseFloat(ref.style.width),
      height: parseFloat(ref.style.height),
      id,
    });
  }, []);

  return (
    <Wrapper
      isActive={isActive}
      className="handle1"
      size={{
        height: element.dimension.height,
        width: element.dimension.width,
      }}
      onResize={(e, _, ref) => onResize(ref, element.id)}
      scale={zoom}
      enable={{
        bottom: true,
        right: true,
        bottomRight: true,
      }}
    >
      {children}
    </Wrapper>
  );
};
