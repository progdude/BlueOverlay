import performAction from './performAction';

export default function (node, data, {x = 0, y = 0} = {}, {height = 35, width = 115} = {}) {
  const mi = node.append('g')
    .attr({
      'class': 'action-menu-item',
      transform: `translate(${x},${y})`,
    });

  mi.append('rect')
    .attr({
      'class': 'action-menu-item-background',
      height,
      width,
    });

  if (data.icon) {
    mi.append('image')
      .attr({
        'class': 'action-menu-item-img',
        'xlink:href': data.icon,
        height: 16,
        width: 16,
        x: 11,
        y: 7,
      });
  }

  mi.append('text')
    .attr({
      'class': 'action-menu-item-label',
      x: 35,
      y: 8,
    })
    .text(data.label);

  if (typeof data.action === 'object') {
    Object.keys(data.action).forEach(action => {
      mi.on(action, performAction(data.action[action], data));
    });
  }

  return mi;
}
