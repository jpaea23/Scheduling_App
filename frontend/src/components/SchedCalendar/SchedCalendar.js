import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';

import CalendarControls from './CalendarControls/CalendarControls';


//Display all objects for 1 date
class SchedCalendar extends Component{
    constructor(props) {
        super(props);

        let todayDate = new Date();
        let month = todayDate.getMonth();
        let year = todayDate.getFullYear();

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
        console.log(todayDate)

        this.state = {
            today: todayDate,
            curr_month: month,
            curr_year: year,
            monthss: [...months],
            month_date: months[month] + ' ' + year
        }
    }


    onPrevHandler = () => {
        const month = this.state.curr_month;
        const year = this.state.curr_year;
        const months = [...this.state.monthss];


        const newMonth = (month === 0 ) ? 11 : month - 1;
        const newYear = (month === 0 )? year - 1: year;
        console.log(newMonth);
        this.setState({
            curr_month: newMonth,
            curr_year: newYear,
            month_date: months[newMonth] + ' ' + newYear
        })
    }

    render(){
    // onPrevHandler = () => {
    //     this.state.curr_month = (curr_month === 0 ) ? 11 : curr_month - 1;
    //     curr_year = (curr_month === 11 ) ? curr_year - 1 : curr_year;
    //     month_date = months[curr_month] + ' ' + curr_year;
    //     console.log('prev Clicked ' + month_date)
    // }

    return(
        <Aux>
            <CalendarControls prev_clicked={this.onPrevHandler} dateMonth={this.state.month_date}/>
            <p>Calendar</p>
        </Aux>
    )}
} 

export default SchedCalendar;