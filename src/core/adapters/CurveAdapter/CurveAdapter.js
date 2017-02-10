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
import { COLORS } from '../constants';

class CurveAdapter {

  /**
   * Default Options for layout
   */
  static layout = (data) => ({ // eslint-disable-line no-unused-vars
    xaxis: {
      type: 'date',
      tickformat: '%a %d/%m/%y %H:%M',    // Monday as the first day of the week
      // dtick: 86400000.0 * 2,                 // Step between ticks in milliseconds (7 days),
      nticks: 3,
      ticks: 'outside',
    },
    yaxis: {
      rangemode: 'tozero',
    },
    barmode: 'stack',
  })

  static dateFormat = 'YYYY-MM-DD HH:mm:ss'

  /**
   * Options for layout with 2 axis
   * Will be merge with Bar.layout if needed
   */
  static layoutYAxis2 = (data) => ({ // eslint-disable-line no-unused-vars
    yaxis2: {
      side: 'right',
      overlaying: 'y',
      rangemode: 'nonnegative',
    },
  })

  static getConfig(index) {
    return {
      type: 'scatter',
      mode: 'lines',
      marker: {
        color: COLORS[index],
        // maxdisplayed: 20,
      },
    };
  }

  static reduce(data, layout) {
    const nextData = CurveAdapter.reduceData(data);
    const nextLayout = CurveAdapter.reduceLayout(layout, data);
    return {
      data: nextData,
      layout: nextLayout,
    };
  }

  /**
   * Merge each data series with the corresponding config
   * and attach x values. x axis is common to every series
   *
   * @params: data array of data series containing y values
   *          and other infos about the type.
   */
  static reduceData(data) {
    return data.map((serie, index) => {
      const x = serie.x.map(value => moment(value).format(CurveAdapter.dateFormat));
      return { ...serie, x, ...CurveAdapter.getConfig(index) };
    });
  }

  /**
   * Merge default signature layout with the layout
   * passed as parameter which may contain minimal info
   * like titles for x axis and y axis
   */
  static reduceLayout(layout, data) {
    // define the getCommon layout (single axis, or double axis)
    const baseLayout = layout.yaxis2
        ? { ...CurveAdapter.layout(data), ...CurveAdapter.layoutYAxis2(data) }
        : { ...CurveAdapter.layout(data) };

    // deep merge layout
    // layout can override baseLayout
    return assign(baseLayout, layout);
  }
}

export default CurveAdapter;

