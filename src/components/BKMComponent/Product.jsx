import React from 'react';
import StarRatings from 'react-star-ratings';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Datetime from 'react-datetime';
import Countdown from 'react-countdown-now';
import '../../assets/stylesheets/DatePickerReact.css';
import freshDeal from '../../assets/images/fresh-deals.png';
import revFreshDeal from '../../assets/images/rev-fresh-deals.png';
import liveDeal from '../../assets/images/live-deals.png';
import TdComponenet from '../../components/ProductComponent/rowComponent.jsx';

export default function ProductComponent(props) {
    const renderDay = (inputProps, currentDate, selectedDate) => {
        inputProps.className = `${inputProps.className} customTdCls`;
        const formattedDate = currentDate.format('DD-MMM-YYYY');
        if (props.dateObjectArray && Object.keys(props.dateObjectArray[props.index]).length && props.dateObjectArray[props.index][formattedDate]) {
            inputProps.className = `${inputProps.className} hasDatePrice`;
            return <td {...inputProps} onClick={() => props.resetMoreDetails(formattedDate, props.index, props.thisData.pid)}>
                {currentDate.date()}
                <div>{props.dateObjectArray[props.index][formattedDate]}</div>
            </td>;
        }
        inputProps.className = `${inputProps.className} rdtDisabled`;
        return <td {...inputProps}>{currentDate.date()}</td>;
    };
    const renderInput = (inputProps, openCalendar, closeCalendar) => {
        function clear() {
            inputProps.onChange({ target: { value: '' } });
        }
        return (
            <div>
                {/* <input {...inputProps} value={props.selectedDate}/> */}
                {/* <button onClick={openCalendar}>open calendar</button>
                <button onClick={closeCalendar}>close calendar</button>
                <button onClick={clear}>clear</button> */}
                <div className="delivery-opinion">
                    <b className='delivery-date-color'>Delivery Date</b><br />
                    <span className='delmet-color'>
                        {_get(props.deliveryData, 'delivery_date_form')}
                    </span>
                    <span className="calendar" onClick={openCalendar}>
                        <input type="date" className="datepicker59662 hasDatepicker" placeholder="+" id="dp1542198135597" style={{ border: '0px' }} />
                    </span>
                </div>
            </div>
        );
    };
    // console.log("product data :", props);

    return (
        <div>
            {/* style={{ listStyle: 'none' }} */}
            {props.viewType === 'compressed' && (props.freshDeal || (_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).is_special === '1')) && <img className='fresh-deals-rev' src={revFreshDeal} />}
            <li key={props.index} className="item" >
                {props.viewType !== 'compressed' && (props.freshDeal || (_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')) && _get(props.thisData, _get(props.deliveryData, 'avail_id')).is_special === '1')) && <img className='fresh-deals' src={freshDeal} />}
                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')) && _get(props.thisData, _get(props.deliveryData, 'avail_id')).live_inventry === '1' && <img className='live-deals' src={liveDeal} />}
                {props.viewType === 'list' && <span className='prod-img-spacing cursor-click'>
                    <a href={`/${props.thisData.url_key}.html`}>
                        <img className="prod-image-size" alt={props.thisData.name} src={props.thisData.image} />
                    </a>
                </span>}
                <div className="product-shop">
                    <div className="f-fix">
                        <div className="col-lg-7">
                            <div className="name-rating">
                                <h2 className="prod-name-shop cursor-click">
                                    <a href={`/${props.thisData.url_key}.html`} title={props.thisData.name}>
                                        {props.thisData.name}
                                    </a>
                                </h2>
                            </div>
                            <div className="pdt-rating col-lg-12">
                                {/* style={{ float: 'left', width: '80px', height: '15px' }} */}
                                <div className="product-starratings" onMouseEnter={() => props.ratingsHover(props.thisData.pid)}>
                                    <StarRatings
                                        rating={(_get(props.thisData, 'product_rating')) / 20}
                                        starDimension="15px"
                                        starSpacing="1px"
                                        starEmptyColor="#434343"
                                        starRatedColor="#fdb927"
                                    />
                                    {_get(props.thisData, 'product_rating') === 0 &&
                                        <div className="review-table">
                                        <span>No Reviews</span>
                                    </div>
                                    }
                                    {props.productReviewData && _get(props.productReviewData, 'result') && _get(props.thisData, 'product_rating') !== 0 &&
                                    <div className="review-table">
                                        <table className="table list-table">
                                            <thead>
                                                <th>Ratings</th>
                                                <th>Product Reviews</th>
                                            </thead>
                                            <tbody>
                                            {
                                                    _get(props.productReviewData, 'result').map((eachReview, index) => {
                                                        if (index < 5) {
                                                            return (<tr key={index}>
                                                                <td className="list-td">
                                                                    <StarRatings
                                                                        rating={Number(eachReview.rating_value) ? Number(eachReview.rating_value) : 0}
                                                                        starDimension="12px"
                                                                        starSpacing="1px"
                                                                        starEmptyColor="#434343"
                                                                        starRatedColor="#fdb927"
                                                                    />
                                                                </td>
                                                                <td>{eachReview.detail}</td>
                                                            </tr>);
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {_get(props.productReviewData, 'total_reviews') > 5 &&
                                            <a href={`/${props.thisData.url_key}.html#reviewList`}>
                                            <span className="more-reviews">See {Number(_get(props.productReviewData, 'total_reviews')) - 5 } more reviews</span>
                                        </a>
                                        }
                                    </div>
                                    }
                                </div>

                                <p className="ng-binding">{props.thisData.product_rating_count} Review(s)</p>
                            </div>

                            {!props.pastPurchaseData && <div>
                                {props.apiToken && <span className="farmdetail">
                                    <span>Farm Name: <span className="farm_name">{_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')) && _get(props.thisData, _get(props.deliveryData, 'avail_id')).loc}</span> </span>
                                    {/* <span>Farm Name: <span className="farm_name">{props.thisData.loc}</span> </span> */}
                                </span>}
                                <div className="vendor-name-rating" onMouseEnter={() => props.vendorRatingsHover(props.thisData.vid)}>
                                    <h6 className="vendor-name"> <span> By:{props.thisData.vendor}  </span></h6>
                                    {/* style={{ float: 'left', width: '80px', height: '15px', marginTop: '-4px' }} */}

                                    <StarRatings
                                        rating={(props.thisData.vendor_rating) / 20}
                                        starDimension="12px"
                                        starSpacing="1px"
                                        starEmptyColor="#434343"
                                        starRatedColor="#fdb927"
                                    />
                                     {props.thisData.vendor_rating === 0 &&
                                        <div className="vend-review-table">
                                        <span>No Reviews</span>
                                    </div>
                                    }
                                    {props.productVendorReviews && _get(props.productVendorReviews, 'data') && _get(props.thisData, 'vendor_rating') !== 0 &&
                                    <div className="vend-review-table">
                                        <table className="table vend-list-table">
                                            <thead>
                                                <th>Ratings</th>
                                                <th>Vendor Reviews</th>
                                            </thead>
                                            <tbody>
                                            {
                                                    _get(props.productVendorReviews, 'data').map((eachReview, index) => {
                                                        if (index < 5) {
                                                            return (<tr key={index}>
                                                                <td className="vend-list-td">
                                                                    <StarRatings
                                                                        rating={Number(eachReview.vendor_quality) ? Number(eachReview.vendor_quality) : 0}
                                                                        starDimension="12px"
                                                                        starSpacing="1px"
                                                                        starEmptyColor="#434343"
                                                                        starRatedColor="#fdb927"
                                                                    />
                                                                </td>
                                                                <td>{eachReview.detail}</td>
                                                            </tr>);
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {_get(props.productVendorReviews, 'total_product') > 5 &&
                                            // <a href={`/${props.thisData.url_key}.html#reviewList`}>
                                            <span className="more-reviews">See {Number(_get(props.productVendorReviews, 'total_product')) - 5 } more reviews</span>
                                        // </a>
                                        }
                                    </div>
                                    }

                                    <p className="ng-binding">{props.thisData.vendor_rating_count} Review(s)</p>
                                </div></div>}
                            {props.pastPurchaseData && <div>
                                <div className="vendor-name-rating">
                                    <h6 className="vendor-name"> <span> By:{props.thisData.vendor}  </span></h6>
                                    {/* style={{ float: 'left', width: '80px', height: '15px', marginTop: '-4px' }} */}
                                    <div>
                                        <StarRatings
                                            rating={props.thisData.vendor_rating}
                                            starDimension="12px"
                                            starSpacing="1px"
                                            starEmptyColor="#434343"
                                            starRatedColor="#fdb927"
                                        />
                                    </div>
                                    {/* <p className="ng-binding">{props.thisData.vendor_rating_count} Review(s)</p> */}
                                </div>
                                {props.apiToken && !_isEmpty(props.thisData.loc) && <span className="farmdetail">
                                    <span>Farm Name: <span className="farm_name">{props.thisData.loc}</span> </span>
                                </span>}
                            </div>}
                            {_isEmpty(props.deliveryData) &&
                                <span className="farmdetail">Currently Not Available</span>
                            }

                        </div>
                        <div className=" col-xs-12 col-sm-12 col-lg-5 col-md-6 a-right">

                            {!_isEmpty(props.deliveryData) && props.apiToken && <div className="qty_cart">
                                {/* style={{ color: 'red' }} */}
                                <span className={`error-msg-qty ${props.blinkText[props.thisData.pid]}`} style={{ textAlign: 'left' }}>
                                    Qty in multiple of {_get(props.deliveryData, 'qty_per_box')}
                                </span>
                                <input type="text" name='orderQuantity' value={_get(props.unitQty, [props.thisData.pid])}
                                    maxLength="12" title="Input here No. of Qty" className="input-text qty"
                                    onChange={event => props.handleInuputChange(event, props.thisData, props.deliveryData)} />
                            </div>}
                            <button type="button" onClick={() => props.handleAddCartClick(props.thisData, props.deliveryData)}
                                title={props.apiToken ? 'Add to Cart' : 'Please login to add items into the cart'} className={`button btn-cart add-crt-btn ${!_get(props.inputValid, props.thisData.pid) && props.apiToken ? '' : 'disableBtn'}`}
                                disabled={!(!_get(props.inputValid, props.thisData.pid) && props.apiToken)}>
                                Add to Cart
                                </button>
                            {props.apiToken && props.fromNextDayDelivery && props.thisData.timeDiff && <p className="countDownDiv"> Order within <Countdown
                                date={Date.now() + props.thisData.timeDiff}
                                daysInHours={true}
                            /> Hrs</p>}
                        </div>
                        {!_isEmpty(props.deliveryData) &&
                            <div>
                                <div className="col-md-12 col-lg-12">
                                    <div className="total-price">
                                        <div className="total-price-box">
                                            <div className="price-box">
                                                <span className="regular-price">
                                                    <span className="price" content="0.98">
                                                        {_get(props.deliveryData, 'total_price_format')}
                                                    </span>
                                                </span>
                                            </div>
                                            per {' '}
                                            <span>
                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')) && _get(props.thisData, _get(props.deliveryData, 'avail_id')).pack_unit}
                                            </span>
                                        </div>
                                        {(props.totalAmount && props.totalAmount[props.thisData.pid] > 0) && <section className="Total-price-per">
                                            <span className="total_span">Total amount payable ${props.totalAmount && props.totalAmount[props.thisData.pid] && props.totalAmount[props.thisData.pid].toFixed(2)}</span>
                                        </section>}
                                    </div>
                                    {props.apiToken && <section className="drop-down-price">
                                        {/* style={{ cursor: 'pointer' }} */}
                                        <a><h6 className="price_break">Price breakdown</h6></a>
                                        <div className="table-responsive">
                                            {/* style={{ marginBottom: '0px' }} */}
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
                                                        <td className="tb1">
                                                            {_get(props.deliveryData, 'deliv_front_name')}
                                                        </td>
                                                        <td className="tb3">
                                                            {_get(props.deliveryData, 'delivery_date')}
                                                        </td>
                                                        <td className="tb4">
                                                            {_get(props.deliveryData, 'farm_price')}
                                                        </td>
                                                        <td className="tb5">
                                                            {_get(props.deliveryData, 'landing_price')}
                                                        </td>
                                                        <td className="tb6">
                                                            {_get(props.deliveryData, 'delivery_price')}
                                                        </td>
                                                        <td className="tb7">
                                                            {_get(props.deliveryData, 'total_price_format')}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>}
                                </div>

                                <div className="right-side">
                                    {(props.showMaxQtyAlert && props.thisData.pid === props.productId) && <span className="max_qty1">
                                        The maximum quantity allowed is {_get(props.deliveryData, 'floorallowed')}
                                    </span>}
                                    <div className="delivery-block">
                                        {props.apiToken &&
                                            <div className="col-xs-12 col-md-4 col-lg-4 pdt-delivery">
                                                <Datetime
                                                    renderDay={renderDay}
                                                    renderInput={renderInput}
                                                    closeOnSelect={true}
                                                />
                                            </div>
                                        }
                                        {props.apiToken && <div className="col-xs-12 col-md-4 col-lg-4 pdt-delivery">
                                            <p>
                                                <b>Delivery via</b><br />
                                                <span className="delmet-color">{_get(props.deliveryData, 'deliv_front_name')}</span>
                                            </p>
                                        </div>}

                                        {props.apiToken && <div className="col-xs-12  col-md-4 col-lg-4 pdt-delivery-to">
                                            <b className='del-to-color'>Delivery To</b><br />
                                            <span className="delmet-color">{props.storeName} &nbsp;</span>
                                            <span className="storeLogin cursor-click anchor-color" onClick={props.handleShowChangeStore}>{' '}Change store</span>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {!_isEmpty(props.deliveryData) &&
                    <div>
                        <div className="col-lg-12">
                            {props.showMoreAvail && (_get(props.thisData, 'pid') in props.showMoreAvail) ?
                                <span>
                                    <div className="dropdown-detail a-right col-md-9 col-lg-9" >
                                        <span onClick={() => props.handleMoreAvailClick(props.thisData && props.thisData.pid)} >More Available<i className="fa fa-sort-down" /></span>
                                    </div>
                                    <div className="dropdown-detail a-right col-md-3 col-lg-3" >
                                        <span onClick={() => props.handleMoreDetailClick(props.thisData && props.thisData.pid)} >More Detail <i className="fa fa-sort-down" /></span>
                                    </div>
                                </span> :
                                <div className="dropdown-detail a-right col-md-12 col-lg-12" >
                                    <span onClick={() => props.handleMoreDetailClick(props.thisData && props.thisData.pid)} >More Detail <i className="fa fa-sort-down" /></span>
                                </div>
                            }
                            {_get(props.showMoreDetail, _get(props.thisData, 'pid'), false) &&
                                <div className='slide-in-class'>
                                    <div className="bd-top">
                                        <p>
                                            <b>Box Type :</b>
                                            <span className="p_boxtype">
                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).box_type}
                                            </span>
                                            |</p>
                                        <p>
                                            <b>Pack Unit:</b>
                                            <span className="p_packunit">
                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).pack_unit}
                                            </span>
                                            |</p>
                                        <p><b>Qty Per Box: </b>
                                            <span className="qtybox_name">
                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).qty_per_box}
                                            </span>|</p>
                                        <p><b>Color :</b><span className="p_color">
                                            {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).color}
                                        </span>|</p>
                                        <p><b>Variety :</b><span className="p_variety">
                                            {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).varity}
                                        </span>|</p>
                                        <p><b>Grade :</b><span className="p_grade">
                                            {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).grade}
                                        </span>|</p>
                                        <p><b>Petal Count :</b><span className="p_variety">
                                            {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).petal_count}
                                        </span>|</p>
                                        <p><b>Head Size :</b><span className="p_grade">
                                            {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).head_size}
                                        </span></p>
                                    </div>
                                    <div className="left-side a-center fav-wishlist-part">
                                        <ul className="add-to-links">
                                            <li>
                                                <a className="link-wishlist" title="Add to Wishlist"
                                                    onClick={() => props.handleAddToWishlist(props.thisData.pid)}>
                                                    <span>Add to Wishlist</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="link-preferences btn-pref logintrigger" title="Add to Favourite"
                                                    onClick={() => props.handleAddToFavorites(props.thisData.pid)}>
                                                    <span>Add to Favorite</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                            {_get(props.showMoreAvail, _get(props.thisData, 'pid'), false) &&
                                <div className='slide-in-class'>
                                    <div className="left-side">
                                        <table>
                                            <tbody>
                                                <tr className="list-inline moreavailable">
                                                    <th>Select Appr</th>
                                                    {
                                                        _get(props.moreAvail, _get(props.thisData, 'pid')) && Object.keys(_get(props.moreAvail, _get(props.thisData, 'pid'))).map((pKey, index) => {
                                                            return (
                                                                <td style={{ display: 'table-cell' }} key={index}>
                                                                    <input type="radio" name="swatch" onClick={() => props.ProductSwitch(pKey, props.index, _get(props.thisData, 'pid'))} />
                                                                </td>
                                                            );
                                                        })
                                                    }
                                                </tr>
                                                <tr className="list-inline moreavailable">
                                                    <th>Qty Per</th>
                                                    {
                                                        _get(props.moreAvail, _get(props.thisData, 'pid')) && Object.keys(_get(props.moreAvail, _get(props.thisData, 'pid'))).map((pKey, index) => {
                                                            return (
                                                                <TdComponenet index={index} key={index}
                                                                    thisData={props.thisData[pKey].qty_per_box}
                                                                    availId={pKey}
                                                                    ProductSwatch={props.ProductSwitch}
                                                                />
                                                            );
                                                        })
                                                    }
                                                </tr>
                                                <tr className="list-inline moreavailable">
                                                    <th>Apprx Price</th>
                                                    {
                                                        _get(props.moreAvail, _get(props.thisData, 'pid')) && Object.keys(_get(props.moreAvail, _get(props.thisData, 'pid'))).map((pKey, index) => {
                                                            return (
                                                                <TdComponenet index={index} key={index}
                                                                    thisData={props.thisData[pKey].approxPrice}
                                                                    availId={pKey}
                                                                    ProductSwatch={props.ProductSwitch}
                                                                />
                                                            );
                                                        })
                                                    }
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>}
                        </div>
                    </div>
                }

            </li>
        </div>
    );
}
