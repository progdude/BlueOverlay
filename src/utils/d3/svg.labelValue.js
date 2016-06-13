export default function (node, {label, value} = {}, {x = 0, y = 0, vy = 14, ly = 14} = {}, extraClass = '') {
  const labelValue = node.append('g')
    .attr({
      'class': `label-value ${extraClass}`,
      transform: `translate(${x},${y})`,
    });
  labelValue.append('text')
    .attr({
      'class': 'label',
    })
    .text(label);

  let _text = value;
  if (!Array.isArray(_text)) {
    _text = [_text];
  }

  _text.forEach((s, i) => {
    labelValue.append('text')
      .attr({
        'class': 'value',
        y: vy * i + ly,
      })
      .text(s);
  });

  return labelValue;
}
