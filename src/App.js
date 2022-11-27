import { useStore } from "effector-react";
import { useEffect, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import "./app.css";
import {
  $activeComponentId,
  $components,
  $isDubbleClick,
  addComponent,
  dubbleClick,
  removeComponent,
  selectComponent,
} from "./creator-components/model";
import { useZoom } from "./use-zoom";

const Modal = ({ jsx, event }) => {
  const modalRoot = document.getElementById("modal-root");
  const cs = event.target.getBoundingClientRect();

  const element = (
    <div
      className="popup"
      style={{
        top: cs.top + cs.height,
        left: cs.left,
      }}
    >
      <div>{jsx}</div>
    </div>
  );

  return createPortal(element, modalRoot);
};

export function App() {
  const activeComponentId = useStore($activeComponentId);
  const components = useStore($components);
  const isDubbleClick = useStore($isDubbleClick);

  const { wrapperRef, zoomReset, contentRef, progress } = useZoom();
  const [modalState, toggle] = useReducer(
    (s, event) => ({ isOpen: !s.isOpen, event }),
    {
      isOpen: false,
      event: null,
    }
  );

  const [w, sw] = useState("1200px");

  useEffect(() => {
    const listener = (e) => {
      const id = e.target.closest("[data-component-id]");

      if (!id) {
        selectComponent(null);
      }
    };

    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, [activeComponentId]);

  useEffect(() => {
    dubbleClick(false);
  }, [activeComponentId]);

  return (
    <div>
      {modalState.isOpen && (
        <Modal
          event={modalState.event}
          jsx={
            <div>
              <p onClick={() => addComponent("text")}>Add text</p>
              <p onClick={() => addComponent("button")}>Add button</p>
              <p onClick={() => addComponent("image")}>Add image</p>
            </div>
          }
        />
      )}

      <div ref={wrapperRef} className="zoom-wrapper">
        <div className="tn-mainmenu">
          <div className="mainmenu-left">
            <div className="addBtn" onClick={toggle} />

            <div className="reset-block">
              <p>{progress} %</p>
              <button onClick={zoomReset}>reset</button>
            </div>
          </div>
          <button onClick={() => sw("360px")}>mb</button>
          <button onClick={() => sw("660px")}>tab</button>
          <button onClick={() => sw("1200px")}>desc</button>
        </div>
        <div className="tn-right-box">
          <div className="tn-right__header">
            <span>Artboard settings</span>
          </div>
          {activeComponentId && (
            <div className="panelItem">
              <span
                onClick={() => removeComponent(activeComponentId)}
                className="panelItemTitle"
              >
                remove X
              </span>
            </div>
          )}
        </div>

        <div ref={contentRef} className="content" style={{ maxWidth: w }}>
          {components.map((component) => (
            <component.component
              key={component.id}
              id={component.id}
              isActive={activeComponentId === component.id}
              isDubbleClick={isDubbleClick}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
