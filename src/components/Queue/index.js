import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import reduce from 'lodash/reduce';
import values from 'lodash/values';
import times from 'lodash/times';
import openPopup from 'lib/openPopup';

export default class Queue extends Component {
  static propTypes = {
    tweets: PropTypes.object.isRequired,
    bufferClientId: PropTypes.string.isRequired,
    bufferRedirectUri: PropTypes.string.isRequired,
    onPublish: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = {
      queue: this.getOrderedList(props.tweets),
      twitterUsername: '',
    };
  }

  onMessage = (message) => {
    if (typeof message.data !== 'string') {
      return;
    }

    if (message.data.indexOf('poffer:buffer:auth') === 0) {
      const code = message.data.replace('poffer:buffer:auth:', '');
      this.props.onPublish(code, this.state.twitterUsername, this.state.queue);
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
      queue: this.getOrderedList(nextProps.tweets)
    });
  }

  getOrderedList = (tweets) => {
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
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>
            Review Queue
          </div>

          <p>
            That's the final order that's going to be sent to your Buffer queue.
          </p>

          {this.state.queue.map((tweet, index) => (
            <div key={index} className={styles.tweet}>
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
          ))}

          <form className={styles.form} onSubmit={this.onSubmit}>
            <div className={styles.formInput}>
              <input
                type="text"
                placeholder="Twitter username"
                className={styles.input}
                onChange={(event) => this.setState({ twitterUsername: event.target.value })}
              />
            </div>

            <div className={styles.formButton}>
              <button
                type="submit"
                className={styles.button}
              >
                Add to Buffer
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
