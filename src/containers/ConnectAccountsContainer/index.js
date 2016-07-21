import React from 'react';
import styles from './styles.css';
import PocketConnectButton from 'components/PocketConnectButton';
import BufferConnectButton from 'components/BufferConnectButton';

export default function ConnectAccountsContainer () {
  return (
    <div>
      Please connect your accounts in order to retrieve your Pocket items and add tweets to your Buffer queue.

      <ul className={styles.buttonList}>
        <li className={styles.buttonListItem}>
          <PocketConnectButton />
        </li>

        <li className={styles.buttonListItem}>
          <BufferConnectButton />
        </li>
      </ul>
    </div>
  );
}
