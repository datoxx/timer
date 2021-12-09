import React, { useState } from 'react';
import './App.css';
import Length from './Length';

function App() {

  const [displayTime, setDisplayTime] = useState(25*60);
  const [breakTime, setBreakTime] = useState(5*60);
  const [sessionTime, setSessionTime] = useState(25*60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakSound, setBreakSound] = useState(new Audio( "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  ));


  const playBreakSound = () => {
    breakSound.currentTime = 0;
    breakSound.play();

  }

  const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    return ((minutes < 10 ? "0" + minutes: minutes) + ":" + (seconds < 10 ? "0" + seconds: seconds));
  };

  const changeTime = (amount, type) => {
    if(type == 'break') {
      if(breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if(sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if(!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  }

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if(!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if(date > nextDate) {
          setDisplayTime((prev) => {
            if( !onBreakVariable && prev <= 0) {
              playBreakSound();
              onBreakVariable = false;
              setOnBreak(true);
              return breakTime;
            } else if( onBreakVariable && prev <= 0) {
              playBreakSound(); 
              onBreakVariable = true;
              setOnBreak(false);
              return sessionTime;
            } 
            return prev - 1; 
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem('interval-id', interval)
    }

    if(timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn)
  };

  const resetTime = () => {
    setDisplayTime(25*60);
    setBreakTime(5*60);
    setSessionTime(25*60);
  }

  return (
    <div className="App center-align">
      <h1 className="mainTitle">Set Timer</h1>
      <div className="dual-container">
        <Length 
          title={"Break Time"} 
          changeTime={changeTime} 
          type={"break"} 
          time={breakTime} 
          formatTime={formatTime} 
        />
        <Length 
          title={"Session Time"} 
          changeTime={changeTime} 
          type={"session"} 
          time={sessionTime} 
          formatTime={formatTime} 
        />
      </div> 
      <h3 className="sesitonTitle">{onBreak ? "Break" : "Session"}</h3>
      <h1 className="timer">{formatTime(displayTime)}</h1>
      <button className="btn-large  green accent-5" onClick={controlTime}>
        {timerOn ? (
          <i className="material-icons">pause_circle_filled</i>
        ): (
          <i className="material-icons">play_circle_filled</i>
        )}
      </button>
      <button className="btn-large lime" onClick={resetTime}>
      <i className="material-icons">autorenew</i>
      </button>
    </div>
  );
}

export default App;
