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
        let date = new Date('2020-03-11');
        let now = dayjs(date).format('YYYY-MM-DD');

        this.state = {
            today: now,
            jobs: {},
            date_selected: now
        }
        console.log('[Calendar.js] - Constructor')

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
                console.log(err)
            });
    }

    componentDidMount(){
        console.log('[Calendar.js]')
    }

    onCalChangeHandler = (e) => {
        let new_date = this.state.today
        let day_select = this.state.date_selected;
        switch(e.target.id){
            case 'Prev': 
                new_date = dayjs(new_date).subtract(7, 'day');
                day_select = new_date.endOf('week').format('YYYY-MM-DD');
                break;
            case 'Next':
                new_date = dayjs(new_date).add(7, 'day');
                day_select = new_date.startOf('week').format('YYYY-MM-DD');
                break;
            default:
                new_date = dayjs();
                day_select = new_date.startOf('week').format('YYYY-MM-DD');
                break;
        }

        //Axio get jobs 
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

        console.log(day_select)

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
        const month = dayjs(this.state.today).format('MMMM')
        const year = dayjs(this.state.today).format('YYYY')

        return(
            <div className={styles.Calendar}>
                <CalendarControls 
                 click={this.onCalChangeHandler}
                 month={month} 
                 year={year}/>
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