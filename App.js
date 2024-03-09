import React, { useState, useEffect } from 'react';
import './App.css';

function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [countdownDate, setCountdownDate] = useState(null);
  const [expired, setExpired] = useState(false);
  const [countdownRunning, setCountdownRunning] = useState(false);
  let interval;

  const startCountdown = () => {
    // Calculate the countdown time when the countdown starts
    const now = new Date().getTime();
    const countdownTime = now + (hours * 3600 + minutes * 60 + seconds) * 1000;
    setCountdownDate(countdownTime);
    setCountdownRunning(true);
  };

  const stopCountdown = () => {
    clearInterval(interval);
    setCountdownRunning(false);
  };

  useEffect(() => {
    // Update the countdown every second
    if (countdownDate !== null && countdownRunning) {
      interval = setInterval(() => { // Define interval within useEffect
        const now = new Date().getTime();
        const distance = countdownDate - now;
        if (distance <= 0) {
          setExpired(true);
          clearInterval(interval);
          setCountdownRunning(false);
        } else {
          const hoursRemaining = Math.floor(distance / (1000 * 60 * 60));
          const minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);
          setHours(hoursRemaining);
          setMinutes(minutesRemaining);
          setSeconds(secondsRemaining);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdownDate, countdownRunning]);

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="countdown-title">Session</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="timer-box">
              <div className="form-group">
                <label htmlFor="hours">Hours: </label>
                <input
                    type="number"
                    className="form-control"
                    id="hours"
                    min="0"
                    max="23"
                    placeholder="0"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                />

              </div>
              <br />
              <div className="form-group">
                <label htmlFor="minutes">Minutes: </label>
                <input
                    type="number"
                    className="form-control"
                    id="minutes"
                    min="0"
                    max="59"
                    placeholder="0"
                    value={minutes}
                    onChange={(e) => setMinutes(parseInt(e.target.value))}
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="seconds">Seconds: </label>
                <input
                    type="number"
                    className="form-control"
                    id="seconds"
                    min="0"
                    max="59"
                    placeholder="0"
                    value={seconds}
                    onChange={(e) => setSeconds(parseInt(e.target.value))}
                />
              </div>
              <br />
              {countdownRunning ? (
                  <button className="button" onClick={stopCountdown}>
                    Stop Countdown
                  </button>
              ) : (
                  <button className="button" onClick={startCountdown}>
                    Start Countdown
                  </button>
              )}
              <div className="countdown mt-4">
                {expired ? (
                    <span>EXPIRED</span>
                ) : (
                    <>
                      <span>{hours.toString().padStart(2, '0')}</span> :
                      <span>{minutes.toString().padStart(2, '0')}</span> :
                      <span>{seconds.toString().padStart(2, '0')}</span>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default CountdownTimer;
