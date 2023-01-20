import {
  Resizable as DefaultResizable,
  ResizeCallbackData,
} from 'react-resizable'
import { useLayoutEffect, useRef } from 'react'
import { Element, handleChangeResize } from '../../../models'

type Props = {
  children: (ref: React.RefObject<HTMLDivElement>) => JSX.Element
  style: Element['attributes'][1200]['style']
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

  useLayoutEffect(() => {
    if (ref.current) {
      const BORDER_WIDTH = 2
      const content = ref.current.querySelector('.content-area')
      const cs = content?.getBoundingClientRect()

      // получение зума, что бы ширина была всегда одинаковой
      // @TODO у либы нет к нему доступа - поэтому напрямую
      const area = document.querySelector('.react-flow__viewport')
      const st = area?.getAttribute('style') ?? ''
      const zoom = Number(st.match(/\(([\d.-]+)\)/)?.[1])

      handleChangeResize({
        width: Math.ceil((cs?.width ?? 0) / zoom + BORDER_WIDTH),
        height: Math.ceil((cs?.height ?? 0) / zoom + BORDER_WIDTH),
        id,
      })
    }
    // eslint-disable-next-line
  }, [id, content])

  const onResize = (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    if (!disabled) {
      handleChangeResize({
        width: Math.ceil(size.width),
        height: Math.ceil(size.height),
        id,
      })
    }
  }

  return (
    <DefaultResizable height={height} width={width} onResize={onResize}>
      {children(ref)}
    </DefaultResizable>
  )
}
