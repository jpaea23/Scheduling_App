import React from 'react';
import CalendarControl from './CalendarControl/CalendarControl';
import styles from './CalendarControls.module.css';
import PropTypes from 'prop-types';

const CalendarControls = (props) => {
  return (
    <div className={styles.Controls}>
      <CalendarControl name="Prev" clicked={props.click}/>
      <div className={styles.Date}>
        <div>{props.month} {props.year}</div>
      </div>
      <CalendarControl name="Next" clicked={props.click}/>
    </div>
  );
};

CalendarControls.propTypes= {
  year: PropTypes.string,
  month: PropTypes.string,
  click: PropTypes.func,
};

export default CalendarControls;
