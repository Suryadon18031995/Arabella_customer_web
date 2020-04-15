import React, { Fragment } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '@material-ui/core/Checkbox';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { Slider } from 'antd';
import lazyLoader from '../../assets/images/lazy-loader.gif';
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
import cartPage from '../../assets/svg/cartPage.jpg';

export default function MyOrderComponent(props) {
    console.log(props);
    // console.log('first:', props.savedCardsFirstdata);
    // console.log('auth:', props.savedCardsAuthorizenet);
    const options = [];
    let result = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 10; i++) {
        const year = props.thisYear + i;
        options.push(<option value={year}>{year}</option>);
    }
    if (_get(props.cartResult, [0, 'code']) === 1) {
        result = _get(props.cartResult, [0, 'result']);
        const subTotal = _get(props.cartResult, [0, 'subtotal']);
    }
    return (
        <div className="">

             <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6' >
                   <div>
                    <h3 style={{color:'#0087b0'}}><b>Billing Address :</b></h3>
                        {props.defaultShipInfo && 
                        <p>{props.defaultShipInfo.address_line1}{props.defaultShipInfo.address_line2}<br/>
                            {props.defaultShipInfo.city}{props.defaultShipInfo.state && <p>{props.defaultShipInfo.state}</p>},{props.defaultShipInfo.zipcode}
                            </p>}
                   </div>
                    <br/>
                    <br/>
                   <div>
                    <h3 style={{color:'#0087b0'}}><b>Shipping Address :</b></h3>
                        {props.defaultBillingInfo && 
                        <p>{props.defaultBillingInfo.address_line1}<br/>
                            {props.defaultBillingInfo.city},{props.defaultBillingInfo.state},{props.defaultBillingInfo.zipcode}
                            
                        </p>}
                   </div>
                    <br/>
                    <br/>
                   <div>
                    <h3 style={{color:'#0087b0'}}><b>Payment Method :</b></h3>
                    <br/>
                                        <div className="row">
                                            <div className="col-sm-1">
                                            <input style={{width:'none'}} type="radio"
                                                name="cod"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'cod'} />
                                                </div>
                                                <div className="col-sm-11"  style={{marginTop: '-9px'}}>
                                                  <h4>Cash On Delivery</h4>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-sm-1">
                                            <input style={{width:'none'}} type="radio"
                                                name="openTerms"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'openTerms'} />
                                                </div>
                                                <div className="col-sm-11" style={{marginTop: '-9px'}}>
                                                  <h4>Bank Transfer</h4>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-sm-1">
                                            <input type="radio"
                                                name="ccavenue"
                                                onChange={props.getPaymentType}
                                                checked={props.paymentType === 'ccavenue'} />
                                                </div>
                                                <div className="col-sm-11" style={{marginTop: '-9px'}}>
                                                  <h4>Credit / Debit Card Payment</h4>
                                            </div>
                                        </div>
                           

                       </div>
                       <br/><br/>
                      {props.showCards === true ? 
                       <div>
                           <div className="row" style={{marginTop: '10px'}}>
                                <div className="col-sm-4">
                                    <h4>Pay With Card</h4>
                                </div>
                                <div className="col-sm-8">
                                    
                                </div>
                           </div>
                        
                           <div className="row" style={{marginTop: '10px'}}>
                                <div className="col-sm-4">
                                    <h4>Card Holder Name</h4>
                                </div>
                                <div className="col-sm-8" style={{marginLeft:'-1px'}}>
                                <input type="text" style={{ backgroundColor: '#d1d1d1',borderRadius: '9px',height: '42px',width: '350px', paddingLeft: '25px'}}/>
                                </div>
                           </div>
                           <div className="row" style={{marginTop: '10px'}}>
                                <div className="col-sm-4">
                                <h4>Card Number</h4>
                                </div>
                                <div className="col-sm-8" style={{marginLeft:'-1px'}}>
                                <input type="text" style={{ backgroundColor: '#d1d1d1',borderRadius: '9px',height: '42px',width: '200px', paddingLeft: '25px'}}/>
                                </div>
                           </div>
                           <div className="row" style={{marginTop: '10px'}}>
                                <div className="col-sm-4">
                                <h4>Expiry Date</h4>
                                </div>
                                <div className="col-sm-8" style={{marginLeft:'-1px'}}>
                                <input type="text" style={{ backgroundColor: '#d1d1d1',borderRadius: '9px',height: '42px',width: '100px', paddingLeft: '25px'}}/>
                                </div>
                           </div>
                           <div className="row" style={{marginTop: '10px'}}>
                                <div className="col-sm-4">
                                <h4>CVV(3 Digits)</h4>
                                </div>
                                <div className="col-sm-8" style={{marginLeft:'-1px'}}>
                                <input type="text" style={{ backgroundColor: '#d1d1d1',borderRadius: '9px',height: '42px',width: '100px', paddingLeft: '25px'}}/>
                                </div>
                           </div>

                           
                       </div>
                       : null
                        }
                 </div>
                
                 <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6' style={{borderLeft: '3px solid #0087b0'}}>
                 {
                             result.map((thisCart, index) => {
                        return (<div className='row' key={index}>
                        <div className='col-lg-5 col-md-5 col-xs-5 col-sm-5' style={{backgroundImage:`url(${cartPage})`,width:'200px',height:'200px',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',marginTop:'10px'}}>
                            <img style={{height:'165px',width:'165px',marginTop: '15px',marginLeft: '6px'}} src={thisCart.image} alt=''/>
                        </div>
                        <div className='col-lg-7 col-md-7 col-xs-7 col-sm-7'>
                             <h3><b>{thisCart.name}</b></h3>
                             <br/>
                             <br/>
                             <p>QTY - : {thisCart.qty}</p>
                             <br/>
                             <p>Price -: RS.{thisCart.product_price}</p>
                        </div>
                        </div>
                        )})
                        }
                        <br/>

                        <h2 style={{color:'#0087b0'}}>Do You Have Prescription?</h2>
                        <br/>
                        <div className="row">
                            <div className="col-sm-6">
                                <button class="btn" style={{height:'50px',width:'200px',backgroundColor:'#4de2ac',border: '3px solid #2fafcc',fontSize: '14px',color: 'white',textTransform: 'none'}}>Upload Prescription</button>
                            </div>
                            <div className="col-sm-6">
                            <button class="btn" style={{height:'50px',width:'200px',backgroundColor:'#4de2ac',border: '3px solid #2fafcc',fontSize: '14px',color: 'white',textTransform: 'none'}}>Doctor Consultation</button>
                            </div>

                        </div>
                        <br/>
                        <div style={{fontSize: 'large'}}>
                        <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        /> Contribute Rs.100 To Cancer Patients
                        </div>

                        <table id="total-table" className='mt-5'>
                                    <colgroup>
                                        <col />
                                        <col style={{ width: '10%' }} />
                                    </colgroup>
                                    <tfoot>
                                        <tr>
                                            <td style={{fontSize: '18px',width:'70%'}} > <strong className="grand-total">Total</strong></td>
                                            <td style={{fontSize: '16px' }} className="float-right">RS. {props.grandTotal}</td>
                                        </tr>
                                    </tfoot>
                                    <tbody>                                       
                                        
                                             <tr>
                                                <td style={{fontSize: '18px',width:'70%' }}> Item Total </td>
                                                <td style={{fontSize: '16px'}} className="float-right">RS {props.subTotal}</td>
                                            </tr>
                                            <tr>
                                                <td style={{fontSize: '18px' ,width:'70%'}}> Discount </td>
                                                <td style={{fontSize: '16px' }} className="float-right">Rs 0</td>
                                            </tr>
                                            <tr>
                                                <td style={{fontSize: '18px',width:'70%' }}> Rewards Points Used </td>
                                                <td style={{fontSize: '16px' }} className="float-right">Rs 0</td>
                                            </tr>
                                        

                                            <tr>
                                                <td style={{fontSize: '18px',width:'70%' }} >Delivery Fees(Free)</td>
                                                <td style={{fontSize: '16px' }} className="float-right">
                                               
                                                Free
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{fontSize: '18px',width:'70%' }} > Contribution </td>
                                                <td style={{fontSize: '16px' }} className="float-right">Rs 0</td>
                                            </tr>

                                    </tbody>
                                </table>
                                <br/>
                                Total Rewards points earned Rs 0 
                </div>
            </div>
            <br/>
            {props.loading === false ?
             <div>
                <center><button clasName="btn" style={{height:'50px',width:'200px',backgroundColor:'rgb(14, 141, 180)',color:'white'}} onClick={props.handleProcessOrder}>Proceed</button></center>
            </div>
            : <div>
            <center>
            <img src={ lazyLoader } alt="lazy-loader"/>
            </center>
        </div>}
            <br/>
        </div>  
    );
 }


