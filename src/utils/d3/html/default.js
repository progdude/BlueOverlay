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
  };

  constructor (props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  render () {
    const node = Object.assign({}, this.props, this.props.nodes[this.props.id]);
    return (
      <div
        className={node.type || this.props.type || 'default'}
        onClick={this.clickHandler}
      >
        {node.icon && <img className='icon' src={node.icon} alt={node.label} />}
        <div className='node-label'>{node.label}</div>
      </div>
    );
  }

  componentWillMount () {
    this.props.nodeActions.updateTreeNode(this.props.id, {r: true});
  }

  clickHandler () {
    const node = this.props.nodes[this.props.id] || this.props;
    if (node.action && node.action.click) {
      this.props.routerActions.push('/idk');
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
  )(DefaultEnter),
};
