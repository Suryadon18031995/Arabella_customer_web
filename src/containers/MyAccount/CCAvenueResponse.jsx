import React, { Component } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
// import CryptoJS from 'crypto-js';
// import axios from 'axios';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import { fetchAllAddressData, setAddrId } from '../../actions/address';
import { fetchFirstCartData } from '../../actions/cart';
import { SubscriptionLoader } from '../../components/Loader/Loader.jsx';
import {
    // getSubscriptionHelperDetails,
    fetchPlaceOrderData,
    clearPlaceOrderReducer,
    fetchPaymentMethodInfo,
    addFirstDataCreditCard,
    addPaypalCreditCard,
    getSavedCardDetails,
    getOrderId,
    getBraintreeClientToken,
} from '../../actions/placeOrder';
import { upgradePrimeMembershipData } from '../../actions/myOrder';
// import { handleValidation } from '../../helpers/checkoutValidation.jsx';
// import { mapPaypalData, mapfirstData, mapAuthorizeNetData, mapBraintreeData, mapCCAvenueData } from '../../utils/commonMapper';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class CCAvenueResponseHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentRes: {},
            amount: 0,
            rewardPointsUsed: 0,
            rewardsChecked: false,
            minReward: 0,
            maxReward: 100,
            earnPoints: 0,
            pointBalance: 0,
            enableSpendPoint: false,
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'CHECKOUT',
                },
            ],
            payMethod: undefined,
            cartType: _get(this.props.cartType, 'cartType'),
            addrId: this.props.addrId,
            paymentType: 'firstdataglobalgateway',
            showCheckoutSuccess: false,
            errors: {},
            checked: true,
            country: 'US',
            expandIndex: 1,
            showCredit: false,
            expirymonth: undefined,
            expiryyear: undefined,
            ccNum: undefined,
            thisYear: (new Date()).getFullYear(),
            tokenize: false,
            // transactionType: _get(this.props.cartType, 'cartType'),
            transactionType: undefined,
            showShipAddress: true,
            showCards: true,
            currencyCode: 'USD',
            cartId: this.props.cartId,
            transactions: [
                {
                    amount: {
                        total: this.checkoutTotal,
                        currency: 'USD',
                    },
                    invoice_number: this.reservedOrderId,
                },
            ],
            showRadio: undefined,
            showNewCard: undefined,
            productionIds: '',
            cycles: '',
            couponCode: '',
            discount: '',
            feeAmount: '',
            placeOrderAmount: 0,
            savedCardsFirstdata: [],
            savedCardsAuthorizenet: [],
        };
    }

    componentDidMount() {
        document.title = 'Checkout Success';

        const abc = "?id=100025283&amount=99.99&status=Success";

        console.log(this.QueryStringToJSON(abc.slice(1)));
        this.setState({
            paymentRes: this.QueryStringToJSON(abc.slice(1)),
        });
    }

    QueryStringToJSON = (data) => {            
        let pairs = data.split('&');
        
        let result = {};
        pairs.forEach((pair) => {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
    
        return JSON.parse(JSON.stringify(result));
    }
    
    render() {
        // console.log(this.props.braintreeClientToken);
        if (_get(this, 'props.isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <SubscriptionLoader type={_get(this.props, 'cartType', '')} actionType={_get(this.props, 'actionType', '')} />
                </div>
            );
        }
        if (_get(this.state, 'showCheckoutSuccess')) {
            return <Redirect push to={{
                pathname: '/checkout/onepage/success',
                state: { orderId: this.state.orderId, productIds: this.state.productIds, placeOrderAmount: this.state.placeOrderAmount },
            }} />;
        }
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        console.log('props:', this.props);
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">
                    <div ref={this.abc} />
                    <ErrorBoundary>
                    Hey!
                    {this.props.location.pathname.toLowerCase() === '/ccavenuecancelhandler' ? <div>You cancelled your payment</div> : ''} 
                    {this.state.paymentRes ? <div>
                        <div>Order Id: {_get(this.state.paymentRes, 'id')}</div>
                        <div>Order Status: {_get(this.state.paymentRes, 'status')}</div>
                        <div>Amount: {_get(this.state.paymentRes, 'amount')}</div>
                    </div> : null}
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getAllAddressData: data => dispatch(fetchAllAddressData(data)),
    getCartData: data => dispatch(fetchFirstCartData(data)),
    getPlaceOrder: data => dispatch(fetchPlaceOrderData(data)),
    clearPlaceOrderData: () => { dispatch(clearPlaceOrderReducer()); },
    getPaymentMethodInfo: data => dispatch(fetchPaymentMethodInfo(data)),
    setAddrId: data => dispatch(setAddrId(data)),
    // getSubscriptionHelp: data => dispatch(getSubscriptionHelperDetails(data)),
    addFirstDataCreditCard: (data, url) => dispatch(addFirstDataCreditCard(data, url)),
    addPaypalCreditCard: data => dispatch(addPaypalCreditCard(data)),
    getSavedCardData: data => dispatch(getSavedCardDetails(data)),
    getOrderId: data => dispatch(getOrderId(data)),
    upgradePrimeMembershipData: data => dispatch(upgradePrimeMembershipData(data)),
    getBraintreeClientToken: () => dispatch(getBraintreeClientToken()),
});

const mapStateToProps = (state) => {
    const {
        loginReducer, allAddressReducer, cartReducer, placeOrderReducer,
    } = state;

    const {
        apiToken,
        currencyCode,
        storeId,
        error: loginError,
        cartId,
        primeUser,
        demoExpired,
    } = loginReducer || [];

    const {
        allAddressData,
        addrId,
        error: addressError,
    } = allAddressReducer || [];

    const {
        firstCartData,
        cartType,
        error: cartError,
    } = cartReducer || [];

    const {
        placeOrderData,
        paymentMethodInfoData,
        paypalCreditCardRes,
        firstDataCreditCardRes,
        isFetching: isLoading,
        savedCardResult,
        orderIdData,
        error: placeOrderError,
        type: actionType,
        braintreeClientToken,
    } = placeOrderReducer || [];

    const error = !_isEmpty(placeOrderError) || _isError(placeOrderError) || !_isEmpty(cartError) || _isError(cartError) || !_isEmpty(addressError) || _isError(addressError) || !_isEmpty(loginError) || _isError(loginError);
    return {
        apiToken,
        currencyCode,
        allAddressData,
        storeId,
        firstCartData,
        placeOrderData,
        paymentMethodInfoData,
        isLoading,
        cartType,
        addrId,
        paypalCreditCardRes,
        firstDataCreditCardRes,
        savedCardResult,
        orderIdData,
        error,
        cartId,
        primeUser,
        demoExpired,
        actionType,
        braintreeClientToken,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(CCAvenueResponseHandler));
