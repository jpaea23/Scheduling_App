import React, {Component} from 'react';
import CalendarControls from '../../components/SchedCalendar/CalendarControls/CalendarControls';
import CalendarContent from '../../components/SchedCalendar/CalendarContent/CalendarContent';
import styles from './Calendar.module.css'
import axios from '../../config/Axios'
import * as ApiConstant from '../../config/APIConst'
import dayjs from 'dayjs';
import { JobContext } from '../../hoc/Context/JobContext';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

class Calendar extends Component{
    constructor(props) {
        super(props);
        let now = dayjs().format('YYYY-MM-DD');

        this.state = {
            today: now,
            jobs: {},
            dateSelected: now,
            timeSelected: null,
            error: false,
            toggleJobForm: false,
            client: [],
            address: "",
            description: "",
            clientId: "",
            reloadJobs: false,
            showRemove: false,
            jobSelected: []
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
       
       if(this.state.toggleJobForm === true){
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
            toggleJobForm: false,
            timeSelected: null
        });
    }

    onDayChangeHandler = (date) =>{
        this.setState({
            dateSelected:date,
            timeSelected: null,
            toggleJobForm: false,
        });
    }

    toggleAddFormHandler = (time) => {
        this.setState({
            toggleJobForm: true,
            timeSelected: time
        });
    }

    cancelAddFormHandler = () => {
        this.setState({
            toggleJobForm: false,
            timeSelected: null
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
                    toggleJobForm: false,
                    reloadJobs: true
                });
            })
            .catch(err => console.log(err))
        event.preventDefault();
    }

    showDeleteModalHandler = (timeslot) => {
        this.setState({
            showRemove: true,
            jobSelected: timeslot
        });
    }

    removeDeleteModalHandler = () => {
        this.setState({
            showRemove: false,
            jobSelected: {}
        });
    }

    deleteJobHandler = (id) => {
        axios
            .delete(`${ApiConstant.JOB}${id}/`)
            .then(resp => {
                this.setState({
                    reloadJobs: true,
                    showRemove: false
                });
            })
            .catch(resp => {
                this.setState({
                    showRemove: false
                });
            })
    }

    render(){
        return(
            <div className={styles.Calendar}>
                <CalendarControls 
                  click={this.onCalChangeHandler}
                  month={dayjs(this.state.today).format('MMMM')} 
                  year={dayjs(this.state.today).format('YYYY')}
                />
                <JobContext.Provider value={{job: this.state.jobSelected}}>
                    <CalendarContent 
                      days={days}
                      jobs={this.state.jobs}
                      dateSelect={this.state.dateSelected}
                      day_clicked={this.onDayChangeHandler}
                      boolFormToggle={this.state.toggleJobForm}
                      toggler={this.toggleAddFormHandler}
                      timeSelect={this.state.timeSelected}
                      listOfClients={this.state.client}
                      jobFormOnChange={this.onAddJobValueChangeHandler}
                      onAddJobSubmit={this.onAddjobSubmitHandler}
                      onCancelAddForm={this.cancelAddFormHandler}
                      removeJobToggle={this.showDeleteModalHandler}
                      showRemove={this.state.showRemove}
                      closeRemove={this.removeDeleteModalHandler}
                      removeJob={this.deleteJobHandler}
                    />
                </JobContext.Provider> 
            </div>
        )
    }
} 

export default Calendar;
