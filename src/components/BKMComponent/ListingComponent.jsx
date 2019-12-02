// eslint-disable-next-line no-unused-vars
import React from 'react';
import _get from 'lodash/get';
import { Tabs, Tab } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import MetaTags from 'react-meta-tags';
import { LoaderListingPage } from '../../components/Loader/Loader.jsx';
import ProductComponent from './Product.jsx';
import ProductGridComponent from './ProductGridComponent.jsx';
// import '../../assets/stylesheets/ProductListing.css';
import iDescArrow from '../../assets/images/i_desc_arrow.png';
import iAscArrow from  '../../assets/images/i_asc_arrow.png';

export default function ListingComponent(props) {
    // if (_get(props, 'isLoading') && props.pageNo === 1) {
    //     return (
    //         <div className="text-center">
    //             <LoaderListingPage />
    //         </div>
    //     );
    // }
    if (props.totalProductCount === 0 && !_get(props, 'isLoading')) {
        return (
            <div className="no-products-to-display">
                There are no products matching the selection.
            </div>
        );
    }
    return (
        <div className="listingComponent row" >
             <MetaTags>
            {/* <title>Page 1</title> */}
            <meta name="description" content={props.metaDesc} />
            {/* <meta property="og:title" content="MyApp" /> */}
          </MetaTags>
            {/* <div className='shop-flowers-title'>
                <h1>Shop Flowers</h1>
            </div> */}
            {/* {props.farmInfo ? <div className="farm-info">
                <img src="https://d2ob14u1yb5v44.cloudfront.net/media/vendor/250/Vendor-Banner2.jpg" alt='Vendor Banner'/>
                <h1>
                    {_get(props.farmInfo, 'farm_name')}
                    {props.farmInfo.feedback && Array.isArray(props.farmInfo.feedback) && props.farmInfo.feedback.length ?
                        <span>
                            <StarRatings
                                rating={props.farmInfo.average_rating}
                                starDimension="12px"
                                starSpacing="1px"
                                starEmptyColor="#434343"
                                starRatedColor="#fdb927"
                            />
                             <small> {props.farmInfo.feedback.length} Review(s) </small>
                    </span>
                        : null
                    }
                </h1>
                <Tabs
                    id="controlled-tab-example"
                    className='controlled-tab-example'
                    activeKey={props.tabKey}
                    onSelect={key => props.setTabKey(key)}
                >
                    <Tab eventKey="info" title="Farm Information">
                       
                        <p className='h4 font-weight-normal' >Farm Information</p>
                        {
                            _get(props.farmInfo, 'farm_information') && Array.isArray(_get(props.farmInfo, 'farm_information')) && _get(props.farmInfo, 'farm_information').length && _get(props.farmInfo, 'farm_information').map((eachfarm, indexFarm) => {
                                return (
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12' key={indexFarm}>
                                        <div><strong className='text-capitalize'>{eachfarm.name}</strong></div>
                                        <div>{eachfarm.address}</div>
                                        <div>{eachfarm.city}</div>
                                        <div>{eachfarm.country}</div>
                                    </div>
                                );
                            })
                        }
                       
                    </Tab>
                    <Tab eventKey="feedback" title="FeedBack">
                    <div className='farm-vendor-reviews'>
                        <p className='h4 font-weight-normal' >FeedBack</p>
                        {props.farmInfo.feedback && Array.isArray(props.farmInfo.feedback) && props.farmInfo.feedback.length ?
                            props.farmInfo.feedback.map((eachReview, indexReview) => {
                                return (
                                    <div key={indexReview}>
                                        <div><strong className='text-capitalize'>{eachReview.title} by {eachReview.reviewed_by}</strong></div>
                                        <div>Vendor Quality{'  '}
                                        <StarRatings
                                                rating={eachReview.vendor_quality}
                                                starDimension="12px"
                                                starSpacing="1px"
                                                starEmptyColor="#434343"
                                                starRatedColor="#fdb927"
                                            />
                                        </div>
                                        <div className='review-details'>{eachReview.detail}(Posted on {eachReview.posted_on})</div>
                                    </div>
                                );
                            })
                            : <h2>No Reviews</h2>}
                       </div>      
                    </Tab>
                </Tabs>
            </div> : null} */}
            {/* <div className="sorter">
              
                <p className="view-mode">
                    <a onClick={() => props.handleViewClick('list')} title="List" className={props.viewType === 'list' ? 'list color-yellow-class' : 'list default-color'} >List</a>
                    <a onClick={() => props.handleViewClick('grid')} title="Grid" className={props.viewType === 'grid' ? 'grid color-yellow-class' : 'grid default-color'}>Grid</a>
                    <span onClick={() => props.handleViewClick('compressed')} className="newmode" title="Compressed View">
                        <a className={props.viewType === 'compressed' ? 'color-yellow-class' : 'default-color'}>
                            <i className="fa fa-bars" aria-hidden="true" />
                          
                        </a>
                    </span>
                </p>
                <div className="sortdir">
                   
                    <div className="sort-dir-span" onClick={props.sortingOrderClick}>
                        {props.showAscendSort && <span title="Set Descending Direction" className="sortdesc">
                            <img src={ iAscArrow } alt="Set Descending Direction" className="v-middle" />
                        </span>}
                        {!props.showAscendSort && <span title="Set Ascending Direction" className="sortasc">
                            <img src={ iDescArrow } alt="Set Ascending Direction" className="v-middle" />
                        </span>}
                    </div>
                </div>
                <div className="sort-by toolbar-switch">
                    <div className="toolbar-title">
                        <label>Sort By</label>
                        <select className="sortby .toolbar-switch" name="sortby" value={props.sortValue} onChange={props.handleSortChange}>
                            <option id="name" value="name"> Name</option>
                            <option id="relevance" value="index"> Relevance</option>
                            <option id="date" value="date"> Date</option>
                            <option id="price" value="psort"> Price</option>
                        </select>
                    </div>
                </div>
            </div> */}

            {/* {(props.viewType === 'list' || props.viewType === 'compressed') &&
                <div className="category-products" id="myDiv">
                    <ol className="products-list" id="products-list">
                        {
                            props.productDetails && props.productDetails.map((thisData, index) => {
                                return (
                                    <ProductComponent index={index} key={index}
                                        thisData={thisData}
                                        unitQty={props.unitQty}
                                        lastPurchaseDate={props.lastPurchaseDate}
                                        pastPurchaseData={props.pastPurchaseData}
                                        viewType={props.viewType}
                                        dateObjectArray={props.dateObjectArray}
                                        totalAmount={props.totalAmount}
                                        inputValid={props.inputValid}
                                        showMaxQtyAlert={props.showMaxQtyAlert}
                                        productId={props.productId}
                                        apiToken={props.apiToken}
                                        storeName={props.selectedStoreName ? props.selectedStoreName : props.storeName}
                                        showMoreDetail={props.showMoreDetail}
                                        moreAvail={props.moreAvail}
                                        showMoreAvail={props.showMoreAvail}
                                        blinkText={props.blinkText}
                                        freshDeal={props.freshDeal}
                                        deliveryData={props.displayData[index]}
                                        handleInuputChange={props.handleInuputChange}
                                        handleAddCartClick={props.handleAddCartClick}
                                        handleShowChangeStore={props.handleShowChangeStore}
                                        handleMoreDetailClick={props.handleMoreDetailClick}
                                        handleMoreAvailClick={props.handleMoreAvailClick}
                                        ProductSwitch={props.ProductSwitch}
                                        resetMoreDetails={props.resetMoreDetails}
                                        handleAddToWishlist={props.handleAddToWishlist}
                                        handleAddToFavorites={props.handleAddToFavorites}
                                        fromNextDayDelivery={props.fromNextDayDelivery}
                                        productReviewData={props.productReviewData}
                                        ratingsHover={props.ratingsHover}
                                        productVendorReviews={props.productVendorReviews}
                                        vendorRatingsHover={props.vendorRatingsHover}
                                    />
                                );
                            })}
                    </ol>
                </div>
            } */}

            {
                props.viewType === 'grid' &&
                props.productDetails && props.productDetails.map((thisData, index) =>
                    <ProductGridComponent index={index} key={index}
                        thisData={thisData}
                        unitQty={props.unitQty}
                        dateObjectArray={props.dateObjectArray}
                        totalAmount={props.totalAmount}
                        showMaxQtyAlert={props.showMaxQtyAlert}
                        productId={props.productId}
                        apiToken={props.apiToken}
                        blinkText={props.blinkText}
                        inputValid={props.inputValid}
                        deliveryData={props.displayData[index]}
                        handleInuputChange={props.handleInuputChange}
                        handleAddCartClick={props.handleAddCartClick}
                        resetMoreDetails={props.resetMoreDetails}
                    />)
            }
            {/* <div id="nomore" style={{ display: 'none' }}><p className="note-msg">("There are no products matching the selection.")</p></div> */}
            {/* <div className={props.applyFilter ? 'sticky-note blink' : 'sticky-note'} id="sticky-note">
                <span className="custom-filter-apply" onClick={props.handleCustomFilter}>Apply Filter</span>
            </div> */}
        </div>
    );
}
