![iframe-thing (1)](https://github.com/danmindru/react-responsive-iframe-viewer/assets/1515742/94a50b53-0344-4b91-bec6-1c4d33034f9b)


# React Responsive Iframe Viewer
[![npm version](https://badge.fury.io/js/react-responsive-iframe-viewer.svg)](https://badge.fury.io/js/react-responsive-iframe-viewer)

View iframe content in a responsive container that can:

- Switch between common devices sizes
  - Mobile
  - Tablet
  - Desktop
- Resize using the provided handles
- ✨ all animated & pretty
- 🌚 and with dark mode support


[Demo 🚀](https://react-responsive-iframe-viewer.vercel.app/) / [Usage examples 👨‍💻](https://github.com/danmindru/react-responsive-iframe-viewer/blob/main/src/App.tsx)

## Getting started


### Install
Grab the package from npm:

```bash
npm install react-responsive-iframe-viewer
```

### Setup styles

#### With TailwindCSS
If you use TailwindCSS, you need to mark this package as content:

**tailwind.config.js**

```js
module.exports = {
  content: [
+   'node_modules/react-responsive-iframe-viewer/**/*.{js,ts,jsx,tsx,html}',
    ...
  ]
}
```

Dark mode is supported out of the box for TailwindCSS.

#### Without TailwindCSS
If you don't use TailwindCSS, you can import the styles directly:

```tsx
import 'react-responsive-iframe-viewer/dist/style.css'
```

## Usage

```tsx
import { ResponsiveIframeViewer, ViewportSize } from 'react-responsive-iframe-viewer';

<ResponsiveIframeViewer
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Rick Astley - Never Gonna Give You Up"
  size={ViewportSize.mobile}
/>
```

## Options & Props
`src` - The URL of the iframe content
`title` - The title of the iframe content
`size` - The size of the iframe container
`minWidth` - The minimum width to resize down to (**default: 200**)
`minHeight` - The minimum height to resize down to (**default: 200**)
`showControls` - Whether to show device controls or not (**default: true**)
`enabledControls` - An array of controls to enable (**default: [ViewportSize.mobile, ViewportSize.tablet, ViewportSize.desktop, ViewportSize.fluid]**)
`allowResizingY` - Whether to allow resizing the iframe container vertically (**default: false**)
`allowResizingX` - Whether to allow resizing the iframe container horizontally (**default: false**)


### Custom sizes

You can provide a custom width/height for the iframe container:
- `width` - The width of the iframe container
- `height` - The height of the iframe container

The `size` prop will be ignored if `width` and `height` are provided.

```tsx
<ResponsiveIframeViewer
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Rick Astley - Never Gonna Give You Up"
  width={320}
  height={568}
/>
```

## Custom controls

It is possible to only show a subset of the available viewport toggles by passing in a list of enabled controls:

```tsx
import { ResponsiveIframeViewer, ViewportSize } from "../lib/main";

<ResponsiveIframeViewer
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Rick Astley - Never Gonna Give You Up"
  size={ViewportSize.mobile}
+  enabledControls={[ViewportSize.mobile, ViewportSize.fluid]}
  allowResizingX
/>
```

## Supported sizes

```tsx
export const VIEWPORT_SIZES = {
  mobile: {
    width: 320,
    height: 568,
  },
  tablet: {
    width: 768,
    height: 1024,
  },
  desktop: {
    width: 1024,
    height: 768,
  },
  fluid: {
    width: "100%",
    height: "100%",
  },

  // Tailwind Viewports
  sm: {
    width: 640,
    height: 1136,
  },

  md: {
    width: 768,
    height: 1024,
  },

  lg: {
    width: 1024,
    height: 768,
  },

  xl: {
    width: 1280,
    height: 720,
  },

  "2xl": {
    width: 1536,
    height: 864,
  },

  "3xl": {
    width: 1920,
    height: 1080,
  },
};
```

![CleanShot 2024-02-05 at 16 34 (1)](https://github.com/danmindru/react-responsive-iframe-viewer/assets/1515742/aa130a18-9997-4dfd-a607-1e3c65c4840c)

