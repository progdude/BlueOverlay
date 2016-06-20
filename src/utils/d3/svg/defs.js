class SvgDefs {
  constructor (svg) {
    this.svg = svg;
  }

  avatarClip () {
    const defs = this.svg.append('defs')
      .attr('id', 'avatar-image-clip-defs');
    defs.append('rect')
      .attr({
        id: 'avatar-image-clip-rect',
        height: 65,
        width: 65,
      });
    defs.append('clipPath')
      .attr('id', 'avatar-image-clip')
      .append('use')
      .attr({
        'xlink:href': '#avatar-image-clip-rect'
      });

    return this;
  }

  startArrow () {
    this.svg.append('defs')
      .attr('id', 'start-arrow-defs')
      .append('marker')
      .attr({
        id: 'start-arrow-marker',
        viewBox: '0 -5 10 10',
        refX: 0,
        markerWidth: 6,
        markerHeight: 6,
        orient: 'auto',
      })
      .append('path')
      .attr({
        id: 'start-arrow-path',
        d: 'M10,-5L0,0L10,5L8,0Z',
      });

    return this;
  }

  endArrow () {
    this.svg.append('defs')
      .attr('id', 'end-arrow-defs')
      .append('marker')
      .attr({
        id: 'end-arrow-marker',
        viewBox: '0 -5 10 10',
        refX: 5,
        markerWidth: 6,
        markerHeight: 6,
        orient: 'auto',
      })
      .append('path')
      .attr({
        id: 'end-arrow-path',
        d: 'M0,-5L10,0L0,5L2,0Z',
      });

    return this;
  }

  endCircle () {
    this.svg.append('defs')
      .attr('id', 'circle-defs')
      .append('marker')
      .attr({
        id: 'circle-marker',
        refX: 5,
        refY: 5,
        markerWidth: 10,
        markerHeight: 10,
        orient: 'auto',
      })
      .append('circle')
      .attr({
        id: 'circle-marker-circle',
        cx: 7,
        cy: 7,
        r: 3,
        transform: 'scale(0.75)',
      });

    return this;
  }
}

export default SvgDefs;
