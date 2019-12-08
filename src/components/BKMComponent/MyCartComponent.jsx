import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import moment from 'moment';
// import { Slider, InputNumber } from 'antd';
import calendarImage from '../../assets/images/select-date.png';

export default function MyCartComponent(props) {
    let result = [];
    if (_get(props.cartResult, [0, 'code']) === 1) {
        result = _get(props.cartResult, [0, 'result']);
        const subTotal = _get(props.cartResult, [0, 'subtotal']);
        return (
            <div className="cart">

                <div className='row'>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9'>
                    {
                                result.map((thisCart, index) => {
                        return (<div className='row' key={index}>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <img src={thisCart.image} alt=''/>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <React.Fragment>
                                                <h2 className="cart-product-name">
                                                    <a href={`/${thisCart.url_key}.html`} className="cart-prod-name">{thisCart.name}</a>
                                                </h2>
                                                <p className="cart-sku">SKU : {thisCart.sku}</p>
                                                <p>Price: {thisCart.row_total}</p>
                                                {/* <p className="cart-deli-date">Delivery Date : {moment(thisCart.delivery_date, 'YYYY-MM-DD').format('DD MMM YYYY')}<img className="cart-calendar" src={ calendarImage }></img></p> */}
                                                {/* <p className="cart-deli">Delivery Method : {thisCart.delivery_method}</p> */}
                                                <div style={{ cursor: 'pointer' }} onClick={() => props.removeProduct(thisCart.cart_rid)} title='Remove Item'>Delete</div>
                                                </React.Fragment>
                        </div>
                        </div>
                        )})}
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                        <div>Apply Promocode or Discount</div>
                        <div className='text-center'>
                        <input className="discount-input" id="coupon_code" title="coupon_code" name="coupon_code" value={props.discountCouponValue} onChange={props.handleInputChange} />
                        <span>{props.errors.discountCouponValue}</span>
                                            <button type="button" className="btn custom-class-button mt-3" title="Apply Coupon" onClick={props.applyDiscountCoupon} value="Apply Coupon"><span><span className="apply-coupoun-btn">Apply Coupon</span></span></button>&nbsp;&nbsp;
                                            {
                                                props.couponRes &&
                                                <button type="button" className="btn custom-class-button" title="Cancel Coupon" onClick={props.cancelDiscountCoupon} value="Cancel Coupon"><span><span>Cancel Coupon</span></span></button>
                                            }
                                        
                        </div>

                        <table id="total-table" className='mt-5'>
                                    <colgroup>
                                        <col />
                                        <col style={{ width: '1%' }} />
                                    </colgroup>
                                    <tfoot>
                                        <tr>
                                            <td className="a-right" colSpan={1}> <strong className="grand-total">Grand Total</strong></td>
                                            <td className="float-right"> <strong><span className="price" style={{ font: '20px/1.35 Gotham_Book_Regular, Raleway, Helvetica Neue, Helvetica, Arial, sans-serif' }}>${props.grandTotal}</span></strong></td>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {props.primeUser === '1' ? <tr>
                                            <td className="a-right" colSpan={1}> You will earn:</td>
                                            <td className="a-right"> <span className="prices">{_get(props.cartResult, [0, 'reviewedpoint_earn'])}</span></td>
                                        </tr> : null}
                                        <tr>
                                            <td className="a-right" colSpan={1}> Subtotal</td>
                                            <td className="float-right"> <span className="prices">${subTotal}</span></td>
                                        </tr>
                                        {props.cartResult && _get(props.cartResult, [0, 'coupon_code']) && _get(props.cartResult, [0, 'coupon_code']) === 'NA' && props.discountVal && parseFloat(props.discountVal) > 0 &&
                                        <tr>
                                            <td className="a-right" colSpan={1}> Discount (Custom Box Discount)</td>
                                            <td className="a-right"> <span className="prices">-${props.discountVal}</span></td>
                                        </tr>
                                        }
                                        {
                                            props.couponRes && _get(props.cartResult, [0, 'coupon_code']) && _get(props.cartResult, [0, 'coupon_code']) !== 'NA' &&
                                            <tr>
                                                <td colSpan={1} className="a-right"> Discount ({props.coupCode})</td>
                                                <td className="a-right"> <span className="prices">-${props.discountVal}</span></td>
                                            </tr>
                                        }

                                            <tr>
                                                <td colSpan={1} className="a-right"> Shipping & Handling Fee</td>
                                                <td className="float-right">
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

                        <button type="button" title="Proceed to Checkout" onClick={props.handleCheckOut} className="btn custom-class-button mt-5"><span><span>Proceed to Checkout</span></span></button>

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
                <div>
                    <table className="cart-table">
                        {/* <thead>
                            <tr>
                                <th>
                                    <span>Product Name</span>
                                </th>
                                <th rowSpan={1}>&nbsp;</th>
                                <th rowSpan={1}></th>
                                <th rowSpan={1}>
                                    {props.cartType !== 'prime' ? <span>Move to Wishlist</span> : ''}
                                </th>
                                <th colSpan={1}>
                                    <span>Price</span>
                                </th>
                                <th colSpan={1}>
                                    <span>Qty</span>
                                </th>
                                <th colSpan={1} style={{ borderRight: '1px solid grey' }}>Subtotal</th>
                            </tr>
                        </thead> */}
                        <tfoot>
                            <tr style={{ border: 'none' }}>
                                <td colSpan={50} style={{ paddingTop: '10px' }}>
                                    <button type="button"
                                        className="btn btn-outline-warning"
                                        onClick={props.continueShopping} title="Continue Shopping">
                                        <span><span className="apply-coupoun-btn">Continue Shopping</span></span>
                                    </button>
                                    <button type="submit"
                                        className="btn btn-outline-warning ml-3"
                                        onClick={index => props.updateCart(index)}
                                        name="update_cart_action" value="update_qty" title="Update Shopping Cart">
                                        <span><span className="apply-coupoun-btn">Update Shopping Cart</span></span>
                                    </button>
                                    {/* <Button type="submit"
                                        className="update-qty-btn btn-shop"
                                        onClick={() => props.clearShoppingCart()}
                                        name="update_cart_action" value="update_qty" title="Clear Shopping Cart">
                                        <span><span className="apply-coupoun-btn">Clear Shopping Cart</span></span>
                                    </Button> */}
                                </td>
                            </tr>
                        </tfoot>
                        {/* <tbody>
                            {
                                result.map((thisCart, index) => {
                                    let trStyle;
                                    if (index % 2 === 0) {
                                        trStyle = 'even';
                                    } else {
                                        trStyle = 'odd';
                                    }
                                    // const total = (thisCart.row_total).toFixed(2);
                                    //  const total = (thisCart.product_price * (thisCart.qty * thisCart.qty_per_box)).toFixed(1);
                                    if (thisCart.cart_validation === '') {
                                        return <tr className={trStyle} key={index}>
                                            <td style={{ padding: '24px' }}>
                                                <div>
                                                    <a onClick={() => props.removeProduct(thisCart.cart_rid)} title='Remove Item'>
                                                        <span className="fa fa-times-circle"></span></a>
                                                    {props.cartType !== 'prime' && props.cartType !== 'subscription' ? <a href={`/${thisCart.url_key}.html`} title={thisCart.name}>
                                                        <img src={thisCart.image} width="100" alt={thisCart.name} />
                                                    </a> :
                                                    <img src={thisCart.image} width="100" alt={thisCart.name} />
                                                    }
                                                </div>
                                            </td>
                                            <td style={{ padding: '25px 23px 20px' }}>
                                                {props.cartType !== 'prime' && props.cartType !== 'subscription' ?
                                                <React.Fragment>
                                                <h2 className="cart-product-name">
                                                    <a href={`/${thisCart.url_key}.html`} className="cart-prod-name">{thisCart.name}</a>
                                                </h2>
                                                <p className="cart-sku">SKU : {thisCart.sku}</p>
                                                <p className="cart-deli-date">Delivery Date : {moment(thisCart.delivery_date, 'YYYY-MM-DD').format('DD MMM YYYY')}<img className="cart-calendar" src={ calendarImage }></img></p>
                                                <p className="cart-deli">Delivery Method : {thisCart.delivery_method}</p>
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                <h2 className="cart-product-name">
                                                    <a style={{ cursor: 'auto' }} className="cart-prod-name">{thisCart.name}</a>
                                                </h2>
                                                {props.cartType === 'subscription' ?
                                                <React.Fragment>
                                                    <p className="cart-sku">SKU : {thisCart.sku}</p>
                                                    <p className="cart-deli-date">First Delivery Date : {moment(thisCart.delivery_date, 'YYYY-MM-DD').format('DD MMM YYYY')}<img className="cart-calendar" src={ calendarImage }></img></p>
                                                    <p className="cart-deli-date">Last Delivery Date : {moment(thisCart.delivery_date, 'YYYY-MM-DD').add(props.cycles - 2, 'w').format('DD MMM YYYY')}<img className="cart-calendar" src={ calendarImage }></img></p>
                                                    <p className="cart-deli">Delivery Method : {thisCart.delivery_method}</p>
                                                </React.Fragment>
                                                : null}
                                                </React.Fragment>
                                            }
                                            </td>
                                            <td className="a-center">
                                                {props.cartType !== 'prime' && props.cartType !== 'subscription' && <a className='edit-lable' href={`/${thisCart.url_key}.html`} title="Edit item parameters">Edit</a>}
                                            </td>
                                            <td className="a-center">
                                                {props.cartType !== 'prime' && <a onClick={() => props.handleMoveToWishlist(thisCart.product_id)} className="wishlist-link" title="Move"><span className="fa fa-heart-o"> Move</span></a>}
                                            </td>
                                            <td className="a-center">
                                                <span className="price">{thisCart.product_price_currency}</span></td>
                                            <td className="a-center">
                                            {props.cartType !== 'prime' ? <div className="qty_cart">
                                                    <input id="qty" name={thisCart.qty} value={thisCart.qty * thisCart.qty_per_box} onChange={e => props.handleInputQty(thisCart.qty_per_box, thisCart.cart_rid, e)} size="4" title="Qty" className="input-text" maxLength="12" />
                                                    {props.showCartErrors && props.cartErrors && thisCart.cart_rid in props.cartErrors && _get(props, ['cartErrors', thisCart.cart_rid]) !== true && <span style={{ color: 'red' }}>{_get(props, ['cartErrors', thisCart.cart_rid])}</span>}
                                                    {props.pdValidation && thisCart.product_id in props.pdValidation && <span className="error-msg-qty blink">Maximum overall qty for this product is {_get(props, ['pdValidation', thisCart.product_id])}</span>}
                                                    <span className={props.showCartErrors && props.cartErrors && thisCart.cart_rid in props.cartErrors && _get(props, ['cartErrors', thisCart.cart_rid]) === true ? 'error-msg-qty blink' : 'error-msg-qty'}>Qty in multiple of {thisCart.qty_per_box}</span>
                                                </div> :
                                                <span>1</span>}
                                            </td>
                                            <td className="sub-total">
                                                <span className="cart-price">
                                                    <span className="price">{thisCart.row_total}</span>
                                                </span>
                                            </td>
                                        </tr>;
                                    }
                                    return <tr className={trStyle} key={index}>
                                        <td style={{ padding: '24px' }}>
                                            <div>
                                                <a onClick={() => props.removeProduct(thisCart.cart_rid)} title='Remove Item'><span className="fa fa-times-circle"></span></a>
                                                <a href={`/${thisCart.url_key}.html`} title={thisCart.name}>
                                                    <img src={thisCart.image} width="100" alt={thisCart.name} />
                                                </a>
                                            </div>
                                        </td>
                                        <td style={{ padding: '25px 23px 20px' }}>
                                            <h2 className="cart-product-name">
                                                <a href={`/${thisCart.url_key}.html`} className="cart-prod-name">{thisCart.name}</a>
                                            </h2>
                                            <p className="cart-sku">SKU : {thisCart.sku}</p>
                                            <p className="cart-deli">Delivery Method : {thisCart.delivery_method}</p>
                                        </td>
                                        <td></td>
                                        <td className="a-center">{thisCart.cart_validation}</td>
                                        <td></td>
                                        <td></td>
                                        <td style={{ borderRight: '1px solid grey' }}></td>
                                    </tr>;
                                })
                            }
                        </tbody> */}
                    </table>
                </div>
            </div>
        );
    }
    return (
        <div className="cart-empty col-sm-12">
            <div className="page-title">
                <h1>Shopping Cart is Empty</h1>
            </div>
            <div className="no-cart-empty">
                <p>You have no items in your shopping cart.</p>
                <p>Click <a href="/">here</a> to continue shopping.</p>
            </div>
        </div>
    );
}
