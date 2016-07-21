import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

export default function Breadcrumb ({ items, activeItem }) {
  return (
    <ul className={styles.container}>
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames({
            [styles.item]: true,
            [styles.itemActive]: index === activeItem
          })}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
