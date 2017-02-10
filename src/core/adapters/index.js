/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */

import BarAdapter from './BarAdapter';
import CurveAdapter from './CurveAdapter';
import SignatureAdapter from './SignatureAdapter';

export { BarAdapter, CurveAdapter, SignatureAdapter };

export function adaptVisual(visual) {
  const {
    data,
    layout,
    meta: {
      type,
    },
  } = visual;

  switch (type) {
    case 'SIGNATURE':
      return {
        ...visual,
        ...SignatureAdapter.reduce(data, layout),
      };
    case 'BAR':
      return {
        ...visual,
        ...BarAdapter.reduce(data, layout, visual.meta['main-x-axis'].x),
      };
    case 'CURVE':
      return {
        ...visual,
        ...CurveAdapter.reduce(data, layout),
      };
    default:
      return visual;
  }
}

export function adaptReportPages(pages) {
  return pages ?
    pages.map(page => ({
      ...page,
      visuals: page.visuals ?
        page.visuals.map(visual => ({
          ...visual,
          ...adaptVisual(visual),
        }))
        : page.visuals,
    }))
    : pages;
}

export function adaptReport(report) {
  return report ?
  {
    ...report,
    pages: adaptReportPages(report.pages),
  }
    : report;
}
