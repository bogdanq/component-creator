import { combine } from "effector";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { ContentEditableEvent } from "react-contenteditable";
import {
  $componentsTree,
  $dubleClickElementId,
  $activeElement,
  doubleClickElement,
  setActiveElement,
  handleChangeTextContent,
  ElementTypes,
} from "../../models";
import { usePaste } from "../../../common";
import {
  getStyleFromStringFx,
  getStyleFromObject,
} from "../../models/css-editor";
import { getStyleFromAreaWidth } from "../../utils";
import { WithDraggable, WithResizable } from "./index";
import {
  Button,
  Shape,
  Image,
  ElementWrapper,
  ComputedStyles,
  Text,
  Link,
  TextRelative,
} from "./styled";

// TODO тут список всех доступных узлов, вынести по отдельности
const ElementItem = ({
  isDubbleClick,
  style,
  element,
}: {
  isDubbleClick: boolean;
  style: React.CSSProperties;
  element: ElementTypes;
}) => {
  const { type, content, id, meta } = element;

  if (type === "shape") {
    return (
      <Shape
        className="shape content-area"
        style={{
          background: meta?.src
            ? `url(${meta.src}) 0% 0% / 100% 100% no-repeat`
            : "",
          ...style,
        }}
      />
    );
  }

  if (type === "image") {
    return (
      <Image
        className="image content-area"
        style={{
          background: meta?.src
            ? `url(${meta.src}) 0% 0% / 100% 100% no-repeat`
            : "",
          ...style,
        }}
      />
    );
  }

  if (type === "button") {
    return (
      <Button
        hoverStyles={getStyleFromObject(meta.hover)}
        className="button content-area"
        disabled={!isDubbleClick}
        html={content}
        onChange={(e: ContentEditableEvent) => {
          handleChangeTextContent({ text: e.target.value, id });
        }}
        tagName="article"
        style={style}
      />
    );
  }

  if (type === "text") {
    return (
      <Text
        className="text content-area"
        disabled={!isDubbleClick}
        html={content}
        onChange={(e: ContentEditableEvent) => {
          handleChangeTextContent({ text: e.target?.value, id });
        }}
        tagName="article"
        style={style}
      />
    );
  }

  if (type === "link") {
    return (
      <Link
        disabled={!isDubbleClick}
        onChange={(e: ContentEditableEvent) => {
          handleChangeTextContent({ text: e.target?.value, id });
        }}
        className="link content-area"
        html={content}
        tagName="article"
        style={{
          background: meta?.src
            ? `url(${meta.src}) 0% 0% / 100% 100% no-repeat`
            : "",
          ...style,
        }}
      />
    );
  }

  return null;
};

const $state = combine({
  tree: $componentsTree,
  activeElement: $activeElement,
  dubleClickElementId: $dubleClickElementId,
});

export function ElementsTree() {
  const { tree, activeElement, dubleClickElementId } = useStore($state);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // @ts-ignore
      const id = e?.target?.closest("[data-component-id]");
      // @ts-ignore
      const isSettingBox = !!e?.target?.closest(".setting-box");

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

  usePaste();

  return (
    <>
      {tree.elements.map((element) => {
        const { type, id, attributes, disabled, content, meta } = element;

        const { style } = getStyleFromAreaWidth(attributes, tree.area.width);

        const isActive =
          activeElement?.id === id || tree.activeElementsIds.includes(id);
        const isDubbleClick = dubleClickElementId === id;

        const cs =
          style.width && style.height
            ? {
                width: style.width + "px",
                height: style.height + "px",
              }
            : {};

        return (
          <WithDraggable
            key={id}
            id={id}
            style={style}
            disabled={isDubbleClick || !isActive || disabled}
            type={type}
            isActive={isActive}
          >
            <WithResizable
              disabled={disabled}
              id={id}
              style={style}
              content={content || ""}
            >
              {(ref) => (
                <ElementWrapper
                  type={type}
                  isActive={isActive}
                  dubbleActive={isDubbleClick}
                  ref={ref}
                  onClick={() => setActiveElement(element.id)}
                  onDoubleClick={(e) => {
                    const article = e.currentTarget?.querySelector("article");

                    setTimeout(() => {
                      article?.focus();
                    });

                    doubleClickElement(element.id);
                  }}
                  data-component-id={id}
                  style={cs}
                >
                  <>
                    <>
                      {isActive && (
                        <ComputedStyles isActive>{`${Math.round(
                          style.x
                        )} x ${Math.round(style.y)}`}</ComputedStyles>
                      )}
                      {isDubbleClick && (
                        <ComputedStyles>{`${Math.round(
                          style.width
                        )} x ${Math.round(style.height)}`}</ComputedStyles>
                      )}
                      {isActive && meta.container === "window" && (
                        <TextRelative>window relative</TextRelative>
                      )}
                    </>

                    <ElementItem
                      style={getStyleFromStringFx(style.styleString)}
                      element={element}
                      isDubbleClick={isDubbleClick}
                    />
                  </>
                </ElementWrapper>
              )}
            </WithResizable>
          </WithDraggable>
        );
      })}
    </>
  );
}
