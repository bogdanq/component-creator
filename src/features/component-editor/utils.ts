import merge from "lodash.merge";
import { Dimensions, Element, Tree } from "./models";

const dimensions: Dimensions[] = [320, 480, 640, 960, 1200];

// составляет стили из дерева и выводит нужные
// имитирует медиа запросы вставляя стиль инлайн
export const getStyleFromAreaWidth = (
  attributes: Element["attributes"],
  width: number
) => {
  if (width !== 1200) {
    const atr: any[] = [];
    const widthIndex = dimensions.findIndex((i) => i === width);

    for (let i = widthIndex; i < 5; i++) {
      atr.unshift(attributes[dimensions[i]] ?? {});
    }

    return merge({}, ...atr);
  }

  return attributes[1200];
};

// получить высоту холста
// для каждого екрана она может быть разной
export const getAreaHeightFromAreaWidth = (
  height: {
    [key: number]: number;
  },
  width: number
) => {
  if (width !== 1200) {
    return height[width] || height[1200];
  }

  return height[1200];
};

// создает канвас сетку на холсте
export const createGrid = (
  contentAreaWidth: number,
  height: number,
  canvasId: string
) => {
  const GRID_WIDTH = 102;

  const gridCount = Math.ceil(contentAreaWidth / GRID_WIDTH);

  const c_canvas = document.querySelector(canvasId);
  // @ts-ignore
  const context = c_canvas?.getContext("2d");

  if (context) {
    for (var x = 0; x <= gridCount; x++) {
      context.moveTo(x * GRID_WIDTH, 0);
      context.lineTo(x * GRID_WIDTH, height);
    }

    context.strokeStyle = "#cacaca";
    context.stroke();
  }
};

// создает валидный цсс код с медиа запросами на основе дерева
// заранее есть размеры екранов
// указаны измеряемые стили (px)
// указаны стили не измеряемые
export const createStyleFromTree = (tree: Tree) => {
  const styles: { [key in Dimensions]: string } = {
    1200: "",
    960: "@media screen and (max-width: 960px) {",
    640: "@media screen and (max-width: 640px) {",
    480: "@media screen and (max-width: 480px) {",
    320: "@media screen and (max-width: 320px) {",
  };

  tree.elements.forEach((item, idx) => {
    dimensions.forEach((dimension) => {
      const attributeByWidth = item.attributes[dimension];

      if (!attributeByWidth) {
        styles[dimension] = "";
        return;
      }

      styles[dimension] += `
        [data-component-id="${item.id}"] {${styleBuilder(
        attributeByWidth.style
      )}}
      `
        .trim()
        .replace(/ /g, "");

      if (idx === tree.elements.length - 1 && dimension !== 1200) {
        styles[dimension] += "}";
      }
    });
  });

  return Object.values(styles).filter(Boolean);
};

const styleBuilder = (style: { [key: string]: string | number }) => {
  const stylesWithUnits: string[] = ["width", "height"];
  const stylesWithoutUnits: string[] = [];

  let styles = "";

  if (typeof style.x === "number" && typeof style.y === "number") {
    styles += `transform: translate(${style.x}px, ${style.y}px);`;
  }

  Object.entries(style).forEach(([key, value]) => {
    if (stylesWithUnits.includes(key)) {
      styles += `${key}: ${value}px;`;
    }

    if (stylesWithoutUnits.includes(key)) {
      styles += `${key}: ${value};`;
    }
  });

  return styles;
};

export const getAreaZoom = () => {
  // получение зума, что бы ширина была всегда одинаковой
  // @TODO у либы нет к нему доступа - поэтому напрямую
  const area = document.querySelector(".react-flow__viewport");
  const st = area?.getAttribute("style") ?? "";
  const zoom = Number(st.match(/\(([\d.-]+)\)/)?.[1]);

  return zoom;
};
