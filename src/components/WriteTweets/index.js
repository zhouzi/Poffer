import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import identity from 'lodash/identity';
import PocketItem from 'components/PocketItem';
import Range from 'components/Range';

export default class WriteTweets extends Component {
  static propTypes = {
    items: PropTypes.object,
    tweetTimes: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onTweetTimesChange: PropTypes.func.isRequired,
  };

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>
            Write Tweets
          </div>

          <p>
            How many times would you like to share the same content?

            <Range
              onChange={(value) => this.props.onTweetTimesChange(value)}
              value={this.props.tweetTimes}
              max={5}
            />
          </p>

          <ul className={styles.list}>
            {map(this.props.items, (item, id) => (
              <li key={id} className={styles.listItem}>
                <PocketItem
                  item={item}
                  tweetTimes={this.props.tweetTimes}
                  onChange={this.props.onChange}
                  onDelete={() => this.props.onDelete(item)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
