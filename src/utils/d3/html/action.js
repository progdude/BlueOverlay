import React from 'react';
import actionMenu from './action.menu';

export default function (action) {
  let menuDisplaying = false;
  return (
    <div className='action'>
      <button className='action-btn' onClick={clickHandler}>
        <img src={action.icon} alt='' />
      </button>
      {action.menu && actionMenu(action.menu)}
    </div>
  );

  function clickHandler () {
    const btn = this;
    const menu = btn.querySelector('.action-menu');
    if (menuDisplaying) {
      window.d3.selectAll('.action-menu')
        .filter(function () {
          return !(menu === this);
        })
        .attr('display', 'none');
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
  }
}
