import { useCallback, useState } from "react";
import { Global } from "@emotion/react";
import { ContentArea } from "./content-area";
import { Header } from "./header";
import { LeftSideBox } from "./left-box";
import { RightSideBox } from "./right-box";
import { useZoom } from "./use-zoom";
import { AreaWrapper } from "./styled";
import { globalCss } from "./global-styles";

export const ComponentCreator = () => {
  const { wrapperRef, zoomReset, contentRef, progress } = useZoom();

  const [contentWidth, setContentWidth] = useState(1200);

  const handleChangeWidth = useCallback(
    (w) => {
      zoomReset();
      setContentWidth(w);
    },
    [zoomReset]
  );

  return (
    <AreaWrapper ref={wrapperRef} className="zoom-area">
      <Global styles={globalCss} />

      <>
        <Header
          progress={progress}
          handleChangeWidth={handleChangeWidth}
          contentWidth={contentWidth}
          zoomReset={zoomReset}
        />
        <LeftSideBox />
        <RightSideBox />
      </>

      <ContentArea
        contentRef={contentRef}
        progress={progress}
        contentWidth={contentWidth}
      />
    </AreaWrapper>
  );
};
