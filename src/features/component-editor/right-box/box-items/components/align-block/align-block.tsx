import { Flex, Tooltip } from "@chakra-ui/react";
import {
  AlignBottomIcon,
  AlignCenterIcon,
  AlignLeftIcon,
  AlignMiddleIcon,
  AlignRightIcon,
  AlignTopIcon,
} from "../../../../../../assets/icons";
import { useStore } from "effector-react";
import {
  $activeElement,
  handleChangeElementPosition,
  $componentsTree,
} from "../../../../models";
import {
  getAreaHeightFromAreaWidth,
  getStyleFromAreaWidth,
} from "../../../../utils";
import { PanelItem } from "./styled";
import { combine } from "effector";

const $state = combine({
  activeElement: $activeElement,
  tree: $componentsTree,
});

export const AlignBlock = () => {
  const { activeElement, tree } = useStore($state);

  if (!activeElement) {
    return null;
  }

  const { width, height } = tree.area;

  const { style } = getStyleFromAreaWidth(activeElement.attributes, width);

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
                    y: getAreaHeightFromAreaWidth(height, width) - style.height,
                  })
                }
              />
            </div>
          </Tooltip>

          <Tooltip label="to middle">
            <div>
              <AlignMiddleIcon
                onClick={() =>
                  handleChangePosition({
                    y:
                      (getAreaHeightFromAreaWidth(height, width) -
                        style.height) /
                      2,
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
        <Flex w="30%" justifyContent="space-between" alignItems="center">
          <Tooltip label="to left">
            <div>
              <AlignLeftIcon onClick={() => handleChangePosition({ x: 0 })} />
            </div>
          </Tooltip>

          <Tooltip label="to center">
            <div>
              <AlignCenterIcon
                onClick={() =>
                  handleChangePosition({
                    x: (width - style.width) / 2,
                  })
                }
              />
            </div>
          </Tooltip>

          <Tooltip label="to right">
            <div>
              <AlignRightIcon
                onClick={() => handleChangePosition({ x: width - style.width })}
              />
            </div>
          </Tooltip>
        </Flex>
      </Flex>
    </PanelItem>
  );
};
