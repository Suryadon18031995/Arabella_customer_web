import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
// import _isError from 'lodash/isError';
// import _orderBy from 'lodash/orderBy';
import { Redirect } from 'react-router';
// import SalesRepComponent from '../../components/MyAccount/salesRepComponent.jsx';
// import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import { fetchSalesRepData, fetchSalesRepStoreData } from '../../actions/salesRep';
import { fetchSalesRepLoginData, logoutFunction, clearSalesRepFlag } from '../../actions/login';
// import { logoutFunction, requestUserLogout } from '../actions/login';
import { clearCartReducer } from '../../actions/cart';
import { clearWishlistReducer } from '../../actions/wishList';
// import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import { LoaderListingPage } from '../../components/Loader/Loader.jsx';

class SalesRepHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToAccountPage: false,
        };
    }

    componentWillMount() {
        // this.props.getLogoutData({ apiToken: this.props.apiToken });
        this.props.getSalesRepLoginData({
            apiToken: this.props.salesRepToken,
            primarySalesRep: 'true',
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'loginData'))) {
            this.props.clearCartReducer();
            this.setState({
                redirectToAccountPage: true,
            });
            // if (0) {
            //     this.props.clearSalesRepFlag();
            // }
        }
    }

    render() {
        if (this.state.redirectToAccountPage) {
            return <Redirect push to={{ pathname: '/salesRep', state: { salesRep: true } }} />; // /customer/account
        }

        // if (!this.props.apiToken) {
        //     return <Redirect push to={{
        //         pathname: '/login',
        //     }} />;
        // }

        return (
            <div className="text-center">
                <LoaderListingPage />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getSalesRepData: data => dispatch(fetchSalesRepData(data)),
    getSalesRepStoreData: data => dispatch(fetchSalesRepStoreData(data)),
    getSalesRepLoginData: data => dispatch(fetchSalesRepLoginData(data)),
    clearSalesRepFlag: () => dispatch(clearSalesRepFlag()),
    getLogoutData: (data) => {
        // dispatch(requestUserLogout(data)),
        dispatch(logoutFunction()),
            dispatch(clearCartReducer()),
            dispatch(clearWishlistReducer())
    },
    clearCartReducer: () => dispatch(clearCartReducer()),
});

const mapStateToProps = (state) => {
    const { loginReducer } = state;

    const {
        loginData,
        apiToken,
        salesRepUser,
        salesRepToken,
    } = loginReducer || [];

    return {
        loginData,
        apiToken,
        salesRepUser,
        salesRepToken,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(SalesRepHead));
