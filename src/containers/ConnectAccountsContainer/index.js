import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles.css';
import PocketConnectButton from 'components/PocketConnectButton';
import BufferConnectButton from 'components/BufferConnectButton';
import { authSuccess as pocketAuthSuccess } from 'actions/pocket';
import { authSuccess as bufferAuthSuccess } from 'actions/buffer';

export default class ConnectAccountsContainer extends Component {
  static propTypes = {
    pocket: PropTypes.object.isRequired,
    buffer: PropTypes.object.isRequired,
    onPocketAuth: PropTypes.func.isRequired,
    onBufferAuth: PropTypes.func.isRequired,
  };

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
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>
            Connect your accounts
          </div>

          <p>
            In order to access your Pocket items and Buffer queue, you need to first connect those accounts.
          </p>

          <ul className={styles.buttonList}>
            <li className={styles.buttonListItem}>
              <PocketConnectButton
                succeed={pocket.succeed}
                request_token={pocket.request_token}
                redirect_uri={pocket.redirect_uri}
              />
            </li>

            <li className={styles.buttonListItem}>
              <BufferConnectButton
                succeed={buffer.succeed}
                client_id={buffer.client_id}
                redirect_uri={buffer.redirect_uri}
              />
            </li>
          </ul>
        </div>
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
