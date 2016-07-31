import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import times from 'lodash/times';
import TweetEditor from 'components/TweetEditor';
import pickBy from 'lodash/pickBy';

export default class PocketItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    tweetTimes: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    tweets: {}
  };

  onTweetChange = (index, value) => {
    this.setState({
      tweets: {
        ...this.state.tweets,
        [index]: {
          ...value,
          pocketId: this.props.item.item_id
        }
      }
    }, () => {
      const tweets = pickBy(this.state.tweets, (tweet, index) => {
        // drop anything that's above the maximum
        // number of tweets to create
        if (Number(index) >= this.props.tweetTimes) {
          return false;
        }

        return tweet.content;
      });

      this.props.onChange({
        [this.props.item.item_id]: tweets
      })
    });
  };

  onDelete = () => {
    if (confirm('Are you sure you want to ignore this item? You won\'t find it anymore on Poffer.')) {
      this.props.onDelete();
    }
  };

  render () {
    const { item, tweetTimes } = this.props;

    return (
      <div>
        <div className={styles.item}>
          {item.resolved_title}

          <ul className={styles.actions}>
            <li className={styles.actionsItem}>
              <a
                href={item.resolved_url}
                target="_blank"
                className={styles.action}
              >
                <span className="icon-external-link" />
              </a>
            </li>

            <li className={styles.actionsItem}>
              <button
                type="button"
                className={styles.action}
                onClick={this.onDelete}
              >
                <span className="icon-cross" />
              </button>
            </li>
          </ul>
        </div>

        {times(tweetTimes, (index) => (
          <div key={index} className={styles.tweetEditor}>
            <TweetEditor
              key={index}
              onChange={(value) => this.onTweetChange(index, value)}
              defaultValue={item.resolved_url}
            />
          </div>
        ))}
      </div>
    );
  }
}
