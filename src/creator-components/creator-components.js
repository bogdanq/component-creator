import classNames from "classnames";
import { useState } from "react";
import Draggable from "react-draggable";
import "./index.css";
import { dubbleClick, selectComponent } from "./model";
import { Resizbl } from "./resizebl";

const handleClickComponent = (id) => {
  selectComponent(id);
};

const DefaultComponent = ({
  isDubbleClick,
  isActive,
  id,
  children,
  className,
  progress,
  defaultStyle,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleChangePosition = (e, { x, y }) => {
    setPosition({ x, y });
  };

  return (
    <Draggable
      defaultPosition={{ x: position.x, y: position.y }}
      handle=".handle-source"
      onStart={handleChangePosition}
      onDrag={handleChangePosition}
      onStop={handleChangePosition}
      disabled={isDubbleClick || !isActive}
    >
      <Resizbl
        progress={progress}
        className={classNames(`handle-source wrapper ${className}`, {
          dubbleActive: isActive && isDubbleClick,
          isActive,
        })}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={() => handleClickComponent(id)}
        onDoubleClick={() => dubbleClick(true)}
        id={id}
      >
        {children}
      </Resizbl>
    </Draggable>
  );
};

export const Button = ({ isDubbleClick, ...props }) => {
  return (
    <DefaultComponent
      isDubbleClick={isDubbleClick}
      className="creator-button_wrapper"
      {...props}
    >
      <div
        suppressContentEditableWarning
        contentEditable={isDubbleClick}
        className="creator-button"
      >
        Hello !
      </div>
    </DefaultComponent>
  );
};

export const Image = () => {
  return <img src="https://tilda.ws/img/imgfishsquare.gif" alt="stub" />;
};

export const Text = ({ isDubbleClick, ...props }) => {
  return (
    <DefaultComponent
      isDubbleClick={isDubbleClick}
      className="creator-text_wrapper"
      {...props}
    >
      <p suppressContentEditableWarning contentEditable={isDubbleClick}>
        The work you do while you procrastinate is probably the work you should
        be doing for the rest of your life.
      </p>
    </DefaultComponent>
  );
};
