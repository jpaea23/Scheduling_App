import React from 'react';
import CalendarControl from './CalendarControl/CalendarControl';
import styles from './CalendarControls.module.css';


const calendarControls = (props) => (
    <div className={styles.Controls}>
        <CalendarControl name="Prev" clicked={props.click}/>
        <h4 className="text-center">{props.month} {props.year}</h4>
        <CalendarControl name="Next" clicked={props.click}/>
    </div>
);

export default calendarControls;
