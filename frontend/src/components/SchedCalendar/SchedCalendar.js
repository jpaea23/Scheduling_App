import React from 'react';
import Aux from '../../hoc/Aux/Aux';

import Job from '../SchedCalendar/Job/Job';

//Display all objects for 1 date
const schedCalendar = (props) => {

    let transormedJob = Object.keys(props.jobs).map(jobKey => {
        return <Job/>
    })

    // const summaryIngredients = Object.keys(props.ingredients).map(igkey => {
    //     return <li key={igkey}>{props.ingredients[igkey]}</li>
    // });


    return(
        <Aux>
        <div style={{border:'thin solid black'}}>
            
        </div>
    </Aux>
    )
}

export default schedCalendar;
