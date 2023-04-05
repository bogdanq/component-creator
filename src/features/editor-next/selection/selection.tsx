import { useElementsSelection } from "./use-selection";

/**
Компонент ничего не возвращает, тут нужен именно хук в контексте
reactflow, поэтому он помещен вниз по дереву
*/
export const Selection = () => {
  useElementsSelection();

  return null;
};
