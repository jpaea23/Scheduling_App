import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.click}/>
      <div className={styles.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translatey(-100vh)',
          opacity: props.show ? '1' : '0',
        }}>
        {props.children}
      </div>
    </Aux>
  );
};

Modal.propTypes= {
  show: PropTypes.bool,
  children: PropTypes.any,
  click: PropTypes.func,
};

export default Modal;
