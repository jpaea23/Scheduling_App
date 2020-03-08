import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';

const calendarControl = (props) => (
    <Aux>
        <button id={props.name} onClick={props.clicked} className="btn btn-primary m-1">{props.name}</button>
    </Aux>
);

export default calendarControl;
