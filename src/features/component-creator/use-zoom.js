import { useCallback, useEffect, useRef, useState } from "react";

const SCALE_STEP = 0.02;
const MIN_SCALE = 0.5;
const MAX_SCALE = 1.98;
const PERSENT_STEP = 100;

// стили дают паддинг зум обертки
const createWrapperStyles = (wrapperRef, scale) => {
  const padding = `calc(120px * ${scale} * 3.5)`;

  wrapperRef.current.style.paddingLeft = padding;
  wrapperRef.current.style.paddingTop = padding;
};

// стили дают стиль scale для контента (нутри зума)
const createContentStyles = (contentRef, scale) => {
  contentRef.current.style.transform = `scale(${scale})`;
};

export const useZoom = () => {
  const [progress, setProgress] = useState(100);

  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const scaleRef = useRef(1);

  const getProgress = useCallback(() => {
    setProgress(Math.ceil(scaleRef.current * PERSENT_STEP));
  }, []);

  const zoomReset = useCallback(() => {
    scaleRef.current = 1;

    createContentStyles(contentRef, 1);
    createWrapperStyles(wrapperRef, 1);

    getProgress();
  }, [getProgress]);

  useEffect(() => {
    const handleWheelChange = (event) => {
      if (!!event.ctrlKey || !!event.metaKey) {
        const delta = event.deltaY || event.detail || event.wheelDelta;

        if (delta > 0 && scaleRef.current >= MIN_SCALE) {
          scaleRef.current -= SCALE_STEP;
        }

        if (delta < 0 && scaleRef.current <= MAX_SCALE) {
          scaleRef.current += SCALE_STEP;
        }

        createContentStyles(contentRef, scaleRef.current);
        createWrapperStyles(wrapperRef, scaleRef.current);

        getProgress();

        event.preventDefault();
      }
    };

    const handleKeyChange = (event) => {
      const excludeKeys = ["+", "=", "-", "_"];

      if (
        (!!event.metaKey || !!event.ctrlKey) &&
        excludeKeys.includes(event.key)
      ) {
        if (event.key === "-" && scaleRef.current >= MIN_SCALE) {
          scaleRef.current -= SCALE_STEP;
        }

        if (event.key === "=" && scaleRef.current <= MAX_SCALE) {
          scaleRef.current += SCALE_STEP;
        }

        createContentStyles(contentRef, scaleRef.current);
        createWrapperStyles(wrapperRef, scaleRef.current);

        getProgress();

        event.preventDefault();
      }
    };

    window.addEventListener("mousewheel", handleWheelChange, {
      passive: false,
    });
    window.addEventListener("keydown", handleKeyChange);

    return () => {
      window.removeEventListener("mousewheel", handleWheelChange);
      window.removeEventListener("keydown", handleKeyChange);
    };
  }, [getProgress]);

  return {
    contentRef,
    wrapperRef,
    scaleRef,
    zoomReset,
    progress,
  };
};
