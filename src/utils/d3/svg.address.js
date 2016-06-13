import performAction from './performAction';
import labelValue from './svg.labelValue';

const r = 75;

export function enter (node, data) {
  data.height = data.width = r * 2;
  data.radius = r;
  node.append('circle')
    .attr({
      'class': 'default-background',
      transform: `translate(${r},${r})`,
      r,
    });

  const ad = data.address;
  labelValue(node, { label: data.label, value: [ad.street, `${ad.city}, ${ad.state} ${ad.zip}`] }, { x: r, y: 40, ly: 25 });

  // action target
  const circle = node.append('circle')
    .attr({
      transform: `translate(${r},${r})`,
      fill: 'transparent',
      'stroke-width': 0,
      r,
    });

  if (typeof data.action === 'object') {
    Object.keys(data.action).forEach(action => {
      circle.on(action, performAction(data.action[action], data));
    });
  }

  return node;
}

export default {
  enter,
};
