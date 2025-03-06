import { useState } from 'react'
import './App.css'

function App() {
  const videoUrls = ["/tapes.mp4", "/tvs.mp4"];
  const numberOfGrids = 72;
  const gridWidth = 12; 
  const gridHeight = Math.ceil(numberOfGrids / gridWidth);

  const getRandomVideo = () => videoUrls[Math.floor(Math.random() * videoUrls.length)];

  const gridElements = [];
  for (let i = 0; i < numberOfGrids; i++) {
    gridElements.push(
      <div className="vid-container" key={i} id={i}>
      </div>
    );
  }

  return (
    <>
    <div className="grid-container" style={{
        "--grid-columns": gridWidth,
        "--grid-rows": gridHeight,
      }}>
    {gridElements}
    </div>
    </>
  )
}

export default App
