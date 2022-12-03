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
import {
  Button,
  Shape,
  Image,
  Wrapper,
  ComputedStyles,
  Text,
  ContentEditable,
} from "./styled";

export const ElementsTree = ({ progress }) => {
  const tree = useStore($componentsTree);
  const activeElement = useStore($activeElement);
  const dubleClickElementId = useStore($dubleClickElementId);

  useEffect(() => {
    const listener = (e) => {
      const id = e.target.closest("[data-component-id]");
      const isSettingBox = !!e.target.closest(".tn-right-box");
      const isRightTreeBox = !!e.target.closest(".tn-left-box");

      if (!id && !isSettingBox && !isRightTreeBox) {
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
              isActive={isActive}
              dubbleActive={isDubbleClick}
              ref={ref}
              onMouseDown={() => setActiveElement(element)}
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
              {isActive && (
                <ComputedStyles>{`${Math.round(style.width)} x ${Math.round(
                  style.height
                )}`}</ComputedStyles>
              )}

              {type === "shape" && <Shape className="content-area" />}
              {type === "image" && (
                <Image
                  className="content-area"
                  src={content}
                  alt="content img"
                />
              )}
              {type === "button" && (
                <Button className="content-area">
                  <ContentEditable
                    disabled={!isDubbleClick}
                    html={content}
                    onChange={(e) => {
                      handleChangeTextContent({ text: e.target.value, id });
                    }}
                    tagName="article"
                  />
                </Button>
              )}

              {type === "text" && (
                <Text>
                  <ContentEditable
                    className="content-area"
                    disabled={!isDubbleClick}
                    html={content}
                    onChange={(e) => {
                      handleChangeTextContent({ text: e.target.value, id });
                    }}
                    tagName="article"
                  />
                </Text>
              )}
            </Wrapper>
          )}
        </WithResizable>
      </WithDraggable>
    );
  });
};
