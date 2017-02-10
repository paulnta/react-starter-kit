/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import assign from 'assign-deep';
import { COLORS, SYMBOLES, ERROR_VALUE } from '../constants';

class Signature {

  static layout = (data) => {
    const values = [].concat([], ...data.map(({ y }) => y));
    const min = Math.min(...values);
    const max = Math.max(...values);
    let start = min <= 0 ? min - (min * 0.1) : 0;
    let end = max + (max * 0.1);
    start = Math.floor(start / 10) * 10;
    end = Math.ceil(end / 10) * 10;
    const range = [start, end];
    return {
      hovermode: 'closest',
      xaxis: {
        hoverformat: '.2r',
        rangemode: 'tozero',
      },
      yaxis: {
        hoverformat: '.2r',
        range,
      },
    };
  }

  static getConfig(type, index) {
    return Signature.config[type](index);
  }

  /**
   * Multiple SignatureAdapter Graphs can be drawn in a single plot and
   * each signature graphs have different type of data.
   *
   * This config object hold options to be merged with a serie with x,y values
   * based on the signature number and type of the serie.
   */
  static config = {
    markers(index) {
      return {
        mode: 'markers',
        legendgroup: `group${index}`,
        marker: {
          color: COLORS[index],
          symbol: SYMBOLES[index],
        },
      };
    },

    recentMarkers(index) {
      return {
        mode: 'markers',
        name: 'recentMarkers',
        legendgroup: `group${index}`,
        showlegend: false,
        marker: {
          color: 'white',
          symbol: SYMBOLES[index],
          line: {
            color: 'red',
            width: 1,
          },
        },
      };
    },

    lastMarker(index) {
      return {
        mode: 'markers',
        name: 'lastMarker',
        legendgroup: `group${index}`,
        showlegend: false,
        marker: {
          color: 'red',
          symbol: SYMBOLES[index],
        },
      };
    },

    signature(index) {
      return {
        mode: 'lines',
        name: 'signature',
        legendgroup: `group${index}`,
        showlegend: false,
        line: {
          color: COLORS[index],
          width: 1.3,
        },
        connectgaps: true,
      };
    },

    divider(index) {
      return {
        mode: 'lines',
        name: 'divider',
        legendgroup: `group${index}`,
        showlegend: false,
        line: {
          color: COLORS[index],
          dash: 'dashdot',
          width: 1.3,
        },
      };
    },
  }

  static reduce(data, layout) {
    const nextData = Signature.reduceData(data);
    const nextLayout = Signature.reduceLayout(layout, nextData);
    return {
      data: nextData,
      layout: nextLayout,
    };
  }

  static removeLastValues(x, y) {
    const nbToRemove = 6;
    const xValues = [...x];
    const yValues = [...y];
    if (xValues.length === yValues.length) {
      let nbRemoved = 0;
      for (let i = x.length - 1; i >= 0; i -= 1) {
        if (x[i] !== null && nbRemoved < nbToRemove) {
          xValues[i] = null;
          yValues[i] = null;
          nbRemoved += 1;
          if (nbRemoved === nbToRemove) {
            break;
          }
        }
      }
    }
    return { x: xValues, y: yValues };
  }

  /**
   * Adapt the data array adding options to be correctly
   * understood by Plotly.js
   *
   * @param: data array containing data series that should be drawn as curve
   * @returns: A new data object that can be understood by Plotly
   */
  static reduceData(data) {
    return data.map(serie => {
      let { x, y, index, ...others } = serie;
      index = index || 0;
      const config = Signature.getConfig(serie.type, index);
      x = x.map(value => (
        value === ERROR_VALUE ? null : value
      ));
      y = y.map(value => (
        value === ERROR_VALUE ? null : value
      ));
      if (serie.type === 'markers') {
        const { x: xFiltered, y: yFiltered } = Signature.removeLastValues(x, y);
        x = xFiltered;
        y = yFiltered;
      }

      return { ...others, index, ...config, x, y };
    });
  }

  /**
   * Merge default signature layout with the layout
   * passed as parameter which may contain minimal info
   * like titles for x axis and y axis
   */
  static reduceLayout(layout, data) {
    return assign(Signature.layout(data), layout);
  }

}

export default Signature;
