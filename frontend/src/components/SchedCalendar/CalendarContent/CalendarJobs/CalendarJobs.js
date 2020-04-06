import React from 'react';
import dayjs from 'dayjs'; 
import styles from './CalendarJobs.module.css'

const calendarJobs = (props) => {
    const date = dayjs(props.date).format("DD-MMM");
    const job_in_day_arr = props.day_jobs;
  
   return(
       <div className={styles.Date}>
        <button onClick={() => props.clicked(dayjs(props.date).format("YYYY-MM-DD"))} className="border btn btn-primary btn-lg btn-block">{date}</button>
        <p>Booked Jobs: {job_in_day_arr.length}</p>
        <p>Availabilities: {4 - job_in_day_arr.length}</p>
       </div>
   );
}

export default calendarJobs;