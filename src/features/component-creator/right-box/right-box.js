import { Text, Flex, Button } from "@chakra-ui/react";
import { useStore } from "effector-react";
import {
  removeElementFromTree,
  copyTreeElement,
  disabledElement,
  $activeElement,
} from "../model";
import { BoxWrapper, BoxHeader, PanelItem } from "./styled";

const ElementsStyleSettingsBlock = ({ activeElement }) => {
  const elementActions = [
    { title: "Delete", action: () => removeElementFromTree(activeElement) },
    { title: "Copy", action: () => copyTreeElement(activeElement) },
    { title: "Lock", action: () => disabledElement(activeElement) },
  ];

  return (
    <PanelItem className="tn-right-box">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex w="35%">
          <Text fontSize="sm" opacity="0.5">
            Actions
          </Text>
        </Flex>
        <Flex justifyContent="space-between" w="65%">
          {elementActions.map((action) => (
            <Button
              colorScheme="black"
              color="black"
              border="1px solid rgba(0,0,0,.2)"
              size="xs"
              key={action.title}
              onClick={action.action}
            >
              {action.title}
            </Button>
          ))}
        </Flex>
      </Flex>
    </PanelItem>
  );
};

const ElementsComputedStylesBlock = () => {
  return (
    <PanelItem>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex w="40%" justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            X
          </Text>

          <Button
            colorScheme="black"
            color="black"
            border="1px solid rgba(0,0,0,.2)"
            size="xs"
          >
            x px
          </Button>
        </Flex>

        <Flex w="40%" justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            Y
          </Text>

          <Button
            colorScheme="black"
            color="black"
            border="1px solid rgba(0,0,0,.2)"
            size="xs"
          >
            y px
          </Button>
        </Flex>
      </Flex>
      <Flex mt="25px" alignItems="center" justifyContent="space-between">
        <Flex w="40%" justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            Width
          </Text>

          <Button
            colorScheme="black"
            color="black"
            border="1px solid rgba(0,0,0,.2)"
            size="xs"
          >
            w px
          </Button>
        </Flex>

        <Flex w="40%" justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            Height
          </Text>

          <Button
            colorScheme="black"
            color="black"
            border="1px solid rgba(0,0,0,.2)"
            size="xs"
          >
            h px
          </Button>
        </Flex>
      </Flex>
    </PanelItem>
  );
};

export const RightSideBox = () => {
  const activeElement = useStore($activeElement);

  return (
    <BoxWrapper>
      <BoxHeader>
        <Text opacity="0.4" textTransform="uppercase" fontSize="sm">
          Artboard settings
        </Text>
      </BoxHeader>

      {activeElement && (
        <>
          <ElementsComputedStylesBlock />
          <ElementsStyleSettingsBlock activeElement={activeElement} />
        </>
      )}
    </BoxWrapper>
  );
};
