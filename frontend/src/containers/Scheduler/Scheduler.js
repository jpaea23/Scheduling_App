import React from 'react';
import axios from "axios";

import AuthLogin from '../../components/Authentication/AuthLogin/AuthLogin';
import SchedCalendar from '../../components/SchedCalendar/SchedCalendar'

import Spinner from '../../components/UI/SpinnerComp/SpinnerComp';
import Modal from '../../components/UI/Modal/Modal';

import Aux from '../../hoc/Aux/Aux';


class Authentication extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            credentials:{
                username: '',
                password: ''
            },
            isAuthenticated: true,
            user: null,
            token: null,
            error: false,
            loading: false
        }

    }

      loginHandler = event => {
        //loading spin
        this.setState({loading:true});

        //Credentials Object 
        const credObj = {
          username: this.state.credentials.username,
          password: this.state.credentials.password
        }
        
        axios
              .post("http://127.0.0.1:8000/api/login/", credObj)
              .then(res => {
                this.setState({
                  isAuthenticated: true,
                  loading: false,
                  user: res.data.user,
                  token: res.data.token
                });
              })
              .catch(err => {
                this.setState({error: err, loading: false});
              });
        event.preventDefault();
      };
    
      onUsernameChangeHandler = event => {
        const usernameObj = {
          username: event.target.value,
          password: this.state.credentials.password
        }
        this.setState({ credentials: usernameObj});
      }

      onPasswordChangeHandler = event => {
        const usernameObj = {
          password: event.target.value,
          username: this.state.credentials.username
        }
        this.setState({ credentials: usernameObj});
      }

    render(){
        let loginComp = (this.state.loading) ? <Spinner spinSize={15}/> : (
          <div>
            <AuthLogin loginSubmit={this.loginHandler} 
                    usernameChange={this.onUsernameChangeHandler}
                    passwordChange={this.onPasswordChangeHandler}
                    error={this.state.error}
                    errorMessage={this.state.error.password}
                    />
          </div>
        );

        
        return(
            <div>
              <Modal show={!this.state.isAuthenticated}>
                {loginComp}
              </Modal>
            </div>
        );
    }
};

export default Authentication;