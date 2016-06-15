import flatten from './flatten';
import config from './forceConfig';
import renderers from './svg.renderers';
import betweenRect from './lineBetweenRect';
import betweenCircle from './lineBetweenCircle';
let d3; // Another lib adds d3 to the window, we need to use that one so we grab it from the window when we need it

class Force {
  constructor (data, size = [ document.documentElement.clientWidth, document.documentElement.clientHeight ]) {
    d3 = window.d3;
    this.size = size;
    this.center = {
      x: size[0] / 2,
      y: size[1] / 2,
    };
    this.node = document.createElement('div');
    this.nodes = flatten(data, this.center);
    this.svg = d3.select(this.node).append('svg')
      .attr('width', size[ 0 ])
      .attr('height', size[ 1 ])
      .attr('class', 'force')
      .on('mount', ::this.mount);
  }

  mount () {
    this.force = d3.layout.force()
      .gravity(config.gravity)
      .friction(config.friction)
      .linkDistance(config.linkDistance)
      .charge(config.charge)
      .chargeDistance(config.chargeDistance)
      .size(this.size);

    this.update();
  }

  update () {
    const that = this;
    const svg = d3.select('svg');
    const nodes = this.nodes.filter((d) => !d.hidden);
    const links = d3.layout.tree().links(nodes).filter(l => !(l.source.hidden || l.target.hidden));

    this.force
      .nodes(nodes)
      .links(links);

    const node = svg.selectAll('.node')
      .data(nodes, d => d.id);

    const drag = this.force.drag()
      .on('dragstart', ::this.dragstart)
      .on('drag', ::this.dragmove)
      .on('dragend', ::this.dragend);

    const link = svg.selectAll('.link')
      .data(links, l => `${l.target.id}-${l.source.id}`);

    link.enter().append('path')
      .attr('class', 'link');
    link.exit().style('opacity', 1).transition().duration(500).style('opacity', 0).remove();

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
    this.force
      .start();

    this.force.on('tick', () => {
      var k = 0.15 * this.force.alpha();

      node.filter(d => d.children && d.children.length === d._children.length).each(d => {
        d.y += (this.center.y - d.y) * k;
        d.x += (this.center.x - d.x) * k;
      });

      node.each(d => {
        d.x = Math.max(Math.min(d.x, this.size[0] - d.width / 2), d.width / 2);
        d.y = Math.max(Math.min(d.y, this.size[1] - d.height / 2), d.height / 2);
      });

      node.attr('transform', d => `translate(${d.x - d.width / 2},${d.y - d.height / 2})`);

      link.attr('d', function (d) {
        let s;
        let t;
        if (d.source.r || d.source.radius) {
          s = betweenCircle(d.source, d.target);
        } else {
          s = betweenRect(d.source, d.target);
        }
        if (d.target.r || d.target.radius) {
          t = betweenCircle(d.source, d.target);
        } else {
          t = betweenRect(d.source, d.target);
        }
        return 'M' + s.source.x + ',' + s.source.y + 'L' + t.target.x + ',' + t.target.y;
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
      if (!d.detached && d3.event.x + d.width > this.size[0] - 150) {
        d._parent.children.splice(d._parent.children.indexOf(d), 1);
        d.parent = null;
        d.fixed = true;
        d.detached = true;
        this.update();
      } else if (d.detached && d3.event.x + d.width < this.size[0] - 150) {
        if (d._parent.children) {
          d._parent.children.push(d);
        } else {
          d._parent._children.push(d);
          d.hidden = true;
        }
        d.parent = d._parent;
        d.detached = false;
        d.fixed = false;
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
