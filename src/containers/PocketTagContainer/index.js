import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchItems } from 'actions/pocket';
import styles from './styles.css';

export default class PocketTagContainer extends Component {
  static propTypes = {
    onTagSelected: PropTypes.func.isRequired
  };

  state = {
    value: ''
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onTagSelected(this.state.value);
  };

  render () {
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
              <button type="submit" className={styles.button}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onTagSelected: fetchItems,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(PocketTagContainer);
