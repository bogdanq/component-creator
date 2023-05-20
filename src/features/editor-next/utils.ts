import type { Element, InterSectionLines } from "./model";

const STIKING_RANGE = 1;

/**
рисует линию по координатам
*/
export const drowLineTo = (
  interSectionLines: InterSectionLines[],
  ctx: CanvasRenderingContext2D | null
) => {
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, 1200, 600);

  const drow = ({ startX, startY, endX, endY }: InterSectionLines) => {
    ctx.beginPath();

    ctx.moveTo(startX, startY);

    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  interSectionLines.forEach((line) => {
    drow(line);
  });
};

/**
сравнивает активный елемент со всеми елементами на странице
на каждую сторону создать условие по внутренней и внешней границах

функция меяет позицию относительно других елементов и делает прилипание

что бы не делать лишний проход, в функцию добавлено создание координат отрезков
которые соеднияют две точки

один проход проверит, какой елемент рядом и создаст массив линий пересечений елементов
*/
export const getStickingBordersAndLines = (
  tree: Element[],
  newElement: Element
) => {
  return tree.reduce<{
    element: Element;
    interSectionLines: InterSectionLines[];
  }>(
    (acc, item) => {
      const rightSide = item.position.x + item.dimension.width;

      if (item.id === newElement.id) {
        return acc;
      }

      // проверить, что активный елемент при движении находится
      // в вертикальных  пределах сравниваемого елементв
      const isValidVerticalAlignment =
        newElement.position.y <= item.position.y + item.dimension.height &&
        newElement.position.y + newElement.dimension.height >= item.position.y;

      // проверить, что активный елемент при движении находится
      // в горизонтальных  пределах сравниваемого елементв
      const isValidHorizontalAlignment =
        newElement.position.x + newElement.dimension.width >= item.position.x &&
        newElement.position.x <= item.position.x + item.dimension.width;

      // правая часть на странице с левой частью активного
      if (
        newElement.position.x <= rightSide + STIKING_RANGE &&
        newElement.position.x >= rightSide
      ) {
        if (isValidVerticalAlignment) {
          acc.element = {
            ...newElement,
            position: { ...newElement.position, x: rightSide },
          };
        }

        acc.interSectionLines.push({
          startX: rightSide,
          endX: rightSide,
          endY: 2000,
          startY: 0,
        });
      }
      // правая часть на странице с правой частью активного
      if (
        newElement.position.x + newElement.dimension.width >=
          rightSide - STIKING_RANGE &&
        newElement.position.x + newElement.dimension.width <= rightSide
      ) {
        if (isValidVerticalAlignment) {
          acc.element = {
            ...newElement,
            position: {
              ...newElement.position,
              x: rightSide - newElement.dimension.width,
            },
          };
        }

        acc.interSectionLines.push({
          startX: rightSide,
          endX: rightSide,
          endY: 2000,
          startY: 0,
        });
      }

      // левая часть на странице с правой частью активного
      if (
        newElement.position.x + newElement.dimension.width >=
          item.position.x - STIKING_RANGE &&
        newElement.position.x + newElement.dimension.width <= item.position.x
      ) {
        if (isValidVerticalAlignment) {
          acc.element = {
            ...newElement,
            position: {
              ...newElement.position,
              x: item.position.x - newElement.dimension.width,
            },
          };
        }

        acc.interSectionLines.push({
          startX: item.position.x,
          endX: item.position.x,
          endY: 2000,
          startY: 0,
        });
      }
      // левая часть на странице с левой частью активного
      if (
        newElement.position.x >= item.position.x &&
        newElement.position.x <= item.position.x + STIKING_RANGE
      ) {
        if (isValidVerticalAlignment) {
          acc.element = {
            ...newElement,
            position: { ...newElement.position, x: item.position.x },
          };
        }

        acc.interSectionLines.push({
          startX: item.position.x,
          endX: item.position.x,
          endY: 2000,
          startY: 0,
        });
      }

      // верхняя часть на странице с нижней частью активного
      if (
        newElement.position.y + newElement.dimension.height <=
          item.position.y &&
        newElement.position.y + newElement.dimension.height >=
          item.position.y - STIKING_RANGE
      ) {
        if (isValidHorizontalAlignment) {
          acc.element = {
            ...newElement,
            position: {
              ...newElement.position,
              y: item.position.y - newElement.dimension.height,
            },
          };
        }

        acc.interSectionLines.push({
          startY: item.position.y,
          endY: item.position.y,
          endX: 2000,
          startX: 0,
        });
      }
      // верхняя часть на странице с верхней частью активного
      if (
        newElement.position.y >= item.position.y &&
        newElement.position.y <= item.position.y + STIKING_RANGE
      ) {
        if (isValidHorizontalAlignment) {
          acc.element = {
            ...newElement,
            position: {
              ...newElement.position,
              y: item.position.y,
            },
          };
        }

        acc.interSectionLines.push({
          startY: item.position.y,
          endY: item.position.y,
          endX: 2000,
          startX: 0,
        });
      }

      // нижняя часть на странице с верхней частью активного
      if (
        newElement.position.y >= item.position.y + item.dimension.height &&
        newElement.position.y <=
          item.position.y + item.dimension.height + STIKING_RANGE
      ) {
        if (isValidHorizontalAlignment) {
          acc.element = {
            ...newElement,
            position: {
              ...newElement.position,
              y: item.position.y + item.dimension.height,
            },
          };
        }

        acc.interSectionLines.push({
          startY: item.position.y + item.dimension.height,
          endY: item.position.y + item.dimension.height,
          endX: 2000,
          startX: 0,
        });
      }
      // нижняя часть на странице с нижней частью активного
      if (
        newElement.position.y + newElement.dimension.height <=
          item.position.y + item.dimension.height &&
        newElement.position.y + newElement.dimension.height >=
          item.position.y + item.dimension.height - STIKING_RANGE
      ) {
        if (isValidHorizontalAlignment) {
          acc.element = {
            ...newElement,
            position: {
              ...newElement.position,
              y:
                item.position.y +
                item.dimension.height -
                newElement.dimension.height,
            },
          };
        }

        acc.interSectionLines.push({
          startY: item.position.y + item.dimension.height,
          endY: item.position.y + item.dimension.height,
          endX: 2000,
          startX: 0,
        });
      }

      return acc;
    },
    { element: newElement, interSectionLines: [] }
  );
};

/**
при рисовании области выделения мы знаем ее размеры и позиции
высчитываем валдиность по оси Х и У - если все ок,
значит мы над одним из елементов
 */
export const getElementsFromSelection = (
  tree: Element[],
  {
    startSelection,
    endSelection,
  }: {
    startSelection: { x: number; y: number };
    endSelection: { x: number; y: number };
  }
) => {
  return tree.reduce<Element[]>((acc, element) => {
    const rightSide = element.dimension.width + element.position.x;
    const leftSide = element.position.x;

    const topSide = element.position.y;
    const bottomSide = element.dimension.height + element.position.y;

    const validX =
      (rightSide >= startSelection.x || rightSide >= endSelection.x) &&
      (leftSide <= endSelection.x || leftSide <= startSelection.x);

    const validY =
      (bottomSide >= startSelection.y || bottomSide >= endSelection.y) &&
      (topSide <= endSelection.y || topSide <= startSelection.y);

    if (validX && validY) {
      acc.push(element);
    }

    return acc;
  }, []);
};
