import React from 'react';
import action from './action';

export default function (actions) {
  return (
    <div className='actions'>
      {actions.map(action)}
    </div>
  );
}
