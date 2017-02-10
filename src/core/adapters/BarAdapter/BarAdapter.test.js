/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */

/* global define, it, describe */
/* eslint-disable no-undef, no-unused-expressions*/
import { expect } from 'chai';
import { convertWeeksToStringDates } from '../utils';
import BarAdapter from './BarAdapter';
import { adaptVisual } from '../index';
import { COLORS, SYMBOLES, ERROR_VALUE } from '../constants';

describe('BarAdapter', () => {
  it('should reduce data with type bar', () => {
    const weeks = [1, 2, 3];
    const data = [
      {
        y: [-2, ERROR_VALUE, 5.8],
        type: 'bar',
        name: 'serie 1',
      },
      {
        y: [-2, -32, 5.8],
        type: 'bar',
        name: 'serie 2',
      },
    ];

    const nextData = BarAdapter.reduceData(data, weeks);
    expect(nextData[0]).to.eql({
      y: [-2, null, 5.8],
      x: convertWeeksToStringDates(weeks),
      type: 'bar',
      marker: { color: COLORS[0] },
      name: 'serie 1',
    });

    expect(nextData[1]).to.have.deep.property('marker.color', COLORS[1]);
  });

  it('should reduce data with type markers', () => {
    const weeks = [1, 2, 3];
    const data = [
      {
        y: [-2, ERROR_VALUE, 5.8],
        type: 'scatter',
        name: 'serie 1',
      },
      {
        y: [-2, 4.5, 5.8],
        yaxis: 'y2',
        name: 'serie 2',
      },
    ];

    const nextData = BarAdapter.reduceData(data, weeks);

    // merged with the correct properties
    expect(nextData[0]).to.contain.keys('type', 'mode', 'marker');
    expect(nextData[1]).to.contain.keys('type', 'mode', 'marker');

    // different symboles
    expect(nextData[0]).to.have.deep.property('marker.symbol', SYMBOLES[0]);
    expect(nextData[1]).to.have.deep.property('marker.symbol', SYMBOLES[1]);
  });

  it('should handle different types', () => {
    const weeks = [1, 2, 3];
    const data = [
      {
        y: [-2, ERROR_VALUE, 5.8],
        type: 'bar',
        name: 'serie 1',
      },
      {
        y: [-2, ERROR_VALUE, 5.8],
        type: 'scatter',
        name: 'serie 1',
      },
      {
        y: [-2, 4.5, 5.8],
        yaxis: 'y2',
        name: 'serie 2',
      },
    ];

    const nextData = BarAdapter.reduceData(data, weeks);

    expect(nextData[0]).to.have.property('marker')
      .and.eql({ color: COLORS[0] });

    expect(nextData[0]).to.have.property('type', 'bar');
    expect(nextData[1]).to.have.property('type', 'scatter');
    expect(nextData[2]).to.have.property('type', 'scatter');

    expect(nextData[1]).to.have.deep.property('marker.symbol', SYMBOLES[0]);
    expect(nextData[2]).to.have.deep.property('marker.symbol', SYMBOLES[1]);
  });

  it('should reduce layout', () => {
    const layout = {
      xaxis: {
        title: 'xaxis title',
      },
      yaxis: {
        title: 'yaxis title',
      },
    };

    const nextLayout = BarAdapter.reduceLayout(layout);
    expect(nextLayout).to.contain.keys(Object.keys(BarAdapter.layout));
    expect(nextLayout).to.not.have.property('yaxis2');
    expect(nextLayout.xaxis).to.eql({ ...layout.xaxis, ...BarAdapter.layout.xaxis });
  });

  it('should reduce layout with yaxis2 and override default values', () => {
    const layout = {
      xaxis: {
        title: 'xaxis title',
      },
      yaxis: {
        title: 'yaxis title',
      },
      yaxis2: {
        title: 'yaxis 2',
        rangemode: 'overrided value',
      },
    };

    const nextLayout = BarAdapter.reduceLayout(layout);
    expect(nextLayout).to.contain.keys(
      Object.keys(BarAdapter.layout)
        .concat(Object.keys(BarAdapter.layoutYAxis2)));

    expect(nextLayout).to.have.deep.property('yaxis2.rangemode', 'overrided value');
  });

  it('should reduce a visual of type BAR', () => {
    const visual = {
      layout: {
        xaxis: {
          title: 'xaxis title',
        },
        yaxis: {
          title: 'yaxis title',
        },
      },
      meta: {
        type: 'BAR',
        weeks: [1, 2, 3],
      },
      data: [
        {
          y: [-2, ERROR_VALUE, 5.8],
          type: 'bar',
          name: 'serie 1',
        },
        {
          y: [-2, -32, 5.8],
          type: 'bar',
          name: 'serie 2',
        },
      ],
    };

    const adaptedVisual = adaptVisual(visual);
    adaptedVisual.should.have.property('layout');
    adaptedVisual.should.have.property('data');
    adaptedVisual.should.have.property('meta');

    const { layout } = adaptedVisual;
    layout.should.contain.keys(Object.keys(BarAdapter.layout));
    layout.should.not.have.property('yaxis2');
    layout.xaxis.should.eql({ ...visual.layout.xaxis, ...BarAdapter.layout.xaxis });

    const { data } = adaptedVisual;
    expect(data[0]).to.eql({
      y: [-2, null, 5.8],
      x: convertWeeksToStringDates(visual.meta.weeks),
      type: 'bar',
      marker: { color: COLORS[0] },
      name: 'serie 1',
    });

    expect(data[1]).to.have.deep.property('marker.color', COLORS[1]);
  });
});
