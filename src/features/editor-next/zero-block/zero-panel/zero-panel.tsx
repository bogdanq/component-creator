import { useStore } from "effector-react";
import { $activeElements, $tree } from "../../model";
import { useDrowLines } from "./use-drow-lines";
import { useElementOutsideClick } from "./use-element-outside-click";
import { OutlineSize, ElementItem, ElementWrapper } from "./element-item";
import { Overlay } from "./overlay";
import { ResizableWrapper } from "./resizable-wrapper";
import { DraggableWrapper } from "./draggable-wrapper";

export const ZeroPanel = () => {
  const tree = useStore($tree);
  const activeElements = useStore($activeElements);

  useDrowLines();
  useElementOutsideClick();

  return (
    <>
      <Overlay />
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
            data-component-id={item.id}
          >
            <DraggableWrapper element={item}>
              <div>
                <ResizableWrapper isActive={!!activeElement} element={item}>
                  <>
                    <ElementItem element={item} />

                    {isVisibleSize && (
                      <OutlineSize>
                        {item.dimension.height} x {item.dimension.width}
                      </OutlineSize>
                    )}
                  </>
                </ResizableWrapper>
              </div>
            </DraggableWrapper>
          </ElementWrapper>
        );
      })}
    </>
  );
};
