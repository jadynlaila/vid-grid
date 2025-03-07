import { useState } from "react";
import "./App.css";

function App() {
  // const croppedFolders = ["25x25/flock_cropped", "25x25/fountain_cropped", "25x25/japan_cropped", "25x25/metro_cropped", "25x25/money_cropped", "25x25/more-tvs_cropped", "25x25/noise_cropped", "25x25/osprey_cropped", "25x25/rolling_cropped", "25x25/rushing_cropped", "25x25/shake_cropped", "25x25/tapes_cropped", "25x25/tvs_cropped"];
  const croppedFolders = ["25x25/flock_cropped", "25x25/fountain_cropped", "25x25/japan_cropped"];
  const numberOfGrids = 25;
  const gridWidth = 5;
  const gridHeight = Math.ceil(numberOfGrids / gridWidth);

  // future feature ideas:
  // - randomly pause videos for half a second
  // - randomly change the playback rate of some videos
  // - randomly change filter effects on some videos
  // - utilize ctrl + click 
  // - randomize if it changes that video or all other videos
  // - apply a grid over top of some videos to make them look like they're cropped again
  // - holding down a click on the outside of the divs will pause all of them
  // - holding down a click on the inside of the divs will pause only that one
  // - animations for when the video changes
  // - on load, have all videos load in one at a time

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
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: "-1", 
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
