import React, { Component, PropTypes } from 'react';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as nodeActions from '../../../store/syncReducers/nodes';

class Address extends Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    nodes: PropTypes.object,
    routerActions: PropTypes.object,
    nodeActions: PropTypes.object,
    update: PropTypes.func,
  };

  render () {
    const node = {...this.props, ...this.props.nodes[this.props.id]};
    return (
      <div className={node.type || this.props.type || 'default'}>
        <div className='node-label'>{node.label}</div>
        <div className='value'>{node.address.street}</div>
        <div className='value'>{node.address.city}, {node.address.state} {node.address.zip}</div>
      </div>
    );
  };

  componentWillMount () {
    if (!this.props.nodes[this.props.id].r) {
      this.props.nodeActions.updateTreeNode(this.props.id, { r: true });
    }
  }
}

export default {
  enter: connect(
    ({ nodes: { nodes } }) => ({ nodes }),
    dispatch => ({
      routerActions: bindActionCreators(routerActions, dispatch),
      nodeActions: bindActionCreators(nodeActions, dispatch),
    })
  )(Address),
};
