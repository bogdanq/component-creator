import Draggable, { DraggableData } from "react-draggable";
import { useZoom } from "../../../use-zoom";
import { useCallback } from "react";
import { Element, handleChangeElementPosition } from "../../../model";

export const DraggableWrapper = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: Element;
}) => {
  const zoom = useZoom();

  const handleChangePosition = useCallback(
    ({ x, y, lastX, lastY }: DraggableData, id: number, isDragged: boolean) => {
      handleChangeElementPosition({
        position: { x, y },
        id,
        isDragged,
        startPosition: { x: lastX, y: lastY },
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
    >
      {children}
    </Draggable>
  );
};
