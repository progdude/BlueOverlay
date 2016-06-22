// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_NODE = 'UPDATE_NODE';
export const UPDATE_TREE_NODE = 'UPDATE_TREE_NODE';

// ------------------------------------
// Actions
// ------------------------------------
export function updateNode (id, value) {
  return {
    type: UPDATE_NODE,
    payload: {id, value},
  };
}
export function updateTreeNode (id, value) {
  return {
    type: UPDATE_TREE_NODE,
    payload: {id, value},
  };
}

export const actions = {
  updateNode,
  updateTreeNode,
};

const findTreeNode = (node, id) => {
  if (node.id === id) {
    return node;
  }
  const children = node.children || node._children;
  if (children) {
    const found = children.filter(child => findTreeNode(child, id));
    if (found.length) {
      return found[0];
    }
  }
  return false;
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_NODE]: (state, { payload: { id, value } }) => {
    const mergedNode = Object.assign({}, state.nodes[id], value);
    const mergedNodes = Object.assign({}, state.nodes, {[id]: mergedNode});
    return Object.assign({}, state, {nodes: mergedNodes});
  },
  [UPDATE_TREE_NODE]: (state, { payload: { id, value } }) => {
    const tree = Object.assign({}, state.tree);
    const node = findTreeNode(tree, id);
    if (node) {
      Object.assign(node, value);
    }
    return state;
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {tree: {}, nodes: {}};
export default function nodesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
