import { Map, fromJS } from 'immutable';

//
// Constants
// -----------------------------------------------------------------------------
const SET_RUNTIME_VARIABLE = 'runtime/SET_RUNTIME_VARIABLE'


//
// Reducers
// -----------------------------------------------------------------------------
const initialState = Map()

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return state.set(action.payload.name, fromJS(action.payload.value));
    default:
      return state;
  }
}


//
// Action Creators
// -----------------------------------------------------------------------------
export function setRuntimeVariable({ name, value }) {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}
