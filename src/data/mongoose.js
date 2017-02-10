/**
* react-webnerplan (https://enerplan.ch)
*
* Copyright © 2016-2017 Enerplan SA. All rights reserved.
*
* Unauthorized copying of this file, via any medium is strictly prohibited
* Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
*/

import mongoose from 'mongoose';
import { databaseUrl } from '../config';

const Promise = require('bluebird');

Promise.config({
  // Enables all warnings except forgotten return statements.
  warnings: {
    wForgottenReturn: false,
  },
});

mongoose.Promise = Promise;
mongoose.connect(databaseUrl);

export default mongoose;
