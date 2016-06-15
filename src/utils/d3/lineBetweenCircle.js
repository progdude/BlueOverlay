export default function (source = {x: 0, y: 0, radius: 0, r: 0}, target = {x: 0, y: 0, radius: 0, r: 0}) {
  const deltaX = target.x - source.x;
  const deltaY = target.y - source.y;
  const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const normX = deltaX / dist;
  const normY = deltaY / dist;
  const sourcePadding = source.radius || source.r;
  const targetPadding = target.radius || source.r;
  const sourceX = source.x + (sourcePadding * normX);
  const sourceY = source.y + (sourcePadding * normY);
  const targetX = target.x - (targetPadding * normX);
  const targetY = target.y - (targetPadding * normY);
  return {
    source: { x: sourceX, y: sourceY },
    target: { x: targetX, y: targetY },
  };
}
