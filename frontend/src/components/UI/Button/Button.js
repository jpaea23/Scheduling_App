import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = (props) => {
  // prevent parent bubble onclick event
  const onclickEvent = (e) => {
    e.stopPropagation();
    props.clicked();
  };
  return (
    <div className="mt-2 mr-2">
      <span onClick={onclickEvent} className={styles.Button}>
        <span className={styles.ToolTip}>
          {props.tip}
        </span>
        {props.name}
      </span>
    </div>
  );
};

Button.propTypes= {
  name: PropTypes.string,
  tip: PropTypes.string,
  clicked: PropTypes.func,
};

export default Button;
