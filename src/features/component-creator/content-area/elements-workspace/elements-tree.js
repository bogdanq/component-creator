import { combine } from "effector";
import { useStore } from "effector-react";
import { useEffect } from "react";
import {
  $componentsTree,
  $dubleClickElementId,
  $activeElement,
  doubleClickElement,
  setActiveElement,
  handleChangeTextContent,
} from "../../model";
import { WithDraggable, WithResizable } from "./index";
import { Button, Shape, Image, Wrapper, ComputedStyles, Text } from "./styled";

const ElementItem = ({ type, content, id, isDubbleClick }) => {
  if (type === "shape") {
    return <Shape className="shape content-area" />;
  }

  if (type === "image") {
    return (
      <Image className="image content-area" src={content} alt="content img" />
    );
  }

  if (type === "button") {
    return (
      <Button
        className="button content-area"
        disabled={!isDubbleClick}
        html={content}
        onChange={(e) => {
          handleChangeTextContent({ text: e.target.value, id });
        }}
        tagName="article"
      />
    );
  }

  if (type === "text") {
    return (
      <Text
        className="text content-area"
        disabled={!isDubbleClick}
        html={content}
        onChange={(e) => {
          handleChangeTextContent({ text: e.target.value, id });
        }}
        tagName="article"
      />
    );
  }
};

const $state = combine({
  tree: $componentsTree,
  activeElement: $activeElement,
  dubleClickElementId: $dubleClickElementId,
});

export const ElementsTree = ({ progress }) => {
  const { tree, activeElement, dubleClickElementId } = useStore($state);

  useEffect(() => {
    const listener = (e) => {
      const id = e.target.closest("[data-component-id]");
      const isSettingBox = !!e.target.closest(".setting-box");

      if (!id && !isSettingBox) {
        setActiveElement(null);
      }
    };

    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, []);

  useEffect(() => {
    doubleClickElement(null);
  }, [activeElement?.id]);

  return tree.map((element) => {
    const {
      type,
      content,
      id,
      attributes: { style },
      disabled,
    } = element;

    const isActive = activeElement?.id === id;
    const isDubbleClick = dubleClickElementId === id;

    return (
      <WithDraggable
        key={id}
        id={id}
        style={style}
        disabled={isDubbleClick || !isActive || disabled}
        type={type}
      >
        <WithResizable
          disabled={disabled}
          id={id}
          style={style}
          progress={progress}
          content={content}
        >
          {(ref) => (
            <Wrapper
              type={type}
              className={`${type}-wrapper`}
              isActive={isActive}
              dubbleActive={isDubbleClick}
              ref={ref}
              onMouseDown={() => setActiveElement(element.id)}
              onDoubleClick={() => doubleClickElement(element.id)}
              data-component-id={id}
              style={
                style.width && style.height
                  ? {
                      width: style.width + "px",
                      height: style.height + "px",
                    }
                  : {}
              }
            >
              <>
                {isActive && (
                  <ComputedStyles>{`${Math.round(style.width)} x ${Math.round(
                    style.height
                  )}`}</ComputedStyles>
                )}

                <ElementItem
                  type={type}
                  content={content}
                  id={id}
                  isDubbleClick={isDubbleClick}
                />
              </>
            </Wrapper>
          )}
        </WithResizable>
      </WithDraggable>
    );
  });
};
