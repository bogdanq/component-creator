import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { globalCss } from "./global-css";
import { Header } from "./header";
import { ZeroBlock } from "./zero-block";

export const AreaWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #ccc9;
`;

export const EditorNext = () => {
  return (
    <AreaWrapper>
      <Global styles={globalCss} />
      <Header />

      <ZeroBlock />
    </AreaWrapper>
  );
};
