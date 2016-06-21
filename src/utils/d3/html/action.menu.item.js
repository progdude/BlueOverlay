import React, { PropTypes } from 'react';
import performAction from '../performAction';

function MenuItem ({ menuItem }) {
  return (
    <li
      className={`action-menu-item${menuItem.icon && ' has-icon' || ''}`}
      onClick={menuItem.action.click && performAction(menuItem.action.click, menuItem)}
    >
      {menuItem.icon && <img src={menuItem.icon} className='menu-icon' />} {menuItem.label}
    </li>
  );
}

MenuItem.propTypes = {
  menuItem: PropTypes.object,
};

export default MenuItem;
