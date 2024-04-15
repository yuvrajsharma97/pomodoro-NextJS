"use client";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";



const ClockPage = () => {

  const renderTime = ({ remainingTime }) => {
    const remainingTimeinMinutes = () => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    if (remainingTime === 0) {
      return <div className="timer text-color3 text-center">-- / --</div>;
    }

    return (
      <div className="timer text-color3 text-center">
        <div className="text-color3 text-center text-4xl">
          {remainingTimeinMinutes()}
        </div>
        <div className="text-color3 text-center text-xl">Remaining</div>
      </div>
    );
  };

  
  const [activeButton, setActiveButton] = useState(null);

  const handleStart = () => {
    console.log("Start");
  };
  const handlePause = () => {
    console.log("Pause");
  };
  const handleReset = () => {
    console.log("Reset");
  };

  const handleFocus = () => {
    console.log("Focus");
  };
  const handleShortBreak = () => {
    console.log("Short Break");
  };
  const handleLongBreak = () => {
    console.log("Long Break");
  };

  const durationArray = [
    { name: "Focus", function: handleFocus },
    { name: "Short Break", function: handleShortBreak },
    { name: "Long Break", function: handleLongBreak },
  ];

  const controlButtons = [
    { name: "Start", function: handleStart },
    { name: "Pause", function: handlePause },
    { name: "Reset", function: handleReset },
  ];
  return (
    <div className="flex flex-col justify-center">
      <div className="text-center text-color3 w-full">
        <h1 className="text-4xl font-bold mt-5">Pomodoro</h1>
        <p className="text-2xl mt-3">
          <span>Be productive with the Pomodoro technique.</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-between my-[2.5rem]">
        <div className="flex justify-center w-full">
          <div className="flex flex-wrap justify-around border border-color4 border-2 rounded-full">
            {durationArray.map((duration, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveButton(index);
                  duration.function();
                }} 
                className={`text-color3 border border-color4 border-2 hover:shadow-custom bg-color2 rounded-full w-36 p-2 m-2 ${
                  activeButton === index ? "shadow-custom" : ""
                }`}>
                {duration.name}
              </button>
            ))}{" "}
          </div>
        </div>
        <div
          className="flex justify-center w-full my-[6rem]"
          style={{ filter: "drop-shadow(0.5px 0.5px 25px #fceabb)" }}>
          <CountdownCircleTimer
            isPlaying={true}
            duration={40}
            colors={["#f5af19"]}
            colorsTime={[30]}
            onComplete={() => ({ shouldRepeat: false, delay: 1 })}
            strokeWidth="4">
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div className="flex justify-center w-full">
          <div className="border border-2 border-color4 rounded-full">
            {controlButtons.map((control, index) => (
              <button
                key={index}
                className="text-color3 border border-color4 border-2 hover:shadow-custom bg-color2 rounded-full w-24 p-2 m-2"
                onClick={control.function}>
                {control.name}
              </button>
            ))}{" "}
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="">
            <button className="text-color3 border border-color4 border-2 hover:shadow-custom bg-color2 rounded-full w-36 p-2 m-2">
              Set Duration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockPage;
