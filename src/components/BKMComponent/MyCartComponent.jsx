import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '@material-ui/core/Checkbox';
import _get from 'lodash/get';
import moment from 'moment';
// import { Slider, InputNumber } from 'antd';
import calendarImage from '../../assets/images/select-date.png';
import cartPage from '../../assets/svg/cartPage.jpg';

export default function MyCartComponent(props) {
    console.log(props);
    let result = [];
    if (_get(props.cartResult, [0, 'code']) === 1) {
        result = _get(props.cartResult, [0, 'result']);
        const subTotal = _get(props.cartResult, [0, 'subtotal']);
        return (
            <div className="cart">

                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                        <br/>
                    {
                                result.map((thisCart, index) => {
                        return (<div className='row' key={index}>
                        <div className='col-lg-5 col-md-5 col-xs-5 col-sm-5' style={{backgroundImage:`url(${cartPage})`,width:'200px',height:'200px',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',marginTop:'10px'}}>
                            <img style={{height:'165px',width:'165px',marginTop: '15px',marginLeft: '6px'}} src={thisCart.image} alt=''/>
                        </div>
                        <div className='col-lg-7 col-md-7 col-xs-7 col-sm-7'>
                        <React.Fragment>
                                                <h2 className="cart-product-name">
                                                    <a>{thisCart.name}</a>
                                                </h2>
                                                <br/>
                                                <p>MRP : {thisCart.row_total}</p>
                                                <br/>
                                                <div className="row">
                                                  <div className="col-sm-1">Qty</div> 
                                                  <div className="col-sm-6">
                                                      <center>
                                                        <div className="cart-info quantity">
                                                            <div className="btn-increment-decrement" onClick={() => props.updateCart(thisCart.cart_rid,'sub',thisCart.qty)}>-</div>
                                                                <input className="input-quantity" id="input-quantity-wristWear03" value={thisCart.qty}/>
                                                            <div className="btn-increment-increment" onClick={() => props.updateCart(thisCart.cart_rid,'add',thisCart.qty)}>+</div>
                                                        </div>
                                                        </center>
                                                      </div> 
                                                    <div className="col-sm-5" style={{width: 'auto'}}>
                                                        <div style={{ cursor: 'pointer' }} onClick={() => props.removeProduct(thisCart.cart_rid)} title='Remove Item'>Remove</div>
                                                    </div>
                                               </div>
                                               
                                                </React.Fragment>
                        </div>
                        </div>
                        )})}
                        <br/>
                        <br/>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                        <br/>
                        <div><h2>Have A Coupan Code</h2></div>
                        <br/>
                        <div>
                        <input style={{border: '2px solid #0087b0',padding: '10px',width:'300px', borderRadius: '25px'}} id="coupon_code" title="coupon_code" name="coupon_code" value={props.discountCouponValue} onChange={props.handleInputChange} />
                       {/*<span>{props.errors.discountCouponValue}</span>
                                            <button type="button" className="btn  mt-3" title="Apply Coupon" onClick={props.applyDiscountCoupon} value="Apply Coupon"><span><span className="apply-coupoun-btn">Apply Coupon</span></span></button>&nbsp;&nbsp;
                                            {
                                                props.couponRes &&
                                                <button type="button" className="btn " title="Cancel Coupon" onClick={props.cancelDiscountCoupon} value="Cancel Coupon"><span><span>Cancel Coupon</span></span></button>
                                            }*/}
                                        
                        </div>
                        <br/>
                        <div style={{fontSize: 'large'}}>
                        <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        /> Contribute Rs.100 To Cancer Patients
                        </div>
                           <br/>
                           <br/>     

                        <table id="total-table" className='mt-5'>
                                    <colgroup>
                                        <col />
                                        <col style={{ width: '1%' }} />
                                    </colgroup>
                                    <tfoot>
                                        <tr>
                                            <td style={{fontSize: '2.2rem'}} className="a-right" colSpan={1}> <strong className="grand-total">Total</strong></td>
                                            <td style={{fontSize: '2.2rem'}} className="float-right"> RS.{props.grandTotal}</td>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td style={{fontSize: '1.8rem'}} className="a-right" colSpan={1}>Item Total</td>
                                            <td style={{fontSize: '1.8rem'}} className="float-right">RS.{subTotal}</td>
                                        </tr>
                                        {
                                            props.couponRes && _get(props.cartResult, [0, 'coupon_code']) && _get(props.cartResult, [0, 'coupon_code']) !== 'NA' &&
                                            <tr>
                                                <td colSpan={1} className="a-right"> Discount ({props.coupCode})</td>
                                                <td className="a-right"> <span className="prices">-${props.discountVal}</span></td>
                                            </tr>
                                        }

                                            <tr>
                                                <td style={{fontSize: '1.8rem'}} colSpan={1} className="a-right">Delivery Fees(Free)</td>
                                                <td style={{fontSize: '1.8rem'}} className="float-right">
                                                {/* {
                                                    props.primeUser !== '1' ?
                                                        <span className="prices">
                                                            ${_get(props.cartResult, [0, 'fee_amount'])}
                                                        </span> :
                                                        <span className="prices">
                                                            <strike>
                                                                ${_get(props.cartResult, [0, 'fee_amount'])}
                                                            </strike>
                                                        </span>
                                                } */}
                                                Free
                                                </td>
                                            </tr>

                                    </tbody>
                                </table>
                                <br/>
                        <div className="text-center">
                        <button type="button" style={{height:'60px',width:'500px',backgroundColor:'rgb(14, 141, 180)',color:'white',fontSize: '36px',textTransform: 'none',paddingTop: '2px'}} title="Proceed to Checkout" onClick={props.handleCheckOut} className="btn"><span><span>Proceed To Checkout</span></span></button>
                        </div>
                    </div>
                </div>





                
                {props.move &&
                    <ul className="cart-messages">
                        <li className="cart-success-msg">
                            <ul>
                                <li><span>{props.productName} has been moved to wishlist</span></li>
                            </ul>
                        </li>
                    </ul>
                }
                {
                    props.showCouponRes &&
                    <ul className="coupon-messages">
                        <li className={props.sucessClassName}>
                            <ul>
                                <li><span>Coupon code "{props.coupCode}" {props.showCouponData}.</span></li>
                            </ul>
                        </li>
                    </ul>
                }
              
            </div>
        );
    }
    return (
        <center>
        <div className="cart-empty col-sm-12">
            <div className="page-title">
                <h1>Shopping Cart is Empty</h1>
            </div>
            <div className="no-cart-empty">
                <p>You have no items in your shopping cart.</p>
                <p>Click <a href="/">here</a> to continue shopping.</p>
            </div>
        </div>
        </center>
    );
}
