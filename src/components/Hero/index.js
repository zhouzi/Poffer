import React from 'react';
import styles from './styles.css';

export default function Hero () {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Automated Twitter content strategy based on Pocket+Buffer.
        </h1>

        <div className={styles.subtitle}>
          Poffer
        </div>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente vero rem itaque quasi quo rerum quia enim similique tempora facilis. Magnam culpa, delectus voluptatum est magni officia soluta deserunt, necessitatibus.
        </p>
      </div>
    </div>
  );
};
