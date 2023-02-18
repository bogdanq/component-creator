import { createEffect } from 'effector'

export const STYLES = [
  'opacity',
  'background-color',
  'color',
  'border-radius',
  'font-size',
  'line-height',
  'font-weight',
  'text-decoration',
  'border-color',
  'border-width',
] as Array<keyof CSSStyleDeclaration>

// позволяет получить текущие стили елемента при его загрузке
export const getElementsStyleFx = createEffect<
  string,
  { styles: string; elementId: string }
>((elementId) => {
  let styles = ''

  const element = document.querySelector<HTMLElement>(
    `[data-component-id="${elementId}"]`,
  )?.children[1]

  if (element) {
    const cs = window.getComputedStyle(element, null)

    STYLES.forEach((style) => {
      styles = styles + `${String(style)}: ${cs[style]};`
    })
  }

  return { styles, elementId }
})

// получить из строки стилей - строку обьект, что бы отобразить их в реакт
export const getStyleFromStringFx = (str: string): React.CSSProperties => {
  const styles: { [key: string]: string } = {}

  str.split(';').forEach((element) => {
    const style = element.trim().replace(/ /g, '')

    if (style) {
      const [key, value] = style.split(':')

      styles[
        key.replace(/-([a-z])/gi, function (s, group1) {
          return group1.toUpperCase()
        })
      ] = value
    }
  })

  return styles
}
