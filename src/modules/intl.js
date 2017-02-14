import { Map, fromJS } from 'immutable';

//
// Constants
// -----------------------------------------------------------------------------
const SET_LOCALE_START = 'intl/SET_LOCALE_START';
const SET_LOCALE_SUCCESS = 'intl/SET_LOCALE_SUCCESS';
const SET_LOCALE_ERROR = 'intl/SET_LOCALE_ERROR';

//
// Reducers
// -----------------------------------------------------------------------------
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

//
// Actions Creators
// -----------------------------------------------------------------------------
const query = `
  query ($locale:String!) {
    intl (locale:$locale) {
      id
      message
    }
  }
`;

export function setLocale({ locale }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    dispatch({
      type: SET_LOCALE_START,
      payload: {
        locale,
      },
    });

    try {
      const { data } = await graphqlRequest(query, { locale });
      const messages = data.intl.reduce((msgs, msg) => {
        msgs[msg.id] = msg.message; // eslint-disable-line no-param-reassign
        return msgs;
      }, {});
      dispatch({
        type: SET_LOCALE_SUCCESS,
        payload: {
          locale,
          messages,
        },
      });

      // remember locale for every new request
      if (process.env.BROWSER) {
        const maxAge = 3650 * 24 * 3600; // 10 years in seconds
        document.cookie = `lang=${locale};path=/;max-age=${maxAge}`;
      }
    } catch (error) {
      dispatch({
        type: SET_LOCALE_ERROR,
        payload: {
          locale,
          error,
        },
      });
      return false;
    }

    return true;
  };
}
