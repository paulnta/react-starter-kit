/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
/* eslint-disable no-undef, no-unused-expressions*/
import { expect } from 'chai';
import SignatureAdapter from './SignatureAdapter';
import { COLORS, ERROR_VALUE } from '../constants';

describe('SignatureAdapter', () => {
  it('should reduce data', () => {
    const data = [
      { type: 'markers', index: 0, x: [1, 2, 3], y: [1, 2, 3] },
      { type: 'markers', index: 1, x: [1, 2, 3], y: [1, 2, 3] },
      { type: 'markers', index: 2, x: [1, 2, 3], y: [1, 2, 3] },
      { type: 'recentMarkers', index: 0, x: [1, 2, 3], y: [1, ERROR_VALUE, 3] },
      { type: 'lastMarker', index: 0, x: [1], y: [1] },
      {
        type: 'signature',
        index: 0,
        x: [-3.17, ERROR_VALUE, 4.56, 34],
        y: [25.54, ERROR_VALUE, 8.32, -23.87],
      },
      { type: 'divider', index: 0, x: [3], y: [4] },
    ];

    const nextData = SignatureAdapter.reduceData(data);
    expect(nextData).to.have.length(data.length);

    // check different colors for different data set
    expect(nextData[0]).to.have.deep.property('marker.color', COLORS[0]);
    expect(nextData[1]).to.have.deep.property('marker.color', COLORS[1]);
    expect(nextData[2]).to.have.deep.property('marker.color', COLORS[2]);

    // check error values become null
    expect(nextData[3]).to.have.deep.property('y[1]', null);

    for (const serie of nextData) {
      expect(serie).to.have.any.keys('mode', 'marker', 'line');
      expect(serie).to.contain.keys('x', 'y');
      expect(serie.x).to.not.contain(ERROR_VALUE);
      expect(serie.y).to.not.contain(ERROR_VALUE);
    }
  });

  it('should put default index if not present', () => {
    const data = [
      { type: 'markers', x: [1, 2, 3], y: [1, 2, 3] }, // no index
      { type: 'markers', index: 1, x: [1, 2, 3], y: [1, 2, 3] },
    ];

    const nextData = SignatureAdapter.reduceData(data);
    expect(nextData[0]).to.have.property('index', 0);
    expect(nextData[1]).to.have.property('index', 1);
  });
});
