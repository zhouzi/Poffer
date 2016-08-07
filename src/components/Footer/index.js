import React from 'react';
import styles from './styles.css';

export default function Footer () {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        Poffer is an <a href="https://github.com/Zhouzi/Poffer">open source</a> side project made with <span className="icon-code" title="code, obviously" /> by <a href="http://gabinaureche.com">Gabin</a>.
      </div>
    </div>
  );
}
