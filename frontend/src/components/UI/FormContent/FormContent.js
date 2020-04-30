import React from 'react';
import styles from './FormContent.module.css';
import dayjs from 'dayjs';
import {timeFormat, availableTimesArr, capitlize} from './Index';
import CalendarNewJobOpt from '../../SchedCalendar/CalendarContent/CalendarNewJob/CalendarNewJobOpt/CalendarNewJobOpt';
import PropTypes from 'prop-types';

const FormContent = (props) => {
  const clientId = props.client['clientId'];
  const jobId = props.jobDetails['jobId'];
  const optOfClients = props.clients.map((client) => {
    return <CalendarNewJobOpt
      key={client.clientId}
      name={client.name}
      phone={client.phone}
      id={client.clientId}/>;
  });

  const timeNow = props.jobDetails['time'];
  const address = props.jobDetails['address'];
  const description = props.jobDetails['description'];
  const dateFormat = dayjs(props.date).format('DD-MM-YYYY');

  const timeSlotsAvail = availableTimesArr(props.timeInDay, timeNow);

  const listAvailTimes = timeSlotsAvail.map((time) => {
    const newTime = timeFormat(time);
    return <option key={time} value={time}>{newTime}</option>;
  });

  return (
    <div className={styles.JobForm}>
      <form className="p-3" onSubmit={(event) => props.submit(jobId, event)}>
        <span className="text-center">
          <h2>{capitlize(props.name)} Job</h2>
        </span>
        <div className="form-row">
          <div className="col-md-6">
            <label className="col-form-label">Client: </label>
            <select required
              className="form-control"
              onChange={props.onChangeHandler}
              defaultValue={clientId}
              name="clientId">
              {optOfClients}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6">
            <label className="col-form-label">Date: </label>
            <input disabled
              type="text"
              name="time"
              className="form-control"
              value={dateFormat}/>
          </div>
          <div className="col-md-6">
            <label className="col-form-label">Time: </label>
            <select required
              className="form-control"
              onChange={props.onChangeHandler}
              name="timeSelected"
              defaultValue={timeNow}>
              {listAvailTimes}
            </select>
          </div>
        </div>
        <div className="form-row mb-2">
          <div className="col-12">
            <label className="col-form-label">Address: </label>
            <input required
              maxLength="100"
              type="text"
              name="address"
              onChange={props.onChangeHandler}
              className="form-control"
              defaultValue={address}/>
          </div>
        </div>
        <div className="form-row mb-3">
          <div className="col-md-12">
            <label className="col-form-label">Description: </label>
            <textarea required
              style={{resize: 'none'}}
              maxLength="300"
              rows="3"
              type="text"
              name="description"
              onChange={props.onChangeHandler}
              className="form-control"
              defaultValue={description}/>
          </div>
        </div>
        <div className="submit-row d-flex mb-3">
          <input
            className="btn btn-primary mr-2"
            type="submit"
            value="Update" />
            <input
            onClick={props.delete}
            className="btn btn-danger mr-2"
            type="button"
            value="Delete" />
          <input
            onClick={props.cancel}
            className="btn btn-primary"
            type="button"
            value="Cancel" />
        </div>
      </form>
    </div>
  );
};

FormContent.propTypes= {
  clients: PropTypes.array,
  client: PropTypes.object,
  jobDetails: PropTypes.object,
  onChangeHandler: PropTypes.func,
  submit: PropTypes.func,
  cancel: PropTypes.func,
  date: PropTypes.string,
  timeInDay: PropTypes.array,
  name: PropTypes.string,
};


export default FormContent;
