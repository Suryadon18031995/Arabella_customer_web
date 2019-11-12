import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _orderBy from 'lodash/orderBy';
import { Redirect } from 'react-router';
import SalesRepComponent from '../../components/MyAccount/salesRepComponent.jsx';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import { fetchSalesRepData, fetchSalesRepStoreData } from '../../actions/salesRep';
import { fetchSalesRepLoginData } from '../../actions/login';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { clearCartReducer } from '../../actions/cart';

class SalesRepsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: undefined,
            salesRepLen: undefined,
            redirectToListing: false,
            // salesRepFlag: _get(props, 'history.location.state.salesRep'),
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
    handleClick = (row) => {
        this.props.getSalesRepStoreData({
            apiToken: this.props.apiToken,
            salesRepId: row.sales_rep_id,
        });
    };

    reload = () => {
        this.props.getSalesRepData({ apiToken: this.props.apiToken });
    }

    handleStoreClick = (row) => {
        this.props.getSalesRepLoginData({
            apiToken: this.props.apiToken,
            salesRepId: row.sales_rep_id,
            salesRepStoreId: row.sales_rep_store_id,
            // primarySalesRep: this.props.salesRepUser === 'yes' ? 'ture' : false, // "salesRepId": "5211",
            // "salesRepStoreId": "11114"
        });
        this.props.clearCartReducer();
        // this.setState({
        //     redirectToListing: true,
        // });
    };

    UNSAFE_componentWillMount() {
        this.props.getSalesRepData({ apiToken: this.props.apiToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type === 'RECEIVED_SALESREP_LOGIN' && (!nextProps.loginLastUpdated || (nextProps.loginLastUpdated > nextProps.salesLastUpdated))) {
            this.setState({
                redirectToListing: true,
                // salesRepFlag: true,
            });
        }
        if (!_isEmpty(_get(nextProps, 'salesRepInfo'))) {
            let result = _get(nextProps.salesRepInfo, 'data');
            result = _orderBy(result, [user => user.name && user.name.toLowerCase().trim()], 'asc');
            this.setState({
                result,
                salesRepLen: nextProps.salesRepInfo.data && nextProps.salesRepInfo.data.length,
            });
        }
    }

    render() {
        if (this.state.redirectToListing) {
            return <Redirect push to="/wholesale-flowers.html" />;
        }

        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }

        if (_get(this, 'props.isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }

        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <ErrorBoundary>
                    <SalesRepComponent
                        state={this.state}
                        handleClick={this.handleClick}
                        handleStoreClick={this.handleStoreClick}
                        reload={this.reload}
                    >
                    </SalesRepComponent>
                </ErrorBoundary>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getSalesRepData: data => dispatch(fetchSalesRepData(data)),
    getSalesRepStoreData: data => dispatch(fetchSalesRepStoreData(data)),
    getSalesRepLoginData: data => dispatch(fetchSalesRepLoginData(data)),
    clearCartReducer: () => dispatch(clearCartReducer()),
});

const mapStateToProps = (state) => {
    const { salesRepReducer, loginReducer } = state;

    const {
        salesRepInfo,
        // isFetching: isLoading,
        error: salesRepError,
        type: salesRepType,
        lastUpdated: salesLastUpdated,
    } = salesRepReducer || [];

    const {
        loginData,
        apiToken,
        error: loginError,
        // salesRepUser,
        type,
        isFetching: isLoading,
        lastUpdated: loginLastUpdated,
    } = loginReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(salesRepError) || _isError(salesRepError);

    return {
        salesRepInfo,
        loginData,
        isLoading,
        apiToken,
        error,
        type,
        salesRepType,
        salesLastUpdated,
        loginLastUpdated,
        // isFetching,
        // salesRepUser,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(SalesRepsContainer));
