import { combine, createEvent, createStore, restore } from "effector";
import { nanoid } from "nanoid";

const DEFAULT_ATTRIBUTES = {
  style: { width: 0, height: 0, x: 0, y: 0 },
  data: {},
  disabled: false,
};

export const COMPONENT_TYPES = {
  button: {
    type: "button",
    content: "Hello !",
  },
  shape: {
    type: "shape",
    content: "",
  },
  text: {
    type: "text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  image: {
    type: "image",
    content: "https://tilda.ws/img/imgfishsquare.gif",
  },
};

const initialTree = [
  {
    id: "1",
    attributes: DEFAULT_ATTRIBUTES,
    ...COMPONENT_TYPES.button,
  },
  {
    id: "2",
    attributes: DEFAULT_ATTRIBUTES,
    ...COMPONENT_TYPES.text,
  },
  {
    id: "3",
    attributes: DEFAULT_ATTRIBUTES,
    ...COMPONENT_TYPES.image,
  },
];

// двойной клик по активному елементу
export const doubleClickElement = createEvent();

// выбор активного елемента
export const setActiveElement = createEvent();

// базовый действия с елементами
export const addElementToTree = createEvent();
export const removeElementFromTree = createEvent();
export const copyTreeElement = createEvent();
export const disabledElement = createEvent();

// изменение позиции и ширины елемента
export const handleChangeElementPosition = createEvent();
export const handleChangeResize = createEvent();
export const handleChangeStyle = createEvent();

// изменение текстового контента елемента
export const handleChangeTextContent = createEvent();

export const $componentsTree = createStore(initialTree)
  .on(handleChangeElementPosition, (tree, { position, id }) =>
    tree.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          attributes: {
            ...element.attributes,
            style: {
              ...element.attributes.style,
              x: position.x,
              y: position.y,
            },
          },
        };
      }

      return element;
    })
  )
  .on(handleChangeResize, (tree, { width, height, id }) =>
    tree.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          attributes: {
            ...element.attributes,
            style: {
              ...element.attributes.style,
              width: width,
              height: height,
            },
          },
        };
      }

      return element;
    })
  )
  .on(handleChangeStyle, (tree, { name, value, id }) =>
    tree.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          attributes: {
            ...element.attributes,
            style: {
              ...element.attributes.style,
              [name]: value,
            },
          },
        };
      }

      return element;
    })
  )
  .on(handleChangeTextContent, (tree, { text, id }) =>
    tree.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          content: text,
        };
      }

      return element;
    })
  )
  .on(addElementToTree, (tree, type) => {
    const id = nanoid();

    const element = COMPONENT_TYPES[type];

    return [...tree, { ...element, attributes: DEFAULT_ATTRIBUTES, id }];
  })
  .on(removeElementFromTree, (tree, { id }) => {
    return tree.filter((element) => element.id !== id);
  })
  .on(copyTreeElement, (tree, element) => {
    const copyElement = {
      ...element,
      id: nanoid(),
      attributes: {
        ...element.attributes,
        style: {
          ...element.attributes.style,
          y: element.attributes.style.y + 100,
        },
      },
    };

    return [...tree, copyElement];
  })
  .on(disabledElement, (tree, { id }) => {
    return tree.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          disabled: !element.disabled,
        };
      }

      return element;
    });
  });

export const $activeElementId = restore(setActiveElement, null).reset(
  removeElementFromTree
);

export const $activeElement = combine([$activeElementId, $componentsTree]).map(
  ([id, tree]) => {
    return tree.find((element) => element.id === id) ?? null;
  }
);

export const $dubleClickElementId = restore(doubleClickElement, null);
