import React from 'react';
import Redirect from 'react-router/Redirect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import connect from 'react-redux/lib/connect/connect';
import { fetchAllAddressData, fetchEditAddress, fetchDeleteAddress } from '../../../actions/address';
import BreadCrumbs from '../../../components/Common/BreadCrumbs.jsx';
import AddressBookComponent from '../../../components/MyAccount/AddressBookComponent.jsx';
import OneColumLeft from '../../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import Loader from '../../../components/Loader/Loader.jsx';
import ErrorHandler from '../../../components/Hoc/ErrorHandler.jsx';
import ErrorBoundary from '../../ErrorBoundary.jsx';

class AddressBookContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAddresses: undefined,
            billingAddressId: undefined,
            shippingAddressId: undefined,
            billingAddress: undefined,
            shippingAddress: undefined,
            otherAddress: [],
            successMessage: undefined,
            // showMsg: true,
            addrEntityId: undefined,
            deleteAddressMessage: undefined,
            selectedAddress: '',
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
            isEdit: false,
            isDelete: false,
            isBilling: false,
            isShipping: false,
        };
    }

    UNSAFE_componentWillMount() {
        this.props.getAllAddressData({
            apiToken: this.props.apiToken,
        });
    }

    componentDidMount() {
        document.title = 'Address Book';
        if (this.props.history.location.state !== undefined) {
            this.setState({
                successMessage: this.props.history.location.state.sucessMsg,
            });
        }
    }

    populateAddress = addressObj => ({
        entity_id: _get(addressObj, 'entity_id', ''),
        company: _get(addressObj, 'company', ''),
        street: _get(addressObj, 'address_line1', '') + ' ' + ((_get(addressObj, 'address_line2', '') === null) ? '' : _get(addressObj, 'address_line2', '')),
        city: _get(addressObj, 'city'),
        region: _get(addressObj, 'state'),
        postcode: _get(addressObj, 'zipcode'),
        country_name: _get(addressObj, 'country_name'),
        telephone: _get(addressObj, 'telephone'),
    });

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps.allAddressData, 'result'))) {
            const allAddresses = _get(nextProps.allAddressData, ['result', 0]);
            const billingAddressId = _get(nextProps.allAddressData, 'billingAddressId');
            const shippingAddressId = _get(nextProps.allAddressData, 'defaultShippingId');
            let billingAddress = '';
            let shippingAddress = '';

            const otherAddress = allAddresses.length && allAddresses.map((eachAddress) => {
                if (eachAddress.entity_id === billingAddressId && eachAddress.entity_id === shippingAddressId) {
                    billingAddress = this.populateAddress(eachAddress);
                    shippingAddress = billingAddress;
                } else if (eachAddress.entity_id === billingAddressId) {
                    billingAddress = this.populateAddress(eachAddress);
                } else if (eachAddress.entity_id === shippingAddressId) {
                    shippingAddress = this.populateAddress(eachAddress);
                } else return this.populateAddress(eachAddress);
            }).filter(o => o);

            this.setState({
                allAddresses,
                billingAddressId,
                shippingAddressId,
                billingAddress,
                shippingAddress,
                otherAddress,
            });
        }

        if (!_isEmpty(nextProps.deleteAddressData)) {
            const message = (_get(nextProps.deleteAddressData, 'code') === 1) ? 'Address Deleted Successfully.' : 'Delete Address Failed.';
            const allAddresses = _get(nextProps.deleteAddressData, ['result', 0]);
            const billingAddressId = _get(nextProps.deleteAddressData, 'billingAddressId');
            const shippingAddressId = _get(nextProps.deleteAddressData, 'defaultShippingId');
            let billingAddress = '';
            let shippingAddress = '';

            const otherAddress = allAddresses.length && allAddresses.map((eachAddress) => {
                if (eachAddress.entity_id === billingAddressId) {
                    billingAddress = this.populateAddress(eachAddress);
                } else if (eachAddress.entity_id === shippingAddressId) {
                    shippingAddress = this.populateAddress(eachAddress);
                } else return this.populateAddress(eachAddress);
            }).filter(o => o);

            this.setState({
                allAddresses,
                billingAddressId,
                shippingAddressId,
                billingAddress,
                shippingAddress,
                otherAddress,
                deleteAddressMessage: message,
            });
        }
    }

    handleBackClick = () => {
        this.props.history.go(-1);
    };

    handleAddAddress = () => {
        this.props.history.push('/customer/account/address/new');
    };

    handleDeleteAddress = (event) => {
        this.setState({
            successMessage: undefined,
            isDelete: true,
        });

        this.props.getDeleteAddress({
            addressId: event.target.value,
            apiToken: this.props.apiToken,
        });
    };

    handleEditAddress = (event) => {
        const { allAddresses } = this.state;

        allAddresses.forEach((eachAddress) => {
            // eslint-disable-next-line radix
            if (parseInt(eachAddress.entity_id) === event.target.value) {
                this.setState({
                    selectedAddress: eachAddress,
                    isEdit: true,
                    isBilling: eachAddress.entity_id === this.state.billingAddressId,
                    isShipping: eachAddress.entity_id === this.state.shippingAddressId,
                    isDefaultChange: event.target.id === 'default',
                });
            }
        });
    };

    render() {
        if (this.state.isEdit) {
            return <Redirect push to={{
                pathname: '/customer/account/address/edit',
                state: {
                    selectedAddress: this.state.selectedAddress,
                    isBilling: this.state.isBilling,
                    isShipping: this.state.isShipping,
                    isDefaultChange: this.state.isDefaultChange,
                },
            }} />;
        }

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
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
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
                        <ErrorBoundary>
                            <AddressBookComponent
                                billingAddress={this.state.billingAddress}
                                shippingAddress={this.state.shippingAddress}
                                otherAddress={this.state.otherAddress}
                                handleEditAddress={this.handleEditAddress}
                                handleDeleteAddress={this.handleDeleteAddress}
                                handleBackClick={this.handleBackClick}
                                handleAddAddress={this.handleAddAddress}
                                successMessage={this.state.successMessage}
                                deleteAddressMessage={this.state.deleteAddressMessage}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getAllAddressData: data => dispatch(fetchAllAddressData(data)),
    getDeleteAddress: data => dispatch(fetchDeleteAddress(data)),
    getEditAddress: data => dispatch(fetchEditAddress(data)),
});

const mapStateToProps = (state) => {
    const { allAddressReducer, loginReducer } = state;


    const {
        apiToken,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        allAddressData,
        deleteAddressData,
        type,
        isFetching: isLoading,
        error: allAddressError,
    } = allAddressReducer || [];

    const error = !_isEmpty(allAddressError) || _isError(allAddressError) || !_isEmpty(loginError) || _isError(loginError);

    return {
        allAddressData,
        deleteAddressData,
        isLoading,
        apiToken,
        salesRepUser,
        type,
        error,
        primeUser,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(AddressBookContainer));
