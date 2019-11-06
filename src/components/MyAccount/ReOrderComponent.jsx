import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import StarRatings from 'react-star-ratings';
import Datetime from 'react-datetime';

export default function ViewOrderComponent(props) {
    let deliveryData;
    return (
        <div className="re-order">
        <div className='reorder-title'>
            <h1>My Reorder</h1>
            <button type="button" title="Add to Cart" className="reorder-btn" onClick={() => props.handleBulkAddToCart()}><i className="fa fa-shopping-cart"></i>Add to Cart</button>
        </div>
            <div className="category-products">
                <ol className="products-list reorder-list">
                {
                    props.productDetails && props.productDetails.map((thisData, index) => {
                        deliveryData = props.displayData[index];
                        const renderDay = (inputProps, currentDate, selectedDate) => {
                            inputProps.className = `${inputProps.className} customTdCls`;
                            const formattedDate = currentDate.format('DD-MMM-YYYY');
                            if (props.dateObjectArray && Object.keys(props.dateObjectArray[index]).length && props.dateObjectArray[index][formattedDate]) {
                                inputProps.className = `${inputProps.className} hasDatePrice`;
                                return <td {...inputProps} onClick={() => props.resetMoreDetails(formattedDate, index)}>
                                    {currentDate.date()}
                                    <div>{props.dateObjectArray[index][formattedDate]}</div>
                                </td>;
                            }
                            inputProps.className = `${inputProps.className} rdtDisabled`;
                            return <td {...inputProps}>{currentDate.date()}</td>;
                        };
                        const renderInput = (inputProps, openCalendar) => {
                            return (
                                <div>
                                    <div className="delivery-opinion">
                                        <b className='delivery-date-color'>Delivery Date</b><br />
                                        <span className='delmet-color'>
                                            {_get(deliveryData, 'delivery_date_form')}
                                        </span>
                                        <span className="calendar" onClick={openCalendar}>
                                            <input type="date" className="datepicker59662 hasDatepicker" placeholder="+" id="dp1542198135597" style={{ border: '0px' }} />
                                        </span>
                                    </div>
                                </div>
                            );
                        };
                        if (_isEmpty(deliveryData)) {
                            return 'Sorry some of the products which you need to reorder is not currently available now.';
                        }
                    return (
                        <li key={props.index} className="item" >
                <span className='prod-img-spacing cursor-click'>
                    <a href={`/${thisData.url_key}.html`}>
                        <img className="prod-image-size" alt={thisData.name} src={thisData.image} />
                    </a>
                </span>
                <div className="product-shop">
                    <div className="f-fix">
                        <div className="col-lg-7">
                            <div className="name-rating">
                                <h2 className="prod-name-shop cursor-click">
                                    <a href={`/${thisData.url_key}.html`} title={thisData.name}>
                                        {thisData.name}
                                    </a>
                                </h2>
                            </div>

                           <div>
                                <div className="vendor-name-rating">
                                    <h6 className="vendor-name"> <span> By:{thisData.vendor}  </span></h6>
                                    <StarRatings
                                        rating={thisData.vendor_rating}
                                        starDimension="12px"
                                        starSpacing="1px"
                                        starEmptyColor="#434343"
                                        starRatedColor="#fdb927"
                                    />
                                </div>
                                <span className="farmdetail">
                                    <span>Farm Name: <span className="farm_name">{thisData.loc}</span> </span>
                                </span>
                                </div>
                            <div>
                            </div>
                        </div>
                        <div className=" col-xs-10 col-sm-12 col-lg-5 col-md-6 a-right">
                            {!_isEmpty(deliveryData) && <div className="qty_cart">
                                <span className={`error-msg-qty ${props.blinkText[thisData.pid]}`} style={{ textAlign: 'left' }}>
                                    Qty in multiple of {_get(deliveryData, 'qty_per_box')}
                                </span>
                                <input type="text" name='orderQuantity'
                                    maxLength="12" title="Input here No. of Qty"
                                    className="input-text qty" defaultValue={thisData.qty_ordered}
                                    onChange={event => props.handleInuputChange(event, thisData, deliveryData)} />
                            </div>}
                            {/* <button type="button" onClick={() => props.handleAddCartClick(thisData, deliveryData)}
                                title="Add to Cart" className={`button btn-cart add-crt-btn ${_get(props.inputValid, thisData.pid, props.apiToken ? true : false) ? 'disableBtn' : ''}`}
                                disabled={_get(props.inputValid, thisData.pid, props.apiToken ? true : false)}>
                                Add to Cart
                                </button> */}
                        </div>
                        {!_isEmpty(deliveryData) &&
                            <div>
                                <div className="col-md-12 col-lg-12">
                                    <div className="total-price">
                                        <div className="total-price-box">
                                            <div className="price-box">
                                                <span className="regular-price">
                                                    <span className="price" content="0.98">
                                                        {_get(deliveryData, 'total_price_format')}
                                                    </span>
                                                </span>
                                            </div>
                                            per {' '}
                                            <span>
                                                {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).pack_unit}
                                            </span>
                                        </div>
                                        {/* {(props.totalAmount[thisData.pid] > 0) && <section className="Total-price-per">
                                            <span className="total_span">Total amount payable ${props.totalAmount[thisData.pid] && props.totalAmount[thisData.pid].toFixed(2)}</span>
                                        </section>} */}
                                         <section className="Total-price-per">
                                            <span className="total_span">Total amount payable ${props.totalAmount[thisData.pid] && props.totalAmount[thisData.pid].toFixed(2) ? props.totalAmount[thisData.pid] && props.totalAmount[thisData.pid].toFixed(2) : thisData.qty_ordered * deliveryData.total_price_currency}</span>
                                        </section>
                                    </div>
                                    <section className="drop-down-price">
                                        <a><h6 className="price_break">Price breakup</h6></a>
                                        <div className="table-responsive">
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
                                                        <td className="tb1">{_get(deliveryData, 'deliv_front_name')}</td>
                                                        <td className="tb3">{_get(deliveryData, 'delivery_date')}</td>
                                                        <td className="tb4">{_get(deliveryData, 'farm_price')}</td>
                                                        <td className="tb5">{_get(deliveryData, 'landing_price')}</td>
                                                        <td className="tb6">{_get(deliveryData, 'delivery_price')}</td>
                                                        <td className="tb7">{_get(deliveryData, 'total_price_format')}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                </div>

                                <div className="right-side">
                                    {(props.showMaxQtyAlert && thisData.pid === props.productId) && <span className="max_qty1">
                                        The maximum quantity allowed is {_get(deliveryData, 'floorallowed')}
                                    </span>}
                                    <div className="delivery-block">
                                            <div className="col-xs-12 col-md-4 col-lg-4 pdt-delivery">
                                                <Datetime
                                                    renderDay={renderDay}
                                                    renderInput={renderInput}
                                                    closeOnSelect={true}
                                                />
                                            </div>
                                            <div className="col-xs-12 col-md-4 col-lg-4 pdt-delivery">
                                            <p>
                                                <b>Delivery via</b><br />
                                                <span className="delmet-color">{_get(deliveryData, 'deliv_front_name')}</span>
                                            </p>
                                        </div>

                                        <div className="col-xs-12  col-md-4 col-lg-4 pdt-delivery-to">
                                            <b className='del-to-color'>Delivery To</b><br />
                                            <span className="delmet-color">{props.storeName} &nbsp;</span>
                                            <span className="storeLogin cursor-click anchor-color" onClick={props.handleShowChangeStore}>{' '}Change store</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {!_isEmpty(deliveryData) &&
                    <div>
                        <div className="col-lg-12">
                        {(_get(thisData, 'pid') in props.showMoreAvail) ?
                            <span>
                            <div className="dropdown-detail a-right col-md-9 col-lg-9" >
                                <span onClick={() => props.handleMoreAvailClick(thisData && thisData.pid)} >More Available <i className="fa fa-sort-down" /></span>
                            </div>
                            <div className="dropdown-detail a-right col-md-3 col-lg-3" >
                            <span onClick={() => props.handleMoreDetailClick(thisData && thisData.pid)} >More Detail <i className="fa fa-sort-down" /></span>
                            </div>
                            </span> :
                            <div className="dropdown-detail a-right col-md-12 col-lg-12" >
                                <span onClick={() => props.handleMoreDetailClick(thisData && thisData.pid)} >More Detail <i className="fa fa-sort-down" /></span>
                            </div>
                            }
                            {_get(props.showMoreDetail, _get(thisData, 'pid'), false) &&
                                <div className='slide-in-class'>
                                    <div className="bd-top">
                                        {_get(thisData, _get(deliveryData, 'avail_id')).box_type && <p>
                                            <b>Box Type :</b>
                                            <span className="p_boxtype">
                                                {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).box_type}
                                            </span>
                                            |</p>}
                                        {_get(thisData, _get(deliveryData, 'avail_id')).pack_unit && <p>
                                            <b>Pack Unit:</b>
                                            <span className="p_packunit">
                                                {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).pack_unit}
                                            </span>
                                            |</p>}
                                            {_get(thisData, _get(deliveryData, 'avail_id')).qty_per_box && <p><b>Qty Per Box: </b>
                                            <span className="qtybox_name">
                                                {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).qty_per_box}
                                            </span>|</p>}
                                            {_get(thisData, _get(deliveryData, 'avail_id')).color && <p><b>Color :</b><span className="p_color">
                                            {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).color}
                                        </span>|</p>}
                                        {_get(thisData, _get(deliveryData, 'avail_id')).varity && <p><b>Variety :</b><span className="p_variety">
                                            {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).varity}
                                        </span>|</p>}
                                        {_get(thisData, _get(deliveryData, 'avail_id')).grade && <p><b>Grade :</b><span className="p_grade">
                                            {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).grade}
                                        </span>|</p>}
                                        {_get(thisData, _get(deliveryData, 'avail_id')).petal_count && <p><b>Petal Count :</b><span className="p_variety">
                                            {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).petal_count}
                                        </span>|</p>}
                                        {_get(thisData, _get(deliveryData, 'avail_id')).head_size && <p><b>Head Size :</b><span className="p_grade">
                                            {_get(deliveryData, 'avail_id') && _get(thisData, _get(deliveryData, 'avail_id')).head_size}
                                        </span></p>}
                                    </div>
                                    <div className="left-side a-center fav-wishlist-part">
                                        <ul className="add-to-links">
                                            <li>
                                                <a className="link-wishlist" title="Add to Wishlist"
                                                    onClick={() => props.handleAddToWishlist(thisData.pid)}>
                                                    <span>Add to Wishlist</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                                {_get(props.showMoreAvail, _get(thisData, 'pid'), false) &&
                            <div className='slide-in-class'>
                                <div className="left-side">
                                    <table>
                                        <tbody>
                                            <tr className="list-inline moreavailable">
                                                <th>Select Appr</th>
                                                {
                                                    _get(props.moreAvail, _get(thisData, 'pid')) && Object.keys(_get(props.moreAvail, _get(thisData, 'pid'))).map((pKey, index) => {
                                                        return (
                                                            <td style={{ display: 'table-cell' }} key={index}>
                                                                <input type="radio" name="swatch" onClick={() => props.ProductSwitch(pKey, props.index, _get(thisData, 'pid'))} />
                                                            </td>
                                                        );
                                                    })
                                                }
                                            </tr>
                                            <tr className="list-inline moreavailable">
                                                <th>Qty Per</th>
                                                {
                                                    _get(props.moreAvail, _get(thisData, 'pid')) && Object.keys(_get(props.moreAvail, _get(thisData, 'pid'))).map((pKey, index) => {
                                                        return (
                                                            <TdComponenet index={index} key={index}
                                                                thisData={thisData[pKey].qty_per_box}
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
                                                    _get(props.moreAvail, _get(thisData, 'pid')) && Object.keys(_get(props.moreAvail, _get(thisData, 'pid'))).map((pKey, index) => {
                                                        return (
                                                            <TdComponenet index={index} key={index}
                                                                thisData={thisData[pKey].approxPrice}
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
                    );
                        })}
                </ol>
            </div>
        </div>
    );
}
