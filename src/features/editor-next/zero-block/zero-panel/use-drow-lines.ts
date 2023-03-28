import { useStore } from "effector-react";
import { useEffect, useRef } from "react";
import { $activeElements, $intertSectionLines } from "./model";
import { drowLineTo } from "./utils";

/**
хук смотрит линии, у которых есть координаты и циклом их рисует
используя канвас
 */
export const useDrowLines = () => {
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  const intertSectionLines = useStore($intertSectionLines);
  const activeElements = useStore($activeElements);

  useEffect(() => {
    if (!ctx.current) {
      const canvas = document.querySelector(
        ".intersection_lines"
      ) as HTMLCanvasElement;

      ctx.current = canvas?.getContext("2d");
    }

    if (ctx.current) {
      ctx.current.lineWidth = 0.6;
      ctx.current.strokeStyle = "red";
    }

    if (activeElements.length) {
      drowLineTo(intertSectionLines, ctx.current);
    } else {
      drowLineTo([], ctx.current);
    }
  }, [intertSectionLines, activeElements]);
};
