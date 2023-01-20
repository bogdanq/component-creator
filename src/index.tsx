import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { ComponentEditor } from "./features/component-editor";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider>
    <ComponentEditor />
  </ChakraProvider>
);
