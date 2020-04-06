import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import {css} from '@emotion/core';
import Aux from '../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  const override = css`
        display: block;
        border-color: red;
        text-align: center;
    `;

  return (
    <Aux>
      <BeatLoader css={override} size={props.spinSize}/>
    </Aux>
  );
};

Spinner.propTypes= {
  spinSize: PropTypes.number,
};

export default Spinner;
