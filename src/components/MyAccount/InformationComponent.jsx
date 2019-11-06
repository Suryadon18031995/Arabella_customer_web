import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';

export default function TrackOrderComponent(props) {
    return (
        <div className="container">
            <div className="col-md-3 col-sm-4 col-xs-12">
                <OneColumLeft
                    salesRepUser={props.salesRepUser}
                    primeUser={props.primeUser}
                    rewardsPointAmount={_get(props, ['rewardsPointAmount'], 0)}
                />
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">
                <div className="edit-account">
                    <div className="edit-title">
                        <div className="edit-title-head"><h1>Edit Account Information</h1></div>
                    </div>
                    <div className="box-account-content">
                        {props.state.showInvalidPassword &&
                            <ul className="inv-pass-messages">
                                <li className="inv-pass-error-msg">
                                    <ul>
                                        <li><i className="fa fa-warning"></i><span>Invalid current password</span></li>
                                    </ul>
                                </li>
                            </ul>
                        }
                        <div>
                            <h2>Account Information</h2>
                            <ul>
                                <li>
                                    <div>
                                        <div className="fname-accountinfo">
                                            <label><em>*</em>First Name</label>
                                            <div>
                                                <input className="edit-input" type="text" id="firstName" name="firstName" value={props.state.firstName} onChange={props.handleChange} />
                                                <span style={{ color: 'red' }}>{_get(props.state, 'errors.firstName')}</span>
                                            </div>
                                        </div>
                                        <div className="mname-accountinfo">
                                            <label>Middle Name/Initial</label>
                                            <div>
                                                <input className="edit-input" type="text" id="middleName" name="middleName" value={props.state.middleName} onChange={props.handleChange} />
                                                <span style={{ color: 'red' }}>{_get(props.state, 'errors.middleName')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="lname-accountinfo">
                                        <label><em>*</em>Last Name</label>
                                        <div>
                                            <input className="edit-input" type="text" id="lastName" name="lastName" value={props.state.lastName} onChange={props.handleChange} />
                                            <span style={{ color: 'red' }}>{_get(props.state, 'errors.lastName')}</span>
                                        </div>
                                    </div>
                                </li>
                                <li><div className="email-accountinfo">
                                    <label><em>*</em>Email Address</label>
                                    <div>
                                        <input className="edit-input" type="email" name="email" id="email" value={props.state.email} onChange={props.handleChange} />
                                        <span style={{ color: 'red' }}>{_get(props.state, 'errors.email')}</span>
                                    </div>
                                </div>
                                </li>
                                <li>
                                    <input type="checkbox" defaultChecked={props.isCheckboxCheck} name="change_password" id="change_password" onChange={props.handleCheck} />
                                    <label>Change Password</label>
                                </li>
                            </ul>
                        </div>
                        {props.state.checked &&
                            <div>
                                <h2>Change Password</h2>
                                <ul>
                                    <li>
                                        <label><em>*</em>Current Password</label>
                                        <div className="email-accountinfo">
                                            <input className="edit-input" type="password" title="Current Password" name="currentPassword" id="currentPassword" value={props.state.currentPassword} onChange={props.handleChange} />
                                            <span style={{ color: 'red' }}>{_get(props.state, 'errors.currentPassword')}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="new-password">
                                            <label><em>*</em>New Password</label>
                                            <div>
                                                <input className="edit-input" type="password" title="New Password" name="newPassword" id="newPassword" value={props.state.newPassword} onChange={props.handleChange} />
                                                <span style={{ color: 'red' }}>{_get(props.state, 'errors.newPassword')}</span>
                                            </div>
                                        </div>
                                        <div className="confirm-password">
                                            <label><em>*</em>Confirm New Password</label>
                                            <div>
                                                <input className="edit-input" type="password" title="Confirm New Password" name="confirmation" id="confirmation" value={props.state.confirmation} onChange={props.handleChange} />
                                                <span style={{ color: 'red' }}>{_get(props.state, 'errors.confirmation')}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        }
                        <div className="edit-btn">
                            <p className="backbtn"><a href="/customer/account/">Back</a></p>
                            <div className="submitbtn">
                                <Button type="submit" className="save" title="Save" onClick={props.editAccount}><span><span>Save</span></span></Button></div>
                            <p className="edit-req">* Required Fields</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
