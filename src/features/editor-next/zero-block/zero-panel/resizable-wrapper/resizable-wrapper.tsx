import { Element, handleChangeElementSize } from "../../../model";
import { useCallback } from "react";
import { useZoom } from "../../../use-zoom";
import { ResizablePoints } from "../../../ui";

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
    <ResizablePoints
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
    </ResizablePoints>
  );
};
