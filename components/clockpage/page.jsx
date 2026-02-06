"use client";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { IoCloseCircleOutline } from "react-icons/io5";
import Audio from "../audio";

const ClockPage = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [clockActive, setClockActive] = useState(false);
  const [clockState, setClockState] = useState("none");
  const [startDisabled, setStartDisabled] = useState(false);
  const [key, setKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState({
    focus: 1800,
    shortBreak: 300,
    longBreak: 600,
  });

  const renderTime = ({ remainingTime }) => {
    const remainingTimeinMinutes = () => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    if (remainingTime === 0 || clockState === "none") {
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

  const handleStart = () => {
    if (clockState === "none" || remainingTime <= 0) {
      return;
    }
    setClockActive(true);
    setStartDisabled(true);
  };
  const handlePause = () => {
    setClockActive(false);
    setStartDisabled(false);
  };
  const handleReset = () => {
    setClockActive(false);
    setStartDisabled(false);
    setRemainingTime(
      clockState === "focus"
        ? duration.focus
        : clockState === "shortBreak"
        ? duration.shortBreak
        : clockState === "longBreak"
        ? duration.longBreak
        : 0
    );
    setKey((prevKey) => prevKey + 1);
  };

  const handleFocus = () => {
    setClockState("focus");
    setRemainingTime(duration.focus);
    setClockActive(false);
    setStartDisabled(false);
    setKey((prevKey) => prevKey + 1);
  };
  const handleShortBreak = () => {
    setClockState("shortBreak");
    setRemainingTime(duration.shortBreak);
    setClockActive(false);
    setStartDisabled(false);
    setKey((prevKey) => prevKey + 1);
  };
  const handleLongBreak = () => {
    setClockState("longBreak");
    setRemainingTime(duration.longBreak);
    setClockActive(false);
    setStartDisabled(false);
    setKey((prevKey) => prevKey + 1);
  };

  const durationArray = [
    { name: "Focus", function: handleFocus },
    { name: "Short Break", function: handleShortBreak },
    { name: "Long Break", function: handleLongBreak },
  ];

  const controlButtons = [
    { name: "Start", function: handleStart, disabled: startDisabled },
    { name: "Pause", function: handlePause, disabled: false },
    { name: "Reset", function: handleReset, disabled: false },
  ];
  return (
    <div className="w-full min-h-screen flex flex-col space-y-4">
      <div className="my-auto">
        <div className="flex justify-center">
          <div className="text-center text-color4 w-full sm:w-2/3 md:w-2/6 glass py-3 mt-5">
            <h1 className="text-2xl md:text-4xl font-bold">Pomodoro</h1>
            <p className="text-1xl md:text-2xl">
              <span>Get more done with the Pomodoro.</span>
            </p>
          </div>
        </div>

        <div className="my-[2rem]">
          <div className="flex justify-center">
            <Audio />
          </div>
        </div>

        <div className="flex flex-wrap justify-between my-[2rem]">
          <div className="flex justify-center w-full">
            <div className="flex flex-wrap justify-around border border-color4 border-2 rounded-full">
              {durationArray.map((duration, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveButton(index);
                    duration.function();
                  }}
                  className={`text-color3 border border-color4 border-2 hover:shadow-custom bg-color2 rounded-full w-28 p-2 m-1 ${
                    activeButton === index ? "shadow-custom" : ""
                  }`}>
                  {duration.name}
                </button>
              ))}
            </div>
          </div>

          <div
            className="flex justify-center w-full my-[3rem]"
            style={{ filter: "drop-shadow(0.5px 0.5px 25px #fceabb)" }}>
            <CountdownCircleTimer
              key={key}
              isPlaying={clockActive}
              duration={remainingTime}
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
                  onClick={control.function}
                  disabled={control.disabled}>
                  {control.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div>
              <button
                onClick={(e) => setIsOpen((prev) => !prev)}
                className="text-color3 border border-color4 border-2 hover:shadow-custom bg-color2 rounded-full w-36 p-2 m-2">
                Set Duration
              </button>

              {isOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg w-full sm:w-5/6 md:w-1/2 p-8 relative">
                    <button
                      className="text-color1 absolute top-0 right-0"
                      onClick={(e) => {
                        setIsOpen((prev) => !prev);
                      }}>
                      <IoCloseCircleOutline size={30} className="text-color4" />
                    </button>
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Edit time span here
                    </h2>
                    <div className="flex flex-wrap justify-between w-full">
                      <div className="w-full sm:w-1/2 mb-4">
                        <span className="font-semibold">Focus Time : </span>
                        <input
                          type="number"
                          placeholder="30 min"
                          className="border-b-4 border-color3 w-full sm:w-24 p-2 m-2 text-center focus:ring-0 focus:ring-color3"
                          onChange={(e) =>
                            setDuration({
                              ...duration,
                              focus:
                                e.target.value >= 0 ? e.target.value * 60 : 0,
                            })
                          }
                        />
                      </div>

                      <div className="w-full sm:w-1/2 mb-4">
                        <span className="font-semibold">
                          Short Break Time :{" "}
                        </span>
                        <input
                          type="number"
                          placeholder="05 min"
                          className="border-b-4 border-color3 w-full sm:w-24 p-2 m-2 text-center"
                          onChange={(e) =>
                            setDuration({
                              ...duration,
                              shortBreak:
                                e.target.value >= 0 ? e.target.value * 60 : 0,
                            })
                          }
                        />
                      </div>

                      <div className="w-full sm:w-1/2 mb-4">
                        <span className="font-semibold">
                          Long Break Time :{" "}
                        </span>
                        <input
                          type="number"
                          placeholder="10 min"
                          className="border-b-4 border-color3 w-full sm:w-24 p-2 m-2 text-center"
                          onChange={(e) =>
                            setDuration({
                              ...duration,
                              longBreak:
                                e.target.value >= 0 ? e.target.value * 60 : 0,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={(e) => setIsOpen((prev) => !prev)}
                        className="text-color4 border border-color4 border-2 rounded-full hover:bg-color4 hover:text-white w-36 p-2 m-2">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockPage;
