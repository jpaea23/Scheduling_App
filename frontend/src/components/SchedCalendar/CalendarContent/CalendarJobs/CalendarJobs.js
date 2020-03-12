import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import CalendarJob from './CalendarJob/CalendarJob';

const calendarJobs = (props) => {

    const jobs = props.jobs.map(job =>{
        return <CalendarJob key={job.jobId} address={job.address} description={job.description} status={job.status}/>
    });

   return(
       <Aux>
           <td className="p-2">
               <div>
                {props.date}
               </div>
                   <ul style={{listStyle:'none',padding:'0', margin:'0'}}>
                     {jobs}
                   </ul>
           </td>
       </Aux>
   );
}

export default calendarJobs;