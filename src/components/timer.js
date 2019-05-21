import React from 'react';

const Timer = ({minutes, seconds, status, progress, circ}) => {

  let prettyStatus = status[0].toUpperCase() + status.substring(1);
  
  return (
    <div id="timer">
    
      <div id="timer-text">
        <div id="timer-label">{prettyStatus}</div>
        <div id="time-left">{minutes}:{seconds}</div>
      </div>

      <svg className="svg-timer"  viewBox="0 0 380 380">
        <circle id="grad-circle" cx="190" cy="190" r="120"></circle>
        <circle id="timer-circle" stroke={minutes === "00" ? "#ff5555" : "#8be9fd" } strokeDashoffset={progress} strokeDasharray={circ} cx="190" cy="190" r="120"></circle>
      </svg>
    </div>
  )  
  
} 

export default Timer;
