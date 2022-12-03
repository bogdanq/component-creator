import DefaultDraggable from "react-draggable";
import { handleChangeElementPosition } from "../../../model";
import { Wrapper } from "./styled";

export const WithDraggable = ({ children, id, style, disabled, type }) => {
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
      <Wrapper className={`drag-wrapper ${type}-drag-wrapper`}>
        {children}
      </Wrapper>
    </DefaultDraggable>
  );
};
