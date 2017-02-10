/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, September 2016
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const ReportTypes = ['PROTOCOLE-HEBDO', 'CUSTOM'];

const ReportSchema = new Schema({
  key: { type: String, required: true, unique: true },
  type: { type: String, enum: ReportTypes, required: true },
  date: { type: Date, required: true, default: Date.now },
});

// relationship with his pages
// avoid storing and managing an array of pages
ReportSchema.virtual('pages', {
  ref: 'ReportPage',
  localField: '_id',
  foreignField: 'report',
});

ReportSchema.set('toObject', { virtuals: true });
ReportSchema.set('toJSON', { virtuals: true });

const Report = mongoose.model('Report', ReportSchema);
export default Report;
