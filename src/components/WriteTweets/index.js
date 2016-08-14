import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import identity from 'lodash/identity';
import PocketItem from 'components/PocketItem';
import Range from 'components/Range';
import classNames from 'classnames';

export default class WriteTweets extends Component {
  static propTypes = {
    items: PropTypes.object,
    tweetTimes: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onTweetTimesChange: PropTypes.func.isRequired,
  };

  noItems () {
    const items = this.props.items || {};
    return Object.keys(items).length === 0;
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>
            <span className={classNames({
              [styles.titleStep]: true,
              [styles.titleStepActive]: !this.noItems(),
            })}>
              2
            </span>

            Write the tweets
          </div>

          <p>
            How many times would you like to tweet the same link?

            <Range
              onChange={(value) => this.props.onTweetTimesChange(value)}
              value={this.props.tweetTimes}
              max={5}
            />
          </p>

          {this.noItems() ? (
            <div className={styles.tipsContainer}>
              <div className={styles.tipsTitle}>
                There are no Pocket items to tweet about yet.
              </div>

              <ul className={styles.tipsList}>
                <li>Did you retrieve them?</li>
                <li>If so, did you look for the right tag?</li>
              </ul>
            </div>
          ) : (
            <div>
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
          )}
        </div>
      </div>
    );
  }
}
