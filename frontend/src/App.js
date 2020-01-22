import React from 'react';
import axios from "axios";


class App extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = event => {
    axios
          .post("/api/login/", this.state)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
    event.preventDefault();
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  render(){
    const { username, password } = this.state
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label>Username: </label>
            <input type="text" value={username} name="username" maxLength="100" onChange={this.onChangeHandler}/>
          </div>
          <div className="form-row">
            <label>Password: </label>
            <input type="password" value={password} name="password" maxLength="100" onChange={this.onChangeHandler}/>
          </div>
          <div className="submit-row">
            <input type="submit" value="Log In" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
