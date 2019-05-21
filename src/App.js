import React, { Component } from 'react';
import Timer from './components/timer.js';
import Controls from './components/controls.js';
import Setup from './components/setup.js';
import './App.sass';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      session : 25,
      break: 5, 
      circ: 2 * Math.PI * 120,
      progress: 2 * Math.PI * 120,
      minutes : "25",
      seconds : "00",
      status : "session",
      ticking : false
    }
    this.stopCountDown = this.stopCountDown.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.increment = this.increment.bind(this); 
    this.decrement = this.decrement.bind(this);
    this.tick = this.tick.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  startCountDown(){
    
    this.intervalID = setInterval(this.tick, 1000);
    this.setState({ ticking : true });
    
  } 

  stopCountDown(){
    
    clearInterval(this.intervalID)
    this.setState({ ticking : false });
    
  }
  
  tick(){
    
    if( this.state.minutes === "00" && this.state.seconds === "00" ){
      
      let next = this.state.status === "session" ? "break" : "session" ;
      this.beep.play();
      
      this.setState({
        status : next,
        minutes : this.state[next] < 10 ? ["0", this.state[next]].join("") : this.state[next].toString(),
        seconds : "00"
      })
      
    } else {
      
      this.setState({
      seconds : this.state.seconds === "00" ? 59 : this.state.seconds <= 10 ? ["0", this.state.seconds - 1].join("") : this.state.seconds - 1,
      minutes : this.state.seconds === "00" && this.state.minutes <= 10 ? ["0", this.state.minutes - 1].join("") : this.state.seconds === "00" ? this.state.minutes - 1 : this.state.minutes
      }) 
    }
    
    let timeInSeconds = this.state.status === "session" ? this.state.session * 60 : this.state.break * 60 ;
    
    this.setState({
      progress : this.state.progress - ( this.state.circ / timeInSeconds )
    })
    
  }
  
  increment(target){
    
    if(this.state.ticking === false){
      this.setState({
        [target] : this.state[target] < 60 ? this.state[target] + 1 : this.state[target] ,
      })
    }
    
    if (this.state.status === target && this.state.ticking === false && this.state[target] < 60){
      this.setState({
        minutes : this.state[target] < 9 ? ["0", this.state[target] + 1].join("") : this.state[target] + 1,
        seconds : "00",
        progress : 2 * Math.PI * 120
     });     
    }

  }
  
  decrement(target){
        
    if (this.state.ticking === false){
      this.setState({ 
        [target] : this.state[target] > 1 ? this.state[target] - 1 : this.state[target],
      }) 
    }
    
    if (this.state.status === target && this.state.ticking === false && this.state[target] > 1){
      this.setState({
        minutes : this.state[target] <= 10 ? ["0", this.state[target] - 1].join("") : this.state[target] - 1,
        seconds : "00",
        progress : 2 * Math.PI * 120
      });     
    }
    
  }
  
  reset(){

    clearInterval(this.intervalID);
    this.beep.pause();
    this.beep.currentTime = 0;
    this.setState({
      session : 25,
      break : 5, 
      progress : 2 * Math.PI * 120,
      minutes : "25",
      seconds : "00",
      status : "session",
      ticking : false
    })

  }
  
  render(){
    return (
      <div>
      <div id="app">
        <Setup  name="session" 
                length={this.state.session} 
                increment={this.increment} 
                decrement={this.decrement}/>
        <Setup  name="break" 
                length={this.state.break} 
                increment={this.increment} 
                decrement={this.decrement}/>
        <Timer  status={this.state.status} 
                minutes={this.state.minutes} 
                seconds={this.state.seconds} 
                circ={this.state.circ} 
                progress={this.state.progress}/>
        <Controls   start={this.startCountDown} 
                    stop={this.stopCountDown} 
                    reset={this.reset} 
                    ticking={this.state.ticking}/>
        <audio  id="beep" 
                preload="auto" 
                src="https://goo.gl/65cBl1" 
                ref={(audio) => { this.beep = audio }} />
      </div>
        <footer>
          Designed and Built by Romaric Fargetton using <a href="https://reactjs.org/">React</a>, <a href="https://feathericons.com//">Feather Icons</a> and <a href="https://draculatheme.com/">Dracula</a>
        </footer>
      </div>
    )
  }
}



