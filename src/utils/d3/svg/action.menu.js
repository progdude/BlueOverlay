import menuItem from './action.menu.item';

const menuTipX = 20;

export default function (node, menuItems, {x = 0, y = 0} = {}) {
  const menuWrap = node.append('g')
    .attr({
      'class': 'action-menu',
      transform: `translate(${x},${y})`,
    });

  const menu = menuWrap.append('g')
    .attr({
      'class': 'action-menu-menu',
      transform: `translate(${menuTipX},0)`,
    });

  const longestLabel = menuItems.reduce(function (longest, currentWord) {
    if (currentWord.label.length > longest) return currentWord.label.length;
    return longest;
  }, 0);

  const width = longestLabel * 6.1 + 55;

  menu.append('rect')
    .attr({
      'class': 'action-menu-background',
      width,
      height: 35 * menuItems.length,
    });

  const ts = menuTipX + menuTipX / 5;
  menuWrap.append('polygon')
    .attr({
      'class': 'action-menu-tip',
      points: `0,${ts / 2} ${menuTipX},0 ${menuTipX},${ts}`,
      transform: `translate(0,${menuTipX / 5})`,
      'stroke-dasharray': `${ts - 1} ${ts}`,
    });

  menuItems.forEach((mi, i) => {
    menuItem(menu, mi, {y: 35 * i}, {width});
  });

  return menuWrap;
}
