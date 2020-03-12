import React from 'react';
import CalendarDays from './CalendarDays/CalendarDays';
import CalendarJobs from './CalendarJobs/CalendarJobs'

const calendarContent = (props) => {

    const days_of_week = props.days.map((day,i) =>{
       return <CalendarDays key={day+i} day={day}/>
    });

    //
    const month_day = props.start.map((count) => {
        return <CalendarJobs key={count} jobs={props.jobs} date={count}/>
    });

    // const jobs = props.jobs.map(job => {
    //     return <CalendarJobs key={job.jobId} date={job.address} />
    // });

    return(
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr style={{textAlign: 'center', border: 'thin solid black'}}>
                        {days_of_week}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {month_day}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default calendarContent