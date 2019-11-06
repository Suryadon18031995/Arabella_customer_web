import React, { Component } from 'react';
import _get from 'lodash/get';
import connect from 'react-redux/lib/connect/connect';
import Redirect from 'react-router/Redirect';
import Loader from '../../components/Loader/Loader.jsx';
import { fetchPlaceOrderData, clearPlaceOrderReducer } from '../../actions/placeOrder';

function getQueryVariable(variable, queryString) {
    const query = queryString.substring(1);
    const vars = query.split('&');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < vars.length; i++) {
        // eslint-disable-next-line prefer-const
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

class FirstDataContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authCode: undefined,
            resposeText: undefined,
            transId: undefined,
            invoiceNumber: undefined,
        };
    }

    componentWillMount() {
        // this.props.clearPlaceOrderData();
        const queryString = window.location.search;
        if (queryString) {
            const authCode = getQueryVariable('x_auth_code', queryString);
            const resposeTextTemp = getQueryVariable('x_response_reason_text', queryString);
            const resposeText = resposeTextTemp && resposeTextTemp.split('+').join(' ');
            const transId = getQueryVariable('x_trans_id', queryString);
            const invoiceNumber = getQueryVariable('x_description', queryString);
            if ((resposeText.indexOf('approved') > -1) && authCode && transId && invoiceNumber) {
                this.setState({
                    showPaymentResult: true,
                    resposeText,
                    transId,
                    authCode,
                    invoiceNumber,
                });
            } else {
                this.setState({ showPaymentResult: false });
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
        if (_get(this.props, 'firstDataRedirection.showFirstDataRedirection') === 'checkout') {
            return <Redirect
                push to={{
                    pathname: '/checkout/onepage',
                    state: {
                        showPaymentResult: this.state.showPaymentResult,
                        authCode: this.state.authCode,
                        transId: this.state.transId,
                        resposeText: this.state.resposeText,
                        paymentType: 'firstdataglobalgateway',
                    },
                }} />;
        } else if (_get(this.props, 'firstDataRedirection.showFirstDataRedirection') === 'myOrder') {
            return <Redirect
                push to={{
                    pathname: '/customer/account/orders',
                    state: {
                        showPaymentResult: this.state.showPaymentResult,
                        authCode: this.state.authCode,
                        transId: this.state.transId,
                        resposeText: this.state.resposeText,
                        invoiceNumber: this.state.invoiceNumber,
                        paymentType: 'first_data',
                    },
                }} />;
        }
        return (
            <div className="container">
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getPlaceOrder: data => dispatch(fetchPlaceOrderData(data)),
    clearPlaceOrderData: () => { dispatch(clearPlaceOrderReducer()); },
});

const mapStateToProps = (state) => {
    const {
        loginReducer, placeOrderReducer,
    } = state;

    const {
        apiToken,
        currencyCode,
        cartId,
    } = loginReducer || [];

    const {
        placeOrderData,
        firstData,
        firstDataRedirection,
    } = placeOrderReducer || [];

    return {
        apiToken,
        currencyCode,
        cartId,
        placeOrderData,
        firstDataRedirection,
        firstData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstDataContainer);
