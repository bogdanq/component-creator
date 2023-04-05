import { useStore } from "effector-react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { $overlay, Overlay as TOverlay } from "../../../model";

const Wrapper = styled.div<{ rect: TOverlay }>`
  border: 1.5px solid #8b8bea;
  position: absolute;
  z-index: -1;

  ${({ rect }) => css`
    top: ${rect.minY - 2}px;
    left: ${rect.minX - 2}px;
    height: ${rect.maxY - rect.minY + 4}px;
    width: ${rect.maxX - rect.minX + 4}px;
  `}
`;

export const Overlay = () => {
  const rect = useStore($overlay);

  return <Wrapper rect={rect} />;
};
