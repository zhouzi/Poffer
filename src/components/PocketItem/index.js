import React, { PropTypes } from 'react';
import styles from './styles.css';
import times from 'lodash/times';
import TweetEditor from 'components/TweetEditor';

export default function PocketItem ({ item, tweetTimes }) {
  return (
    <div>
      <div className={styles.item}>
        {item.resolved_title}

        <a href={item.resolved_url} target="_blank" className={styles.itemOpenLink}>
          <span className="icon-external-link" />
        </a>
      </div>

      {times(tweetTimes, (index) => (
        <div key={index} className={styles.tweetEditor}>
          <TweetEditor key={index} />
        </div>
      ))}
    </div>
  );
}

PocketItem.propTypes = {
  item: PropTypes.object.isRequired,
  tweetTimes: PropTypes.number.isRequired,
};
