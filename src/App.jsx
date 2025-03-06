import { useState, useRef } from "react";
import "./App.css";

function App() {
  const videoUrls = ["/tapes.mp4", "/tvs.mp4", "/rolling.mp4", "/noise.mp4", "/fountain.mp4", "/rushing.mp4", "/japan.mp4", "more-tvs.mp4", "/osprey.mp4", "/flock.mp4", "/metro.mp4", "/money.mp4"];
  const numberOfGrids = 9;
  const gridWidth = 3;
  const gridHeight = Math.ceil(numberOfGrids / gridWidth);

  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(videoUrls[0]); // Default video

  const changeVideo = () => {
    const newVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    setVideoSrc(newVideo);
  };

  return (
    <div className="video-container">
      <video ref={videoRef} src={videoSrc} autoPlay loop muted />

      <div className="grid-container"
        style={{
          "--grid-columns": gridWidth,
          "--grid-rows": gridHeight,
        }}
      >
        {Array.from({ length: numberOfGrids }).map((_, index) => {
          const row = Math.floor(index / gridWidth);
          const col = index % gridWidth;

          return (
            <div
              className="vid-container"
              key={index}
              onClick={changeVideo}
              style={{
                "--col": col,
                "--row": row,
                "--grid-width": gridWidth,
                "--grid-height": gridHeight,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
