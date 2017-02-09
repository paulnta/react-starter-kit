import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

function ProvideIntl({ intl, children }) {
  const intlJS = intl.toJS();
  return (
    <IntlProvider
      {...intlJS}
      messages={intlJS.messages[intlJS.locale]}
    >
      {children}
    </IntlProvider>
  );
}

ProvideIntl.propTypes = {
  ...IntlProvider.propTypes,
  children: PropTypes.element.isRequired,
};

export default connect(state => ({
  intl: state.get('intl'),
}))(ProvideIntl);
