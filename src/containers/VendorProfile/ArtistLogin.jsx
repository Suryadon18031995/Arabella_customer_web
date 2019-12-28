import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import { Redirect } from 'react-router-dom';

import logo from '../../assets/images/LOGO.png';
import * as vendorActions from '../../actions/vendorArtist';

class ArtistLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            loginError: ''
        }
    }

    componentDidMount() {
        const artistDetails = this.props.artistDetails;
        if(artistDetails.code === 1) {
            this.props.history.replace('/artist/orderManagement/newPOs');
        }
    }

    componentDidUpdate(prevProps){
        
        console.log(prevProps, this.props)
        if(prevProps.loggingIn && !this.props.loggingIn) {

            const artistDetails = this.props.artistDetails;
            if(artistDetails.code === 1) {
                this.props.history.replace('/artist/orderManagement/newPOs');
            }
            else {
                const message = (artistDetails.message ? artistDetails.message : 'Login Failed');
                this.setState({
                    loginError: message
                });
            }
        }
    }

    inputChangeHandler = (event, type) => {
        console.log(event.target.value, type);
        const value = event.target.value;
        this.setState({
            [type]: value
        });
    }

    loginHandler = () => {

        const email = this.state.email;
        const password = this.state.password;
        let emailMessage = '';
        let passwordMessage = '';
        if(!email.includes('@') || !email.includes('.com')) {
            emailMessage = 'Invalid Email';
        }
        if(password.trim().length === 0) {
            passwordMessage = 'Invalid Password';
        }

        if(!emailMessage && !passwordMessage) {
            // login
            this.setState({
                emailError: emailMessage,
                passwordError: passwordMessage
            });
        }
        else {
            this.setState({
                emailError: emailMessage,
                passwordError: passwordMessage
            });
        }

        if(email === 'jkumar@kabloomcorp.com' && password === 'artist123') {
            this.props.login({ email: email, password: password });
        }
        else {
            this.setState({
                loginError: 'Email and Password not matching'
            });
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
                <section className="col-lg-12" style={{ paddingTop: '5%' }}>
                    <div className="card col-lg-3" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="card-body" style={{ marginTop: '15px', marginBottom: '20px' }}>
                            <div className='col-lg-12' style={{ margin: 0, padding: 0 }}>
                                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                    <img src={logo} alt="FUNKAR LOGO" />
                                </div>
                            </div>  
                            <div className='col-lg-12'>
                                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ textAlign: 'center' }}>
                                    <span className="text-success" style={{ fontWeight: 'bolder' }}>ARTIST LOGIN</span>
                                </div>
                                {
                                    this.state.loginError ? 
                                    <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ textAlign: 'center' }}>
                                        <span className="text-danger" style={{ fontSize: '12px' }}>{ this.state.loginError }</span>
                                    </div> : null 
                                }
                            </div>
                            <div className='col-lg-12 container-spacing-lg'>
                                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                    <input type="text" className="form-control" placeholder="Your Email" value={this.state.email} onChange={ (event) => this.inputChangeHandler(event, 'email')} />
                                </div>
                                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                    <span className="text-danger" style={{ fontSize: '12px' }}>{ this.state.emailError}</span>
                                </div>
                            </div>
                            <div className='col-lg-12 container-spacing-lg'>
                                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                    <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={ (event) => this.inputChangeHandler(event, 'password')} />
                                </div>
                                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                    <span className="text-danger" style={{ fontSize: '12px' }}>{ this.state.passwordError}</span>
                                </div>
                            </div>
                            <div className='col-lg-12 container-spacing-lg'>
                                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                    <button className="btn btn-outline-success btn-block" onClick={ this.loginHandler }>Login</button>
                                </div>
                            </div>
                            <div className='col-lg-12 container-spacing'>
                                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ fontSize: '12px', textAlign: 'center' }}>
                                    <span>Not registered? </span>
                                    <Link className="text-success" to="/vendor-registration">Register New Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        data,
        isFetching: isLoading,
        error: vendorArtistError,
        loggingIn,
        artistDetails
    } = vendorArtistsReducer || [];

  
    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        data,
        isLoading,
        error,
        loggingIn,
        artistDetails
    };
  };

  const mapDispatchToProps = dispatch => ({
    login: data => dispatch(vendorActions.login(data)),
  });
export default connect(mapStateToProps, mapDispatchToProps)(ArtistLogin);