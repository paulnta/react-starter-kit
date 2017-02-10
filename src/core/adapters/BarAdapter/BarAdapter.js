/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
*/
import assign from 'assign-deep';
import moment from 'moment';
import { convertWeeksToStringDates } from '../utils';
import { COLORS, SYMBOLES, ERROR_VALUE } from '../constants';

class BarAdapter {
  static titlefont = {
    size: 14,
  }
  /**
   * Default Options for layout
   */
  static layout = (data) => {
    const xAxis = data[0].x;
    const range = [
      moment(xAxis[0]).subtract(7, 'days').valueOf(),
      moment(xAxis[57]).valueOf(),
    ];
    return {
      xaxis: {
        type: 'date',
        tickformat: '%-W',              // Monday as the first day of the week
        hoverformat: '%d-%m-%Y (%-W)',
        // tickformat: '%Y %b %d (%W)',              // Monday as the first day of the week
        dtick: 86400000.0 * 7 * 4,      // Step between ticks in milliseconds (7 days),
        ticks: 'outside',
        ticklen: 2,
        tick0: moment(xAxis[0]).valueOf(),
        range,
        titlefont: BarAdapter.titlefont,
      },
      yaxis: {
        rangemode: 'nonnegative',
        titlefont: BarAdapter.titlefont,
      },
      barmode: 'stack',
    };
  }

  /** 1
   * Options for layout with 2 axis
   * Will be merge with Bar.layout if needed
   */
  static layoutYAxis2 = (data) => ({ // eslint-disable-line no-unused-vars
    yaxis2: {
      side: 'right',
      overlaying: 'y',
      rangemode: 'nonnegative',
      titlefont: BarAdapter.titlefont,
    },
  })

  static types = {
    BAR: 0,
    SCATTER: 1,
  }

  static getConfig(type, index) {
    return BarAdapter.config[type](index);
  }

  static config = {

    // TYPE: BAR
    // stacked bar with different colors
    0(index) {
      return {
        type: 'bar',
        marker: { color: COLORS[index] },
      };
    },

    // TYPE: SCATTER,
    // marker with different symbols
    1(index) {
      return {
        type: 'scatter',
        mode: 'markers',
        marker: {
          color: 'gray',
          size: 7,
          symbol: SYMBOLES[index],
          line: {
            color: 'white',
            width: 1.5,
          },

          /* other options */
          // maxdisplayed: 100,    // maximum number of point to draw
        },
      };
    },
  }

  /**
   * Merge each data series with the corresponding config
   * and attach x values. x axis is common to every series
   *
   * @params: data array of data series containing y values
   *          and other infos about the type.
   * @params: weeks an array of week number which will be
   *          converted to an array of dates.
   */
  static reduceData(data, weeks) {
    const x = convertWeeksToStringDates(weeks);
    const index = [0, 0];

    return data.map(serie => {
      // define the type of the serie
      const type = (serie.type === 'scatter') || (serie.yaxis === 'y2')
          ? BarAdapter.types.SCATTER
          : BarAdapter.types.BAR;

      // convert ERROR_VALUE to null
      const y = serie.y.map(value => (
        value === ERROR_VALUE ? null : value
      ));

      const currentIndex = index[type];
      index[type] += 1;
      return { ...serie, x, y, ...this.getConfig(type, currentIndex) };
    });
  }

  static reduce(data, layout, weeks) {
    const nextData = BarAdapter.reduceData(data, weeks);
    const nextLayout = BarAdapter.reduceLayout(layout, nextData);
    return {
      data: nextData,
      layout: nextLayout,
    };
  }
  /**
   * Merge default signature layout with the layout
   * passed as parameter which may contain minimal info
   * like titles for x axis and y axis
   */
  static reduceLayout(layout, data) {
    // define the getCommon layout (single axis, or double axis)
    const baseLayout = layout.yaxis2
        ? { ...BarAdapter.layout(data), ...BarAdapter.layoutYAxis2(data) }
        : { ...BarAdapter.layout(data) };

    // deep merge layout
    // layout can override baseLayout
    return assign(baseLayout, layout);
  }
}

export default BarAdapter;
