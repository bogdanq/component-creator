import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import { Dimensions, Element } from "../../models";
import {
  ElementsSettingsBlock,
  ElementsComputedStylesBlock,
  AlignBlock,
} from "./components";

export const BoxPanelItems = ({
  activeElement,
  contentAreaWidth,
}: {
  activeElement: Element | null;
  contentAreaWidth: Dimensions;
}) => {
  const inputFileRef = useRef<HTMLInputElement & { target: EventTarget }>(null);

  const button = (
    <Button
      onClick={() => {
        inputFileRef.current?.click();
      }}
      colorScheme="teal"
      w="100%"
      m="10px 0"
    >
      Upload image
    </Button>
  );

  if (!activeElement) {
    return <>{button}</>;
  }

  const defaultContent = (
    <>
      <AlignBlock />
      <ElementsComputedStylesBlock
        contentAreaWidth={contentAreaWidth}
        activeElement={activeElement}
      />
      <ElementsSettingsBlock activeElement={activeElement} />
    </>
  );

  switch (activeElement?.type) {
    case "text":
      return <>{defaultContent}</>;
    case "button":
      return <>{defaultContent}</>;
    case "image":
      return (
        <>
          {defaultContent}

          {button}
        </>
      );
    case "shape":
      return (
        <>
          {defaultContent}
          {button}
        </>
      );
    default:
      return null;
  }
};
