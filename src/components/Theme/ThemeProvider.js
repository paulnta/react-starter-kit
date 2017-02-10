/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import React, { Children, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getLightTheme } from './theme';

// Make taps on links and buttons work fast on mobiles
injectTapEventPlugin();

function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider muiTheme={getLightTheme()}>
      {Children.only(children)}
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ThemeProvider;
