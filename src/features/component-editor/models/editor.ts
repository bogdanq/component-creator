import { combine, createEvent, createStore, guard, restore } from "effector";
import { nanoid } from "nanoid";
import { getElementsStyleFx } from "./css-editor";
import { getStyleFromAreaWidth } from "../utils";

// @TODO модель можно будет поделить на части
export type Elements = "text" | "button" | "shape" | "image" | "link";
export type Dimensions = 320 | 480 | 640 | 960 | 1200 | 1400 | 1600;
export type Attribute = {
  style: {
    width: number;
    height: number;
    x: number;
    y: number;
    // пока что стили хранятся строкой
    styleString: string;
  };
  data: {};
};

/**
 * type - тип елемента
 * attributes - хранят стили, дата атрибуты, метаданные
 * content - текстовые данные
 * meta - любый произвольные данные (ссылки, картинки тд)
 *  для каждого елемента мета может быть своя, тогда выделать отдельный тип и описать сужение типов
 *  похоже не свич кейс редакса
 *
 * TODO контент у арены выделить так же в мету
 */
export type Element = {
  type: Exclude<Elements, "link">;
  id: string;
  attributes: { [key: number]: Attribute };
  disabled: boolean;
  content?: string;
  meta: {
    src?: string;
  };
};

export type ElementLink = {
  type: Extract<Elements, "link">;
  meta: {
    href: string;
    target: "_self" | "_blank";
    src?: string;
  };
} & Omit<Element, "type">;

export type ElementTypes = Element | ElementLink;

export type Area = {
  width: Dimensions;
  content?: string;
  height: { [key: number]: number };
};

// TODO  дерево хранит позиции елементов
// так же стили арены - высоту, ширину, картинку
// на беке его хранить выгоднее, чем парсить штмл
export type Tree = { elements: (Element | ElementLink)[]; area: Area };

const DEFAULT_ATTRIBUTES: {
  disabled: boolean;
  attributes: { [key: number]: Attribute };
  content: string;
} = {
  disabled: false,
  attributes: {
    1600: {
      style: { width: 0, height: 0, x: 50, y: 50, styleString: "" },
      data: {},
    },
  },
  content: "",
};

