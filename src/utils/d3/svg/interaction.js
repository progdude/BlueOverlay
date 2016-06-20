import { hr } from './utils';
import labelValue from './labelValue';
import avatar from './avatar';
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

  const date = dateFormat('MM/dd/yyyy hh:mm', new Date(data.dateLastUpdate));
  const blurb = [
    labelValue(node, { label: date, value: data.repName }, { x: r, y: 25 }),
    labelValue(node, { label: 'Service Request', value: data.refId }, { x: r, y: 65 }),
    labelValue(node, { label: 'Member', value: data.member }, { x: r, y: 105 }),
  ];

  const details = [
    avatar(node, data, { x: 15, y: 15, height: 25, width: 25, stroke: false }),
    labelValue(node, { label: 'Service representative', value: data.repName }, { x: 50, y: 15 }),
    labelValue(node, { label: 'Service request', value: data.refId }, { x: 15, y: 55 }),
    labelValue(node, { label: 'Time stamp', value: date }, { x: 125, y: 55 }),
    labelValue(node, { label: 'Channel of interaction', value: data.channel }, { x: 15, y: 95 }),
    labelValue(node, { label: 'HCCID', value: data.hccid }, { x: 125, y: 95 }),
    hr(node, { x: 15, width: rect.width - 30, y: 135 }),
  ];

  const fo = node.append('foreignObject')
    .attr({
      x: 15,
      y: 150,
      height: 135,
      width: rect.width - 30,
    });

  fo.append('xhtml:div')
    .classed('html', true)
    .style({
      height: `${data.scale * 100}%`,
      width: `${data.scale * 100}%`,
      'font-size': `${data.scale}em`,
    })
    .html(data.summary);

  details.push(fo);

  details.forEach(c => c.attr('visibility', 'hidden'));

  let detailView = false;
  node.on('click', function () {
    if (window.d3.event.defaultPrevented) return;
    if (detailView) {
      data.height = data.width = r * 2;
      data.radius = r;
      data.pinable = false;
      bg.transition().duration(500)
        .attr(cir);
      blurb.forEach(c => c.attr('visibility', 'visible'));
      details.forEach(c => c.attr('visibility', 'hidden'));
      node.classed('details', false);
    } else {
      data.height = 300;
      data.width = 250;
      data.radius = false;
      data.pinable = true;
      bg.transition().duration(500)
        .attr(rect);
      blurb.forEach(c => c.attr('visibility', 'hidden'));
      details.forEach(c => c.attr('visibility', 'visible'));
      node.classed('details', true);
    }
    data.update();
    detailView = !detailView;
  });

  return node;
}

export default {
  enter,
};
