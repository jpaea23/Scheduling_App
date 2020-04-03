import React from 'react';
import styles from './CalendarDays.module.css'

const calendarDays = (props) => (
    <div className={styles.Day}>
        <p>{props.day}</p>
    </div>
)

export default calendarDays;