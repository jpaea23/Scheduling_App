import React from 'react';

const login = (props) => {
  const isError = (props.error)? <h3 style={{color:'red', fontWeight:'bold'}}>Oh snap Something happened</h3> : null

  return(
    <div>
      {isError}
      <form onSubmit={props.loginSubmit}>
        <div className="form-row">
          <label>Username: </label>
          <input type="text" name='username' maxLength="100" onChange={props.usernameChange}/>
        </div>
        <div className="form-row">
          <label>Password: </label>
          <input type="password" name='password' maxLength="100" onChange={props.passwordChange}/>
        </div>
        <div className="submit-row">
          <input type="submit" value="Log In" />
        </div>
      </form>
    </div>
  );
}

export default login;