import { useCallback } from "react";
import DefaultDraggable, {
  DraggableEvent,
  DraggableData,
} from "react-draggable";
import { useZoom } from "../../../hooks";
import {
  Elements,
  Element,
  handleChangeElementPosition,
} from "../../../models";
import { Wrapper } from "./styled";

type Props = {
  children: JSX.Element;
  id: string;
  style: Element["attributes"][1600]["style"];
  disabled: boolean;
  isActive: boolean;
  type: Elements;
};

export function WithDraggable({
  children,
  id,
  style,
  disabled,
  type,
  isActive,
}: Props) {
  const zoom = useZoom();

  const handleChangePosition = useCallback(
    (_: DraggableEvent, { x, y, lastX, lastY }: DraggableData) => {
      handleChangeElementPosition({
        position: { x, y },
        id,
        startPositions: { x: lastX, y: lastY },
      });
    },
    [id]
  );

  return (
    <DefaultDraggable
      defaultPosition={{ x: style.x, y: style.y }}
      position={{ x: style.x, y: style.y }}
      handle=".drag-wrapper"
      onStart={handleChangePosition}
      onDrag={handleChangePosition}
      onStop={handleChangePosition}
      disabled={disabled}
      scale={zoom}
    >
      <Wrapper className={`drag-wrapper`} type={type} isActive={isActive}>
        {children}
      </Wrapper>
    </DefaultDraggable>
  );
}
