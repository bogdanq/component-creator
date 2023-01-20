import {
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { handleChangeStyle, Element, Dimensions } from '../../../../models'
import { getStyleFromAreaWidth } from '../../../../utils'
import { PanelItem } from './styled'

const NumberField = ({
  onChange,
  value,
}: {
  onChange: (v: number) => void
  value: number
}) => {
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
  )
}

export const ElementsComputedStylesBlock = ({
  activeElement,
  contentAreaWidth,
}: {
  activeElement: Element
  contentAreaWidth: Dimensions
}) => {
  const { style } = getStyleFromAreaWidth(
    activeElement.attributes,
    contentAreaWidth,
  )

  return (
    <PanelItem>
      <Flex direction="column">
        <Flex justifyContent="space-between">
          <Text fontSize="sm" opacity="0.5">
            X (px)
          </Text>
          <NumberField
            onChange={(value) =>
              handleChangeStyle({ value, name: 'x', id: activeElement.id })
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
              handleChangeStyle({ value, name: 'y', id: activeElement.id })
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
              handleChangeStyle({ value, name: 'width', id: activeElement.id })
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
              handleChangeStyle({ value, name: 'height', id: activeElement.id })
            }
            value={style.height}
          />
        </Flex>
      </Flex>
    </PanelItem>
  )
}
