import React, {useContext} from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import * as TimeConst from '../../../../config/TimeSlotConst';
import styles from './CalendarSched.module.css';
import PropTypes from 'prop-types';
import Button from '../../../UI/Button/Button';
import Modal from '../../../UI/Modal/Modal';
import ModalContent from '../../../UI/ModalContent/ModalContent';
import FormContent from '../../../UI/FormContent/FormContent';
import {JobContext} from '../../../../hoc/Context/JobContext';

const CalendarSched = (props) => {
  let disabled = false;
  const boxRender = {};
  let condClass = '';

  let startPos = TimeConst.START_POS;
  let endPos = TimeConst.END_POS;

  let client = {};
  let clientName = '';
  let clientNumber = '';
  let jobAddress = '';
  let jobDescription = '';
  let jobId = '';
  let key = '';
  let deleteDetails = [];
  let editDetails = {};

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
    client = job['client'];
    clientName = client['name'];
    clientNumber = client['phone'];
    jobAddress = job['address'];
    jobDescription = job['description'];
    jobId = job['jobId'];
    deleteDetails = [
      {'Id': jobId},
      {'Name': clientName},
      {'Number': clientNumber},
      {'Address': jobAddress},
    ];
    editDetails = {
      'jobId': jobId,
      'clientId': client['clientId'],
      'time': key + '',
      'address': jobAddress,
      'description': jobDescription,
      'deleteDetails': deleteDetails,
    };
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
        (props.showModal && disabled) ? (
        <Modal
          form={!props.showDeleteModal}
          show={props.showModal}
          click={props.closeModal}>
          {
            (props.showDeleteModal) ? (
              <ModalContent
                cancel={props.closeModal}
                remove={props.removeNow}
                heading={heading}
                message={message}
                details={jobDet['job']}/> ) :
              <FormContent
                clients={jobDet['clientList']}
                jobDetails={jobDet['timeslot']}
                date={jobDet['date']}
                timeInDay={jobDet['dayTimeSlot']}
                onChangeHandler={props.formChange}
                cancel={props.closeModal}
                delete={() => props.deleteClick(
                    jobDet['timeslot']['deleteDetails'],
                )}
                name={jobDet['formName']}
                submit={props.formSubmit}
              />
          }
        </Modal>) : null
      }
      <button
        onClick={() => {
          (disabled) ? props.clickedEdit(editDetails, 'edit') :
            props.clickedAdd(props.timeslot.toString());
        }}
        className={[styles.Timeslot, condClass].join(' ')}
        style={boxRender}>
        <div className={!disabled ? styles.Animation : styles.NoAnimation}>
          <p>Make Booking</p>
        </div>
        {
          (disabled) ? (
          <div className="row h-100 p-0 mx-2">
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
                  clicked={() => props.deleteClick(deleteDetails)}
                  tip='Delete'
                  name='X'
                />
              </div>
            </div>
          </div>) : null
        }
      </button>
    </Aux>
  );
};

CalendarSched.propTypes= {
  timeslot: PropTypes.any,
  clicked: PropTypes.func,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  removeNow: PropTypes.func,
  deleteClick: PropTypes.func,
  showDeleteModal: PropTypes.bool,
  formChange: PropTypes.func,
  formSubmit: PropTypes.func,
  clickedAdd: PropTypes.func,
  clickedEdit: PropTypes.func,
};

export default CalendarSched;
