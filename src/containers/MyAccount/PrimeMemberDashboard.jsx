import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _findIndex from 'lodash/findIndex';
import Redirect from 'react-router/Redirect';
import Loader from '../../components/Loader/Loader.jsx';
import PrimeMembership from '../../components/MyAccount/PrimeComponent.jsx';
import PrimeMembershipHistory from '../../components/MyAccount/PrimeOrderHistory.jsx';
import { fetchPrimeOrderData, cancelPrimeMembershipData, renewPrimeMembershipData } from '../../actions/myOrder';
import { updatePrimeValue } from '../../actions/login';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';

class PrimeMemberDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePrimeDetails: {},
            primeOrderData: [],
            showHistory: false,
            renewalEnabled: false,
            redirectToAccount: false,
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'Premium Dashboard',
                },
            ],
        };
    }

    componentDidMount() {
        document.title = 'My Premium Membership';
        this.props.fetchPrimeOrdersData({ apiToken: this.props.apiToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'primeOrdersData'))) {
            const primeOrderData = _get(nextProps, 'primeOrdersData.data');
            if (_get(primeOrderData, ['prime']) === '0') {
                this.setState({ redirectToAccount: true });
            } else {
                const activePrimeIndex = _findIndex(primeOrderData.orders, ['active', '1']);
                this.setState({
                    activePrimeDetails: _get(primeOrderData, ['orders', activePrimeIndex]),
                    primeOrderData,
                    renewalEnabled: (_get(primeOrderData, 'primeRenewal') === '1'),
                });
            }
        }
        if (!_isEmpty(_get(nextProps, 'primeCancelData'))) {
            if (_get(nextProps, 'primeCancelData.status') === 'true') {
                this.props.updatePrimeValue('0');
                window.alert('Premium Membership cancelled successfully');
                this.setState({ redirectToAccount: true });
            } else {
                window.alert('Something Went Wrong');
            }
        }
        if (!_isEmpty(_get(nextProps, 'primeRenewalData'))) {
            if (_get(nextProps, 'primeRenewalData.status') === 'true') {
                this.setState(prevState => ({ renewalEnabled: !prevState.renewalEnabled }));
            }
        }
    }

    handleShowHistory = () => {
        this.setState(prevState => ({ showHistory: !prevState.showHistory }));
    }

    handleSwitchChange = () => {
        this.props.renewPrimeMembershipData({
            apiToken: this.props.apiToken,
            renewalStatus: this.state.renewalEnabled ? 0 : 1,
        });
    }

    handleCancelClick = () => {
        const confirmation = window.confirm('Are you sure you want to cancel your Premium Membership?');
        if (confirmation) {
            this.props.cancelPrimeMembershipData({ apiToken: this.props.apiToken });
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
        if ((this.props.primeUser !== '1') || this.state.redirectToAccount) {
            return <Redirect push to={{
                pathname: '/customer/account',
            }} />;
        }
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">
                    <div className='container-block'>
                        <ErrorBoundary>
                            <div className="col-md-3 col-sm-4 col-xs-12">
                                <OneColumLeft
                                    salesRepUser={this.props.salesRepUser}
                                    primeUser={this.props.primeUser}
                                    rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                                />
                            </div>
                            <div className="col-md-9 col-sm-8 col-xs-12">
                                {this.state.showHistory ?
                                    <PrimeMembershipHistory
                                        primeOrderData={this.state.primeOrderData}
                                        handleGoBack={this.handleShowHistory} /> :
                                    <PrimeMembership
                                        activePrimeDetails={this.state.activePrimeDetails}
                                        primeOrderData={this.state.primeOrderData}
                                        renewalEnabled={this.state.renewalEnabled}
                                        handleShowHistory={this.handleShowHistory}
                                        handleSwitchChange={this.handleSwitchChange}
                                        handleCancelClick={this.handleCancelClick} />}
                            </div>
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchPrimeOrdersData: data => dispatch(fetchPrimeOrderData(data)),
    cancelPrimeMembershipData: data => dispatch(cancelPrimeMembershipData(data)),
    updatePrimeValue: data => dispatch(updatePrimeValue(data)),
    renewPrimeMembershipData: data => dispatch(renewPrimeMembershipData(data)),
});

const mapStateToProps = (state) => {
    const { loginReducer, myOrderReducer } = state;

    const {
        apiToken,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        primeOrdersData,
        isFetching: isLoading,
        error: myOrderError,
        primeCancelData,
        primeRenewalData,
    } = myOrderReducer || [];

    const error = !_isEmpty(myOrderError) || _isError(myOrderError) || !_isEmpty(loginError) || _isError(loginError);

    return {
        primeOrdersData,
        apiToken,
        salesRepUser,
        isLoading,
        error,
        primeUser,
        primeCancelData,
        primeRenewalData,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(PrimeMemberDashboard));
