import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import {
  ComponentEditor,
  createStatickHTMLfromTree,
} from "./features/component-editor";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider>
    <ComponentEditor
      onSave={(s) => {
        console.log(
          createStatickHTMLfromTree(s, {
            rId: "1111",
            id: 1,
            type: "HEADER",
          })
        );

        alert("Откройте консоль, что бы скопировать верстку");
      }}
    />
  </ChakraProvider>
);
