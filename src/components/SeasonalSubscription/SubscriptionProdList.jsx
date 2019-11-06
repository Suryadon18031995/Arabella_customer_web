import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
// import StarRatings from 'react-star-ratings';
import StarRatings from '../../components/Common/Rating.jsx';
// import Datetime from 'react-datetime';


const SubscriptionProdList = (props) => {
    const priceCss = {
        padding: 0,
        width: 'inherit',
    };
    // const borderBottom = {
    //     borderBottom: '1px solid #999',
    //     marginBottom: '10px',
    // };
    const addToCartButton = {
        marginTop: '4%',
        borderColor: '#7773A8',
        backgroundColor: '#7773A8',
    };
    return (
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 season-li-items'>
            <li className={`seasonal-li-items item itemid_${props.prodId} last col-lg-12 col-md-12 col-sm-12 col-xs-12`} key={props.index}>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <span
                        className={`product-img-listing col-md-1.5 ${!props.apiToken && 'marginBottom: 10px'}`}
                        onClick={props.showProductDetailPage}
                        style={(!props.apiToken) ? { marginBottom: '10px' } : { marginBottom: '0px' }}
                    >
                        <img
                            className="product-image-listing"
                            alt={props.prodDetails.name}
                            src={props.prodDetails.image}
                        />
                    </span>
                    <div className="product-shop col-md-10">
                        <div className="f-fix">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="name-rating">
                                    <h2 className="product-name" /* onClick={props.showProductDetailPage} */ >
                                        <span title={props.prodDetails.name}>
                                            {props.prodDetails.name}
                                        </span>
                                    </h2>
                                </div>
                                <div className="pdt-rating col-lg-12">
                                    <div style={{ float: 'left', width: '80px', height: '15px' }}>
                                        <StarRatings
                                            rating={props.prodDetails.product_rating}
                                            starDimension="12px"
                                            starSpacing="1px"
                                            starEmptyColor="#434343"
                                            starRatedColor="#fdb927"
                                        />
                                    </div>
                                    <p>{props.prodDetails.product_rating_count} Review(s)</p>
                                </div>
                                {props.apiToken && <h6 className="farmdetail">
                                    <span>Farm Name: <span className="farm_name">{props.prodDetails.loc}</span> </span>
                                </h6>
                                }
                                <div className="vendor-name-rating">
                                    <h6 className="vendor-name"> <span> By:{props.prodDetails.vendor}  </span></h6>
                                    <div style={{ float: 'left', width: '80px', height: '15px' }}>
                                        <StarRatings
                                            rating={props.prodDetails.vendor_rating}
                                            starDimension="12px"
                                            starSpacing="1px"
                                            starEmptyColor="#434343"
                                            starRatedColor="#fdb927"
                                        />
                                    </div>
                                    <p>{props.prodDetails.vendor_rating_count} Review(s)</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 a-right">
                                {props.apiToken && <div className="qty_cart subscription-qty-cart">
                                    <span className={props.blinkText && props.blinkText[props.prodId] && _get(_get(props.isAddToCart, props.prodId, null), 'isInputQty', null) ? 'error-msg-qty blink' : 'error-msg-qty'}>
                                        Qty in multiple of {_get(props.deliveryData, 'qty_per_box')}
                                    </span>
                                    <input type="text" name='orderQuantity' id='int-qty-subscription'
                                        maxLength="12" title="Input here No. of Qty" className="input-text qty"
                                        onChange={event => props.handleInuputChange(event, props.prodDetails, props.deliveryData)}
                                        // defaultValue={_get(_get(props.isAddToCart, props.prodId, undefined), 'isInputQty', undefined)}
                                        value={_get(_get(props.isAddToCart, props.prodId, undefined), 'isInputQty', undefined)}
                                    />
                                    
                                </div>}
                                {/* Add To Cart */}
                                {
                                    props.apiToken &&
                                    <React.Fragment>
                                    <button
                                        type="button"
                                        id='sub-button-list'
                                        style={{ marginTop: '4%' }}
                                        onClick={() => props.handleAddCartClick(props.prodId)}
                                        title={ 
                                            _get(_get(props.isAddToCart, props.prodId, null), 'isInputQty', null) && _get(_get(props.isAddToCart, props.prodId, null), 'isSelectedAvailDate', null) ?
                                            'Add to Cart'
                                            : _get(_get(props.isAddToCart, props.prodId, null), 'isInputQty', null) ? 'Please Select Date To Add' : 'Please Select Quantity To Add'}
                                        className={_get(_get(props.isAddToCart, props.prodId, null), 'isInputQty', null) && _get(_get(props.isAddToCart, props.prodId, null), 'isSelectedAvailDate', null) ? 'button btn-cart' : 'button btn-cart disableBtn'}
                                        style={{ addToCartButton }}
                                        disabled={!(_get(_get(props.isAddToCart, props.prodId, null), 'isInputQty', null) >= _get(props.deliveryData, 'qty_per_box') &&
                                            _get(_get(props.isAddToCart, props.prodId, null), 'isSelectedAvailDate', null))}
                                    >{' '}Add to Cart
                                    </button>
                                    {(props.addingId === props.prodId) && (props.addedId !== props.addingId) ? <span>Adding To Cart</span> : null}
                                    {props.addedId === props.prodId ? <span style={{ float: 'right' }}>Item Added To Cart</span> : null}
                                    </React.Fragment>
                                }
                                {!props.apiToken &&
                                    <div>
                                        <span>Please login to see your delivered price per stem: </span><br />
                                        <span onClick={() => props.showLoginModal({ show: true })} style={{ float: 'right', color: 'orange', cursor: 'pointer' }}>Click Here</span>
                                    </div>

                                }
                            </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {props.apiToken && <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 total-price">
                                    <div className="total-price-box" style={{ float: 'none', width: 'unset' }}>
                                        <div className="col-md-1 col-sm-2 col-xs-2" style={priceCss}>
                                            <span className="regular-price">
                                                <span className="price" content="0.98">
                                                    {_get(props.deliveryData, 'total_price_format')}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="col-md-2">
                                            per {' '}
                                            <span>
                                                {_get(props.deliveryData, 'avail_id') && _get(props.prodDetails, _get(props.deliveryData, 'avail_id')).pack_unit}
                                            </span>
                                        </div>
                                    </div>
                                    {(typeof props.totalAmountToPay[_get(props.prodDetails, 'pid')] !== '') && <section className="Total-price-per">

                                        {/* <span className="total_span">Total amount payable {props.totalAmount && props.totalAmount.toFixed(2)}</span> */}
                                        <span className="total_span">{props.totalAmountToPay[_get(props.prodDetails, 'pid')]}</span>
                                    </section>}
                                    {props.apiToken && <section className="subscribe-price-break">
                                    <a onClick={() => props.handleShowPriceBreakDown(props.prodId)}>Price breakdown</a>
                                </section>}
                                </div>
                                }
                                {props.showPriceBreakDown && props.showPriceBreakDown[props.prodId] && <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 price-table-subscr'>
                                <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Delivery Method</th>
                                                    <th>Delivery Date</th>
                                                    <th>Farm Price</th>
                                                    <th>Freight Cost</th>
                                                    <th>Trucking Cost</th>
                                                    <th>Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {/* <td className="tb1">{_get(props.deliveryData, 'delivery_method')}</td> */}
                                                    <td className="tb1">{_get(props.deliveryData, 'deliv_front_name')}</td>
                                                    <td className="tb3">{_get(props.deliveryData, 'delivery_date')}</td>
                                                    <td className="tb4">{_get(props.deliveryData, 'farm_price')}</td>
                                                    <td className="tb5">{_get(props.deliveryData, 'landing_price')}</td>
                                                    <td className="tb6">{_get(props.deliveryData, 'delivery_price')}</td>
                                                    <td className="tb7">{_get(props.deliveryData, 'total_price_format')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </div>}
                            </div>
                            <div className="right-side">
                                {/*  {(props.showMaxQtyAlert) && <span className="max_qty1">
                                    The maximum quantity allowed is {_get(props.deliveryData, 'floorallowed')}
                                </span>} */}
                                {(props.showMaxQtyAlert && props.prodDetails.pid === props.prodId) && <span className="max_qty1">
                                    The maximum quantity allowed is {_get(props.deliveryData, 'floorallowed')}
                                </span>}
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 delivery-block sub-deli-an">
                                    {props.apiToken && <div className="col-md-12 col-lg-7 pdt-delivery">
                                        <p>
                                            <b>Delivery via</b><br />
                                            <span className="delmet">{_get(props.deliveryData, 'deliv_front_name')}</span>
                                        </p>
                                    </div>}

                                    {props.apiToken && <div className="col-md-5 col-lg-4 pdt-delivery-to">
                                        <b>Delivery To</b><br />
                                        {/* <span className="delmet">store_name</span> */}
                                        <span className="delmet">{props.defaultStoreName}</span>
                                        <span className="storeLogin cursor-click anchor-color" onClick={props.handleShowChangeStore}>{' '}Change store</span>

                                    </div>}
                                    {props.apiToken && <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aval-days">
                                        <table className={`moreavailable mavail_${props.prodId}`}>
                                            <tbody>
                                                <tr>
                                                    <th>Available Days</th>
                                                    {props.dateArray && props.dateArray.map((data, key) => (
                                                        <td key={key}>
                                                            <input type="radio" name={`${props.prodId + _get(data, 'delivery_date_format')}`}
                                                            value={_get(data, 'delivery_date_format')}
                                                            onChange={event => props.handleChangeInputFields(event, props.prodId)}
                                                            checked={_get(_get(props.isAddToCart, props.prodId, null), 'isSelectedAvailDate', null) === _get(data, 'delivery_date_format')}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Days</th>
                                                    {props.dateArray && props.dateArray.map((data, key) => (<td key={key}>
                                                        {moment(_get(data, 'delivery_date_format')).format('dddd')}
                                                    </td>))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>}
                                    {/* <div className="col-lg-12"> */}
                                        {props.apiToken && <div className="dropdown-detail right col-md-12 col-lg-12" style={{ marginBottom: '15px' }}>
                                            <span onClick={() => props.handleMoreDetailClick(props.prodId)} style={{ float: 'right', color: 'orange', cursor: 'pointer' }}>More Details <i className="fa fa-sort-down" /></span>
                                        </div>}
                                    {/* </div> */}
                                </div>
                            </div>

                        </div>
                    </div>
                    {_get(props.showMoreDetail, _get(props.prodDetails, 'pid'), false) && <div className="left-side ">
                        <span style={{}} />
                        <div className="pro-features a-center">
                            <p>
                                <b>Box Type :</b>
                                <span className="p_boxtype">
                                    {_get(props.deliveryData, 'avail_id') && _get(props.prodDetails, _get(props.deliveryData, 'avail_id')).box_type}
                                </span>
                                |</p>
                            <p>
                                <b>Pack Unit:</b>
                                <span className="p_packunit">
                                    {_get(props.deliveryData, 'avail_id') && _get(props.prodDetails, _get(props.deliveryData, 'avail_id')).pack_unit}
                                </span>
                                |</p>
                            <p><b>Qty Per Box: </b>
                                <span className="qtybox_name">
                                    {_get(props.deliveryData, 'avail_id') && _get(props.prodDetails, _get(props.deliveryData, 'avail_id')).qty_per_box}
                                </span>|</p>
                            <p><b>Color :</b><span className="p_color">
                                {_get(props.deliveryData, 'avail_id') && _get(props.prodDetails, _get(props.deliveryData, 'avail_id')).color}
                            </span>|</p>
                            <p><b>Variety :</b><span className="p_variety">
                                {_get(props.deliveryData, 'avail_id') && _get(props.prodDetails, _get(props.deliveryData, 'avail_id')).varity}
                            </span>|</p>
                            <p><b>Grade :</b><span className="p_grade">
                                {_get(props.deliveryData, 'avail_id') && _get(props.prodDetails, _get(props.deliveryData, 'avail_id')).grade}
                            </span></p>
                            <ul className="add-to-links">
                                <li>
                                    <span
                                        className="link-wishlist cursor-click"
                                        title="Add to Wishlist"
                                        onClick={() => props.addToWishlistFavoriteHandle(props.prodId, 'wishlist')}
                                    >
                                        <span>Add to Wishlist</span>
                                    </span>
                                </li>
                                <li>
                                    <span href="#"
                                        className="link-preferences btn-pref cursor-click"
                                        title="Add to Favorite"
                                        onClick={() => props.addToWishlistFavoriteHandle(props.prodId, 'favorite')}
                                    >
                                        <span>Add to Favorite</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>}
                </div>
            </li>
        </div >
    );
};

export default SubscriptionProdList;
