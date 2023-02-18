import { Text } from '@chakra-ui/react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { $activeElement, $settings, $componentsTree } from '../models'
import { BoxPanelItems } from './box-items'
import { BoxWrapper, BoxHeader } from './styled'

const $state = combine({
  settings: $settings,
  activeElement: $activeElement,
  tree: $componentsTree,
})

export const RightSideBox = () => {
  const { activeElement, settings, tree } = useStore($state)

  if (!settings) {
    return null
  }

  return (
    <BoxWrapper className="setting-box">
      <BoxHeader>
        <Text opacity="0.4" textTransform="uppercase" fontSize="sm">
          Artboard settings
        </Text>
      </BoxHeader>

      <BoxPanelItems
        contentAreaWidth={tree.area.width}
        activeElement={activeElement}
      />
    </BoxWrapper>
  )
}
