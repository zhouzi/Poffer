import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import map from 'lodash/map';
import PocketItem from 'components/PocketItem';

export default class WriteTweetsContainer extends Component {
  static propTypes = {
    items: PropTypes.object,
    tweetTimes: PropTypes.number.isRequired,
  };

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>
            Write Tweets
          </div>

          <p>
            How many times would you like to share the same content?
          </p>

          <ul className={styles.list}>
            {map(this.props.items, (item, id) => (
              <li key={id} className={styles.listItem}>
                <PocketItem
                  item={item}
                  tweetTimes={this.props.tweetTimes}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ items, tweetTimes }) {
  return { items, tweetTimes };
}

export default connect(mapStateToProps, null)(WriteTweetsContainer);
