import React, { PropTypes } from 'react';
import styles from './styles.css';
import openPopup from 'lib/openPopup';

export default function PocketConnectButton ({ request_token, redirect_uri }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => openPopup(`https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`)}
    >
      Connect to Pocket
    </button>
  );
};

PocketConnectButton.propTypes = {
  request_token: PropTypes.string.isRequired,
  redirect_uri: PropTypes.string.isRequired
};
