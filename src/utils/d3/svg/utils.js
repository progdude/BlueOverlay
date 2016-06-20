export function hr (node, { width = 0, x = 0, y = 0 } = {}, extraClass) {
  return node.append('line').attr({
    'class': `hr ${extraClass}`,
    x1: x,
    x2: x + width,
    y1: y,
    y2: y,
  });
}
