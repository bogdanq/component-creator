export type ElementTypes = "text" | "button" | "shape" | "image" | "link";

export type Element = {
  type: ElementTypes;
  id: number;
  position: { x: number; y: number; isDragged?: boolean };
  dimension: {
    width: number;
    height: number;
  };
};

export type InterSectionLines = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type ElementResizeParams = {
  id: number;
  width: number;
  height: number;
};

export type Overlay = {
  maxX: number;
  maxY: number;
  minY: number;
  minX: number;
};
