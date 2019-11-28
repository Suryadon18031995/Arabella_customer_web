import React, { Fragment } from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { Slider } from 'antd';
// import { PayPalButton } from 'react-paypal-button';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import DropIn from 'braintree-web-drop-in-react';
// import 'antd/dist/antd.css';
// import '../../assets/stylesheets/checkout.css';
// import paypalImage from '../../assets/images/paypal.png';
import creditCardImage from '../../assets/images/sprite-icon.svg';
import authorizenetImage from '../../assets/images/authorizenet.png';
// import brainTreeImage from '../../assets/images/braintree-logo-black.png';

export default function MyOrderComponent(props) {
    // console.log('first:', props.savedCardsFirstdata);
    // console.log('auth:', props.savedCardsAuthorizenet);
    const options = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 10; i++) {
        const year = props.thisYear + i;
        options.push(<option value={year}>{year}</option>);
    }
    return (
        <div className="checkout">
            <div className="page-title-checkout">
                <h1>Checkout</h1>
            </div>
            <div className="bill-pay">
                <PanelGroup>
                    <Panel eventKey={1} expanded
                        // expanded={props.expandIndex === 1 }
                        onToggle={() => this.handleCollapse(1)}>
                        <div className="accordionItemHeading">
                            <Panel.Heading className="ship-title">
                                <Panel.Title onClick={() => props.handleCollapse(1)}>
                                    {/* <Panel.Title> */}
                                    <i className="fa fa-caret-down"></i>{' '} Step 1 &nbsp; Shipping Information
                </Panel.Title>
                            </Panel.Heading>
                        </div>
                        <div>
                            <Panel.Body collapsible>
                                <div className="ship-block">
                                    <span>{_get(props.defaultShipInfo, 'firstname')}</span>
                                    <span>{_get(props.defaultShipInfo, 'lastname')}</span><br />
                                    <span>{_get(props.defaultShipInfo, 'company')}</span><br />
                                    <span>{_get(props.defaultShipInfo, 'address_line1')}</span><br />
                                    <span>{_get(props.defaultShipInfo, 'city')}</span>{','}
                                    <span>{_get(props.defaultShipInfo, 'country_id')}</span>
                                    <span>{_get(props.defaultShipInfo, 'zipcode')}</span>
                                </div>
                                {/* <div>Edit | Delete | Add new Address</div> */}
                                <div>
                                    {/* <Button className="checkout-continue" onClick={props.handleContinue}>CONTINUE</Button> */}
                                </div>
                            </Panel.Body>
                        </div>
                    </Panel>
                    <Panel eventKey={2} expanded
                        // expanded={props.expandIndex === 2}
                        onToggle={() => this.handleCollapse(2)}>
                        <div className="accordionItemHeading">
                            <Panel.Heading className="pay-title">
                                <Panel.Title onClick={() => props.handleCollapse(2)}>
                                    {/* <Panel.Title> */}
                                    <i className="fa fa-caret-down"></i>{' '} Step 2 &nbsp; Notes on Order
                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <div className="step a-item">
                                    <label className="notes-on-order">
                                        {/* Send special instructions or a note. */}
                                        Customers Notes
                    </label>
                                    <textarea className="notes-on-order-textarea" type="text" id="cusrefid" maxLength="300" name="cusrefid" placeholder="Use this space to include notes for yourself in regards to this order"></textarea>
                                    <label className="fd-phone" id="cusrefid_feedback">Limit 300 characters</label>
                                </div>
                                <div>
                                    {/* <Button className="checkout-continue" onClick={props.handleNotesContinue}>CONTINUE</Button> */}
                                </div>
                            </Panel.Body>
                        </div>
                    </Panel>
                    {props.primeUser === '1' && props.cartType === 'normal' ? <Panel eventKey={4} expanded
                        onToggle={() => this.handleCollapse(4)}>
                        <div className="accordionItemHeading">
                            <Panel.Heading className="pay-title">
                                <Panel.Title onClick={() => props.handleCollapse(4)}>
                                    <i className="fa fa-caret-down"></i>{' '} Step 3 &nbsp; Spend Your Points
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <div className="step a-item rewards-box">
                                    {props.enableSpendPoint ? null : <label className='blink'>You don't have sufficient points to redeem</label>}
                                    {/* {props.cartType !== 'normal' ? <label>You can redeem your points to normal orders only</label> : null} */}
                                    <label>Choose how many points to spend:</label>
                                    <label>Each of 100 Points gets <strong>$1.00</strong> discount</label>
                                    <label>
                                        <Slider
                                            disabled={!props.enableSpendPoint}
                                            min={props.minReward}
                                            max={props.maxReward > props.pointBalance ? props.pointBalance : props.maxReward }
                                            onChange={props.onSliderChange}
                                            value={typeof props.rewardPointsUsed === 'number' ? props.rewardPointsUsed : 0}
                                        />
                                    </label>
                                    <label>
                                        You will spend
                                        <input type='number' value={props.rewardPointsUsed}
                                        min={props.minReward}
                                        max={props.maxReward > props.pointBalance ? props.pointBalance : props.maxReward }
                                        disabled={!props.enableSpendPoint}
                                         onChange={props.onInputValueChange}/>
                                        Points
                                        </label>
                                    <label>
                                        <input type='checkbox'
                                        disabled={!props.enableSpendPoint}
                                        checked={props.rewardsChecked}
                                        onChange={props.handleRewardsCheckChange}/>
                                        Maximize my discount with points
                                        </label>
                                    <label>P/s: You can earn points on Grand Total amount after considering all deductions like Discounts or payment via Points.
                                        Each of 100 Points gets $1.00 discount</label>
                                </div>
                                <div>
                                </div>
                            </Panel.Body>
                        </div>
                    </Panel> : null}
                    <Panel eventKey={3} expanded
                        // expanded={props.expandIndex === 3}
                        onToggle={() => this.handleCollapse(3)}>
                        <div className="accordionItemHeading">
                            <Panel.Heading className="pay-title">
                                <Panel.Title onClick={() => props.handleCollapse(3)}>
                                    {/* <Panel.Title> */}
                                    <i className="fa fa-caret-down"></i>{' '} Step {props.primeUser === '1' && props.cartType === 'normal' ? 4 : 3} &nbsp; Payment Information
                </Panel.Title>
                            </Panel.Heading>
                        </div>
                        <div>
                            <Panel.Body collapsible>
                                <div>
                                    {/* <div className="ship">
                    <input type="checkbox" name="shipAddress" onChange={props.handleShipAddress}
                    defaultChecked={props.showShipAddress}/>
                    Same as Shipping Address?
                </div> */}
                                    {props.cartType === 'prime' ? null : <div className="form-check-label-note">
                                        <strong>Note: </strong>
                                        <span>Card may be charged immediately,  See information under Transaction Type to the right.</span>
                                    </div>}
                                    <div className="payment-type">
                                        {props.payMethod && Object.keys(props.payMethod).indexOf('firstdataglobalgateway') !== -1 &&
                                        <div className="firstData">
                                            <input type="radio"
                                                name="firstdataglobalgateway"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'firstdataglobalgateway'} />
                                            <img src={creditCardImage}></img>
                                        </div>
                                        }
                                        {props.payMethod && // Object.keys(props.payMethod).indexOf('firstdataglobalgateway') !== -1 &&
                                        <div className="firstData">
                                            <input type="radio"
                                                name="ccavenue"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'ccavenue'} />
                                            {/* <img src={creditCardImage}></img> */}
                                            ccavenue
                                        </div>
                                        }
                                        {/* {props.payMethod && Object.keys(props.payMethod).indexOf('paypal_express') !== -1 &&
                                        <div className="paypal">
                                            <input type="radio"
                                                name="paypal"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'paypal'} />
                                            <img src={paypalImage}></img>
                                        </div>
                                        } */}
                                        {props.payMethod && Object.keys(props.payMethod).indexOf('banktransfer') !== -1 && props.balanceLimit && parseFloat(props.balanceLimit) >= parseFloat(props.checkoutTotal) &&
                                        <div className="open-terms">
                                            <input type="radio"
                                                name="openTerms"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'openTerms'} />
                                            open Terms
                                        </div>
                                        }
                                         {props.payMethod && Object.keys(props.payMethod).indexOf('authorizenet') !== -1 &&  // @todo
                                        <div className="firstData" style={{ marginTop: '10px' }}>
                                            <input type="radio"
                                                name="authorizenet"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'authorizenet'} />
                                            <img src={authorizenetImage} style={{ marginBottom: '10px' }}></img>
                                        </div>
                                        }
                                        {/* {props.payMethod && // Object.keys(props.payMethod).indexOf('braintree') !== -1 &&  // @todo
                                        <div className="firstData" style={{ marginTop: '10px' }}>
                                            <input type="radio" // @todo
                                                name="braintree"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'braintree'} />
                                            <img src={brainTreeImage} style={{ marginBottom: '10px' }} ></img>
                                        </div>
                                        } */}
                                    </div>
                                    <div className="address-block">
                                        <div className="firstname">
                                            <input id="firstname"
                                                placeholder="First name*"
                                                name="firstname"
                                                value={_get(props.defaultBillingInfo, 'firstname')}
                                                onChange={props.handleAddressChange}
                                                title="First Name"
                                                className="order-input"
                                                type="text" />
                                            <span style={{ color: 'red' }}>{_get(props.errors, 'firstname')}</span>
                                        </div>
                                        <div className="lastname">
                                            <input id="lastname"
                                                placeholder="Last name*"
                                                name="lastname"
                                                value={_get(props.defaultBillingInfo, 'lastname')}
                                                onChange={props.handleAddressChange}
                                                title="Last Name"
                                                className="order-input" type="text" />
                                            <span style={{ color: 'red' }}>{_get(props.errors, 'lastname')}</span>
                                        </div>
                                        <div className="company">
                                            <input id="company"
                                                placeholder="Company name"
                                                name="company"
                                                value={_get(props.defaultBillingInfo, 'company')}
                                                onChange={props.handleAddressChange} title="Company" className="order-input" type="text" />
                                        </div>
                                        <div className="address">
                                            <input id="address_line1"
                                                placeholder="Street Address*"
                                                name="address_line1"
                                                value={_get(props.defaultBillingInfo, 'address_line1')}
                                                onChange={props.handleAddressChange}
                                                title="Address" className="order-input" type="text" />
                                            <span style={{ color: 'red' }}>{_get(props.errors, 'address')}</span>
                                        </div>
                                        <div className="city">
                                            <input id="city"
                                                placeholder="City*"
                                                name="city"
                                                value={_get(props.defaultBillingInfo, 'city')}
                                                onChange={props.handleAddressChange}
                                                title="City" className="order-input" type="text" />
                                            <span style={{ color: 'red' }}>{_get(props.errors, 'city')}</span>
                                        </div>
                                        <div className="state">
                                            {/* <input id="state" placeholder="State*" name="state" value={_get(props, 'state')} onChange={props.handleAddressChange} title="State" className="order-input" type="text" /> */}
                                            <RegionDropdown
                                                defaultOptionLabel={_get(props.defaultBillingInfo, 'state')}
                                                country={_get(props.defaultBillingInfo, 'country_id')}
                                                value={_get(props.defaultBillingInfo, 'state')}
                                                id="state"
                                                className="order-input"
                                                countryValueType="short"
                                                onChange={val => props.handleSelectState(val)} />
                                            <span style={{ color: 'red' }}>{_get(props.errors, 'state')}</span>
                                        </div>
                                        <div className="zipcode">
                                            <input id="zipcode"
                                                placeholder="Zip Code*"
                                                name="zipcode"
                                                value={_get(props.defaultBillingInfo, 'zipcode')}
                                                onChange={props.handleAddressChange}
                                                title="Zip Code" className="order-input" type="text" maxLength={7} />
                                            <span style={{ color: 'red' }}>{_get(props.errors, 'zipcode')}</span>
                                        </div>
                                        <div className="country">
                                            {/* <input id="country" placeholder="Country*" name="country" value={_get(props, 'country')} onChange={props.handleAddressChange} title="Country" className="order-input" type="text" /> */}
                                            <CountryDropdown
                                                defaultOptionLabel="United States"
                                                value={_get(props.defaultBillingInfo, 'country_id')}
                                                className="order-input"
                                                valueType={'short'}
                                                onChange={val => props.handleSelectCountry(val)}
                                                id="country_name" />
                                            <span style={{ color: 'red' }}>{_get(props.errors, 'country')}</span>
                                        </div>
                                        <div className="phone">
                                            <input id="telephone"
                                                placeholder="Phone*"
                                                name="telephone"
                                                value={_get(props.defaultBillingInfo, 'telephone')}
                                                onChange={props.handleAddressChange}
                                                title="Phone" className="order-input" type="text" maxLength={10} />
                                            <label className="fd-phone">
                                                <i>eg. 999-999-999</i>
                                            </label>
                                            <span style={{ color: 'red' }}>{_get(props.errors, 'phone')}</span>
                                        </div>
                                        {props.showCards && props.payMethod && Object.keys(props.payMethod).indexOf('firstdataglobalgateway') !== -1 &&
                                            <div className="credit-cards">
                                                {props.paymentType === 'firstdataglobalgateway' && !_isEmpty(_get(props, 'savedCardsFirstdata')) && Object.entries(_get(props, 'savedCardsFirstdata')).map((thisCard, ind) => {

                                                    return (
                                                        <div className='saved-cards' key={ind}>
                                                            <input
                                                                className={_get(thisCard[1], 'card') ? _get(thisCard[1].card, 'card_number') : _get(thisCard[1].token, 'token_data.type')}
                                                                type="radio"
                                                                id={_get(thisCard[1], 'card') ? _get(thisCard[1].card, 'card_number') : _get(thisCard[1].token, 'token_data.value') && _get(thisCard[1].token, 'token_data.value').substr(-4)}
                                                                name={_get(thisCard[1], 'card') ? _get(thisCard[1].card, 'card_number') : _get(thisCard[1].token, 'token_data.value') && _get(thisCard[1].token, 'token_data.value').substr(-4)}
                                                                onChange={() => props.getSavedCard(event, thisCard[1])}
                                                                checked={_get(thisCard[1], 'card') ? props.showRadio === _get(thisCard[1].card, 'card_number') : props.showRadio === (_get(thisCard[1].token, 'token_data.value') && _get(thisCard[1].token, 'token_data.value').substr(-4))}
                                                                value={_get(thisCard[1], 'card') ? _get(thisCard[1].card, 'card_number') : _get(thisCard[1].token, 'token_data.value')}
                                                            />
                                                            XXXX-XXXX-XXXX-{_get(thisCard[1], 'card') ? _get(thisCard[1].card, 'card_number') : _get(thisCard[1].token, 'token_data.value') && _get(thisCard[1].token, 'token_data.value').substr(-4)}
                                                            <span
                                                                className={`icon ${_get(thisCard[1], 'card') ? _get(thisCard[1], 'card.type') : ' '}`}
                                                            >

                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            {/* {props.paymentType === 'authorizenet' && !_isEmpty(_get(props, 'savedCardsAuthorizenet')) && _get(props, 'savedCardsAuthorizenet').map((thisCard, ind) => {
                                                // {console.log('this card:', thisCard);}
                                                return ( // @todo
                                                    <div className='saved-cards' key={ind}>
                                                        <input
                                                            className={_get(thisCard, 'card') ? _get(thisCard.card, 'card_number') : _get(thisCard.token, 'token_data.type')}
                                                            type="radio"
                                                            id={_get(thisCard, 'card') ? _get(thisCard.card, 'card_number') : _get(thisCard.token, 'token_data.value') && _get(thisCard.token, 'token_data.value').substr(-4)}
                                                            name={_get(thisCard, 'card') ? _get(thisCard.card, 'card_number') : _get(thisCard.token, 'token_data.value') && _get(thisCard.token, 'token_data.value').substr(-4)}
                                                            onChange={() => props.getSavedCard(event, thisCard)}
                                                            checked={_get(thisCard, 'card') ? props.showRadio === _get(thisCard.card, 'card_number') : props.showRadio === (_get(thisCard.token, 'token_data.value') && _get(thisCard.token, 'token_data.value').substr(-4))}
                                                            value={_get(thisCard, 'card') ? _get(thisCard.card, 'card_number') : _get(thisCard.token, 'token_data.value')}
                                                        />
                                                        XXXX-XXXX-XXXX-{_get(thisCard, 'accountNumber') ? _get(thisCard, 'accountNumber').substr(4) : _get(thisCard.token, 'token_data.value') && _get(thisCard.token, 'token_data.value').substr(-4)}
                                                        <span
                                                            className={`icon ${_get(thisCard, 'accountType') ? _get(thisCard, 'accountType').toLowerCase() : ' '}`}
                                                        >
                                                        </span>
                                                    </div>
                                                );
                                            })} */}
                                                <div className='new-card'>
                                                    <input type="radio"
                                                        name="newCard"
                                                        onChange={props.getNewCard}
                                                        checked={props.showNewCard === 'newCard'}
                                                    />
                                                    Add New Card
                    </div>
                                            </div>
                                        }
                                    </div>
                                    {props.showCredit &&
                                        <div className="creditcard-block">
                                            <h3>Credit Card</h3>
                                            <div className="creditnumber">
                                                <input id="creditnumber"
                                                    placeholder="Credit Card Number*"
                                                    name="creditnumber"
                                                    value={_get(props.defaultBillingInfo, 'creditnumber')}
                                                    onChange={props.handleCreditChange}
                                                    title="Credit Card Number" className="order-input" type="text" maxLength={16} />
                                                <span style={{ color: 'red' }}>{_get(props.errors, 'creditnumber')}</span>
                                            </div>
                                            <div className="creditcard-expiry">
                                                <select onChange={props.handleMonth} value={_get(props.defaultBillingInfo, 'expirymonth')} id="expirymonth" name="expirymonth" title="select a month">
                                                    <option value="0">Expiration Month*</option>
                                                    <option value="01">January</option>
                                                    <option value="02">February</option>
                                                    <option value="03">March</option>
                                                    <option value="04">April</option>
                                                    <option value="05">May</option>
                                                    <option value="06">June</option>
                                                    <option value="07">July</option>
                                                    <option value="08">August</option>
                                                    <option value="09">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </select>
                                                {/* <input id="expirymonth" placeholder="Expiration Month*" name="expirymonth" value={_get(props, 'expirymonth')} onChange={props.handleCreditChange} title="Expiration Month" className="order-input" type="text" maxLength={2}/> */}
                                                <span style={{ color: 'red' }}>{_get(props.errors, 'expirymonth')}</span>
                                            </div>
                                            <div className="creditcard-expiry-year">
                                                <select id="expiryyear" name="expiryyear" onChange={props.handleExpiryYear} value={_get(props.defaultBillingInfo, 'expiryyear')}>
                                                    <option value="" selected="selected">Expiration Year *</option>
                                                    {options}
                                                </select>
                                                {/* <input id="expiryyear" placeholder="Expiration Year*" name="expiryyear"value={_get(props, 'expiryyear')} onChange={props.handleCreditChange} title="Expiration Year" className="order-input" type="text" maxLength={4}/> */}
                                                <span style={{ color: 'red' }}>{_get(props.errors, 'expiryyear')}</span>
                                            </div>
                                            <div className="creditcard-cvv">
                                                <input id="cvv"
                                                    placeholder="CVV*" name="cvv" value={_get(props, 'cvv')}
                                                    onChange={props.handleCreditChange}
                                                    title="CVV" className="order-input" type="text" maxLength={4} />
                                                <span style={{ color: 'red' }}>{_get(props.errors, 'cvv')}</span>
                                            </div>
                                        </div>
                                    }
                                    {props.paymentType === 'braintree' && <div style={{ float: 'left' }}>
                                            {/* Brain Tree! */}
                                            {/* <BrainTreeComp /> */}
                                        <DropIn
                                            options={{ authorization: props.braintreeClientToken.clientToken }}
                                            onInstance={props.assignInstance}
                                        />
                                        {/* <button onClick={props.buy}>Buy</button> */}
                                        </div>}
                                    <div className="terms">
                                        <input type="checkbox"
                                            name="termscheck" onChange={props.handleTermsCheck} defaultChecked={props.checked} />
                                        {props.cartType !== 'subscription' ? <label className="terms-check">Terms and Conditions (I’ve read and agreed to the <a target="_blank" href={props.cartType === 'prime' ? '/premium-terms.html' : '/term-and-conditions'} className="terms-condi-a">
                                            <strong>Terms &amp; Conditions)</strong></a></label> :
                                        <span className="terms-check">I agree to the <a href="/annual-flower-subscription-terms.html" target="_blank" className="">
                                        <strong><u>terms and conditions</u></strong></a> of the annual subscription plan including the $199.99 per box early termination fee and skip fees.</span>}
                                    </div>
                                    {/* {props.paymentType === 'paypal' ? <div id="paypal-checkout-button" className="paypal-checkout-button">
                                        <PayPalButton
                                            env={props.env}
                                            productionID={props.productionId}
                                            sandboxID={props.sandboxID}
                                            transactions={props.transactions}
                                            amount={props.checkoutTotal}
                                            currency={props.currencyCode}
                                            onPaymentStart={props.onPaymentStart}
                                            onPaymentSuccess={props.onPaymentSuccess}
                                            onPaymentError={props.onPaymentError}
                                        />
                                    </div> : */}
                                        <div>
                                            <Button className="checkout-process" onClick={props.handleProcessOrder}>PROCESS ORDER</Button>
                                        </div>
                                    {/* } */}
                                </div>
                            </Panel.Body>
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
            <div className="order-summary">
                <div><h2>Order Summary</h2></div>
                <div className="order-block">
                    <table className="checkout-table">
                        <thead>
                            <tr>
                                <th> Product Image</th>
                                <th>Product Name</th>
                                {props.cartType !== 'prime' && <th>Delivery Date</th>}
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Sub Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {_get(props, 'result') &&
                                Object.entries(_get(props, 'result')).map((cart, key) => <tr key={key}>
                                    <td><img src={cart[1].image} style={{ width: '85px' }}></img></td>
                                    <td style={{ width: '17%', color: '#fbb04d' }}>{cart[1].name}</td>
                                    {props.cartType !== 'prime' && <td>
                                        {props.cartType === 'subscription' ?
                                        <React.Fragment>
                                        First Delivery Date: {cart[1].delivery_date}
                                        <br />
                                        Last Delivery Date: {moment(cart[1].delivery_date, 'YYYY-MM-DD').add(props.cycles - 2, 'w').format('YYYY-MM-DD')}
                                        </React.Fragment>
                                        : cart[1].delivery_date}
                                    </td>}
                                    <td>{cart[1].product_price_currency}</td>
                                    <td>{cart[1].qty * cart[1].qty_per_box}</td>
                                    <td>{cart[1].row_total}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    <div className="order-total">
                        <span>SubTotal : <span className='right-aligned-span'>${_get(props, 'subTotal')}</span></span><br />
                        {
                            props.couponCode && props.discount && parseFloat(props.discount) > 0 &&
                            <Fragment><span>Discount({props.couponCode}) : <span className='right-aligned-span'>-${_get(props, 'discount')}</span></span><br /></Fragment>
                        }

                        <Fragment>
                            <span>Shipping & Handling Fee :
                                    {props.primeUser !== '1' ? <span className='right-aligned-span'>${props.feeAmount}</span>
                                    :
                                    <span className='right-aligned-span'><strike>${props.feeAmount}</strike></span>}
                            </span><br />
                        </Fragment>

                        {props.primeUser === '1' ? <Fragment>
                            {props.rewardPointsUsed > 0 ? <Fragment><span>Use point ({props.rewardPointsUsed} Points):
                                    <span className='right-aligned-span'>-${props.rewardPointsUsed / 100}</span>
                            </span><br />
                                <span>You will earn:
                                    <span className='right-aligned-span'>{Math.round(_get(props, 'grandTotal') - (props.rewardPointsUsed / 100))} Points</span>
                                </span><br /></Fragment> :
                                <Fragment><span>You will earn:
                            <span className='right-aligned-span'>{props.earnPoints}</span>
                                </span><br /></Fragment>
                            }
                        </Fragment> : null}

                        <span>Grand Total : <span className='right-aligned-span'>${props.rewardPointsUsed > 0 ? (_get(props, 'grandTotal') - (props.rewardPointsUsed / 100)).toFixed(2) : _get(props, 'grandTotal') }</span></span>
                    </div>
                </div>
                <div className="transaction-type">
                    <ul>
                        <li>
                            <span><strong> Transaction Type :</strong></span>
                        </li>
                        <li>
                            <input type="checkbox"
                                name="normal"
                                checked={props.transactionType === 'normal'} />
                            <label>
                                <strong>Everyday</strong>
                                <small>(Card will be charged immediately for all shipments in this order)</small>
                            </label>
                        </li>
                        <li>
                            <input type="checkbox"
                                name="subscription"
                                checked={props.transactionType === 'subscription'} />
                            <label>
                                <strong>Subscription</strong>
                                <small>
                                    (Credit Card will be billed the first day of the week of delivery day)
                            </small>
                            </label>
                        </li>
                        <li>
                            <input type="checkbox"
                                name="prebook"
                                checked={props.transactionType === 'pre-book'} />
                            <label>
                                <strong>PreBook</strong>
                                <small>
                                    (Credit Card will be billed seven (7) days prior to selected shipment date )
                            </small>
                            </label>
                        </li>
                        {props.cartType === 'prime' ? <li>
                            <input type="checkbox"
                                name="premium"
                                checked={true} />
                            <strong>Premium</strong>
                            <label>
                                <small>
                                    (Card will be charged on Day 16 if you don’t cancel your membership before that time.)
                            </small>
                            </label>
                        </li> : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}

