import React from 'react';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
// import _orderBy from 'lodash/orderBy';
// import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import imglogo from '../../assets/images/bloom_logo_small.png';
import Link from 'react-router-dom/Link';
import convenience from '../../assets/images/Convenience.png';
import subscriptionPrice from '../../assets/images/SubscriptionPrice.png';
import qualityFreshness from '../../assets/images/QualityFreshness.png';
import speedyDelivery from '../../assets/images/speedy-delivery.png';
// import faqImg from '../../assets/images/faq-img.png';
import ProdcutList from './SubscriptionProdList.jsx';
import PrebookProdcutList from './PrebookProdList.jsx';
import lazyLoader from '../../assets/images/lazy-loader.gif';
import { sortWeekDaysObject } from '../../utils/dateUtil';

const settings = {
  // dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        // infinite: true,
        // dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

// const sortByDate = array => {
//   console.log(moment('17-Sep-2019'));
//   const tempArray = array;
//   tempArray.sort(function(a,b){
//     // Turn your strings into dates, and then subtract them
//     // to get a value that is either negative, positive, or zero.
//     return moment(b.pickup_date) - moment(a.pickup_date);
//   });
//   return tempArray;
// };

function AnnualSubIndex(props) {
  if (props.scrollToList && props.pageNo === 1 && props.type !== 'REQUEST_ADD_TO_CART' && props.seasonalActionType === 'REQUEST_SEASONALCATEGORIES_LIST') {
    const elmnt = document.getElementById('products-list-div');
    window.scrollTo({
      top: elmnt.offsetTop - 80, // could be negative value
      behavior: 'smooth',
    });
  }
  if (props.showCat && props.fromHomeBanner) {
    const elmnts = document.getElementById('select-fav-offer');
    window.scrollTo({
      top: elmnts.offsetTop - 80, // could be negative value
      behavior: 'smooth',
    });
  }
  return (
    <div className='container container-main' id='select-fav-offer'>
      {/* <BreadCrumbs
        list={this.state.breadCrumbsList} /> */}
        {(props.showCat === true) ?
          <div id="chs_prod" className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
            <div className='annual-heading'>
              <h3>SELECT YOUR FAVORITE OFFERING</h3>
            </div>
            
            {(props.showCat === true) && !props.children &&
              <span className="infinite-loader-class">
                <img
                  src={ lazyLoader }
                  alt="lazy-loader"
                />
              </span>}
            {props.children && props.pageType === 'pre-book' &&
              <Slider {...settings}>
                  {props.children}
              </Slider>
            }
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            {/* <div className='readMore'> */}
            {props.children && props.pageType === 'annual' &&
              // props.children.map((each, index) =>
              //   <div className='col-lg-3 col-md-3 col-sm-4 col-xs-6' key={index}>
              //   {each}
              //   </div>)
              <React.Fragment>
              <Slider {...settings}>
                  {props.children.slice(0, Math.round(props.children.length / 2))}
              </Slider>
              <Slider {...settings}>
                  {props.children.slice(Math.round(props.children.length / 2))}
              </Slider>
              </React.Fragment>
            }
            {/* </div> */}
            {/* <div className='readLess'>
            {props.children && props.pageType === 'annual' &&
              props.children.map((each, index) =>
                <div className='col-lg-3 col-md-3 col-sm-4 col-xs-6' key={index}>
                {index < 6 ? each : null}
                </div>)
            }
            </div> */}
            </div>
            {/* <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 readLess'>See More Products ></div> */}
          </div>
          : ''}
        <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12" id="products-list-div">
          <ol className="product-list" id="products-list" style={props.seasProdOrder ? { marginTop: '4%' } : { marginTop: 0 }}>
            {props.showLoader && // && !props.seasProdOrder @to1do
              <span className="infinite-loader-class">
                <img
                  src={ lazyLoader }
                  alt="lazy-loader"
                />
              </span>}
            <InfiniteScroll
              scrollThreshold={0.3}
              dataLength={props.productDetails}
              next={props.handleScrollInc}
              hasMore={
                props.productDetails < props.totalProductCount
              }
              loader={props.pageNo !== 1 &&
                <span className="infinite-loader-class">
                  <img
                    src={ lazyLoader }
                    alt="lazy-loader"
                  />
                </span>
              }
            >
              {props.seasProdOrder &&
                props.seasProdOrder.map((prodId, index) => {
                  const dataArray = _get(props.seasProdDetails[prodId], 'delivery');
                  const selectedDateArray = props.seasProdDateArray;
                  // const selectedDateArray = ['12 April 2019', '02 April 2019', '03 April 2019', '04 April 2019', '05 April 2019', '06 April 2019'];
                  const finalData = _filter(dataArray, o => (selectedDateArray.indexOf(o.delivery_date_format) !== -1));
                  finalData.sort(sortWeekDaysObject);
                  // finalData = sortByDate(finalData);
                  // finalData = _orderBy(finalData, ['pickup_date'], ['ASC']);
                  return (
                    <React.Fragment key={index}>
                    {props.pageType === 'pre-book' ?
                    <PrebookProdcutList
                    index={index}
                    blinkText={props.blinkText}
                    key={index}
                    prodId={prodId}
                    dateArray={finalData}
                    deliveryData={props.selectedDatesArray[prodId] ? props.selectedDatesArray[prodId] : _get(props.seasProdDetails[prodId], 'delivery')[0]}
                    selectedDatesArray={props.selectedDatesArray}
                    deliveryDatesArray={_get(props.seasProdDetails[prodId], 'delivery')}
                    resetMoreDetails={props.resetMoreDetails}
                    prodDetails={_get(props.seasProdDetails[prodId], 'info')}
                    imgurl={_get(props.seasProdDetails[prodId], 'info').image}
                    apiToken={props.apiToken}
                    showMoreDetail={props.showMoreDetail}
                    handleMoreDetailClick={props.handleMoreDetailClick}
                    handleInuputChange={props.handleInuputChange}
                    totalAmount={props.totalAmount}
                    showMaxQtyAlert={props.showMaxQtyAlert}
                    productId={props.productId}
                    handleAddCartClick={props.handleAddCartClick}
                    disableCartBtn={props.disableCartBtn}
                    totalAmountToPay={props.totalAmountToPay}
                    handleShowChangeStore={props.handleShowChangeStore}
                    handleChangeInputFields={props.handleChangeInputFields}
                    isAddToCart={props.isAddToCart}
                    defaultStoreName={props.defaultStoreName}
                    showLoginModal={props.showLoginModal}
                    addToWishlistFavoriteHandle={props.addToWishlistFavoriteHandle}
                  /> :
                    <ProdcutList
                      index={index}
                      blinkText={props.blinkText}
                      key={index}
                      showPriceBreakDown={props.showPriceBreakDown}
                      addedId={props.addedId}
                      addingId={props.addingId}
                      prodId={prodId}
                      dateArray={finalData}
                      deliveryData={props.selectedDatesArray[prodId] ? props.selectedDatesArray[prodId] : _get(props.seasProdDetails[prodId], 'delivery')[0]}
                      prodDetails={_get(props.seasProdDetails[prodId], 'info')}
                      imgurl={_get(props.seasProdDetails[prodId], 'info').image}
                      apiToken={props.apiToken}
                      showMoreDetail={props.showMoreDetail}
                      handleMoreDetailClick={props.handleMoreDetailClick}
                      handleInuputChange={props.handleInuputChange}
                      totalAmount={props.totalAmount}
                      showMaxQtyAlert={props.showMaxQtyAlert}
                      productId={props.productId}
                      handleAddCartClick={props.handleAddCartClick}
                      disableCartBtn={props.disableCartBtn}
                      totalAmountToPay={props.totalAmountToPay}
                      handleShowChangeStore={props.handleShowChangeStore}
                      handleChangeInputFields={props.handleChangeInputFields}
                      isAddToCart={props.isAddToCart}
                      defaultStoreName={props.defaultStoreName}
                      showLoginModal={props.showLoginModal}
                      addToWishlistFavoriteHandle={props.addToWishlistFavoriteHandle}
                      handleShowPriceBreakDown={props.handleShowPriceBreakDown}
                    />}
                    </React.Fragment>
                  );
                })
              }
            </InfiniteScroll>
            {props.seasProdOrder && <div className="display-item-count">
              Items{' '}
              <span id="up">
                {props.productDetails}
              </span>{' '}
              of <span id="pcount">{props.totalProductCount ? props.totalProductCount : 0}</span> total
            </div>}
          </ol>
        </div>
        {props.pageType === 'annual' ? <Link target='_blank' to='/annual-flower-subscription-terms.html'>
        <img className='col-lg-12 col-sm-12  col-md-12 col-xs-12 annual-banners' src='https://d2ob14u1yb5v44.cloudfront.net/media/annual-subscription/see-details-banner.jpg' alt='Annual Subscription' />
        <img className='col-lg-12 col-sm-12  col-md-12 col-xs-12 annual-banners-mobile' src='https://d2ob14u1yb5v44.cloudfront.net/media/annual-subscription/Subcription-Page-Mobile-Version-Sub-Banner.png' alt='Annual Subscription' />
        </Link> :
        <Link target='_blank' to='/prebook-flower-subscription-terms.html'>
        <img className='col-lg-12 col-sm-12  col-md-12 col-xs-12 annual-banners' src='https://d2ob14u1yb5v44.cloudfront.net/media/prebook-page/prebook-desk-sub-banner-up.jpg' alt='Pre-Book' />
        <img className='col-lg-12 col-sm-12  col-md-12 col-xs-12 annual-banners-mobile' src='https://d2ob14u1yb5v44.cloudfront.net/media/prebook-page/prebook-mobile-sub-up.jpg' alt='Pre-Book' />
        </Link>}
        <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
        {props.pageType === 'annual' ?
        <img className='annualSection-mobile' src='https://d2ob14u1yb5v44.cloudfront.net/media/annual-subscription/Icons-all-with-text-mobile.png' alt='Annual Subscription'/>
        :
        <img className='annualSection-mobile' src='https://d2ob14u1yb5v44.cloudfront.net/media/prebook-page/holiday-pre-book-icons.png' alt='Holiday Pre-book'/>}
        </div>
        <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 text-center annualSection">
          <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12">
            <div className="con-annual">
              <img src={qualityFreshness} alt='qualityFreshness'/>
              <h3>Quality & Freshness</h3>
              <div className='con-annual-hr'/>
              <div className='con-annual-div'>High demand flowers reserved for you directly from the farm.</div>
            </div>
          </div>
          {props.pageType === 'annual' ? <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12">
            <div className="con-annual">
              <img src={convenience} alt='convenience'/>
              <h3>Convenience</h3>
              <div className='con-annual-hr'/>
              <div className='con-annual-div'>Receive your flowers delivered straight to your door on the sameday every week during the subscription period.</div>
            </div>
          </div> :
          <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12">
          <div className="con-annual">
            <img src={subscriptionPrice} alt='subscriptionPrice'/>
            <h3>Guaranteed Savings</h3>
            <div className='con-annual-hr'/>
            <div className='con-annual-div'>Lock-in prices for the season, before they increase. Prices do not change during the Pre-Book period. Enjoy non-seasonal pricing during the holiday season!</div>
          </div>
        </div>}
          {props.pageType === 'annual' ? <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12">
            <div className="con-annual">
              <img src={subscriptionPrice} alt='subscriptionPrice'/>
              <h3>Subscription Price Guaranteed</h3>
              <div className='con-annual-hr'/>
              <div className='con-annual-div'>Lock in prices for the year. Prices do not change during the subscription period. Enjoy non-seasonal pricing during the holiday seasons!</div>
            </div>
          </div> :
          <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12">
            <div className="con-annual">
              <img src={speedyDelivery} alt='Speedy Delivery'/>
              <h3>Speedy Delivery</h3>
              <div className='con-annual-hr'/>
              <div className='con-annual-div'>Enjoy hassle free shipping!<br/>Holiday Pre-Book deliveries arrive the next day!</div>
            </div>
          </div>}
          {/* <img className='col-lg-12 col-sm-12  col-md-12 col-xs-12 annual-banners' src={iconBanner} alt=''/> */}
        </div>

      {/* <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12 faq_main'>
        <div className='annual-heading'>
            <h1>ANNUAL SUBSCRIPTION PROGRAM</h1>
        </div>
        <div className='col-lg-6 col-sm-12 col-md-6 col-xs-12 faq-block-annual'>
          <div className='faq-annual-desc'>
          <b>By electronically agreeing, I hereby subscribe to the items indicated on this order weekly ending the last week of August 2020.  You may charge my credit or debit card for the weekly charge approximately a week ahead.  I further agree</b>
          </div>
          <ol>
          <li>
            I will notify BloomKonnect at 877-356-6572 of a replacement card if my account is changed or the card otherwise becomes unusable.  If my card becomes unusable and I fail to replace it, my subscription will be cancelled and I will be responsible for paying the early termination fee.
            </li>
            <li>
            Unless I file a claim within 24 hours of receiving the first or second shipment, I may not cancel the program without an early cancellation fee of $199.99 per weekly box ordered.  Early cancellation fees will be charged automatically to my credit or debit card.
            </li>
            <li>
            In an unforeseen situation, I may skip one week up to two-times for a $10 fee per box each time on at least 8-days notice.
            </li>
            <li>
            BloomKonnect and the grower are not liable for any acts of God or other items outside of their control which may delay or make fulfillment impossible.  BloomKonnect reserves the right to substitute growers with equivalent growers and product.
            </li>
            <li>
            Any damages to all partied are limited to the amount paid or agreed to be paid.
            </li>
            <li>
            This offer is subject to acceptance by BloomKonnect and the corresponding growers.
            </li>
            <li>
            Orders for delivery on holidays (e.g. Thanksgiving, Christmas, New Years) will be delivered one or two days early.
            </li>

          </ol>
        </div>
        <div className='col-lg-6 col-xs-12 faq-block-img2'>
          <img className='col-lg-12 col-xs-12 ' src={faqImg} />
        </div>
      </div> */}
    </div >
  );
}
// }

export default AnnualSubIndex;
