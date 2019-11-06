import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import lazyLoader from  '../../assets/images/lazy-loader.gif';
// import Modal from 'react-bootstrap/lib/Modal';
// import BigLogo from '../../assets/images/bloom_logo_white.png';
// import SmallLogo from '../../assets/images/bloom_logo_small.png';

const Recaptcha = require('react-recaptcha');

let recaptchaStyle;
export default function RegisterComponent(props) {
  if (props.state.checkRecaptcha.length === 0) {
    recaptchaStyle = { cursor: 'not-allowed' };
  } else {
    recaptchaStyle = { cursor: 'pointer' };
  }
  return (
    <div className="register">
        <div className={`overlay ${ props.isFetching ? '' : 'hide'}`}>
          <span className="infinite-loader-class">
              <img
                src={ lazyLoader }
                alt="lazy-loader"
              />
          </span>
        </div>
      <div>
        {/* register content  */}

        <div className="title-box  main-prod"><h1>Step 1:Create an Account</h1></div>
        <div className="reg-content main-prod">
          <div className="input-field">
            <h2 className="legend">Personal Information</h2>
            <ul className="form-lists">
              <li className="fields">
                <div className="field firstname"> <label className="required"><em>*</em>First Name</label> <input id="firstName" name="firstName" value={props.state.firstName} onChange={props.handleInputChange} title="First Name" maxLength="255" className='input-text required-entry' type="text" /><span className={`${ props.state.errors.firstName ? 'blink' : ''}`}>{props.state.errors.firstName }</span></div>
                <div className="field lastname"> <label className="required"><em>*</em>Last Name</label> <input id="lastName" name="lastname" value={props.state.lastName} onChange={props.handleInputChange} title="Last Name" maxLength="255" className="input-text required-entry" type="text" /><span className={`${props.state.errors.lastName ? 'blink': ''}`}>{props.state.errors.lastName}</span></div>
                <div className="field company"> <label className="required"><em>*</em>Company</label> <input id="company" name="company" value={props.state.company} onChange={props.handleInputChange} title="company" maxLength="255" className="input-text" type="text" /><span className={`${props.state.errors.company ? 'blink': ''}`}>{props.state.errors.company}</span></div>
                <div className="field email"> <label className="required"><em>*</em>Email Address</label> <input name="email" id="emailAddress" value={props.state.emailAddress} onChange={props.handleInputChange} title="Email Address" className="input-text validate-email emailCheck" type="email" /><span className={`${props.state.errors.emailAddress ? 'blink': ''}`}>{props.state.errors.emailAddress}</span></div>
                <div className="field">
                  <label className="required"><em>*</em>Country</label>
                  <select name="country_id" id="country-billing_1" value={props.state.selectValue} onChange={props.handleChange} className="validate-select" title="Country">
                    <option value="US">United States</option>
                    <option value="SG">Singapore</option>
                    <option value="CN">China</option>
                    <option value="ES">Spain</option>
                  </select>
                </div>
                <div className="wide"> <label className="required"><em>*</em>Street 1 Address</label> <input name="street[]" value={props.state.billingStreet1} onChange={props.handleInputChange} title="Street 1 Address" id="billingStreet1" className="input-text" type="text" /><span className={`${props.state.errors.billingStreet1 ? 'blink': ''}`} >{props.state.errors.billingStreet1}</span></div>
                <div className="field"> <label className="required"><em>*</em>City</label> <input name="city" value={props.state.billingCity} onChange={props.handleInputChange} title="City" className="input-text  required-entry" id="billingCity" type="text" /><span className={`${props.state.errors.billingCity ? 'blink': ''}`}>{props.state.errors.billingCity}</span></div>
                <div className="field" id="telephone_1"> <label className="required"><em>*</em>Telephone</label> <input type="text" name="telephone" value={props.state.billingTelephone} onChange={props.handleInputChange} title="Telephone" className="input-text   required-entry" id="billingTelephone" maxLength="10" /><span className={`${props.state.errors.billingTelephone ? 'blink': ''}`}>{props.state.errors.billingTelephone}</span></div>
                <div className="field">
                  <label className="required"><em>*</em>State/Province</label>
                  <div>
                    {props.state.showStates ?
                      <div>
                        <select id="billing_region_id_1" name="region_id" value={props.state.selectStateValue} onChange={props.handleStateChange} title="State/Province">
                          <option value="">Please select region, state or province</option>
                          {
                            props.state.stateListRes &&
                            Object.entries(props.state.stateListRes).map(([value, thisState]) => <option key={value} value={thisState.code} alt={thisState.region_id}>{thisState.name}</option>)
                          }

                        </select>
                        <span className={`${props.state.errors.stateValue ? 'blink': ''}`}>{props.state.errors.stateValue}</span></div> :
                      <input type="text" id="regionstate_1" name="regionsellll" className="input-text  required-entry" />
                    }
                  </div>
                </div>
                <div className="field" id="zipcode_validate_1"> <label className="required"><em>*</em>Zip/Postal Code</label> <input type="text" name="postcode" value={props.state.billingZip} onChange={props.handleInputChange} maxLength="5" title="Zip/Postal Code" id="billingZip" className="input-text validate-zip-international" /><span className={`${ props.state.errors.billingZip }`? 'blink' : ''}>{props.state.errors.billingZip}</span></div>
                <div className="input-box"> <label className="required">Tax ID</label> <input type="text" name="bkmtax" value={props.state.vatId} onChange={props.handleInputChange} title="Tax ID" id="vatId" className="input-text" /></div>
              </li>
            </ul>
          </div>
          <div className="input-field">
            <h2 className="legend">Login Information</h2>
            <ul className="form-lists">
              <li className="fields">
                <div className="field">
                  <label className="required"><em>*</em>Password</label>
                  <div className="input-box"> <input name="password" id="password" value={props.state.password} onChange={props.handleInputChange} title="Password" className="input-text required-entry " type="password" /><span className={`${ props.state.errors.password }`? 'blink' : ''}>{props.state.errors.password}</span></div>
                </div>
                <div className="field">
                  <label className="required"><em>*</em>Confirm Password</label>
                  <div className="input-box"> <input name="confirmation" title="Confirm Password" id="confirmation" value={props.state.confirmation} onChange={props.handleInputChange} className="input-text required-entry " type="password" /><span className={`${ props.state.errors.confirmation }`? 'blink' : ''}>{props.state.errors.confirmation}</span></div>
                </div>
              </li>
            </ul>
            <div className="field" id="subcription">
              <div className="subscription-field"> <input className="subcription-input" type="checkbox" id="subcription_input" name="subcriptionChecked" onChange={props.handleCheck} defaultChecked={props.state.checked} /> <span id="subcription-text">Sign Up for our Newsletter: Receive Exclusive Offers, Products Updates and More!</span></div>
            </div>
            <Recaptcha
              sitekey="6LcrZloUAAAAALSE-gz7e89KW4zdPdTr5DxdZ0Hh"
              // "6LftiX0UAAAAACou7ozaXnd-ljZjnqES11xlA-i0"
              render="explicit"
              verifyCallback={props.verifyCallback}
              onloadCallback={props.callback}
            />
            <div className="buttons-set register-submit-btn">
              <Button type="submit" style={recaptchaStyle} title="Submit" id="submitForm" onClick={props.customerRegisterData}><span><span>Submit</span></span></Button>

              <p className="required">* Required Fields</p>
            </div>
            
          </div>
        </div>

        <div className="em-footer-bottom  main-prod">
          <div className="fotter-container">
            <div className="row-one">
              <center>
                <ul>
                  <li>
                    <a href="/track-order">Track Order</a>|
                  </li>
                  <li>
                    <a href="/contacts">Contact Us</a>|
                  </li>
                  <li>
                    <a href="/privacy-policy">Privacy Policy</a>|
                  </li>
                  <li>
                    <a href="/term-and-conditions">Terms & Conditions</a>|
                  </li>
                  <li>
                    <a href="/vendors">Our Vendors</a>|
                  </li>
                  <li>
                    {/* <a href="/umicrosite/vendor/register/">Vendor Registration</a>| */}
                    <a href="https://bloomkonnect.com:8443/umicrosite/vendor/register/">Vendor Registration</a>|
                  </li>
                  <li>
                    <a href="/faq-vendor">FAQ Vendor</a>|
                  </li>
                  <li><a href="/faq-customer">FAQ Customer</a></li>|
                  <li>
                    <a href="/sustainable_floral_fund">Sustainability</a>|
                  </li>
                  <li>
                    <a href="/returns-and-refunds-policy">
                      Returns and Refunds Policy
                    </a>|
                  </li>
                  <li> <a href="/blog">Blog</a></li>
                </ul>
              </center>
            </div>
            <div className="row-two">
              <div className="block">
                <ul className="subscribe-div"> <li><input
                  className="email-search-input"
                  name="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  placeholder="Sign-up For Our Email Newsletter"
                  type="text" /></li>
                  <li>
                    <button type="submit" className="email-submit-input">
                      Subscribe
                    </button>
                  </li>

                </ul>
              </div>
              <div className="block">
                <ul className="share">
                  <li className="text">Stay Connected with Us!</li>
                  <li className="links">
                    <a title="Facebook" href="https://www.facebook.com/BloomKonnect-354654801406029/" target="_blank" >
                      <span className="social-icon fa fa-facebook fa-2x" />
                    </a>
                  </li>
                  <li className="links">
                    <a title="Twitter" href="https://twitter.com/bloomkonnect" target="_blank" >
                      <span className="social-icon fa fa-twitter fa-2x" />
                    </a>
                  </li>
                  <li className="links">
                    <a title="Instagram" href="https://www.instagram.com/bloomkonnect/" target="_blank" >
                      <span className="social-icon fa fa-instagram fa-2x" />
                    </a>
                  </li>
                  <li className="links">
                    <a title="Pintrest" href="https://www.pinterest.com/bloomkonnect/" target="_blank" >
                      <span className="social-icon fa fa-pinterest fa-2x" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <center>
              Copyright @ 2016| BloomKonnect | All rights reserved
            </center>
          </div>
        </div>
      </div>
    </div>

  );
}
