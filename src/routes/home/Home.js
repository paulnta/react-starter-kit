/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FormattedRelative } from 'react-intl';
import s from './Home.css';

const NewsQuery = gql`
    query NewQuery {
        news {
            title
            link
            pubDate
            content
        }
    }
`;

@withStyles(s)
@graphql(NewsQuery)
class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      news: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        content: PropTypes.string,
      })),
      loading: PropTypes.bool,
    }),
  };

  render() {
    const { data } = this.props;
    const { news, loading } = data;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>React.js News 1</h1>
          <ul className={s.news}>
            {loading ? <div>Loading...</div> : news.map((item, index) => (
              <li key={index} className={s.newsItem}>
                <a href={item.link} className={s.newsTitle}>{item.title}</a>
                {' '}
                <span className={s.publishedDate}>
                  <FormattedRelative value={item.pubDate} />
                </span>
                <span
                  className={s.newsDesc}
                  dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home

