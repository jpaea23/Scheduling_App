import React from 'react';
import styles from './Time.module.css';
import PropTypes from 'prop-types';

const Time = (props) => (
  <div className={styles.Time}>
    <p>{props.time}</p>
  </div>
);

Time.propTypes= {
  time: PropTypes.string,
};

export default Time;
