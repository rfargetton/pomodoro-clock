import React from 'react';
import * as Icon from 'react-feather';

const Controls = ({ start, stop, reset , ticking }) => (

  <div id="controls">
  <button id="reset" onClick={reset}>
    <Icon.RotateCw size={30} />
  </button>

  <div id="spacer"></div>

  <button id="start_stop" onClick={ticking ? stop : start}>
    { ticking ? <Icon.PauseCircle size={30} /> : <Icon.PlayCircle size={30} /> } 
  </button>

  </div>

)

export default Controls;