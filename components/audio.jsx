import React from "react";

function Audio() {
  return (
    <audio controls loop autoPlay>
      <source src="/assets/seoul-bound-by-declan-dp.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default Audio;
