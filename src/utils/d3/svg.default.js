import performAction from './performAction';

const r = 75;
const cir = {
  height: r * 2,
  width: r * 2,
  ry: r,
  rx: r,
  r,
};
export function enter (node, data) {
  data.height = data.width = r * 2;
  data.radius = r;
  const bg = node.append('rect')
    .attr(Object.assign({
      'class': 'default-background',
    }, cir));

  let _text = data.label;
  if (!Array.isArray(_text)) {
    _text = [_text];
  }

  if (data.icon) {
    node.append('image')
      .attr({
        'class': 'default-icon',
        'xlink:href': data.icon,
        height: 55,
        width: 150,
        y: 30,
      });
    _text.forEach((s, i) => {
      node.append('text')
        .attr({
          'class': 'default-label with-icon',
          y: 16 * i + 90,
          x: r,
        })
        .text(s);
    });
  } else {
    _text.forEach((s, i) => {
      node.append('text')
        .attr({
          'class': 'default-label',
          y: 22 * i + 63,
          x: r,
        })
        .text(s);
    });
  }

  // action target
  const clickTarget = node.append('rect')
    .attr(Object.assign({
      fill: 'transparent',
      'stroke-width': 0,
    }, cir));

  if (typeof data.action === 'object') {
    Object.keys(data.action).forEach(action => {
      clickTarget.on(action, performAction(data.action[action], data));
    });
  }

  data.expand = () => {
    data.height = 300;
    data.width = 250;
    data.radius = false;
    data.x = 0;
    data.y = 0;
    data.fixed = true;
    const svg = window.d3.select('svg');
    bg.transition().duration(500)
      .attr({
        height: svg.attr('height'),
        width: svg.attr('width'),
        ry: 0,
        rx: 0,
      });
    node.on('mousedown.drag', null);
    clickTarget.transition().duration(500).attr({
      height: '100%',
      width: '100%',
      ry: 0,
      rx: 0
    });
  };

  return node;
}

export default {
  enter,
};
