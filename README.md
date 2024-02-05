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

### Custom sizes

You can provide a custom width/height for the iframe container.
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
  MOBILE: {
    width: 320,
    height: 568,
  },
  TABLET: {
    width: 768,
    height: 1024,
  },
  DESKTOP: {
    width: 1024,
    height: 768,
  },
};
```

![CleanShot 2024-02-05 at 16 34 (1)](https://github.com/danmindru/react-responsive-iframe-viewer/assets/1515742/aa130a18-9997-4dfd-a607-1e3c65c4840c)

