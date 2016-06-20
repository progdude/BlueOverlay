import performAction from '../performAction';
import avatar from './avatar';
import labelValue from './labelValue';
import actions from './actions';
import dateFormat from 'date-format';

export function enter (node, data) {
  let height = 210;
  let width = 95;

  width += Math.max(165, data.name.length * 10 + 15);

  data.height = height;
  data.width = width;

  if (data.actions) {
    actions(node, data.actions, {x: data.width - 5, y: 15});
  }

  const rect = node.append('rect')
    .attr({
      'class': 'member-background',
      height,
      width,
    });

  const ad = data.address;
  avatar(node, data, { x: 15, y: 15 });
  labelValue(node, { label: data.name, value: `${data.id} (${data.relation})` }, { x: 95, y: 15, ly: 20 }, 'heading');
  labelValue(node, { label: 'Date of Birth', value: dateFormat('MM/dd/yyyy', new Date(data.dob)) }, { x: 95, y: 55 });
  labelValue(node, { label: 'Gender', value: data.gender }, { x: 15, y: 95 });
  labelValue(node, { label: 'healthcare Plan', value: data.plan }, { x: 95, y: 95 });
  labelValue(node, { label: 'Segment', value: data.segment }, { x: 15, y: 140 });
  labelValue(node, { label: 'Address', value: [ad.street, `${ad.city}, ${ad.state} ${ad.zip}`] }, { x: 95, y: 140 });

  if (typeof data.action === 'object') {
    Object.keys(data.action).forEach(action => {
      rect.on(action, performAction(data.action[action], data));
    });
  }

  return node;
}

export default {
  enter,
};
