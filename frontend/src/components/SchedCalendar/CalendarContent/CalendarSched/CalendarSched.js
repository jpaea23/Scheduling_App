import React, { useEffect } from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import * as TimeConst from '../../../../config/TimeSlotConst';
import styles from './CalendarSched.module.css';

const CalendarSched = (props) => {  
    useEffect(() => {
        console.log('Use Effect [CalendarSched.js]');
    },[]);

    let disabled = false;
    let box_render = {};
    let con_class = '';

    let start_pos; 
    let end_pos;

    let client_name = '';
    let client_number = '';
    let job_address = '';
    let job_description = '';

    if(typeof props.timeslot === 'object'){
        disabled = true;
        const key = Object.keys(props.timeslot);
        start_pos = (parseInt(key) - 7) * TimeConst.JOB_HEIGHT;
        end_pos = start_pos + (TimeConst.DEFAULT_DURATION * TimeConst.JOB_HEIGHT) //TODO: Object duration value 
        box_render.height = end_pos - start_pos;
        box_render.top = start_pos;
        con_class = styles.Filled;

        const job = props.timeslot[key];
        const client = job['client']; 
        client_name = 'Name: ' + client['name'];
        client_number = 'Phone: ' + client['phone'];
        job_address = 'Address: ' + job['address'];
        job_description = 'Description: ' + job['description'];
        
    }else if(props.timeslot === 11 || props.timeslot === 17){
        box_render.display = 'none';
    }else{
        start_pos = (props.timeslot - 7) * TimeConst.JOB_HEIGHT;
        end_pos = start_pos + (1 * TimeConst.JOB_HEIGHT);
        box_render.height = end_pos - start_pos;
        box_render.top = start_pos;
        con_class = styles.Open;
    }

    return(
        <Aux>
            <button className={[styles.Timeslot, con_class].join(' ')} disabled={disabled} style={box_render}>
                <div className={!disabled ? styles.Animation : styles.NoAnimation}><p>Make Booking</p></div>
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