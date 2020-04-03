import React, { useEffect } from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import * as TimeConst from '../../../../config/TimeSlotConst';
import styles from './CalendarSched.module.css';

const CalendarSched = (props) => {  
    useEffect(() => {
        console.log('Use Effect [CalendarSched.js]');
    },[]);

    let disabled = false;
    let box_render = {
        position: 'absolute',
        left: '12%',
        color: 'white',
       
    };

    let startime = props.timeslot;
    let start_pos = (startime - 7) * TimeConst.JOB_HEIGHT;
    let end_pos =  start_pos + (TimeConst.DEFAULT_DURATION * TimeConst.JOB_HEIGHT);

    let client_name = '';
    let client_number = '';
    let job_address = '';
    let job_description = '';

    if(props.found_jobs !== undefined) {
        if(props.timeslot in props.found_jobs){
            box_render.height = end_pos - start_pos;
            box_render.backgroundColor = '#FF4136';
            box_render.top = start_pos;
            box_render.width = '86%';
            // box_render.zIndex= '1'
            disabled=true;

            const job = props.found_jobs[props.timeslot];
            const client = job['client']; 
            client_name = client['name'];
            client_number = client['phone'];
            job_address = job['address'];
            job_description = job['description'];
        }else{
            box_render.height = end_pos - start_pos;
            box_render.backgroundColor = '#01FF70';
            box_render.top = start_pos;
            box_render.width = '86%';
            // box_render.zIndex= '1'
        }
    };

    return(
        <Aux>
            <button className={styles.Timeslot} disabled={disabled} style={box_render}>
                <div className={!disabled ? styles.Animation : styles.NoAnimation}><p>Make A Booking?</p></div>
                <ul>
                    <li>
                        {client_name}
                    </li>
                    <li>
                        {client_number}
                    </li>
                    <li>
                        {job_address}
                    </li>
                    <li>
                        {job_description}
                    </li>
                </ul>
            </button>
        </Aux>
    )
}

export default CalendarSched;