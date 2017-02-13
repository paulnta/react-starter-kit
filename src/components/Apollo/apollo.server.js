/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
/* eslint-disable import/prefer-default-export */
import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const configureClient = ({ req }) => new ApolloClient({
  reduxRootSelector: (state) => state.get('apollo'),
  ssrMode: true,
  // Remember that this is the interface the SSR server will use to connect to the
  // API server, so we need to ensure it isn't firewalled, etc
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3001/graphql', // TODO find the correct host
    opts: {
      credentials: 'same-origin',
      // transfer request headers to networkInterface so that they're accessible to proxy server
      // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
      headers: req.headers,
    },
  }),
});
