// These actions can be split into their own files.
// TODO: have a way to just reset all of this... more stateful. Clean up all of this mess.
const actions = {
  expand: function (data) {
    return function (event) {
      if (data.detached || (window.d3.event && window.d3.event.defaultPrevented)) return;
      if (data._children && data._children.length > 9) {
        data.expand();
      } else {
        data.assign({hidden: false, children: data._children});
        if (data.children) {
          data.children.forEach(child => {
            child.hidden = false;
            child._children = child.children || child._children;
            if (child.navigation) {
              child.navigation.hidden = true;
              if (child.navigation.children) {
                child.navigation.children.forEach(child => (child.hidden = true));
                child.navigation.children = null;
              }
            }
            if (child.children) {
              child.children.forEach(childChild => {
                childChild.hidden = true;
                childChild._children = childChild.children || childChild._children;
                childChild.children = null;
                if (childChild.navigation) {
                  childChild.navigation.hidden = true;
                  if (childChild.navigation.children) {
                    childChild.navigation.children.forEach(child => (child.hidden = true));
                    childChild.navigation.children = null;
                  }
                }
              });
            }
            child.children = null;
          });
        }
        let parent = data.parent;
        let parentChild = data;
        while (parent) {
          parent.hidden = false;
          if (parent.navigation) {
            parent.navigation.hidden = true;
            if (parent.navigation.children) {
              parent.navigation.children.forEach(child => (child.hidden = true));
              parent.navigation.children = null;
            }
          }
          parent.children.filter(child => child !== parentChild).forEach(child => (child.hidden = true));
          parent.children = [ parentChild ];
          parentChild = parent;
          parent = parent.parent;
        }
        if (data.navigation) {
          data.navigation.hidden = false;
          if (data.navigation._children) {
            data.navigation.children = data.navigation._children;
            data.navigation.children.forEach(child => (child.hidden = false));
          }
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
