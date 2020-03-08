import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';

const calendarDays = (props) => (
    <Aux>
        <th scope='col'>
            <p>{props.day}</p>
        </th>
    </Aux>
)

export default calendarDays;