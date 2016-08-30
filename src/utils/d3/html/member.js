import React, { Component, PropTypes} from 'react';
import Actions from './actions';
import dateFormat from 'date-format';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as nodeActions from '../../../store/syncReducers/nodes';


class Member extends Component {
  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    nodes: PropTypes.object,
    routerActions: PropTypes.object,
    nodeActions: PropTypes.object,
    update: PropTypes.func,
  };

  constructor (props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
    this.state = {orginalName: this.props.nodes[this.props.id].name};
  }

  render () {
    const member = this.props.nodes[this.props.id];
    return (
      <div className={member.type || 'default'}>
        <div
          className='clickable'
          onClick={this.clickHandler}
        >
          <div className='row'>
            <div className='col-xs-3'>
              <img src={member.avatar} alt='avatar' className='avatar' />
            </div>
            <div className='col-xs-9'>
              <div className='lead node-label'>{member.name}</div>
              <div className='value'>{member.id}</div>
              <div className='node-label m-t-1'>Date of Birth</div>
              <div className='value'>{dateFormat('MM/dd/yyyy', new Date(member.dob))}</div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-3'>
              <div className='node-label'>Gender</div>
              <div className='value'>{member.gender}</div>
            </div>
            <div className='col-xs-9'>
              <div className='node-label'>Healthcare Plan</div>
              <div className='value'>{member.plan}</div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-3'>
              <div className='node-label'>Segment</div>
              <div className='value'>{member.segment}</div>
            </div>
            <div className='col-xs-9'>
              <div className='node-label'>Address</div>
              <div className='value'>{member.address.street}</div>
              <div className='value'>
                {member.address.city}, {member.address.state} {member.address.zip}
              </div>
            </div>
          </div>
        </div>
        {member.actions && <Actions actions={member.actions} />}
      </div>
    );
  }

  clickHandler (event) {
    if (event.defaultPrevented) return;
    let node = this.props;
    let path = '';
    do {
      path = `/${node.id}${path}`;
      node = node._parent;
    } while (node);
    this.props.routerActions.push(`/member${path}`);
    this.props.update();
  }
}

export default {
  enter: connect(
    ({ nodes: { nodes } }) => ({ nodes }),
    dispatch => ({
      routerActions: bindActionCreators(routerActions, dispatch),
      nodeActions: bindActionCreators(nodeActions, dispatch),
    })
  )(Member),
};
