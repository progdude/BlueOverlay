import React from 'react';
import actions from './actions';
import dateFormat from 'date-format';
import performAction from '../performAction';

export function enter (data) {
  return (
    <div className={data.type || 'default'}>
      <div
        className='clickable'
        onClick={data.action && data.action.click && performAction(data.action.click, data)}
        >
        <div className='row'>
          <div className='col-xs-3'>
            <img src={data.avatar} alt='avatar' className='avatar' />
          </div>
          <div className='col-xs-9'>
            <div className='lead node-label'>{data.name}</div>
            <div className='value'>{data.id}</div>
            <div className='node-label m-t-1'>Date of Birth</div>
            <div className='value'>{dateFormat('MM/dd/yyyy', new Date(data.dob))}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-3'>
            <div className='node-label'>Gender</div>
            <div className='value'>{data.gender}</div>
          </div>
          <div className='col-xs-9'>
            <div className='node-label'>Healthcare Plan</div>
            <div className='value'>{data.plan}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-3'>
            <div className='node-label'>Segment</div>
            <div className='value'>{data.segment}</div>
          </div>
          <div className='col-xs-9'>
            <div className='node-label'>Address</div>
            <div className='value'>{data.address.street}</div>
            <div className='value'>{data.address.city}, {data.address.state} {data.address.zip}</div>
          </div>
        </div>
      </div>
      {actions(data.actions)}
    </div>
  );
}

export default {
  enter,
};
