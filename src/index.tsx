import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { EditorNext } from "./features/editor-next/editor";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider>
    <EditorNext />
  </ChakraProvider>
);
