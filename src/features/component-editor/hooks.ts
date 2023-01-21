import { DependencyList, useMemo } from "react";
import { getAreaZoom } from "./utils";

export const useZoom = (deps?: DependencyList) => {
  const zoom = useMemo(() => {
    return getAreaZoom();
    // eslint-disable-next-line
  }, [deps]);

  return zoom;
};
