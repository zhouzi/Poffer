import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles.css';
import PocketConnectButton from 'components/PocketConnectButton';
import BufferConnectButton from 'components/BufferConnectButton';

export default function ConnectAccountsContainer ({ pocket, buffer }) {
  return (
    <div>
      Please connect your accounts in order to retrieve your Pocket items and add tweets to your Buffer queue.

      <ul className={styles.buttonList}>
        <li className={styles.buttonListItem}>
          <PocketConnectButton
            request_token={pocket.request_token}
            redirect_uri={pocket.redirect_uri}
          />
        </li>

        <li className={styles.buttonListItem}>
          <BufferConnectButton />
        </li>
      </ul>
    </div>
  );
}

function mapStateToProps ({ accounts }) {
  return { pocket: accounts.pocket, buffer: accounts.buffer };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectAccountsContainer);
