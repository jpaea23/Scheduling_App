import React from 'react';
import Aux from '../../../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';

const CalendarNewJobOpt = (props) => (
  <Aux>
    <option value={props.id}>
      {props.name} {props.phone}
    </option>
  </Aux>
);

CalendarNewJobOpt.propTypes= {
  id: PropTypes.number,
  name: PropTypes.string,
  phone: PropTypes.string,
};

export default CalendarNewJobOpt;
