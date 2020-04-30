import React from 'react';
import CalendarDays from './CalendarDays/CalendarDays';
import CalendarJobs from './CalendarJobs/CalendarJobs';
import styles from './CalendarContent.module.css';
import CalendarSched from './CalendarSched/CalendarSched';
import CalendarTimeslot from './CalendarTimeslot/CalendarTimeslot';
import CalendarNewJob from './CalendarNewJob/CalendarNewJob';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const CalendarContent = (props) => {
  // Days Of the week
  const daysOfWeek = props.days.map((day, i) =>{
    return <CalendarDays key={day} day={day} />;
  });

  // 7 Day Calendar Content
  const allJobs = Object.keys(props.jobs).map((job) => {
    const arrJobs = Object.keys(props.jobs[job]);
    return <CalendarJobs
      clicked={props.day_clicked}
      dayJobs={arrJobs}
      key={job}
      date={job}/>;
  });

  // Timeslot of single day - 17 = number of timeslots in a single day 1 - 17
  // slice(7) is excluding numbers 1 - 7 in the Array
  // timeslot = [7,8,9,10,11,12,13,14,15,16,17] : Workday 7am to 5pm
  let timeslot = [...Array(17+1).keys()].slice(7);

  const calendarContent = timeslot.map((time) => {
    return <CalendarTimeslot key={time} time={time}/>;
  });

  let allTimeSlots = null;
  if (props.jobs[props.dateSelect] !== undefined) {
    timeslot = props.calcTime;

    allTimeSlots = timeslot.map((time, i) => {
      return <CalendarSched
        key={time + i}
        timeslot={time}
        clickedAdd={props.addJob}
        clickedEdit={props.editJob}
        deleteClick={props.removeJobToggle}
        showModal={props.showModal}
        closeModal={props.closeModal}
        removeNow={props.removeJob}
        showDeleteModal={props.showDelete}
        formChange={props.jobFormOnChange}
        formSubmit={props.jobFormSubmit}
      />;
    });
  };

  let addNewJobForm = null;
  if (props.boolFormToggle) {
    addNewJobForm = <CalendarNewJob
      onChangeHandler={props.jobFormOnChange}
      time={props.timeSelect}
      date={props.dateSelect}
      clients={props.listOfClients}
      addNewJob={props.onAddJobSubmit}
      cancelClick={props.onCancelAddForm}/>;
  }

  return (
    <div className={styles.Content}>
      <div className={styles.DaysOfWeek}>
        {daysOfWeek}
      </div>
      <div className={styles.DateOfWeek}>
        {allJobs}
      </div>
      <div style={{margin: '40px'}}>
        <p className={styles.SelectDate}>
          {dayjs(props.dateSelect).format('DD-MMM').toUpperCase()}
        </p>
        <div className={styles.Container}>
          {allTimeSlots}
          {calendarContent}
        </div>
      </div>
      <div className={props.boolFormToggle ? styles.Form: ''}>
        {addNewJobForm}
      </div>
    </div>
  );
};

CalendarContent.propTypes= {
  days: PropTypes.array,
  jobs: PropTypes.object,
  dateSelect: PropTypes.any,
  day_clicked: PropTypes.func,
  toggler: PropTypes.func,
  boolFormToggle: PropTypes.bool,
  jobFormOnChange: PropTypes.func,
  timeSelect: PropTypes.string,
  listOfClients: PropTypes.array,
  onAddJobSubmit: PropTypes.func,
  onCancelAddForm: PropTypes.func,
  removeJobToggle: PropTypes.func,
  showRemove: PropTypes.bool,
  closeRemove: PropTypes.func,
  removeJob: PropTypes.func,
  calcTime: PropTypes.array,
  addJob: PropTypes.func,
  editJob: PropTypes.func,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  showDelete: PropTypes.bool,
  jobFormSubmit: PropTypes.func,
};

export default CalendarContent;
