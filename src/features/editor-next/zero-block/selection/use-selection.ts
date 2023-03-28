import { useCallback, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";
import { useZoom } from "../../use-zoom";
import { addActiveElementsBySelection } from "../zero-panel";

const VIEWPORT_POSITION = 10;

/**
Хук позволяет двигать доску вслед за направлением мышки
(стороной нарисованной области выделения)
*/
const useAsixScrollZeroBlock = () => {
  const flow = useReactFlow();
  const timerId = useRef<undefined | NodeJS.Timer>(undefined);

  const handleChangeAsix = useCallback(
    (e: MouseEvent) => {
      if (e.pageX + 1 >= window.innerWidth) {
        if (!timerId.current) {
          timerId.current = setInterval(() => {
            const viewport = flow.getViewport();
            flow.setViewport({
              ...viewport,
              x: viewport.x - VIEWPORT_POSITION,
            });
          }, 1);
        }
      }
      if (e.pageX === 0) {
        if (!timerId.current) {
          timerId.current = setInterval(() => {
            const viewport = flow.getViewport();
            flow.setViewport({
              ...viewport,
              x: viewport.x + VIEWPORT_POSITION,
            });
          }, 1);
        }
      }

      if (e.pageY <= 0) {
        if (!timerId.current) {
          timerId.current = setInterval(() => {
            const viewport = flow.getViewport();
            flow.setViewport({
              ...viewport,
              y: viewport.y + VIEWPORT_POSITION,
            });
          }, 1);
        }
      }
      if (e.pageY + 1 >= window.innerHeight) {
        if (!timerId.current) {
          timerId.current = setInterval(() => {
            const viewport = flow.getViewport();
            flow.setViewport({
              ...viewport,
              y: viewport.y - VIEWPORT_POSITION,
            });
          }, 1);
        }
      }
    },
    [flow]
  );

  const resetChangeAsix = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = undefined;
    }
  }, []);

  return { resetChangeAsix, handleChangeAsix };
};

/**
Хук позволяет нарисовать область выделения по направлению движения мыши
  - мыш двигается, рисуем блок
  - если мыш у любого края экрана, запускается хук useAsixScrollZeroBlock
*/
export const useElementsSelection = () => {
  const div = useRef(document.createElement("div"));
  const startSelectionCoords = useRef({ x: 0, y: 0 });

  const zoom = useZoom();

  const { handleChangeAsix, resetChangeAsix } = useAsixScrollZeroBlock();

  const drowSelection = useCallback(
    (e: MouseEvent) => {
      resetChangeAsix();

      div.current.className = "selection_wrapper";

      const diffX = Math.abs(e.pageX - startSelectionCoords.current.x);
      const diffY = Math.abs(e.pageY - startSelectionCoords.current.y);

      const asixX = startSelectionCoords.current.x > e.pageX ? "left" : "right";
      const asixY = startSelectionCoords.current.y > e.pageY ? "top" : "bottom";

      div.current.style.width = `${diffX}px`;
      div.current.style.height = `${diffY}px`;

      if (asixX === "right") {
        div.current.style.left = `${startSelectionCoords.current.x}px`;
      }
      if (asixX === "left") {
        div.current.style.left = `${e.pageX}px`;
      }

      if (asixY === "bottom") {
        div.current.style.top = `${startSelectionCoords.current.y}px`;
      }
      if (asixY === "top") {
        div.current.style.top = `${e.pageY}px`;
      }

      handleChangeAsix(e);

      document.body.appendChild(div.current);
    },
    [resetChangeAsix, handleChangeAsix]
  );

  useEffect(() => {
    const mousedown = (e: MouseEvent) => {
      startSelectionCoords.current.x = e.pageX;
      startSelectionCoords.current.y = e.pageY;

      const isValidDrowSelectionContainer =
        // @ts-ignore
        e.target.classList.contains(["intersection_lines"]) ||
        // @ts-ignore
        e.target.classList.contains(["react-flow__pane"]);

      if (isValidDrowSelectionContainer) {
        window.addEventListener("mousemove", drowSelection);
      }
    };

    const mouseup = (e: MouseEvent) => {
      if (!!document.body.contains(div.current)) {
        div.current.remove();
        resetChangeAsix();

        // размеры рабочей области, что бы понять на какой позиции
        // находится рабочая область
        const rect = document
          .querySelector(".zero-panel")
          ?.getBoundingClientRect();

        if (!rect) {
          return;
        }

        addActiveElementsBySelection({
          startSelection: {
            x: (startSelectionCoords.current.x - rect.x) / zoom,
            y: (startSelectionCoords.current.y - rect.y) / zoom,
          },
          endSelection: {
            x: (e.pageX - rect.x) / zoom,
            y: (e.pageY - rect.y) / zoom,
          },
        });
      }

      window.removeEventListener("mousemove", drowSelection);
    };

    window.addEventListener("mousedown", mousedown);
    window.addEventListener("mouseup", mouseup);

    return () => {
      window.removeEventListener("mousedown", mousedown);
      window.removeEventListener("mouseup", mouseup);
    };
  }, [drowSelection, resetChangeAsix, zoom]);
};
