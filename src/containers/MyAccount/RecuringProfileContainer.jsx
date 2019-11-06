import React, { Component } from 'react';
import _get from 'lodash/get';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import Loader from '../../components/Loader/Loader.jsx';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import RecuringProfileTable from '../../components/MyAccount/RecuringProfileComponent.jsx';
import { fetchRecurringProfileData } from '../../actions/recurringProfiles';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class RecuringProfileContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recuringProfile: undefined,
            redirectToProfileDetailsPage: false,
            profileId: undefined,
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

    handleProfileIdClick = (row) => {
        this.setState({
            profileId: row.profile_id,
            redirectToProfileDetailsPage: true,
        });
    }

    componentWillMount() {
        document.title = 'Recurring Profiles';
        this.props.getRecuringProfileData({
            apiToken: this.props.apiToken,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(nextProps.recurringProfileData)) {
            if (_get(nextProps.recurringProfileData, 'status') === 'true') {
                this.setState({
                    recuringProfile: _get(nextProps.recurringProfileData, 'data'),
                });
            }
        }
    }

    render() {
        if (this.state.redirectToProfileDetailsPage) {
            return <Redirect push to={{
                pathname: '/profileDetail',
                state: { profileId: this.state.profileId },
            }} />;
        }

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
                            <div className="my-account">
                                <div className="page-title">
                                    <h1>Recurring Profiles</h1>
                                </div>
                                <div className="recurring-profiles">
                                    <ErrorBoundary>
                                        <RecuringProfileTable recuringProfile={this.state.recuringProfile}
                                            handleProfileIdClick={this.handleProfileIdClick} />
                                    </ErrorBoundary>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getRecuringProfileData: data => dispatch(fetchRecurringProfileData(data)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(RecuringProfileContainer));
