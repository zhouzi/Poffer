import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

export default class TweetEditor extends Component {
  render () {
    return (
      <form>
        <div className={styles.contentBlock}>
          <textarea
            className={styles.contentInput}
            placeholder="Tweet content..."
          />

          <div className={styles.contentCounter}>
            144 characters left
          </div>
        </div>

        <div className={styles.imageBlock}>
          <input type="url" className={styles.imageInput} placeholder="Image's url" />
        </div>
      </form>
    );
  }
}

TweetEditor.propTypes = {
};
