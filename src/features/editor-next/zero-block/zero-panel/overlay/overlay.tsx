import { useStore } from "effector-react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { $activeElements, $overlay, Overlay as TOverlay } from "../../../model";
import { ResizablePoints } from "../../../ui";
import { useZoom } from "../../../use-zoom";
import { OutlineSize } from "../element-item";

const Wrapper = styled.div<{ rect: TOverlay }>`
  border: 1.5px solid #8b8bea;
  position: absolute;
  z-index: -1;

  ${({ rect }) => css`
    top: ${rect.minY - 4}px;
    left: ${rect.minX - 4}px;
    height: ${rect.maxY - rect.minY + 8}px;
    width: ${rect.maxX - rect.minX + 8}px;
  `}
`;

export const Overlay = () => {
  const rect = useStore($overlay);
  const activeElements = useStore($activeElements);

  const zoom = useZoom();

  if (activeElements.length < 2) {
    return null;
  }

  return (
    <Wrapper rect={rect}>
      <OutlineSize>
        {rect.maxY - rect.minY} x {rect.maxX - rect.minX}
      </OutlineSize>
      <ResizablePoints
        isActive={!!rect.maxX}
        scale={zoom}
        size={{
          height: rect.maxY - rect.minY + 4,
          width: rect.maxX - rect.minX + 4,
        }}
        enable={{
          bottom: true,
          right: true,
          bottomRight: true,
        }}
      />
    </Wrapper>
  );
};
