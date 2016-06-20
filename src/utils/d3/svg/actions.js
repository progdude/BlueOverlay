import action from './action';

export default function (node, actions, {x = 0, y = 0} = {}) {
  const actns = node.append('g')
    .attr({
      'class': 'actions',
      transform: `translate(${x},${y})`,
    });
  actions.forEach((actn, i) => {
    action(actns, actn, {y: 35 * i});
  });

  return actns;
}
