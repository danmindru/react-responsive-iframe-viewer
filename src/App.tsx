import "./App.css";
import { ResponsiveIframeViewer, ViewportSize } from "../lib/main";
import { GithubIcon, ExternalLinkIcon } from "lucide-react";

function App() {
  return (
    <div className="flex flex-col items-center p-4 gap-12">
      <div className="flex flex-col items-center w-full">
        <h1 className="m-0">React Responsive Iframe Viewer</h1>
        <p>Display iframes responsively in your React app, in style.</p>

        <a
          href="https://github.com/danmindru/react-responsive-iframe-viewer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <GithubIcon /> Get it on GitHub <ExternalLinkIcon />
        </a>
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
    </div>
  );
}

export default App;
