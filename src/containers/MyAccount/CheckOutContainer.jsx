import React, { Component } from 'react';
import _get from 'lodash/get';
import Alert from '@material-ui/lab/Alert';
import SweetAlert from 'react-bootstrap-sweetalert'
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import CheckOutComponent from '../../components/MyAccount/CheckOutComponent.jsx';
import { fetchAllAddressData, setAddrId } from '../../actions/address';
import { fetchFirstCartData } from '../../actions/cart';
import Loader from '../../components/Loader/Loader.jsx';
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
import { handleValidation } from '../../helpers/checkoutValidation.jsx';
import { mapPaypalData, mapfirstData, mapAuthorizeNetData, mapBraintreeData, mapCCAvenueData } from '../../utils/commonMapper';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class CheckOutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            rewardPointsUsed: 0,
            rewardsChecked: false,
            minReward: 0,
            maxReward: 100,
            earnPoints: 0,
            pointBalance: 0,
            enableSpendPoint: false,
            loading: false,
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'HOME',
                },
                {
                    link: undefined,
                    name: 'CHECKOUT',
                },
            ],
            payMethod: undefined,
            cartType: _get(this.props.cartType, 'cartType'),
            addrId: this.props.addrId,
            paymentType: undefined,
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
            showCards: false,
            // env: 'production', // you can set here to 'production' for production
            // productionID: 'AdsHRiaT2Wim1r3xPjrNkvbAxb3jnjZJHabLsEEp-S06Ey5uv1rTGuTcQ1mMQqNVtHaYnX2zWKe5b52w',
           // sandboxID: 'Ab0E6-8KFQ-oxtRJBHxebIGEbetkTdlP5uM4tseLPnejBprcRRHdKEMZ8m-xed4wMrhbYKFzkato3PqI',
            currencyCode: 'USD',
            cartId: this.props.cartId,
            // transactions: [
            //     {
            //         amount: {
            //             total: this.checkoutTotal,
            //             currency: 'USD',
            //         },
            //         invoice_number: this.reservedOrderId,
            //     },
            // ],
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
            cartResult: undefined,
            discountCouponValue: undefined,
            couponRes: false,
            showCouponRes: false,
            coupCode: undefined,
            showCouponData: undefined,
            code: undefined,
            subTotal: undefined,
            grandTotal: undefined,
            result: undefined,
            cancelCouponVal: undefined,
            sucessClassName: undefined,
            discountVal: undefined,
            productIds: undefined,
        };
        this.instance;
        // this.getNonceToken = this.getNonceToken.bind(this);
    }

    


    handleCollapse = (index) => {
        this.setState({
            expandIndex: this.state.expandIndex === index ? undefined : index,
        });
    }

    handleAddressChange = (event) => {
        this.setState({
            defaultBillingInfo: {
                ...this.state.defaultBillingInfo,
                [event.target.name]: event.target.value,
            },
        });
    }

    handleCreditChange = (event) => {
        if (event.target.name === 'creditnumber') {
            this.setState({ creditnumber: event.target.value });
        }
        this.setState({
            defaultBillingInfo: {
                ...this.state.defaultBillingInfo,
                [event.target.name]: event.target.value,
            },
        });
    }


    onConfirm = () => {
       // this.setState({ checked: !this.state.checked });
    }

    onCancel = () => {
        //this.setState({ checked: !this.state.checked });
    }

    handleProcessOrder = () => {
        console.log(this.state.paymentType);
        if(this.state.paymentType === undefined)
        {
          
           // toast.success("Success Notification !");
           // alert('Select Payment Type!');
           swal("", "You didn't selected the payment type!", "error");
           /// <SweetAlert title="Here's a message!" onConfirm={this.onConfirm} onCancel={this.onCancel} />
        }
        if (this.state.checked === false) {
            alert('Please accept terms and conditions');
        } else {
            // eslint-disable-next-line no-lonely-if
            if (this.state.paymentType === 'firstdataglobalgateway') {
                if (!(this.state.value || this.state.creditnumber)) {
                    alert('Please provide card details');
                } else {
                    const reqBody = mapfirstData({
                        ...this.state,
                        ...this.state.defaultBillingInfo,
                        user: this.props.user,
                        apiToken: this.props.apiToken,
                        storeId: this.props.storeId,
                        shippingAddrId: _get(this.state.defaultShipInfo, 'entity_id'),
                        billingAddrId: _get(this.state.defaultBillingInfo, 'entity_id'),
                        currencyCode: this.props.currencyCode,
                        cycles: this.state.cycles,
                        demoExpired: this.props.demoExpired,
                        rewardPointsUsed: this.state.rewardPointsUsed, // @todo
                    });
                    const data = reqBody;
                    // console.log('data:', data);
                    // Encrypt
                    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'W!z#l$b2*^');
                    const validResp = handleValidation({ ...this.state.defaultBillingInfo });
                    this.setState({ errors: validResp });
                    if (validResp.formIsValid) {
                        if (this.props.cartType === 'prime' && this.props.primeUser === '1') {
                            this.props.upgradePrimeMembershipData({ apiToken: this.props.apiToken });
                        }
                        const encrytpedData = { ciphertext: ciphertext.toString() };

                        this.props.addFirstDataCreditCard(encrytpedData, 'FIRST_DATA_URL');
                    }
                }
                // } else if (this.state.paymentType === 'paypal') {
                //     const reqBody = mapPaypalData({
                //         ...this.state,
                //         ...this.state.defaultBillingInfo,
                //         user: this.props.user,
                //         apiToken: this.props.apiToken,
                //         storeId: this.props.storeId,
                //         shippingAddrId: _get(this.state.defaultShipInfo, 'entity_id'),
                //         billingAddrId: _get(this.state.defaultBillingInfo, 'entity_id'),
                //         currencyCode: this.props.currencyCode,
                //     });

                //     const data = reqBody;
                //     // Encrypt
                //     const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'W!z#l$b2*^');
                //     const validResp = handleValidation({ ...this.state.defaultBillingInfo });
                //     this.setState({ errors: validResp });
                //     if (validResp.formIsValid) {
                //         const encrytpedData = { ciphertext: ciphertext.toString() };
                //         this.props.addPaypalCreditCard(encrytpedData);
                //     }
            } else if (this.state.paymentType === 'openTerms') {
                this.setState({
                    loading: true,
                });
                this.props.getPlaceOrder({
                 api_token: this.props.apiToken,
                store_id: this.props.storeId,
                shipping_addr_id: _get(this.state.defaultShipInfo, 'entity_id'),
                    billing_addr_id: _get(this.state.defaultBillingInfo, 'entity_id'),
                    currency_code: this.props.currencyCode,
                    cust_po: '',
                    pay_method: 'banktransfer',
                });
            } else if (this.state.paymentType === 'authorizenet') {
                if (!(this.state.value || this.state.creditnumber)) {
                    alert('Please provide card details');
                } else {
                    const reqBody = mapAuthorizeNetData({
                        ...this.state,
                        ...this.state.defaultBillingInfo,
                        user: this.props.user,
                        apiToken: this.props.apiToken,
                        storeId: this.props.storeId,
                        shippingAddrId: _get(this.state.defaultShipInfo, 'entity_id'),
                        billingAddrId: _get(this.state.defaultBillingInfo, 'entity_id'),
                        currencyCode: this.props.currencyCode,
                        cycles: this.state.cycles,
                        demoExpired: this.props.demoExpired,
                        rewardPointsUsed: this.state.rewardPointsUsed, // @todo
                    });
                    const data = reqBody;
                    // console.log('data:', data);
                    // Encrypt
                    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'W!z#l$b2*^');
                    const validResp = handleValidation({ ...this.state.defaultBillingInfo });
                    this.setState({ errors: validResp });
                    if (validResp.formIsValid) {
                        if (this.props.cartType === 'prime' && this.props.primeUser === '1') {
                            this.props.upgradePrimeMembershipData({ apiToken: this.props.apiToken });
                        }
                        const encrytpedData = { ciphertext: ciphertext.toString() };

                        this.props.addFirstDataCreditCard(encrytpedData, 'AUTHORIZE_NET_URL');
                    }
                }
            } else if (this.state.paymentType === 'braintree') {
                // console.log('braintree:');
                // this.getNonceToken();
            } else if (this.state.paymentType === 'ccavenue') {
                console.log('ccavenue:', this.state.defaultBillingInfo);
                // this.props.getCCAvenueToken();
                // this.getNonceToken();
                const body = mapCCAvenueData({
                    // ...this.state.defaultBillingInfo,
                    merchantId: 124693,
                    orderId: 123456,
                    currency: 'INR',
                    // orderAmount: 11.00,
                    grandTotal: 10,
                    // redirectUrl: 'http://127.0.0.1:3010/ccavResponseHandler',
                    // cancelUrl: 'http://127.0.0.1:3010/ccAvenueCancelHandler',
                    language: 'EN',
                    // billingName: 'Peter',
                    // billingAddress: 'Santacruz',
                    // billingCity: 'Mumbai',
                    // billingState: 'MH',
                    // billingZip: 400054,
                    // billingCountry: 'India',
                    // billingTel: 9876543210,
                    billingEmail: 'test@gmail.com',
                    deliveryName: 'Sam',
                    deliveryAddress: 'Vile Parle',
                    deliveryCity: 'Mumbai',
                    deliveryState: 'Maharashtra',
                    deliveryZip: 400038,
                    deliveryCountry: 'India',
                    deliveryTel: '0123456789',
                    merchantParam1: 'Info.',
                    merchantParam2: 'Info.',
                    merchantParam3: 'Info.',
                    merchantParam4: 'Info.',
                    promoCode: '',
                    customerIdentifier: '',
                    ...this.state.defaultBillingInfo,
                    apiToken: this.props.apiToken,
                });
                console.log('b:', body);
                document.getElementById('nonseamless').submit();
                

                // debugger
               
            }
        }
    }

    getPaymentType = (event) => {
        if (event.target.name === 'cod') {
           console.log('cod');
           this.setState({
            paymentType: event.target.name,
            showCards: false,
            showCredit: false,
        });
        // } else if (event.target.name === 'paypal') {
        //     this.props.getOrderId({ apiToken: this.props.apiToken });
        //     this.setState({
        //         showCards: false,
        //         showCredit: false,
        //         showRadio: undefined,
        //         paymentType: event.target.name,
        //     });
        } else if (event.target.name === 'openTerms') {
            this.setState({
                showCards: false,
                showCredit: false,
                showRadio: undefined,
                paymentType: event.target.name,
            });
        } else if (event.target.name === 'authorizenet') {
            this.setState({
                paymentType: event.target.name,
                showCards: true,
            });
        } else if (event.target.name === 'braintree') {
            this.setState({
                paymentType: event.target.name,
                showCards: false,
                showCredit: false,
            });
        } else if (event.target.name === 'ccavenue') {
            // this.props.getOrderId({ apiToken: this.props.apiToken });
            this.setState({
                paymentType: event.target.name,
                showCards: true,
                showCredit: false,
            });
        }
    }

    handleSelectCountry = (val) => {
        this.setState({
            // country: val,
            defaultBillingInfo: {
                ...this.state.defaultBillingInfo,
                country_id: val,
            },
        });
    }

    handleSelectState = (val) => {
        this.setState({
            defaultBillingInfo: {
                ...this.state.defaultBillingInfo,
                state: val,
            },
            // state: val,
        });
    }

    handleTermsCheck = () => {
        this.setState({ checked: !this.state.checked });
    }

    handleContinue = () => {
        this.setState({ expandIndex: 2 });
    }

    handleMonth = (event) => {
        this.setState({
            defaultBillingInfo: {
                ...this.state.defaultBillingInfo,
                expirymonth: event.target.value,
            },
        });
    }

    handleExpiryYear = (event) => {
        this.setState({
            defaultBillingInfo: {
                ...this.state.defaultBillingInfo,
                expiryyear: event.target.value,
            },
        });
    }

    handleNotesContinue = () => {
        this.setState({ expandIndex: 3 });
    }

    getSavedCard = (event, cardData) => {
        // const creditWithoutStar = '4788250000028291';
        // const creditNumber = creditWithoutStar.replace(/^.{12}/g, 'XXXX-XXXX-XXXX-');
        this.setState({
            showRadio: event.target.id,
            showNewCard: undefined,
            showCredit: false,
            tokenize: true,
            value: event.target.value,
            defaultBillingInfo: {
                ...this.state.defaultBillingInfo,
                // creditnumber: creditNumber,
                expiryDate: _get(cardData.card, 'exp_date') ? _get(cardData.card, 'exp_date') : _get(cardData.token, 'token_data.exp_date'),
                type: _get(cardData.card, 'type') ? _get(cardData.card, 'type') : _get(cardData.token, 'token_data.type'),
                cardholderName: _get(cardData.card, 'cardholder_name') ? _get(cardData.card, 'cardholder_name') : _get(cardData.token, 'token_data.cardholder_name'),
                value: _get(cardData.token, 'token_data.value'),
            },
        });
    }

    getNewCard = () => {
        this.setState({
            showNewCard: 'newCard',
            showRadio: undefined,
            showCredit: true,
            tokenize: false,
            defaultBillingInfo: {
                ...this.state.defaultBillingInfo,
                creditnumber: '',
                expirymonth: '',
                expiryyear: '',
            },
        });
    }

    handleShipAddress = () => {
        this.setState({ showShipAddress: !this.state.showShipAddress });
    }

    decryptCardFn = (card) => {
        if (card !== null) {
            const encrypted1 = _get(card, 'ciphertext') && card.ciphertext;
            const salt1 = _get(card, 'salt') && CryptoJS.enc.Hex.parse(card.salt);
            const iv1 = _get(card, 'iv') && CryptoJS.enc.Hex.parse(card.iv);

            const key1 = CryptoJS.PBKDF2('bloomkonnect', salt1, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });
            const decrypted = CryptoJS.AES.decrypt(encrypted1, key1, { iv: iv1 });
            const decrypt = decrypted.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypt);
        }
    }

    // onPaymentStart = () => {
    //     //    console.log('payment started');
    // }

    // onPaymentSuccess = (res) => {
    //     this.props.getPlaceOrder({
    //         apiToken: this.props.apiToken,
    //         storeId: this.props.storeId,
    //         shippingAddrId: _get(this.state.defaultShipInfo, 'entity_id'),
    //         billingAddrId: _get(this.state.defaultBillingInfo, 'entity_id'),
    //         currencyCode: this.props.currencyCode,
    //         custPO: '',
    //         payMethod: 'paypal',
    //         // id: _get(this.props, 'history.location.state.transId') ? _get(this.props, 'history.location.state.transId') : '',
    //         id: res.transactions[0].related_resources[0].sale.id,
    //         billingAddress: this.state.defaultBillingInfo,
    //         firstDataResp: JSON.stringify(res),
    //     });
    //     // console.log('payment complete', res);
    // }

    // onPaymentError = (msg) => {
    //     alert(msg);
    // }

    componentDidMount() {
        document.title = 'Checkout';
        this.props.clearPlaceOrderData();
        this.props.getAllAddressData({ api_token: this.props.apiToken });
        console.log(this.props.localeId);
      //  this.props.getPaymentMethodInfo({
        //    apiToken: this.props.apiToken,
          //  storeId: this.props.storeId,
           // cartId: this.props.cartId,
           // cartType: this.props.cartType,
       // });
       this.props.getCartData({ api_token: this.props.apiToken, spending_point: 1 });

        // if (this.props.cartType === 'subscription') {
        //     this.props.getSubscriptionHelp({ apiToken: this.props.apiToken });
        // }
       // this.props.getSavedCardData({ apiToken: this.props.apiToken });
        //this.props.getBraintreeClientToken();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'firstCartData'))) {
           // this.props.updateCart({
             // show: false,
              //cartCount: _get(nextProps.firstCartData, ['cart', 0, 'total_products_in_cart'], 0),
              //cartTotal: _get(nextProps.firstCartData, ['cart', 0, 'subtotal'], 0),
             // cartProducts: _get(nextProps.firstCartData, ['cart', 0, 'result'], []),
           // });
            if (_get(nextProps, ['firstCartData', 'cart', 0, 'code']) === 1) {
                const productIds = result && Array.isArray(result) && result.reduce((accumulator, product) => accumulator.concat(product.product_id), []);
                let rewardPointsUsed = 0;
                let rewardsChecked = false;
                let enableSpendPoint = false;
                if ((_get(nextProps, ['firstCartData', 'cart', 0, 'result', 0, 'type'], 'normal') === 'normal') && _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ') && _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0]) {
                    rewardsChecked = true;
                    enableSpendPoint = true;
                    if (_get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ') && _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0] && (Number(_get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0]) > Number(_get(nextProps, ['firstCartData', 'cart', 0, 'spendingmax'])))) {
                        rewardPointsUsed = Number(_get(nextProps, ['firstCartData', 'cart', 0, 'spendingmax']));
                    } else {
                        rewardPointsUsed = Number(_get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0]);
                    }
                }
              const productDetailsTemp = _get(nextProps, ['firstCartData', 'cart', 0, 'result']);
              const cartNewId = _get(nextProps, ['firstCartData', 'cart', 0, 'result', 0, 'cart_id']);
              if (cartNewId !== this.props.cartId) {
                this.props.setCartId(cartNewId);
              }
              let productDetails = {};
              productDetailsTemp.map((o) => {
                productDetails = {
                  ...productDetails,
                  [o.cart_rid]: {
                    product_id: o.product_id,
                    quantity: o.qty,
                  },
                };
              });
             
              console.log(nextProps.firstCartData.cart);
              this.setState({
                cartResult: _get(nextProps, 'firstCartData.cart'),
                code: _get(nextProps, ['firstCartData', 'cart', 0, 'code']),
                subTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'subtotal']).split(',').join(''),
                grandTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']).split(',').join(''),
                redirection: _get(nextProps, ['firstCartData', 'cart', 0, 'redirection']),
                amount: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']),
                transactionType: _get(nextProps.firstCartData, ['cart', 0, 'result', 0, 'type']),
                cartType: _get(nextProps, ['firstCartData', 'cart', 0, 'result', 0, 'type'], 'normal'),
                productIds: productIds,
                cycles: _get(nextProps, ['firstCartData', 'cart', 0, 'result', 0, 'cycles']),
                discount: _get(nextProps, ['firstCartData', 'cart', 0, 'discount']),
                couponCode: _get(nextProps, ['firstCartData', 'cart', 0, 'coupon_code']),
                feeAmount: _get(nextProps, ['firstCartData', 'cart', 0, 'fee_amount']),
                earnPoints: _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_earn']),
                pointBalance: _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ') && _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0],
                maxReward: Number(_get(nextProps, ['firstCartData', 'cart', 0, 'spendingmax'])),
                rewardPointsUsed,
                rewardsChecked,
                enableSpendPoint,
              });
              const couponCode = _get(nextProps.firstCartData, ['cart', 0, 'coupon_code']);
              if (couponCode !== 'NA') {
                this.setState({
                  couponRes: true,
                  coupCode: couponCode,
                  discountCouponValue: couponCode,
                  showCouponRes: false,
                  move: false,
                });
              }
            } else {
                if (this.state.cartType === 'subscription') {
                    this.setState({
                        checkoutTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']) ? _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']) : _get(nextProps, ['firstCartData', 'cart', 0, 'subtotal']),
                    });
                } else {
                    this.setState({
                        checkoutTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']),
                    });
                }
                const result = _get(nextProps, ['firstCartData', 'cart', 0, 'result']);
                const productIds = result && Array.isArray(result) && result.reduce((accumulator, product) => accumulator.concat(product.product_id), []);
                let rewardPointsUsed = 0;
                let rewardsChecked = false;
                let enableSpendPoint = false;
                if ((_get(nextProps, ['firstCartData', 'cart', 0, 'result', 0, 'type'], 'normal') === 'normal') && _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ') && _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0]) {
                    rewardsChecked = true;
                    enableSpendPoint = true;
                    if (_get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ') && _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0] && (Number(_get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0]) > Number(_get(nextProps, ['firstCartData', 'cart', 0, 'spendingmax'])))) {
                        rewardPointsUsed = Number(_get(nextProps, ['firstCartData', 'cart', 0, 'spendingmax']));
                    } else {
                        rewardPointsUsed = Number(_get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0]);
                    }
                }
                console.log('surya'+productIds);
              // this.props.setCartType({ cartType: '' });
              this.setState({
                cartResult: _get(nextProps, 'firstCartData'),
                code: _get(nextProps, ['firstCartData', 'cart', 0, 'code']),
                subTotal: _get(nextProps,'firstCartData[0].subtotal'),
                grandTotal: _get(nextProps, 'firstCartData[0].grandtotal'),
                redirection: _get(nextProps, ['firstCartData', 'cart', 0, 'redirection']),
                amount: _get(nextProps, 'firstCartData[0].grandtotal'),
                transactionType: _get(nextProps.firstCartData, ['cart', 0, 'result', 0, 'type']),
                cartType: _get(nextProps, ['firstCartData', 'cart', 0, 'result', 0, 'type'], 'normal'),
                productIds: productIds,
                cycles: _get(nextProps, ['firstCartData', 'cart', 0, 'result', 0, 'cycles']),
                discount: _get(nextProps, 'firstCartData[0].discount'),
                couponCode: _get(nextProps, 'firstCartData[0].coupon_code'),
                feeAmount: _get(nextProps, ['firstCartData', 'cart', 0, 'fee_amount']),
                earnPoints: _get(nextProps, 'firstCartData[0].reviewedpoint_earn'),
                pointBalance: _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ') && _get(nextProps, ['firstCartData', 'cart', 0, 'reviewedpoint_balance'], ' ').split(' ')[0],
                maxReward: Number(_get(nextProps, ['firstCartData', 'cart', 0, 'spendingmax'])),
                rewardPointsUsed,
                rewardsChecked,
                enableSpendPoint,
              });
            }
          }
        if (!_isEmpty(_get(nextProps, 'allAddressData'))) {
            const defaultBillingInfo = _find(_get(nextProps, ['allAddressData', 'result', 0], []), { entity_id: _get(nextProps, 'allAddressData.billingAddressId') });
            let defaultShipInfo = _filter(_get(nextProps, ['allAddressData', 'result', 0], []), { entity_id: this.props.storeId });
            defaultShipInfo = !_isEmpty(defaultShipInfo) ? defaultShipInfo[0] : {};
            this.setState({ defaultShipInfo, defaultBillingInfo });
            this.props.setAddrId({ billId: _get(defaultBillingInfo, 'entity_id'), shipId: _get(defaultShipInfo, 'entity_id') });
        }
      

        if (!_isEmpty(_get(nextProps, 'paymentMethodInfoData'))) {
            if (_get(nextProps, 'paymentMethodInfoData.status') === 'true') {
                this.setState({ payMethod: _get(nextProps.paymentMethodInfoData, ['data', 0, 'payment_method']), balanceLimit: _get(nextProps.paymentMethodInfoData, ['data', 0, 'balance_limit']) });
            }
        }

        if (!_isEmpty(_get(nextProps, 'paypalCreditCardRes'))) {
            if (_get(nextProps, 'paypalCreditCardRes.code') === 1) {
                this.setState({ showCheckoutSuccess: true, orderId: _get(nextProps, 'paypalCreditCardRes.order_id') });
            }
        }

        if (!_isEmpty(_get(nextProps, 'placeOrderData'))) {
            if (_get(nextProps.placeOrderData, 'code') === 1) {
                this.setState({
                    loading: false,
                });
                this.setState({ showCheckoutSuccess: true, orderId: _get(nextProps, 'placeOrderData.order_id'), placeOrderAmount: _get(nextProps, 'placeOrderData.amount') });
            }
        }

        if (!_isEmpty(_get(nextProps, 'firstDataCreditCardRes'))) {
            if (_get(nextProps.firstDataCreditCardRes, 'code') === 500) {
                alert(_get(nextProps.firstDataCreditCardRes, 'message'));
            }
            if (_get(nextProps.firstDataCreditCardRes, 'code') === 1) {
                this.setState({
                    showCheckoutSuccess: true,
                    orderId: _get(nextProps, 'firstDataCreditCardRes.order_id'),
                    placeOrderAmount: _get(nextProps, 'firstDataCreditCardRes.amount'),
                });
            }
        }

        if (!_isEmpty(_get(nextProps, 'savedCardResult'))) {
            if (_get(nextProps.savedCardResult, 'status') === 'true') {
                const savedCardsFirstdata = [];
                const savedCardsAuthorizenet = [];
                _get(nextProps.savedCardResult, ['card_details', 'firstdataglobalgateway'], []).map((thisCard) => {
                    thisCard && savedCardsFirstdata.push(this.decryptCardFn(thisCard));
                });
                _get(nextProps.savedCardResult, ['card_details', 'authorizenet'], []).map((thisCard) => {
                    thisCard && savedCardsAuthorizenet.push(this.decryptCardFn(thisCard).transactionResponse);
                });
                // console.log(savedCardResult);
                this.setState({ savedCardsFirstdata, savedCardsAuthorizenet });
            }
        }

        if (!_isEmpty(_get(nextProps, 'orderIdData'))) {
            // if (_get(nextProps.orderIdData, 'status') == 'true') {
            this.setState({ reservedOrderId: _get(nextProps.orderIdData, 'reserved_order_id') });
            // }
        }
    }

    onSliderChange = (value) => {
        this.setState({
            rewardPointsUsed: value,
            rewardsChecked: value === this.state.maxReward,
        });
    }

    onInputValueChange = (event) => {
        let value = Number(event.target.value);
        if ((this.state.pointBalance > this.state.maxReward) && (value > this.state.maxReward)) {
            value = Number(this.state.maxReward);
        } else if ((this.state.pointBalance < this.state.maxReward) && (value > this.state.pointBalance)) {
            value = Number(this.state.pointBalance);
        }
        this.setState({
            rewardPointsUsed: value,
            rewardsChecked: value === this.state.maxReward,
        });
    }

    handleRewardsCheckChange = () => {
        let maxPoints = this.state.maxReward;
        if (this.state.pointBalance < this.state.maxReward) {
            maxPoints = this.state.pointBalance;
        }
        this.setState(prevState => ({
            rewardPointsUsed: prevState.rewardsChecked ? 0 : Number(maxPoints),
            rewardsChecked: !prevState.rewardsChecked,
        }));
    }

    // async getNonceToken() {
    //     // Send the nonce to your server
    //     const { nonce } = await this.instance.requestPaymentMethod();
    //     // console.log('nounce:', nonce);
    //     // await fetch(`server.test/purchase/${nonce}`);
    //     const reqBody = mapAuthorizeNetData({
    //         ...this.state,
    //         ...this.state.defaultBillingInfo,
    //         user: this.props.user,
    //         apiToken: this.props.apiToken,
    //         storeId: this.props.storeId,
    //         shippingAddrId: _get(this.state.defaultShipInfo, 'entity_id'),
    //         billingAddrId: _get(this.state.defaultBillingInfo, 'entity_id'),
    //         currencyCode: this.props.currencyCode,
    //         cycles: this.state.cycles,
    //         demoExpired: this.props.demoExpired,
    //         rewardPointsUsed: this.state.rewardPointsUsed, // @todo
    //     });
    //     const data = reqBody;
    //     data.nonce = nonce;
    //     // console.log('data:', data);
    //     // Encrypt
    //     const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'W!z#l$b2*^');
    //     const validResp = handleValidation({ ...this.state.defaultBillingInfo });
    //     this.setState({ errors: validResp });
    //     const encrytpedData = { ciphertext: ciphertext.toString() };

    //     this.props.addFirstDataCreditCard(encrytpedData, 'BRAINTREE_URL');
    // }

    assignInstance = (instance) => {
        this.instance = instance;
    }

    render() {
      
        //if (this.state.loading) {
          //  return (
            //    <div className="loaderDiv" style={{ minHeight: '400px' }}>
              //   <Loader />
             //   </div>
           // );
        //}
        if (_get(this.state, 'showCheckoutSuccess')) {
            return <Redirect push to={{
                pathname: '/checkout/onepage/success',
                state: { orderId: this.state.orderId, productIds: this.state.productIds, placeOrderAmount: this.state.placeOrderAmount },
            }} />;
        }
        {/*if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }*/}
        return (
            <div>
              
                <div className="container">
                    <div ref={this.abc} />
                    <ErrorBoundary>
                    <form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
                    <input id="donaldduck" type="hidden" name="q" value="a"/>
                    <input type="hidden" id="encRequest" name="encRequest" value="Ab0E6-8KFQ-oxtRJBHxebIGEbetkTdlP5uM4tseLPnejBprcRRHdKEMZ8m-xed4wMrhbYKFzkato3PqI" />
                    <input type="hidden" id="access_code" name="access_code" value="AVXL88GK63AI87LXIA" />
                    </form>
                        <CheckOutComponent
                            {...this.state}
                            instance={this.instance}
                            cartResult={this.state.cartResult}
                            braintreeClientToken={this.props.braintreeClientToken}
                            currencyCode={this.props.currencyCode}
                            primeUser={this.props.primeUser}
                            handleCollapse={this.handleCollapse}
                            handleContinue={this.handleContinue}
                            handleAddressChange={this.handleAddressChange}
                            handleCreditChange={this.handleCreditChange}
                            getPaymentType={this.getPaymentType}
                            handleProcessOrder={this.handleProcessOrder}
                            handleSelectCountry={this.handleSelectCountry}
                            handleSelectState={this.handleSelectState}
                            handleTermsCheck={this.handleTermsCheck}
                            handleMonth={this.handleMonth}
                            handleExpiryYear={this.handleExpiryYear}
                            handleNotesContinue={this.handleNotesContinue}
                            getSavedCard={this.getSavedCard}
                            handleShipAddress={this.handleShipAddress}
                            getNewCard={this.getNewCard}
                            reservedOrderId={this.state.reservedOrderId}
                            // transactions={this.state.transactions}
                            // onPaymentStart={this.onPaymentStart}
                            // onPaymentSuccess={this.onPaymentSuccess}
                            // onPaymentError={this.onPaymentError}
                            // env={this.state.env}
                            // productionId={this.state.productionID}
                            checkoutTotal={this.state.checkoutTotal}
                            currencyCode={this.state.currencyCode}
                          //  sandboxID={this.state.sandboxID}
                            payMethod={this.state.payMethod}
                            balanceLimit={this.state.balanceLimit}
                            couponCode={this.state.couponCode}
                            discount={this.state.discount}
                            feeAmount={this.state.feeAmount}
                            cartType={this.props.cartType}
                            cycles={_get(this.props, ['firstCartData', 'cart', 0, 'result', 0, 'cycles'])}
                            onSliderChange={this.onSliderChange}
                            onInputValueChange={this.onInputValueChange}
                            handleRewardsCheckChange={this.handleRewardsCheckChange}
                            // getNonceToken={this.getNonceToken}
                            assignInstance={this.assignInstance}
                            grandTotal={this.state.grandTotal}
                            loading={this.state.loading}
                        />
                    </ErrorBoundary>
                </div>
                <hr className="blue-hr"></hr>
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
        localeId,
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
        localeId,
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

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(CheckOutContainer));
