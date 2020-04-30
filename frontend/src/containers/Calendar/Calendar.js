import React, {Component} from 'react';
import CalendarControls from '../../components/SchedCalendar/CalendarControls/CalendarControls';
import CalendarContent from '../../components/SchedCalendar/CalendarContent/CalendarContent';
import styles from './Calendar.module.css'
import axios from '../../config/Axios'
import * as ApiConstant from '../../config/APIConst'
import dayjs from 'dayjs';
import { JobContext } from '../../hoc/Context/JobContext';
import { calcAvailTimeSlot, days } from './Index'

class Calendar extends Component{
    constructor(props) {
        super(props);
        let now = dayjs().format('YYYY-MM-DD');

        this.state = {
            today: now,
            jobs: {},
            dateSelected: now,
            timeSelected: "",
            error: false,
            client: [],
            jobSelected: [],
            timeslot: {},
            availableTime: [],
            address: "",
            description: "",
            clientId: "",
            reloadJobs: false,
            showModal: false,
            showAddForm: false,
            showDelete: false,
            formName: "",
        }

        //Axio get jobs 
        const dateObj = {
            todayDate: now
        }
        
        axios
            .post(ApiConstant.FILTER_JOBS, dateObj)
            .then(resp => {
                this.setState({
                    jobs: resp.data
                });
            })
            .catch(err => {
                this.setState({error: err});
            });
        
        axios
            .get(ApiConstant.ALL_CLIENTS)
            .then(resp => {
                this.setState({
                    client: resp.data
                });
            })
            .catch(err => {
                this.setState({error: err});
            })    
    }

    componentDidUpdate(prevProps, prevState){
       if(this.state.reloadJobs === true){
            //Axio get jobs 
            const dateObj = {
            todayDate: this.state.today
            }

            axios
                .post(ApiConstant.FILTER_JOBS, dateObj)
                .then(resp => {
                    this.setState({
                        jobs: resp.data,
                        reloadJobs: false
                    });
                })
                .catch(err => {
                    this.setState({
                        error: err,
                        reloadJobs: false
                    });
                });
       }
       
       if(this.state.showAddForm === true){
            window.scrollTo(0,document.body.scrollHeight)
       }
    }

    onCalChangeHandler = event => {
        let new_date = this.state.today
        let day_select = this.state.dateSelected;
        if(event.target.id === 'Prev'){
            new_date = dayjs(new_date).subtract(7, 'day');
            day_select = new_date.endOf('week').format('YYYY-MM-DD');
        }else{
            new_date = dayjs(new_date).add(7, 'day');
            day_select = new_date.startOf('week').format('YYYY-MM-DD');
        }

        // Axio get jobs 
        const dateObj = {
            todayDate: new_date.format('YYYY-MM-D')
        }

        axios
            .post(ApiConstant.FILTER_JOBS, dateObj)
            .then(resp => {
                this.setState({
                    jobs: resp.data
                });
            })
            .catch(err => {
                console.log(err)
            });

        this.setState({
            today: new_date.format('YYYY-MM-DD'),
            dateSelected: day_select,
            showAddForm: false,
            timeSelected: ''
        });
    }

    onDayChangeHandler = (date) =>{
        this.setState({
            dateSelected:date,
            timeSelected: '',
            showAddForm: false,
        });
    }

    toggleAddFormHandler = (time) => {
        this.setState({
            showAddForm: true,
            timeSelected: time
        });
    }

    cancelAddFormHandler = () => {
        this.setState({
            showAddForm: false,
            timeSelected: ''
        });
    }

    onAddJobValueChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onAddjobSubmitHandler = (event) =>{
        const dateTime = `${this.state.dateSelected} ${this.state.timeSelected}:00:00`;
        const subObj = {
            clientId: this.state.clientId,
            job_date: dateTime,
            address: this.state.address,
            status: false,
            description: this.state.description
        }
        
        //Axios call
        axios
            .post(ApiConstant.JOB,subObj)
            .then(resp => {
                this.setState({
                    showAddForm: false,
                    reloadJobs: true
                });
            })
            .catch(err => console.log(err))
        event.preventDefault();
    }

