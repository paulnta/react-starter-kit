/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, September 2016
 */

import fs from 'fs';
import { join } from 'path';
import Promise from 'bluebird';
import { locales } from '../../config';

// A folder with messages
const CONTENT_DIR = join(__dirname, './messages');

const readFile = Promise.promisify(fs.readFile);

async function intl({ request }, { locale }) {
  if (!locales.includes(locale)) {
    throw new Error(`Locale '${locale}' not supported`);
  }

  let localeData;
  try {
    localeData = await readFile(join(CONTENT_DIR, `${locale}.json`));
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`Locale '${locale}' not found`);
    }
  }

  return JSON.parse(localeData);
}

export default intl;
