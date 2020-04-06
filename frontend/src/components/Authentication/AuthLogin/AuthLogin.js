import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
  const isError = (props.error) ?
    <p style={{color: 'red', fontWeight: 'bold'}}>
      Username and/or Password incorrect: {props.errorMessage}
    </p> : null;

  return (
    <div className="border rounded m-2 p-3">
      <div className="">
        {isError}
        <form className='' onSubmit={props.loginSubmit}>
          <div className="form-group row">
            <label className="col-form-label col-md-2">Username: </label>
            <div className="col-md-10">
              <input type="text"
                name="username"
                maxLength="100"
                onChange={props.usernameChange}
                className="form-control"
                placeholder="Username"/>
            </div>
          </div>
          <div className="form-group row mt-2">
            <label className="col-form-label col-md-2">Password: </label>
            <div className="col-md-10">
              <input type="password"
                name="password"
                maxLength="100"
                onChange={props.passwordChange}
                className="form-control"
                placeholder="Password"/>
            </div>
          </div>
          <div className="submit-row d-flex">
            <input type="submit" value="Log In" />
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes={
  error: PropTypes.object,
  errorMessage: PropTypes.string,
  loginSubmit: PropTypes.func,
  usernameChange: PropTypes.string,
  passwordChange: PropTypes.string,
};

export default Login;