    showDeleteModalHandler = (timeslot) => {
        this.setState({
            showModal: true,
            showDelete: true,
            jobSelected: timeslot
        });
    }

    removeModalHandler = () => {
        this.setState({
            showModal: false,
            showDelete: false,
            jobSelected: {},
            timeslot: {},
            availableTime: [],
            clientId: "",
            timeSelected: "",
            address: "",
            description: "",
            formName: "",
        });
    }

    deleteJobHandler = (id) => {
        axios
            .delete(`${ApiConstant.JOB}${id}/`)
            .then(resp => {
                this.setState({
                    reloadJobs: true,
                    showModal: false,
                    showDelete: false,
                });
            })
            .catch(resp => {
                this.setState({
                    showModal: false,
                    showDelete: false,
                });
            })
    }

    editModalHandler = (editDetails, formType) => {
    	//set slot details
    	const availableTimes = calcAvailTimeSlot(this.state.jobs, this.state.dateSelected);
    	const clientId = editDetails['clientId'];
    	const time = editDetails['time'];
    	const address = editDetails['address'];
    	const description = editDetails['description'];
    	
        this.setState({
            showModal: true,
            timeslot: editDetails,
            availableTime: availableTimes,
            clientId: clientId,
            timeSelected: time,
            address: address,
            description: description,
            formName: formType,
        });
    }

    submitFormHandler = (jobId,event) => {
        const type = this.state.formName;
        if(type === 'edit'){
            const dateTime = `${this.state.dateSelected} ${this.state.timeSelected}:00:00`;
            const subObj = {
                jobId: jobId,
                clientId: this.state.clientId,
                job_date: dateTime,
                address: this.state.address,
                status: false,
                description: this.state.description
            }
            //Axios call
            axios
                .put(`${ApiConstant.JOB}${jobId}/`,subObj)
                .then(resp => {
                    this.setState({
                        reloadJobs: true,
                        showModal: false,
                        formType: '',
                    })
                })
                .catch(err => console.log(err))
        }
        event.preventDefault();
    }

    render(){
        const timeArr = calcAvailTimeSlot(this.state.jobs, this.state.dateSelected);
        return(
            <div className={styles.Calendar}>
                <CalendarControls 
                  click={this.onCalChangeHandler}
                  month={dayjs(this.state.today).format('MMMM')} 
                  year={dayjs(this.state.today).format('YYYY')}
                />
                <JobContext.Provider value={{
                	job: this.state.jobSelected,
                	timeslot: this.state.timeslot,
                	clientList: this.state.client,
                	dayTimeSlot: this.state.availableTime,
                	date: this.state.dateSelected,
                    formName: this.state.formName}}>
                    <CalendarContent 
                      days={days}
                      jobs={this.state.jobs}
                      dateSelect={this.state.dateSelected}
                      day_clicked={this.onDayChangeHandler}
                      boolFormToggle={this.state.showAddForm}
                      addJob={this.toggleAddFormHandler}
                      editJob={this.editModalHandler}
                      timeSelect={this.state.timeSelected}
                      listOfClients={this.state.client}
                      jobFormOnChange={this.onAddJobValueChangeHandler}
                      onAddJobSubmit={this.onAddjobSubmitHandler}
                      onCancelAddForm={this.cancelAddFormHandler}
                      removeJobToggle={this.showDeleteModalHandler}
                      showModal={this.state.showModal}
                      closeModal={this.removeModalHandler}
                      removeJob={this.deleteJobHandler}
                      showDelete={this.state.showDelete}
                      calcTime={timeArr}
                      jobFormSubmit={this.submitFormHandler}
                    />
                </JobContext.Provider> 
            </div>
        )
    }
} 

export default Calendar;
