import React, {useContext} from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import * as TimeConst from '../../../../config/TimeSlotConst';
import styles from './CalendarSched.module.css';
import PropTypes from 'prop-types';
import Button from '../../../UI/Button/Button';
import Modal from '../../../UI/Modal/Modal';
import ModalContent from '../../../UI/ModalContent/ModalContent';
import {JobContext} from '../../../../hoc/Context/JobContext';

const CalendarSched = (props) => {
  let disabled = false;
  const boxRender = {};
  let condClass = '';

  let startPos = TimeConst.START_POS;
  let endPos = TimeConst.END_POS;

  let clientName = '';
  let clientNumber = '';
  let jobAddress = '';
  let jobDescription = '';
  let jobId = '';
  let key = '';
  let arrDetails = [];

  if (typeof props.timeslot === 'object') {
    disabled = true;
    key = Object.keys(props.timeslot);
    startPos += (parseInt(key) - 7) * TimeConst.JOB_HEIGHT;
    // TODO: Object duration value
    endPos += startPos + (TimeConst.DEFAULT_DURATION * TimeConst.JOB_HEIGHT);
    boxRender.height = endPos - startPos;
    boxRender.top = startPos;
    condClass = styles.Filled;

    const job = props.timeslot[key];
    const client = job['client'];
    clientName = client['name'];
    clientNumber = client['phone'];
    jobAddress = job['address'];
    jobDescription = job['description'];
    jobId = job['jobId'];
    arrDetails = [{'Id': jobId}, {'Name': clientName}, {'Number': clientNumber},
      {'Address': jobAddress}];
  } else if (props.timeslot === 11 || props.timeslot === 17) {
    boxRender.display = 'none';
  } else {
    startPos += ((props.timeslot - 7) * TimeConst.JOB_HEIGHT);
    endPos += startPos + (1 * TimeConst.JOB_HEIGHT);
    boxRender.height = endPos - startPos;
    boxRender.top = startPos;
    condClass = styles.Open;
  }

  const heading = 'Are you sure?';
  const message = 'You are about to delete a job. You can\'t undo this action!';
  const jobDet = useContext(JobContext);
  return (
    <Aux>
      {
        (props.showRemove) ? (
        <Modal show={props.showRemove} click={props.closeModal}>
          <ModalContent
            cancel={props.closeModal}
            remove={props.removeNow}
            heading={heading}
            message={message}
            details={jobDet['job']}/>
        </Modal> ) : null
      }
      <button
        onClick={() => props.clicked(props.timeslot)}
        className={[styles.Timeslot, condClass].join(' ')}
        disabled={disabled}
        style={boxRender}>
        <div className={!disabled ? styles.Animation : styles.NoAnimation}>
          <p>Make Booking</p>
        </div>
        {
          (disabled) ? (
          <div className="container h-100">
            <div className="container row p-0 m-0">
              <div className="text-left col-8 col-sm-10 col-lg-11 pt-4 pl-2">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <span className={styles.Label}>
                      Name:
                    </span>
                    {clientName}
                  </div>
                  <div className="col">
                    <span className={styles.Label}>
                      Phone:
                    </span>
                    {clientNumber}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className={styles.Label}>
                      Address:
                    </span>
                    {jobAddress}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className={styles.Label}>
                      Description:
                    </span>
                    {jobDescription}
                  </div>
                </div>
              </div>
              <div className="col p-0">
                <div className="row d-flex flex-row-reverse">
                  <Button
                    clicked={() => props.deleteClick(arrDetails)}
                    tip='Delete'
                    name='X'
                  />
                </div>
              </div>
            </div>
          </div> ) : null
        }
      </button>
    </Aux>
  );
};

CalendarSched.propTypes= {
  timeslot: PropTypes.any,
  clicked: PropTypes.func,
  showRemove: PropTypes.bool,
  closeModal: PropTypes.func,
  removeNow: PropTypes.func,
  deleteClick: PropTypes.func,
};

export default CalendarSched;
