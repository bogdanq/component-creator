import {
  Text,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import {
  removeElementFromTree,
  copyTreeElement,
  disabledElement,
  $activeElement,
  handleChangeStyle,
} from "../model";
import { BoxWrapper, BoxHeader, PanelItem } from "./styled";

const ElementsStyleSettingsBlock = ({ activeElement }) => {
  const elementActions = [
    { title: "Delete", action: () => removeElementFromTree(activeElement) },
    { title: "Copy", action: () => copyTreeElement(activeElement) },
    {
      title: activeElement.disabled ? "UnLock" : "Lock",
      action: () => disabledElement(activeElement),
    },
  ];

  return (
    <PanelItem>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex w="35%">
          <Text fontSize="sm" opacity="0.5">
            Actions
          </Text>
        </Flex>
        <Flex justifyContent="space-between" w="65%">
          {elementActions.map((action, idx) => (
            <Button
              key={idx}
              colorScheme="black"
              color="black"
              border="1px solid rgba(0,0,0,.2)"
              size="xs"
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

const NumberField = ({ onChange, value }) => {
  return (
    <NumberInput
      onChange={(v) => onChange(Number(v))}
      value={value}
      focusBorderColor="#00000033"
      size="xs"
      step={1}
    >
      <NumberInputField />

      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

const ElementsComputedStylesBlock = ({ activeElement }) => {
  const { style } = activeElement.attributes;

  return (
    <PanelItem>
      <Flex direction="column">
        <Flex justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            X (px)
          </Text>
          <NumberField
            onChange={(value) =>
              handleChangeStyle({ value, name: "x", id: activeElement.id })
            }
            value={style.x}
          />
        </Flex>

        <Flex mt="25px" justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            Y (px)
          </Text>
          <NumberField
            onChange={(value) =>
              handleChangeStyle({ value, name: "y", id: activeElement.id })
            }
            value={style.y}
          />
        </Flex>
      </Flex>
      <Flex mt="25px" direction="column">
        <Flex justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            Width (px)
          </Text>
          <NumberField
            onChange={(value) =>
              handleChangeStyle({ value, name: "width", id: activeElement.id })
            }
            value={style.width}
          />
        </Flex>

        <Flex mt="25px" justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            Height (px)
          </Text>
          <NumberField
            onChange={(value) =>
              handleChangeStyle({ value, name: "height", id: activeElement.id })
            }
            value={style.height}
          />
        </Flex>
      </Flex>
    </PanelItem>
  );
};

export const RightSideBox = () => {
  const activeElement = useStore($activeElement);

  return (
    <BoxWrapper className="setting-box">
      <BoxHeader>
        <Text opacity="0.4" textTransform="uppercase" fontSize="sm">
          Artboard settings
        </Text>
      </BoxHeader>

      {activeElement && (
        <>
          <ElementsComputedStylesBlock activeElement={activeElement} />
          <ElementsStyleSettingsBlock activeElement={activeElement} />
        </>
      )}
    </BoxWrapper>
  );
};
