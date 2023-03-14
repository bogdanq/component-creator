import merge from "lodash.merge";
import { css } from "@emotion/react";
import ReactDOMServer from "react-dom/server";
import { nanoid } from "nanoid";
import classnames from "classnames";
import {
  Attribute,
  Dimensions,
  ElementTypes,
  Tree,
  getStyleFromObject,
} from "./models";

const dimensions: Dimensions[] = [320, 480, 640, 960, 1200, 1400, 1600];

// составляет стили из дерева и выводит нужные
// имитирует медиа запросы вставляя стиль инлайн
export const getStyleFromAreaWidth = (
  attributes: ElementTypes["attributes"],
  width: number | string
): Attribute => {
  if (width !== 1600) {
    const atr: any[] = [];
    const widthIndex = dimensions.findIndex((i) => i === width);

    for (let i = widthIndex; i < dimensions.length; i++) {
      atr.unshift(attributes[dimensions[i]] ?? {});
    }

    return merge({}, ...atr);
  }

  return attributes[1600];
};

// получить высоту холста
// для каждого екрана она может быть разной
export const getAreaHeightFromAreaWidth = (
  height: {
    [key: number]: number;
  },
  width: number
) => {
  if (width !== 1600) {
    return height[width] || height[1600];
  }

  return height[1600];
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
export const createStyleFromTree = (
  tree: Tree,
  contentAreaHeight: {
    [key: number]: number;
  },
  uniqID: string
) => {
  const styles: { [key in Dimensions]: string } = {
    1600: "",
    1400: "@media screen and (max-width: 1600px) {",
    1200: "@media screen and (max-width: 1400px) {",
    960: "@media screen and (max-width: 1200px) {",
    640: "@media screen and (max-width: 960px) {",
    480: "@media screen and (max-width: 640px) {",
    320: "@media screen and (max-width: 480px) {",
  };

  // стили поведения для обертки высота и ширина
  dimensions.forEach((dimension) => {
    const { content } = tree.area;

    styles[dimension] += css`
      .wrapper-element_item-content${uniqID} {
        height: ${contentAreaHeight[dimension] || contentAreaHeight[1600]}px;
        max-width: ${dimension}px;
        width: 100%;
        margin: 0 auto;
        position: relative;
      }

      .wrapper-element_item${uniqID} {
        ${content &&
        `
          background-image: url(${content});
        `}
        height: ${contentAreaHeight[dimension] || contentAreaHeight[1600]}px;
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        overflow-x: hidden;
      }
    `.styles;
  });

  tree.elements.forEach((item, idx) => {
    dimensions.forEach((dimension) => {
      const attributeByWidth = item.attributes[dimension];

      if (!attributeByWidth) {
        return;
      }

      styles[dimension] += `
        [data-component-id="${item.id}"] {${styleBuilder(attributeByWidth)}}
      `;

      // создание ховер эффекта TODO вынести
      if (item.type === "button") {
        styles[dimension] += `
        [data-component-id="${item.id}"]:hover {${getStyleFromObject(
          item.meta.hover
        )}}
      `;
      }

      if (idx === tree.elements.length - 1 && dimension !== 1600) {
        styles[dimension] += "}";
      }
    });
  });

  return Object.values(styles).filter(Boolean).reverse().join("");
};

const styleBuilder = (attribute: Attribute) => {
  const { style } = attribute;

  const stylesWithUnits: string[] = ["width", "height"];
  const stylesWithoutUnits: string[] = [];
  const transformNames: { [key: string]: string | number } = {
    height: "height",
    // height: 'min-height',
  };

  let styles = "";

  // TODO  позиция добавляется в стили
  if (typeof style.x === "number" && typeof style.y === "number") {
    styles += `transform: translate(${style.x}px, ${style.y}px);`;
  }

  if (!!style.styleString) {
    styles += `${style.styleString};`;
  }

  Object.entries(style).forEach(([key, value]) => {
    if (stylesWithUnits.includes(key)) {
      styles += `${transformNames[key] || key}: ${value}px;`;
    }

    if (stylesWithoutUnits.includes(key)) {
      styles += `${key}: ${value};`;
    }
  });

  return styles;
};

export const createHtmlFromTree = (tree: Tree) => {
  const element = tree.elements.map((element) => {
    const { type, id, content, meta, attributes } = element;

    let elementByType: React.ReactElement | null = null;

    if (type === "shape" && !meta.src) {
      elementByType = (
        <div className="shape" data-component-id={id} data-img-id={id} />
      );
    }

    if ((type === "image" || type === "shape") && meta.src) {
      elementByType = (
        <div
          className={classnames("image", {
            fullWidth: meta.fullWidth,
          })}
        >
          <img
            src={meta.src}
            className={classnames({
              fullWidth: meta.fullWidth,
            })}
            data-component-id={id}
            data-img-id={id}
            alt="img"
          />
        </div>
      );
    }

    if (type === "button") {
      elementByType = (
        <button
          className="button"
          contentEditable="true"
          data-component-id={id}
          data-text-id={id}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      );
    }

    if (type === "text") {
      elementByType = (
        <article
          className="text"
          contentEditable="true"
          data-component-id={id}
          data-text-id={id}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      );
    }

    if (type === "link") {
      elementByType = (
        <a
          href={meta.href}
          target={meta.target}
          className="link"
          contentEditable="true"
          data-component-id={id}
          data-link-id={id}
          rel="noopener noreferrer"
        >
          {meta?.src ? (
            <img data-img-id={id} src={meta.src} alt="img" />
          ) : (
            content
          )}
        </a>
      );
    }

    // получить позицию елемента на каждый екран и сохранить
    // в дата атрибут, что бы можно было брать ее как
    const positions = dimensions.reduce<{
      [key: string]: number;
    }>((acc, dimension) => {
      if (meta.container === "window") {
        const attrs = getStyleFromAreaWidth(attributes, dimension);
        acc[`data-x-${dimension}`] = attrs.style.x;
        acc[`data-y-${dimension}`] = attrs.style.y;
      }

      return acc;
    }, {});

    // получить выравнивание елемента на конкретном размере екрана
    // что бы потом на лендинге скрипт относительно значения мог тащить к нужной стороне екркна
    const asix = dimensions.reduce<{
      [key: string]: string;
    }>((acc, dimension) => {
      if (meta.container === "window") {
        const attrs = getStyleFromAreaWidth(attributes, dimension);

        acc[`data-asixx-${dimension}`] = attrs.style.asixX;
      }

      return acc;
    }, {});

    console.log("asix", asix);

    return (
      <div
        key={id}
        className={`${type}-wrapper`}
        id={`link_${id}`}
        data-window-relative={meta.container}
        {...positions}
        {...asix}
      >
        {elementByType}
      </div>
    );
  });

  return ReactDOMServer.renderToStaticMarkup(<>{element}</>);
};

export const createStatickHTMLfromTree = (
  tree: Tree,
  params?: { rId: string; id?: number; type: string }
) => {
  const uniqID = nanoid();

  const styles = createStyleFromTree(tree, tree.area.height, uniqID);
  const html = createHtmlFromTree(tree);

  const result = `
    <div data-rid=${params?.rId} data-id=${params?.id} data-type=${params?.type} id=link${params?.id}>
      <style>${styles}</style>

      <div class="wrapper-element_item${uniqID}">
      <div class="wrapper-element_item-content${uniqID}">${html}</div>
      </div>
    </div>
  `.replace(/\n|\r/g, "");

  return result;
};

// если елемент выравнивается по окну браузера
// на каждый ресайз нужно читать его позицию и менять
// елемент с правой части - тянуть вправо на разницу от окна и контейнера
// елемент слева - тянуть влево
// исходный х - хранится в атрибуте data-x-dimension
export const getWindowElementsPosition = () => {
  const elements = [
    // @ts-ignore
    ...document.querySelectorAll("[data-window-relative=window]"),
  ] as HTMLElement[];

  elements.forEach((element) => {
    const childNode = element.querySelector(
      "[data-component-id]"
    ) as HTMLElement;

    if (!childNode) {
      return;
    }

    const wrapperWidth = window.innerWidth;
    const conteinerWidths = dimensions.filter((d) => d <= wrapperWidth);

    const conteinerWidth = conteinerWidths[conteinerWidths.length - 1];

    const widthDiff = Math.ceil(wrapperWidth - conteinerWidth) / 2;

    const x = Number(element.getAttribute(`data-x-${conteinerWidth}`));
    const y = Number(element.getAttribute(`data-y-${conteinerWidth}`));

    const asixX = element.getAttribute(
      `data-asixx-${conteinerWidth}`
    ) as Attribute["style"]["asixX"];

    if (asixX === "center") {
      console.log("center", childNode);
      childNode.style.transform = `translate(${x}px, ${y}px)`;
      return;
    }

    // Если asixX = left, то всенда елемент тянуть влево
    if (asixX === "left") {
      childNode.style.transform = `translate(${x - widthDiff}px, ${y}px)`;
      return;
    }

    if (asixX === "right") {
      childNode.style.transform = `translate(${x + widthDiff}px, ${y}px)`;
      return;
    }
  });
};
