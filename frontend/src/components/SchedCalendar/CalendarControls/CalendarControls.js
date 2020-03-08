import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import CalendarControl from './CalendarControl/CalendarControl';
import styles from './CalendarControls.module.css';


const calendarControls = (props) => (
    <Aux>
        <div className={styles.Controls}>
            <CalendarControl name="Prev" clicked={props.click}/>
            <h4 className="text-center">{props.month} {props.year}</h4>
            <CalendarControl name="Next" clicked={props.click}/>
        </div>
    </Aux>
);

export default calendarControls;
