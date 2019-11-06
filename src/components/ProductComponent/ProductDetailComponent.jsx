import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import StarRatings from 'react-star-ratings';
import Datetime from 'react-datetime';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import MetaTags from 'react-meta-tags';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../assets/stylesheets/productDetail.css';
import '../../assets/stylesheets/DatePickerReact.css';
import freshDeal from '../../assets/images/fresh-deals.png';
import TdComponenet from './rowComponent.jsx';

export default function ProductDetailComponent(props) {
    const renderDay = (inputProps, currentDate) => {
        inputProps.className = `${inputProps.className} customTdCls`;
        const formattedDate = currentDate.format('DD-MMM-YYYY');
        if (props.datesArr && Object.keys(props.datesArr).length && props.datesArr[formattedDate]) {
            inputProps.className = `${inputProps.className} hasDatePrice`;
            return <td {...inputProps} onClick={() => props.resetMoreDetails(formattedDate)}>
                {currentDate.date()}
                <div>{props.datesArr[formattedDate]}</div>
            </td>;
        }
        inputProps.className = `${inputProps.className} rdtDisabled`;
        return <td {...inputProps}>{currentDate.date()}</td>;
    };
    const renderInput = (inputProps, openCalendar) => {
        function clear() {
            inputProps.onChange({ target: { value: '' } });
        }
        return (
            <div>
                <div className="delivery-opinion">
                    <b className='deliveryTitles'>Delivery Date:</b><br />
                    <span style={{ float: 'left' }}>
                        {_get(props.dataToShow, 'delivery_date_form')}
                        <span className="calendar" onClick={openCalendar}>
                            <input type="date" className="hasDatepicker" placeholder="+" style={{ border: '0px' }} />
                        </span>
                    </span>
                </div>
            </div>
        );
    };
    if (props.productDetails && props.productDetails.info) {
        const { info } = props.productDetails;
        const avaId = Object.keys(info)[0];

        // console.log('ava', info[avaId].is_special);
        // console.log('ispsecial', _get(info, [avaId, 'is_special'], 0));
        
        return (
            <div className="container">
                 <MetaTags>
                <meta name="description" content={props.metaDesc} />
                {/* <meta property="og:title" content={props.metaTitle} /> */}
                </MetaTags>
                {props.submitReviewAlert &&
                    <div className="alertMsgDiv">
                        {/* <p><span className="successSpan"> {props.alertData} been accepted for moderation.</span></p> */}
                        <p><span className="successSpan"> Your review has been accepted for moderation.</span></p>

                    </div>
                }
                {props.submitTagAlert &&
                    <div className="alertMsgDiv">
                        {/* <p><span className="successSpan"> {props.alertData} been accepted for moderation.</span></p> */}
                        <p><span className="successSpan"> 1 tag(s) has been accepted for moderation.</span></p>

                    </div>
                }
                <div className="row">
                    <div className="col-sm-4 col-md-4 nameDiv col-lg-4 col-xs-12">
                        {/* {_get(info, [avaId, 'is_special'], 0) === '1' &&
                            <div>
                                < img className='fresh-deals' src={freshDeal} />
                                {info.product_images && info.product_images.map((img, ind) =>
                                    <div key={ind} onClick={() => props.toggleImgModalFn(img, info.product_images.length, ind)}>
                                        <img src={img} width="100%"></img>
                                    </div>)
                                }
                            </div>
                        }
                        {_get(info, [avaId, 'is_special'], 0) === '0' &&
                            <div>
                                {info.product_images && info.product_images.map((img, ind) =>
                                    <div key={ind} onClick={() => props.toggleImgModalFn(img, info.product_images.length, ind)}>
                                        <img src={img} width="100%"></img>
                                    </div>)
                                }
                            </div>
                        } */}
                        <div>
                            {info.image &&
                                <div onClick={() => props.toggleImgModalFn(info.image, (info.product_images ? info.product_images.length : 1), 0)}>
                                    {_get(info, [avaId, 'is_special'], 0) === '1' &&
                                        <img className='fresh-deals' src={freshDeal} />
                                    }
                                    <img src={info.image} width="100%"></img>
                                </div>
                            }
                        </div>
                        {/* <img src={info.image} width="100%"></img> */}
                        {!_isEmpty(info.product_images) &&
                            <div className="row">
                                {info.product_images.map((img, ind) =>
                                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-12" key={ind} onClick={() => props.toggleImgModalFn(img, info.product_images.length, ind + 1)}>
                                        <img src={img} width="100%"></img>
                                    </div>)
                                }
                            </div>

                        }
                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-8 col-xs-12">
                        <div className="product-view-detail">
                            <div>
                                <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding">

                                    <ul className='list-inline'>
                                        <li><h1 className="prod-product-name">{info.name}</h1></li>
                                        <li>
                                            <div className="grey_text small_font prdt-star">
                                                <StarRatings
                                                    rating={info.product_rating ? (info.product_rating) / 20 : 0}
                                                    starDimension="12px"
                                                    starSpacing="1px"
                                                    starEmptyColor="#434343"
                                                    starRatedColor="#fdb927"
                                                /> <span onClick={props.handleProdReviewClick}>{info.product_rating_count} Review(s)</span>
                                                {info.product_rating === 0 &&
                                                    <div className="product-review-table">
                                                    <span>No Reviews</span>
                                                </div>
                                                }
                                                {props.productReviewData && props.productReviewData.result && info.product_rating !== 0 &&
                                                <div className="product-review-table">
                                                <table className="table list-table">
                                                    <thead>
                                                        {/* <tr> */}
                                                            <th>Ratings</th>
                                                            <th>Reviews</th>
                                                        {/* </tr> */}
                                                    </thead>
                                                    <tbody>
                                                    {
                                                    props.productReviewData.result.map((eachReview, index) => {
                                                        if (index < 5) {
                                                        return (<tr key={index}>
                                                            <td className="pr-star">
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
                                                    <a onClick={() => props.focusReview()}>
                                                    <span className="more-reviews">See {Number(_get(props.productReviewData, 'total_reviews')) - 5} more reviews</span>
                                                </a>
                                                }
                                            </div>
                                                }
                                            </div>
                                        </li>
                                    </ul>
                                 {/* <h1 className="prod-product-name">{info.name}</h1> */}
                                </div>
                               

                                {/* </div> */}
                                {/* <div className="productmain-review"> */}
                                {/* <div className="col-lg-5 col-sm-5 col-md-5 col-xs-5 no-padding">
                                <div className="grey_text small_font">
                                    <StarRatings
                                        rating={info.product_rating}
                                        starDimension="12px"
                                        starSpacing="1px"
                                        starEmptyColor="#434343"
                                        starRatedColor="#fdb927"
                                    /> <span onClick={props.handleProdReviewClick}>{info.product_rating} Review(s)</span>
                                </div>
                                </div> */}
                                </div>
                            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 grey_text">
                                <div className="vendor-name">
                                     <p className="pdtvendor-name"> <p className="small_font">By -{info.vendor}</p></p>
                                     <p className="pdtvendor-name"> <p className="small_font">Farm Name : {info.vendor}</p></p>
                                    <div style={{ float: 'left', width: '80px', height: '15px' }} className="pr-vend-ratings" onMouseEnter={() => props.vendorRatingsHover(info.vid)}>
                                        <StarRatings
                                            rating={info.vendor_rating ? (info.vendor_rating) / 20 : 0}
                                            starDimension="12px"
                                            starSpacing="1px"
                                            starEmptyColor="#434343"
                                            starRatedColor="#fdb927"
                                        />
                                        {info.vendor_rating === 0 &&
                                        <div className="pr-vend-review-table">
                                        <span>No Reviews</span>
                                    </div>
                                    }
                                    {props.productVendorReviews && props.productVendorReviews.data && info.vendor_rating !== 0 &&
                                    <div className="pr-vend-review-table">
                                        <table className="table pr-vend-list-table">
                                            <thead>
                                                <th>Ratings</th>
                                                <th>Reviews</th>
                                            </thead>
                                            <tbody>
                                            {
                                                    props.productVendorReviews.data.map((eachReview, index) => {
                                                        if (index < 5) {
                                                            return (<tr key={index}>
                                                                <td className="pr-vend-list-td">
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
                                            <span className="more-reviews">See {Number(_get(props.productVendorReviews, 'total_product')) - 5} more reviews</span>
                                        // </a>
                                        }
                                    </div>
                                    }
                                    </div>

                                    <p className={info.vendor_rating_count > 0 ? 'review-cursor' : ''}>{info.vendor_rating_count}
                                        <span onClick={info.vendor_rating_count > 0 ? () => props.handleVendorReviewClick(info.vid, info.vendor) : ''}>
                                            {' '} Review(s)
                                        </span>
                                    </p>
                                    </div>
                                {props.primeUser === '1' ? <div style={{ marginBottom: '10px' }}>{props.rewardLine}</div> : null}
                                <b className="quickViewText">Quick Overview</b>
                                <p className="medium_font" >{props.overView}</p>
                                {
                                    props.isAuthenticated ?
                                        <div>
                                            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding">
                                                <div className="col-lg-9 col-sm-9 col-md-9 col-xs-5 no-padding">
                                                    <div>
                                                        <p className="medium_font" >
                                                            {/* <b className="black_text">{props.dataToShow.total_price_format}
                                                            </b> per {props.dataToShow.pack_unit}</p> */}
                                                           <span className="black_text">{props.dataToShow.total_price_format}</span><span>per {props.dataToShow.pack_unit} </span> 
                                                             </p>
                                                    </div>
                                                    <span>{props.totalPriceToPay}</span>
                                                    <div className="priceBrk">
                                                        <a className="small_font pointer_cls">Price breakdown</a>
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
                                                                        <td className="tb1">{props.dataToShow.delivery_method}</td>
                                                                        <td className="tb3">{props.dataToShow.delivery_date}</td>
                                                                        <td className="tb4">{props.dataToShow.farm_price}</td>
                                                                        <td className="tb5">{props.dataToShow.landing_price}</td>
                                                                        <td className="tb6">{props.dataToShow.delivery_price}</td>
                                                                        <td className="tb7">{props.dataToShow.total_price_format}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-3 col-sm-3 col-md-3 col-xs-7">
        
                                                <input className="text-center" name="quantity" value={props.quantity} placeholder="" onChange={event => props.handleInuputChange(event, props.dataToShow)}/>
                                                <span className={`error-msg-qty${props.blinkText}`} style={{ color: 'red' }}>Qty in multiple of
                                                    <span className="qtybox_name"> {props.dataToShow.qty_per_box}</span>
                                                </span>

                                            </div>
                                                {/* <div className="col-md-6">
                                                    <input name="quantity" placeholder="" onChange={event => props.handleInuputChange(event, props.dataToShow)} style={{ width: '35%', height: '30px' }} />
                                                    <span className="error-msg-qty" style={{ color: 'red' }}>Qty in multiple of
                                                    <span className="qtybox_name"> {props.dataToShow.qty_per_box}</span>
                                                    </span>
                                                </div> */}
                                                {/* </div> */}
                                            </div>
                                            
                                            {props.showMaxQtyAlert && <span className="max_qty1">
                                                The maximum quantity allowed is {_get(props.dataToShow, 'floorallowed')}
                                            </span>}
                                            <div className="delivery-block">
                                                <div className="col-sm-4 col-lg-4 col-md-4 col-xs-4 no-padding">
                                                    <Datetime
                                                        renderDay={renderDay}
                                                        renderInput={renderInput}
                                                        closeOnSelect={true}
                                                    />
                                                </div>
                                                <div className="col-sm-4 col-lg-4 col-md-4 col-xs-4 pdt-delivery">
                                                    <b className='deliveryTitles'>Delivery via</b><br />
                                                    <span className="delmet-color">{_get(props.dataToShow, 'deliv_front_name')}</span>
                                                </div>
                                                <div className="col-sm-4 col-lg-4 col-md-4 col-xs-4 pdt-delivery">

                                                    <ul class='list-unstyled'>
                                                        <li> <b className='deliveryTitles'>Delivery To</b></li>
                                                        <li> <span className="delmet-color">{props.storeName || 'abcd'},&nbsp;</span></li>
                                                        <li><span className="storeLogin cursor-click anchor-color" onClick={props.handleShowChangeStore}>{' '}Change store</span></li>
                                                    </ul>
                                                    {/* <b className='deliveryTitles'>Delivery To</b><br />
                                                    <span className="delmet-color">{props.storeName || 'abcd'},&nbsp;</span>
                                                    <span className="storeLogin cursor-click anchor-color" onClick={props.handleShowChangeStore}>{' '}Change store</span> */}
                                                </div>
                                                <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                                    <div className="dropdown-detail left col-md-6 col-lg-4" >
                                                        <span style={{ float: 'left', color: 'orange', cursor: 'pointer' }} onClick={props.toggleMoreDetail}>More Detail <i className="fa fa-sort-down" /></span>
                                                    </div>
                                                    {!_isEmpty(props.productDetails.more_avail) &&
                                                        <div className="moreav dropdown-detail right col-lg-6 col-md-6" >
                                                            <span style={{ float: 'left', color: 'orange', cursor: 'pointer' }} onClick={props.toggleMoreAvail}>More Available <i className="fa fa-sort-down" /></span>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {props.showMoreDetails &&
                                                <div className="pro-features col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                                    <p><b>Farm Name:</b> <span className="farm_name">{_get(props.dataToShow, 'loc')}</span>|</p>
                                                    <p><b>Box Type :</b> <span>{_get(props.dataToShow, 'box_type')}<input type="hidden" name="box_type" value="ea" /></span>|</p>
                                                    <p><b>Pack Unit:</b> <span>{_get(props.dataToShow, 'pack_unit')}</span>
                                                        <input type="hidden" name="pack_unit" value="ea" />|</p>
                                                    <p><b>Qty Per Box: </b>
                                                        <input type="hidden" className="qty_per_box_val" name="qty_per_box" value="100" />
                                                        <span className="qtybox_name">{_get(props.dataToShow, 'qty_per_box')}</span></p>
                                                    <p><b>Grade :</b><span>{_get(props.dataToShow, 'grade')}</span>|</p>
                                                    <p><b>petal_count :</b><span>{_get(props.dataToShow, 'petal_count')}</span>|</p>
                                                    <p><b>head_size :</b><span>{_get(props.dataToShow, 'head_size')}</span>|</p>
                                                    <p><b>new key :</b><span>{_get(props.dataToShow, 'newKey')}</span>|</p>
                                                </div>
                                            }
                                            {props.dispalyMoreAvails &&
                                                <div className="left-side">
                                                    <table>
                                                        <tbody>
                                                            <tr className="list-inline moreavailable">
                                                                <th>Select Appr</th>
                                                                {
                                                                    props.productDetails && props.productDetails.more_avail && Object.keys(props.productDetails.more_avail).map((thisData, index) => {
                                                                        return (
                                                                            <td style={{ display: 'table-cell' }} key={index}>
                                                                                <input type="radio" name="swatch" onClick={() => props.ProductSwatch(thisData)} />
                                                                            </td>
                                                                        );
                                                                    })
                                                                }
                                                            </tr>
                                                            <tr className="list-inline moreavailable">
                                                                <th>Qty Per</th>
                                                                {
                                                                    props.productDetails && props.productDetails.more_avail && Object.keys(props.productDetails.more_avail).map((thisData, index) => {
                                                                        return (
                                                                            <TdComponenet index={index} key={index}
                                                                                thisData={info[thisData].qty_per_box}
                                                                                availId={thisData}
                                                                                ProductSwatch={props.ProductSwatch}
                                                                            />
                                                                        );
                                                                    })
                                                                }
                                                            </tr>
                                                            <tr className="list-inline moreavailable">
                                                                <th>Apprx Price</th>
                                                                {
                                                                    props.productDetails && props.productDetails.more_avail && Object.keys(props.productDetails.more_avail).map((thisData, index) => {
                                                                        return (
                                                                            <TdComponenet index={index} key={index}
                                                                                thisData={info[thisData].approxPrice}
                                                                                availId={thisData}
                                                                                ProductSwatch={props.ProductSwatch}
                                                                            />
                                                                        );
                                                                    })
                                                                }
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            }
                                            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding addListBtns" >
                                            {/* <div className="row addListBtns" style={{ float: 'left' }}> */}
                                                <button type="button" title="Add to Cart" className={`${props.disableCartBtn} btn btn-default btn-sm cartBtn`} onClick={props.disableCartBtn ? false : props.addToCart}>
                                                    <span className="glyphicon glyphicon-shopping-cart"></span>Add to Cart
                                                </button>
                                                <button type="button" className="btn btn-default btn-sm favrtBtn" title="Favorite" onClick={() => props.handleAddToFavorites()}>
                                                    <span className="glyphicon glyphicon-star"></span>Add to Favorite
                                                </button>
                                                <button type="button" className="btn btn-default btn-sm wishlistBtn" title="Add to Wishlist" onClick={() => props.handleAddToWishlist()}>
                                                    <span className="glyphicon  glyphicon-heart-empty"></span>Add to Wishlist
                                                </button>
                                            </div>
                                            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                            <div className="em-addthis">
                                                <a href="https://www.facebook.com/BloomKonnect/" title="Ruscus" target="_blank" className="fb">
                                                    <span className="icon-facebook fa fa-facebook"></span>
                                                </a>
                                                <a href="https://twitter.com/BloomKonnect" title="Ruscus" target="_blank" className="tw"> <span className="icon-twitter fa fa-twitter"></span> </a>
                                                <a href="https://www.instagram.com/bloomkonnect/" title="Ruscus" target="_blank" className="pin"> <span className="icon-pinterest fa fa-instagram"></span> </a>
                                                <a href="https://plus.google.com/+Bloomkonnect" title="Ruscus" target="_blank" className="gp"> <span className="icon-google fa fa-google-plus"></span> </a>
                                            </div>
                                            </div>
                                            
                                        </div> : <div>Please login to see your delivered price per stem: <a className="loginLink" onClick={() => props.showLoginPopup()}>Click Here</a></div>}
                            </div>
                        </div >
                    </div >
                </div >
                <div className="row tabsDiv">
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Details">
                            <div className="text-center">
                                <h3>Details</h3>
                                <div>
                                    {info.name}
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Product Tags">
                            <div className="text-center">
                                <h3>Product Tags</h3>
                                <div>
                                    <p className="note">Use spaces to separate tags. Use single quotes (') for phrases.</p>
                                    <div className="form-add">
                                        <label>Add Your Tags:</label>
                                        <div className="input-box">
                                            <input type="text" className="input-text required-entry" name="productTagName" id="productTagName" onChange={event => props.handleTagInputChange(event)} />
                                        </div>
                                        <button type="button" title="Add Tags" className="btn btn-warning" onClick={() => props.addTags()}>
                                            Add Tags
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={3} title="Frequently Asked Questions">
                            Frequently Asked Questions
                        </Tab>
                        <Tab eventKey={4} title="Shipping Details">
                            Shipping Details
                        </Tab>
                        <Tab eventKey={5} title="Vendor Details">
                            Vendor Details
                        </Tab>
                    </Tabs>
                </div>
                {/* <div className="row relatedProducts"> */}
                <div className="row">
                    <div className=".hp-widget-row-name">
                        <div className="hp-widget-line">
                            <div className="hp-widget-title">
                                <h3>
                                    <span>RELATED PRODUCTS</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="relatedProd hp-carousel">
                        <AliceCarousel
                            items={props.children}
                            responsive={props.responsive}
                            dotsDisabled
                            infinite={false}
                        />
                    </div>
                </div>
                {props.upsellChildrens && !_isEmpty(props.upsellChildrens) &&
                    <div className="row">
                        <div className=".hp-widget-row-name">
                            <div className="hp-widget-line">
                                <div className="hp-widget-title">
                                    <h3>
                                        <span>You may also be interested in the following product(s)</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="relatedProd hp-carousel">
                            <AliceCarousel
                                items={props.upsellChildrens}
                                responsive={props.responsive}
                                dotsDisabled
                                infinite={false}
                            />
                        </div>
                    </div>
                }
                {/* {props.productReviewData && props.productReviewData.result && props.productReviewData.result.length > 0 &&
                    <div className="row cust-reviews-div">
                        <div className='col-xs-12' id="review-list">
                            <h2>CUSTOMER REVIEWS</h2>
                            <table className='cust-reviews'>
                                <tbody>
                                    {props.productReviewData && props.productReviewData.result &&
                                        props.productReviewData.result.map((eachReview, index) => {
                                            return (<tr key={index}>
                                                <td>
                                                    {eachReview.nickname}
                                                </td>
                                                <td>
                                                    {eachReview.rating_code}
                                                    <StarRatings
                                                        rating={Number(eachReview.rating_value) ? Number(eachReview.rating_value) : 0}
                                                        starRatedColor="#fdb927"
                                                        starDimension="15px"
                                                        starSpacing="1px"
                                                        numberOfStars={5}
                                                        name='rating'
                                                        className="field-input"
                                                    />
                                                </td>
                                                <td>
                                                    {eachReview.detail}
                                                </td>
                                            </tr>);
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>} */}
                    {/* <ReviewComponent
                        errors={props.errors}
                        handleChange={props.handleChange}
                        rating={props.rating}
                        changeRating={props.changeRating}
                        submitReviews={props.submitReviews}
                        ref={props.ref}
                    /> */}
                {/* <div className="row">
                    <div className="reviewsDiv ">
                        <div className="write-review">
                            <h3>Write Your Own Review</h3></div>
                        <p>You're Reviewing: {info.name}</p>
                        <div className="input-field">
                            <label className="required"><em>*</em>Nickname</label>
                            <input type="text" className="field-input" name="name" onChange={props.handleChange} />
                            <br /><span style={{ color: 'red' }}>{props.errors.name}</span>
                        </div>
                        <div className="input-field">
                            <label className="required"><em>*</em>Summary Of Your Review</label>
                            <input type="text" className="field-input" onChange={props.handleChange} name="reviewTitle" />
                            <br /><span style={{ color: 'red' }}>{props.errors.reviewTitle}</span>
                        </div>
                        <div className="input-field">
                            <label className="required"><em>*</em>Review</label>
                            <textarea type="text" className="field-input" onChange={props.handleChange} name="reviewDetails" />
                            <br /><span style={{ color: 'red' }}>{props.errors.reviewDetails}</span>
                        </div>
                        <div className="input-field">
                            <label className="required"><em>*</em>How do you rate this product?</label>
                            <StarRatings
                                rating={props.rating}
                                starRatedColor="blue"
                                changeRating={props.changeRating}
                                numberOfStars={5}
                                name='rating'
                                className="field-input"
                            />
                            <br /><span style={{ color: 'red' }}>{props.errors.rating}</span>
                        </div>

                        <div className="input-box">
                            <button type="button" title="Submit Review" className="button btn-cart" onClick={() => props.submitReviews()}>
                                <span>Submit Review</span>
                            </button>
                        </div>
                    </div>
                </div> */}
                {
                    props.showImageModal &&
                    <Modal
                        bsSize="small"
                        aria-labelledby="contained-modal-title-sm" show={props.showImageModal} onHide={() => props.toggleImgModalFn()} className="imgDetailModal">
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div>
                                    <img src={_get(props.productImageUrl, 'url')} width="100%" />
                                </div>
                                <p>Image {_get(props.productImageUrl, 'ind') + 1} of {_get(props.productImageUrl, 'length') + 1}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => props.toggleImgModalFn()}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                }
            </div >
        );
    }
    return (<div> '' </div>);
}
