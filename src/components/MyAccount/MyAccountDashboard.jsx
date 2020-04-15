/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
// import workinprogress from '../../assets/images/workinprogress.gif';
import Panel from 'react-bootstrap/lib/Panel';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListGroup from 'react-bootstrap/lib/ListGroup';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import Link from 'react-router-dom/Link';
import StarRatings from '../../components/Common/Rating.jsx';

const MyAccountDashboard = props => (
   // console.log(props);
    <div>
        <Panel className="defaultPanel">
            <Panel.Heading className="panelHeading"><h1> My Dashboard</h1></Panel.Heading>
            {props.successMessage &&
                <ul className="edit-messages">
                    <li className="edit-success-msg">
                        <ul>
                            <li><span className="fa fa-check"></span><span>The account information has been saved.</span></li>
                        </ul>
                    </li>
                </ul>
            }
            <Panel.Body className="panelBody">
                <h5><p>Hello, <b>{_get(props.loginData, 'fname')}{' '}{_get(props.loginData, 'lname')}{' '}!</b></p></h5>
                <p>From your My Account Dashboard, you have the ability to view a snapshot of your recent account activity and update your account information.</p>
                <p className="primary">Select a link below to view or edit information.</p>
            </Panel.Body>
        </Panel>
        <Panel className="defaultPanel">
            <Panel.Heading className="panelHeading"><h2>Account Information</h2></Panel.Heading>
            <Panel.Body className="panelBody">
                <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                    <div className="col-md-6">
                        <div className="box">
                            <div className="box-title">
                                <h3 className="col-md-9">Contact Information</h3>
                                <Link className="col-md-3" style={{ marginTop: '23px' }} to="/customer/account/edit">Edit</Link>
                            </div>
                            <div className="box-content col-md-12">
                                <p>{_get(props.loginData, 'fname')}{' '}{_get(props.loginData, 'lname')}<br />{_get(props.loginData, 'email')}<br /></p>
                                <p className="change-pass">
                                    <Link
                                        className="btn btn-primary customButton"
                                        to={{
                                            pathname: '/customer/account/edit',
                                            editPassword: {
                                                changepass: 1,
                                                customerID: _get(props.loginData, 'customer_id', ''),
                                            },
                                        }}
                                    >
                                        Change Password
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                    <div className="box-title col-md-12">
                        <h3 className="address-book col-md-12">Address Book</h3>
                    </div>
                    <div className="box-content">
                        <div className="col-md-6">
                            <h4 className="col-md-8">Default Billing Address</h4>
                            <Link
                                style={{ marginTop: '10px' }}
                                className="col-md-4"
                                // to='/customer/account/address'
                                to={{
                                    pathname: '/customer/account/address',
                                    query: {
                                        billingAddress: 1,
                                        customerID: _get(props.loginData, 'customer_id', ''),
                                        shippingAddress: 0,
                                    },
                                }}
                            >
                                Edit Address
                            </Link>
                            {props.billingData &&
                                <address className="col-md-12">
                                    <b>{_get(props.billingData, 'company')}</b><br />
                                    {_get(props.billingData, 'street')}<br />
                                    {_get(props.billingData, 'city')},{' '}{_get(props.billingData, 'region')},{' '}
                                    {_get(props.billingData, 'postcode')}<br />
                                    {_get(props.billingData, 'country_id')}<br />
                                    T: {_get(props.billingData, 'telephone')}
                                </address>
                            }
                        </div>
                        <div className="col-md-6">
                            <h4 className="col-md-8">Default Shipping Address</h4>
                            <Link
                                style={{ marginTop: '10px' }}
                                className="col-md-4"
                                // to='/customer/account/address'
                                to={{
                                    pathname: '/customer/account/address',
                                    query: {
                                        shippingAddress: 1,
                                        customerID: _get(props.logingData, 'customer_id', ''),
                                        billingAddress: 0,
                                    },
                                }}
                            >
                                Edit Address
                            </Link>
                            {props.shippingData &&
                                <address className="col-md-12">
                                    <b>{_get(props.shippingData, 'company')}</b><br />
                                    {_get(props.shippingData, 'street')}<br />
                                    {_get(props.shippingData, 'city')},{' '}
                                    {_get(props.shippingData, 'region')},{' '}
                                    {_get(props.shippingData, 'postcode')}<br />
                                    {_get(props.shippingData, 'country_id')}<br />
                                    T: {_get(props.shippingData, 'telephone')}
                                </address>
                            }
                        </div>
                        <div className="col-md-12">
                            <Link
                                className="btn btn-primary customButton"
                                to='/customer/account/address'
                            >
                                Manage Addresses
                            </Link>
                        </div>
                    </div>
                </div>
            </Panel.Body>
        </Panel>
     
      
    </div >
);

export default MyAccountDashboard;
