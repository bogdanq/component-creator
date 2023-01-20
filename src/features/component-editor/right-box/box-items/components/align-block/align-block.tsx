import { Flex, Tooltip } from "@chakra-ui/react";
import {
  AlignBottomIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
} from "../../../../../../assets/icons";
import { useStore } from "effector-react";
import {
  $activeElement,
  handleChangeElementPosition,
  $contentAreaWidth,
  $contentAreaHeight,
} from "../../../../models";
import {
  getAreaHeightFromAreaWidth,
  getStyleFromAreaWidth,
} from "../../../../utils";
import { PanelItem } from "./styled";
import { combine } from "effector";

const $state = combine({
  activeElement: $activeElement,
  contentAreaWidth: $contentAreaWidth,
  contentAreaHeight: $contentAreaHeight,
});

export const AlignBlock = () => {
  const { activeElement, contentAreaHeight, contentAreaWidth } =
    useStore($state);

  if (!activeElement) {
    return null;
  }

  const { style } = getStyleFromAreaWidth(
    activeElement.attributes,
    contentAreaWidth
  );

  const handleChangePosition = (position: { x?: number; y?: number }) => {
    handleChangeElementPosition({
      position: { x: style.x, y: style.y, ...position },
      id: activeElement.id,
    });
  };

  return (
    <PanelItem>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex w="30%" justifyContent="space-between">
          <Tooltip label="to botttom">
            <div>
              <AlignBottomIcon
                onClick={() =>
                  handleChangePosition({
                    y:
                      getAreaHeightFromAreaWidth(
                        contentAreaHeight,
                        contentAreaWidth
                      ) - style.height,
                  })
                }
              />
            </div>
          </Tooltip>

          <Tooltip label="to top">
            <div>
              <AlignTopIcon onClick={() => handleChangePosition({ y: 0 })} />
            </div>
          </Tooltip>
        </Flex>
        <Flex w="30%" justifyContent="space-between">
          <Tooltip label="to left">
            <div>
              <AlignLeftIcon onClick={() => handleChangePosition({ x: 0 })} />
            </div>
          </Tooltip>

          <Tooltip label="to right">
            <div>
              <AlignRightIcon
                onClick={() =>
                  handleChangePosition({ x: contentAreaWidth - style.width })
                }
              />
            </div>
          </Tooltip>
        </Flex>
      </Flex>
    </PanelItem>
  );
};
