import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import Loader from '../../components/Loader/Loader.jsx';
import RewardsComponent from '../../components/MyAccount/RewardsComponent.jsx';
import { fetchMyRewardsData } from '../../actions/accountInformation';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class MyRewardsContainer extends Component {
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
            mode: 'rewards',
            rewardsData: [],
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

    componentDidMount() {
        document.title = 'My Rewards';
        this.props.getRewardsData({ apiToken: this.props.apiToken });
        if (_get(this.props, ['location', 'pathname']) === '/customer/account/rewards/points') {
            this.setState({ mode: 'points' });
        } else if (_get(this.props, ['location', 'pathname']) === '/customer/account/rewards/settings') {
            this.setState({ mode: 'settings' });
        } else {
            this.setState({ mode: 'rewards' });
        }
    }

    componentDidUpdate(prevProps) {
        if (_get(prevProps, ['location', 'pathname']) !== _get(this.props, ['location', 'pathname'])) {
            if (_get(this.props, ['location', 'pathname']) === '/customer/account/rewards/points') {
                this.setState({ mode: 'points' });
            } else if (_get(this.props, ['location', 'pathname']) === '/customer/account/rewards/settings') {
                this.setState({ mode: 'settings' });
            } else {
                this.setState({ mode: 'rewards' });
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'myRewardsData'))) {
            if (_get(nextProps.myRewardsData, 'code') === 1) {
                this.setState({
                    rewardsData: _get(nextProps, 'myRewardsData'),
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
                            <RewardsComponent
                                mode={this.state.mode}
                                rewardsData={this.state.rewardsData}
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
    getRewardsData: data => dispatch(fetchMyRewardsData(data)),
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
        myRewardsData,
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
        myRewardsData,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(MyRewardsContainer));
