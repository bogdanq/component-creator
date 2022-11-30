import classNames from "classnames";
import { useStore } from "effector-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import DefaultDraggable from "react-draggable";
import { Resizable as DefaultResizable } from "react-resizable";
import ContentEditable from "react-contenteditable";
import {
  $activeElement,
  $componentsTree,
  $dubleClickElementId,
  doubleClickElement,
  handleChangeElementPosition,
  handleChangeResize,
  handleChangeTextContent,
  setActiveElement,
} from "./model";
import "./tree.css";

export const Resizable = ({
  children,
  style: { width, height },
  id,
  progress,
  content,
  isDubbleClick,
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const BORDER_WIDTH = 2;
      const content = ref.current.querySelector(".content-area");
      const cs = content?.getBoundingClientRect();

      const minPropgress = progress / 100;

      handleChangeResize({
        width: cs.width / minPropgress + BORDER_WIDTH,
        height: cs.height / minPropgress + BORDER_WIDTH,
        id,
      });
    }
  }, [id, content]);

  const onResize = (e, { size }) => {
    handleChangeResize({ width: size.width, height: size.height, id });
  };

  return (
    <DefaultResizable height={height} width={width} onResize={onResize}>
      {children(ref)}
    </DefaultResizable>
  );
};

const Draggable = ({ children, id, style, disabled, type }) => {
  const handleChangePosition = (e, { x, y }) => {
    handleChangeElementPosition({ position: { x, y }, id });
  };

  return (
    <DefaultDraggable
      defaultPosition={{ x: style.x, y: style.y }}
      position={{ x: style.x, y: style.y }}
      handle=".drag-wrapper"
      onStart={handleChangePosition}
      onDrag={handleChangePosition}
      onStop={handleChangePosition}
      disabled={disabled}
    >
      <div className={`drag-wrapper ${type}-drag-wrapper`}>{children}</div>
    </DefaultDraggable>
  );
};

export const Tree = ({ progress }) => {
  const tree = useStore($componentsTree);
  const activeElement = useStore($activeElement);
  const dubleClickElementId = useStore($dubleClickElementId);

  useEffect(() => {
    const listener = (e) => {
      const id = e.target.closest("[data-component-id]");

      if (!id) {
        setActiveElement(null);
      }
    };

    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, []);

  useEffect(() => {
    doubleClickElement(null);
  }, [activeElement?.id]);

  console.log(tree);

  return tree.map((element) => {
    const {
      type,
      content,
      id,
      attributes: { style },
    } = element;

    const isActive = activeElement?.id === id;
    const isDubbleClick = dubleClickElementId === id;

    return (
      <Draggable
        key={id}
        id={id}
        style={style}
        disabled={isDubbleClick || !isActive}
        type={type}
      >
        <Resizable
          id={id}
          style={style}
          progress={progress}
          content={content}
          isDubbleClick={isDubbleClick}
        >
          {(ref) => (
            <div
              ref={ref}
              onClick={() => setActiveElement(element)}
              onDoubleClick={() => doubleClickElement(element.id)}
              data-component-id={id}
              className={classNames(`${type}-wrapper`, {
                isActive,
                dubbleActive: isDubbleClick,
              })}
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
                <span className="cs">{`${Math.round(
                  style.width
                )} x ${Math.round(style.height)}`}</span>
              )}

              {type === "image" ? (
                <img
                  className={`${type} content-area`}
                  src={content}
                  alt="content img"
                />
              ) : (
                <ContentEditable
                  className={`${type} content-area`}
                  disabled={!isDubbleClick}
                  html={content}
                  onChange={(e) => {
                    handleChangeTextContent({ text: e.target.value, id });
                  }}
                  tagName="article"
                />
              )}
            </div>
          )}
        </Resizable>
      </Draggable>
    );
  });
};
