import { nanoid } from "nanoid";
import { createEvent, createStore } from "effector";
import { componentTypes } from "./utils";

const b1 = `
<div
  data-component-id="jM9vE3TQrnLJ_n5e2ApbN"
  class="handle-source wrapper creator-button_wrapper react-draggable react-draggable-dragged react-resizable"
  style="transform: translate(568px, 387px); width: 200px; height: 59.9609px"
>
  <div contenteditable="true" class="creator-button content">Hello !</div>
  <span class="react-resizable-handle react-resizable-handle-se"></span>
</div>
`;

const initialState = [
  { id: nanoid(), component: componentTypes.button, content: b1 },
  { id: nanoid(), component: componentTypes.text, content: b1 },
];

export const addComponent = createEvent(); // type
export const removeComponent = createEvent(); // id

export const selectComponent = createEvent(); // id
export const dubbleClick = createEvent(); // bool

export const $isDubbleClick = createStore(false).on(dubbleClick, (_, is) => is);

export const $components = createStore(initialState)
  .on(addComponent, (components, type) => {
    const id = nanoid();

    return [...components, { id, component: componentTypes[type] }];
  })
  .on(removeComponent, (components, id) =>
    components.filter((component) => component.id !== id)
  );

export const $activeComponentId = createStore(null).on(
  selectComponent,
  (_, id) => id || null
);
