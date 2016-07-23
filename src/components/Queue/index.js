import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import reduce from 'lodash/reduce';

export default class Queue extends Component {
  static propTypes = {
    tweets: PropTypes.object.isRequired
  };

  getOrderedList = () => {
    const { tweets } = this.props;
    console.log(tweets);
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
            You can also add tweets that may not be related to your Pocket's saved items.
          </p>
        </div>
      </div>
    );
  }
}
