export default function flatten (root, {x, y}) {
  const nodes = [];
  const recurse = (node, parent) => {
    node._children = node._children || node.children && [...node.children] || [];
    if (parent) {
      const init = parent._children.indexOf(node);
      node.x = ((init % 4) * (x / 2)) + 300;
      node.y = (Math.floor(init / 4) * (y / 2)) + 500;
      node._parent = node.parent = parent;
      node.children = null;
      if (parent.parent) {
        node.hidden = true;
      }
    } else {
      node.x = x;
      node.y = y;
    }
    if (node._children) node._children.forEach(n => recurse(n, node));
    if (node.navigation) {
      recurse(node.navigation, node);
      node.navigation.fixed = true;
      node.navigation.x = 0;
      node.navigation.y = y * 2;
      node.navigation.hidden = true;
    }
    nodes.push(node);
  };

  recurse(root);

  return nodes;
}
