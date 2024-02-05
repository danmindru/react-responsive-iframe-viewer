import "./App.css";
import { ResponsiveIframeViewer, ViewportSize } from "../lib/main";
import { GithubIcon, ExternalLinkIcon } from "lucide-react";

function App() {
  return (
    <div className="flex flex-col items-center p-4 gap-12">
      <div className="flex flex-col items-center">
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

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.mobile}
        allowResizingY
        allowResizingX
      />

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.desktop}
        allowResizingY
      />

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.tablet}
        allowResizingX
      />
    </div>
  );
}

export default App;
