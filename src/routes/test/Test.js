/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import React from 'react';
import Link from '../../components/Link';
import Greetings from '../../components/Greetings';

class Test extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Link to={'/'}>
          <Greetings />
        </Link>
      </div>
    );
  }
}

export default Test;

