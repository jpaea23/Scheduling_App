import React from 'react';
import CalendarNewJobOpt from './CalendarNewJobOpt/CalendarNewJobOpt';
import styles from './CalendarNewJob.module.css';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const CalendarNewJob = (props) => {
  const optOfClients = props.clients.map((client) => {
    return <CalendarNewJobOpt key={client.clientId}
      name={client.name}
      phone={client.phone}
      id={client.clientId}/>;
  });

  const timeOfDay = (props.time < 12 ) ? 'AM' : 'PM';
  const dateFormat = dayjs(props.date).format('DD-MM-YYYY');
  const timeFormat = props.time + ':00 ' + timeOfDay;

  return (
    <div className={styles.AddJobForm}>
      <form className="m-5 p-2" onSubmit={props.addNewJob}>
        <div className="form-row mb-3">
          <div className="col-md-6">
            <label className="col-form-label">Client: </label>
            <select required
              onChange={props.onChangeHandler}
              className="form-control"
              name="clientId">
              <option></option>
              {optOfClients}
            </select>
          </div>
        </div>
        <div className="form-row mb-3">
          <div className="col-md-6">
            <label className="col-form-label">Date: </label>
            <input disabled
              type="text"
              name="date"
              className="form-control"
              value={dateFormat}/>
          </div>
          <div className="col-md-6">
            <label className="col-form-label">Time: </label>
            <input disabled
              type="text"
              name="time"
              className="form-control"
              value={timeFormat}/>
          </div>
        </div>
        <div className="form-row mb-3">
          <div className="col-md-12">
            <label className="col-form-label">Address: </label>
            <input required
              maxLength="100"
              type="text"
              name="address"
              onChange={props.onChangeHandler}
              className="form-control"
              placeholder="10 Sydney St Sydney 2000 ..."/>
          </div>
        </div>
        <div className="form-row mb-3">
          <div className="col-md-12">
            <label className="col-form-label">Description: </label>
            <textarea required
              maxLength="300"
              rows="3"
              type="text"
              name="description"
              onChange={props.onChangeHandler}
              className="form-control"
              placeholder="Job Description..."/>
          </div>
        </div>
        <div className="submit-row d-flex mb-3">
          <input
            className="btn btn-primary mr-2"
            type="submit"
            value="Add" />
          <input
            onClick={props.cancelClick}
            className="btn btn-primary"
            type="button"
            value="Cancel" />
        </div>
      </form>
    </div>
  );
};

CalendarNewJob.propTypes= {
  clients: PropTypes.array,
  time: PropTypes.number,
  date: PropTypes.string,
  addNewJob: PropTypes.func,
  onChangeHandler: PropTypes.func,
  cancelClick: PropTypes.func,
};

export default CalendarNewJob;
