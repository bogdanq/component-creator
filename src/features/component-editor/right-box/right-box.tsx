import { Text } from '@chakra-ui/react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { $activeElement, $contentAreaWidth, $settings } from '../models'
import { BoxPanelItems } from './box-items'
import { BoxWrapper, BoxHeader } from './styled'

const $state = combine({
  settings: $settings,
  activeElement: $activeElement,
  contentAreaWidth: $contentAreaWidth,
})

export const RightSideBox = () => {
  const { activeElement, contentAreaWidth, settings } = useStore($state)

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
        contentAreaWidth={contentAreaWidth}
        activeElement={activeElement}
      />
    </BoxWrapper>
  )
}
