/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import RaisedButton from 'material-ui/RaisedButton'
import { defineMessages, FormattedMessage } from 'react-intl'
import s from './Greetings.css'

const messages = defineMessages({
  greetings: {
    id: 'Greetings.greetings',
    defaultMessage: 'Bienvenue',
    description: 'Greetings message',
  },
})

@withStyles(s)
class Greetings extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={s.root}>
        <RaisedButton
          primary
          label={<FormattedMessage {...messages.greetings} />}
        />
      </div>
    )
  }
}

export default Greetings
