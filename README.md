![Screenshot showing responsive iframe viewer demo](https://github.com/danmindru/react-responsive-iframe-viewer/assets/1515742/cbc09f80-f9a7-4a3a-ba23-1dd8b9b7fe47)

![Screenshot showing multiple demos, including dark mode](https://github.com/danmindru/react-responsive-iframe-viewer/assets/1515742/94a50b53-0344-4b91-bec6-1c4d33034f9b)


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

```sh
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
`src` - The URL of the iframe content<br />
`title` - The title of the iframe content<br />
`size` - The size of the iframe container<br />
`minWidth` - The minimum width to resize down to (**default: 200**)<br />
`minHeight` - The minimum height to resize down to (**default: 200**)<br />
`showControls` - Whether to show device controls or not (**default: true**)<br />
`enabledControls` - An array of controls to enable (**default: [ViewportSize.mobile, ViewportSize.tablet, ViewportSize.desktop, ViewportSize.fluid]**)<br />
`allowResizingY` - Whether to allow resizing the iframe container vertically (**default: false**)<br />
`allowResizingX` - Whether to allow resizing the iframe container horizontally (**default: false**)<br />
`fluidX` - Forces the width to 100% regardless of other settings (**default: false**)<br />
`fluidY` - Forces the height to 100% regardless of other settings (**default: false**)<br />
`onIframeLoad` - Event handler called when the iframe content has finished loading<br />


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
  miniMobile: {
    width: 320,
    height: 480,
  },
  mobile: {
    width: 375,
    height: 667,
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

![Screenshot showing a nice demo with a shadow](https://github.com/danmindru/react-responsive-iframe-viewer/assets/1515742/aa130a18-9997-4dfd-a607-1e3c65c4840c)

-----------------

<a href="https://apihustle.com" target="_blank">
  <img height="60px" src="https://user-images.githubusercontent.com/1515742/215217833-c07183d2-f688-4d1c-86ea-329f3b28f81c.svg" alt="Apihustle Logo" />
</a>

-----------------

Save 10s of hours of work by using Shipixen to generate a customized codebases with your branding, pages and blog <br/>
― then deploy it to Vercel with 1 click.

| | |
| :- | :- |
| <a href="https://shipixen.com" target="_blank"><img height="60px" src="https://user-images.githubusercontent.com/1515742/281071510-d5c0095d-d336-4857-ad80-d18cf65f4acb.png" alt="Shipixen Logo" /></a> <br/> <b>Shipixen</b> <br/> Create a blog & landing page in minutes with <b>Shipixen</b>. <br/> Try the app on <a href="https://shipixen.com">shipixen.com</a>. | <a href="https://shipixen.com" target="_blank"><img width="300px" src="https://user-images.githubusercontent.com/1515742/281077548-57b24773-3c2a-4e89-b088-cc3945d7037b.png" alt="Shipixen Logo" /></a> |

-----------------

Apihustle is a collection of tools to test, improve and get to know your API inside and out. <br/>
[apihustle.com](https://apihustle.com) <br/>

|    |    |    |    |
| :- | :- | :- | :- |
| <a href="https://shipixen.com" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/3af97560-d774-4149-96c5-65d3cc530a5a" alt="Shipixen Logo" /></a> | **Shipixen** | Create a personalized blog & landing page in minutes | [shipixen.com](https://shipixen.com) |
| <a href="https://pageui.dev" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/953cc5ab-bbf4-4a19-9b16-c74d218b63b4" alt="Page UI Logo" /></a> | **Page UI** | Landing page UI components for React & Next.js | [pageui.dev](https://pageui.dev) |
| <a href="https://clobbr.app" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/50c11d46-a025-40fd-b154-0a5984556f6e" alt="Clobbr Logo" /></a> | **Clobbr** | Load test your API endpoints. | [clobbr.app](https://clobbr.app) |
| <a href="https://crontap.com" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/fe1aac71-b663-4f8e-a225-0c47b2eee14d" alt="Crontap Logo" /></a> | **Crontap** | Schedule API calls using cron syntax. | [crontap.com](https://crontap.com) |
| <a href="https://tool.crontap.com" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/713ff923-b03c-43ec-9cfd-75e542d0f5c4" alt="CronTool Logo" /></a> | **CronTool** | Debug multiple cron expressions on a calendar. | [tool.crontap.com](https://tool.crontap.com)  |

-----------------

