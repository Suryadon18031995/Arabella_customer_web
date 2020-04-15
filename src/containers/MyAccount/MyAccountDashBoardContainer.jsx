/* eslint-disable class-methods-use-this */
import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import Dashboard from '../../components/MyAccount/MyAccountDashboard.jsx';
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
        
      //  this.props.getuserProfileData({
        //    apiToken: _get(_get(this.props.loginData, '[0].result'), 'api_token'),
        //});
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            profileData: _get(nextProps, 'userProfileData'),
        });
    }
    render() {
        console.log(this.props);
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        return (
            <div>
               <br/><br/>
                <div className="container" >
                    <div className='container-block'>
                      
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <OneColumLeft
                            />
                        </div>
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <ErrorBoundary>
                                <Dashboard
                                    loginData={_get(this.props.loginData, '[0].result')}
                                    userData={_get(this.state.profileData, 'result.[0]')}
                                    profielData={this.state.profileData}
                                    billingData={_get(this.state.profileData, 'default_billing_address')}
                                    shippingData={_get(this.state.profileData, 'default_shipping_address')}
                                    ratingData={_get(this.state.profileData, 'rating')}
                                    tagData={_get(this.state.profileData, 'tag')}
                                    successMessage={_get(this.props, 'location.state.message')}
                                />
                            </ErrorBoundary>
                        </div>
                    </div >
                </div>
                <hr className="blue-hr"></hr>
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
