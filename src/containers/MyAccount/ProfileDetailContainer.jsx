import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _get from 'lodash/get';
import Redirect from 'react-router/Redirect';
import Loader from '../../components/Loader/Loader.jsx';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import { fetchRecurringProfileDetail, fetchRecurringProfileUpdate } from '../../actions/recurringProfiles';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class ProfileDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileId: _get(this.props, 'history.location.state.profileId'),
            recuringProfile: undefined,
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

    UNSAFE_componentWillMount() {
        this.props.getRecuringProfileDetail({
            apiToken: this.props.apiToken,
            profileId: this.state.profileId,
        });
    }

    handleUpdate = () => {
        this.props.getRecuringProfileUpdate({
            apiToken: this.props.apiToken,
            profileId: this.state.profileId,
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(nextProps.recurringProfileData)) {
            if (_get(nextProps.recurringProfileData, 'status') === 'true') {
                this.setState({
                    recuringProfile: _get(nextProps.recurringProfileData, 'data'),
                });
            }
        }
    }

    handleClick = () => {
        this.props.history.push('/customer/account/recuring_profile');
    };

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

        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">
                    <div className='container-block'>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <ErrorBoundary>
                                <OneColumLeft
                                    salesRepUser={this.props.salesRepUser}
                                    primeUser={this.props.primeUser}
                                    rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                                />
                            </ErrorBoundary>
                        </div>
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            {Array.isArray(this.state.recuringProfile) &&
                                this.state.recuringProfile.map((recuringProfileDetail, index) => (
                                    <div className="my-account" key={index}>
                                        <div className="page-title">
                                            <h1>Recurring Profiles #{_get(recuringProfileDetail, 'payment_referene_id')}<button className="get-update" onClick={this.handleUpdate} >get Update</button></h1>
                                        </div>
                                        <div className="recurring-profiles">
                                            <dl className="order-info">
                                                <dt>About This Profile:</dt>
                                                <dd>
                                                    <ul id="order-info-tabs">
                                                        <li className="current"><strong>Profile Information</strong></li>
                                                        <li><a href="">Related Orders</a></li>
                                                    </ul>
                                                </dd>
                                            </dl>

                                            <div className="col2-set order-info-box">
                                                <div className="col-1">
                                                    <div className="info-box">
                                                        <div className="box-title">
                                                            <h2>Reference</h2>
                                                        </div>
                                                        <div className="box-content">
                                                            <table className="info-table">
                                                                <tbody>
                                                                    <tr><th>Payment Method:</th><td>{_get(recuringProfileDetail, 'payment_method')}</td></tr>
                                                                    <tr><th>Payment Reference ID:</th><td>{_get(recuringProfileDetail, 'payment_referene_id')}</td></tr>
                                                                    <tr><th>Schedule Description:</th><td>{_get(recuringProfileDetail, 'schedule_description')}</td></tr>
                                                                    <tr><th>Profile State:</th><td>{_get(recuringProfileDetail, 'profile_state')}</td></tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-1">
                                                    <div className="info-box">
                                                        <div className="box-title">
                                                            <h2>Purchased Item</h2>
                                                        </div>
                                                        <div className="box-content">
                                                            <table className="info-table">
                                                                <tbody>
                                                                    <tr><th>Product Name:</th><td>{_get(recuringProfileDetail, 'purchased_item.name')}</td></tr>
                                                                    <tr><th>SKU:</th><td>{_get(recuringProfileDetail, 'purchased_item.sku')}</td></tr>
                                                                    <tr><th>Quantity:</th><td>{_get(recuringProfileDetail, 'purchased_item.qty')}</td></tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col2-set order-info-box">
                                                <div className="col-1">
                                                    <div className="info-box">
                                                        <div className="box-title">
                                                            <h2>Profile Schedule</h2>
                                                        </div>
                                                        <div className="box-content">
                                                            <table className="info-table">
                                                                <tbody>
                                                                    <tr><th>Start Date:</th><td>{_get(recuringProfileDetail, 'start_datetime')}</td></tr>
                                                                    {/* <tr><th>Maximum Payment Failures:</th><td>I-P785MBMAYWEG</td></tr> */}
                                                                    {/* <tr><th>Billing Period:</th><td>Hydrangea Elite Dark Green Emerald QB</td></tr> */}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-1">
                                                    <div className="info-box">
                                                        <div className="box-title">
                                                            <h2>Profile Payments</h2>
                                                        </div>
                                                        <div className="box-content">
                                                            <table className="info-table">
                                                                <tbody>
                                                                    <tr><th>Currency:</th><td>{_get(recuringProfileDetail, 'profile_payment.currency_code')}</td></tr>
                                                                    <tr><th>Billing Amount:</th><td>{_get(recuringProfileDetail, 'profile_payment.billing_amount')}</td></tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col2-set order-info-box">
                                                <div className="col-1">
                                                    <div className="info-box">
                                                        <div className="box-title">
                                                            <h2>Billing Address</h2>
                                                        </div>
                                                        <div className="box-content">
                                                            <address>{_get(recuringProfileDetail, 'billing_address_info.firstname')} &nbsp; {_get(recuringProfileDetail, 'billing_address_info.lastname')}<br />
                                                                {_get(recuringProfileDetail, 'billing_address_info.company')}<br /> {_get(recuringProfileDetail, 'billing_address_info.street')}<br />
                                                                {_get(recuringProfileDetail, 'billing_address_info.city')},  {_get(recuringProfileDetail, 'billing_address_info.region')}, {_get(recuringProfileDetail, 'billing_address_info.postcode')}<br />
                                                                {_get(recuringProfileDetail, 'billing_address_info.country_id')}<br /> T: {_get(recuringProfileDetail, 'billing_address_info.telephone')}<br />
                                                            </address>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-1">
                                                    <div className="info-box">
                                                        <div className="box-title">
                                                            <h2>Shipping Address</h2>
                                                        </div>
                                                        <div className="box-content">
                                                            <address>{_get(recuringProfileDetail, 'shipping_address_info.firstname')} &nbsp; {_get(recuringProfileDetail, 'shipping_address_info.lastname')}<br />
                                                                {_get(recuringProfileDetail, 'shipping_address_info.company')}<br /> {_get(recuringProfileDetail, 'shipping_address_info.street')}<br />
                                                                {_get(recuringProfileDetail, 'shipping_address_info.city')},  {_get(recuringProfileDetail, 'shipping_address_info.region')}, {_get(recuringProfileDetail, 'shipping_address_info.postcode')}<br />
                                                                {_get(recuringProfileDetail, 'shipping_address_info.country_id')}<br /> T: {_get(recuringProfileDetail, 'shipping_address_info.telephone')}<br />
                                                            </address>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            <button className="back-link" onClick={this.handleClick}>Back to Recurring Profiles</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getRecuringProfileDetail: data => dispatch(fetchRecurringProfileDetail(data)),
    getRecuringProfileUpdate: data => dispatch(fetchRecurringProfileUpdate(data)),
});

const mapStateToProps = (state) => {
    const { recurringProfileReducer, loginReducer } = state;


    const {
        apiToken,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        recurringProfileData,
        isFetching: isLoading,
        error: recurringProfileError,
    } = recurringProfileReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(recurringProfileError) || _isError(recurringProfileError);

    return {
        recurringProfileData,
        isLoading,
        apiToken,
        salesRepUser,
        error,
        primeUser,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ProfileDetailContainer));
