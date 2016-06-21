import React from 'react';
import Action from './action';

export default function (actions) {
  return (
    <div className='actions'>
      {actions.map((action, index) => <Action key={`action_${index}`} action={action} />)}
    </div>
  );
}
