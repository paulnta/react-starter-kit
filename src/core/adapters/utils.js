/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */

/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';

export function convertWeeksToStringDates(weeks, year = 2015, dayOfWeek = 3) {
  const start = weeks[0];
  const n = weeks.length;
  let yearsOffset = 0;
  let lastWeek = null;
  return _.range(start, start + n).map(week => {
    if (lastWeek && week < lastWeek) {
      yearsOffset += 1;
    }
    lastWeek = week;

    const value = moment()
      .year(year + yearsOffset)
      .isoWeek(week)
      .isoWeekday(dayOfWeek)
      .format('YYYY-MM-DD');

    // if (week === 53) {
    //   console.log(`week: ${week} year: ${year + yearsOffset} value: ${value}`)
    // }

    return value;
  });
}
