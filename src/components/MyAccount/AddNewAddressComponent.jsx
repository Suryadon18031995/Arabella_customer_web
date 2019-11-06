import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function AddNewAddressComponent(props) {

    return (
            <div className="my-account">
                <div className="page-title">
                    <h1>{props.pageTitle}</h1>
                </div>
                <div className="recurring-profiles">
                    <h2 className="legend">Contact Information</h2>

                    <ul>
                        <li>
                            <div style={{ display: 'none' }} className="input-field">
                                
                                <input name="addressId" id="addressId" title="Address ID" className="field-input" type="text" value={props.fields.addressId} /> 
                            </div>
                            <div className="input-field">
                                <label className="required"><em>*</em>First Name</label>
                                <input name="firstName" id="firstName" title="First Name" className="field-input" type="text" onChange={props.handleChange} value={props.fields.firstName} />
                                <br/><span style={{ color: 'red' }}>{props.errors.firstName}</span>
                            </div>
                            <div className="input-field">
                                <label className="required">Middle Name/Initial</label>
                                <input name="middleName" id="middleName" title="Middle Name" className="field-input" type="text" onChange={props.handleChange} value={props.fields.middleName} />
                                <br/><span style={{ color: 'red' }}>{props.errors.middleName}</span>
                            </div>
                        </li>
                        <li>
                            <div className="input-field">
                                <label className="required"><em>*</em>Last Name</label>
                                <input name="lastName" id="lastName" title="Last Name" className="field-input" type="text" onChange={props.handleChange} value={props.fields.lastName} />
                                <br/><span style={{ color: 'red' }}>{props.errors.lastName}</span>
                            </div>
                        </li>
                        <li>
                            <div className="input-field-full-width">
                                <label className="required">Company</label>
                                <input name="company" id="company" title="Company" className="field-input" type="text" onChange={props.handleChange} value={props.fields.company} />
                            </div>
                        </li>
                        <li>
                            <div className="input-field">
                                <label className="required"><em>*</em>Telephone</label>
                                <input name="telephone" id="telephone" title="Telephone" className="field-input" type="text" onChange={props.handleChange} value={props.fields.telephone} />
                                <br/><span style={{ color: 'red' }}>{props.errors.telephone}</span>
                            </div>
                            <div className="input-field">
                                <label className="required">Fax</label>
                                <input name="fax" id="fax" title="Fax" className="field-input" type="text" onChange={props.handleChange} value={props.fields.fax} />
                                <br/><span style={{ color: 'red' }}>{props.errors.fax}</span>
                            </div>
                        </li>
                        <li>
                            <div className="input-field-full-width">
                                <label className="required"><em>*</em>Street Address</label>
                                <input name="streetAddress1" id="streetAddress1" title="Street Address" className="field-input" type="text" onChange={props.handleChange} value={props.fields.streetAddress1} />
                            </div>
                            <div className="input-field-full-width">
                                <input name="streetAddress2" id="streetAddress2" title="Street Address" className="field-input" type="text" onChange={props.handleChange} value={props.fields.streetAddress2} />
                                <br/><span style={{ color: 'red' }}>{props.errors.streetAddress1}</span>
                            </div>
                        </li>
                        <li>
                            <div className="input-field">
                                <label className="required"><em>*</em>Country</label>
                                <CountryDropdown
                                    value={props.country}
                                    className="field-input"
                                    valueType={'short'}
                                    id="country"
                                    onChange={val => props.selectCountry(val)} />

                                <br/><span style={{ color: 'red' }}>{props.errors.country}</span>
                            </div>
                            <div className="input-field">
                            <label className="required"><em>*</em>State/Province</label>
                            {props.showStates ?
                      <div>
                        <select className="edit_state" id="billing_region_id_1" name="region_id" value={props.selectStateValue} onChange={props.handleUSStateChange} title="State/Province">
                          <option value="">Please select region, state or province</option>
                          {
                            props.stateListRes &&
                            Object.entries(props.stateListRes).map(([value, thisState]) => <option key={value} /* value={`${thisState.code},${thisState.region_id}`} */ value={thisState.code} id={thisState.region_id} alt={thisState.region_id}>{thisState.name}</option>)
                          }
                        </select>
                        <br/><span style={{ color: 'red' }}>{props.errors.selectStateValue}</span>
                        </div> :
                      <span>
                            <input type="text" id="regionstate_1" name="regionsell" onChange={props.handleStateChange} className="field-input" />
                            <br/><span style={{ color: 'red' }}>{props.errors.selectStateValue}</span>
                      </span>
                    }
                                {/* <label className="required"><em>*</em>State/Province</label>
                                <RegionDropdown
                                    country={props.country}
                                    value={props.region}
                                    valueType={'short'}
                                    id="region"
                                    className="field-input"
                                    countryValueType="short"
                                    onChange={val => props.selectRegion(val)} />
                                <br/><span style={{ color: 'red' }}>{props.errors.region}</span> */}
                            </div>
                        </li>
                        <li>
                            <div className="input-field">
                                <label className="required"><em>*</em>City</label>
                                <input name="city" id="city" title="City" className="field-input" type="text" onChange={props.handleChange} value={props.fields.city} />
                                <br/><span style={{ color: 'red' }}>{props.errors.city}</span>
                            </div>
                            <div className="input-field">
                                <label className="required"><em>*</em>Zip/Postal Code</label>
                                <input name="postalCode" id="postalCode" title="Postal Code" className="field-input" type="text" onChange={props.handleChange} value={props.fields.postalCode} />
                                <br/><span style={{ color: 'red' }}>{props.errors.postalCode}</span>
                            </div>
                        </li>
                        <li>
                            <div className="input-checkbox">
                                {!props.isBillingFlag ?
                                    <React.Fragment>
                                <input type="checkbox" name="defaultBilling" id="defaultBilling" title="Use as My Default Billing Address" onChange={props.handleChange} value={props.fields.defaultBilling} />
                                <label >Use as my default billing address</label>
                                </React.Fragment>
                                 : <strong>Default Billing Address</strong>}
                            </div>
                        </li>
                        <li>
                            <div className="input-checkbox">
                                {!props.isShippingFlag ?
                                <React.Fragment>
                                    <input type="checkbox" name="defaultShipping" id="defaultShipping" title="Use as My Default Shipping Address" onChange={props.handleChange} value={props.fields.defaultShipping} />
                                    <label >Use as my default shipping address</label>
                                </React.Fragment>
                                 : <strong>Default Shipping Address</strong>}
                            </div>
                        </li>
                        <li>
                            <em>* Required Fields</em>
                        </li>
                        <li>
                            <button className="back-link" onClick={props.handleBackClick}>Back</button>
                            <button type="submit" className="get-update" onClick={props.handleSaveAddress.bind(props)}>Save Address</button>
                        </li>
                    </ul>

                </div>
        </div>


    );
}
