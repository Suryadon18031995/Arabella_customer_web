import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Modal from 'react-bootstrap/lib/Modal';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// import '../../assets/stylesheets/checkout.css';

export default function MyOrderComponent(props) {
    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <div className="bill-ship">
                <div className="billing">
                    <h4>Billing</h4>
                    <div className="bill-block">
                        <div className="firstname">
                            <label className="required"><em>*</em>First Name</label>
                            <input id="firstname" name="firstname" value={_get(props, 'defaultBillInfo.firstname')} title="First Name" maxLength="255" className="order-input" type="text" disabled />
                        </div>
                        <div className="middlename">
                            <label className="required">Middle Name</label>
                            <input id="middleName" name="middlename" value={_get(props, 'defaultBillInfo.middlename')} title="Middle Name" maxLength="255" className="order-input" type="text" disabled /></div>
                        <div className="lastname">
                            <label className="required"><em>*</em>Last Name</label>
                            <input id="lastname" name="lastname" value={_get(props, 'defaultBillInfo.lastname')} title="Last Name" maxLength="255" className="order-input" type="text" disabled /></div>
                        <div className="company">
                            <label className="required"><em>*</em>Company</label>
                            <input id="company" name="company" value={_get(props, 'defaultBillInfo.company')} title="company" maxLength="255" className="order-input" type="text" disabled /></div>
                        <div className="Address1">
                            <label className="required"><em>*</em>Address Line 1</label>
                            <input name="Address1" id="Address1" value={_get(props, 'defaultBillInfo.address_line1')} title="Address 1" className="order-input" type="text" disabled /></div>
                        <div className="Address2">
                            <label className="required">Address Line 2</label>
                            <input name="Address2" id="Address2" value={_get(props, 'defaultBillInfo.address_line2')} title="Address 2" className="order-input" type="text" disabled /></div>
                        <div className="zipCode">
                            <label className="required"><em>*</em>Zip Code</label>
                            <input name="zipcode" id="zipcode" value={_get(props, 'defaultBillInfo.zipcode')} title="Zip Code" className="order-input" type="text" disabled /></div>
                        <div className="city">
                            <label className="required"><em>*</em>City</label>
                            <input name="city" id="city" value={_get(props, 'defaultBillInfo.city')} title="City" className="order-input" type="text" disabled /></div>
                        <div className="phoneNumber">
                            <label className="required"><em>*</em>Phone Number</label>
                            <input name="telephone" id="telephone" value={_get(props, 'defaultBillInfo.telephone')} title="Phone Number" className="order-input" type="text" disabled /></div>
                        {/* <div className="country"> <label className="required"><em>*</em>Country</label> <input name="country_name" id="country_name" value={_get(props, 'defaultBillInfo.country_name')} title="Country" className="order-input" type="text" disabled /></div> */}
                        <div className="country">
                                <label className="required"><em>*</em>Country</label>
                                <CountryDropdown
                                    value={_get(props, 'defaultBillInfo.country_id')}
                                    className="order-input"
                                    valueType={'short'}
                                    id="country"
                                    disabled />
                            </div>
                            {/* <div className="state"> <label className="required"><em>*</em>State</label> <input name="region" id="region" value={_get(props, 'defaultBillInfo.region')} title="State" className="order-input" type="text" disabled /></div> */}
                            <div className="state">
                                <label className="required"><em>*</em>State</label>
                                <RegionDropdown
                                    country={_get(props, 'defaultBillInfo.country_id')}
                                    value={_get(props, 'defaultBillInfo.state_id')}
                                    valueType={'short'}
                                    id="region"
                                    className="order-input"
                                    countryValueType="short"
                                    disabled />
                            </div>
                        <div className="email"> <label className="required"><em>*</em>Email Address</label> <input name="email" id="emailAddress" value={_get(props, 'defaultBillInfo.emailAddress')} title="Email Address" className="order-input" type="email" disabled /></div>
                    </div>
                    <Button onClick={() => props.changeBillingAddress()}>Change Billing Address</Button>
                </div>
                <div className="shipping">
                    <h4>Shipping</h4>
                    <div className="ship-block">
                        <div className="firstname"> <label className="required"><em>*</em>First Name</label> <input id="firstname" name="firstname" value={_get(props, 'defaultShipInfo.firstname')} title="First Name" maxLength="255" className="order-input" type="text" disabled /></div>
                        <div className="middlename"> <label className="required">Middle Name</label> <input id="middleName" name="middlename" value={_get(props, 'defaultShipInfo.middlename')} title="Middle Name" maxLength="255" className="order-input" type="text" disabled /></div>
                        <div className="lastname"> <label className="required"><em>*</em>Last Name</label> <input id="lastname" name="lastname" value={_get(props, 'defaultShipInfo.lastname')} title="Last Name" maxLength="255" className="order-input" type="text" disabled /></div>
                        <div className="company"> <label className="required"><em>*</em>Company</label> <input id="company" name="company" value={_get(props, 'defaultShipInfo.company')} title="company" maxLength="255" className="order-input" type="text" disabled /></div>
                        <div className="Address1"> <label className="required"><em>*</em>Address Line 1</label> <input name="Address1" id="Address1" value={_get(props, 'defaultShipInfo.address_line1')} title="Address 1" className="order-input" type="text" disabled /></div>
                        <div className="Address2"> <label className="required">Address Line 2</label> <input name="Address2" id="Address2" value={_get(props, 'defaultShipInfo.address_line2')} title="Address 2" className="order-input" type="text" disabled /></div>
                        <div className="zipCode"> <label className="required"><em>*</em>Zip Code</label> <input name="zipcode" id="zipcode" value={_get(props, 'defaultShipInfo.zipcode')} title="Zip Code" className="order-input" type="text" disabled /></div>
                        <div className="city"> <label className="required"><em>*</em>City</label> <input name="city" id="city" value={_get(props, 'defaultShipInfo.city')} title="City" className="order-input" type="text" disabled /></div>
                        <div className="phoneNumber"> <label className="required"><em>*</em>Phone Number</label> <input name="telephone" id="telephone" value={_get(props, 'defaultShipInfo.telephone')} title="Phone Number" className="order-input" type="text" disabled /></div>
                        {/* <div className="country"> <label className="required"><em>*</em>Country</label> <input name="country_name" id="country_name" value={_get(props, 'defaultShipInfo.country_name')} title="Country" className="order-input" type="text" disabled /></div> */}
                        <div className="country">
                            <label className="required"><em>*</em>Country</label>
                            <CountryDropdown
                                value={_get(props, 'defaultShipInfo.country_id')}
                                className="order-input"
                                valueType={'short'}
                                id="country"
                                disabled />
                        </div>
                        {/* <div className="state"> <label className="required"><em>*</em>State</label> <input name="region" id="region" value={_get(props, 'defaultShipInfo.region')} title="State" className="order-input" type="text" disabled /></div> */}
                        <div className="state">
                                <label className="required"><em>*</em>State</label>
                                <RegionDropdown
                                    country={_get(props, 'defaultShipInfo.country_id')}
                                    value={_get(props, 'defaultShipInfo.state_id')}
                                    valueType={'short'}
                                    id="region"
                                    className="order-input"
                                    countryValueType="short"
                                    disabled />
                            </div>
                        <div className="email"> <label className="required"><em>*</em>Email Address</label> <input name="email" id="emailAddress" value={_get(props, 'defaultShipInfo.emailAddress')} title="Email Address" className="order-input" type="email" disabled /></div>
                    </div>
                    <Button onClick={() => props.changeShippingAddress()}>Change Shipping Address</Button>
                </div>
            </div>

            <div className="pay-order">
                {_get(props, 'redirection') === 'yes' ?
                    <div className="payment">
                        <h4>Payment</h4>
                        <div className="pay-block">
                            { props.payMethod.map((thisMeth) => {
                                let payMethRes;
                                if (thisMeth === 'paypal_express') {
                                    payMethRes = <div className="paypal">
                                        <input id="paypal" name="paypal" onChange={props.getRadioCheckVal} checked={props.radioCheckVal === 'paypal'} title="Pay Pal" type="radio" />
                                        <label className="required"> PayPal</label>
                                    </div>;
                                } else if (thisMeth === 'firstdataglobalgateway') {
                                    payMethRes = <div className="firstData">
                                        <input id="firstData" name="firstData" onChange={props.getRadioCheckVal} checked={props.radioCheckVal === 'firstData'} title="First Data" type="radio" />
                                        <label className="required">First Data</label>
                                    </div>;
                                } else if (thisMeth === 'banktransfer') {
                                    payMethRes = <div className="openTerms">
                                                    <input id="openTerms" name="openTerms" onChange={props.getRadioCheckVal} checked={props.radioCheckVal === 'openTerms'} title="open Terms" type="radio" />
                                                    <label className="required">Open Terms</label>
                                                </div>;
                                }
                                return payMethRes;
                            })
                            }
                            {/* <div className="paypal">
                                <input id="paypal" name="paypal" onChange={props.getRadioCheckVal} checked={props.radioCheckVal === 'paypal'} title="Pay Pal" type="radio" />
                                <label className="required"> PayPal</label>
                            </div>
                            <div className="firstData">
                                <input id="firstData" name="firstData" onChange={props.getRadioCheckVal} checked={props.radioCheckVal === 'firstData'} title="First Data" type="radio" />
                                <label className="required">First Data</label>
                            </div>
                            <div className="openTerms">
                                <input id="openTerms" name="openTerms" onChange={props.getRadioCheckVal} checked={props.radioCheckVal === 'openTerms'} title="open Terms" type="radio" />
                                <label className="required">Open Terms</label>
                            </div> */}
                        </div>
                    </div> :
                    <div className="payment-method">
                        <h4>Payment Method</h4>
                        <Tabs defaultActiveKey={_get(props, 'eventKeyVal')} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Pay Pal">
                                <div className="paypal-block">
                                    <div className="card-type">
                                        <label className="required"><em>*</em>Card Type</label>
                                        <input name="cardType" id="cardType" value={props.cardType} onChange={props.handlePaymentInput} title="Card Type" className="order-input" type="text" />
                                    </div>
                                    <div className="card-name">
                                        <label className="required"><em>*</em>Card Holders Name</label>
                                        <input name="cardName" id="cardName" value={props.cardName} onChange={props.handlePaymentInput} title="Card Holders Name" className="order-input"></input>
                                    </div>
                                    <div className="card-number">
                                        <label className="required"><em>*</em>Card Number</label>
                                        <input name="cardNumber" id="cardNumber" value={props.cardNum} onChange={props.handlePaymentInput} title="Card Number" className="order-input"></input>
                                    </div>
                                    <div className="exp-date">
                                        <label className="required"><em>*</em>Exp Date</label>
                                        <input name="expDate" id="expDate" value={props.cardExpDate} onChange={props.handlePaymentInput} title="Exp Date" className="order-input"></input>
                                    </div>
                                    <div className="cvv">
                                        <label className="required"><em>*</em>CVV</label>
                                        <input name="cvv" id="cvv" value={props.cardCvv} onChange={props.handlePaymentInput} title="CVV" className="order-input"></input>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey={2} title="First Data">
                                <div className="first-data-block">
                                    <h3>Details</h3>
                                    <div>

                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey={3} title="Open Terms">
                                <div className="open-terms-block">
                                    <h3>Details</h3>
                                    <div>

                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                }
                <div className="order-review">
                    <h4>Order Review</h4>
                    <div className="order-block">
                        <table className="table-bordered">
                            <thead>
                                <th>Product Name</th>
                                <th>Delivery Date</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Sub Total</th>
                            </thead>
                            <tbody>
                                {_get(props, 'result') && Object.entries(_get(props, 'result')).map((cart, key) => <tr key={key}>
                                    <td>{cart[1].name}</td>
                                    <td>{cart[1].delivery_date}</td>
                                    <td>{cart[1].product_price_currency}</td>
                                    <td>{cart[1].qty * cart[1].qty_per_box}</td>
                                    <td>{cart[1].row_total}</td>
                                </tr>)
                                }
                            </tbody>
                        </table>
                        <div className="order-total">
                            <span>SubTotal : ${_get(props, 'subTotal')}</span><br />
                            <span>GrandTotal : ${_get(props, 'grandTotal')}</span>
                        </div>
                    </div>
                </div>
            </div>
            {_get(props, 'eventKeyVal') === 2 &&
            <form method="post" action="https://demo.globalgatewaye4.firstdata.com/payment">
            <input type="hidden" name="x_login" value ={_get(props, 'pageid')}/>
            <input type="hidden" name="x_fp_sequence" value ={_get(props, 'sequence')}/>
            <input type="hidden" name="x_fp_timestamp" value ={_get(props, 'timestamp')}/>
            <input type="hidden" name="x_description" id="x_description" value={_get(props, 'sequence')}/>
            <input type="hidden" name="x_currency_code" value ='USD'/>
            <input type="hidden" name="x_amount" value ={_get(props, 'amount')}/>
            <input type="hidden" name="x_fp_hash" value ={_get(props, 'getHashValue')}/>
            <input type="hidden" name="x_show_form" value ="PAYMENT_FORM"/>
            <input type="hidden" name="x_type" value ="AUTH_ONLY"/>
            <input type="hidden" placeholder="enter firstname" name="x_first_name" value={_get(props, 'defaultBillInfo.firstname')} />
            <input type="hidden" placeholder="enter lastname" name="x_last_name" value={_get(props, 'defaultBillInfo.lastname')} />
            <input type="hidden" placeholder="enter company" name="x_user1" value={_get(props, 'defaultBillInfo.company')} />
            <input type="hidden" placeholder="enter address" name="x_address" value={_get(props, 'defaultBillInfo.address_line1').length >= 28 ? _get(props, 'defaultBillInfo.address_line1').substr(0, 27) : _get(props, 'defaultBillInfo.address_line1')} />
            <input type="hidden" placeholder="enter city" name="x_city" value={_get(props, 'defaultBillInfo.city')} />
            <input type="hidden" placeholder="enter state" name="x_state" value={_get(props, 'defaultBillInfo.state')} />
            <input type="hidden" placeholder="enter zipcode" name="x_zip" value={_get(props, 'defaultBillInfo.zipcode')} />
            <input type="hidden" placeholder="enter country" name="x_country" value={_get(props, 'defaultBillInfo.country')} />
            <input type="hidden" placeholder="enter phone" name="x_user2" value={_get(props, 'defaultBillInfo.telephone')} />
            <input type="hidden" name="enable_level3_processing" value ='TRUE'/>
            <Button className="place-order" type="submit">Place Order</Button>
            </form>
            }

            {_get(props, 'eventKeyVal') === 3 &&
                <div>
                    <Button className="place-order" onClick={props.handlePlaceOrder}>Place Order</Button>
                </div>}

            {_get(props, 'eventKeyVal') === 1 &&
            <PaypalExpressBtn className="place-order" style={props.payPalstyle} env={props.env} client={props.client} currency={props.currencyCode} total={props.checkoutTotal} onError={props.onError} onSuccess={props.onSuccess} onCancel={props.onCancel} />
                // <form method="post" action="https://www.sandbox.paypal.com/cgi-bin/webscr">
                //     <input type="hidden" name="business" value="stripathi@kabloomcorp.com"/>
                //     <input type="hidden" name="cmd" value="_xclick"/>
                //     {props.cartType === 'subscription' ?
                //     <input type="hidden" name="item_name" value="subscription-checkout"/>
                //     : <input type="hidden" name="item_name" value="normal-checkout"/>
                //     }
                //     <input name="custom" id="paypal_description" value="checkout" type="hidden"/>
                //     <input type="hidden" name="cancel_return" value="http://localhost:3010//"/>
                //     <input type="hidden" name="return" value="http://localhost:3010//paypal/"/>
                //     <input type="hidden" name="x_currency_code" value ='USD'/>
                //     <input type="hidden" name="amount" value ={_get(props, 'amount')}/>
                //     <Button className="place-order" type="submit">Place Order</Button>
                // </form>
            }
            {/* Address List */}
            {_get(props, 'showAllBillAddress') &&
                <Modal show={_get(props, 'showBillAddressModal')} onHide={props.handleClose}>
                    <div className="all-bill-address">
                        <Modal.Header closeButton><h4>Select Billing Address</h4></Modal.Header>
                        {_get(props, 'billingAndShippingInfo') && Object.entries(_get(props, 'billingAndShippingInfo')).map((address, key) =>
                            <div key={key} className="checkout-edit-popup">
                                <div className="bill-addr" onClick={() => props.selectNewBillAddress(address[1].entity_id)}>
                                    <span>{address[1].firstname} {address[1].lastname}</span><br />
                                    <span>{address[1].company}</span><br />
                                    <span>{address[1].address_line1}</span><br />
                                    <span>{address[1].city},{address[1].region},{address[1].zipcode}</span><br />
                                    <span>{address[1].country_name}</span><br />
                                    <span>{address[1].telephone}</span><br /></div>
                                <div className="edit-btn-checkout">
                                    <Button className="edit-btn-color edit-btn-align" onClick={() => props.editBillAddress(address[1].entity_id)}>Edit</Button></div>
                            </div>)}
                        <div className="checkout-popup-addbtn">
                            <Button className="add-bill-address" onClick={props.handleNewBillAddress}>Add new Billing Address</Button></div>
                    </div>
                </Modal>
            }

            {/* new billing address div */}
            <div>
                {_get(props, 'showNewBillAddr') &&
                    <Modal show={_get(props, 'showNewBillAddrModal')} onHide={props.handleNewBillModalClose}>
                        <div className="new-bill-address">
                            <div>
                                <Modal.Header closeButton><h4>Add New Billing Address</h4></Modal.Header>
                                <div className="firstname">
                                    <label className="required"><em>*</em>First Name</label>
                                    <input id="firstname" name="firstname" value={_get(props, 'newBillInfo.firstname')} onChange={props.handleNewBillInputChange} title="First Name" maxLength="255" className="order-input" type="text" />
                                    <span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'firstname')}</span>
                                </div>
                                <div className="middlename"> <label className="required">Middle Name</label> <input id="middleName" name="middlename" value={_get(props, 'newBillInfo.middlename')} onChange={props.handleNewBillInputChange} title="Middle Name" maxLength="255" className="order-input" type="text" /></div>
                                <div className="lastname"> <label className="required"><em>*</em>Last Name</label> <input id="lastname" name="lastname" value={_get(props, 'newBillInfo.lastname')} onChange={props.handleNewBillInputChange} title="Last Name" maxLength="255" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'lastname')}</span></div>
                                <div className="company"> <label className="required"><em>*</em>Company</label> <input id="company" name="company" value={_get(props, 'newBillInfo.company')} onChange={props.handleNewBillInputChange} title="company" maxLength="255" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'company')}</span></div>
                                <div className="Address1"> <label className="required"><em>*</em>Address Line 1</label> <input name="Address1" id="Address1" value={_get(props, 'newBillInfo.address_line1')} onChange={props.handleNewBillInputChange} title="Address 1" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'address1')}</span></div>
                                <div className="Address2"> <label className="required">Address Line 2</label> <input name="Address2" id="Address2" value={_get(props, 'newBillInfo.address_line2')} onChange={props.handleNewBillInputChange} title="Address 2" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'address2')}</span></div>
                                <div className="zipCode"> <label className="required"><em>*</em>Zip Code</label> <input name="zipcode" id="zipcode" value={_get(props, 'newBillInfo.zipcode')} onChange={props.handleNewBillInputChange} title="Zip Code" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'postcode')}</span></div>
                                <div className="city"> <label className="required"><em>*</em>City</label> <input name="city" id="city" value={_get(props, 'newBillInfo.city')} onChange={props.handleNewBillInputChange} title="City" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'city')}</span></div>
                                {/* <div className="country"> <label className="required"><em>*</em>Country</label> <input name="country_name" id="country_name" value={_get(props, 'newBillInfo.country_name')} onChange={props.handleNewBillInputChange} title="Country" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'country_name')}</span></div> */}
                                <div className="country">
                                    <label className="required"><em>*</em>Country</label>
                                    <CountryDropdown
                                        value={_get(props, 'newBillInfo.countryId')}
                                        className="order-input"
                                        valueType={'short'}
                                        id="countryId"
                                        onChange={val => props.selectAddNewBillCountry(val)} />
                                    <span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'countryId')}</span>
                                </div>
                                {/* <div className="state"> <label className="required"><em>*</em>State</label> <input name="region" id="region" value={_get(props, 'newBillInfo.region')} onChange={props.handleNewBillInputChange} title="State" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'region')}</span></div> */}
                                <div className="state">
                                    <label className="required"><em>*</em>State/Province</label>
                                    <RegionDropdown
                                        country={_get(props, 'newBillInfo.countryId')}
                                        value={_get(props, 'newBillInfo.region')}
                                        valueType={'short'}
                                        id="region"
                                        className="order-input"
                                        countryValueType="short"
                                        onChange={val => props.selectAddNewBillRegion(val)} />
                                    <span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'region')}</span>
                                </div>
                                <div className="phoneNumber"> <label className="required"><em>*</em>Phone Number</label> <input name="telephone" id="telephone" value={_get(props, 'newBillInfo.telephone')} onChange={props.handleNewBillInputChange} title="Phone Number" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddBillErrors, 'telephone')}</span></div>
                                <div className="email"> <label className="required"><em>*</em>Email Address</label> <input name="email" id="emailAddress" value={_get(props, 'newBillInfo.emailAddress')} onChange={props.handleNewBillInputChange} title="Email Address" className="order-input" type="email" /></div>
                            </div>
                            <div className="new-addr-save"><Button className="add-bill-address" onClick={() => props.addNewBillingAddress()}>Save</Button></div>
                        </div>
                    </Modal>
                }</div>

            {/* edit billing address div */}
            {_get(props, 'showEditBillAddressDiv') &&
                <div>
                    <Modal show={_get(props, 'showEditBillAddressModal')} onHide={props.handleEditBillAddressModalClose}>
                        <div className="new-bill-address">
                            <div >
                                <Modal.Header closeButton><h4>Edit Billing Address</h4></Modal.Header>
                                <div className="firstname">
                                    <label className="required"><em>*</em>First Name</label>
                                    <input id="firstname" name="firstname" value={_get(props, 'editBillInfo.firstname')} onChange={props.handleEditBillInputChange} title="First Name" maxLength="255" className="order-input" type="text" />
                                    <span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'firstname')}</span>
                                </div>
                                <div className="middlename"> <label className="required">Middle Name</label> <input id="middleName" name="middlename" value={_get(props, 'editBillInfo.middlename')} onChange={props.handleEditBillInputChange} title="Middle Name" maxLength="255" className="order-input" type="text" /></div>
                                <div className="lastname"> <label className="required"><em>*</em>Last Name</label> <input id="lastname" name="lastname" value={_get(props, 'editBillInfo.lastname')} onChange={props.handleEditBillInputChange} title="Last Name" maxLength="255" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'lastname')}</span></div>
                                <div className="company"> <label className="required"><em>*</em>Company</label> <input id="company" name="company" value={_get(props, 'editBillInfo.company')} onChange={props.handleEditBillInputChange} title="company" maxLength="255" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'company')}</span></div>
                                <div className="Address1"> <label className="required"><em>*</em>Address Line 1</label> <input name="Address1" id="address_line1" value={_get(props, 'editBillInfo.address_line1')} onChange={props.handleEditBillInputChange} title="Address 1" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'address1')}</span></div>
                                <div className="Address2"> <label className="required">Address Line 2</label> <input name="Address2" id="address_line2" value={_get(props, 'editBillInfo.address_line2')} onChange={props.handleEditBillInputChange} title="Address 2" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'address2')}</span></div>
                                <div className="zipCode"> <label className="required"><em>*</em>Zip Code</label> <input name="zipcode" id="zipcode" value={_get(props, 'editBillInfo.zipcode')} onChange={props.handleEditBillInputChange} title="Zip Code" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'postcode')}</span></div>
                                <div className="city"> <label className="required"><em>*</em>City</label> <input name="city" id="city" value={_get(props, 'editBillInfo.city')} onChange={props.handleEditBillInputChange} title="City" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'city')}</span></div>
                                {/* <div className="country"> <label className="required"><em>*</em>Country</label> <input name="country_name" id="country_name" value={_get(props, 'editBillInfo.country_name')} onChange={props.handleEditBillInputChange} title="Country" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'country_name')}</span></div> */}
                                <div className="country">
                                <label className="required"><em>*</em>Country</label>
                                <CountryDropdown
                                    value={_get(props, 'editBillInfo.country_id')}
                                    className="order-input"
                                    valueType={'short'}
                                    id="country_id"
                                    onChange={val => props.selectEditBillCountry(val)} />
                                    <span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'countryId')}</span>
                            </div>
                            <div className="state">
                                <label className="required"><em>*</em>State/Province</label>
                                <RegionDropdown
                                    country={_get(props, 'editBillInfo.country_id')}
                                    value={_get(props, 'editBillInfo.state_id')}
                                    valueType={'short'}
                                    id="state"
                                    className="order-input"
                                    countryValueType="short"
                                    onChange={val => props.selectEditBillRegion(val)} />
                                    <span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'region')}</span>
                            </div>
                                {/* <div className="state"> <label className="required"><em>*</em>State</label> <input name="region" id="region" value={_get(props, 'editBillInfo.region')} onChange={props.handleEditBillInputChange} title="State" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'region')}</span></div> */}
                                <div className="phoneNumber"> <label className="required"><em>*</em>Phone Number</label> <input name="telephone" id="telephone" value={_get(props, 'editBillInfo.telephone')} onChange={props.handleEditBillInputChange} title="Phone Number" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditBillErrors, 'telephone')}</span></div>
                                <div className="email"> <label className="required"><em>*</em>Email Address</label> <input name="email" id="emailAddress" value={_get(props, 'editBillInfo.emailAddress')} onChange={props.handleEditBillInputChange} title="Email Address" className="order-input" type="email" /></div>

                            </div>     <div className="new-addr-save">  <Button className="add-bill-address" onClick={() => props.editBillingAddress(_get(props, 'editBillInfo.entity_id'))}>Save</Button></div>
                        </div>
                    </Modal>
                </div>
            }
            {/* Address List Of Shipping  */}
            {_get(props, 'showAllShipAddress') &&
                <Modal show={_get(props, 'showShipAddressModal')} onHide={props.handleShipAddressModal}>
                    <div className="all-ship-address">
                        <Modal.Header closeButton><h4>Select Shipping Address</h4></Modal.Header>
                        {_get(props, 'billingAndShippingInfo') && Object.entries(_get(props, 'billingAndShippingInfo')).map((address, key) =>
                            <div key={key} className="checkout-edit-popup">
                                <div className="bill-addr" onClick={() => props.selectNewShipAddress(address[1].entity_id)}>
                                    <span>{address[1].firstname} {address[1].lastname}</span><br />
                                    <span>{address[1].company}</span><br />
                                    <span>{address[1].address_line1}</span><br />
                                    <span>{address[1].city},{address[1].region},{address[1].zipcode}</span><br />
                                    <span>{address[1].country_name}</span><br />
                                    <span>{address[1].telephone}</span><br /></div>
                                <div className="edit-btn-checkout ">
                                    <Button className="edit-btn-color edit-btn-align" onClick={() => props.editShipAddress(address[1].entity_id)}>Edit</Button></div>
                            </div>)}
                        <div className="checkout-popup-addbtn">
                            <Button className="add-bill-address" onClick={props.handleNewShipAddress}>Add new Shipping Address</Button></div>
                    </div>
                </Modal>
            }

            {/* new shipping Address Div */}
            <div>
                {_get(props, 'showNewShipAddr') &&
                    <Modal show={_get(props, 'showNewShipAddrModal')} onHide={props.handleNewShipModalClose}>
                        <div className="new-ship-address">
                            <div>
                                <Modal.Header closeButton><h4>Add New Shipping Address</h4></Modal.Header>
                                <div className="firstname">
                                    <label className="required"><em>*</em>First Name</label>
                                    <input id="firstname" name="firstname" value={_get(props, 'newShipInfo.firstname')} onChange={props.handleNewShipInputChange} title="First Name" maxLength="255" className="order-input" type="text" />
                                    <span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'firstname')}</span>
                                </div>
                                <div className="middlename"> <label className="required">Middle Name</label> <input id="middleName" name="middlename" value={_get(props, 'newShipInfo.middlename')} onChange={props.handleNewShipInputChange} title="Middle Name" maxLength="255" className="order-input" type="text" /></div>
                                <div className="lastname"> <label className="required"><em>*</em>Last Name</label> <input id="lastname" name="lastname" value={_get(props, 'newShipInfo.lastname')} onChange={props.handleNewShipInputChange} title="Last Name" maxLength="255" className="order-input" type="text" /> <span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'lastname')}</span></div>
                                <div className="company"> <label className="required"><em>*</em>Company</label> <input id="company" name="company" value={_get(props, 'newShipInfo.company')} onChange={props.handleNewShipInputChange} title="company" maxLength="255" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'company')}</span></div>
                                <div className="Address1"> <label className="required"><em>*</em>Address Line 1</label> <input name="Address1" id="Address1" value={_get(props, 'newShipInfo.address_line1')} onChange={props.handleNewShipInputChange} title="Address 1" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'address1')}</span></div>
                                <div className="Address2"> <label className="required">Address Line 2</label> <input name="Address2" id="Address2" value={_get(props, 'newShipInfo.address_line2')} onChange={props.handleNewShipInputChange} title="Address 2" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'address2')}</span></div>
                                <div className="zipCode"> <label className="required"><em>*</em>Zip Code</label> <input name="zipcode" id="zipcode" value={_get(props, 'newShipInfo.zipcode')} onChange={props.handleNewShipInputChange} title="Zip Code" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'postcode')}</span></div>
                                <div className="city"> <label className="required"><em>*</em>City</label> <input name="city" id="city" value={_get(props, 'newShipInfo.city')} onChange={props.handleNewShipInputChange} title="City" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'city')}</span></div>
                                {/* <div className="country"> <label className="required"><em>*</em>Country</label> <input name="country_name" id="country_name" value={_get(props, 'newShipInfo.country_name')} onChange={props.handleNewShipInputChange} title="Country" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'countryId')}</span></div> */}
                                <div className="country">
                                <label className="required"><em>*</em>Country</label>
                                <CountryDropdown
                                    value={_get(props, 'newShipInfo.countryId')}
                                    className="order-input"
                                    valueType={'short'}
                                    id="countryId"
                                    onChange={val => props.selectAddNewShipCountry(val)} />
                                    <span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'countryId')}</span>
                            </div>
                                {/* <div className="state"> <label className="required"><em>*</em>State</label> <input name="region" id="region" value={_get(props, 'newShipInfo.region')} onChange={props.handleNewShipInputChange} title="State" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'region')}</span></div> */}
                                <div className="state">
                                <label className="required"><em>*</em>State/Province</label>
                                <RegionDropdown
                                    country={_get(props, 'newShipInfo.countryId')}
                                    value={_get(props, 'newShipInfo.region')}
                                    valueType={'short'}
                                    id="region"
                                    className="order-input"
                                    countryValueType="short"
                                    onChange={val => props.selectAddNewShipRegion(val)} />
                                    <span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'region')}</span>
                            </div>
                                <div className="phoneNumber"> <label className="required"><em>*</em>Phone Number</label> <input name="telephone" id="telephone" value={_get(props, 'newShipInfo.telephone')} onChange={props.handleNewShipInputChange} title="Phone Number" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.AddShipErrors, 'telephone')}</span></div>
                                <div className="email"> <label className="required"><em>*</em>Email Address</label> <input name="email" id="emailAddress" value={_get(props, 'newShipInfo.emailAddress')} onChange={props.handleNewShipInputChange} title="Email Address" className="order-input" type="email" /></div>

                            </div>
                            <div className="new-addr-save">   <Button className="add-bill-address" onClick={() => props.addNewShippingAddress()}>Save</Button></div>
                        </div>
                    </Modal>
                }</div>

            {/* edit shipping address div */}
            {_get(props, 'showEditShipAddressDiv') &&
                <div>
                    <Modal show={_get(props, 'showEditShipAddressModal')} onHide={props.handleEditShipAddressModalClose}>
                        <div className="new-bill-address">
                            <div>
                                <Modal.Header closeButton><h4>Edit Shipping Address</h4></Modal.Header>
                                <div className="firstname">
                                    <label className="required"><em>*</em>First Name</label>
                                    <input id="firstname" name="firstname" value={_get(props, 'editShipInfo.firstname')} onChange={props.handleEditShipInputChange} title="First Name" maxLength="255" className="order-input" type="text" />
                                    <span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'firstname')}</span>
                                </div>
                                <div className="middlename"> <label className="required">Middle Name</label> <input id="middleName" name="middlename" value={_get(props, 'editShipInfo.middlename')} onChange={props.handleEditShipInputChange} title="Middle Name" maxLength="255" className="order-input" type="text" /></div>
                                <div className="lastname"> <label className="required"><em>*</em>Last Name</label> <input id="lastname" name="lastname" value={_get(props, 'editShipInfo.lastname')} onChange={props.handleEditShipInputChange} title="Last Name" maxLength="255" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'lastname')}</span></div>
                                <div className="company"> <label className="required"><em>*</em>Company</label> <input id="company" name="company" value={_get(props, 'editShipInfo.company')} onChange={props.handleEditShipInputChange} title="company" maxLength="255" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'company')}</span></div>
                                <div className="Address1"> <label className="required"><em>*</em>Address Line 1</label> <input name="Address1" id="address_line1" value={_get(props, 'editShipInfo.address_line1')} onChange={props.handleEditShipInputChange} title="Address 1" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'address1')}</span></div>
                                <div className="Address2"> <label className="required">Address Line 2</label> <input name="Address2" id="address_line2" value={_get(props, 'editShipInfo.address_line2')} onChange={props.handleEditShipInputChange} title="Address 2" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'address2')}</span></div>
                                <div className="zipCode"> <label className="required"><em>*</em>Zip Code</label> <input name="zipcode" id="zipcode" value={_get(props, 'editShipInfo.zipcode')} onChange={props.handleEditShipInputChange} title="Zip Code" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'postcode')}</span></div>
                                <div className="city"> <label className="required"><em>*</em>City</label> <input name="city" id="city" value={_get(props, 'editShipInfo.city')} onChange={props.handleEditShipInputChange} title="City" className="order-input" type="text" /><span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'city')}</span></div>
                                {/* <div className="country"> <label className="required"><em>*</em>Country</label> <input name="country_name" id="country_name" value={_get(props, 'editShipInfo.country_name')} onChange={props.handleEditShipInputChange} title="Country" className="order-input" type="text" /></div> */}
                                <div className="country">
                                <label className="required"><em>*</em>Country</label>
                                <CountryDropdown
                                    value={_get(props, 'editShipInfo.country_id')}
                                    className="order-input"
                                    valueType={'short'}
                                    id="country_id"
                                    onChange={val => props.selectEditShipCountry(val)} />
                                    <span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'countryId')}</span>
                            </div>
                                <div className="state">
                                <label className="required"><em>*</em>State/Province</label>
                                <RegionDropdown
                                    country={_get(props, 'editShipInfo.country_id')}
                                    value={_get(props, 'editShipInfo.state_id')}
                                    valueType={'short'}
                                    id="state"
                                    className="order-input"
                                    countryValueType="short"
                                    onChange={val => props.selectEditShipRegion(val)} />
                                    <span style={{ color: 'red' }}>{_get(props.EditShipErrors, 'region')}</span>
                            </div>
                                {/* <div className="state"> <label className="required"><em>*</em>State</label> <input name="region" id="region" value={_get(props, 'editShipInfo.region')} onChange={props.handleEditShipInputChange} title="State" className="order-input" type="text" /></div> */}
                                <div className="phoneNumber">
                                    <label className="required"><em>*</em>Phone Number</label>
                                    <input name="telephone" id="telephone" value={_get(props, 'editShipInfo.telephone')} onChange={props.handleEditShipInputChange} title="Phone Number" className="order-input" type="text" />
                                </div>
                                <div className="email">
                                    <label className="required"><em>*</em>Email Address</label>
                                    <input name="email" id="emailAddress" value={_get(props, 'editShipInfo.emailAddress')} onChange={props.handleEditShipInputChange} title="Email Address" className="order-input" type="email" />
                                </div>
                            </div>
                            <div className="new-addr-save">
                                <Button className="add-bill-address" onClick={() => props.editShippingAddress(_get(props, 'editShipInfo.entity_id'))}>Save</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            }
        </div>
    );
}

