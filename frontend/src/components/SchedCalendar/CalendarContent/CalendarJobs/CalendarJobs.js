import React from 'react';
import dayjs from 'dayjs';
import styles from './CalendarJobs.module.css';
import PropTypes from 'prop-types';

const CalendarJobs = (props) => {
  const date = dayjs(props.date).format('DD-MMM');
  const jobInDayArr = props.dayJobs;

  return (
    <div className={styles.Date}>
      <button
        onClick={() => props.clicked(dayjs(props.date).format('YYYY-MM-DD'))}
        className="border btn btn-primary btn-lg btn-block">{date}
      </button>
      <p>Booked Jobs: {jobInDayArr.length}</p>
      <p>Availabilities: {4 - jobInDayArr.length}</p>
    </div>
  );
};

CalendarJobs.propTypes= {
  date: PropTypes.string,
  clicked: PropTypes.func,
  dayJobs: PropTypes.array,
};

export default CalendarJobs;
