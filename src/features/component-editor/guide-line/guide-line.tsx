import { useStore } from 'effector-react'
import DefaultDraggable from 'react-draggable'
import {
  $guideLine,
  toggleHorizontalGuide,
  toggleVerticalGuide,
} from '../models'
import {
  GuideHorizontal,
  GuideVertical,
  GuideItemVertical,
  GuideItemHorizontal,
  Close,
} from './styled'

// @TODO линейки для вравнивания
export const GuideLine = () => {
  const { v, h } = useStore($guideLine)

  return (
    <>
      {h && (
        <DefaultDraggable axis="y" handle=".guide-h">
          <GuideHorizontal className="guide-h">
            <GuideItemHorizontal>
              <Close onClick={() => toggleHorizontalGuide()}>x</Close>
            </GuideItemHorizontal>
          </GuideHorizontal>
        </DefaultDraggable>
      )}

      {v && (
        <DefaultDraggable axis="x" handle=".guide-v">
          <GuideVertical className="guide-v">
            <GuideItemVertical>
              <Close onClick={() => toggleVerticalGuide()}>x</Close>
            </GuideItemVertical>
          </GuideVertical>
        </DefaultDraggable>
      )}
    </>
  )
}
