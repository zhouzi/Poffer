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
          Poffer connects to your <a href="https://getpocket.com">Pocket</a> account in order to retrieve the content you want to share.
          It lets you write a few tweets about them to then add it to your <a href="https://buffer.com">Buffer</a> queue.
        </p>

        <p className={styles.description}>
          Read about how it could help you share more: "<a href="https://wizbii.tech/i-am-a-terrible-twitter-user-so-i-built-a-tool-to-help-me-out-b757c32c69b5?utm_source=poffer&utm_medium=hero&utm_campaign=open%20source">I am a terrible Twitter user so I built a tool to help me out</a>".
        </p>
      </div>
    </div>
  );
};
