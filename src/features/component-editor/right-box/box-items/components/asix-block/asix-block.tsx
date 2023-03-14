import { Text, Flex, Select, Checkbox, Tooltip } from "@chakra-ui/react";
import {
  ElementTypes,
  Dimensions,
  handleChangeElementContainer,
  handleChangeElementFullWidth,
  handleChangeStyle,
} from "../../../../models";
import { getStyleFromAreaWidth } from "../../../../utils";
import { PanelItem } from "./styled";

export const AsixBlock = ({
  activeElement,
  contentAreaWidth,
}: {
  activeElement: ElementTypes;
  contentAreaWidth: Dimensions;
}) => {
  const { style } = getStyleFromAreaWidth(
    activeElement.attributes,
    contentAreaWidth
  );

  return (
    <PanelItem>
      <Flex justifyContent="space-between">
        <Text fontSize="sm" opacity="0.5">
          Container
        </Text>
        <Select
          background="transparent"
          placeholder="select target"
          size="xs"
          w="62%"
          defaultValue="grid"
          value={activeElement.meta.container}
          onChange={(e) =>
            handleChangeElementContainer({
              id: activeElement.id,
              container: e.target.value,
            })
          }
        >
          <option value="grid">Grid</option>
          <option value="window">Window</option>
        </Select>
      </Flex>

      <Flex mt="25px" justifyContent="space-between">
        <Tooltip label="x alignment">
          <Text fontSize="sm" opacity="0.5">
            Asix-X
          </Text>
        </Tooltip>
        <Select
          background="transparent"
          placeholder="select target"
          size="xs"
          w="62%"
          defaultValue="center"
          value={style.asixX}
          onChange={(e) =>
            handleChangeStyle({
              value: e.target.value,
              name: "asixX",
              id: activeElement.id,
            })
          }
        >
          <option value="center">center</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </Select>
      </Flex>

      <Flex mt="25px" justifyContent="space-between">
        <Text fontSize="sm" opacity="0.5">
          Full width
        </Text>

        <Checkbox
          isChecked={activeElement.meta.fullWidth}
          onChange={(e) =>
            handleChangeElementFullWidth({
              id: activeElement.id,
              fullWidth: e.target.checked,
            })
          }
        />
      </Flex>
    </PanelItem>
  );
};
