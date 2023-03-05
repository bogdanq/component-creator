import { useCallback, useLayoutEffect, useRef } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { CSSBuilder } from "react-css-nocode-editor";
import { Area, ElementTypes, handleChangeStyle } from "../../models";
import {
  ElementsSettingsBlock,
  ElementsComputedStylesBlock,
  AlignBlock,
  LinkBlock,
  AreaComputedStylesBlock,
  HoverBlock,
} from "./components";
import { getStyleFromAreaWidth } from "../../utils";
import { getElementsStyleFx } from "../../models/css-editor";

export const BoxPanelItems = ({
  activeElement,
  area,
}: {
  activeElement: ElementTypes | null;
  area: Area;
}) => {
  const inputFileRef = useRef<
    HTMLInputElement & { target: EventTarget & HTMLInputElement }
  >(null);

  useLayoutEffect(() => {
    if (activeElement?.id) {
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
    return (
      <>
        <AreaComputedStylesBlock
          contentAreaWidth={area.width}
          contentAreaHeight={area.height}
        />
        {button}
      </>
    );
  }

  const { style } = getStyleFromAreaWidth(activeElement.attributes, area.width);

  const defaultContent = (
    <>
      <AlignBlock />
      <ElementsComputedStylesBlock
        contentAreaWidth={area.width}
        activeElement={activeElement}
      />
      <ElementsSettingsBlock activeElement={activeElement} />
    </>
  );

  const cssBuilder = (
    <Stack mt="10px">
      <CSSBuilder
        key={activeElement.id}
        style={style.styleString}
        onChange={changeStyles}
        reactive
      />
    </Stack>
  );

  switch (activeElement?.type) {
    case "text":
      return (
        <>
          {defaultContent}
          {cssBuilder}
        </>
      );
    case "button":
      return (
        <>
          {defaultContent}
          <HoverBlock activeElement={activeElement} />
          {cssBuilder}
        </>
      );
    case "link":
      return (
        <>
          {button}
          <LinkBlock activeElement={activeElement} />
          {defaultContent}
          {cssBuilder}
        </>
      );
    case "image":
      return (
        <>
          {button}
          {defaultContent}
          {cssBuilder}
        </>
      );
    case "shape":
      return (
        <>
          {button}
          {defaultContent}
          {cssBuilder}
        </>
      );
    default:
      return null;
  }
};
