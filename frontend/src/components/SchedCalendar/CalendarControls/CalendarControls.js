import React from 'react';
import CalendarControl from './CalendarControl/CalendarControl';
import styles from './CalendarControls.module.css';


const calendarControls = (props) => (
    <div className={styles.Controls}>
        <CalendarControl name="Prev" clicked={props.click}/>
        <div className={styles.Date}>
            <div>{props.month} {props.year}</div>
        </div>
        <CalendarControl name="Next" clicked={props.click}/>
    </div>
);

export default calendarControls;
