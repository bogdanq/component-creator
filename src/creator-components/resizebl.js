import { useLayoutEffect, useRef, useState } from "react";
import { Resizable } from "react-resizable";
import "./resize.css";

export const Resizbl = ({
  children,
  className,
  style,
  id,
  progress,
  ...props
}) => {
  const ref = useRef(null);
  const [size, setSize] = useState({
    width: "auto",
    height: "auto",
  });

  useLayoutEffect(() => {
    const cs = ref.current?.getBoundingClientRect();

    const minPropgress = progress / 100;

    setSize({
      width: cs.width / minPropgress,
      height: cs.height / minPropgress,
    });
  }, [progress]);

  const onResize = (event, { element, size, handle }) => {
    setSize({ width: size.width, height: size.height });
  };

  return (
    <Resizable height={size.height} width={size.width} onResize={onResize}>
      <div
        ref={ref}
        data-component-id={id}
        className={className}
        style={{
          width: size.width + "px",
          height: size.height + "px",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </Resizable>
  );
};
