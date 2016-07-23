import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import reduce from 'lodash/reduce';
import values from 'lodash/values';
import times from 'lodash/times';

export default class Queue extends Component {
  static propTypes = {
    tweets: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      queue: this.getOrderedList(props.tweets)
    };
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

          <button type="button" className={styles.button}>
            Add to Buffer
          </button>
        </div>
      </div>
    );
  }
}
