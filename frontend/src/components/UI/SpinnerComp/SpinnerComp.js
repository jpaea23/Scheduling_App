import React from 'react';

import BeatLoader  from 'react-spinners/BeatLoader'
import { css } from "@emotion/core";
import Aux from '../../../hoc/Aux/Aux';

const spinner = (props) => {
    const override = css`
        display: block;
        border-color: red;
        text-align: center;
    `;

    return (
        <Aux>
            <BeatLoader css={override} size={props.spinSize}/>
        </Aux>
    )
};

export default spinner;