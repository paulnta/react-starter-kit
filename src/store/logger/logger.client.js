import reduxLogger from 'redux-logger';

export default function createLogger() {
  return reduxLogger({
    collapsed: true,
    stateTransformer: (state) => state.toJS(),
  });
}
