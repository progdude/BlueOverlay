import performAction from './performAction';
import avatar from './svg.avatar';
import labelValue from './svg.labelValue';
import actions from './svg.actions';
import dateFormat from 'date-format';

const height = 210;
const width = 275;

export function enter (node, data) {
  data.height = height;
  data.width = width;

  if (data.actions) {
    actions(node, data.actions, {x: width - 5, y: 15});
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
