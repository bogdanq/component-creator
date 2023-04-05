import Draggable, { DraggableData } from "react-draggable";
import { useZoom } from "../../../use-zoom";
import { useCallback } from "react";
import {
  Element,
  addActiveElement,
  handleChangeElementPosition,
} from "../../../model";

export const DraggableWrapper = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: Element;
}) => {
  const zoom = useZoom();

  const handleChangePosition = useCallback(
    ({ x, y }: DraggableData, id: number, isDragged: boolean) => {
      handleChangeElementPosition({
        x,
        y,
        id,
        isDragged,
      });
    },
    []
  );

  return (
    <Draggable
      handle=".handle"
      defaultPosition={{ x: element.position.x, y: element.position.y }}
      position={{ x: element.position.x, y: element.position.y }}
      scale={zoom}
      onStart={(_, dragData) =>
        handleChangePosition(dragData, element.id, true)
      }
      onDrag={(_, dragData) => handleChangePosition(dragData, element.id, true)}
      onStop={(_, dragData) =>
        handleChangePosition(dragData, element.id, false)
      }
      onMouseDown={() => addActiveElement(element)}
    >
      {children}
    </Draggable>
  );
};
