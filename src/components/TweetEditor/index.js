import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import twitter from 'twitter-text';

const TWEET_MAX_LENGTH = 140;
const CHARACTERS_PER_MEDIA = 24;

export default class TweetEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  state = {
    content: '',
    image: '',
  };

  onChange = (value) => {
    this.setState(value, () => this.props.onChange(this.state));
  };

  getCharactersLeft = () => {
    const contentLength = twitter.getTweetLength(this.state.content);
    const imageLength = this.state.image ? CHARACTERS_PER_MEDIA : 0;
    const left = TWEET_MAX_LENGTH - contentLength - imageLength;

    if (left === 1 || left === -1) {
      return `${left} character left`;
    }

    return `${left} characters left`;
  };

  render () {
    return (
      <form>
        <textarea
          className={styles.contentInput}
          placeholder="Tweet content..."
          onChange={(event) => this.onChange({ content: event.target.value })}
        />

        <input
          type="url"
          className={styles.imageInput}
          placeholder="Image's url"
          onChange={(event) => this.onChange({ image: event.target.value })}
        />

        <div className={styles.contentCounter}>
          {this.getCharactersLeft()}
        </div>
      </form>
    );
  }
}

TweetEditor.propTypes = {
};
