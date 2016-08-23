import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import flatten from '../flatten';
import config from '../forceConfig';
import renderers from './renderers';
import betweenRect from '../lineBetweenRect';
import betweenCircle from '../lineBetweenCircle';
import * as nodeActions from '../../../store/syncReducers/nodes';
import { getStore } from '../../../store/createStore';
let d3; // Another lib adds d3 to the window, we need to use that one so we grab it from the window when we need it

const store = getStore();
const { dispatch } = store;

class Force {
  constructor (
    data,
    size = [
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ],
    center = {
      x: size[0] / 2,
      y: size[1] / 2,
    }
  ) {
    d3 = window.d3;
    this.state = store.getState();
    this.size = size;
    this.center = center;
    this.scale = 0.85;
    this.relScale = 1 / this.scale;
    this.node = document.createElement('div');
    this.nodes = flatten(data, this.center);
    this.container = d3.select(this.node).append('section')
      .attr('class', 'force')
      .style({
        transform: `scale(${this.scale})`,
        left: `${-((size[0] * this.relScale - size[0]) / 2)}px`,
        top: `${-((size[1] * this.relScale - size[1]) / 2)}px`,
        width: `${size[0] * this.relScale}px`,
        height: `${size[1] * this.relScale}px`,
      })
      .on('mount', ::this.mount);

    this.svgStage = this.container.append('svg')
      .classed('svgStage', true)
      .attr({
        width: size[0] * this.relScale,
        height: size[1] * this.relScale,
      });
    this.stage = this.container.append('div')
      .classed('stage', true);
  }

  mount () {
    this.force = d3.layout.force()
      .gravity(config.gravity)
      .friction(config.friction)
      .linkDistance((data) => {
        if (data.source.type === 'member' || data.target.type === 'member') {
          return config.linkDistance + 200;
        }
        if (data.source.style === 'inner' || data.target.style === 'inner') {
          return config.linkDistance - 25;
        }
        if (data.source.type === 'details' || data.target.type === 'details') {
          return config.linkDistance + 600;
        }
        return config.linkDistance;
      })
      .charge(config.charge)
      .chargeDistance(config.chargeDistance)
      .size(this.size);

    this.update();
  }

