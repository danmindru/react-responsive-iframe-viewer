import "./App.css";
import { ResponsiveIframeViewer, ViewportSize } from "../lib/main";

function App() {
  return (
    <div className="flex flex-col items-center p-4 gap-12">
      <div className="flex flex-col">
        <h1 className="m-0">React Responsive Iframe Viewer</h1>
        <p>Display iframes responsively in your React app, in style.</p>
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
        size={ViewportSize.mobile}
        allowResizingY
      />

      <ResponsiveIframeViewer
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
        size={ViewportSize.mobile}
        allowResizingX
      />
    </div>
  );
}

export default App;
