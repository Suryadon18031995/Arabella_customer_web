import React from 'react';
import StarRatings from 'react-star-ratings';
import _get from 'lodash/get';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import _isEmpty from 'lodash/isEmpty';
import Datetime from 'react-datetime';
import '../../assets/stylesheets/DatePickerReact.css';
import TdComponenet from '../../components/ProductComponent/rowComponent.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function TagDetailsProductsComponenet(props) {
    const renderDay = (inputProps, currentDate, selectedDate) => {
        inputProps.className = `${inputProps.className} customTdCls`;
        const formattedDate = currentDate.format('DD-MM-YYYY');
        const dateToBPassed = currentDate.format('DD-MMM-YYYY');
        if (props.dateObjectArray && Object.keys(props.dateObjectArray[props.index]).length && props.dateObjectArray[props.index][formattedDate]) {
            inputProps.className = `${inputProps.className} hasDatePrice`;
            return <td {...inputProps} onClick={() => props.resetMoreDetails(dateToBPassed, props.index)}>
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
        // console.log("deliveryy data", props.deliveryData);

        return (
            <div>
                <div className="delivery-opinion myfav-details col-md-3 col-lg-3 col-sm-3 ">
                    <b>Delivery Date</b><br />
                    <span style={{ float: 'left' }}>
                        {_get(props.deliveryData, 'delivery_date_form')}
                        <span className="calendar" onClick={openCalendar}>
                            <input type="date" className="datepicker59662 hasDatepicker" placeholder="+" id="dp1542198135597" style={{ border: '0px' }} />
                        </span>
                    </span>
                </div>
            </div>
        );
    };
    if (props.productDetails) {
        const { info } = props.productDetails;
        return (
            <div>
                <li key={props.index} className="myfavitem" >
                    {/* {props.viewType === 'list' && <span className='product-img-listing cursor-click' onClick={() => props.showProductDetailPage(props.thisData.pid, props.thisData.url_key)}>
                        <img className="product-image-listing" alt={props.thisData.name} src={props.thisData.image} />
                    </span>} */}
                    {props.viewType === 'list' && <span className='prod-img-spacing cursor-click'>
                        <a href={`/${props.thisData.url_key}.html`}>
                            <img className="prod-image-size" alt={props.thisData.name} src={props.thisData.image} />
                        </a>
                    </span>}
                    <div className="product-shop">
                        <div className="myfav-product-details">
                            <div className="col-lg-5 col-xs-12 col-sm-9 myfav-details">
                                <div className="name-rating">
                                    {/* <h2 className="product-name cursor-click" onClick={() => props.showProductDetailPage(props.thisData.pid, props.thisData.url_key)}>
                                        <span title={props.thisData.name}>
                                            {props.thisData.name}
                                        </span>
                                    </h2> */}
                                    <h2 className="prod-name-shop cursor-click">
                                        <a href={`/${props.thisData.url_key}.html`} title={props.thisData.name}>
                                            {props.thisData.name}
                                        </a>
                                    </h2>
                                </div>
                                <div className="pdt-rating col-lg-12 col-sm-12">
                                    <div style={{ float: 'left', width: '80px', height: '15px' }}>
                                        <StarRatings
                                            rating={props.thisData.product_rating}
                                            starDimension="12px"
                                            starSpacing="1px"
                                            starEmptyColor="#434343"
                                            starRatedColor="#fdb927"
                                        />
                                    </div>
                                    <p className="ng-binding">{props.thisData.product_rating_count} Review(s)</p>
                                </div>
                                {props.apiToken && <h6 className="farmdetail">
                                    <span>Farm Name: <span className="farm_name">{props.thisData.loc}</span> </span>
                                </h6>}
                                <div className="vendor-name-rating">
                                    <h6 className="vendor-name"> <span> By:{props.thisData.vendor}  </span></h6>
                                    <div style={{ float: 'left', width: '80px', height: '15px' }}>
                                        <StarRatings
                                            rating={props.thisData.vendor_rating}
                                            starDimension="12px"
                                            starSpacing="1px"
                                            starEmptyColor="#434343"
                                            starRatedColor="#fdb927"
                                        />
                                    </div>
                                    <p className="ng-binding">{props.thisData.vendor_rating_count} Review(s)</p>
                                </div>
                            </div>
                            {!_isEmpty(props.deliveryData) &&
                                <div className="col-lg-5 col-xs-12 col-sm-9 myfav-details">

                                    {props.apiToken && <div className="qty_cartFav">
                                        <span className="message-qty" style={{ color: 'red' }}>
                                            Qty in multiple of {_get(props.deliveryData, 'qty_per_box')}
                                        </span>
                                        <input type="text" name='orderQuantity'
                                            maxLength="12" title="Input here No. of Qty" className="input-quantity"
                                            onChange={event => props.handleInuputChange(event, props.thisData, props.deliveryData)} />
                                        {/* <span className="max_qty"></span> */}
                                    </div>}
                                    <span>
                                        <button type="button" onClick={() => props.handleAddCartClick(props.thisData, props.deliveryData)} title="Add to Cart" className={`${props.disableCartBtn} button btn-cart myfav-cartbtn`} >
                                            Add to Cart
                                </button>
                                    </span>
                                </div>
                            }
                            {!_isEmpty(props.deliveryData) &&
                                <div className="col-lg-6 col-xs-9 col-sm-12 myfav-details">
                                    {/* {!_isEmpty(props.deliveryData) && */}
                                    <div className="total-price-myfav">
                                        <div className="total-price-block">
                                            <div className="price-box">
                                                <span className="regular-price">
                                                    <span className="myfav-price" content="0.98">
                                                        {_get(props.deliveryData, 'total_price_format')}
                                                    </span>
                                                </span>

                                            </div>
                                            per {' '}
                                            <span>
                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).pack_unit}
                                            </span>
                                        </div>
                                        {(props.totalAmount > 0 && props.thisData.pid === props.productId) && <section className="Total-price-per">
                                            <span className="total_span">Total amount payable {props.totalAmount && props.totalAmount.toFixed(2)}</span>
                                        </section>}
                                    </div>
                                    {props.apiToken && <section className="drop-down-price">
                                        <a style={{ cursor: 'pointer' }}><h6 className="price_break-myfav">Price breakdown</h6></a>
                                        <div className="table-responsive">
                                            <table className="table table-hover" style={{ marginBottom: '0px' }}>
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
                                                        <td className="tb1">{_get(props.deliveryData, 'delivery_method')}</td>
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
                            }

                            {!_isEmpty(props.deliveryData) &&
                                <div className="right-side">
                                    {(props.showMaxQtyAlert && props.thisData.pid === props.productId) && <span className="max_qty1">
                                        The maximum quantity allowed is {_get(props.deliveryData, 'floorallowed')}
                                    </span>}
                                    <div className="delivery-block-myfav">
                                        {props.apiToken && <Datetime
                                            renderDay={renderDay}
                                            renderInput={renderInput}
                                            closeOnSelect={true}
                                        />}
                                        {props.apiToken && <div className="col-md-3 col-lg-3 col-xs-12 col-sm-4 pdt-delivery myfav-details">
                                            <p>
                                                <b>Delivery via</b><br />
                                                <span className="delmet">{_get(props.deliveryData, 'deliv_front_name')}</span>
                                            </p>
                                        </div>}

                                        {props.apiToken && <div className="col-md-3 col-lg-3 col-xs-12 col-sm-5 pdt-delivery-to myfav-details">
                                            <b className='del-to-color'>Delivery To</b><br />
                                            <span className="delmet-color">
                                                {props.storeName}
                                            </span>
                                            <span className="storeLogin cursor-click anchor-color" onClick={props.handleShowChangeStore}>Change store</span>
                                        </div>
                                        }


                                        <div className="col-lg-12 col-xs-12 ">
                                            <div className="dropdown-detail col-md-6 col-lg-6" >
                                                <span onClick={() => props.handleMoreDetailClick(props.thisData && props.thisData.pid)}
                                                    style={{ color: 'orange', cursor: 'pointer' }}>
                                                    More Detail <i className="fa fa-sort-down" />
                                                </span>
                                            </div>
                                            {_get(props.showMoreDetail, _get(props.thisData, 'pid'), false) &&
                                                <div>
                                                    <div className="pro-features a-center">
                                                        {_get(props.thisData, _get(props.deliveryData, 'avail_id')).box_type &&
                                                            <p>
                                                                <b>Box Type :</b>
                                                                <span className="p_boxtype">
                                                                    {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).box_type}
                                                                </span>
                                                                |</p>}
                                                        {_get(props.thisData, _get(props.deliveryData, 'avail_id')).pack_unit &&
                                                            <p>
                                                                <b>Pack Unit:</b>
                                                                <span className="p_packunit">
                                                                    {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).pack_unit}
                                                                </span>
                                                                |</p>}
                                                        {_get(props.thisData, _get(props.deliveryData, 'avail_id')).qty_per_box &&
                                                            <p><b>Qty Per Box: </b>
                                                                <span className="qtybox_name">
                                                                    {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).qty_per_box}
                                                                </span>|</p>
                                                        }
                                                        {_get(props.thisData, _get(props.deliveryData, 'avail_id')).color &&
                                                            <p><b>Color :</b><span className="p_color">
                                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).color}
                                                            </span>|</p>
                                                        }
                                                        {_get(props.thisData, _get(props.deliveryData, 'avail_id')).varity &&
                                                            <p><b>Variety :</b><span className="p_variety">
                                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).varity}
                                                            </span>|</p>
                                                        }
                                                        {_get(props.thisData, _get(props.deliveryData, 'avail_id')).grade &&
                                                            <p><b>Grade :</b><span className="p_grade">
                                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).grade}
                                                            </span>|</p>
                                                        }
                                                        {_get(props.thisData, _get(props.deliveryData, 'avail_id')).petal_count &&
                                                            <p><b>Petal Count :</b><span className="p_variety">
                                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).petal_count}
                                                            </span>|</p>
                                                        }
                                                        {_get(props.thisData, _get(props.deliveryData, 'avail_id')).head_size &&
                                                            < p > <b>Head Size :</b> <span className="p_grade">
                                                                {_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).head_size}
                                                            </span></p>
                                                        }
                                                    </div>
                                                    <div className="left-side a-center moreinfo">
                                                        <ul className="add-to-links">
                                                            <li>
                                                                <a className="link-wishlist" title="Add to Wishlist" onClick={() => props.handleAddToWishlist(props.thisData.pid)}><span>Add to Wishlist</span></a>
                                                            </li>
                                                            <li>
                                                                <a className="link-preferences btn-pref logintrigger" title="Add to Favourite" onClick={() => props.handleAddToFavorites(props.thisData.pid)}><span>Add to Favourite</span></a>
                                                                {/* <a onClick={props.myfavalert} className="link-preferences btn-pref logintrigger" title="Add to Favourite"><span>Add to Favorite</span></a> */}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>}
                                            <div className="col-lg-6">
                                                {!_isEmpty(props.moreavaildata) &&

                                                    <div >
                                                        {/* <span style={{ float: 'left', color: 'orange', cursor: 'pointer' }} onClick={props.toggleMoreAvail}> */}
                                                        <span onClick={() => props.handleMoreavailclick(props.thisData && props.thisData.pid)}
                                                            style={{ color: 'orange', cursor: 'pointer', marginTop: '-2%' }}>
                                                            More Available <i className="fa fa-sort-down" /></span>
                                                    </div>
                                                }
                                                {/* {props.showMore && */}
                                                {_get(props.showMore, _get(props.thisData, 'pid'), false) &&

                                                    <div className="left-side">
                                                        <table>
                                                            <tbody>
                                                                <tr className="list-inline moreavailable">
                                                                    <th>Select Appr</th>
                                                                    {
                                                                        Object.entries(props.moreavaildata).map((thisData, index) => (

                                                                            <td style={{ display: 'table-cell' }} key={index}>
                                                                                <input type="radio" name="swatch" onClick={() => props.ProductSwatch(thisData[0], props.index)} checked={_get(props.deliveryData, 'avail_id') === thisData[0]} />
                                                                            </td>
                                                                        ))
                                                                    }
                                                                </tr>
                                                                <tr className="list-inline moreavailable">
                                                                    <th>Qty Per</th>
                                                                    {
                                                                        Object.entries(props.moreavaildata).map((thisData, index) => (
                                                                            < TdComponenet index={index} key={index}
                                                                                thisData={[thisData[1][0].qty_per_box]}
                                                                                availId={thisData}
                                                                                ProductSwatch={props.ProductSwatch}
                                                                            />
                                                                        ))
                                                                    }
                                                                </tr>
                                                                <tr className="list-inline moreavailable">
                                                                    <th>Apprx Price</th>
                                                                    {
                                                                        // props.productDetails && props.productDetails.more_avail &&
                                                                        Object.keys(props.moreavaildata).map((thisData, index) => {
                                                                            const minPrice = _get(_minBy(props.moreavaildata[thisData], 'total_price_currency'), 'total_price_format');
                                                                            const maxPrice = _get(_maxBy(props.moreavaildata[thisData], 'total_price_currency'), 'total_price_format');
                                                                            let approxPrice;
                                                                            if (minPrice === maxPrice) {
                                                                                approxPrice = minPrice;
                                                                            } else {
                                                                                approxPrice = `${minPrice} - ${maxPrice}`;
                                                                            }
                                                                            return <TdComponenet index={index} key={index}
                                                                                thisData={approxPrice}
                                                                                availId={thisData}
                                                                                ProductSwatch={props.ProductSwatch}
                                                                            />;
                                                                        })
                                                                    }
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </li>

                <li>
                </li>
                <br />
            </div >

        );
    }
}

