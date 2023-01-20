import { css } from '@emotion/react'

export const globalCss = css`
  #root {
    overflow: scroll;
  }
  /* resize */
  .react-resizable {
    position: relative;
    border-radius: 0;
  }

  .react-resizable-handle {
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
