import {
  createEffect,
  createEvent,
  createStore,
  guard,
  sample,
} from "effector";
import { spread } from "patronum";
import { getElementsFromSelection, getStickingBordersAndLines } from "../utils";
import { Element, InterSectionLines, ElementResizeParams } from "./types";

export const handleChangeElementSize = createEvent<ElementResizeParams>();

export const handleChangeElementPosition = createEvent<{
  id: number;
  x: number;
  y: number;
  isDragged?: boolean;
}>();

// выбор активного елемента
export const addActiveElement = createEvent<Element | null>();
// выбор активных елементов по выделению
export const addActiveElementsBySelection = createEvent<{
  startSelection: { x: number; y: number };
  endSelection: { x: number; y: number };
}>();
// удалить активный елемент
export const deleteActiveElement = createEvent<number>();

export const $tree = createStore<Element[]>([
  {
    id: 1,
    position: { x: 10, y: 10 },
    dimension: {
      width: 150,
      height: 50,
    },
    type: "button",
  },
  {
    id: 2,
    position: { x: 700, y: 174 },
    dimension: {
      width: 50,
      height: 30,
    },
    type: "link",
  },
  {
    id: 3,
    position: { x: 300, y: 173 },
    type: "shape",
    dimension: {
      width: 200,
      height: 200,
    },
  },
]);

const drowOverlay = createEffect<Element[], void>((activeElements) => {
  const div = document.createElement("div");
  div.className = "overlay-root";

  document.body.querySelector(".overlay-root")?.remove();

  if (activeElements.length < 2) {
    return;
  }

  const rect = activeElements.reduce(
    (acc, element) => {
      return {
        minX: Math.min(acc.minX, element.position.x),
        maxX: Math.max(acc.maxX, element.position.x + element.dimension.width),
        minY: Math.min(acc.minY, element.position.y),
        maxY: Math.max(acc.maxY, element.position.y + element.dimension.height),
      };
    },
    {
      maxX: 0,
      maxY: 0,
      minY: Infinity,
      minX: Infinity,
    }
  );

  div.style.top = `${rect.minY - 2}px`;
  div.style.left = `${rect.minX - 2}px`;
  div.style.height = `${rect.maxY - rect.minY + 4}px`;
  div.style.width = `${rect.maxX - rect.minX + 4}px`;
  div.style.zIndex = "-1";

  document.body.querySelector(".zero-panel")?.appendChild(div);
});

export const $intertSectionLines = createStore<InterSectionLines[]>([]);

export const $activeElements = createStore<Element[]>([]);

$activeElements
  .on(addActiveElement, (_, nextElement) => (!nextElement ? [] : [nextElement]))
  .on(deleteActiveElement, (elements, id) =>
    elements.filter((element) => element.id !== id)
  );

// расчет позиции при прилипании и сохранение линий пересечения
sample({
  source: $tree,
  clock: handleChangeElementPosition,
  fn(tree, { id, x, y, isDragged }) {
    let lines: InterSectionLines[] = [];

    return {
      tree: tree.map((item) => {
        if (item.id === id) {
          const { element, interSectionLines } = getStickingBordersAndLines(
            tree,
            {
              ...item,
              position: {
                x,
                y,
                isDragged,
              },
            }
          );

          lines = interSectionLines;

          return element;
        }

        return item;
      }),
      intertSectionLines: lines,
    };
  },
  target: spread({
    targets: {
      tree: $tree,
      intertSectionLines: $intertSectionLines,
    },
  }),
});

// расчет линий пересечения по событию ресайз
sample({
  source: $tree,
  clock: handleChangeElementSize,
  fn(tree, { id, width, height }) {
    let lines: InterSectionLines[] = [];

    return {
      // @ts-ignore
      tree: tree.map((item) => {
        if (item.id === id) {
          const { element, interSectionLines } = getStickingBordersAndLines(
            tree,
            {
              ...item,
              dimension: {
                ...item.dimension,
                width,
                height,
              },
            }
          );

          lines = interSectionLines;

          return element;
        }

        return item;
      }),
      intertSectionLines: lines,
    };
  },
  target: spread({
    targets: {
      tree: $tree,
      intertSectionLines: $intertSectionLines,
    },
  }),
});

// добавление активных елементов на остнове дерева
sample({
  source: $tree,
  clock: addActiveElementsBySelection,
  fn(tree, positions) {
    return getElementsFromSelection(tree, positions);
  },
  target: $activeElements,
});

// TODO проверить логику направляющих
sample({
  clock: guard($activeElements, { filter: (elements) => !elements.length }),
  fn() {
    return [];
  },
  target: $intertSectionLines,
});

sample({
  clock: $activeElements,
  target: drowOverlay,
});
