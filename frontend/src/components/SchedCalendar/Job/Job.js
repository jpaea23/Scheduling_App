import React from 'react';
import Aux from '../../../hoc/Aux/Aux';

const job = (props) => (
    <Aux>
        <p>{props.client}</p>
        <p>{props.jobDate}</p>
    </Aux>
);

export default job;