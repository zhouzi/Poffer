import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

export default class TweetEditor extends Component {
  render () {
    return (
      <form>
        <textarea
          className={styles.contentInput}
          placeholder="Tweet content..."
        />

        <input
          type="url"
          className={styles.imageInput}
          placeholder="Image's url"
        />

        <div className={styles.contentCounter}>
          144 characters left
        </div>
      </form>
    );
  }
}

TweetEditor.propTypes = {
};
