import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import CalendarControls from '../../components/SchedCalendar/CalendarControls/CalendarControls';
import CalendarContent from '../../components/SchedCalendar/CalendarContent/CalendarContent';
import axios from '../../config/Axios'
import * as ApiConstant from '../../config/APIConst'

//Display all objects for 1 date
class Calendar extends Component{
    constructor(props) {
        super(props);
        
        let todayDate = new Date();
        let month = todayDate.getMonth();
        let year = todayDate.getFullYear();
        let day = todayDate.getDate();
        
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]

        this.state = {
            today: todayDate,
            curr_month: month,
            curr_year: year,
            curr_day: day,
            months_year: [...months],
            month_date: months[month] + ' ' + year,
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
        const months = [...this.state.months_year];

        let newMonth = 0;
        let newYear = 0;
        let newDay = 0;

        const newDate = this.getSundayDate(this.state.curr_year,this.state.curr_month,this.state.curr_day);

        switch(e.target.id){
            case 'Prev': 
                newDate.setDate(newDate.getDate() - 7);
                newMonth = newDate.getMonth();
                newYear = newDate.getFullYear();
                newDay = newDate.getDate();
                break;
            case 'Next':
                newDate.setDate(newDate.getDate() + 7);
                newMonth = newDate.getMonth();
                newYear = newDate.getFullYear();
                newDay = newDate.getDate();
                break;
            default:

        }

        this.setState({
            curr_month: newMonth,
            curr_year: newYear,
            curr_day: newDay,
            month_date: months[newMonth] + ' ' + newYear
        })     
    }

    getSundayDate = (year, month , day) => {
        const newDate = new Date(this.state.curr_year,this.state.curr_month,this.state.curr_day);
        const dayofWeek = newDate.getDay(); 
        newDate.setDate(newDate.getDate() - dayofWeek);

        return newDate;
    }

    getNumberOfDaysArr = () => { 
        const newDate = this.getSundayDate(this.state.curr_year,this.state.curr_month,this.state.curr_day);
        let dayNo = [];

        for(let i = 0; i < 7; i++){
            dayNo.push(newDate.toISOString());
            newDate.setDate(newDate.getDate() + 1);
            console.log(newDate.toISOString());
        }

        return dayNo;
    }

    render(){
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

        const dayNo = this.getNumberOfDaysArr();

        return(
            <Aux>
                <CalendarControls 
                 click={this.onCalChangeHandler}
                 month={this.state.months_year[this.state.curr_month]} 
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