import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';

const calendarJob = (props) => {
   return(
       <Aux>
           <td>{props.date}</td>
       </Aux>
   );
}

export default calendarJob;