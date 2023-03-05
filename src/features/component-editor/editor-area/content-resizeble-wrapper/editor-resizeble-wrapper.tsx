import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useCallback, useEffect } from 'react'
import { Resizable, ResizeCallbackData } from 'react-resizable'
import { handleChangeContentAreaHeight, $componentsTree } from '../../models'
import { createGrid, getAreaHeightFromAreaWidth } from '../../utils'
import { ComputedStyles } from '../elements-workspace/styled'
import { ContentWrapper } from './styled'

type Props = {
  children: JSX.Element
}

const $state = combine({
  tree: $componentsTree,
})

// ресайз область для общей рабочей области (только высота)
export const WithContentResizeble = ({ children }: Props) => {
  const { tree } = useStore($state)

  const { width, styles } = tree.area

  const height = getAreaHeightFromAreaWidth(tree.area.height, width)

  const onResize = useCallback(
    (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
      handleChangeContentAreaHeight(size.height)
    },
    [],
  )

  useEffect(() => {
    createGrid(width, height, '#grid')
  }, [width, height])

  return (
    <Resizable height={height} width={width} onResize={onResize}>
      <ContentWrapper
        className="content-area"
        style={{
          width: `${width}px`,
          height: height,
          backgroundImage: `url(${tree.area.content})`,
          ...styles,
        }}
      >
        {children}

        {/* @TODO сетка канваса, возможно вынести */}
        <canvas style={{ zIndex: 0 }} id="grid" width={width} height={height} />
        <ComputedStyles isActive>{`${Math.round(width)} x ${Math.round(
          height,
        )}`}</ComputedStyles>
      </ContentWrapper>
    </Resizable>
  )
}
