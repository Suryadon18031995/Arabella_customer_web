import React from 'react';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
/* owl carausal */
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import LiComponent from './deliverySheduleLiComponent.jsx';
// import ProductComponent from '../BKMComponent/Product.jsx';
import imglogo from '../../assets/images/bloom_logo_small.png';
import subBanner from '../../assets/images/bkm_subscribe-banner.png';
import faqImg from '../../assets/images/faq-img.png';
// import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
/* seasonal product list */
import ProdcutList from './SubscriptionProdList.jsx';
import lazyLoader from  '../../assets/images/lazy-loader.gif';


/* carausal */
// import ItemsCarousel from 'react-items-carousel';

const settings = {
  // dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function SeasonalSubIndex(props) {
  return (
    <div className='container container-main'>
      {/* <BreadCrumbs
        list={this.state.breadCrumbsList} /> */}
      <img className='col-lg-24 col-xs-24' src={subBanner} alt='' />
      <div className='subsc-quotes col-lg-20 col-xs-20 a-center'>
        <h2>
          You will Recieve high demand, fresh seasonal flowers,
          <br />
          on convenient weekly delivery schedule
          <hr className='top' />
        </h2>
        <h2>Quality & Freshness</h2>
        Seasonal favorites reserved for you directly from the farm, four times a
        year.<h2>Convenience</h2> Receive your order on the same day during the
        subscription period every week for 8-12 weeks.
        <h2>Subscription Price Guaranteed</h2> Lock in prices for the season.
        Prices do not change during the subscription period.
        <div className='col-lg-24 col-xs-24 subsc-btn'>
          <img className='col-lg-1 col-xs-6' src={imglogo} />
        </div>
      </div>
      {/* * subscription component :: START * */}
      <form
        id='subscrioption_enroll_from'
        className='subscription-form'
        name='subscription_enroll_form'
        action='https://uat.bloomkonnect.com/test/subscription/index/submit/'
        method='post'
      >
        <input type='hidden' name='formKey' value='' />
        <h2 className='subscription-heading a-center'>
          What Seasone would you like to view?
        </h2>
        <div className='delivery-details'>
          <div id='delivery-schedules' className='liclass'>
            {/* <ul>{this.returnDeliveryShedule()}</ul> */}
            <ul>
              {/*  {props.dev_shed.map(data => (
                <LiComponent
                  key={data.id}
                  li={data}
                  selectSeasoselectSeason}
                  onEventClick={props.onLiClick}
                />n={props.
              ))} */}
              {props.sData &&
                props.sData.map(data => (
                  <LiComponent
                    key={data.s_id}
                    li={data}
                    selectSeason={props.selectSeason}
                    availableSeasons={props.availableSeasons}
                    availableSeasonIds={props.availableSeasonIds}
                    checkSelection={props.checkSelection}
                    onEventClick={props.onLiClick}
                  />
                ))}
              <span className='col-lg-24 col-xs-24 a-center'>
                <i>
                  {/* Order Now for December 1, 2018 - March 3, 2019 Period */}
                  Winter Subscription Program is Over
                </i>
              </span>
              <p />
            </ul>
            <hr />
          </div>
        </div>

        <br />
        <br />

        {(props.showCat === true) ?
          <div id="chs_prod">
            <span id="categorylist_desc" className="a-center">
              { // props.sDesc && props.sDesc.map((data, key) => {
                // return _get(data[0], 'tag'); _get(data[0], 'data');
                // })
              }
              {/* < h1 className="customH1Margin">Winter Seasonal Subscriptions</h1>
              <p className="a-center">Check out our winter 2018/2019 subscription! We're offering over 15 popular varieties from 10 of our favorite farms with unbeatable value and consistency. From Roses to Snapdragons, secure the best prices and your stock for the next 12 weeks (December 1, 2018 to March 3, 2019).</p> */}
              <h1 className="customH1Margin"></h1>
              <p className="a-center"></p>
              <h4>Select Your Favorite Offering</h4>
            </span>
            {
              // console.log('cat order : ', props.sCategories.cat_order, 'cat order : ', props.sCategories.cat_detail)
            }
            {(props.showCat === true) && !props.children &&
              <span className="infinite-loader-class">
                <img
                  src={ lazyLoader }
                  alt="lazy-loader"
                />
              </span>}
            {props.children && props.children.length > 0 &&
              // <OwlCarousel
              //   className="owl-theme" style={{ width: '96%' }}
              //   // loop
              //   margin={10}
              //   items={3}
              //   dots={false}
              //   responsive={{ 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 3 } }}
              //   nav
              //   rewind
              // >
              //   {props.children}
              // </OwlCarousel>
              <Slider {...settings}>
                {props.children}
              </Slider>
            }
          </div>
          : ''}
        <div>
          <ol className="product-list" id="products-list" style={{ marginTop: '4%' }}>
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
                  return (
                    <ProdcutList
                      index={index}
                      key={index}
                      prodId={prodId}
                      dateArray={finalData}
                      deliveryData={_get(props.seasProdDetails[prodId], 'delivery')[0]}
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
                    />
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
      </form>

      <div className='col-lg-24 col-xs-24 faq_main'>
        <h2 className='a-center'>
          Frequently Asked Questions About the Subscription Program
        </h2>
        <div className='col-lg-6 col-xs-24 faq-block'>
          <div id='faq_note'>
            <b>Please Note:</b>
            <i>
              {' '}
              Winter subscriptions can only be processed by using PayPal. We are
              working to enable other services to process your credit or debit
              card in the future. We have enabled a very easy process to create
              a PayPal account if you don’t already have one during the checkout
              process. Please contact customer service at <b>877-356-6572</b> if
you require assistance.
            </i>
          </div>
          <ol>
            <li>
              First Week of Delivery: December 1, 2018. <br /> Last Week of
              Delivery: February 25, 2019 (13 weeks).
            </li>
            <li>
              For your convenience, payment is authorized every week and only
              charged to your bank card when shipped.
            </li>
            <li>DEADLINE to participate is November 16, 2018.</li>
            <li>
              Unless a claim is filed within 24-hours of receiving the first
              shipment, the subscription may not be cancelled at any time.
            </li>
            <li>
              The buyer may skip a week for a $10 fee and at least 8-days notice
              before delivery.
            </li>
            <li>
              All deliveries are shipped via International expedited services
              direct from the farm.
            </li>
            <li>
              BloomKonnect and the grower are not liable for any acts of God or
              other items outside of their control which may delay or make
              fulfillment impossible.
            </li>
            <li>
              Any damages to all parties are limited to the amount paid or
              agreed to be paid.
            </li>
            <li>
              This offer is subject to acceptance by BloomKonnect and the
              corresponding farms.
            </li>
            <li>
              Conflicting deliveries with the holidays will be delivered a day
              before or after the legal holiday.
            </li>
          </ol>
        </div>
        <div className='col-lg-6 col-xs-24 faq-block-img2'>
          <img className='col-lg-24 col-xs-24 ' src={faqImg} />
        </div>
      </div>
      {/** END */}
    </div >
  );
}
// }

export default SeasonalSubIndex;
