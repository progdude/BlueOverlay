import claims from '../../claims.json';
// ------------------------------------
// Constants
// ------------------------------------


// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = claims;
export default function nodesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
