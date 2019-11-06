import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default function ForgotPasswordComponent(props) {
    return (
        <div className="forgot">
        <div className="forget-title">
          <h1>Forgot Your Password?</h1>
          </div>
          <div className="page-data">
            <h2>Retrieve your password here</h2>
            <p>Please enter your email address below. You will receive a link to reset your password.</p>
            <label className="required">*Email Address</label><br/>
            <input className="input-text"
              type="text" id="email" name="email" value={props.state.email} onChange={props.handleInputChange}></input>
            <br/>
            <span>{props.state.errors.email}</span>
          </div>
            <div className="buttons-set">
              <p className="required">*Required Fields</p>
              <a href="/login">Back to Login</a>
              <Button type="submit" onClick={props.forgotPassword}>Submit</Button>
            </div>
        </div>
    );
}
