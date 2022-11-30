import { createEvent, createStore } from "effector";
import { nanoid } from "nanoid";

const DEFAULT_ATTRIBUTES = {
  style: { width: 0, height: 0, x: 0, y: 0 },
  data: {},
};

const COMPONENT_TYPES = {
  button: {
    type: "button",
    content: "Hello !",
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

const tree = [
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

export const doubleClickElement = createEvent();

export const setActiveElement = createEvent();

export const addComponentToTree = createEvent();
export const removeComponentFromTree = createEvent();

export const handleChangeElementPosition = createEvent();
export const handleChangeResize = createEvent();
export const handleChangeTextContent = createEvent();

export const $componentsTree = createStore(tree)
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
  .on(addComponentToTree, (tree, type) => {
    const id = nanoid();

    const element = COMPONENT_TYPES[type];

    return [...tree, { ...element, attributes: DEFAULT_ATTRIBUTES, id }];
  })
  .on(removeComponentFromTree, (tree, id) => {
    return tree.filter((element) => element.id !== id);
  });

export const $activeElement = createStore(null).on(
  setActiveElement,
  (_, element) => element
);

export const $dubleClickElementId = createStore(null).on(
  doubleClickElement,
  (_, id) => id
);
