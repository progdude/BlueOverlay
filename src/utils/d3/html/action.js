import React, { Component, PropTypes } from 'react';
import actionMenu from './action.menu';

class Action extends Component {
  static propTypes = {
    action: PropTypes.object,
  };

  constructor (props) {
    super(props);

    this.state = {
      menuDisplaying: false,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  render () {
    return (
      <div className='action'>
        <button className='action-btn' onClick={this.clickHandler}>
          <img src={this.props.action.icon} alt='' />
        </button>
        {this.props.action.menu && this.state.menuDisplaying && actionMenu(this.props.action.menu)}
      </div>
    );
  }

  clickHandler () {
    if (!(window.d3.event && window.d3.event.defaultPrevented)) {
      this.setState({ menuDisplaying: !this.state.menuDisplaying });
    }
  }
}

export default Action;
