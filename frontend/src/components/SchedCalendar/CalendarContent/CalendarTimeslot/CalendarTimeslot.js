import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import styles from './CalendarTimeslot.module.css';
import PropTypes from 'prop-types';
import {timeFormat} from '../../../UI/FormContent/Index';

const CalendarTimeslot = (props) => (
  <Aux>
    <div className={styles.JobTimeSlot}>
      <p>{timeFormat(props.time)}</p>
    </div>
    <div className={styles.JobSched}>
    </div>
  </Aux>
);

CalendarTimeslot.propTypes= {
  time: PropTypes.number,
};

export default CalendarTimeslot;
