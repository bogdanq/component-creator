import { combine } from 'effector'
import { useStore } from 'effector-react'
import { $activeElement, $settings, $componentsTree } from '../models'
import { BlockTitle } from './block-title'
import { BoxPanelItems } from './box-items'
import { BoxWrapper } from './styled'

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
      <BlockTitle>Artboard settings</BlockTitle>

      <BoxPanelItems area={tree.area} activeElement={activeElement} />
    </BoxWrapper>
  )
}
