import React, { Component } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import JsSHA from 'jssha';
import connect from 'react-redux/lib/connect/connect';
import CheckOutComponent from '../../components/MyAccount/CheckOutComponent.jsx';
import { fetchAllAddressData, fetchAddAddressData, fetchEditAddress, setAddrId } from '../../actions/address';
import { fetchFirstCartData } from '../../actions/cart';
import Loader from '../../components/Loader/Loader.jsx';
import { getSubscriptionHelperDetails, fetchPlaceOrderData, clearPlaceOrderReducer, setFirstDataRedirection, fetchPaymentMethodInfo } from '../../actions/placeOrder';
import { handleCheckOutValidation, handleEditCheckOutValidation } from '../../helpers/checkoutValidation.jsx';
import { mapAddAddressData, mapEditAddressData } from '../../utils/commonMapper';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

class CheckOutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllBillAddress: false,
            showAllShipAddress: false,
            radioCheckVal: 'paypal',
            showPaymentMethod: false,
            eventKeyVal: 1,
            cardType: undefined,
            cardName: undefined,
            cardNumber: undefined,
            expDate: undefined,
            cvv: undefined,
            defaultBillInfo: undefined,
            defaultShipInfo: undefined,
            showNewShipAddr: false,
            showNewBillAddr: false,
            newBillInfo: undefined,
            newShipInfo: undefined,
            showBillAddressModal: false,
            showShipAddressModal: false,
            showNewBillAddrModal: false,
            showEditBillAddressDiv: false,
            showEditBillAddressModal: false,
            editBillInfo: undefined,
            editShipInfo: undefined,
            showNewShipAddrModal: false,
            showEditShipAddressModal: false,
            firstDataGateway: false,
            showPlaceOrderSuccess: false,
            pageid: 'WSP-KABLO-cgrpBAB55g',
            key: 'JeY9Kv7_vVuMuQPLFYyV',
            sequence: Math.floor(Math.random() * 10000),
            timestamp: moment(new Date()).unix(),
            amount: 0,
            getHashValue: undefined,
            countryId: undefined,
            region: undefined,
            shippingAddrId: undefined,
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
            env: 'sandbox', // you can set here to 'production' for production
            client: {
                sandbox: 'AQwoZAAHsmA5vBLj_mZffS3NWJjNJODewuV2WakPm-BQilgsawTtnbLvWHNC73idcfiaHBOjaeTDkAS8',
                // production: 'YOUR-PRODUCTION-APP-ID',
            },
            cartType: _get(this.props.cartType, 'cartType'),
            addrId: this.props.addrId,
            payPalstyle: {
                color: 'blue',
                label: 'checkout',
                tagline: 'false',
                shape: 'rect',
            },
            paymentType: 'firstData',
            showCheckoutSuccess: false,
            errors: {},
        };
    }

    onSuccess = (payment) => {
        console.log('The payment was succeeded!', payment);
        if (this.state.cartType === 'subscription') {
            this.props.getPlaceOrder({
                apiToken: this.props.apiToken,
                storeId: this.props.storeId,
                shippingAddrId: _get(this.state.defaultBillInfo, 'entity_id'),
                billingAddrId: _get(this.state.defaultShipInfo, 'entity_id'),
                currencyCode: this.props.currencyCode,
                custPO: '',
                payMethod: 'paypal',
                id: payment.paymentID,
            });
        } else {
            this.props.getPlaceOrder({
                apiToken: this.props.apiToken,
                storeId: this.props.storeId,
                shippingAddrId: _get(this.state.defaultBillInfo, 'entity_id'),
                billingAddrId: _get(this.state.defaultShipInfo, 'entity_id'),
                currencyCode: this.props.currencyCode,
                custPO: '',
                payMethod: 'paypal',
                id: _get(this.props, 'history.location.state.transId') ? _get(this.props, 'history.location.state.transId') : '',
            });
        }
    };

    onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    };

    onError = (err) => {
        console.log('Error!', err);
    };

    handleContinue = () => {
        this.setState({ expandIndex: 2 });
    }

    getHash = () => {
        const string = [this.state.pageid,
        this.state.sequence,
        this.state.timestamp,
        this.state.amount,
        this.props.currencyCode,
        ].join('^');
        const shaObj = new JsSHA('SHA-1', 'TEXT');
        shaObj.setHMACKey(this.state.key, 'TEXT');
        shaObj.update(string);
        const hmac = shaObj.getHMAC('HEX');
        return hmac;
    };

    handlePlaceOrder = () => {
        this.props.getPlaceOrder({
            apiToken: this.props.apiToken, storeId: this.props.storeId, shippingAddrId: _get(this.state.defaultBillInfo, 'entity_id'), billingAddrId: _get(this.state.defaultShipInfo, 'entity_id'), currencyCode: this.props.currencyCode, custPO: '', payMethod: 'banktransfer',
        });
    }

    getRadioCheckVal = (event) => {
        if (event.target.name === 'paypal') {
            this.state.eventKeyVal = 1;
        } else if (event.target.name === 'firstData') {
            this.state.eventKeyVal = 2;
        } else {
            this.state.eventKeyVal = 3;
        }
        this.setState({
            radioCheckVal: event.target.name,
            eventKeyVal: this.state.eventKeyVal,
        });
    }

    handleClose = () => {
        this.setState({
            showBillAddressModal: false,
        });
    }

    handleShipAddressModal = () => {
        this.setState({ showShipAddressModal: false });
    }

    handleNewBillModalClose = () => {
        this.setState({ showNewBillAddrModal: false });
    }

    handleNewShipModalClose = () => {
        this.setState({ showNewShipAddrModal: false });
    }

    handlePaymentInput = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleNewShipAddress = () => {
        this.setState({
            showNewShipAddr: true,
            showNewShipAddrModal: true,
        });
    }

    handleNewBillAddress = () => {
        this.setState({
            showNewBillAddr: true,
            showNewBillAddrModal: true,
        });
    }

    handleNewBillInputChange = (event) => {
        this.setState({
            newBillInfo: {
                ...this.state.newBillInfo,
                [event.target.id]: event.target.value,
            },
        });
    }

    addNewBillingAddress = () => {
        const AddBillingValid = handleCheckOutValidation({ ...this.state.newBillInfo });
        this.setState({ AddBillErrors: AddBillingValid });
        if (AddBillingValid.formIsValid) {
            const reqBody = mapAddAddressData({
                ...this.state.newBillInfo,
                ...this.props,
            });
            this.props.getAddAddressData(reqBody);
        }
    }

    handleNewShipInputChange = (event) => {
        this.setState({ newShipInfo: { ...this.state.newShipInfo, [event.target.id]: event.target.value } });
    }

    addNewShippingAddress = () => {
        const AddShippingValid = handleCheckOutValidation({ ...this.state.newShipInfo });
        this.setState({ AddShipErrors: AddShippingValid });
        if (AddShippingValid.formIsValid) {
            const reqBody = mapAddAddressData({
                ...this.state.newShipInfo,
                ...this.props,
            });
            this.props.getAddAddressData(reqBody);
        }
    }

    changeBillingAddress = () => {
        this.setState({
            showAllBillAddress: true,
            showBillAddressModal: true,
        });
    }

    changeShippingAddress = () => {
        this.setState({
            showAllShipAddress: true,
            showShipAddressModal: true,
        });
    }

    selectNewBillAddress = (entityId) => {
        const defaultBillInfo = _find(_get(this.state, 'billingAndShippingInfo'), { entity_id: entityId });
        this.setState({
            defaultBillInfo,
            showBillAddressModal: false,
        });
    }

    selectNewShipAddress = (entityId) => {
        const defaultShipInfo = _find(_get(this.state, 'billingAndShippingInfo'), { entity_id: entityId });
        this.setState({
            defaultShipInfo,
            showShipAddressModal: false,
        });
    }

    editBillAddress = (entityId) => {
        this.state.editBillInfo = _find(_get(this.state, 'billingAndShippingInfo'), { entity_id: entityId });
        this.setState({
            showEditBillAddressDiv: true,
            showEditBillAddressModal: true,
            editBillInfo: this.state.editBillInfo,
        });
    }

    editShipAddress = (entityId) => {
        const editShipInfo = _find(_get(this.state, 'billingAndShippingInfo'), { entity_id: entityId });
        this.setState({
            editShipInfo,
            showEditShipAddressDiv: true,
            showEditShipAddressModal: true,
        });
    }

    handleEditBillInputChange = (event) => {
        this.setState({
            editBillInfo: {
                ...this.state.editBillInfo,
                [event.target.id]: event.target.value,
            },
        });
    }

    handleEditShipInputChange = (event) => {
        this.setState({
            editShipInfo: {
                ...this.state.editShipInfo,
                [event.target.id]: event.target.value,
            },
        });
    }

    handleEditBillAddressModalClose = () => {
        this.setState({ showEditBillAddressModal: false });
    }

    handleEditShipAddressModalClose = () => {
        this.setState({ showEditShipAddressModal: false });
    }

    editBillingAddress = (addressId) => {
        const editBillingValid = handleEditCheckOutValidation({ ...this.state.editBillInfo });
        this.setState({ EditBillErrors: editBillingValid });
        if (editBillingValid.formIsValid) {
            const reqBody = mapEditAddressData({
                ...this.state.editBillInfo,
                ...this.props,
                addressId,
            });
            this.props.getEditAddressData(reqBody);
        }
    }

    editShippingAddress = (addressId) => {
        const editShippingValid = handleEditCheckOutValidation({ ...this.state.editShipInfo });
        this.setState({ EditShipErrors: editShippingValid });
        if (editShippingValid.formIsValid) {
            const reqBody = mapEditAddressData({
                ...this.state.editShipInfo,
                ...this.props,
                addressId,
            });
            this.props.getEditAddressData(reqBody);
        }
    }

    selectAddNewBillCountry = (val) => {
        this.setState({
            newBillInfo: {
                ...this.state.newBillInfo,
                countryId: val,
            },
        });
    }

    selectEditShipCountry = (val) => {
        this.setState({
            editShipInfo: {
                ...this.state.editShipInfo,
                countryId: val,
            },
        });
    }

    selectAddNewShipCountry = (val) => {
        this.setState({
            newShipInfo: {
                ...this.state.newShipInfo,
                countryId: val,
            },
        });
    }

    selectEditBillCountry = (val) => {
        this.setState({
            editBillInfo: {
                ...this.state.editBillInfo,
                countryId: val,
            },
        });
    }

    selectAddNewBillRegion = (val) => {
        this.setState({
            newBillInfo: {
                ...this.state.newBillInfo,
                region: val,
            },
        });
    }

    selectEditShipRegion = (val) => {
        this.setState({
            editShipInfo: {
                ...this.state.editShipInfo,
                state: val,
            },
        });
    }

    selectAddNewShipRegion = (val) => {
        this.setState({
            newShipInfo: {
                ...this.state.newShipInfo,
                region: val,
            },
        });
    }

    selectEditBillRegion = (val) => {
        this.setState({
            editBillInfo: {
                ...this.state.editBillInfo,
                state: val,
            },
        });
    }

    componentDidMount() {
        this.props.getFirstDataRedirection({ showFirstDataRedirection: 'checkout' });
        this.props.clearPlaceOrderData();
        this.props.getAllAddressData({ apiToken: this.props.apiToken });
        this.props.getPaymentMethodInfo({ apiToken: this.props.apiToken, storeId: this.props.storeId, currencyCode: this.props.currencyCode });
        this.props.getCartData({ apiToken: this.props.apiToken });
        this.props.getSubscriptionHelp({ apiToken: this.props.apiToken });
        if (_get(this.props, 'history.location.state.showPaymentResult') === true) {
            this.props.getPlaceOrder({
                apiToken: this.props.apiToken,
                storeId: this.props.storeId,
                shippingAddrId: _get(this.props.addrId, 'shipId'),
                billingAddrId: _get(this.props.addrId, 'billId'),
                currencyCode: this.props.currencyCode,
                custPO: '',
                payMethod: _get(this.props, 'history.location.state.paymentType'),
                xAuthCode: _get(this.props, 'history.location.state.authCode') ? _get(this.props, 'history.location.state.authCode') : '',
                xTransId: _get(this.props, 'history.location.state.transId') ? _get(this.props, 'history.location.state.transId') : '',
                xResponseReasonText: _get(this.props, 'history.location.state.resposeText') ? _get(this.props, 'history.location.state.resposeText') : '',
            });
        } else if (_get(this.props, 'history.location.state.showPaymentResult') === false) {
            alert('payment failed');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'allAddressData'))) {
            const defaultBillInfo = _find(_get(nextProps, ['allAddressData', 'result', 0], []), { entity_id: _get(nextProps, 'allAddressData.billingAddressId') });
            const defaultShipInfo = _find(_get(nextProps, ['allAddressData', 'result', 0], []), { entity_id: _get(nextProps, 'allAddressData.defaultShippingId') });
            this.setState({ defaultBillInfo, defaultShipInfo });
            this.props.setAddrId({ billId: defaultBillInfo.entity_id, shipId: defaultShipInfo.entity_id });
            this.setState({
                billingAndShippingInfo: _get(nextProps, ['allAddressData', 'result', 0]),
                allAddressData: _get(nextProps, 'allAddressData'),
            });
        }
        if (!_isEmpty(_get(nextProps, 'firstCartData'))) {
            if (_get(nextProps, ['firstCartData', 'cart', 0, 'code']) === 1) {
                if (this.state.cartType === 'subscription') {
                    this.setState({
                        checkoutTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']) ? _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']) : _get(nextProps, ['firstCartData', 'cart', 0, 'subtotal']),
                    });
                } else {
                    this.setState({
                        checkoutTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']),
                    });
                }
                this.setState({
                    result: _get(nextProps, ['firstCartData', 'cart', 0, 'result']),
                    subTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'subtotal']),
                    grandTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']),
                    redirection: _get(nextProps, ['firstCartData', 'cart', 0, 'redirection']),
                    amount: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']),
                }, () => {
                    this.setState({ getHashValue: this.getHash() });
                });
            }
        }
        if (!_isEmpty(_get(nextProps, 'placeOrderData'))) {
            if (_get(nextProps.placeOrderData, 'code') === 1) {
                window.location.href = '/checkout/onepage/success';
            }
        }
        if (!_isEmpty(_get(nextProps, 'addAddressData'))) {
            if (_get(nextProps.addAddressData, 'code') === 1) {
                this.setState({
                    showNewBillAddrModal: false,
                    showNewBillAddr: false,
                    showNewShipAddrModal: false,
                    showNewShipAddr: false,
                    showBillAddressModal: false,
                    showAllBillAddress: false,
                    showShipAddressModal: false,
                    showAllShipAddress: false,
                });
                alert('address added successfully');
                this.props.getAllAddressData({ apiToken: this.props.apiToken });
            }
        }
        if (!_isEmpty(_get(nextProps, 'editAddressData'))) {
            if (_get(nextProps.editAddressData, [0, 'code']) === 1) {
                this.setState({
                    showEditBillAddressModal: false,
                    showEditBillAddressDiv: false,
                    showBillAddressModal: false,
                    showAllBillAddress: false,
                    showEditShipAddressModal: false,
                    showEditShipAddressDiv: false,
                    showAllShipAddress: false,
                    showShipAddressModal: false,
                });
                alert('address edited successfully');
                this.props.getAllAddressData({ apiToken: this.props.apiToken });
            }
        }

        if (!_isEmpty(_get(nextProps, 'paymentMethodInfoData'))) {
            if (_get(nextProps, 'paymentMethodInfoData.code') === 3) {
                this.setState({ payMethod: _get(nextProps.paymentMethodInfoData, 'result.pay_methods') });
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
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">
                    <CheckOutComponent
                        {...this.state}
                        changeBillingAddress={this.changeBillingAddress}
                        changeShippingAddress={this.changeShippingAddress}
                        selectNewBillAddress={this.selectNewBillAddress}
                        selectNewShipAddress={this.selectNewShipAddress}
                        getRadioCheckVal={this.getRadioCheckVal}
                        handlePlaceOrder={this.handlePlaceOrder}
                        handlePaymentInput={this.handlePaymentInput}
                        handleNewShipAddress={this.handleNewShipAddress}
                        handleNewBillAddress={this.handleNewBillAddress}
                        handleNewBillInputChange={this.handleNewBillInputChange}
                        handleClose={this.handleClose}
                        handleNewBillModalClose={this.handleNewBillModalClose}
                        editBillAddress={this.editBillAddress}
                        handleEditBillAddressModalClose={this.handleEditBillAddressModalClose}
                        handleEditBillInputChange={this.handleEditBillInputChange}
                        editBillingAddress={this.editBillingAddress}
                        addNewBillingAddress={this.addNewBillingAddress}
                        addNewShippingAddress={this.addNewShippingAddress}
                        handleShipAddressModal={this.handleShipAddressModal}
                        handleNewShipModalClose={this.handleNewShipModalClose}
                        editShippingAddress={this.editShippingAddress}
                        editShipAddress={this.editShipAddress}
                        handleEditShipAddressModalClose={this.handleEditShipAddressModalClose}
                        handleNewShipInputChange={this.handleNewShipInputChange}
                        handleEditShipInputChange={this.handleEditShipInputChange}
                        selectAddNewBillCountry={this.selectAddNewBillCountry}
                        selectAddNewBillRegion={this.selectAddNewBillRegion}
                        selectEditShipCountry={this.selectEditShipCountry}
                        selectAddNewShipCountry={this.selectAddNewShipCountry}
                        selectEditBillCountry={this.selectEditBillCountry}
                        selectEditShipRegion={this.selectEditShipRegion}
                        selectAddNewShipRegion={this.selectAddNewShipRegion}
                        selectEditBillRegion={this.selectEditBillRegion}
                        cartType={_get(this.props.cartType, 'cartType')}
                        onSuccess={this.onSuccess}
                        onCancel={this.onCancel}
                        onError={this.onError}
                        currencyCode={this.props.currencyCode}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getAllAddressData: data => dispatch(fetchAllAddressData(data)),
    getCartData: data => dispatch(fetchFirstCartData(data)),
    getEditAddressData: data => dispatch(fetchEditAddress(data)),
    getPlaceOrder: data => dispatch(fetchPlaceOrderData(data)),
    getAddAddressData: data => dispatch(fetchAddAddressData(data)),
    clearPlaceOrderData: () => { dispatch(clearPlaceOrderReducer()); },
    getFirstDataRedirection: data => dispatch(setFirstDataRedirection(data)),
    getPaymentMethodInfo: data => dispatch(fetchPaymentMethodInfo(data)),
    setAddrId: data => dispatch(setAddrId(data)),
    getSubscriptionHelp: data => dispatch(getSubscriptionHelperDetails(data)),
});

const mapStateToProps = (state) => {
    const {
        loginReducer, allAddressReducer, cartReducer, placeOrderReducer,
    } = state;

    const {
        apiToken,
        currencyCode,
        cartId,
        storeId,
    } = loginReducer || [];

    const {
        allAddressData,
        addAddressData,
        editAddressData,
        isFetching: isLoading,
        addrId,
    } = allAddressReducer || [];

    const {
        firstCartData,
        cartType,
    } = cartReducer || [];

    const {
        placeOrderData,
        firstData,
        firstDataRedirection,
        paymentMethodInfoData,
    } = placeOrderReducer || [];

    return {
        apiToken,
        currencyCode,
        allAddressData,
        cartId,
        storeId,
        firstCartData,
        placeOrderData,
        addAddressData,
        editAddressData,
        firstData,
        firstDataRedirection,
        paymentMethodInfoData,
        isLoading,
        cartType,
        addrId,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutContainer);
