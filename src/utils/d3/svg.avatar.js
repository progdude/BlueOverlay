export default function (
  node,
  {avatar = '/images/icons/no-avatar.png', phi = false} = {},
  {x = 0, y = 0} = {},
  {height = 65, width = 65} = {}
) {
  const atr = node.append('g')
    .attr({
      'class': 'avatar',
      transform: `translate(${x},${y})`,
    });
  atr.append('use')
    .attr({
      'class': 'avatar-stroke',
      'xlink:href': '#avatar-image-clip-rect',
    });
  atr.append('image')
    .attr({
      'class': 'avatar-img',
      'xlink:href': avatar,
      height,
      width,
    });
  if (phi) {
    atr.append('image')
      .attr({
        'class': 'avatar-shield-img',
        'xlink:href': '/images/icons/shield.png',
        height: 28,
        width: 20,
        x: -10,
        y: height - 22,
      });
  }

  return atr;
}
