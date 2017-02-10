import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './IntlProvider';
import ThemeProvider from '../Theme';

function Provide({ store, children }) {
  return (
    <Provider store={store}>
      <IntlProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
}

Provide.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default Provide;
