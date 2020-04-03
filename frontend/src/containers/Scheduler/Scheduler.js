import React from 'react';
import axios from '../../config/Axios';
import * as APIConst from '../../config/APIConst'
import AuthLogin from '../../components/Authentication/AuthLogin/AuthLogin';
import Spinner from '../../components/UI/SpinnerComp/SpinnerComp';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import Calendar from '../Calendar/Calendar'


class Scheduler extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            credentials:{
                username: '',
                password: ''
            },
            isAuthenticated: false,
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

      console.log(credObj);
      
      axios
            .post(APIConst.LOGIN_URL, credObj)
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
      this.setState({ credentials: {
        username: event.target.value,
        password: this.state.credentials.password
      }});
    }

    onPasswordChangeHandler = event => {
      this.setState({ credentials: {
        password: event.target.value,
        username: this.state.credentials.username
      }});
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

      let calendar_sched = (this.state.isAuthenticated) ?
        <Calendar/>: null;

      return(
          <Aux>
            <Modal show={!this.state.isAuthenticated}>
              {loginComp}
            </Modal>
              {calendar_sched}
          </Aux>
      );
  }
};

export default Scheduler;