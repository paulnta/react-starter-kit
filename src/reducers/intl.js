import { Map, fromJS } from 'immutable';
import {
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_ERROR,
} from '../constants';

const initialState = Map({
  initialNow: Date.now(),
});

export default function intl(state = initialState, action) {
  switch (action.type) {
    case SET_LOCALE_START: {
      const locale = state.getIn([action.payload.locale], state.get('locale'));
      return state.set('locale', locale)
        .set('newLocale', action.payload.locale);
    }

    case SET_LOCALE_SUCCESS: {
      return state.set('locale', action.payload.locale)
        .set('newLocale', null)
        .updateIn(['messages'], Map(), messages =>
          messages.set(action.payload.locale, fromJS(action.payload.messages)));
    }

    case SET_LOCALE_ERROR: {
      return state.set('newLocale', null);
    }

    default: {
      return state;
    }
  }
}
