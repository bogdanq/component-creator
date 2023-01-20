import { createEvent, createStore } from 'effector'

export const toggleVerticalGuide = createEvent()
export const toggleHorizontalGuide = createEvent()

export const toggleLayers = createEvent()

export const toggleSettings = createEvent()

export const $guideLine = createStore({ h: false, v: false })
  .on(toggleVerticalGuide, (state) => ({ ...state, v: !state.v }))
  .on(toggleHorizontalGuide, (state) => ({ ...state, h: !state.h }))

export const $layers = createStore(true).on(toggleLayers, (state) => !state)

export const $settings = createStore(true).on(toggleSettings, (state) => !state)
