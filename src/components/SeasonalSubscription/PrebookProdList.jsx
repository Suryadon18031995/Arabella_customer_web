import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
// import StarRatings from 'react-star-ratings';
import StarRatings from '../../components/Common/Rating.jsx';
import Datetime from 'react-datetime';
import { reduceDeliveryDates } from '../../utils/dateUtil';

const SubscriptionProdList = (props) => {
    const dateObjectArray = reduceDeliveryDates(props.deliveryDatesArray);
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
    const renderDay = (inputProps, currentDate, selectedDate) => {
        inputProps.className = `${inputProps.className} customTdCls`;
        const formattedDate = currentDate.format('DD-MMM-YYYY');
        if (dateObjectArray && dateObjectArray[formattedDate]) {
            inputProps.className = `${inputProps.className} hasDatePrice`;
            return <td {...inputProps} onClick={() => props.resetMoreDetails(formattedDate, props.deliveryDatesArray, props.prodId)}>
                {currentDate.date()}
                <div>{dateObjectArray[formattedDate]}</div>
            </td>;
        }
        inputProps.className = `${inputProps.className} rdtDisabled`;
        return <td {...inputProps}>{currentDate.date()}</td>;
    };
    const renderInput = (inputProps, openCalendar, closeCalendar) => {
        // function clear() {
        //     inputProps.onChange({ target: { value: '' } });
        // }
        return (
            <div>
                {/* <input {...inputProps} value={props.selectedDate}/> */}
                {/* <button onClick={openCalendar}>open calendar</button>
                <button onClick={closeCalendar}>close calendar</button>
                <button onClick={clear}>clear</button> */}
                <div className="delivery-opinion">
                    <b className='delivery-date-color-sub'>Delivery Date</b><br />
                    <span className='delmet-color'>
                        {_get(props.deliveryData, 'delivery_date_form')}
                    </span>
                    <span className="calendar" onClick={openCalendar} style={{ textAlign: 'left' }}>
                        <input type="date" className="datepicker59662 hasDatepicker" placeholder="+" id="dp1542198135597" style={{ border: '0px' }} />
                    </span>
                </div>
            </div>
        );
    };
    return (
        <div className='season-li-items col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <li className={`seasonal-li-items item itemid_${props.prodId} last  col-lg-12 col-md-12 col-sm-12 col-xs-12`} key={props.index}>
                <div>
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
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <div className="name-rating">
                                    <h2 className="product-name" /* onClick={props.showProductDetailPage} */ >
                                        <span title={props.prodDetails.name}>
                                            {props.prodDetails.name}
                                        </span>
                                    </h2>
                                </div>
                                <div className="pdt-rating col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 a-right">
                                {props.apiToken && <div className="qty_cart subscription-qty-cart">
                                    <span className={props.blinkText && props.blinkText[props.prodId] && _get(_get(props.isAddToCart, props.prodId, null), 'isInputQty', null) ? 'error-msg-qty blink' : 'error-msg-qty'}>
                                        Qty in multiple of {_get(props.deliveryData, 'qty_per_box')}
                                    </span>
                                    <input type="text" name='orderQuantity' id="int-qty-subscription"
                                        maxLength="12" title="Input here No. of Qty" className="input-text qty"
                                        onChange={event => props.handleInuputChange(event, props.prodDetails, props.deliveryData)}
                                        defaultValue={_get(_get(props.isAddToCart, props.prodId, undefined), 'isInputQty', undefined)}
                                    />
                                    {/* <span className="max_qty"></span> */}
                                </div>}
                                {/* Add To Cart */}
                                {
                                    props.apiToken &&
                                    <button
                                        type="button"
                                        id='sub-button-list'
                                        // style={{ marginTop: '4%' }}
                                        onClick={() => props.handleAddCartClick(props.prodId)}
                                        title="Add to Cart"
                                        className="button btn-cart"
                                        style={{ addToCartButton }}
                                        disabled={!(_get(_get(props.isAddToCart, props.prodId, null), 'isInputQty', null) >= _get(props.deliveryData, 'qty_per_box') 
                                        // &&
                                        //     _get(_get(props.isAddToCart, props.prodId, null), 'isSelectedAvailDate', null)
                                            )}
                                    >{' '}Add to Cart
                                    </button>
                                }
                                {!props.apiToken &&
                                    <div>
                                        <span>Please login to see your delivered price per stem: </span><br />
                                        <span onClick={() => props.showLoginModal({ show: true })} style={{ float: 'right', color: 'orange', cursor: 'pointer' }}>Click Here</span>
                                    </div>

                                }
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {props.apiToken && <div className="total-price">
                                    <div className="total-price-box" style={{ float: 'none', width: 'unset' }}>
                                        <div className="col-md-1 col-sm-12 col-xs-12" style={priceCss}>
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
                                </div>
                                }
                                {props.apiToken && <section className="drop-down-price">
                                    <a style={{ cursor: 'pointer' }}><h6 className="price_break">Price breakdown</h6></a>
                                    <div className="table-responsive" id='sub-table'>
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
                                    </div>
                                </section>}
                            </div>
                            <div className="right-side">
                                {/*  {(props.showMaxQtyAlert) && <span className="max_qty1">
                                    The maximum quantity allowed is {_get(props.deliveryData, 'floorallowed')}
                                </span>} */}
                                {(props.showMaxQtyAlert && props.prodDetails.pid === props.prodId) && <span className="max_qty1">
                                    The maximum quantity allowed is {_get(props.deliveryData, 'floorallowed')}
                                </span>}
                                <div className="delivery-block">
                                {props.apiToken && <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12 pdt-delivery calender-prebook">
                                        {/* <p> */}
                                            {/* <b>Delivery Date</b><br /> */}
                                            <Datetime
                                                    renderDay={renderDay}
                                                    renderInput={renderInput}
                                                    closeOnSelect={true}
                                                    defaultValue={new Date(moment(_get(props.deliveryData, 'delivery_date_format')).format('YYYY/MM/DD'))}
                                                />
                                        {/* </p> */}
                                    </div>}

                                    {props.apiToken && <div className="col-md-3 col-lg-3 col-sm-3 col-xs-12 pdt-delivery">
                                        <p>
                                            <b>Delivery via</b><br />
                                            <span className="delmet">{_get(props.deliveryData, 'deliv_front_name')}</span>
                                        </p>
                                    </div>}

                                    {props.apiToken && <div className="col-md-3 col-lg-3 col-sm-3 col-xs-12 pdt-delivery-to align-sub-deli">
                                        <b className='delivery-date-color-sub'>Delivery To</b><br />
                                        {/* <span className="delmet">store_name</span> */}
                                        <span className="delmet">{props.defaultStoreName}</span><br/>
                                        <span className="storeLogin cursor-click anchor-color" onClick={props.handleShowChangeStore}>{' '}Change store</span>

                                    </div>}
                                    {/* {props.apiToken && <div className="aval-days col-lg-8 col-lg-push-3">
                                        <table className={`moreavailable mavail_${props.prodId}`}>
                                            <tbody>
                                                <tr>
                                                    <th>Available Days</th>
                                                    {props.dateArray && props.dateArray.map((data, key) => (
                                                        <td key={key}>
                                                            <input type="radio" name={`${props.prodId}`} value={_get(data, 'delivery_date_format')} onChange={event => props.handleChangeInputFields(event)} />
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
                                    </div>} */}
                                    {/* <div className="col-lg-12"> */}
                                        {props.apiToken && <div className="dropdown-detail right col-sm-12 col-xs-12 col-md-12 col-lg-12" style={{ marginBottom: '15px' }}>
                                            <span onClick={() => props.handleMoreDetailClick(props.prodId)} style={{ float: 'right', color: 'orange', cursor: 'pointer' }}>More Detail <i className="fa fa-sort-down" /></span>
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
