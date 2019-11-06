// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
// import Loader from '../../../components/Loader/Loader.jsx';
import { fetchAddAddressData, fetchEditAddress } from '../../../actions/address';
import AddNewAddressComponent from '../../../components/MyAccount/AddNewAddressComponent.jsx';
import OneColumLeft from '../../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import ErrorBoundary from '../../ErrorBoundary.jsx';
import ErrorHandler from '../../../components/Hoc/ErrorHandler.jsx';
import { fetchStateListData } from '../../../actions/register';

class AddNewAddressContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            country: '',
            region: '',
            isShipping: undefined,
            isBilling: undefined,
            sucessMsg: undefined,
            redirect: false,
            selectedAddress: undefined,
            isEdit: false,
            isBillingFlag: false,
            isShippingFlag: false,
            showStates: true,
            selectStateValue: '',
            stateListRes: undefined,
            isDefaultChange: false,
            stateId: '',
        };
    }

    selectCountry = (val) => {
        this.setState({ country: val });
        if (val === 'US') {
            this.setState({
                showStates: true,
            });
        } else {
            this.setState({
                showStates: false,
            });
        }
    }

    handleStateChange = (event) => {
        this.setState({
            selectStateValue: event.target.value,
        });
    }

    handleUSStateChange = (event) => {
        const { options, selectedIndex } = event.target;
        this.setState({
            selectStateValue: event.target.value,
            stateId: options[selectedIndex].id,
        });
    }

    selectRegion = (val) => {
        this.setState({ region: val });
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.state.country) {
            formIsValid = false;
            errors.country = 'This is a required field.';
        }

        if (!this.state.selectStateValue) {
            formIsValid = false;
            errors.selectStateValue = 'This is required fields';
        }

        if (!fields.firstName) {
            formIsValid = false;
            errors.firstName = 'This is required fields';
        }
        if (typeof fields.firstName !== 'undefined') {
            if (!fields.firstName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.firstName = 'First Name is not valid';
            }
        }
        if (typeof fields.middleName !== 'undefined') {
            if (fields.middleName !== '' && fields.middleName && !fields.middleName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.middleName = 'Middle Name is not valid';
            }
        }
        if (!fields.lastName) {
            formIsValid = false;
            errors.lastName = 'This is required fields';
        }
        if (typeof fields.lastName !== 'undefined') {
            if (!fields.lastName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.lastName = 'Last Name is not valid';
            }
        }

        if (!fields.telephone) {
            formIsValid = false;
            errors.telephone = 'This is required fields';
        } else if (!fields.telephone.match(/^[0-9]+$/)) {
            formIsValid = false;
            errors.telephone = 'Telephone is not valid';
        }
        if (!fields.streetAddress1) {
            formIsValid = false;
            errors.streetAddress1 = 'This is required fields';
        }
        if (!fields.city) {
            formIsValid = false;
            errors.city = 'This is required fields';
        }
        if (!fields.postalCode) {
            formIsValid = false;
            errors.postalCode = 'This is required fields';
        }

        if (!fields.defaultBilling) {
            this.setState({ isBilling: 0 });
        } else {
            this.setState({ isBilling: 1 });
        }

        if (!fields.defaultShipping) {
            this.setState({ isShipping: 0 });
        } else {
            this.setState({ isShipping: 1 });
        }

        this.setState({ errors });
        return formIsValid;
    }

    handleChange = (event) => {
        let { fields } = this.state;
        switch (event.target.id) {
            case 'defaultBilling':
            case 'defaultShipping':
                fields[event.target.id] = event.target.checked ? 1 : 0;
                break;
            default: fields[event.target.id] = event.target.value;
        }
        this.setState({ fields });
    }

    handleSaveAddress = () => {
        if (this.handleValidation()) {
            const addressObj = {
                apiToken: this.props.apiToken,
                addressId: this.state.fields.addressId,
                firstName: this.state.fields.firstName,
                middleName: this.state.fields.middleName,
                lastName: this.state.fields.lastName,
                company: this.state.fields.company,
                addressLine1: this.state.fields.streetAddress1,
                addressLine2: this.state.fields.streetAddress2,
                city: this.state.fields.city,
                countryId: this.state.country,
                // state: this.state.region,
                state: this.state.selectStateValue,
                stateId: this.state.stateId,
                zipCode: this.state.fields.postalCode,
                phone: this.state.fields.telephone,
                isShipping: _get(this.state, 'fields.defaultShipping', 0),
                isBilling: _get(this.state, 'fields.defaultBilling', 0),
            };

            if (this.state.isEdit) {
                this.props.saveAddress(addressObj);
            } else {
                this.props.getAddAddressData(addressObj);
            }
        }
    }

    componentDidMount() {
        this.props.getStateListData({ countryCode: this.state.country });
        if (this.props.history.location.state !== undefined) {
            const object = this.props.history.location.state.selectedAddress;

            const selectedAddress = {
                addressId: _get(object, 'entity_id', ''),
                firstName: _get(object, 'firstname', ''),
                middleName: _get(object, 'middlename', ''),
                lastName: _get(object, 'lastname', ''),
                company: _get(object, 'company', ''),
                telephone: _get(object, 'telephone', ''),
                fax: _get(object, 'fax', ''),
                streetAddress1: _get(object, 'address_line1', ''),
                streetAddress2: _get(object, 'address_line2', ''),
                city: _get(object, 'city', ''),
                postalCode: _get(object, 'zipcode', ''),
                defaultBilling: undefined,
                defaultShipping: undefined,
                stateId: _get(object, 'state_id', ''),
            };

            this.selectCountry(_get(object, 'country_id', ''));
            this.selectRegion(_get(object, 'state', ''));

            this.setState({
                fields: selectedAddress,
                stateId: selectedAddress.stateId,
                isEdit: true,
                isBillingFlag: _get(this.props, 'history.location.state.isBilling', false),
                isShippingFlag: _get(this.props, 'history.location.state.isShipping', false),
                isDefaultChange: _get(this.props, 'history.location.state.isDefaultChange', false),
            });
        }
        if (_get(this.props, 'history.location.state.isDefaultChange', false)) {
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'addAddressData'))) {
            const message = (_get(nextProps.addAddressData, 'code') === 1) ? 'Address Added Successfully.' : 'Add Address Failed.';
            this.setState({
                sucessMsg: message,
                redirect: true,
            });
        }

        if (!_isEmpty(_get(nextProps, 'editAddressData'))) {
            if (_get(nextProps.editAddressData, 0)) {
                const message = (_get(nextProps.editAddressData[0], 'code') === 1) ? 'Address Updated Successfully.' : 'Address Update Failed.';
                this.setState({
                    sucessMsg: message,
                    redirect: true,
                });
            }
        }

        if (!_isEmpty(_get(nextProps, 'stateListData'))) {
            if (_get(nextProps.stateListData, [0, 'code']) === 1) {
                const { stateId } = this.state;
                const stateListRes = _get(nextProps.stateListData, [0, 'result']);
                const tempValue = stateListRes && stateListRes.length && stateListRes.filter(each => each.region_id == stateId);
                this.setState({
                    stateListRes: _get(nextProps.stateListData, [0, 'result']),
                    selectStateValue: tempValue && tempValue[0].code,
                });
            }
        }
    }

    handleBackClick = () => {
        this.props.history.push('/customer/account/address');
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={{
                pathname: '/customer/account/address',
                state: { sucessMsg: this.state.sucessMsg },
            }} />;
        }
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        return (
            <div className="container">
                <div className='container-block'>
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <ErrorBoundary>
                            <OneColumLeft
                                salesRepUser={this.props.salesRepUser}
                                primeUser={this.props.primeUser}
                                rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                            />
                        </ErrorBoundary>
                    </div>
                    <div className="col-md-9 col-sm-8 col-xs-12">
                        {/* {!_isEmpty(this.state.sucessMsg)?<span className="sucessMsg">{this.state.sucessMsg}</span>:''} */}
                        <ErrorBoundary>
                            <AddNewAddressComponent
                                handleBackClick={this.handleBackClick}
                                handleSaveAddress={this.handleSaveAddress}
                                handleChange={this.handleChange}
                                errors={this.state.errors}
                                fields={this.state.fields}
                                selectCountry={this.selectCountry}
                                selectRegion={this.selectRegion}
                                country={this.state.country}
                                region={this.state.region}
                                // fields={this.state.selectedAddress}
                                pageTitle={this.state.isEdit ? 'Edit Address' : 'Add New Address'}
                                isBillingFlag={this.state.isBillingFlag}
                                isShippingFlag={this.state.isShippingFlag}
                                showStates={this.state.showStates}
                                stateListRes={this.state.stateListRes}
                                handleStateChange={this.handleStateChange}
                                selectStateValue={this.state.selectStateValue}
                                handleUSStateChange={this.handleUSStateChange}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getAddAddressData: data => dispatch(fetchAddAddressData(data)),
    saveAddress: data => dispatch(fetchEditAddress(data)),
    getStateListData: data => dispatch(fetchStateListData(data)),
});

const mapStateToProps = (state) => {
    const { allAddressReducer, loginReducer, registerReducer } = state;

    const {
        apiToken,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        addAddressData,
        editAddressData,
        isFetching: isLoading,
        error: allAddressError,
    } = allAddressReducer || [];

    const {
        stateListData,
        error: registerError,
    } = registerReducer || [];

    const error = !_isEmpty(registerError) || _isError(registerError) || !_isEmpty(allAddressError) || _isError(allAddressError) || !_isEmpty(loginError) || _isError(loginError);

    return {
        addAddressData,
        editAddressData,
        stateListData,
        isLoading,
        apiToken,
        salesRepUser,
        error,
        primeUser,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(AddNewAddressContainer));
