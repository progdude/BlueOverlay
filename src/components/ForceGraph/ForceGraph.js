import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Force from 'utils/d3/html/force';
import SvgDefs from 'utils/d3/svg/defs';
import rd3 from 'react-d3-library';
import classes from './ForceGraph.scss';
const RD3Component = rd3.Component;
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as nodeActions from '../../store/syncReducers/nodes';

class ForceGraph extends Component {
  static propTypes = {
    nodes: PropTypes.object,
    nodeActions: PropTypes.object,
    router: PropTypes.object,
  };

  constructor (props) {
    super(props);

    this.state = {d3: ''};
  }

  componentDidUpdate () {
    const currentNodeId = this.props.router.locationBeforeTransitions.pathname.split('/').pop() ||
      this.props.nodes.tree.id;
    this.props.nodeActions.select(currentNodeId);
  }

  componentDidMount () {
    const graph = new Force(this.props.nodes.tree);
    const svgDefs = new SvgDefs(graph.svgStage);
    svgDefs.avatarClip().startArrow().endCircle();
    this.setState({d3: graph.node});
  }

  render () {
    return (
      <div>
        <div className={classes.full}>
          <RD3Component data={this.state.d3} />
        </div>
        <div className='pin-area'></div>
      </div>
    );
  }
}

export default connect(({ nodes, router }) => ({ nodes, router }),
  dispatch => ({
    routerActions: bindActionCreators(routerActions, dispatch),
    nodeActions: bindActionCreators(nodeActions, dispatch),
  })
)(ForceGraph);
