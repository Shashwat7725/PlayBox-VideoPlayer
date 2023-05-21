import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import videoData from "./videoData";
import NavBar from "./components/NavBar";
const App = () => {
  const [videoIndex, setVideoIndex] = useState(0);

  const handleForward = () => {
    if (videoIndex === videoData.length - 1) {
      setVideoIndex(0);
    } else setVideoIndex(videoIndex + 1);
  };
  const handleBackward = () => {
    if (videoIndex === 0) {
      setVideoIndex(videoData.length - 1);
    } else setVideoIndex(videoIndex - 1);
  };

  return (
    <div className="bg-pale-yellow h-full w-screen">
      <NavBar />
      <VideoPlayer
        onPrevious={handleBackward}
        onNext={handleForward}
        videoIndex={videoIndex}
      />
    </div>
  );
};

export default App;
