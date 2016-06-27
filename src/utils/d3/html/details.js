import React, { Component, PropTypes } from 'react';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as nodeActions from '../../../store/syncReducers/nodes';

class DefaultEnter extends Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    nodes: PropTypes.object,
    routerActions: PropTypes.object,
    nodeActions: PropTypes.object,
    update: PropTypes.func,
  };

  render () {
    const node = this.props.nodes[this.props.id];
    return (
      <div
        className={`${node.type} ${node.style}`}
      >
        <div className='details' dangerouslySetInnerHTML={{__html: node.details}}></div>
      </div>
    );
  }
}

export default {
  enter: connect(
    ({ nodes: { nodes } }) => ({ nodes }),
    dispatch => ({
      routerActions: bindActionCreators(routerActions, dispatch),
      nodeActions: bindActionCreators(nodeActions, dispatch),
    })
  )(DefaultEnter),
};
