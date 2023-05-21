import React, { useState, useRef, useEffect } from "react";
import {
  BsPlayCircle,
  BsPauseCircle,
  BsFastForwardFill,
  BsFillRewindFill,
} from "react-icons/bs";
import { AiOutlineSound } from "react-icons/ai";
import { RiFullscreenFill } from "react-icons/ri";
import { ImLoop, ImShuffle } from "react-icons/im";
import videoData from "../videoData";

const VideoPlayer = ({ videoIndex, onPrevious, onNext }) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isMuted: false,
    speed: 1,
    sound: 100,
    isFullScreen: false,
    isLoop: false,
  });
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    function handleTime() {
      setTime(video.currentTime);
    }

    function handleDuration() {
      setDuration(video.duration);
    }

    video.addEventListener("timeupdate", handleTime);
    video.addEventListener("loadedmetadata", handleDuration);

    return () => {
      video.removeEventListener("timeupdate", handleTime);
      video.removeEventListener("loadedmetadata", handleDuration);
    };
  }, [videoIndex]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  function handlePlaying() {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
    playerState.isPlaying ? videoRef.current.pause() : videoRef.current.play();
  }

  function handleFullScreen() {
    setPlayerState({
      ...playerState,
      isFullScreen: !playerState.isFullScreen,
    });
    if (!playerState.isFullScreen) {
      videoRef.current.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      videoRef.current.exitFullscreen();
    }
  }

  function handleLooping() {
    setPlayerState({
      ...playerState,
      isLoop: !playerState.isLoop,
    });
  }

  const currentVideo = videoData[videoIndex];

  return (
    <div className="flex h-screen justify-center items-center">
      <div
        ref={videoContainerRef}
        className="flex justify-center w-full max-w-700 relative group items-center"
      >
        <video
          ref={videoRef}
          src={currentVideo.link}
          width="70%"
          loop={playerState.isLoop}
          className="shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] group-hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]"
        ></video>

        <div className="flex flex-col justify-evenly items-center w-3/5 max-w-500 p-2 absolute bottom-10 gap-3 opacity-0 group-hover:opacity-100 transition ease-in-out">
          <h1 className="text-white text-4xl">{currentVideo.title}</h1>
          <div className="w-full">
            <input
              className="w-full h-1.5 focus:outline-none"
              type="range"
              min={0}
              max={duration}
              value={time}
              onChange={(e) => {
                const newTime = Number(e.target.value);
                setTime(newTime);
                const video = videoRef.current; //similar to getElement() in js
                video.currentTime = newTime;
              }}
            />
          </div>
          <div className="flex gap-3 justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <AiOutlineSound size={20} className="text-white" />
              <input
                className="bg-gray-500 h-0.5"
                type="range"
                min="0"
                max="100"
                value={playerState.sound}
                onChange={(e) => {
                  const newSound = Number(e.target.value);
                  setPlayerState({
                    ...playerState,
                    sound: newSound,
                  });
                  const video = videoRef.current;
                  const newVolume = newSound / 100;
                  video.volume = newVolume;
                }}
              />
            </div>

            <h5 className="text-white">{formatTime(time)}</h5>
            <div className="flex items-center gap-5">
              <BsFillRewindFill
                size={30}
                className="cursor-pointer text-white"
                onClick={onPrevious}
              />
              {playerState.isPlaying ? (
                <BsPauseCircle
                  size={60}
                  className="cursor-pointer text-white"
                  onClick={handlePlaying}
                />
              ) : (
                <BsPlayCircle
                  size={60}
                  className="cursor-pointer text-white"
                  onClick={handlePlaying}
                />
              )}
              <BsFastForwardFill
                size={30}
                className="cursor-pointer text-white"
                onClick={onNext}
              />
            </div>

            <h5 className="text-white">{formatTime(duration)}</h5>
            <div className="flex items-center gap-3">
              {playerState.isLoop ? (
                <ImLoop
                  size={20}
                  className="text-[#82CD47]"
                  onClick={handleLooping}
                />
              ) : (
                <ImLoop
                  size={20}
                  className="text-white"
                  onClick={handleLooping}
                />
              )}
              <select
                className="bg-transparent text-center text-white focus:outline-none"
                value={playerState.speed}
                onChange={(e) => {
                  const newSpeed = Number(e.target.value);
                  setPlayerState({
                    ...playerState,
                    speed: newSpeed,
                  });
                  const video = videoRef.current;
                  video.playbackRate = newSpeed;
                }}
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
              <RiFullscreenFill
                size={20}
                onClick={handleFullScreen}
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
