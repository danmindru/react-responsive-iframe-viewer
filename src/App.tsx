import "./App.css";
import { ResponsiveIframeViewer, ViewportSize } from "../lib/main";
import { GithubIcon, ExternalLinkIcon } from "lucide-react";

function App() {
  return (
    <div className="flex flex-col items-center p-4 gap-12">
      <div className="flex flex-col items-center w-full">
        <h1 className="m-0">React Responsive Iframe Viewer</h1>
        <p>Display iframes responsively in your React app, in style.</p>

        <div className="flex flex-wrap gap-8">
          <a
            href="https://github.com/danmindru/react-responsive-iframe-viewer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <GithubIcon className="w-5 h-5" /> Get it on GitHub
          </a>

          <a
            href="https://github.com/danmindru/react-responsive-iframe-viewer/blob/main/src/App.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLinkIcon className="w-5 h-5" /> See source for these
            examples
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm">Mobile viewport</h2>
      </div>

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.mobile}
        allowResizingY
        allowResizingX
      />

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm">Desktop viewport</h2>
      </div>

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.desktop}
        allowResizingY
      />

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm">Tablet viewport</h2>
      </div>

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.tablet}
        allowResizingX
      />

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm">Fluid viewport</h2>
        <p>
          This iframe will take up 100% of the width and height of its parent.
        </p>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveIframeViewer
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Rick Astley - Never Gonna Give You Up"
          size={ViewportSize.fluid}
          allowResizingX
        />
      </div>

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm"> Custom controls</h2>
        <p>Customize which controls are shown</p>
      </div>

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.mobile}
        enabledControls={[ViewportSize.mobile, ViewportSize.fluid]}
        allowResizingX
      />

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm">Tailwind controls</h2>
        <p>Use TailwindCSS breakpoints as controls</p>
      </div>

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.sm}
        enabledControls={[
          ViewportSize.sm,
          ViewportSize.md,
          // ViewportSize.lg,
          ViewportSize.xl,
          // ViewportSize["2xl"],
          ViewportSize["3xl"],
        ]}
        allowResizingX
      />

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm">Override built-in sizes</h2>
        <p>Modify width or height of built-in sizes</p>
      </div>

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.sm}
        enabledControls={[ViewportSize.sm, ViewportSize["2xl"]]}
        overrideViewportSizes={{
          sm: { width: 400, height: 400 },
          "2xl": { width: 1000, height: 1000 },
        }}
        allowResizingX
        allowResizingY
      />

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm">Override built-in sizes</h2>
        <p>Modify width or height of built-in sizes</p>
      </div>

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.sm}
        enabledControls={[ViewportSize.sm, ViewportSize["2xl"]]}
        overrideViewportSizes={{
          sm: { width: 400, height: 400 },
          "2xl": { width: 1000, height: 1000 },
        }}
        allowResizingX
        allowResizingY
      />

      <div className="flex flex-col items-center w-full border border-dashed border-gray-500/50 border-l-0 border-r-0 border-b-0 pt-4">
        <h2 className="m-0 text-sm">Add control components</h2>
        <p>Add arbitrary components before or after the built-in controls.</p>
      </div>

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.tablet}
        controlsPreComponent={<b>Change device</b>}
        controlsContainerClassName="w-full max-w-md"
        allowResizingX
        allowResizingY
      />
    </div>
  );
}

export default App;
