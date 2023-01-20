import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useCallback, useEffect } from 'react'
import { Resizable, ResizeCallbackData } from 'react-resizable'
import {
  $contentAreaHeight,
  Dimensions,
  handleChangeContentAreaHeight,
  $componentsTree,
} from '../../models'
import { createGrid } from '../../utils'
import { ContentWrapper } from './styled'

type Props = {
  children: JSX.Element
  contentAreaWidth: Dimensions
}

const $state = combine({
  areaHeight: $contentAreaHeight,
  tree: $componentsTree,
})

// ресайз область для общей рабочей области (только высота)
export const WithContentResizeble = ({ children, contentAreaWidth }: Props) => {
  const { areaHeight, tree } = useStore($state)

  const height = areaHeight[contentAreaWidth] ?? areaHeight[1200]

  const onResize = useCallback(
    (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
      handleChangeContentAreaHeight(size.height)
    },
    [],
  )

  useEffect(() => {
    createGrid(contentAreaWidth, height, '#grid')
  }, [contentAreaWidth, height])

  return (
    <Resizable height={height} width={contentAreaWidth} onResize={onResize}>
      <ContentWrapper
        style={{
          width: `${contentAreaWidth}px`,
          height,
          backgroundImage: `url(${tree.area.content})`,
        }}
      >
        {children}

        {/* @TODO сетка канваса, возможно вынести */}
        <canvas
          style={{ zIndex: 0 }}
          id="grid"
          width={contentAreaWidth}
          height={height}
        />
      </ContentWrapper>
    </Resizable>
  )
}
