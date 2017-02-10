/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  greetings: {
    id: 'Greetings.greetings',
    defaultMessage: 'Bienvenue',
    description: 'Greetings message',
  },
});

function Greetings() {
  return (
    <RaisedButton label={<FormattedMessage {...messages.greetings} />} />
  );
}

Greetings.propTypes = {};

export default Greetings;
