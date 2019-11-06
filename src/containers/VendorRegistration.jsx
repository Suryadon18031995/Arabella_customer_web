import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import { fetchVendorRegistrationData } from '../actions/vendorRegisteration';
import { fetchCategoriesList } from '../actions/login';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

class VendorRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            vendorAddressUrl: undefined,
        };
    }

    handleValidation() {
        const fields = this.state.fields;
        const errors = {};
        let formIsValid = true;

        // country
        if (!fields.country) {
            formIsValid = false;
            errors.country = 'This is a required field.';
        }
        if (typeof fields.country !== 'undefined') {
            if (!fields.country.match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors.country = 'Country is not valid';
            }
        }

        // region_id
        if (!fields.regionId) {
            formIsValid = false;
            errors.regionId = 'This is a required field.';
        }

        // zip
        if (!fields.zip) {
            formIsValid = false;
            errors.zip = 'This is a required field.';
        }
        if (typeof fields.zip !== 'undefined') {
            if (!fields.zip.match(/^[0-9 ]+$/)) {
                formIsValid = false;
                errors.zip = 'Zipcode is not valid';
            }
        }

        // city
        if (!fields.city) {
            formIsValid = false;
            errors.city = 'This is a required field.';
        }
        if (typeof fields.city !== 'undefined') {
            if (!fields.city.match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors.city = 'City is not valid';
            }
        }

        // street addr
        if (!fields.streetAddress) {
            formIsValid = false;
            errors.streetAddress = 'This is a required field.';
        }

        // attentionto
        if (!fields.attentionTo) {
            formIsValid = false;
            errors.attentionTo = 'This is a required field.';
        }

        if (typeof fields.attentionTo !== 'undefined') {
            if (!fields.attentionTo.match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors.attentionTo = 'Attention to name is not valid';
            }
        }

        // subdomain
        if (!fields.preferredSubdomainName) {
            formIsValid = false;
            errors.preferredSubdomainName = 'This is a required field.';
        }
        if (typeof fields.preferredSubdomainName !== 'undefined') {
            if (!fields.preferredSubdomainName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.preferredSubdomainName = 'Sub domain name is not valid';
            }
        }

        // Preferred Shipping Carrier
        if (!fields.preferredShippingCarrier) {
            formIsValid = false;
            errors.preferredShippingCarrier = 'This is a required field.';
        }

        // Shop Name
        if (!fields.shopName) {
            formIsValid = false;
            errors.shopName = 'This is a required field.';
        }

        if (typeof fields.shopName !== 'undefined') {
            if (!fields.shopName.match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors.shopName = 'Shop name is not valid';
            }
        }

        // phone number
        if (!fields.phoneNumber) {
            formIsValid = false;
            errors.phoneNumber = 'This is a required field.';
        }

        if (typeof fields.phoneNumber !== 'undefined') {
            if (!fields.phoneNumber.match(/^[0-9]+$/)) {
                formIsValid = false;
                errors.phoneNumber = 'Phone number is not valid';
            }
        }

        // Email
        if (!fields.email) {
            formIsValid = false;
            errors.email = 'This is a required field.';
        }

        if (typeof fields.email !== 'undefined') {
            const lastAtPos = fields.email.lastIndexOf('@');
            const lastDotPos = fields.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') === -1 &&
                lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors.email = 'Email is not valid';
            }
        }

        if (!fields.comments) {
            this.state.fields.comments = 'NA';
        }
        if (!fields.streetAddress2) {
            this.state.fields.streetAddress2 = 'NA';
        }

        this.setState({ errors });
        return formIsValid;
    }

    registerSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            this.props.getVendorRegistrationData({
                shopName: this.state.fields.shopName,
                phoneNumber: this.state.fields.phoneNumber,
                email: this.state.fields.email,
                preferredShippingCarrier: this.state.fields.preferredShippingCarrier,
                preferredSubdomainName: this.state.fields.preferredSubdomainName,
                comments: this.state.fields.comments,
                attentionTo: this.state.fields.attentionTo,
                streetAddress: this.state.fields.streetAddress,
                streetAddress2: this.state.fields.streetAddress2,
                city: this.state.fields.city,
                zip: this.state.fields.zip,
                regionId: this.state.fields.regionId,
                country: this.state.fields.country,
                logo: this.state.fields.logo,
            });
        }
    }

    handleChange = (event) => {
        const fields = this.state.fields;
        fields[event.target.id] = event.target.value;
        this.setState({ fields });
    }

    componentDidMount() {
        document.title = 'Dropship Vendor Interface';
        this.props.getVendorRegisterUrl();
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'categoriesListData'))) {
            if (_get(nextProps, 'categoriesListData.status') === 'true') {
                this.setState({ vendorAddressUrl: _get(nextProps, 'categoriesListData.serverAddress') });
            }
        }
    }


    render() {
        return (
            // <div className="container">
            <div className='container-block'>

                <div className="vregistration container">
                    <div className="title-box active"><h1>Become a Vendor</h1></div>
                    <div className="title"><h1>Vendor Registration</h1></div>
                    <div className="em-col-main col-sm-24">
                        <form name="registerform" onSubmit={this.registerSubmit.bind(this)} >
                            <ul>
                                <li>
                                    <div className="input-field">
                                        <label className="required">Shop Name<em>*</em></label>
                                        <input name="shopName" id="shopName" title="Shop Name" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.shopName} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.shopName}</span>
                                    </div>
                                    <div className="input-field">
                                        <label className="required">Phone Number<em>*</em></label>
                                        <input name="phoneNumber" id="phoneNumber" title="Phone Number" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.phoneNumber} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.phoneNumber}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-field">
                                        <label className="required">Email Address<em>*</em></label>
                                        <input name="email" id="email" title="Email Address" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.email} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.email}</span>
                                    </div>
                                    <div className="input-field">
                                        <label className="required">Preferred Shipping Carrier<em>*</em></label>
                                        <select name="preferredShippingCarrier" id="preferredShippingCarrier" className="field-input" onChange={this.handleChange} value={this.state.fields.preferredShippingCarrier}>
                                            <option value="" defaultValue="selected">* Please select</option>
                                            <option value="fedex">Federal Express</option>
                                            <option value="ups">United Parcel Service</option>
                                        </select>
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.preferredShippingCarrier}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-field">
                                        <label className="required">Preferred Subdomain Name<em>*</em></label>
                                        <span className="what-is-ttl" title="An Internet domain which is part of your profile">&#63;</span>
                                        <div className="psubdomain2"><strong>bloomkonnect.com/</strong></div>
                                        <input name="preferredSubdomainName" id="preferredSubdomainName" title="Preferred Subdomain Name" className="psubdomain" type="text" onChange={this.handleChange} value={this.state.fields.preferredSubdomainName} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.preferredSubdomainName}</span>
                                    </div>
                                    <div className="input-field">
                                        <label className="required">Comments</label>
                                        <textarea id="comments" name="comments" rows="2" cols="15" className=" input-text textarea" type="text" onChange={this.handleChange} value={this.state.fields.comments} />
                                    </div>
                                </li>
                                <li>
                                    <div className="input-field">
                                        <label className="required">Attention To<em>*</em></label>
                                        <input name="attentionTo" id="attentionTo" title="Attention To" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.attentionTo} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.attentionTo}</span>
                                    </div>
                                    <div className="input-field">
                                        <label className="required">Street Address<em>*</em></label>
                                        <input name="streetAddress" id="streetAddress" title="Street Address" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.streetAddress} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.streetAddress}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-field">
                                        <label className="required">Street Address Line 2</label>
                                        <input name="streetAddress2" id="streetAddress2" title="Street Address Line 2" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.streetAddress2} />
                                    </div>
                                    <div className="input-field">
                                        <label className="required">City<em>*</em></label>
                                        <input name="city" id="city" title="City" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.city} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.city}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-field">
                                        <label className="required">Zip/Postal Code<em>*</em></label>
                                        <input name="zip" id="zip" title="Zip" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.zip} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.zip}</span>
                                    </div>
                                    <div className="input-field">
                                        <label className="required">State/Province<em>*</em></label>
                                        <select id="regionId" name="regionId" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.regionId} >
                                            <option value="" defaultValue="selected">Please select region, state or province</option>
                                            <option value="Alabama">Alabama</option>
                                            <option value="Alaska">Alaska</option>
                                            <option value="American Samoa">American Samoa</option>
                                            <option value="Arizona">Arizona</option>
                                            <option value="Arkansas">Arkansas</option>
                                            <option value="Armed Forces Africa">Armed Forces Africa</option>
                                            <option value="Armed Forces Americas">Armed Forces Americas</option>
                                            <option value="Armed Forces Canada">Armed Forces Canada</option>
                                            <option value="Armed Forces Europe">Armed Forces Europe</option>
                                            <option value="Armed Forces Middle East">Armed Forces Middle East</option>
                                            <option value="Armed Forces Pacific">Armed Forces Pacific</option>
                                            <option value="California">California</option>
                                            <option value="Colorado">Colorado</option>
                                            <option value="Connecticut">Connecticut</option>
                                            <option value="Delaware">Delaware</option>
                                            <option value="District of Columbia">District of Columbia</option>
                                            <option value="Federated States Of Micronesia">Federated States Of Micronesia</option>
                                            <option value="Florida">Florida</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Guam">Guam</option>
                                            <option value="Hawaii">Hawaii</option>
                                            <option value="Idaho">Idaho</option>
                                            <option value="Illinois">Illinois</option>
                                            <option value="Indiana">Indiana</option>
                                            <option value="Iowa">Iowa</option>
                                            <option value="Kansas">Kansas</option>
                                            <option value="Kentucky">Kentucky</option>
                                            <option value="Louisiana">Louisiana</option>
                                            <option value="Maine">Maine</option>
                                            <option value="Marshall Islands">Marshall Islands</option>
                                            <option value="Maryland">Maryland</option>
                                            <option value="Massachusetts">Massachusetts</option>
                                            <option value="Michigan">Michigan</option>
                                            <option value="Minnesota">Minnesota</option>
                                            <option value="Mississippi">Mississippi</option>
                                            <option value="Missouri">Missouri</option>
                                            <option value="Montana">Montana</option>
                                            <option value="Nebraska">Nebraska</option>
                                            <option value="Nevada">Nevada</option>
                                            <option value="New Hampshire">New Hampshire</option>
                                            <option value="New Jersey">New Jersey</option>
                                            <option value="New Mexico">New Mexico</option>
                                            <option value="New York">New York</option>
                                            <option value="North Carolina">North Carolina</option>
                                            <option value="North Dakota">North Dakota</option>
                                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                            <option value="Ohio">Ohio</option>
                                            <option value="Oklahoma">Oklahoma</option>
                                            <option value="Oregon">Oregon</option>
                                            <option value="Palau">Palau</option>
                                            <option value="Pennsylvania">Pennsylvania</option>
                                            <option value="Puerto Rico">Puerto Rico</option>
                                            <option value="Rhode Island">Rhode Island</option>
                                            <option value="South Carolina">South Carolina</option>
                                            <option value="South Dakota">South Dakota</option>
                                            <option value="Tennessee">Tennessee</option>
                                            <option value="Texas">Texas</option>
                                            <option value="Utah">Utah</option>
                                            <option value="Vermont">Vermont</option>
                                            <option value="Virgin Islands">Virgin Islands</option>
                                            <option value="Virginia">Virginia</option>
                                            <option value="Washington">Washington</option>
                                            <option value="West Virginia">West Virginia</option>
                                            <option value="Wisconsin">Wisconsin</option>
                                            <option value="Wyoming">Wyoming</option>
                                        </select>
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.regionId}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-field">
                                        <label className="required">Country<em>*</em></label>
                                        <input name="country" id="country" title="Country" className="field-input" type="text" onChange={this.handleChange} value={this.state.fields.country} />
                                        <br /><span style={{ color: 'red' }}>{this.state.errors.country}</span>
                                    </div>
                                    <div className="input-field">
                                        <label className="required">Logo Image</label>
                                        <input id="logo" name="logo" value={this.state.fields.logo} type="file" className=" input-file" onChange={this.handleChange} />
                                    </div>
                                </li>
                                <li>
                                    <div className="buttons-set">
                                        <p className="required">* Required Fields</p>
                                        <button type="submit" title="Register" className="button" >
                                            <span>
                                                <span>Register</span>
                                            </span>
                                        </button>

                                    </div>
                                    <p className="required">
                                        <a href={`${this.state.vendorAddressUrl}bkm/vendor/`}>
                                            <i className="fa fa-angle-double-left"></i> Return to log in</a>
                                    </p>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getVendorRegistrationData: data => dispatch(fetchVendorRegistrationData(data)),
    getVendorRegisterUrl: data => dispatch(fetchCategoriesList(data)),
});

const mapStateToProps = (state) => {
    const { loginReducer } = state;
    const {
        categoriesListData,
        error: loginError,
    } = loginReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError);

    return {
        categoriesListData,
        error,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(VendorRegistration));
