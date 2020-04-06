import React, {useEffect} from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';

const Modal = (props) => {
  useEffect(() => {
    console.log('Use Effect [Modal.js]');
  }, [props.show]);

  return (
    <Aux>
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
};

export default Modal;
