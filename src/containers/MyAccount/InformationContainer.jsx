import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import Loader from '../../components/Loader/Loader.jsx';
import InformationComponent from '../../components/MyAccount/InformationComponent.jsx';
import { fetchAccountInformationData, fetchEditAccountInformationResult } from '../../actions/accountInformation';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class InformationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            firstName: undefined,
            lastName: undefined,
            middleName: undefined,
            email: undefined,
            currentPassword: undefined,
            newPassword: undefined,
            confirmation: undefined,
            isChecked: undefined,
            redirectToAccountDashboard: false,
            errors: {},
            showInvalidPassword: false,
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'MY ACCOUNT',
                },
            ],
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    editAccount = () => {
        if (this.handleValidation()) {
            if (this.state.checked === true) {
                this.props.postEditAccountData({
                    apiToken: this.props.apiToken, firstName: this.state.firstName, middleName: this.state.middleName ? this.state.middleName : '', lastName: this.state.lastName, email: this.state.email, changePassword: 'yes', oldPassword: this.state.currentPassword, newPassword: this.state.newPassword, confirmPassword: this.state.confirmation,
                });
            } else {
                this.props.postEditAccountData({
                    apiToken: this.props.apiToken, firstName: this.state.firstName, lastName: this.state.lastName, middleName: this.state.middleName ? this.state.middleName : '', email: this.state.email, changePassword: 'no',
                });
            }
        }
    }

    handleCheck = () => {
        this.setState({ checked: !this.state.checked });
    }

    handleValidation() {
        const errors = {};
        let formIsValid = true;

        // Email
        if (this.state.email === '' || this.state.email === undefined) {
            formIsValid = false;
            errors.email = 'This is a required field.';
        }

        if (this.state.email !== undefined && this.state.email !== '') {
            const lastAtPos = this.state.email.lastIndexOf('@');
            const lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && this.state.email.length - lastDotPos > 2)) {
                formIsValid = false;
                errors.email = 'Email is not valid';
            }
        }

        // first Name
        if (this.state.firstName === '' || this.state.firstName === undefined) {
            formIsValid = false;
            errors.firstName = 'This is a required field.';
        }

        // Last Name
        if (this.state.lastName === '' || this.state.lastName === undefined) {
            formIsValid = false;
            errors.lastName = 'This is a required field.';
        }

        if (this.state.checked === true) {
            // current password
            if (this.state.currentPassword === '' || this.state.currentPassword === undefined) {
                formIsValid = false;
                errors.currentPassword = 'This is a required field';
            }

            // new Password
            if (this.state.newPassword === '' || this.state.newPassword === undefined) {
                formIsValid = false;
                errors.newPassword = 'This is a required field';
            }
            if (this.state.newPassword !== undefined && this.state.newPassword !== '') {
                if (this.state.newPassword.length < 6) {
                    formIsValid = false;
                    errors.newPassword =
                        'Please enter 6 or more characters. Leading or trailing spaces will be ignored.';
                }
            }

            // confirm Password
            if (this.state.confirmation === '' || this.state.confirmation === undefined) {
                formIsValid = false;
                errors.confirmation = 'This is a required field';
            }

            if (this.state.confirmation !== undefined && this.state.confirmation !== '') {
                if (this.state.confirmation.length < 6) {
                    formIsValid = false;
                    errors.confirmation =
                        'Please enter 6 or more characters. Leading or trailing spaces will be ignored.';
                } else // comparing new and confirm password
                    if (this.state.newPassword !== this.state.confirmation) {
                        formIsValid = false;
                        errors.confirmation = 'Please make sure your Passwords match.';
                    }
            }
        }

        this.setState({ errors });
        return formIsValid;
    }

    componentDidMount() {
        document.title = 'Account Information';
        this.props.getAccountData({ apiToken: this.props.apiToken });
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'accountInformationData'))) {
            if (_get(nextProps.accountInformationData, 'code') === 1) {
                this.setState({
                    firstName: _get(nextProps.accountInformationData, ['result', 0, 'fname']),
                    lastName: _get(nextProps.accountInformationData, ['result', 0, 'lname']),
                    email: _get(nextProps.accountInformationData, ['result', 0, 'email']),
                });
            }
        }

        if (!_isEmpty(_get(nextProps, 'editAccountInformationResult'))) {
            if (_get(nextProps.editAccountInformationResult, 'code') === 1) {
                this.setState({
                    redirectToAccountDashboard: true,
                });
            } else if (_get(nextProps, ['editAccountInformationResult', 0, 'code']) === -1) {
                this.setState({
                    showInvalidPassword: true,
                });
                alert('Invalid Current Password');
            }
        }

        const location = _get(nextProps, 'location');
        if (!_isEmpty(_get(location, 'editPassword'))) {
            if (_get(_get(location, 'editPassword'), 'changepass', false)) {
                this.handleCheck();
                this.setState({
                    checked: true,
                    isChecked: 'checked',
                });
            }
        }
    }

    render() {
        if (_get(this, 'props.isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }

        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }

        if (this.state.redirectToAccountDashboard) {
            return <Redirect push to={{
                pathname: '/customer/account',
                state: { message: true },
            }} />;
        }
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">
                    <div className='container-block'>
                        <ErrorBoundary>
                            <InformationComponent
                                state={this.state}
                                handleChange={this.handleChange}
                                editAccount={this.editAccount}
                                handleCheck={this.handleCheck}
                                isChecked={this.state.checked}
                                isCheckboxCheck={this.state.isChecked}
                                salesRepUser={this.props.salesRepUser}
                                primeUser={this.props.primeUser}
                                rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postEditAccountData: data => dispatch(fetchEditAccountInformationResult(data)),
    getAccountData: data => dispatch(fetchAccountInformationData(data)),
});

const mapStateToProps = (state) => {
    const { loginReducer, accountInformationReducer } = state;

    const {
        apiToken,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        accountInformationData,
        editAccountInformationResult,
        isFetching: isLoading,
        error: accountInformationError,
    } = accountInformationReducer || [];

    const error = !_isEmpty(accountInformationError) || _isError(accountInformationError) || !_isEmpty(loginError) || _isError(loginError);

    return {
        accountInformationData,
        editAccountInformationResult,
        apiToken,
        salesRepUser,
        isLoading,
        error,
        primeUser,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(InformationContainer));