export const COMPONENT_TYPES: {
  [key in Elements]: Omit<Element, "id"> | Omit<ElementLink, "id">;
} = {
  button: {
    type: "button",
    disabled: false,
    attributes: {
      1600: {
        style: {
          width: 0,
          height: 0,
          x: 50,
          y: 50,
          styleString: "",
        },
        data: {},
      },
    },
    content: "Hello !",
    meta: {},
  },
  shape: {
    type: "shape",
    disabled: false,
    attributes: {
      1600: {
        style: {
          width: 200,
          height: 250,
          x: 300,
          y: 150,
          styleString: "",
        },
        data: {},
      },
    },
    content: "",
    meta: {},
  },
  text: {
    type: "text",
    disabled: false,
    attributes: {
      1600: {
        style: {
          width: 0,
          height: 0,
          x: 50,
          y: 150,
          styleString: "",
        },
        data: {},
      },
    },
    meta: {},
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  image: {
    type: "image",
    disabled: false,
    attributes: {
      1600: {
        style: {
          width: 0,
          height: 0,
          x: 50,
          y: 370,
          styleString: "",
        },
        data: {},
      },
    },
    content: "",
    meta: {
      src: "https://minio.olimp.dev/landing-constructor/30510d56-6076-42dc-bbf9-55fccb390ac7.png",
    },
  },
  link: {
    type: "link",
    disabled: false,
    attributes: {
      1600: {
        style: {
          width: 0,
          height: 0,
          x: 250,
          y: 50,
          styleString: "",
        },
        data: {},
      },
    },
    meta: {
      href: "https://www.olimp.bet/promo",
      target: "_blank",
      src: "",
    },
    content: "Test Link",
  },
};

const initialTree: Tree = {
  area: {
    height: { 1600: 600 },
    width: 1600,
  },
  elements: [
    {
      id: nanoid(),
      ...COMPONENT_TYPES.button,
    },
    {
      id: nanoid(),
      ...COMPONENT_TYPES.text,
    },
    {
      id: nanoid(),
      ...COMPONENT_TYPES.image,
    },
    {
      id: nanoid(),
      ...COMPONENT_TYPES.shape,
    },
    {
      id: nanoid(),
      ...COMPONENT_TYPES.link,
    },
  ],
};

// двойной клик по активному елементу
export const doubleClickElement = createEvent<string | null>();

// изменение ширины холста
export const handleChangeContentAreaWidth = createEvent<Dimensions>();

// изменение высоты холста
export const handleChangeContentAreaHeight = createEvent<number>();

// выбор активного елемента
export const setActiveElement = createEvent<string | null>();

// базовый действия с елементами
export const addElementToTree = createEvent<Elements>();
export const removeElementFromTree = createEvent<{ id: string }>();
export const copyTreeElement = createEvent<Element | ElementLink>();
export const disabledElement = createEvent<{ id: string }>();

// изменение позиции и ширины елемента
export const handleChangeElementPosition = createEvent<{
  position: { x: number; y: number };
  id: string;
}>();
export const handleChangeElementResize = createEvent<{
  width: number;
  height: number;
  id: string;
}>();
export const handleChangeStyle = createEvent<{
  value: number | string;
  name: string;
  id: string;
}>();
// изменение текстового контента елемента
export const handleChangeTextContent = createEvent<{
  text: string;
  id: string;
}>();
// изменение meta параметров ссылки
export const handleChangeMetaDataLink = createEvent<{
  metaName: string;
  value: number | string;
  id: string;
}>();

export const $dubleClickElementId = restore(doubleClickElement, null);

export const $activeElementId = restore(setActiveElement, null).reset(
  removeElementFromTree
);

export const $componentsTree = createStore<Tree>(initialTree);

export const $activeElement = combine([$activeElementId, $componentsTree]).map(
  ([id, tree]) => {
    return tree.elements.find((element) => element.id === id) ?? null;
  }
);

$componentsTree
  .on(addElementToTree, (tree, type) => {
    const id = nanoid();

    const element = COMPONENT_TYPES[type];

    return {
      ...tree,
      elements: [...tree.elements, { ...DEFAULT_ATTRIBUTES, ...element, id }],
    };
  })
  .on(removeElementFromTree, (tree, { id }) => ({
    ...tree,
    elements: tree.elements.filter((element) => element.id !== id),
  }))
  .on(disabledElement, (tree, { id }) => ({
    ...tree,
    elements: tree.elements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          disabled: !element.disabled,
        };
      }

      return element;
    }),
  }))
  .on(copyTreeElement, (tree, element) => {
    const width = tree.area.width;

    const attributes = getStyleFromAreaWidth(element.attributes, width);

    const nextElement = {
      ...element,
      id: nanoid(),
      attributes: {
        ...element.attributes,
        [width]: {
          ...attributes,
          style: {
            ...attributes.style,
            y: attributes.style.y + 100,
          },
        },
      },
    };

    return { ...tree, elements: [...tree.elements, nextElement] };
  })
  .on(handleChangeTextContent, (tree, { text, id }) => ({
    ...tree,
    elements: tree.elements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          attributes: {
            ...element.attributes,
          },
          content: text,
        };
      }

      return element;
    }),
  }))
  .on(handleChangeMetaDataLink, (tree, { metaName, value, id }) => ({
    ...tree,
    elements: tree.elements.map((element) => {
      if (element.id === id && element.type === "link") {
        return {
          ...element,
          meta: {
            ...element.meta,
            [metaName]: value,
          },
        };
      }

      return element;
    }),
  }))
  .on(handleChangeElementPosition, (tree, { position, id }) => {
    const width = tree.area.width;

    return {
      ...tree,
      elements: tree.elements.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            attributes: {
              ...element.attributes,
              [width]: {
                ...element.attributes[width],
                style: {
                  ...element.attributes[width]?.style,
                  x: position.x,
                  y: position.y,
                },
              },
            },
          };
        }

        return element;
      }),
    };
  })
  .on(handleChangeElementResize, (tree, { width, height, id }) => {
    const w = tree.area.width;

    return {
      ...tree,
      elements: tree.elements.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            attributes: {
              ...element.attributes,
              [w]: {
                ...element.attributes[w],
                style: {
                  ...element.attributes[w]?.style,
                  width,
                  height,
                },
              },
            },
          };
        }

        return element;
      }),
    };
  })
  .on(handleChangeContentAreaHeight, (tree, height) => ({
    ...tree,
    area: {
      ...tree.area,
      height: {
        ...tree.area.height,
        [tree.area.width]: height,
      },
    },
  }))
  .on(getElementsStyleFx.doneData, (tree, { styles, elementId }) => {
    const width = tree.area.width;

    return {
      ...tree,
      elements: tree.elements.map((element) => {
        if (element.id === elementId) {
          return {
            ...element,
            attributes: {
              ...element.attributes,
              [width]: {
                ...element.attributes[width],
                style: {
                  ...element.attributes[width].style,
                  styleString: styles,
                },
              },
            },
          };
        }

        return element;
      }),
    };
  })
  .on(
    guard({
      clock: handleChangeStyle,
      filter: $activeElement.map((element) => !element?.disabled),
    }),
    (tree, { name, value, id }) => {
      const width = tree.area.width;

      return {
        ...tree,
        elements: tree.elements.map((element) => {
          if (element.id === id) {
            return {
              ...element,
              attributes: {
                ...element.attributes,
                [width]: {
                  ...element.attributes[width],
                  style: {
                    ...element.attributes[width]?.style,
                    [name]: value,
                  },
                },
              },
            };
          }

          return element;
        }),
      };
    }
  )
  .on(handleChangeContentAreaWidth, (tree, width) => ({
    ...tree,
    area: {
      ...tree.area,
      width,
    },
  }));
