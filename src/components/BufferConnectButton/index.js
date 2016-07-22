import React, { PropTypes } from 'react';
import styles from './styles.css';
import openPopup from 'lib/openPopup';

export default function BufferConnectButton ({ client_id, redirect_uri }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => openPopup(`https://bufferapp.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code`)}
    >
      Connect to Buffer
    </button>
  );
};

BufferConnectButton.propTypes = {
  client_id: PropTypes.string.isRequired,
  redirect_uri: PropTypes.string.isRequired
};
