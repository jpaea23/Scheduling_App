import React from 'react';
import styles from './ModalContent.module.css';
import PropTypes from 'prop-types';

const ModalContent = (props) => {
  const id = props.details[0][Object.keys(props.details[0])];
  const newArr = props.details.slice(1);

  const list = newArr.map((job) => {
    const key = Object.keys(job);
    const value = job[key];
    return (
      <li key={key}>
        <b>{key}:</b> {value}
      </li>
    );
  });

  return (
    <div className={styles.Container}>
      <div className={styles.Top}>
        <span>X</span>
      </div>
      <div className="text-center">
        <h2>{props.heading}</h2>
      </div>
      <div className="ml-3 text-center">
        <p>{props.message}</p>
        <ul className="text-left">
          {list}
        </ul>
      </div>
      <div className="mt-2">
        <button
          onClick={() => props.remove(id)}
          className="mr-3 btn btn-danger">
            Remove
        </button>
        <button
          onClick={props.cancel}
          className="btn btn-info">
            Cancel
        </button>
      </div>
    </div>
  );
};

ModalContent.propTypes= {
  heading: PropTypes.string,
  message: PropTypes.string,
  remove: PropTypes.func,
  cancel: PropTypes.func,
  details: PropTypes.array,
};
export default ModalContent;
