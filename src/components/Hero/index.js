import React from 'react';
import styles from './styles.css';

export default function Hero () {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          A tool that makes it easier to share the content you like thanks to Pocket+Buffer
        </h1>

        <div className={styles.subtitle}>
          Poffer
        </div>

        <p className={styles.description}>
          Retrieve your <a href="https://getpocket.com">Pocket</a> links with a given tag, write several tweets per item and add them to your <a href="https://buffer.com">Buffer</a> queue.
          Poffer does the math to properly order the tweets so you don't share twice the same thing in a row.
        </p>

        <p className={styles.description}>
          Poffer is an <a href="https://github.com/Zhouzi/Poffer">open source</a> side project made with <span className="icon-code" /> by <a href="http://gabinaureche.com">Gabin</a>.
        </p>
      </div>
    </div>
  );
};
