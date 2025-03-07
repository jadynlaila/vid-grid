import { useState } from "react";
import "./App.css";

function App() {
  const croppedFolders = ["/flock_cropped", "/fountain_cropped", "/japan_cropped", "/metro_cropped", "/money_cropped", "/more-tvs_cropped", "/noise_cropped", "/osprey_cropped", "/rolling_cropped", "/rushing_cropped", "/shake_cropped", "/tapes_cropped", "/tvs_cropped"];
  const numberOfGrids = 9;
  const gridWidth = 3;
  const gridHeight = Math.ceil(numberOfGrids / gridWidth);


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

      const availableVideos = croppedFolders
        .map(folder => `${folder}/${row}_${col}.mp4`)
        .filter(video => video !== currentVideo);

      if (availableVideos.length === 0) return prevSources; 

      const newVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];

      const newSources = prevSources.map((r) => [...r]); 
      newSources[row][col] = newVideo; 
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

