/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */

import { Kind } from 'graphql/language';

const DateType = {
  __parseValue(value) {
    return new Date(value);
  },
  __serialize(value) {
    return value.getTime();
  },
  __parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
};

export default DateType;
