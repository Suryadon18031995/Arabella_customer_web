import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

var addressBook = (props) => {
    
    return (
        <div className="col-md-9 col-sm-8 col-xs-12">
            <div className="my-account">
                <div className="page-title">
                    <h1>Address Book</h1>
                </div>
                {/* {sucessMsg} */}
                {!_isEmpty(props.successMessage) ? <span className="sucessMsg">{props.successMessage}</span> : ''}
                {!_isEmpty(props.deleteAddressMessage) ? <span className="sucessMsg">{props.deleteAddressMessage}</span> : ''}
                <div className="recurring-profiles">
                    <div className="box-account-content">
                        <div className="col-1 addresses-primary">
                            <ol>

                                <li className="item">
                                    <h3>Default Billing Address</h3>
                                    <address>
                                        <br />{_get(props.billingAddress, 'company')}<br />{_get(props.billingAddress, 'street')}
                                        <br />{_get(props.billingAddress, 'city')}, {_get(props.billingAddress, 'region')}, {_get(props.billingAddress, 'postcode')}
                                        <br />{_get(props.billingAddress, 'country_name')}<br /> T: {_get(props.billingAddress, 'telephone')}
                                    </address>
                                    <ul>
                                        <li onClick={(event) => props.handleEditAddress(event)} value={_get(props.billingAddress, 'entity_id')}>Edit Address</li>
                                    </ul>
                                    {/* <ul><li onClick={(event) => props.handleEditAddress(event)} value={_get(props.billingAddress, 'entity_id')}>Change Billing Address</li></ul> */}
                                </li>

                                <li className="item">
                                    <h3>Default Shipping Address</h3>
                                    <address>
                                        <br />{_get(props.shippingAddress, 'company')}<br />{_get(props.shippingAddress, 'street')}
                                        <br />{_get(props.shippingAddress, 'city')}, {_get(props.shippingAddress, 'region')}, {_get(props.shippingAddress, 'postcode')}
                                        <br />{_get(props.shippingAddress, 'country_name')}<br /> T: {_get(props.shippingAddress, 'telephone')}
                                    </address>
                                    <ul>
                                        <li onClick={(event) => props.handleEditAddress(event)} value={_get(props.shippingAddress, 'entity_id')}>Edit Address</li>
                                    </ul>
                                    {/* <ul><li onClick={(event) => props.handleEditAddress(event)} value={_get(props.shippingAddress, 'entity_id')}>Change Shipping Address</li></ul> */}
                                </li>

                            </ol>
                        </div>

                        <div className="col-1 addresses-primary">
                            {Array.isArray(props.otherAddress) &&
                                props.otherAddress.map((otherAddressDetails, index) => (
                                    <ol key={index}>
                                        <li className="item" >
                                            <h3>Additional Address Entries</h3>
                                            <address>
                                                <br />{_get(otherAddressDetails, 'company')}<br />{_get(otherAddressDetails, 'street')}
                                                <br />{_get(otherAddressDetails, 'city')}, {_get(otherAddressDetails, 'region')}, {_get(otherAddressDetails, 'postcode')}
                                                <br />{_get(otherAddressDetails, 'country_name')}<br /> T: {_get(otherAddressDetails, 'telephone')}
                                            </address>
                                            <ul>
                                                <li onClick={(event) => props.handleEditAddress(event)} value={_get(otherAddressDetails, 'entity_id')}>Edit Address</li>
                                                <li><span>|</span></li>
                                                <li onClick={(event) => props.handleDeleteAddress(event)} value={_get(otherAddressDetails, 'entity_id')}>Delete Address</li>
                                            </ul>
                                            <li className="link-reorder" onClick={(event) => props.handleEditAddress(event)} value={_get(otherAddressDetails, 'entity_id')} id="default">
                                                Enable as default billing/shipping address
                                            </li>
                                        </li>
                                    </ol>
                                ))}
                            <button className="back-link" onClick={() => props.handleBackClick()}>Back</button>
                            <button className="get-update" onClick={() => props.handleAddAddress()} >Add New Address</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default addressBook;
