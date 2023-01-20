import {
  combine,
  createEvent,
  createStore,
  guard,
  restore,
  sample,
} from "effector";
import { nanoid } from "nanoid";

// @TODO модель можно будет поделить на части
export type Elements = "text" | "button" | "shape" | "image";
export type Dimensions = 320 | 480 | 640 | 960 | 1200;
export type Attribute = {
  [key: number]: {
    style: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
    data: {};
    content: string;
  };
};

export type Element = {
  type: Elements;
  id: string;
  attributes: Attribute;
  disabled: boolean;
};

export type Tree = { elements: Element[]; area: { content?: string } };

const DEFAULT_ATTRIBUTES: { disabled: boolean; attributes: Attribute } = {
  disabled: false,
  attributes: {
    1200: {
      style: { width: 0, height: 0, x: 50, y: 50 },
      data: {},
      content: "",
    },
  },
};

export const COMPONENT_TYPES: {
  [key: string]: { type: Elements; disabled: boolean; attributes: Attribute };
} = {
  button: {
    type: "button",
    disabled: false,
    attributes: {
      1200: {
        style: { width: 0, height: 0, x: 50, y: 50 },
        data: {},
        content: "Hello !",
      },
    },
  },
  shape: {
    type: "shape",
    disabled: false,
    attributes: {
      1200: {
        style: { width: 200, height: 250, x: 300, y: 50 },
        data: {},
        content: "",
      },
    },
  },
  text: {
    type: "text",
    disabled: false,
    attributes: {
      1200: {
        style: { width: 0, height: 0, x: 50, y: 150 },
        data: {},
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      },
    },
  },
  image: {
    type: "image",
    disabled: false,
    attributes: {
      1200: {
        style: { width: 0, height: 0, x: 50, y: 370 },
        data: {},
        content: "https://tilda.ws/img/imgfishsquare.gif",
      },
    },
  },
};

const initialTree: Tree = {
  area: {},
  elements: [
    {
      id: "1",
      ...COMPONENT_TYPES.button,
    },
    {
      id: "2",
      ...COMPONENT_TYPES.text,
    },
    {
      id: "3",
      ...COMPONENT_TYPES.image,
    },
    {
      id: "4",
      ...COMPONENT_TYPES.shape,
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
export const copyTreeElement = createEvent<Element>();
export const disabledElement = createEvent<{ id: string }>();

// изменение позиции и ширины елемента
export const handleChangeElementPosition = createEvent<{
  position: { x: number; y: number };
  id: string;
}>();
export const handleChangeResize = createEvent<{
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

export const $dubleClickElementId = restore(doubleClickElement, null);

export const $contentAreaWidth = createStore<Dimensions>(1200).on(
  handleChangeContentAreaWidth,
  (_, width) => width
);

// высота по каждой ширине может быть указана любой (потом использовать в генерации css)
export const $contentAreaHeight = createStore<{ [key: number]: number }>({
  1200: 600,
});

export const $activeElementId = restore(setActiveElement, null).reset(
  removeElementFromTree
);

export const $componentsTree = createStore<Tree>(initialTree)
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
  }));

export const $activeElement = combine([$activeElementId, $componentsTree]).map(
  ([id, tree]) => {
    return tree.elements.find((element) => element.id === id) ?? null;
  }
);

// обновления стора вынес в sample
// потому что нужно брать ширину арены
sample({
  source: { width: $contentAreaWidth, tree: $componentsTree },
  clock: copyTreeElement,
  target: $componentsTree,
  fn({ width, tree }, element) {
    const copyElement = {
      ...element,
      id: nanoid(),
      attributes: {
        ...element.attributes,
        [width]: {
          ...element.attributes[width],
          style: {
            ...element.attributes[width].style,
            y: element.attributes[width].style.y + 100,
          },
        },
      },
    };

    return { ...tree, elements: [...tree.elements, copyElement] };
  },
});
sample({
  source: { width: $contentAreaWidth, tree: $componentsTree },
  clock: guard({
    clock: handleChangeStyle,
    filter: $activeElement.map((element) => !element?.disabled),
  }),
  target: $componentsTree,
  fn({ width, tree }, { name, value, id }) {
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
  },
});
sample({
  source: { width: $contentAreaWidth, tree: $componentsTree },
  clock: handleChangeResize,
  target: $componentsTree,
  fn({ width: w, tree }, { width, height, id }) {
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
  },
});
sample({
  source: { width: $contentAreaWidth, tree: $componentsTree },
  clock: handleChangeElementPosition,
  target: $componentsTree,
  fn({ width, tree }, { position, id }) {
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
  },
});
sample({
  source: { width: $contentAreaWidth, tree: $componentsTree },
  clock: handleChangeTextContent,
  target: $componentsTree,
  fn({ width, tree }, { text, id }) {
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
                content: text,
              },
            },
          };
        }

        return element;
      }),
    };
  },
});

// высота холста относительно ширины
sample({
  source: { width: $contentAreaWidth, area: $contentAreaHeight },
  clock: handleChangeContentAreaHeight,
  target: $contentAreaHeight,
  fn({ width, area }, height) {
    return { ...area, [width]: height };
  },
});
