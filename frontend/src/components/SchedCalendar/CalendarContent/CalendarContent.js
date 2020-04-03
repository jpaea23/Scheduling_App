import React from 'react';
import CalendarDays from './CalendarDays/CalendarDays';
import CalendarJobs from './CalendarJobs/CalendarJobs';
import styles from './CalendarContent.module.css';
import CalendarSched from './CalendarSched/CalendarSched';
import CalendarTimeslot from './CalendarTimeslot/CalendarTimeslot';
import dayjs from 'dayjs';


const calendarContent = (props) => {
    //Days Of the week
    const days_of_week = props.days.map((day,i) =>{
       return <CalendarDays key={day} day={day} />
    });

   //7 Day Calendar Content
   const all_jobs  = Object.keys(props.jobs).map(job => {
       const arr_jobs = Object.keys(props.jobs[job]);
       return <CalendarJobs clicked={props.day_clicked} day_jobs={arr_jobs} key={job} date={job}/>
   });

   //Timeslot of single day
   const timeslot = [...Array(17+1).keys()].slice(7);

   const calendar_content = timeslot.map(time => {
       return <CalendarTimeslot key={time} time={time}/>
   })

   const all_timeslot = ['7','9','13','15'].map(time => {
       return <CalendarSched key={time} timeslot={time} found_jobs={props.jobs[props.dateSelect]} />
   })
   
    return(
        <div className={styles.Content}>
            <div className={styles.DaysOfWeek}>
                {days_of_week}
            </div>
            <div className={styles.DateOfWeek}>
                {all_jobs}
            </div>
            <div style={{margin: '50px'}}>
                <p className={styles.SelectDate}>{dayjs(props.dateSelect).format('DD-MMM').toUpperCase()}</p>
                <div className={styles.Container}>
                    {all_timeslot}
                    {calendar_content}
                </div>
            </div>
        </div>
    )
}

export default calendarContent