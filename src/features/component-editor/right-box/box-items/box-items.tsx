import { useCallback, useLayoutEffect, useRef } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { CSSBuilder } from "react-css-nocode-editor";
import { Dimensions, ElementTypes, handleChangeStyle } from "../../models";
import {
  ElementsSettingsBlock,
  ElementsComputedStylesBlock,
  AlignBlock,
  LinkBlock,
} from "./components";
import { getStyleFromAreaWidth } from "../../utils";
import { getElementsStyleFx } from "../../models/css-editor";

export const BoxPanelItems = ({
  activeElement,
  contentAreaWidth,
}: {
  activeElement: ElementTypes | null;
  contentAreaWidth: Dimensions;
}) => {
  const inputFileRef = useRef<
    HTMLInputElement & { target: EventTarget & HTMLInputElement }
  >(null);

  useLayoutEffect(() => {
    if (activeElement) {
      getElementsStyleFx(activeElement.id);
    }
    // eslint-disable-next-line
  }, [activeElement?.id]);

  const changeStyles = useCallback(
    (styles?: string) => {
      if (activeElement && styles) {
        if (activeElement.id) {
          handleChangeStyle({
            value: styles,
            name: "styleString",
            id: activeElement.id,
          });
        }
      }
    },
    // eslint-disable-next-line
    [activeElement?.id]
  );

  const button = (
    <Button
      onClick={() => {
        alert("загрузка не доступна без сервера");
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

  const { style } = getStyleFromAreaWidth(
    activeElement.attributes,
    contentAreaWidth
  );

  const defaultContent = (
    <>
      <AlignBlock />
      <ElementsComputedStylesBlock
        contentAreaWidth={contentAreaWidth}
        activeElement={activeElement}
      />
      <ElementsSettingsBlock activeElement={activeElement} />

      <Stack mt="10px">
        <CSSBuilder
          key={activeElement.id}
          style={style.styleString}
          onChange={changeStyles}
          reactive
        />
      </Stack>
    </>
  );

  switch (activeElement?.type) {
    case "text":
      return <>{defaultContent}</>;
    case "button":
      return <>{defaultContent}</>;
    case "link":
      return (
        <>
          {button}
          <LinkBlock activeElement={activeElement} />
          {defaultContent}
        </>
      );
    case "image":
      return (
        <>
          {button}
          {defaultContent}
        </>
      );
    case "shape":
      return (
        <>
          {button}
          {defaultContent}
        </>
      );
    default:
      return null;
  }
};
