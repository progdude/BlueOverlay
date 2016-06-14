import flatten from './flatten';
import config from './forceConfig';
import renderers from './svg.renderers';
import cola from 'webcola';
let d3; // Another lib adds d3 to the window, we need to use that one so we grab it from the window when we need it

class Force {
  constructor (data, size = [ document.documentElement.clientWidth, document.documentElement.clientHeight ]) {
    d3 = window.d3;
    this.pageBounds = { x: 0, y: 0, width: size[ 0 ], height: size[ 1 ] };
    this.size = size;
    this.node = document.createElement('div');
    this.nodes = flatten(data);
    this.svg = d3.select(this.node).append('svg')
      .attr('width', size[ 0 ])
      .attr('height', size[ 1 ])
      .attr('class', 'force')
      .on('mount', ::this.mount);
    this.boundingBox = this.svg.append('rect').attr('id', 'boundingBox').attr(this.pageBounds);
  }

  mount () {
    this.d3cola = cola.d3adaptor()
      .size(this.size)
      .linkDistance(config.linkDistance)
      .handleDisconnected(false);

    this.update();
  }

  update () {
    const that = this;
    const svg = d3.select('svg');
    const nodes = this.nodes.filter((d) => !d.hidden);
    const links = d3.layout.tree().links(nodes).filter(l => !(l.source.hidden || l.target.hidden));
    const realNodes = [ ...nodes ];
    const topLeft = {
      x: this.pageBounds.x,
      y: this.pageBounds.y,
      fixed: true,
      fixedWeight: 1e6,
    };
    const tlIndex = nodes.push(topLeft) - 1;
    const bottomRight = {
      x: this.pageBounds.x + this.pageBounds.width,
      y: this.pageBounds.y + this.pageBounds.height,
      fixed: true,
      fixedWeight: 1e6,
    };
    const brIndex = nodes.push(bottomRight) - 1;

    this.d3cola
      .nodes(nodes)
      .links(links);

    const node = svg.selectAll('.node')
      .data(realNodes, d => d.id);

    const drag = this.d3cola.drag()
      .on('dragstart', ::this.dragstart)
      .on('drag', ::this.dragmove)
      .on('dragend', ::this.dragend);
    node.enter()
      .append('g')
      .attr('class', d => `node ${d.type || 'default'}`)
      .each(function (d) {
        d.update = ::that.update;
        const node = d3.select(this);
        if (d.type && renderers[ d.type ] && typeof renderers[ d.type ].enter === 'function') {
          renderers[ d.type ].enter(node, d);
        } else if (renderers.default && typeof renderers.default.enter === 'function') {
          renderers.default.enter(node, d);
        }
      })
      .call(drag);

    node.exit()
      .each(function (d) {
        const node = d3.select(this);
        if (d.type && renderers[ d.type ] && typeof renderers[ d.type ].exit === 'function') {
          renderers[ d.type ].exit(node, d);
        } else if (renderers.default && typeof renderers.default.exit === 'function') {
          renderers.default.exit(node, d);
        } else {
          node.style('opacity', 1).transition().duration(500).style('opacity', 0).remove();
        }
      });

    const link = svg.selectAll('.link')
      .data(links, l => `${l.target.id}-${l.source.id}`);

    link.enter().append('path')
      .attr('class', 'link');
    link.exit().style('opacity', 1).transition().duration(500).style('opacity', 0).remove();

    const constraints = [];
    realNodes.forEach((node, i) => {
      constraints.push({ axis: 'x', type: 'separation', left: tlIndex, right: i, gap: node.width / 2 });
      constraints.push({ axis: 'y', type: 'separation', left: tlIndex, right: i, gap: node.height / 2 });
      constraints.push({ axis: 'x', type: 'separation', left: i, right: brIndex, gap: node.width / 2 });
      constraints.push({ axis: 'y', type: 'separation', left: i, right: brIndex, gap: node.height / 2 });
    });

    this.d3cola
      .constraints(constraints)
      .start();

    this.d3cola.on('tick', () => {
      node.each(function (d) {
        d.innerBounds = d.bounds;
      });

      node.attr('transform', d => `translate(${d.innerBounds.x},${d.innerBounds.y})`);

      link.each(function (d) {
        d.route = cola.vpsc.makeEdgeBetween(d.source.innerBounds, d.target.innerBounds, 1);
      });

      // math is hard....
      link.attr('d', function (d) {
        const deltaX = d.target.x - d.source.x;
        const deltaY = d.target.y - d.source.y;
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normX = deltaX / dist;
        const normY = deltaY / dist;
        const sourcePadding = d.source.radius;
        const targetPadding = d.target.radius;
        const sourceX = sourcePadding ? d.source.x + (sourcePadding * normX) : d.route.sourceIntersection.x;
        const sourceY = sourcePadding ? d.source.y + (sourcePadding * normY) : d.route.sourceIntersection.y;
        const targetX = targetPadding ? d.target.x - (targetPadding * normX) : d.route.targetIntersection.x;
        const targetY = targetPadding ? d.target.y - (targetPadding * normY) : d.route.targetIntersection.y;
        return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
      });

      link.filter(d => d.target.children && d.target.children.length > 0)
        .classed('back', true);

      link.filter(d => !(d.target.children && d.target.children.length > 0))
        .classed('back', false);
    });
  }

  dragstart (d, i) {
    if ((d.detached || d.pinable) && !d.hidden && (!d.children || d.children.length === 0)) {
      d3.select('.pin-area').style({ display: 'block' });
    }
  }

  dragmove (d, i) {
    if ((d.detached || d.pinable) && !d.hidden && (!d.children || d.children.length === 0)) {
      if (!d.detached && d3.event.x + d.width > this.pageBounds.width - 150) {
        d._parent.children.splice(d._parent.children.indexOf(d), 1);
        d.parent = null;
        d.detached = true;
        this.update();
      } else if (d.detached && d3.event.x + d.width < this.pageBounds.width - 150) {
        if (d._parent.children) {
          d._parent.children.push(d);
        } else {
          d.hidden = true;
        }
        d.parent = d._parent;
        d.detached = false;
        if (!d.pinable || d.hidden) {
          d3.select('.pin-area').style({display: 'none'});
        }
        this.update();
      }
    }
  }

  dragend (d, i) {
    d3.select('.pin-area').style({display: 'none'});
  }
}

export default Force;
