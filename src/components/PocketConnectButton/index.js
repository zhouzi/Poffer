import React, { Component } from 'react';
import styles from './styles.css';
import openPopup from 'lib/openPopup';

export default class PocketConnectButton extends Component {
  state = {
    request_token: null,
    redirect_uri: null
  };

  componentDidMount () {
    window
      .fetch('/api/pocket/request', {
        method: 'GET'
      })
      .then((res) => res.json())
      .then(({ request_token, redirect_uri }) => {
        this.setState({
          request_token,
          redirect_uri
        });
      });
  }

  openPocketAuthenticationPopup () {
    const { request_token, redirect_uri } = this.state;
    openPopup(`https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`);
  }

  render () {
    const isLoading = this.state.request_token == null || this.state.redirect_uri == null;

    return (
      <button
        type="button"
        className={styles.button}
        disabled={isLoading}
        onClick={() => this.openPocketAuthenticationPopup()}
      >
        {isLoading ? 'Preparing Pocket...' : 'Connect to Pocket'}
      </button>
    );
  }
};
