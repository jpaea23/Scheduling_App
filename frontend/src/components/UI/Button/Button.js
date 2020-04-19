import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = (props) => (
  <div className="mt-2">
    <span onClick={props.clicked} className={styles.Button}>
      <span className={styles.ToolTip}>
        {props.tip}
      </span>
      {props.name}
    </span>
  </div>
);

Button.propTypes= {
  name: PropTypes.string,
  tip: PropTypes.string,
  clicked: PropTypes.func,
};

export default Button;
