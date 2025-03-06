import { useState, useRef } from "react";
import "./App.css";

function App() {
  const videoUrls = [
    "/tapes.mp4", "/tvs.mp4", "/rolling.mp4", "/noise.mp4", "/fountain.mp4",
    "/rushing.mp4", "/japan.mp4", "more-tvs.mp4", "/osprey.mp4", "/flock.mp4",
    "/metro.mp4", "/money.mp4"
  ];
  const croppedFolders = ["/fountain_cropped", "japan_cropped"];
  const numberOfGrids = 9;
  const gridWidth = 3;
  const gridHeight = Math.ceil(numberOfGrids / gridWidth);

  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(videoUrls[0]); // Default video

  const changeVideo = (row, col) => {
    console.log(row, col);
    const newVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    setVideoSrc(newVideo);
  };

  const generateFolderIndex = () => {
    return Math.floor(Math.random() * croppedFolders.length);
  }

  return (
    <div className="video-container">
      {/* <video ref={videoRef} src={videoSrc} autoPlay loop muted /> */}
      <div
        className="grid-container"
        style={{
          "--grid-columns": gridWidth,
          "--grid-rows": gridHeight,
        }}
      >
        {Array.from({ length: gridHeight }).map((_, rowIndex) => (
          Array.from({ length: gridWidth }).map((_, colIndex) => {
            let folderIndex = generateFolderIndex(); 
            const videoFileName = `${croppedFolders[folderIndex]}/${rowIndex}_${colIndex}.mp4`; // Naming convention
            console.log(videoFileName);
            return (
              <div
                className="vid-container"
                key={`${rowIndex}-${colIndex}`}
                onClick={() => changeVideo(rowIndex, colIndex)}
              >
                <video src={videoFileName} autoPlay loop muted />
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
}

export default App;
