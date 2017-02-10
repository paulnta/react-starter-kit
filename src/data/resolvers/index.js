/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import Report from '../models/Report';
import { adaptVisual } from '../../core/adapters';
import ReportPage from '../models/ReportPage';
import JSON from './JSON';
import Date from './Date';
import news from './news';
import intl from './intl';

const ADAPT_VISUALS = true;

const Resolvers = {
  JSON,
  Date,
  Query: {
    news,
    intl,
    reports() {
      return Report.find({});
    },
    report(_, { reportKey }) {
      return Report.findOne({ key: reportKey });
    },
  },
  Report: {
    pages(report, { limit = null, offset }) {
      return ReportPage.find({ report: report.id })
        .sort('position')
        .skip(offset)
        .limit(limit);
    },
    page(report, { position }) {
      // TODO: find ReportPage by position
      return report.populate('pages').execPopulate()
        .then(doc => doc.pages[position]);
    },
    nbPages(report) {
      return ReportPage.count({ report: report.id });
    },
  },
  ReportPage: {
    visuals(reportPage) {
      return reportPage.populate('visuals').execPopulate()
        .then(doc => doc.visuals)

        // TODO: do not modify visual here
        .then(visuals => visuals.map((v, i) => {
          const visual = v.toObject();
          const adaptedVisual = ADAPT_VISUALS ? adaptVisual(visual) : {};
          return {
            ...visual,
            index: i,
            ...adaptedVisual,
          };
        }));
    },
    // TODO: get real data
    shape: () => ({ rows: 2, cols: 3 }),
  },

  // TODO: get real data
  Visual: {
    shape: () => ({ rows: 1, cols: 1 }),
    origin: (v) => ({ x: v.index % 3, y: v.index / 3 }),
  },
};

export default Resolvers;

