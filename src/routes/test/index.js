/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import React from 'react';
import Test from './Test';

export default {
  path: '/test',
  action: () => ({
    title: 'Test page',
    component: <Test />,
  }),
};
