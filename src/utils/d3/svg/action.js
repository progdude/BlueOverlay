import actionMenu from './action.menu';

export default function (node, action, {x = 0, y = 0} = {}) {
  var menu;
  const actn = node.append('g')
    .attr({
      'class': 'action',
      transform: `translate(${x},${y})`,
    });

  const btn = actn.append('g')
    .attr({
      'class': 'action-btn',
    });

  btn.append('rect')
    .attr({
      'class': 'action-background',
      height: 30,
      width: 35,
    });

  btn.append('image')
    .attr({
      'class': 'action-img',
      'xlink:href': action.icon,
      height: 16,
      width: 16,
      x: 11,
      y: 7,
    });

  if (action.menu) {
    menu = actionMenu(actn, action.menu, { x: 40 })
      .attr('visibility', 'hidden');
  }

  btn.on('click', function () {
    if (menu) {
      node.selectAll('.action-menu').filter(function () {
        return !(this === menu[ 0 ][ 0 ]);
      })
        .attr('visibility', 'hidden');
      menu.attr('visibility', menu.attr('visibility') === 'hidden' ? 'visible' : 'hidden');
    }
  });

  return actn;
}
