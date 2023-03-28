import { useCallback } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { Resizable } from "re-resizable";
import { useStore } from "effector-react";
import {
  $activeElements,
  $tree,
  addActiveElement,
  handleChangeElementPosition,
  handleChangeElementSize,
} from "./model";
import { useDrowLines } from "./use-drow-lines";
import { useElementOutsideClick } from "./use-element-outside-click";
import { useZoom } from "../../use-zoom";
import { OutlineSize, ElementItem, ElementWrapper } from "./elements";

export const ZeroPanel = () => {
  const tree = useStore($tree);
  const activeElements = useStore($activeElements);

  const zoom = useZoom();

  useDrowLines();
  useElementOutsideClick();

  const onResize = useCallback((ref: HTMLElement, id: number) => {
    handleChangeElementSize({
      width: parseFloat(ref.style.width),
      height: parseFloat(ref.style.height),
      id,
    });
  }, []);

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
    <>
      <canvas
        className="intersection_lines"
        width="1200px"
        height="600px"
        style={{ position: "absolute" }}
      />

      {tree.map((item) => {
        const activeElement = activeElements.find(
          (element) => element.id === item.id
        );

        const isVisibleSize = !!activeElement && !item.position.isDragged;

        return (
          <ElementWrapper
            isActive={!!activeElement}
            isDragged={item.position.isDragged}
            key={item.id}
            style={{
              position: "absolute",
              width: 0,
            }}
            className="zzz"
            data-component-id={item.id}
          >
            <Draggable
              handle=".handle"
              defaultPosition={{ x: item.position.x, y: item.position.y }}
              position={{ x: item.position.x, y: item.position.y }}
              scale={zoom}
              onStart={(_, dragData) =>
                handleChangePosition(dragData, item.id, true)
              }
              onDrag={(_, dragData) =>
                handleChangePosition(dragData, item.id, true)
              }
              onStop={(_, dragData) =>
                handleChangePosition(dragData, item.id, false)
              }
              onMouseDown={() => addActiveElement(item)}
            >
              <Resizable
                className="handle1"
                size={{
                  height: item.dimension.height,
                  width: item.dimension.width,
                }}
                onResize={(e, _, ref) => onResize(ref, item.id)}
                scale={zoom}
                enable={{
                  bottom: true,
                  right: true,
                  bottomRight: true,
                }}
              >
                <ElementItem className="handle" element={item} />
                {isVisibleSize && (
                  <OutlineSize>
                    {item.dimension.height} x {item.dimension.width}
                  </OutlineSize>
                )}
              </Resizable>
            </Draggable>
          </ElementWrapper>
        );
      })}
    </>
  );
};
