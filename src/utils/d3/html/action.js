import React, { Component, PropTypes } from 'react';
import actionMenu from './action.menu';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as nodeActions from '../../../store/syncReducers/nodes';

let menuIndex = 0;

class Action extends Component {
  static propTypes = {
    action: PropTypes.object,
    nodeActions: PropTypes.object,
    menu: PropTypes.number,
  };

  constructor (props) {
    super(props);

    this.state = {
      menu: menuIndex++,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  render () {
    return (
      <div className='action'>
        <button className='action-btn' onClick={this.clickHandler}>
          <img src={this.props.action.icon} alt='' />
        </button>
        {this.props.action.menu && this.state.menu === this.props.menu && actionMenu(this.props.action.menu)}
      </div>
    );
  }

  clickHandler () {
    if (!(window.d3.event && window.d3.event.defaultPrevented)) {
      this.props.nodeActions.toggleMenu(this.state.menu);
    }
  }
}

export default connect(
    ({ nodes: { menu } }) => ({ menu }),
    dispatch => ({
      routerActions: bindActionCreators(routerActions, dispatch),
      nodeActions: bindActionCreators(nodeActions, dispatch),
    })
  )(Action);
