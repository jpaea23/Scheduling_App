import React from 'react';
import axios from "axios";

import AuthLogin from '../../components/AuthenticationComp/AuthLogin/AuthLogin';
import AuthLogout from '../../components/AuthenticationComp/AuthLogout/AuthLogout';
import Spinner from '../../components/UI/SpinnerComp/SpinnerComp';
import Modal from '../../components/UI/Modal/Modal';

class Authentication extends React.Component{
    state = {
      credentials:{
        username: '',
        password: ''
      },
      isAuthenticated: false,
      loginRequired: true,
      error: null,
      loading: false
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
              .post("http://127.0.0.1:8000/login/", credObj)
              .then(res => {
                console.log(res.data)
                this.setState({isAuthenticated: true,
                  loading: false,
                  loginRequired: false,
                  error: null,
                });
              })
              .catch(err => {
                this.setState({error: err, loading: false});
                console.log("Error here " + this.state.error)
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

      logoutHandler = () =>{
        console.log('logging user out');
      }

    render(){
        let loginComp = (this.state.loading) ? <Spinner spinSize={15}/> : (
          <div>
            <AuthLogin loginSubmit={this.loginHandler} 
                    usernameChange={this.onUsernameChangeHandler}
                    passwordChange={this.onPasswordChangeHandler}
                    error={this.state.error}
                    />
            <AuthLogout logout={this.logoutHandler}/>
          </div>
        );
        return(
            <div>
              <Modal show={this.state.loginRequired}>
                {loginComp}
              </Modal>
            </div>
        );
    }
};

export default Authentication;