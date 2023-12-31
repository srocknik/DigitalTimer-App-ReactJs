// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {minute: 25, second: 0, isGameStart: true}

  renderTimer = () => {
    const {isGameStart, second, minute} = this.state

    const statusText = isGameStart ? 'Paused' : 'Running'

    if (!isGameStart) {
      if (second < 1) {
        this.decreaseMinuteByOne()
      }
    }

    return (
      <div className="timer-bg-container">
        <div className="timer-container">
          <h1 className="timer">
            {minute > 9 ? minute : `0${minute}`}:
            {second > 9 ? second : `0${second}`}
          </h1>
          <p className="status">{statusText}</p>
        </div>
      </div>
    )
  }

  decreaseMinuteByOne = () => {
    const {minute} = this.state

    this.setState({
      minute: minute - 1,
      second: 60,
    })
  }

  onPlay = () => {
    this.setState(prevState => ({isGameStart: !prevState.isGameStart}))

    const {isGameStart} = this.state

    if (isGameStart) {
      this.intervalId = setInterval(this.setTimer, 1000)
    } else {
      clearInterval(this.intervalId)
    }
  }

  onReset = () => {
    clearInterval(this.intervalId)

    this.setState({minute: 25, second: 0, isGameStart: true})
  }

  setTimer = () => {
    this.setState(prevState => ({second: prevState.second - 1}))
  }

  onSetTheLimit = event => {
    this.setState({minute: parseInt(event.target.value)})
  }

  onIncrement = () => {
    this.setState(prevState => ({minute: prevState.minute + 1}))
  }

  onDecrement = () => {
    this.setState(prevState => ({minute: prevState.minute - 1}))
  }

  render() {
    const {minute, isGameStart} = this.state

    const imageUrl = isGameStart
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const altName = isGameStart ? 'play icon' : 'pause icon'

    const startPauseText = isGameStart ? 'Start' : 'Pause'

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="digi-timer-container">
          {this.renderTimer()}
          <div className="timer-control-container">
            <div className="play-reset-container">
              <div className="icon-container">
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.onPlay}
                >
                  <img src={imageUrl} alt={altName} className="play-icon" />
                  <p className="status-text">{startPauseText}</p>
                </button>
              </div>
              <div className="icon-container">
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-icon"
                  />
                  <p className="status-text">Reset</p>
                </button>
              </div>
            </div>
            <p className="note-text">Set Timer Limit</p>
            <div className="inc-dec-container">
              <button
                type="button"
                className="inc-dec-btn"
                onClick={this.onDecrement}
                disabled={!isGameStart}
              >
                -
              </button>
              <div className="limit-container">
                <p className="limit">{minute}</p>
              </div>
              <button
                type="button"
                className="inc-dec-btn"
                onClick={this.onIncrement}
                disabled={!isGameStart}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
