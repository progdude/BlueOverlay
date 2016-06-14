export default function flatten (root) {
  const nodes = [];

  const recurse = (node, parent) => {
    node._children = node.all_children = node.children;
    if (parent) {
      node._parent = node.parent = parent;
      node.children = null;
      if (parent.parent) {
        node.hidden = true;
      }
    }
    if (node._children) node._children.forEach(n => recurse(n, node));
    nodes.push(node);
  };

  recurse(root);
  return nodes;
}
