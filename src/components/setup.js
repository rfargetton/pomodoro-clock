import React from 'react' ;

const Setup = ({ name, length, decrement, increment }) => (

  <div className="setup" id={`${name}-setup`}>
    <div id="session-label">{name} length</div>
    <button id="decrement" onClick={() => decrement(name)}>-</button>
    <div id="length" className="length">{length}</div>
    <button id="increment" onClick={() => increment(name)}>+</button>
  </div>

);

export default Setup ;