import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Force from 'utils/d3/html/force';
import SvgDefs from 'utils/d3/svg/defs';
import rd3 from 'react-d3-library';
import classes from './ForceGraph.scss';
const RD3Component = rd3.Component;

class ForceGraph extends Component {
  static propTypes = {
    nodes: PropTypes.object,
  };

  constructor (props) {
    super(props);

    this.state = {d3: ''};
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

export default connect(({ nodes }) => ({ nodes }))(ForceGraph);
