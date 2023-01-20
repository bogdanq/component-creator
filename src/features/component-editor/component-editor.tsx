import { useCallback } from 'react'
import 'react-contexify/ReactContexify.css'
import { useStore } from 'effector-react'
import { Global } from '@emotion/react'
import { EditorArea } from './editor-area'
import { Header } from './header'
import { LeftSideBox } from './left-box'
import { RightSideBox } from './right-box'
import { WithContextMenu } from './context-menu'
import { GuideLine } from './guide-line'
import {
  $contentAreaWidth,
  handleChangeContentAreaWidth,
  Dimensions,
} from './models'

import { AreaWrapper } from './styled'
import { globalCss } from './global-styles'

export function ComponentEditor() {
  const contentWidth = useStore($contentAreaWidth)

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
          <Header
            handleChangeWidth={handleChangeWidth}
            contentWidth={contentWidth}
          />
          <LeftSideBox />
          <RightSideBox />
        </>

        <EditorArea />
      </AreaWrapper>
    </WithContextMenu>
  )
}
