import { Resizable as DefaultResizable } from "react-resizable";
import { useLayoutEffect, useRef } from "react";
import { handleChangeResize } from "../../../model";

export const WithResizable = ({
  children,
  style: { width, height },
  id,
  progress,
  content,
  disabled,
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
    // eslint-disable-next-line
  }, [id, content]);

  const onResize = (_, { size }) => {
    if (!disabled) {
      handleChangeResize({ width: size.width, height: size.height, id });
    }
  };

  return (
    <DefaultResizable height={height} width={width} onResize={onResize}>
      {children(ref)}
    </DefaultResizable>
  );
};
