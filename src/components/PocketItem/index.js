import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import times from 'lodash/times';
import TweetEditor from 'components/TweetEditor';
import map from 'lodash/map';

export default class PocketItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    tweetTimes: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    tweets: {}
  };

  onTweetChange = (index, value) => {
    this.setState({
      tweets: {
        ...this.state.tweets,
        [index]: value
      }
    }, () => this.props.onChange({
      [this.props.item.item_id]: this.state.tweets
    }));
  };

  getTweets = () => {
    return map(this.state.tweets, (tweet) => tweet);
  };

  render () {
    const { item, tweetTimes } = this.props;

    return (
      <div>
        <div className={styles.item}>
          {item.resolved_title}

          <a href={item.resolved_url} target="_blank" className={styles.itemOpenLink}>
            <span className="icon-external-link" />
          </a>
        </div>

        {times(tweetTimes, (index) => (
          <div key={index} className={styles.tweetEditor}>
            <TweetEditor
              key={index}
              onChange={(value) => this.onTweetChange(index, value)}
            />
          </div>
        ))}
      </div>
    );
  }
}
