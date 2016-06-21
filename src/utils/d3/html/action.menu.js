import React from 'react';
import MenuItem from './action.menu.item';

export default function (menuItems) {
  return (
    <ul className='menu-item'>
      {menuItems.map((menuItem, index) => <MenuItem key={`menuItem_${index}`} menuItem={menuItem} />)}
    </ul>
  );
}
