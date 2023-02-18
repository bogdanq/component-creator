import { ResizableBox, ResizeCallbackData } from 'react-resizable'
import { useLayoutEffect, useRef } from 'react'
import { Element, handleChangeElementResize } from '../../../models'
import { useZoom } from '../../../hooks'
import { useLockAspectRatio } from './use-lock-ratio'

type Props = {
  children: (ref: React.RefObject<HTMLDivElement>) => JSX.Element
  style: Element['attributes'][1600]['style']
  id: string
  content: string
  disabled: boolean
}

export function WithResizable({
  children,
  style: { width, height },
  id,
  content,
  disabled,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const zoom = useZoom()

  const isLockAspectRatio = useLockAspectRatio()

  useLayoutEffect(() => {
    if (ref.current) {
      const BORDER_WIDTH = 2
      const content = ref.current.querySelector('.content-area')
      const cs = content?.getBoundingClientRect()

      handleChangeElementResize({
        width: Math.ceil((cs?.width ?? 0) / zoom + BORDER_WIDTH),
        height: Math.ceil((cs?.height ?? 0) / zoom + BORDER_WIDTH),
        id,
      })
    }
    // eslint-disable-next-line
  }, [id, content])

  const onResize = (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    if (!disabled) {
      handleChangeElementResize({
        width: Math.ceil(size.width),
        height: Math.ceil(size.height),
        id,
      })
    }
  }

  return (
    <ResizableBox
      transformScale={zoom}
      lockAspectRatio={isLockAspectRatio}
      height={height}
      width={width}
      onResize={onResize}
    >
      {children(ref)}
    </ResizableBox>
  )
}
