import React, { PropTypes } from 'react';
import styles from './styles.css';
import openPopup from 'lib/openPopup';

export default function PocketConnectButton ({ request_token, redirect_uri, succeed }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => openPopup(`https://getpocket.com/auth/authorize?request_token=${request_token}&redirect_uri=${redirect_uri}`)}
      disabled={succeed === true}
    >
      <span className="icon-pocket" />
      {succeed ? 'Pocket is ready' : 'Connect Pocket'}
    </button>
  );
};

PocketConnectButton.propTypes = {
  request_token: PropTypes.string.isRequired,
  redirect_uri: PropTypes.string.isRequired,
  succeed: PropTypes.bool,
};
