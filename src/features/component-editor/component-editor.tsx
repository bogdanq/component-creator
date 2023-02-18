import { useCallback } from 'react'
import 'react-contexify/ReactContexify.css'
import { Global } from '@emotion/react'
import { EditorArea } from './editor-area'
import { Header } from './header'
import { LeftSideBox } from './left-box'
import { RightSideBox } from './right-box'
import { WithContextMenu } from './context-menu'
import { GuideLine } from './guide-line'
import { handleChangeContentAreaWidth, Dimensions, Tree } from './models'

import { AreaWrapper } from './styled'
import { globalCss } from './global-styles'

type Props = {
  onSave: (componentsTree: Tree) => void
}

export function ComponentEditor({ onSave }: Props) {
  const handleChangeWidth = useCallback((w: Dimensions) => {
    handleChangeContentAreaWidth(w)
  }, [])

  return (
    <WithContextMenu>
      <AreaWrapper className="zoom-area">
        <>
          <Global styles={globalCss} />
          <GuideLine />
        </>

        <>
          <Header handleChangeWidth={handleChangeWidth} onSave={onSave} />
          <LeftSideBox />
          <RightSideBox />
        </>

        <EditorArea />
      </AreaWrapper>
    </WithContextMenu>
  )
}
