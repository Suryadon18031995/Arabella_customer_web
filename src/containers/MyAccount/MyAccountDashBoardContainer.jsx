/* eslint-disable class-methods-use-this */
import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import Dashboard from '../../components/MyAccount/MyAccountDashboard.jsx';
import '../../assets/stylesheets/seasonal.less';
import { fetchProfileData } from '../../actions/login';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import lazyLoader from '../../assets/images/lazy-loader.gif';

class MyAccountDashBoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        document.title = 'My Account';
        this.props.getuserProfileData({
            apiToken: _get(_get(this.props.loginData, '[0].result'), 'api_token'),
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            profileData: _get(nextProps, 'userProfileData'),
        });
    }
    render() {
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container" >
                    <div className='container-block'>
                        {!_get(this.state.profileData, 'result.[0]') &&
                            < span className="infinite-loader-class wholepageLoader" >
                                <img
                                    className="loaderContainer"
                                    src={lazyLoader}
                                    alt="lazy-loader"
                                />
                            </span>
                        }
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <OneColumLeft
                                salesRepUser={this.props.salesRepUser}
                                primeUser={this.props.primeUser}
                                rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                            />
                        </div>
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <ErrorBoundary>
                                <Dashboard
                                    logingData={_get(this.props.loginData, '[0].result')}
                                    userData={_get(this.state.profileData, 'result.[0]')}
                                    profielData={this.state.profileData}
                                    billingData={_get(this.state.profileData, 'default_billing_address')}
                                    shippingData={_get(this.state.profileData, 'default_shipping_address')}
                                    ratingData={_get(this.state.profileData, 'rating')}
                                    tagData={_get(this.state.profileData, 'tag')}
                                    successMessage={_get(this.props, 'location.state.message')}
                                    primeUser={this.props.primeUser}
                                    rewardsPointDetails={_get(this.props.userProfileData, 'rewardspoin_details')}
                                />
                            </ErrorBoundary>
                        </div>
                    </div >
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    getuserProfileData: data => dispatch(fetchProfileData(data)),
});
const mapStateToProps = (state) => {
    const { loginReducer } = state;

    const {
        loginData,
        salesRepUser,
        userProfileData,
        error: loginError,
        apiToken,
        primeUser,
    } = loginReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError);

    return {
        loginData,
        salesRepUser,
        userProfileData,
        error,
        apiToken,
        primeUser,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(MyAccountDashBoardContainer));
