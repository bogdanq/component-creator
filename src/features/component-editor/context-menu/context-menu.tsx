import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Menu, Item, Separator, useContextMenu } from 'react-contexify'
import {
  toggleVerticalGuide,
  toggleHorizontalGuide,
  toggleLayers,
  toggleSettings,
  $settings,
  $layers,
} from '../models'

const $state = combine({
  settings: $settings,
  layers: $layers,
})

const MENU_ID = 'editor area'
//  @TODO контекст меню
export const WithContextMenu = ({ children }: { children: JSX.Element }) => {
  const { settings, layers } = useStore($state)
  const { show } = useContextMenu({
    id: MENU_ID,
  })

  function handleContextMenu(event: React.MouseEvent) {
    show({
      event,
      props: {
        key: 'value',
      },
    })
  }

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>

      <Menu id={MENU_ID}>
        <Item onClick={() => toggleHorizontalGuide()}>Add horizontal rule</Item>
        <Item onClick={() => toggleVerticalGuide()}>Add vertical rule</Item>
        <Separator />
        <Item onClick={() => toggleLayers()}>
          {layers ? 'Hide layers' : 'Show layers'}
        </Item>
        <Item onClick={() => toggleSettings()}>
          {settings ? 'Hide settings' : 'Show settings'}
        </Item>
      </Menu>
    </>
  )
}
