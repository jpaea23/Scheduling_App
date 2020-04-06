import React from 'react';
import styles from './CalendarDays.module.css';
import PropTypes from 'prop-types';

const CalendarDays = (props) => (
  <div className={styles.Day}>
    <p>{props.day}</p>
  </div>
);

CalendarDays.propTypes={
  day: PropTypes.string,
};

export default CalendarDays;
