import React from 'react';

const calendarJob = (props) => (
        <li>
            {props.address}
            {props.description}
            {props.status}
        </li>
);

export default calendarJob;