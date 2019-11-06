import React, { Component } from 'react';
import _get from 'lodash/get';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';

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

class PayPalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentStatus: undefined,
            transId: undefined,
            invoiceNumber: undefined,
            paypalType: undefined,
        };
    }

    componentWillMount() {
        const queryString = window.location.hash;
        // console.log('paypalRes', queryString);
        if (queryString) {
            const paymentStatus = getQueryVariable('st', queryString);
            const transId = getQueryVariable('tx', queryString);
            const invoiceNumber = getQueryVariable('cm', queryString);
            const redirectPage = getQueryVariable('item_name', queryString);
            if ((paymentStatus === 'Completed') && transId && invoiceNumber) {
                this.setState({
                    showPaymentResult: true,
                    paymentStatus,
                    transId,
                    invoiceNumber,
                    redirectPage,
                });
            } else {
                this.setState({ showPaymentResult: false });
            }
        }
    }

    render() {
        if (_get(this.state, 'redirectPage') === 'normal-checkout' || _get(this.state, 'redirectPage') === 'subscription-checkout') {
            return <Redirect
                push to={{
                    pathname: '/checkout/onepage',
                    state: {
                        showPaymentResult: this.state.showPaymentResult,
                        transId: this.state.transId,
                        paymentStatus: this.state.paymentStatus,
                        paymentType: 'paypal',
                        paypalType: this.state.redirectPage,
                    },
                }} />;
        } else if (_get(this.state, 'redirectPage') === 'checkedInvoiceOrder') {
            return <Redirect
                push to={{
                    pathname: '/customer/account/orders',
                    state: {
                        showPaymentResult: this.state.showPaymentResult,
                        transId: this.state.transId,
                        paymentStatus: this.state.paymentStatus,
                        invoiceNumber: this.state.invoiceNumber,
                        paymentType: 'paypal',
                    },
                }} />;
        }
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        return (
            <div className="container">
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(PayPalContainer);
