import { useState } from "react";
import { Resizable } from "react-resizable";
import { Grid, ContentWrapper } from "./styled";

const GRID_WIDTH = 102;

// ресайз область для общей рабочей области (только высота)
export const WithContentResizeble = ({
  contentRef,
  contentWidth,
  children,
}) => {
  const [height, setHeight] = useState(600);

  const onResize = (_, { size }) => {
    setHeight(size.height);
  };

  const gridCount = Math.ceil(contentWidth / GRID_WIDTH);

  return (
    <Resizable height={height} width={contentWidth} onResize={onResize}>
      <ContentWrapper
        ref={contentRef}
        style={{ width: `${contentWidth}px`, height }}
      >
        {children}

        {Array.from({ length: gridCount }).map((_, index) => (
          <Grid key={index} style={{ left: index * GRID_WIDTH }} />
        ))}
      </ContentWrapper>
    </Resizable>
  );
};
