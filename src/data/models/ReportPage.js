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

const ReportPageSchema = new Schema({
  position: { type: Number, required: true, index: true },
  key: { type: String, required: true },
  report: { type: Schema.Types.ObjectId, ref: 'Report', required: true },
});

// relationship with his pages
// avoid storing and managing an array of pages
ReportPageSchema.virtual('visuals', {
  ref: 'Visual',
  localField: '_id',
  foreignField: 'page',
});

ReportPageSchema.set('toObject', { virtuals: true });
ReportPageSchema.set('toJSON', { virtuals: true });

export default mongoose.model('ReportPage', ReportPageSchema);
