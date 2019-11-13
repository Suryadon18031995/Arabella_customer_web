import React from 'react';
import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import connect from 'react-redux/lib/connect/connect';
// import { mapCCAvenueData } from '../../utils/commonMapper';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import { verifyEmailId } from '../../actions/login';
import { postAddToCartData, fetchFirstCartData } from '../../actions/cart';

class VendorRegistration extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: '',
        email: '',
        password: '',
        confirmPassword: '',
        gstNo: '',
        errors: {},
        collectPayment: true,
        telephone: '',
        dummyProd: {
            api: 'api',
            apiToken: '190d57c560e942b32cb98d8b0f56d9a1',
            productId: '1', // @ todo
            quantity: 1,
            selValNext: 'local_delivery,13-Nov-2019,1,500,500,500,500,13-Nov-2019,13-Nov-2019,,14164,,,,,Vendor,Registration,500', // @ todo
        },
        apiToken: '190d57c560e942b32cb98d8b0f56d9a1',
    };

    componentDidMount() {
        this.props.getCartData({ apiToken: this.props.apiToken });
    }

    handleChange = (event) => {
        if (event.target.name === 'zipcode') {
            if (isNaN(Number(event.target.value))) {
                this.setState({
                    [event.target.name]: event.target.value,
                    errors: { ...this.state.errors, zipcode: 'Not a valid zipcode.' },
                });
            } else {
                this.setState({
                    [event.target.name]: event.target.value,
                    errors: { ...this.state.errors, zipcode: '' },
                });
            }
        } else if (event.target.name === 'email' && _get(this.state, 'errors.email')) {
            const reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
            if (!event.target.value.match(reEmail)) {
                this.setState({
                    [event.target.name]: event.target.value,
                    errors: { ...this.state.errors, email: '' },
                });
                //     } else {
                //         this.setState({
                //             [event.target.name]: event.target.value,
                //             errors: { ...this.state.errors, email: '' },
                //         });
            }
        } else {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }
    }

    handleEmailValidation = () => {
        const reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
        if (!this.state.email.match(reEmail)) {
            this.setState({
                errors: { ...this.state.errors, email: 'Not a valid email id.' },
            });
        } else {
            this.setState({
                errors: { ...this.state.errors, email: '' },
            });
            this.props.verifyEmailId({ email: this.state.email });
        }
    }

    comparePassword = (event) => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errors: { ...this.state.errors, confirmPassword: 'Password does not match.' },
            });
        } else if (!event.target.value) {
            this.setState({
                errors: { ...this.state.errors, confirmPassword: 'Required.' },
            });
        } else {
            this.setState({
                errors: { ...this.state.errors, confirmPassword: '' },
            });
        }
    }

    onBlur = (event) => {
        if (!event.target.value) {
            this.setState({
                errors: { ...this.state.errors, [event.target.name]: 'Required.' },
            });
        } else if (event.target.value) {
            this.setState({
                errors: { ...this.state.errors, [event.target.name]: '' },
            });
        }
    }

    validateForm = () => {
        const errors = { ...this.state.errors };
        let valueUp = false;
        // console.log('st:', this.state);
        if (!this.state.firstName) {
            errors.firstName = 'Required.';
            valueUp = true;
        }
        if (!this.state.lastName) {
            errors.lastName = 'Required.';
            valueUp = true;
        }
        if (!this.state.addressLine1) {
            errors.addressLine1 = 'Required.';
            valueUp = true;
        }
        if (!this.state.addressLine2) {
            errors.addressLine2 = 'Required.';
            valueUp = true;
        }
        if (!this.state.city) {
            errors.city = 'Required.';
            valueUp = true;
        }
        if (!this.state.state) {
            errors.state = 'Required.';
            valueUp = true;
        }
        if (!this.state.zipcode) {
            errors.zipcode = 'Required.';
            valueUp = true;
        }
        if (!this.state.email) {
            errors.email = 'Required.';
            valueUp = true;
        }
        // if (!this.state.gstNo) {
        //     errors.gstNo = 'Required.';
        //     valueUp = true;
        // }
        if (!this.state.password) {
            errors.password = 'Required.';
            valueUp = true;
        }
        if (!this.state.email) {
            errors.email = 'Required.';
            valueUp = true;
        }
        if (!this.state.confirmPassword) {
            errors.confirmPassword = 'Required.';
            valueUp = true;
        }
        if (Object.values(this.state.errors).join('') || valueUp) {
            this.setState({ errors });
            return false;
        }
        // debugger
        return true;
    }

    handleProceedToCheckout = () => {
        const valid = this.validateForm();
        // debugger
        if (!Object.values(this.state.errors).join('') && valid) {
            if (this.state.collectPayment) {
                console.log('Payment of 500!', this.state);
                const body = {
                    merchantId: 124693,
                    orderId: 123456,
                    currency: 'INR',
                    orderAmount: 500.00,
                    redirectUrl: 'http://localhost:2001/admin-bff/payment/ccavenue/placeOrder',
                    cancelUrl: 'http://localhost:2001/admin-bff/payment/ccavenue/cancelOrder',
                    language: 'EN',
                    billingName: `${_get(this.state, 'firstName')} ${_get(this.state, 'lastName')}`,
                    billingAddress: `${_get(this.state, 'addressLine1')}, ${_get(this.state, 'addressLine2')}`,
                    billingCity: _get(this.state, 'city'),
                    billingState: _get(this.state, 'state'),
                    billingZip: _get(this.state, 'zipcode'),
                    billingCountry: 'India' || _get(this.state, 'country'),
                    // billingTel:  _get(this.state, 'telephone'),
                    billingEmail: _get(this.state, 'email'),
                    deliveryName: `${_get(this.state, 'firstName')} ${_get(this.state, 'lastName')}`,
                    deliveryAddress: `${_get(this.state, 'addressLine1')}, ${_get(this.state, 'addressLine2')}`,
                    deliveryCity: _get(this.state, 'city'),
                    deliveryState: _get(this.state, 'state'),
                    deliveryZip: _get(this.state, 'zipcode'),
                    deliveryCountry: 'India',
                    // deliveryTel: '0123456789',
                    merchantParam1: 'Info.',
                    // merchantParam2: 'Info.',
                    merchantParam3: 'Info.',
                    merchantParam4: 'Info.',
                    promoCode: '',
                    customerIdentifier: '',
                    apiToken: '190d57c560e942b32cb98d8b0f56d9a1', // @todo change to custom id
                    merchantParam2: JSON.stringify({
                        name: `${_get(this.state, 'firstName')} ${_get(this.state, 'lastName')}`,
                        street: `${_get(this.state, 'addressLine1')}, ${_get(this.state, 'addressLine2')}`,
                        city: _get(this.state, 'city'),
                        state: _get(this.state, 'state'),
                        zipcode: _get(this.state, 'zipcode'),
                        email: _get(this.state, 'email'),
                        password: _get(this.state, 'password'),
                        confirmPassword: _get(this.state, 'confirmPassword'),
                        gstin: _get(this.state, 'gstNo'),
                        country: 'India',
                        telephone: _get(this.state, 'telephone', '8123572501'),
                    }),
                };
                console.log('b:', body);
                // debugger
                axios({
                    url: `${process.env.APPLICATION_BFF_URL}/payment/ccavenue/token`,
                    method: 'POST',
                    data: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Method': 'access-control-request-method' || '*',
                        'Access-Control-Allow-Headers': 'access-control-request-headers' || '*',
                    },
                })
                    .then((response) => {
                        console.log('res:', response.data);
                //         // let formData = new FormData();
                //         // formData.append("username", "Groucho");
                //         // formData.append("accountnum", 123456);
                //         // console.log('form:', formData);
                //         // document.getElementById("nonseamless").action = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';
                //         // document.getElementById("encRequest").name  = 'b';
                        document.getElementById('encRequest').value = response.data.encRequest; //  'dc0458991d58466f303d07feb7fc6e590e3d47a48665415a59271dbe87ab994a650bc153873969fb73c717a574997a48a8eac310f094d1d07d9dea0f05fbda255ea2ab2c004b875142856e8743269adf0004f6531ccd30eb525c87477073c62e1a4b05a76350cb04d5c1429c3406aed42e6e48080afcea67d5b87950448bd44431ac88b700f0838bda353b835c5950345865bc8fa279224b17681ba9bd62a377630ce0d595b618d5058c31279bc2c403c3a7cdb8762dbefb5fff30479eaab22df3b12af725b1dc8d3c4dc14a859a53295f3e9c6577cba5291c50dd9119d4e18578bb61395b3aae538b849bf9fb0116254a32527193de6badad0b58665d291005ac8e310b5002325661775e8a1a800719ae446745319030b34cdcd778eb7a99daba82f09088af072adc88e2eba24955b85582e5081bf3e214ef53bc9cdab1539784fc7cc6db634d4dc1c5b294e85c01868c37bb36388547d62f28ea278c21bcf5d7d418d48a5b998cd3c0e65d34b3258f6da186ca854a8be4aa317902e61eb5e83fcd63252bce1f96e41b069dc787d7b69d60eea052c47d51908d4620d093b74f76a1bf3c66832b773f6cb0e9e1418908d1bb9aff94931dccdb6c07638d2c80e649fb3495b366e4cc55dd75ca749089a8359c38c3873d779ae520d3800d60a678e9ecffc345901fde26305cebf5f3a848288471abae7b7d31324fa2bea3c7364216b6e252c3e09df16ff4cf9742d0f83bba3864e5c83e56dcc8865b8cc7ce4283a0adbe0855efab8449df9378530e1ee7cef6dc4b8db2a9ca3f16aa81248cfb4a431f36c7a93727aafc480471a88bf8141d2f97b0fe240032bcb19bcb4e863cbce033d3934c70cc91dd39fba523d7ff2fd0eae2db0898961a9b85ef07beedd63bdefa22091bad43ea1cb2386e0e92210573032076959906c71a34a8f08019c1005b45ec2187275c4521a30a2df58da65fc8260eef50774895c8e128ae53dd9f4dfdc72472edbd004e96050adcfddab1a04ca9f74264fe111ef774bbc98750667badaaf8da7b208c0377ff2cda4af9b11f' //
                //         // document.getElementById("access_code").name  = 'b';
                        document.getElementById('access_code').value = response.data.accessCode; // 'AVXL88GK63AI87LXIA'//
                        document.getElementById('nonseamless').submit();
                    });
            } else {
                // Register artists
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log('next:', nextProps);
        if (nextProps.artistReg) {
            console.log('next artistReg:', nextProps.artistReg);
            // this.setState({ errors: { ...this.state.errors, email: 'Already registered. Try with different one.' } });
        }

        // this.props.addToCart(this.state.dummyProd);

        if (!_isEmpty(_get(nextProps, 'firstCartData'))) {
            if (_get(nextProps, ['firstCartData', 'cart', 0, 'code']) === -2) {
                // if (_get(nextProps, ['firstCartData', 'cart', 0, 'total_products_in_cart']) === 0) {
                    this.props.addToCart(this.state.dummyProd);
                // }
            }
        }
    }

    render() {
        // console.log('err:', this.state);
        return (
            <div className='container'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 marginCustom'>
                    <h1>Artist Registration</h1>
                    {/* <form name="registerform">
                        <ul>
                            <li> */}
                    <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 vendor-registration'>
                        <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 vendor-fields">
                            <label className="required">First Name<em>*</em></label>
                            <input name="firstName" id="firstName" title="First Name" className="field-input"
                                onBlur={this.onBlur}
                                type="text" onChange={this.handleChange} value={this.state.firstName} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'firstName')}</label>
                        </div>
                        {/* </li>
                                <li>     */}
                        <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 vendor-fields">
                            <label className="required">Last Name<em>*</em></label>
                            <input name="lastName" id="lastName" title="Last Name" className="field-input"
                                onBlur={this.onBlur}
                                type="text" onChange={this.handleChange} value={this.state.lastName} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'lastName')}</label>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 vendor-fields">
                            <label className="required">Address Line1<em>*</em></label>
                            <input name="addressLine1" id="addressLine1" title="Address Line1" className="field-input"
                                onBlur={this.onBlur}
                                type="text" onChange={this.handleChange} value={this.state.addressLine1} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'addressLine1')}</label>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 vendor-fields">
                            <label className="required">Address Line2<em>*</em></label>
                            <input name="addressLine2" id="addressLine2" title="Address Line2" className="field-input"
                                onBlur={this.onBlur}
                                type="text" onChange={this.handleChange} value={this.state.addressLine2} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'addressLine2')}</label>
                        </div>
                        <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 vendor-fields">
                            <label className="required">State<em>*</em></label>
                            <input name="state" id="state" title="State" className="field-input"
                                onBlur={this.onBlur}
                                type="text" onChange={this.handleChange} value={this.state.state} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'state')}</label>
                        </div>
                        <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 vendor-fields">
                            <label className="required">City<em>*</em></label>
                            <input name="city" id="city" title="City" className="field-input"
                                onBlur={this.onBlur}
                                type="text" onChange={this.handleChange} value={this.state.city} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'city')}</label>
                        </div>
                        <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 vendor-fields">
                            <label className="required">Zipcode<em>*</em></label>
                            <input name="zipcode" id="zipcode" title="Zipcode" className="field-input"
                                onBlur={this.onBlur}
                                maxLength={6}
                                type="text" onChange={this.handleChange} value={this.state.zipcode} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'zipcode')}</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 vendor-fields">
                            <label className="required">Email Id<em>*</em></label>
                            <input name="email" id="email" title="Email Id" className="field-input"
                                onBlur={this.onBlur}
                                onBlur={this.handleEmailValidation}
                                type="text" onChange={this.handleChange} value={this.state.email} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'email')}</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 vendor-fields">
                            <label className="required">Password<em>*</em></label>
                            <input name="password" id="password" title="Password" className="field-input"
                                onBlur={this.onBlur}
                                type="password" onChange={this.handleChange} value={this.state.password} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'password')}</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 vendor-fields">
                            <label className="required">Confirm Password<em>*</em></label>
                            <input name="confirmPassword" id="confirmPassword" title="Confirm Password" className="field-input"
                                onBlur={this.comparePassword}
                                type="password" onChange={this.handleChange} value={this.state.confirmPassword} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'confirmPassword')}</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 vendor-fields">
                            <label className="required">Phone Number
                            {/* <em>*</em> */}
                            </label>
                            <input name="telephone" id="telephone" title="Phone Number" className="field-input"
                                onBlur={this.onBlur}
                                type="text" onChange={this.handleChange} value={this.state.telephone} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'telephone')}</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 vendor-fields">
                            <label className="required">GST Number
                            {/* <em>*</em> */}
                            </label>
                            <input name="gstNo" id="gstNo" title="GST Number" className="field-input"
                                onBlur={this.onBlur}
                                type="text" onChange={this.handleChange} value={this.state.gstNo} />
                            <br /><label style={{ color: 'red' }}>{_get(this.state.errors, 'gstNo')}</label>
                        </div>
                    </div>
                    {/* </li>
                        </ul>
                    </form> */}
                    <button className='btn btn-primary reg-button' onClick={this.handleProceedToCheckout}>
                        {this.state.collectPayment ? 'Proceed for payment!' : 'Register'}
                    </button>
                </div>
                <form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
                    <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '" />
                    <input type="hidden" id="access_code" name="access_code" value="' + accessCode + '" />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    verifyEmailId: data => dispatch(verifyEmailId(data)),
    getCartData: data => dispatch(fetchFirstCartData(data)),
    addToCart: data => dispatch(postAddToCartData(data)),
});

const mapStateToProps = (state) => {
    const {
        loginReducer, cartReducer,
    } = state;

    const {
        artistReg,
        isFetching: isLoading,
    } = loginReducer || [];

    const {
        firstCartData,
        // cartType,
        // error: cartError,
    } = cartReducer || [];

    // const error = !_isEmpty(loginError) || _isError(loginError);

    return {
        artistReg,
        isLoading,
        // error,
        firstCartData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(VendorRegistration));
