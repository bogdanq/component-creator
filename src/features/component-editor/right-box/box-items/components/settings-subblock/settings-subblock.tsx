import { Text, Flex, Button } from '@chakra-ui/react'
import {
  removeElementFromTree,
  copyTreeElement,
  disabledElement,
  ElementTypes,
} from '../../../../models'
import { PanelItem } from './styled'

export const ElementsSettingsBlock = ({
  activeElement,
}: {
  activeElement: ElementTypes
}) => {
  const elementActions = [
    { title: 'Delete', action: () => removeElementFromTree(activeElement) },
    { title: 'Copy', action: () => copyTreeElement(activeElement) },
    {
      title: activeElement.disabled ? 'UnLock' : 'Lock',
      action: () => disabledElement(activeElement),
    },
  ]

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
  )
}
