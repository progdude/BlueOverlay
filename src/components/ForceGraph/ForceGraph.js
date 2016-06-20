import React, { Component } from 'react';
import nodes from 'dummyData.json';
import Force from 'utils/d3/html/force';
import rd3 from 'react-d3-library';
import classes from './ForceGraph.scss';
const RD3Component = rd3.Component;

class ForceGraph extends Component {

  constructor (props) {
    super(props);

    this.state = {d3: ''};
  }

  componentDidMount () {
    const graph = new Force(nodes);

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

export default ForceGraph;
