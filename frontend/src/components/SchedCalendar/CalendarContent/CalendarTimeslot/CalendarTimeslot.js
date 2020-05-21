import React from 'react';
import Time from './Time/Time';
import Slot from './Slot/Slot';
import styles from './CalendarTimeslot.module.css';
import {timeFormat} from '../../../UI/FormContent/Index';
import PropTypes from 'prop-types';

const CalendarTimeslot = (props) => (
  <div className={styles.Timeslot}>
    <Time time={timeFormat(props.time)}/>
    <Slot/>
  </div>
);

CalendarTimeslot.propTypes= {
  time: PropTypes.number,
};

export default CalendarTimeslot;
