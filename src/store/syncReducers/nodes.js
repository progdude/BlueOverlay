// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_NODE = 'UPDATE_NODE';
export const UPDATE_TREE_NODE = 'UPDATE_TREE_NODE';
export const SELECT_NODE = 'SELECT_NODE';
export const TOGGLE_MENU = 'TOGGLE_MENU';

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

export function select (id) {
  return {
    type: SELECT_NODE,
    payload: {id},
  };
}

export function toggleMenu (id) {
  return {
    type: TOGGLE_MENU,
    payload: {id},
  };
}

export const actions = {
  updateNode,
  updateTreeNode,
  select,
  toggleMenu,
};

const findTreeNode = (node, id) => {
  if (node.id === id) {
    return node;
  }
  const children = node._children || node.children;
  if (children) {
    for (let index = 0; index < children.length; ++index) {
      const result = findTreeNode(children[index], id);
      if (result) {
        return result;
      }
    }
  }
  return false;
};

const reset = (node, parent) => {
  if (node.detached) return;
  node._children = node._children || node.children || [];
  if (parent) {
    node._parent = node.parent = parent;
  }
  node.children = null;
  node.hidden = true;
  if (node._children) node._children.forEach(n => reset(n, node));
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
    const node = findTreeNode(state.tree, id);
    if (node) {
      Object.assign(node, value);
    }
    return state;
  },
  [TOGGLE_MENU]: (state, { payload: { id } }) => {
    if (state.menu === id) {
      return {...state, menu: undefined};
    }
    return {...state, menu: id};
  },
  [SELECT_NODE]: (state, { payload: { id } }) => {
    reset(state.tree);
    const selected = findTreeNode(state.tree, id);
    if (selected) {
      selected.children = selected._children // Set the children of selected to the 'cached' children
        ? selected._children.filter(child => !child.detached)
        : [];
      selected.children.forEach(child => (child.hidden = false)); // show the children of selected
      selected.hidden = false; // show the selected node
      if (selected._parent) {
        selected.parent = selected._parent; // set the parent of selected to the 'cached' parent
        selected.parent.children = [selected]; // set the parent to only have the selected node as the child
        selected.parent.hidden = false; // show the parent
        if (selected.parent._parent) {
          selected.parent.parent = state.tree; // send the parent's parent to the root node, per requirements.
          selected.parent.parent.children = [selected.parent]; // set the parent's parent child to the selected parent
          selected.parent.parent.hidden = false; // show the root node.
        }
      }
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
