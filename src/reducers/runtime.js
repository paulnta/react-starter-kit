import { Map, fromJS } from 'immutable';
import { SET_RUNTIME_VARIABLE } from '../constants';

export default function runtime(state = Map(), action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return state.set(action.payload.name, fromJS(action.payload.value));
    default:
      return state;
  }
}
