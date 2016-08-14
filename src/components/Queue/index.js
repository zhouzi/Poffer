import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import reduce from 'lodash/reduce';
import values from 'lodash/values';
import times from 'lodash/times';
import openPopup from 'lib/openPopup';
import mapKeys from 'lodash/mapKeys';
import TweetEditor from 'components/TweetEditor';
import assign from 'lodash/assign';
import pickBy from 'lodash/pickBy';
import omit from 'lodash/omit';
import identity from 'lodash/identity';
import classNames from 'classnames';

export default class Queue extends Component {
  static propTypes = {
    tweets: PropTypes.object.isRequired,
    bufferClientId: PropTypes.string.isRequired,
    bufferRedirectUri: PropTypes.string.isRequired,
    onPublish: PropTypes.func.isRequired,
    isAddingToBuffer: PropTypes.bool.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = {
      queue: this.getOrderedList(props.tweets),
      twitterUsername: '',
      customTweets: {},
    };
  }

  onMessage = (message) => {
    if (typeof message.data !== 'string') {
      return;
    }

    if (message.data.indexOf('poffer:buffer:auth') === 0) {
      const code = message.data.replace('poffer:buffer:auth:', '');

      const queue = this.state.queue
        // remove empty tweets
        .filter((tweet) => tweet.content)

        // remove state-specific props
        .map((tweet) => omit(tweet, ['$isCustom']))

        // strip empty props such as { image: '' }
        .map((tweet) => pickBy(tweet, identity));

      this.props.onPublish(code, this.state.twitterUsername, queue);
    }
  };

  componentDidMount () {
    window.addEventListener('message', this.onMessage);
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.onMessage);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      queue: this.getOrderedList(nextProps.tweets, this.state.customTweets)
    });
  }

  addCustomTweetAt = (index) => {
    // when adding a new tweet at a given index
    // we need to update all indexes
    // for example, adding a tweet at index 2 means
    // the previous index 2 becomes index 3
    // but anything that's before 2 doesn't change
    const customTweets = mapKeys(this.state.customTweets, (tweet, tweetIndex) => {
      tweetIndex = Number(tweetIndex);

      if (tweetIndex < index) {
        return tweetIndex;
      }

      return tweetIndex + 1
    });

    // now that all index are updated
    // we know the given index is free
    customTweets[index] = {
      $isCustom: true,
      content: '',
      image: '',
    };

    const queue = this.getOrderedList(this.props.tweets, customTweets);

    this.setState({
      customTweets,
      queue,
    });
  };

  getOrderedList = (tweets, customTweets = {}) => {
    const orderedTweets = this.getOrderedTweets(tweets);

    // add back the custom tweets to the ordered queue
    Object.keys(customTweets).sort().forEach((index) => {
      index = Number(index);

      const customTweet = customTweets[index];

      // if the queue is long enough to insert
      // the custom tweet in between then do it
      if (orderedTweets.length > index) {
        orderedTweets.splice(index + 1, 0, customTweet);
        return;
      }

      // but otherwise just add it at the end
      orderedTweets.push(customTweet);
    });

    return orderedTweets;
  };

  getOrderedTweets = (tweets) => {
    // turns a complex map into an array of arrays, e.g:
    // {
    //   abc: {
    //     0: {...},
    //     1: {...}
    //   },
    //   def: {
    //     0: {...}
    //   }
    // }
    //
    // becomes:
    //
    // [
    //   [
    //     {...},
    //     {...}
    //   ],
    //   [
    //     {...}
    //   ]
    // ]
    const lists = reduce(tweets, (result, items) => {
      result.push(values(items));
      return result;
    }, []);

    // get the total number of tweets created
    const total = reduce(lists, (result, list) => result + list.length, 0);

    let sorted = [];
    let currentListIndex = 0;

    const nextListIndex = () => {
      if (currentListIndex + 1 < lists.length) {
        currentListIndex++;
      } else {
        currentListIndex = 0;
      }
    };

    // we know that we have `total` tweets so that's the number of
    // times we want to look for an one
    times(total, () => {
      // we may have lists with different lengths
      // that's why for each iteration we need to
      // find which list still has an item to be added
      (function findItem () {
        const currentList = lists[currentListIndex];

        if (currentList.length) {
          // this list still have some items so pull it out
          sorted = sorted.concat(currentList.splice(0, 1));
          return;
        }

        // oops, the list is empty so we'll
        // need to look in the next one
        nextListIndex();
        findItem();
      })();

      nextListIndex();
    });

    return sorted;
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { bufferClientId, bufferRedirectUri } = this.props;
    openPopup(`https://bufferapp.com/oauth2/authorize?client_id=${bufferClientId}&redirect_uri=${encodeURIComponent(bufferRedirectUri)}&response_type=code`)
  };

  render () {
    const { isAddingToBuffer } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>
            <span className={classNames({
              [styles.titleStep]: true,
              [styles.titleStepActive]: this.state.queue.length > 0,
            })}>
              3
            </span>

            Review queue
          </div>

          <p>
            Your tweets are going to be added to Buffer in that order.
            Note: you can also add some custom tweets in there, just click the "add tweet" button.
          </p>

          {this.state.queue.length === 0 ? (
            <div className={styles.tipsContainer}>
              <div className={styles.tipsTitle}>
                The current queue is empty.
              </div>

              <ul className={styles.tipsList}>
                <li>Did you write any tweets about a Pocket item?</li>
              </ul>
            </div>
          ) : (
            <div>
              {this.state.queue.map((tweet, index) => (
                <div key={index} className={styles.queueItem}>
                  <div className={styles.addTweetBlock}>
                    <button
                      type="button"
                      onClick={() => this.addCustomTweetAt(index - 1)}
                      className={styles.addTweetButton}
                    >
                      <span className="icon-plus" />
                      Add Tweet
                    </button>
                  </div>

                  {tweet.$isCustom ? (
                    <TweetEditor onChange={(value) => assign(tweet, value)} />
                  ) : (
                    <div className={styles.tweet}>
                      <div className={styles.tweetContent}>
                        {tweet.content}
                      </div>

                      {tweet.image ? (
                        <div
                          className={styles.tweetImage}
                          style={{ backgroundImage: `url('${tweet.image}')` }}
                        ></div>
                      ) : null}
                    </div>
                  )}
                </div>
              ))}

              <div className={styles.queueItem}>
                <div className={styles.addTweetBlock}>
                  <button
                    type="button"
                    onClick={() => this.addCustomTweetAt(this.state.queue.length)}
                    className={styles.addTweetButton}
                  >
                    <span className="icon-plus" />
                    Add Tweet
                  </button>
                </div>
              </div>

              <form className={styles.form} onSubmit={this.onSubmit}>
                <div className={styles.formInput}>
                  <input
                    type="text"
                    placeholder="Twitter username"
                    className={styles.input}
                    onChange={(event) => this.setState({ twitterUsername: event.target.value })}
                    required
                  />
                  <small>Adding the tweets to your Buffer queue may take a while so don't worry :)</small>
                </div>

                <div className={styles.formButton}>
                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isAddingToBuffer}
                  >
                    {isAddingToBuffer ? 'Loading...' : 'Add to Buffer'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
