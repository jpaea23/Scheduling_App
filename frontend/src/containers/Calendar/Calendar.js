import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import CalendarControls from '../../components/SchedCalendar/CalendarControls/CalendarControls';
import CalendarContent from '../../components/SchedCalendar/CalendarContent/CalendarContent';
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
        
        let todayDate = dayjs().format();
        let month = dayjs(todayDate).format('M');
        let year = dayjs().format('YYYY');
        let day = dayjs().format('D');
        let month_date = dayjs().format('MMMM')

        this.state = {
            today: todayDate,
            curr_month: month,
            curr_year: year,
            curr_day: day,
            month_date: month_date,
            jobs: []
        }

        //Axio get jobs 
        axios.get(ApiConstant.ALL_JOBS)
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    jobs: resp.data
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    onCalChangeHandler = (e) => {
        let newDate = this.getSundayDate(this.state.curr_year,this.state.curr_month,this.state.curr_day);

        switch(e.target.id){
            case 'Prev': 
                newDate = dayjs(newDate).subtract(7, 'day');
                break;
            case 'Next':
                newDate = dayjs(newDate).add(7, 'day');
                break;
            default:
                newDate = dayjs();
                break;
        }

        this.setState({
            curr_month: newDate.format('M'),
            curr_year: newDate.format('YYYY'),
            curr_day: newDate.format('D'),
            month_date: newDate.format('MMMM')
        })     
    }

    getSundayDate = (year, month , day) => {
        const new_date = dayjs(year + '-' + month + '-' + day).startOf('week').format();
        return new_date;
    }

    getNumberOfDaysArr = () => { 
        let newDate = this.getSundayDate(this.state.curr_year,this.state.curr_month,this.state.curr_day);
        let dayNo = [];

        for(let i = 0; i < 7; i++){
            dayNo.push(dayjs(newDate).format('MMM DD'));
            newDate = dayjs(newDate).add(1, 'day');
        }

        return dayNo;
    }

    render(){
        const dayNo = this.getNumberOfDaysArr();

        return(
            <Aux>
                <CalendarControls 
                 click={this.onCalChangeHandler}
                 month={this.state.month_date} 
                 year={this.state.curr_year}/>
                 <CalendarContent 
                 days={days} 
                 start={dayNo}
                 jobs={this.state.jobs}/>
            </Aux>
        )
    }
} 

export default Calendar;