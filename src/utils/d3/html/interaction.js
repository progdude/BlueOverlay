import React, { Component, PropTypes} from 'react';
import dateFormat from 'date-format';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as nodeActions from '../../../store/syncReducers/nodes';

class Interactions extends Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    r: PropTypes.bool,
    nodes: PropTypes.object,
    nodeActions: PropTypes.object,
    resume: PropTypes.func,
  };

  constructor (props) {
    super(props);

    this.state = {
      showDetails: false,
    };

    this.toggleDetails = this.toggleDetails.bind(this);
  }

  render () {
    const interaction = this.props.nodes[this.props.id];
    const date = dateFormat('MM/dd/yyyy hh:mm', new Date(interaction.dateLastUpdate));
    return (
      <div
        className={`${interaction.type || 'default'} ${this.state.showDetails ? 'detailed' : ''} clickable`}
        onClick={this.toggleDetails}
      >
        {!this.state.showDetails &&
          <div className='short-details'>
            <div className='value'>{date}</div>
            <div className='value'>{interaction.repName}</div>
            <div className='value'>Service Require</div>
            <div className='value'>{interaction.refId}</div>
            <div className='value'>Member</div>
            <div className='value'>{interaction.member}</div>
          </div> ||
          <div className='details'>
            <div className='row'>
              <div className='col-xs-3'>
              <img src="/images/icons/green-check.png" alt='avatar' className='avatar' className="avatar green-check"  />
                <img src={interaction.avatar} alt='avatar' className='avatar' />
              </div>
              <div className='col-xs-9'>
                <div className='node-label'>Service representative</div>
                <div className='value'>{interaction.repName}</div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-6'>
                <div className='node-label'>Service request</div>
                <div className='value'>{interaction.refId}</div>
              </div>
              <div className='col-xs-6'>
                <div className='node-label'>Time stamp</div>
                <div className='value'>{date}</div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-6'>
                <div className='node-label'>Channel of interaction</div>
                <div className='value'>{interaction.channel}</div>
              </div>
              <div className='col-xs-6'>
                <div className='node-label'>HCCID</div>
                <div className='value'>{interaction.hccId}</div>
              </div>
            </div>
            <hr />
            <div className='summary'>{interaction.summary}</div>
          </div>}
      </div>
    );
  }

  componentWillMount () {
    if (!this.props.nodes[this.props.id].r) {
      this.props.nodeActions.updateTreeNode(this.props.id, { r: true });
    }
  }

  toggleDetails (event) {
    if (event.defaultPrevented) return;
    this.props.nodeActions.updateTreeNode(this.props.id,
      {
        r: this.state.showDetails,
        pinable: !this.state.showDetails,
      });
    this.setState({showDetails: !this.state.showDetails});
    this.props.resume();
  }
}

export default {
  enter: connect(
    ({ nodes: { nodes } }) => ({ nodes }),
    dispatch => ({
      routerActions: bindActionCreators(routerActions, dispatch),
      nodeActions: bindActionCreators(nodeActions, dispatch),
    })
  )(Interactions),
};

