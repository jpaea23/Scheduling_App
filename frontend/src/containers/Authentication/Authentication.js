import React, { Component } from "react";

import axios from 'axios';

import Aux from '../../hoc/Aux/Aux';  
import Job from '../../components/SchedCalendar/Job/Job'  

class Scheduler extends Component{

    constructor(props) {
        super(props)
        this.state = {
            job: [],
            error: false,
            isAuthenticated: true,
            loading: false
        }

        if(this.state.isAuthenticated){
            axios.get("http://127.0.0.1:8000/job/")
            .then(res => {
                console.log(res.data)
                this.setState({
                    job: res.data
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        }

    }

    render(){

        let resData = <p style={{textAlign:'center'}}><strong>Oh No! </strong> Something went Wrong...</p>
        
        if(!this.state.error){
            resData = this.state.job.map( jobKey => {
                return <Job key={jobKey.jobId} 
                client={jobKey.client} 
                jobDate={jobKey.job_date} />
            });
        }

        return(
            <Aux>
                {resData}
            </Aux>
        );
    }
}

export default Scheduler;
