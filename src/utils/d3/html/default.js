import React from 'react';
import performAction from '../performAction';

export function enter (data) {
  data.r = true;
  return (
    <div
      className={data.type || 'default'}
      onClick={data.action && data.action.click && performAction(data.action.click, data)}
    >
      {data.icon && <img className='icon' src={data.icon} alt={data.label} />}
      <div className='node-label'>{data.label}</div>
    </div>
  );
}

export default {
  enter,
};
