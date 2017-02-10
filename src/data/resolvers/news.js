/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, September 2016
 */

import fetch from '../../core/fetch';

// React.js News Feed (RSS)
const url = 'https://api.rss2json.com/v1/api.json' +
            '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

function news() {
  if (lastFetchTask) {
    return lastFetchTask;
  }
  if ((new Date() - lastFetchTime) > 1000 * 60 * 10 /* 10 mins */) {
    lastFetchTime = new Date();
    lastFetchTask = fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'ok') {
            items = data.items;
          }

          return items;
        })
        .finally(() => {
          lastFetchTask = null;
        });

    if (items.length) {
      return items;
    }

    return lastFetchTask;
  }

  return items;
}

export default news;
