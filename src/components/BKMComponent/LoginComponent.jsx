import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';

export default function LoginComponent(props) {
  return (
    <div>
      <div className="user-login-register">
        <div className="heading">
          <h1>Login or Create an Account</h1>
        </div>
        {props.state.showError &&
          <ul className="login-messages">
            <li className="error-msg">
              <ul>
                <li><i className="fa fa-warning"></i><span>Invalid login or password.</span></li>
              </ul>
            </li>
          </ul>
        }
        {
          props.forgotPasswordId &&
          <ul className="forgot-message">
            <li className="forgot-password-success-msg">
              <ul>
                <li className="forgot-border"><span>{props.forgotPasswordRes}</span></li>
              </ul>
            </li>
          </ul>
        }
        <div className="user-register">
          <h2>New Customers</h2>
          <p>
            By creating an account with our store, you will be able to move
            through the checkout process faster, store multiple shipping
            addresses, view and track your orders in your account and more.
          </p>
          <div className="register-button">
            <Button type="button" className="create-btn" title="Create an Account" href="/register">
              <span>
                <span>Create an Account</span>
              </span>
            </Button>
          </div>
        </div>

        <div className="user-login">
          <h2>Registered Customers</h2>
          <p>If you have an account with us, please log in.</p>
          <p>
            Welcome to Our New Portal!
            <br />
            Existing user Please use your Email ID Instead of Username to Login.
          </p>
          <ul className="right-login">
            <li>
              <label>
                <em>*</em>Email Address
              </label>
              <div>
                <input type="text" name="username" value={props.state.email}
                  onChange={props.handleInputChange}
                  onKeyUp={props.loginData.bind(this)}
                  id="email" className="input-text" title="Email Address" />
                <span>{_get(props.state, 'errors.email')}</span>
              </div>
            </li>
            <li>
              <label>
                <em>*</em>Password
              </label>
              <div>
                <input type="password" name="password" value={props.state.password}
                  onChange={props.handleInputChange}
                  onKeyUp={props.loginData.bind(this)}
                  className="input-text" id="pass" title="Password"
                />

                <span>{props.state.errors.pass}</span>
              </div>
            </li>
          </ul>
          <div className="login-button">
            <Button type="submit" className="another-login" title="Login" name="send" id="send2"
              onClick={props.loginDataclick.bind(this)}
            // onKeyUp={props.loginData.bind(this)}
            ><span><span>Login</span></span></Button>
            <a href="/forgotPassword">Forgot Your Password?</a>
            <p>* Required Fields</p>
          </div>
        </div>
      </div>

    </div>
  );
}
