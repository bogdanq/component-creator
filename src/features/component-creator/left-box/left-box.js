import { Box, Text, Flex } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { combine } from "effector";
import { EditIcon } from "@chakra-ui/icons";
import { $activeElement, $componentsTree, setActiveElement } from "../model";
import { BoxWrapper, BoxHeader } from "./styled";

const $state = combine({
  activeElement: $activeElement,
  tree: $componentsTree,
});

export const LeftSideBox = () => {
  const { tree, activeElement } = useStore($state);

  return (
    <BoxWrapper className="tn-left-box">
      <BoxHeader>
        <Box pos="fixed" bg="#ebebeb" left="10px" w="150px">
          <Text opacity="0.4" textTransform="uppercase" fontSize="sm" pl="15px">
            Elements tree
          </Text>
        </Box>

        <Flex direction="column" pt="50px">
          {tree.map((element) => (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              cursor="pointer"
              padding="15px 0"
              key={element.id}
              onClick={() => setActiveElement(element)}
            >
              <Box>
                <Text
                  fontSize="14px"
                  lineHeight="16px"
                  color="font.dark"
                  textTransform="capitalize"
                >
                  {element.type}
                </Text>
              </Box>
              {activeElement?.id === element.id && <EditIcon />}
            </Flex>
          ))}
        </Flex>
      </BoxHeader>
    </BoxWrapper>
  );
};
