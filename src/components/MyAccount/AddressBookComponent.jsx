import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

var addressBook = (props) => {
    
    return (
        <div className="col-md-9 col-sm-8 col-xs-12" style={{border:'2px solid rgb(47, 175, 204)'}}>
            <div className="my-account">
                <div className="page-title" style={{padding:'30px'}}>
                    <h3>Address Book</h3>
                    <br/>
                    <p><b>Save addresses for faster checkouts. You can access your Address Book from any of our family of brands</b></p>
                    <br/>
                    <button style={{backgroundColor:'#1FB584',height:'45x',width:'168px',fontSize:'19px',color:'white'}} onClick={() => props.handleAddAddress()} >Add Address</button>
                </div>
                {/* {sucessMsg} */}
                {!_isEmpty(props.successMessage) ? <span className="sucessMsg">{props.successMessage}</span> : ''}
                {!_isEmpty(props.deleteAddressMessage) ? <span className="sucessMsg">{props.deleteAddressMessage}</span> : ''}
                <div className="recurring-profiles">
                    <div className="box-account-content">
                        <div className="row addresses-primary" style={{paddingLeft:'30px',paddingRight:'30px'}}>
                          
                                <div className="col-sm-5" style={{border:'1px solid rgb(47, 175, 204)',height:'300px'}}>
                                  
                                <div style={{fontSize: '14px',fontWeight: '700',border:'1px solid rgb(47, 175, 204)',backgroundColor: 'rgb(245, 245, 245)',textTransform: 'none',width:'111%',padding:'10px',marginLeft:'-16px'}}>
                            Default Billing Address
                              </div>
                                    <address>
                                        <br />{_get(props.billingAddress, 'company')}<br />{_get(props.billingAddress, 'street')}
                                        <br />{_get(props.billingAddress, 'city')}, {_get(props.billingAddress, 'region')}, {_get(props.billingAddress, 'postcode')}
                                        <br />{_get(props.billingAddress, 'country_name')}<br />
                                    </address>
                                    <div>
                                        <a onClick={(event) => props.handleEditAddress(event)} value={_get(props.billingAddress, 'entity_id')}>Edit</a>
                                        <a onClick={(event) => props.handleEditAddress(event)} value={_get(props.billingAddress, 'entity_id')}>Delete</a>
                                    </div>
                                    
                                </div>
                                <div className="col-sm-2"></div>


                                <div className="col-sm-5" style={{border:'1px solid rgb(47, 175, 204)'}}>
                                        <div style={{fontSize: '14px',fontWeight: '700',backgroundColor: 'rgb(245, 245, 245)',border:'1px solid rgb(47, 175, 204)',textTransform: 'none',width:'111%',padding:'10px',marginLeft:'-16px'}}>
                                           Default Shipping Address
                                        </div>
                                    <address>
                                        <br />{_get(props.shippingAddress, 'company')}<br />{_get(props.shippingAddress, 'street')}
                                        <br />{_get(props.shippingAddress, 'city')}, {_get(props.shippingAddress, 'region')}, {_get(props.shippingAddress, 'postcode')}
                                        <br />{_get(props.shippingAddress, 'country_name')}<br /> 
                                    </address>
                                    <ul>
                                        <li onClick={(event) => props.handleEditAddress(event)} value={_get(props.shippingAddress, 'entity_id')}>Edit Address</li>
                                    </ul>
                                    {/* <ul><li onClick={(event) => props.handleEditAddress(event)} value={_get(props.shippingAddress, 'entity_id')}>Change Shipping Address</li></ul> */}
                                </div>
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
