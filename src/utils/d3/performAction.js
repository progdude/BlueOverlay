// These actions can be split into their own files.
const actions = {
  expand: function (data) {
    return function (d) {
      if (d.detached || window.d3.event.defaultPrevented) return;
      if (d.all_children && d.all_children.length > 9) {
        this.parentNode.parentNode.appendChild(this.parentNode);
        d.expand();
      } else {
        d.hidden = false;
        d.children = d.all_children;
        if (d.children) {
          d.children.forEach(n => {
            n.hidden = false;
            n._children = n.children || n._children;
            if (n.children) {
              n.children.forEach(n => {
                n.hidden = true;
                n._children = n.children || n._children;
                n.children = null;
              });
            }
            n.children = null;
          });
        }
        let parent = d.parent;
        let parentChild = d;
        while (parent) {
          parent.hidden = false;
          parent.children.filter(n => n !== parentChild).forEach(n => (n.hidden = true));
          parent.children = [ parentChild ];
          parentChild = parent;
          parent = parent.parent;
        }
      }
      data.update();
    };
  },
};

export default function (action, data) {
  if (typeof actions[action] === 'function') {
    return actions[action](data);
  } else {
    return function (d) {
      alert(`You ${action}ed ${data.label}\nThe 'action' is not created yet`);
    };
  }
}
