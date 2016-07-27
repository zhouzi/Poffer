import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchItems } from 'actions/pocket';
import styles from './styles.css';
import openPopup from 'lib/openPopup';

export default class PocketTagContainer extends Component {
  static propTypes = {
    onTagSelected: PropTypes.func.isRequired,
    pocketRequestToken: PropTypes.string.isRequired,
    pocketRedirectUri: PropTypes.string.isRequired,
  };

  state = {
    value: ''
  };

  onMessage = (message) => {
    if (message.data === 'poffer:pocket:auth') {
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

    const { pocketRequestToken, pocketRedirectUri } = this.props;
    openPopup(`https://getpocket.com/auth/authorize?request_token=${pocketRequestToken}&redirect_uri=${pocketRedirectUri}`);
  };

  render () {
    const { isFetchingItems } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>
            Pocket Tag
          </div>

          <p>
            What tag should be looked for?
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
                {isFetchingItems ? 'Loading...' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ accounts, status }) {
  return {
    pocketRequestToken: accounts.pocket.request_token,
    pocketRedirectUri: accounts.pocket.redirect_uri,
    isFetchingItems: status.fetchItems === 'loading',
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onTagSelected: fetchItems,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketTagContainer);
