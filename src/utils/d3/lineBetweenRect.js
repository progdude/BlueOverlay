export default function (source = {x: 0, y: 0, width: 0, height: 0}, target = {x: 0, y: 0, width: 0, height: 0}) {
  const _source = {
    cx: source.x,
    cy: source.y,
    X: source.x + source.width / 2,
    Y: source.y + source.height / 2,
    x: source.x - source.width / 2,
    y: source.y - source.height / 2,
    height: source.height,
    width: source.width,
  };
  const _target = {
    cx: target.x,
    cy: target.y,
    X: target.x + target.width / 2,
    Y: target.y + target.height / 2,
    x: target.x - target.width / 2,
    y: target.y - target.height / 2,
    height: target.height,
    width: target.width,
  };
  const si = rayIntersection(_source, _target) || { x: _source.cx, y: _source.cy };
  const ti = rayIntersection(_target, _source) || { x: _target.cx, y: _target.cy };

  return {
    source: si,
    target: ti,
  };
}

function rayIntersection (rect1, rect2) {
  const intersections = lineIntersections(rect1, rect2);
  return intersections.length > 0 ? intersections[0] : null;
}

function lineIntersections (rect1, rect2) {
  var sides = [[rect1.x, rect1.y, rect1.X, rect1.y],
    [rect1.X, rect1.y, rect1.X, rect1.Y],
    [rect1.X, rect1.Y, rect1.x, rect1.Y],
    [rect1.x, rect1.Y, rect1.x, rect1.y]];
  const intersections = [];
  for (let i = 0; i < 4; ++i) {
    const r = lineIntersection(rect1.cx, rect1.cy, rect2.cx, rect2.cy, sides[i][0], sides[i][1], sides[i][2], sides[i][3]);
    if (r !== null) intersections.push({ x: r.x, y: r.y });
  }
  return intersections;
}

function lineIntersection (x1, y1, x2, y2, x3, y3, x4, y4) {
  const dx12 = x2 - x1;
  const dx34 = x4 - x3;
  const dy12 = y2 - y1;
  const dy34 = y4 - y3;
  const denominator = dy34 * dx12 - dx34 * dy12;
  if (denominator === 0) return null;
  const dx31 = x1 - x3;
  const dy31 = y1 - y3;
  const numa = dx34 * dy31 - dy34 * dx31;
  const a = numa / denominator;
  const numb = dx12 * dy31 - dy12 * dx31;
  const b = numb / denominator;
  if (a >= 0 && a <= 1 && b >= 0 && b <= 1) {
    return {
      x: x1 + a * dx12,
      y: y1 + a * dy12
    };
  }
  return null;
}
