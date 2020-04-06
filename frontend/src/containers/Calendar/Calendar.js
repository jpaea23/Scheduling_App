import React, {Component} from 'react';
import CalendarControls from '../../components/SchedCalendar/CalendarControls/CalendarControls';
import CalendarContent from '../../components/SchedCalendar/CalendarContent/CalendarContent';
import styles from './Calendar.module.css'
import axios from '../../config/Axios'
import * as ApiConstant from '../../config/APIConst'
import dayjs from 'dayjs';

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
            date_selected: now,
            error: false
        }

        //Axio get jobs 
        const dateObj = {
            todayDate: now
        }
        axios.post(ApiConstant.FILTER_JOBS, dateObj)
            .then(resp => {
                this.setState({
                    jobs: resp.data
                });
            })
            .catch(err => {
                this.setState({error: err});
            });
    }

    onCalChangeHandler = (date) => {
        let new_date = this.state.today
        let day_select = this.state.date_selected;
        if(date.target.id === 'Prev'){
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
        axios.post(ApiConstant.FILTER_JOBS, dateObj)
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
            date_selected: day_select
        })
    }

    onDayChangeHandler = (date) =>{
        this.setState({
            date_selected:date
        })
    }

    render(){
        return(
            <div className={styles.Calendar}>
                <CalendarControls 
                 click={this.onCalChangeHandler}
                 month={dayjs(this.state.today).format('MMMM')} 
                 year={dayjs(this.state.today).format('YYYY')}/>
                 <CalendarContent 
                 days={days}
                 jobs={this.state.jobs}
                 dateSelect={this.state.date_selected}
                 day_clicked={this.onDayChangeHandler}
                 />
            </div>
        )
    }
} 

export default Calendar;
