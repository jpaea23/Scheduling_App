import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import styles from './CalendarTimeslot.module.css'

const calendarTimeslot = (props) => (
    <Aux>
        <div className={styles.JobTimeSlot}>
            <p>{props.time}</p>
        </div>
        <div className={styles.JobSched}>
        </div>
    </Aux>
)

export default calendarTimeslot;