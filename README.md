![iframe-thing (1)](https://github.com/danmindru/react-responsive-iframe-viewer/assets/1515742/94a50b53-0344-4b91-bec6-1c4d33034f9b)


# React Responsive Iframe Viewer
View iframe content in a responsive container that can:

- Switch between common devices sizes
  - Mobile
  - Tablet
  - Desktop
- Resize using the provided handles
- ✨ all animated & pretty
- 🌚 and with dark mode support

## Installation

Grab the package from npm:

```bash
npm install react-responsive-iframe-viewer
```

## Usage

```tsx
import { ResponsiveIframeViewer, ViewportSizeType } from 'react-responsive-iframe-viewer';

<ResponsiveIframeViewer
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Rick Astley - Never Gonna Give You Up"
  size={ViewportSizeType.mobile}
/>
```

## Options & Props
`src` - The URL of the iframe content
`title` - The title of the iframe content
`size` - The size of the iframe container
`showControls` - Whether to show device controls or not (**default: true**)
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