  update () {
    const that = this;
    const stage = d3.select('.stage');
    const svgStage = d3.select('svg');
    const nodes = this.nodes.filter((data) => !data.hidden);
    const links = d3.layout.tree().links(nodes).filter(link => !(link.source.hidden || link.target.hidden));

    this.force
      .nodes(nodes)
      .links(links);

    const node = stage.selectAll('.node')
      .data(nodes, data => data.id);

    const drag = this.force.drag()
      .on('dragstart', ::this.dragstart)
      .on('drag', ::this.dragmove)
      .on('dragend', ::this.dragend);

    const link = svgStage.selectAll('.link')
      .data(links, link => `${link.target.id}-${link.source.id}`);
    
    link.enter().append('path')
      .attr('class', 'link');
    link.exit().style('opacity', 1).transition().duration(500).style('opacity', 0).remove();

    node.enter()
      .append('div')
      .attr('class', 'node')
      .each(function (data) {
        data.update = ::that.update;
        data.scale = that.scale;
        data.assign = updates => Object.assign(data, updates);
        data.resume = ::that.force.resume;
        let Node = renderers.default.enter;
        if (data.type && renderers[ data.type ] && typeof renderers[ data.type ].enter === 'function') {
          Node = renderers[ data.type ].enter;
        }
        ReactDOM.render(<Provider store={store}><Node {...data} /></Provider>, this);
      })
      .call(drag);

    node.exit()
      .each(function (data) {
        const node = d3.select(this);
        if (data.type && renderers[ data.type ] && typeof renderers[ data.type ].exit === 'function') {
          renderers[ data.type ].exit(node, data);
        } else if (renderers.default && typeof renderers.default.exit === 'function') {
          renderers.default.exit(node, data);
        } else {
          node.style('opacity', 1).transition().duration(500).style('opacity', 0).remove();
        }
      });

    this.force.on('tick', () => {
      const that = this;
      const alpha = that.force.alpha();
      const speedMultipler = 0.15 * alpha;

      node.filter(data => data.style === 'inner' ||
        data.children && data.children.length === data._children.length && data.type !== 'nav')
        .each(data => {
          data.y += (that.relScale * that.center.y - data.y) * speedMultipler;
          data.x += (that.relScale * that.center.x - data.x) * speedMultipler;
        });

      node.filter(data => data.momentmun && !data.dragging).each(data => {
        data.y += data.momentmun.y;
        data.x += data.momentmun.x;
        if (data.detached) {
          data.py = data.y;
          data.px = data.x;
        }
        data.momentmun.y *= alpha * 10;
        data.momentmun.x *= alpha * 10;
      });

      node.each(function (data) {
        data.height = this.offsetHeight || this.clientHeight;
        data.width = this.offsetWidth || this.clientWidth;
        if (data.r && data.height) {
          data.radius = data.height / 2;
        }
        const borders = {
          x: {
            max: that.relScale * that.size[0] - data.width / 2,
            min: data.width / 2,
          },
          y: {
            max: that.relScale * that.size[1] - data.height / 2,
            min: data.height / 2,
          },
        };
        data.x = Math.max(Math.min(data.x, borders.x.max), borders.x.min);
        data.y = Math.max(Math.min(data.y, borders.y.max), borders.y.min);
        if (data.momentmun && (data.x === borders.x.min || data.x === borders.x.max)) {
          data.momentmun.x = 0;
        }
        if (data.momentmun && (data.y === borders.y.min || data.y === borders.y.max)) {
          data.momentmun.y = 0;
        }

        if ((data.detached || data.pinable) && !data.hidden && (!data.children || data.children.length === 0)) {

          if (!data.detached && data.x + data.width > (that.relScale * that.size[0] - 150)) {
            console.log('pinnedRight');
            data._parent.children.splice(data._parent.children.indexOf(data), 1);
            data.parent = null;
            dispatch(nodeActions.updateTreeNode(data.id, {fixed: true, detached: true}));
            data.fixed = true;
            data.detached = true;
            data.pinnedRight=true;
            that.update();
          } 

          else if(!data.detached && data.x < 250){
            console.log('pinnedLeft');

            d3.select(this)
           
              .transition()
              .duration(1500)
              .style("opacity", "0")
              .each('end', function(){
                                     d3.selectAll(".random")
            .style("background", "linear-gradient(rgba(0, 50, 101, 1), rgba(0, 50, 101, 1)), url()");
            d3.select(".green-check")
            .style("display", "inline");
              });

            d3.selectAll(".detailed")
            .style("background", "linear-gradient(rgba(54, 82, 130, 0.5), rgba(54, 82, 130, 0.5)), url(http://cdn.grid.fotosearch.com/CSP/CSP994/k16168496.jpg)")
            .classed("random", true);


            d3.select(this)
              .transition()
              .delay(5000)
              .duration(1500)
              .style("opacity", "1");

    

            data._parent.children.splice(data._parent.children.indexOf(data), 1);
            data.parent = null;
            dispatch(nodeActions.updateTreeNode(data.id, {fixed: true, detached: true}));
            data.fixed = true;
            data.detached = true;
            data.pinnedLeft=true;
            that.update();
          }


          else if (data.detached && data.x + data.width < (that.relScale * that.size[0] - 150) && data.pinnedRight) {
            console.log('unPinnedRight');
            data.pinnedRight =false;
            if (data._parent.children) {
              data._parent.children.push(data);
            } else {
              data._parent._children.push(data);
              data.hidden = true;
            }
            data.parent = data._parent;
            dispatch(nodeActions.updateTreeNode(data.id, {fixed: false, detached: false}));
            data.detached = false;
            data.fixed = false;
            if (!data.pinable || data.hidden) {
              d3.select('.pin-area').style({display: 'none'});
              d3.select('.left_pin').style({display: 'none'});
            }
            that.update();
          }

          else if(data.detached && data.x > 250 && data.pinnedLeft){
            console.log('unPinnedLeft');

            data.pinnedLeft=false;
            if (data._parent.children) {
              data._parent.children.push(data);
            } else {
              data._parent._children.push(data);
              data.hidden = true;
            }
            data.parent = data._parent;
            dispatch(nodeActions.updateTreeNode(data.id, {fixed: false, detached: false}));
            data.detached = false;
            data.fixed = false;
            if (!data.pinable || data.hidden) {
              d3.select('.pin-area').style({display: 'none'});
              d3.select('.left_pin').style({display: 'none'});
            }
            that.update();
          }


        }
      });

      node.style({
        transform: data => `translate(${data.x - data.width / 2}px,${data.y - data.height / 2}px)`,
      });

      link.attr('d', function (data) {
        let source;
        let target;
        if (data.source.r) {
          source = betweenCircle(data.source, data.target);
        } else {
          source = betweenRect(data.source, data.target);
        }
        if (data.target.r) {
          target = betweenCircle(data.source, data.target);
        } else {
          target = betweenRect(data.source, data.target);
        }
        return 'M' + source.source.x + ',' + source.source.y + 'L' + target.target.x + ',' + target.target.y;
      });

      link.filter(data => data.target.children && data.target.children.length > 0)
        .classed('back', true);

      link.filter(data => !(data.target.children && data.target.children.length > 0))
        .classed('back', false);
    });

    this.force
      .start();
  }

  dragstart (data, nodeIndex) {
    data.dragging = true;
    if ((data.detached || data.pinable) && !data.hidden && (!data.children || data.children.length === 0)) {
      d3.select('.pin-area').style({ display: 'block' });
      d3.select('.left_pin').style({ display: 'block' });
    }
  }

  dragmove (data, nodeIndex) {
    data.momentmun = {
      x: d3.event.dx,
      y: d3.event.dy,
    };
  }

  dragend (data, nodeIndex) {
    d3.select('.pin-area').style({display: 'none'});
    d3.select('.left_pin').style({display: 'none'});
    data.dragging = false;
  }
}

export default Force;
