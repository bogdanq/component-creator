import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { ContentEditableEvent } from 'react-contenteditable'
import {
  $componentsTree,
  $dubleClickElementId,
  $activeElement,
  doubleClickElement,
  setActiveElement,
  handleChangeTextContent,
  Elements,
  $contentAreaWidth,
} from '../../models'
import { getStyleFromAreaWidth } from '../../utils'
import { WithDraggable, WithResizable } from './index'
import {
  Button,
  Shape,
  Image,
  ElementWrapper,
  ComputedStyles,
  Text,
} from './styled'

// TODO тут список всех доступных узлов, вынести по отдельности
const ElementItem = ({
  type,
  content,
  id,
  isDubbleClick,
}: {
  type: Elements
  content: string
  id: string
  isDubbleClick: boolean
}) => {
  if (type === 'shape') {
    return (
      <Shape
        className="shape content-area"
        style={{
          background: `url(${content}) 0% 0% / 100% 100% no-repeat`,
        }}
      />
    )
  }

  if (type === 'image') {
    return (
      <Image
        className="image content-area"
        style={{
          background: `url(${content}) 0% 0% / 100% 100% no-repeat`,
        }}
      />
    )
  }

  if (type === 'button') {
    return (
      <Button
        className="button content-area"
        disabled={!isDubbleClick}
        html={content}
        onChange={(e: ContentEditableEvent) => {
          handleChangeTextContent({ text: e.target.value, id })
        }}
        tagName="article"
      />
    )
  }

  if (type === 'text') {
    return (
      <Text
        className="text content-area"
        disabled={!isDubbleClick}
        html={content}
        onChange={(e: ContentEditableEvent) => {
          handleChangeTextContent({ text: e.target?.value, id })
        }}
        tagName="article"
      />
    )
  }

  return null
}

const $state = combine({
  tree: $componentsTree,
  activeElement: $activeElement,
  dubleClickElementId: $dubleClickElementId,
  contentAreaWidth: $contentAreaWidth,
})

export function ElementsTree() {
  const { tree, activeElement, dubleClickElementId, contentAreaWidth } =
    useStore($state)

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // @ts-ignore
      const id = e?.target?.closest('[data-component-id]')
      // @ts-ignore
      const isSettingBox = !!e?.target?.closest('.setting-box')

      if (!id && !isSettingBox) {
        setActiveElement(null)
      }
    }

    window.addEventListener('click', listener)

    return () => window.removeEventListener('click', listener)
  }, [])

  useEffect(() => {
    doubleClickElement(null)
  }, [activeElement?.id])

  return (
    <>
      {tree.elements.map((element) => {
        const { type, id, attributes, disabled } = element

        const { style, content } = getStyleFromAreaWidth(
          attributes,
          contentAreaWidth,
        )

        const isActive = activeElement?.id === id
        const isDubbleClick = dubleClickElementId === id

        const position =
          style.width && style.height
            ? {
                width: style.width + 'px',
                height: style.height + 'px',
              }
            : {}

        return (
          <WithDraggable
            key={id}
            id={id}
            style={style}
            disabled={isDubbleClick || !isActive || disabled}
            type={type}
            isActive={isActive}
          >
            <WithResizable
              disabled={disabled}
              id={id}
              style={style}
              content={content}
            >
              {(ref) => (
                <ElementWrapper
                  type={type}
                  className={`${type}-wrapper`}
                  isActive={isActive}
                  dubbleActive={isDubbleClick}
                  ref={ref}
                  onClick={() => setActiveElement(element.id)}
                  onDoubleClick={(e) => {
                    const article = e.currentTarget?.querySelector('article')

                    setTimeout(() => {
                      article?.focus()
                    })

                    doubleClickElement(element.id)
                  }}
                  data-component-id={id}
                  style={position}
                >
                  <>
                    <>
                      {isActive && (
                        <ComputedStyles isActive>{`${Math.round(
                          style.x,
                        )} x ${Math.round(style.y)}`}</ComputedStyles>
                      )}
                      {isDubbleClick && (
                        <ComputedStyles>{`${Math.round(
                          style.width,
                        )} x ${Math.round(style.height)}`}</ComputedStyles>
                      )}
                    </>

                    <ElementItem
                      type={type}
                      content={content}
                      id={id}
                      isDubbleClick={isDubbleClick}
                    />
                  </>
                </ElementWrapper>
              )}
            </WithResizable>
          </WithDraggable>
        )
      })}
    </>
  )
}
