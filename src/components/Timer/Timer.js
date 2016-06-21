import React, { Component } from 'react';
import classes from './Timer.scss';

class Timer extends Component {
  constructor (props) {
    super(props);
    this.state = {time: 0};
  }

  tick () {
    this.setState({time: this.state.time + 1});
  }

  render () {
    return (
      <div className={classes.timer}>
        <div className={classes.digit}>{~~(this.state.time / 36000) % 10}</div>
        <div className={classes.digit}>{~~(this.state.time / 3600) % 10}</div>
        <div className={classes.digit}>{~~(this.state.time / 600) % 6}</div>
        <div className={classes.digit}>{~~(this.state.time / 60) % 10}</div>
        <div className={classes.digit}>{~~(this.state.time / 10) % 6}</div>
        <div className={classes.digit}>{this.state.time % 10}</div>
      </div>
    );
  }

  componentDidMount () {
    this.interval = setInterval(::this.tick, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }
}

export default Timer;
