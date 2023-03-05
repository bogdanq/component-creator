import { css } from '@emotion/react'
import {
  Image,
  Button,
  Shape,
  Link,
} from '../component-editor/editor-area/elements-workspace/styled'

export const globalCss = css`
  #root {
    overflow: scroll;
  }
  /* resize */
  .react-resizable {
    position: relative;
    border-radius: 0;
  }

  .react-resizable-handle,
  .react-resizable-handle-se {
    display: none;
    position: absolute;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
    background-size: cover;
  }
`
/*
TODO
  подключаются в билд
  подключаются в превью
  подключаются в редактор лендингов
*/
export const defaultComponentStyles = css`
  .button {
    ${Button.__emotion_styles}
  }
  .image {
    ${Image.__emotion_styles}
    position: absolute;
  }
  .shape {
    ${Shape.__emotion_styles}
  }
  .text {
    overflow-wrap: anywhere;
    position: absolute;
  }
  .link {
    ${Link.__emotion_styles};
    position: absolute;
  }

  .shape-wrapper,
  .text-wrapper,
  .link-wrapper,
  .image-wrapper,
  .button-wrapper {
    position: absolute;
    width: 100%;
  }

  .shape-wrapper {
    z-index: 4;
  }
  .text-wrapper {
    z-index: 5;
  }
  .link-wrapper {
    z-index: 7;
  }
  .image-wrapper {
    z-index: 3;
  }
  .button-wrapper {
    z-index: 6;
  }

  .fullWidth {
    width: 100vw !important;
  }
`

/*
  подключаются в билд
  подключаются в превью
*/
export const resetStyles = css`
  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    font-family: system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    touch-action: manipulation;
  }

  body {
    position: relative;
    min-height: 100%;
    font-feature-settings: 'kern';
  }

  *,
  *::before,
  *::after {
    border-width: 0;
    border-style: solid;
    box-sizing: border-box;
  }

  main {
    display: block;
  }

  hr {
    border-top-width: 1px;
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre,
  code,
  kbd,
  samp {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
    color: inherit;
    text-decoration: inherit;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bold;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none !important;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none !important;
  }

  body,
  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  button {
    background: transparent;
    padding: 0;
  }

  fieldset {
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    margin: 0;
    padding: 0;
  }

  textarea {
    resize: vertical;
  }

  button,
  [role='button'] {
    cursor: pointer;
  }

  button::-moz-focus-inner {
    border: 0 !important;
  }

  table {
    border-collapse: collapse;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    padding: 0;
    line-height: inherit;
    color: inherit;
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  [data-js-focus-visible]
    :focus:not([data-focus-visible-added]):not([data-focus-visible-disabled]) {
    outline: none;
    box-shadow: none;
  }

  select::-ms-expand {
    display: none;
  }
`
