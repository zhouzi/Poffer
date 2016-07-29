import React, { PropTypes } from 'react';
import styles from './styles.css';

export default function Range ({ onChange, value, min, max }) {
  function decrease () {
    if (value > min) {
      onChange(value - 1);
    }
  }

  function increase () {
    if (value < max) {
      onChange(value + 1);
    }
  }

  return (
    <span className={styles.container}>
      <button
        type="text"
        onClick={decrease}
        className={styles.buttonDecrease}
      >
        <span className="icon-minus" />
      </button>

      <span className={styles.value}>
        {value}
      </span>

      <button
        type="text"
        onClick={increase}
        className={styles.buttonIncrease}
      >
        <span className="icon-plus" />
      </button>
    </span>
  );
}

Range.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

Range.defaultProps = {
  min: 1,
  max: Infinity
};
