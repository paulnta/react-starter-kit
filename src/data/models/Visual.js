/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
*/

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VisualSchema = new Schema({
  data: [Schema.Types.Mixed],
  layout: Schema.Types.Mixed,
  meta: Schema.Types.Mixed,
  preview: String,
  key: String,
  page: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model('Visual', VisualSchema);

