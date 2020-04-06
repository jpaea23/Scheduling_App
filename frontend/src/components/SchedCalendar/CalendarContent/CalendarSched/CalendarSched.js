import React, {useEffect} from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import * as TimeConst from '../../../../config/TimeSlotConst';
import styles from './CalendarSched.module.css';
import PropTypes from 'prop-types';

const CalendarSched = (props) => {
  useEffect(() => {
    console.log('Use Effect [CalendarSched.js]');
  }, []);

  let disabled = false;
  const boxRender = {};
  let condClass = '';

  let startPos;
  let endPos;

  let clientName = '';
  let clientNumber = '';
  let jobAddress = '';
  let jobDescription = '';

  if (typeof props.timeslot === 'object') {
    disabled = true;
    const key = Object.keys(props.timeslot);
    startPos = (parseInt(key) - 7) * TimeConst.JOB_HEIGHT;
    // TODO: Object duration value
    endPos = startPos + (TimeConst.DEFAULT_DURATION * TimeConst.JOB_HEIGHT);
    boxRender.height = endPos - startPos;
    boxRender.top = startPos;
    condClass = styles.Filled;

    const job = props.timeslot[key];
    const client = job['client'];
    clientName = 'Name: ' + client['name'];
    clientNumber = 'Phone: ' + client['phone'];
    jobAddress = 'Address: ' + job['address'];
    jobDescription = 'Description: ' + job['description'];
  } else if (props.timeslot === 11 || props.timeslot === 17) {
    boxRender.display = 'none';
  } else {
    startPos = (props.timeslot - 7) * TimeConst.JOB_HEIGHT;
    endPos = startPos + (1 * TimeConst.JOB_HEIGHT);
    boxRender.height = endPos - startPos;
    boxRender.top = startPos;
    condClass = styles.Open;
  }

  return (
    <Aux>
      <button className={[styles.Timeslot, condClass].join(' ')}
        disabled={disabled}
        style={boxRender}>
        <div className={!disabled ? styles.Animation : styles.NoAnimation}>
          <p>Make Booking</p>
        </div>
        <ul>
          <li>
            {clientName}
          </li>
          <li>
            {clientNumber}
          </li>
          <li>
            {jobAddress}
          </li>
          <li>
            {jobDescription}
          </li>
        </ul>
      </button>
    </Aux>
  );
};

CalendarSched.propTypes= {
  timeslot: PropTypes.object,
};

export default CalendarSched;
