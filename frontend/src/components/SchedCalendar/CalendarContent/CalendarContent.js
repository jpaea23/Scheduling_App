import React from 'react';
import CalendarDays from './CalendarDays/CalendarDays';
import CalendarJobs from './CalendarJobs/CalendarJobs';
import styles from './CalendarContent.module.css';
import CalendarSched from './CalendarSched/CalendarSched';
import CalendarTimeslot from './CalendarTimeslot/CalendarTimeslot';
import dayjs from 'dayjs';
import * as TimeConst from '../../../config/TimeSlotConst';

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

   //Timeslot of single day - 17 = number of timeslots in a single day 1 - 17
   //slice(7) is excluding numbers 1 - 7 in the Array
   //timeslot = [7,8,9,10,11,12,13,14,15,16,17] : Workday 7am to 5pm
   const timeslot = [...Array(17+1).keys()].slice(7);

   const calendar_content = timeslot.map(time => {
       return <CalendarTimeslot key={time} time={time}/>
   })

   let all_timeslot = null;
   if(props.jobs[props.dateSelect] !== undefined){
    for (let job in props.jobs[props.dateSelect]){
        const duration = TimeConst.DEFAULT_DURATION;
        const index = timeslot.indexOf(parseInt(job));

        //replace index of array timeslot - duration will determine how many index's will need to be replaces
        timeslot[index] = {[job]:props.jobs[props.dateSelect][job]};
        if(duration > 1){
            timeslot.splice(index + 1, duration - 1);
        }
    };

    all_timeslot = timeslot.map((time,i) => {
        return <CalendarSched key={time + i} timeslot={time}/>
    })    
   };
   
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