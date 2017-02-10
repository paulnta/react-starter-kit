/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const configureClient = () => new ApolloClient({
  reduxRootSelector: (state) => state.get('apollo'),
  networkInterface: createNetworkInterface({ uri: '/graphql' }),
});
