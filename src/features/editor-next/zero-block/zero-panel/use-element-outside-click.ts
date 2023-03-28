import { useEffect } from "react";
import { addActiveElement } from "./model";

export const useElementOutsideClick = () => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // @ts-ignore
      const id = e?.target?.closest("[data-component-id]");
      // @ts-ignore
      const isSettingBox = !!e?.target?.closest(".setting-box");

      if (!id && !isSettingBox) {
        addActiveElement(null);
      }
    };

    window.addEventListener("mouseup", listener);

    return () => window.removeEventListener("mouseup", listener);
  }, []);
};
