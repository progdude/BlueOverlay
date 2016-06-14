import performAction from './performAction';
import labelValue from './svg.labelValue';
import dateFormat from 'date-format';

const r = 75;
const cir = {
  height: r * 2,
  width: r * 2,
  ry: r,
  rx: r,
  r,
};
const rect = {
  ry: 10,
  rx: 10,
  height: 300,
  width: 250,
};

export function enter (node, data) {
  data.height = data.width = r * 2;
  data.radius = r;

  const bg = node.append('rect')
    .attr(Object.assign({
      'class': 'default-background',
    }, cir));

  const date = dateFormat('MM/dd/yyyy hh:mm', new Date(data.date));
  labelValue(node, { label: date, value: data.serviceAdvocate.name }, { x: r, y: 25 });
  labelValue(node, { label: 'Service Request', value: data.serviceRequest }, { x: r, y: 65 });
  labelValue(node, { label: 'Member', value: data.member }, { x: r, y: 105 });

  // action target
  const circle = node.append('rect')
    .attr(Object.assign({
      fill: 'transparent',
      'stroke-width': 0,
    }, cir));

  let detailView = false;
  circle.on('click', function () {
    if (window.d3.event.defaultPrevented) return;
    if (detailView) {
      data.height = data.width = r * 2;
      data.radius = r;
      data.pinable = false;
      bg.transition().duration(500)
        .attr(cir);
      circle.transition().duration(500).attr(cir);
    } else {
      data.height = 300;
      data.width = 250;
      data.radius = false;
      data.pinable = true;
      bg.transition().duration(500)
        .attr(rect);
      circle.transition().duration(500).attr(rect);
    }
    data.update();
    detailView = !detailView;
  });

  return node;
}

export default {
  enter,
};
