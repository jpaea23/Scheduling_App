import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';

const CalendarControl = (props) => (
  <Aux>
    <button
      id={props.name}
      onClick={props.clicked}
      className="btn btn-primary m-1">
      {props.name}
    </button>
  </Aux>
);

CalendarControl.propTypes= {
  name: PropTypes.string,
  clicked: PropTypes.func,
};

export default CalendarControl;
