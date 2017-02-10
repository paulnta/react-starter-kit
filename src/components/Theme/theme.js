/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

export const colors = {
  primary: '#2196F3',
};

const commons = {
  userAgent: 'all',
};

const lightTheme = {
  ...commons,
  palette: {
    primary1Color: colors.primary,
  },
};

const darkTheme = {
  ...commons,
  palette: {
    primary1Color: colors.primary,
  },
};

export const getLightTheme = () => getMuiTheme(lightBaseTheme, lightTheme);

export const getDarkTheme = () => getMuiTheme(darkBaseTheme, darkTheme);
