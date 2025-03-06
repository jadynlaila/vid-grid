import { useState } from "react";
import "./App.css";

function App() {
  const croppedFolders = ["/fountain_cropped", "/japan_cropped"];
  const numberOfGrids = 9;
  const gridWidth = 3;
  const gridHeight = Math.ceil(numberOfGrids / gridWidth);

  // State to track video sources per grid cell
  const [videoSources, setVideoSources] = useState(
    Array.from({ length: gridHeight }, (_, rowIndex) =>
      Array.from({ length: gridWidth }, (_, colIndex) => {
        const folderIndex = Math.floor(Math.random() * croppedFolders.length);
        return `${croppedFolders[folderIndex]}/${rowIndex}_${colIndex}.mp4`;
      })
    )
  );

  const changeVideo = (row, col) => {
    setVideoSources((prevSources) => {
      const currentVideo = prevSources[row][col];

      // Get all possible videos except the current one
      const availableVideos = croppedFolders
        .map(folder => `${folder}/${row}_${col}.mp4`)
        .filter(video => video !== currentVideo); // Remove current video from choices

      if (availableVideos.length === 0) return prevSources; // If no alternative, return unchanged state

      // Pick a new random video from the filtered list
      const newVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];

      const newSources = prevSources.map((r) => [...r]); // Deep copy
      newSources[row][col] = newVideo; // Update only the clicked video
      return newSources;
    });
  };

  return (
    <div className="video-container">
      <div
        className="grid-container"
        style={{
          "--grid-columns": gridWidth,
          "--grid-rows": gridHeight,
        }}
      >
        {videoSources.map((row, rowIndex) =>
          row.map((videoSrc, colIndex) => (
            <div
              className="vid-container"
              key={`${rowIndex}-${colIndex}`}
              onClick={() => changeVideo(rowIndex, colIndex)}
            >
              <video src={videoSrc} autoPlay loop muted />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
