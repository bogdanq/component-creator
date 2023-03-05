import { Text, Flex, Input } from '@chakra-ui/react'
import { ElementButton, handleChangeMetaDataButton } from '../../../../models'
import { BlockTitle } from '../../../block-title'
import { PanelItem } from './styled'

export const HoverBlock = ({
  activeElement,
}: {
  activeElement: ElementButton
}) => {
  return (
    <>
      <BlockTitle>Hover</BlockTitle>

      <PanelItem>
        <Flex direction="column">
          <Flex justifyContent="space-between">
            <Text fontSize="sm" opacity="0.5" w="63%">
              Bg color
            </Text>

            <Input
              size="xs"
              placeholder="bg color"
              focusBorderColor="#00000033"
              background="transparent"
              value={activeElement.meta.hover?.backgroundColor}
              onChange={(e) =>
                handleChangeMetaDataButton({
                  id: activeElement.id,
                  value: e.target.value,
                  metaName: 'backgroundColor',
                })
              }
            />
          </Flex>

          <Flex mt="25px" justifyContent="space-between">
            <Text fontSize="sm" opacity="0.5" w="63%">
              Color
            </Text>

            <Input
              size="xs"
              placeholder="color"
              focusBorderColor="#00000033"
              background="transparent"
              value={activeElement.meta.hover?.color}
              onChange={(e) =>
                handleChangeMetaDataButton({
                  id: activeElement.id,
                  value: e.target.value,
                  metaName: 'color',
                })
              }
            />
          </Flex>

          <Flex mt="25px" justifyContent="space-between">
            <Text fontSize="sm" opacity="0.5" w="63%">
              Border color
            </Text>

            <Input
              size="xs"
              placeholder="border color"
              focusBorderColor="#00000033"
              background="transparent"
              value={activeElement.meta.hover?.borderColor}
              onChange={(e) =>
                handleChangeMetaDataButton({
                  id: activeElement.id,
                  value: e.target.value,
                  metaName: 'borderColor',
                })
              }
            />
          </Flex>
        </Flex>
      </PanelItem>
    </>
  )
}
