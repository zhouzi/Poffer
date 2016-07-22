import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles.css';
import PocketConnectButton from 'components/PocketConnectButton';
import BufferConnectButton from 'components/BufferConnectButton';
import { authSuccess as pocketAuthSuccess } from 'actions/pocket';
import { authSuccess as bufferAuthSuccess } from 'actions/buffer';

export default class ConnectAccountsContainer extends Component {
  onMessage = (message) => {
    if (typeof message.data !== 'string') {
      return;
    }

    if (message.data === 'poffer:pocket:auth') {
      this.props.onPocketAuth();
    }

    if (message.data.indexOf('poffer:buffer:auth') === 0) {
      const code = message.data.replace('poffer:buffer:auth:', '');
      this.props.onBufferAuth(code);
    }
  };

  componentDidMount () {
    window.addEventListener('message', this.onMessage);
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.onMessage);
  }

  render () {
    const { pocket, buffer } = this.props;

    return (
      <div>
        Please connect your accounts in order to retrieve your Pocket items and add tweets to your Buffer queue.

        <ul className={styles.buttonList}>
          <li className={styles.buttonListItem}>
            {pocket.succeed ? (
              <div>Pocket Connected!</div>
            ) : (
              <PocketConnectButton
                request_token={pocket.request_token}
                redirect_uri={pocket.redirect_uri}
              />
            )}
          </li>

          <li className={styles.buttonListItem}>
            {buffer.succeed ? (
              <div>Buffer Connected!</div>
            ) : (
              <BufferConnectButton
                client_id={buffer.client_id}
                redirect_uri={buffer.redirect_uri}
              />
            )}
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ accounts }) {
  return {
    pocket: accounts.pocket,
    buffer: accounts.buffer
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onPocketAuth: pocketAuthSuccess,
    onBufferAuth: bufferAuthSuccess
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectAccountsContainer);
