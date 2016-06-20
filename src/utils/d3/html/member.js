import React from 'react';
import actions from './actions';
import dateFormat from 'date-format';
import jsxToString from 'jsx-to-string';

export function enter (node, data) {
  node
    .html(jsxToString(
      <div>
        <div class='row'>
          <div class='col-xs-4'>
            <img src={data.avatar} alt='avatar' class='avatar' />
          </div>
          <div class='col-xs-8'>
            <div class='lead label'>{data.name}</div>
            <div class='value'>{data.id}</div>
            <br />
            <div class='label'>Date of Birth</div>
            <div class='value'>{dateFormat('MM/dd/yyyy', new Date(data.dob))}</div>
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-4'>
            <div class='label'>Gender</div>
            <div class='value'>{data.gender}</div>
          </div>
          <div class='col-xs-8'>
            <div class='label'>Healthcare Plan</div>
            <div class='value'>{data.plan}</div>
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-4'>
            <div class='label'>Segment</div>
            <div class='value'>{data.segment}</div>
          </div>
          <div class='col-xs-8'>
            <div class='label'>Address</div>
            <div class='value'>{data.address.street}</div>
            <div class='value'>{data.address.city}, {data.address.state} {data.address.zip}</div>
          </div>
        </div>
        {actions(data.actions)}
      </div>
    ));

  return node;
}

export default {
  enter,
};
