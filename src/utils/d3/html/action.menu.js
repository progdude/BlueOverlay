import React from 'react';
import menuItem from './action.menu.item';

export default function (menuItems) {
  return (
    <ul className='menu-item' style={{display: 'none'}}>
      {menuItems.map(menuItem)}
    </ul>
  );
}
