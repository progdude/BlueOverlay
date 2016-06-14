export default function (node, {label, value} = {}, {x = 0, y = 0, vy = 14, ly = 14} = {}, extraClass = '') {
  const labelValue = node.append('g')
    .attr({
      'class': `label-value ${extraClass}`,
      transform: `translate(${x},${y})`,
    });

  let _label = label;
  let _ly = 0;
  if (!Array.isArray(_label)) {
    _label = [_label];
  }

  _label.forEach((s, i) => {
    if (s) {
      labelValue.append('text')
        .attr({
          'class': 'label',
          y: _ly,
        })
        .text(s);
    }
    _ly += ly;
  });

  let _value = value;
  if (!Array.isArray(_value)) {
    _value = [_value];
  }

  _value.forEach((s, i) => {
    if (s) {
      labelValue.append('text')
        .attr({
          'class': 'value',
          y: vy * i + _ly,
        })
        .text(s);
    }
  });

  return labelValue;
}
