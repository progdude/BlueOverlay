import React, { PropTypes } from 'react';
import Action from './action';

function Actions ({ actions }) {
  return (
    <div className='actions'>
      {actions.map((action, index) => <Action key={`action_${index}`} action={action} />)}
    </div>
  );
}

Actions.propTypes = {
  actions: PropTypes.array,
};

export default Actions;
