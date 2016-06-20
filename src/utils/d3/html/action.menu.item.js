import React from 'react';
import performAction from '../performAction';

export default function (data) {
  return (
    <li
      className={`acction-menu-item${data.icon && ' has-icon' || ''}`}
      onClick={data.action.click && performAction(data.action.click, data)}
    >
      {data.icon && <img src={data.icon} className='menu-icon' />} {data.label}
    </li>
  );
}
