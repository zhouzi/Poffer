import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchItems, updateRequestToken } from 'actions/pocket';
import styles from './styles.css';
import openPopup from 'lib/openPopup';
import classNames from 'classnames';

export default class PocketTagContainer extends Component {
  static propTypes = {
    onTagSelected: PropTypes.func.isRequired,
    onRequestToken: PropTypes.func.isRequired,
  };

  state = {
    value: ''
  };

  onMessage = (message) => {
    if (message.data == null) {
      return;
    }

    if (message.data.type === 'POCKET_REQUEST_TOKEN') {
      const requestToken = message.data.payload;
      this.props.onRequestToken(requestToken);
    }

    if (message.data.type === 'POCKET_AUTH') {
      this.props.onTagSelected(this.state.value);
    }
  };

  componentDidMount () {
    window.addEventListener('message', this.onMessage);
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.onMessage);
  }

  onSubmit = (event) => {
    event.preventDefault();
    openPopup('/api/pocket/authorize');
  };

  render () {
    const { isFetchingItems } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>
            <span className={classNames({
              [styles.titleStep]: true,
              [styles.titleStepActive]: true,
            })}>
              1
            </span>

            List your Pocket items
          </div>

          <p>
            What tag did you use to mark the items you want to share on Twitter?
          </p>

          <form className={styles.form} onSubmit={this.onSubmit}>
            <div className={styles.formInput}>
              <input
                type="text"
                placeholder="pocket tag"
                className={styles.input}
                onChange={(event) => this.setState({ value: event.target.value })}
                required
              />
            </div>

            <div className={styles.formButton}>
              <button
                type="submit"
                className={styles.button}
                disabled={isFetchingItems}
              >
                {isFetchingItems ? 'Loading...' : 'Get Pocket items'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ status }) {
  return {
    isFetchingItems: status.fetchItems === 'loading',
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onTagSelected: fetchItems,
    onRequestToken: updateRequestToken,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketTagContainer);
