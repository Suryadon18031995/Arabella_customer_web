/* eslint-disable max-len */
/* eslint-disable import/first */
import React from 'react';
import moment from 'moment';
import connect from 'react-redux/lib/connect/connect';
import AnnualSubIndex from '../../components/SeasonalSubscription/AnnualSubIndex.jsx';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
// import _filter from 'lodash/filter';
import _forEach from 'lodash/forEach';
import _trim from 'lodash/trim';
import _find from 'lodash/find';
import { fetchSeasonalSubscriptoinData, fetchSubscriptionCategories, getSeasonalSubscriptionListProd } from '../../actions/seasonalSubscriptionAction';

import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import '../../assets/stylesheets/seasonal.less';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postAddToCartData, setCartTypeData, flushCartViewData, clearCartData } from '../../actions/cart';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { fetchAddToWishlistData } from '../../actions/wishList';
// import { receiveShowLoginModalData } from '../../actions/login';
import { receiveShowLoginModalData, updateCartData, setStoreId, flushCartData, setCartId } from '../../actions/login';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class AnnualSubscriptionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSeason: undefined,
      selectedCheck: undefined,
      selectedCategory: false,
      showCategory: false,
      fromHomeBanner: false,
      // noNeedDateCalender: true,
      scrollToList: false,
      seasonalProdList: [],
      showMoreDetail: {},
      unitQty: undefined,
      totalAmount: undefined,
      showMaxQtyAlert: false,
      showChangeStoreModal: false,
      productId: undefined,
      totalProductCount: undefined,
      productDetails: [],
      selectedDatesArray: {},
      blinkText: {},
      pageNo: 1,
      showLoader: false,
      disableCartBtn: 'disableBtn',
      inputData: {
        // name: false,
        // value: false,
        // inputValue: undefined,
      },
      addTocartButton: {},
      breadCrumbsList: [
        {
          link: '/',
          name: 'HOME PAGE',
        },
        {
          link: undefined,
          name: 'SUBSCRIPTION',
        },
      ],
      responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
      prevSeasonalListData: {},
      // cartType: _get(this.props, 'cartType.cartType') ? _get(this.props, 'cartType.cartType') : undefined,
    };
  }

  handleClickEvent = (id) => {
    this.props.getseasonalCategoriesData({
      currencyCode: 'USD',
      seasonalCategoryId: id,
      apiToken: _get(this.props, 'apiToken', ''), // this.props.apiToken,
      storeId: _get(this.props, 'storeId', ''), // '6962',
    });
    this.setState({ selectedCheck: id, showCategory: true });
  };
  componentDidMount() {
    this.props.getseasonalHeadData();
    this.handleClickEvent('7');
    this.setState({
      seasonalProdList: [],
    });
    if (_get(this.props, 'location.state.fromHomeBanner') === 'yes') {
      this.setState({ fromHomeBanner: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.apiToken !== this.props.apiToken) {
      this.state.selectedCategory && this.selectCategoryEvent(this.state.selectedCategory);
    }
  }

  componentWillUnmount() {
    this.setState({
      seasonalProdList: [],
    });
  }

  selectCategoryEvent = (id) => {
    const seasoneData = this.state.selectSeason;
    this.setState({
      showLoader: true,
      seasonalProdList: [],
      pageNo: 1,
      scrollToList: true,
      fromHomeBanner: false,
    }, () =>
      this.props.getSubscriptionProdList({
        currencyCode: 'USD',
        interval: '_week',
        frequency: _get(seasoneData, 'cycles'),
        catalogRadio: _get(seasoneData, 'name'),
        startDate: moment(_get(seasoneData, 'start_date'), 'YYYY-MM-DD hh:mm:ss a').format('YYYY-MM-DD'),
        endDate: moment(_get(seasoneData, 'end_date'), 'YYYY-MM-DD hh:mm:ss a').format('YYYY-MM-DD'),
        categoryId: id, // 509
        apiToken: _get(this.props, 'apiToken', ''), // 'aa1d259a9d0596d5e2e1cf719b567a50',
        storeId: _get(this.props, 'storeId', ''),
        pageNo: this.state.pageNo,

      }));
    this.setState({ selectedCategory: id }, () => {
      const children = this.createChildren(this.state.seasonalCategories.cat_order, this.state.seasonalCategories.cat_detail);
      this.setState({
        children,
      }, () => {
        this.forceUpdate(); // @ todo: should find other alternative solution
      });
    });
  }

  createMarkup = content => ({ __html: content });

  createChildren = (relatedProducts, details) => relatedProducts && relatedProducts.map((i) => {
    if (details[i]) {
      return (
        <div key={i} className="annual-cat-parent" id='pre-book-cat-parent'>
          <div className="carouselImgDiv">
            <img
              src={_get(details[i], 'thumb')}
              className="carouselImg" />
          </div>
          <div className="carouselTextDiv a-center" id='pre-book-des'>
            <h2>{_get(details[i], 'name')}</h2>
            {/* <h5>{_get(details[i], 'desc')}</h5> */}
            <h5 dangerouslySetInnerHTML={this.createMarkup(_get(details[i], 'desc'))} />
            <div>
              <button className="btn btn-default" onClick={() => this.selectCategoryEvent(i)}>SHOP NOW</button>
            </div>
          </div>
        </div>);
    }
    return null;
  }).filter(element => (element !== null && element !== undefined));
  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

  componentWillReceiveProps(nextProps) {
    if (!_isEmpty(nextProps.seasonalHead)) {
      // const currDate = moment().format('YYYY-MM-DD hh:mm:ss'); // 2018-10-22 03:32:00
      const recivedData = _get(nextProps.seasonalHead, 'data', ''); // collection of dates.
      // const selectSeason = _filter(recivedData, o => moment(currDate).isAfter(o.start_date) && moment(currDate).isBefore(o.end_date))[0];
      const selectSeason = recivedData.filter(each => Number(each.s_id) === 7)[0];
      let sDes = _get(selectSeason, 'short_description', '');
      sDes = _trim(sDes);
      const tags = this.getParagraphs(sDes); // this.parseHTML(sDes).children;
      /* categories */
      const recivedCategoryData = nextProps.seasonalCategories;
      let children;
      if (!_isEmpty(recivedCategoryData)) {
        children = this.createChildren(recivedCategoryData.cat_order, recivedCategoryData.cat_detail);// .filter(element => element !== undefined);
      }

      this.setState({
        // seasonalData: nextProps.seasonalHead,
        selectSeason,
        seasonalCategories: recivedCategoryData,
        children,
        shortDescription: tags,
      });
    }
    if (!_isEmpty(nextProps.seasonalProdList)) {
      if (JSON.stringify(nextProps.seasonalProdList) !== JSON.stringify(this.state.prevSeasonalListData)) {
        // const seasProdList = nextProps.seasonalProdList;
        let seasProdList = {};
        let tempObj = {};
        if (this.state.pageNo === 1) {
          seasProdList = nextProps.seasonalProdList;
        } else {
          seasProdList = nextProps.seasonalProdList;
          tempObj = {
            data: {},
            data_order: {},
            selectedDateArray: [],
            pcount: undefined,
            status: false,
          };
          const { seasonalProdList } = this.state;
          tempObj.data = _get(seasonalProdList, 'data');
          tempObj.data_order = _get(seasonalProdList, 'data_order');
          tempObj.selectedDateArray = _get(seasonalProdList, 'selectedDateArray');
          tempObj.pcount = _get(seasonalProdList, 'pcount');
          tempObj.status = _get(seasonalProdList, 'status');
          Object.entries(seasProdList).map(([key, val]) => {
            if (key === 'data' && val) {
              Object.entries(val).map(([key2, val2]) => {
                tempObj.data = { ...tempObj.data, [key2]: val2 };
                return null;
              });
            }
            if (key === 'data_order' && val) {
              Object.entries(val).map(([, val2]) => {
                tempObj.data_order && tempObj.data_order.push(val2);
                return null;
              });
            }
            return null;
          });
          seasProdList = tempObj;
        }
        this.setState({
          seasonalProdList: seasProdList,
          totalProductCount: _get(seasProdList, 'pcount'),
          productDetails: _get(seasProdList, 'data_order', []) && _get(seasProdList, 'data_order', []).length,
          showLoader: false,
          prevSeasonalListData: nextProps.seasonalProdList,
        });
      }
    }
    if (!_isEmpty(nextProps.addCartResponseDetails) && (this.props.type === 'REQUEST_ADD_TO_CART') && (this.props.cartCount !== _get(nextProps.addCartResponseDetails, ['total_products_in_cart']))) {
      this.props.updateCart({
        show: true,
        cartCount: _get(nextProps.addCartResponseDetails, ['total_products_in_cart']),
        cartTotal: _get(nextProps.addCartResponseDetails, ['subtotal']),
        cartProducts: _get(nextProps.addCartResponseDetails, ['result']),
      });
      this.props.setCartId(_get(nextProps.addCartResponseDetails, 'result') && _get(nextProps.addCartResponseDetails, ['result', [0], 'cart_id']));
      // this.props.setCartType({ cartType: 'subscription' });
    }
    if (!_isEmpty(nextProps.addToFavs) && this.props.favouriteType === 'REQUEST_ADD_TO_FAVORITES') {
      this.props.updateCart({ showFavsCart: true });
    }
    if (!_isEmpty(nextProps.addToWishlist) && this.props.wishlistType === 'REQUEST_SUBMIT_ADD_TO_WISHLIST') {
      this.props.updateCart({ showWishlistCart: true });
    }
  }
  handleScrollInc = () => {
    const pNo = this.state.pageNo;
    const seasoneData = this.state.selectSeason;
    this.setState(
      {
        pageNo: pNo + 1,
      },
      () => {
        (this.state.productDetails < this.state.totalProductCount) &&
          this.props.getSubscriptionProdList({
            currencyCode: 'USD',
            interval: '_week',
            frequency: _get(seasoneData, 'cycles'),
            catalogRadio: _get(seasoneData, 'name'),
            startDate: moment(_get(seasoneData, 'start_date'), 'YYYY-MM-DD hh:mm:ss a').format('YYYY-MM-DD'),
            endDate: moment(_get(seasoneData, 'end_date'), 'YYYY-MM-DD hh:mm:ss a').format('YYYY-MM-DD'),
            categoryId: this.state.selectedCategory, // 509
            apiToken: _get(this.props, 'apiToken', ''), // 'aa1d259a9d0596d5e2e1cf719b567a50',
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : _get(this.props.loginData, [0, 'result', 'default_store_id'], []),
            pageNo: this.state.pageNo,
          });
      },
    );
  };

  /* function for parsing HTML */
  parseHTML = (html) => {
    /* function will give the tags wich comes in the given string */
    const t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
  }
  /* function returning the tags */
  getParagraphs = (htmlString) => {
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', htmlString);
    const strA = this.parseHTML(htmlString).children;
    const data = [];
    _forEach(strA, (value) => {
      const temData = Array.from(div.querySelectorAll(value.tagName))
        .filter(p => p.textContent !== '') // because of the lonely </p> at the end - optional
        .map(p => ({ tag: p.localName, data: p.innerHTML }));
      data.push(temData);
    });
    return data;
  }


  handleMoreDetailClick = (productId) => {
    this.setState({
      showMoreDetail: {
        ...this.state.showMoreDetail,
        [productId]: !_get(this.state.showMoreDetail, productId, false),
      },
    });
  }
  // handleChangeInputFields = (event) => {
  //   const { inputData, addTocartButton } = this.state;
  //   inputData.name = event.target.name;
  //   inputData.value = event.target.value;
  //   const pid = event.target.name;

  //   addTocartButton[pid] = { ...addTocartButton[pid], isSelectedAvailDate: event.target.value };

  //   this.setState({
  //     addTocartButton,
  //   });
  // }

  handleInuputChange = (event, prodData, deliData) => {
    let totalTemp = 0;
    let flag = false;
    const { inputData, addTocartButton, blinkText } = this.state;
    const { pid } = prodData;
    // const data = this.state.inputData;
    let disableCartBtn = 'disableBtn';
    let totalPriceToPay;
    if (event.target.value) { //  >= _get(deliData, 'qty_per_box')
      totalTemp = (event.target.value) * _get(deliData, 'total_price_currency');
      const reminder = event.target.value % _get(deliData, 'qty_per_box');
      totalPriceToPay = reminder ? '' : `Total amount payable $${totalTemp.toFixed(2)}`;
      disableCartBtn = reminder ? 'disableBtn' : '';
      inputData[prodData.pid] = totalPriceToPay;
      // inputData.inputValue = event.target.value;
      if (reminder) {
        blinkText[prodData.pid] = 'blink';
      } else {
        blinkText[prodData.pid] = '';
      }

      addTocartButton[pid] = { ...addTocartButton[pid], isInputQty: event.target.value !== '' ? event.target.value : null };
    } else {
      totalPriceToPay = '';
      inputData[prodData.pid] = totalPriceToPay;
      addTocartButton[pid] = { ...addTocartButton[pid], isInputQty: '' };
    }
    if (event.target.value > _get(deliData, 'floorallowed')) {
      flag = true;
      totalTemp = 0;
      inputData[prodData.pid] = '';
      addTocartButton[pid] = { ...addTocartButton[pid], isInputQty: '' };
    }

    this.setState({
      unitQty: event.target.value,
      totalAmount: totalTemp,
      showMaxQtyAlert: flag,
      productId: prodData.pid,
      totalPriceToPay,
      disableCartBtn,
      addTocartButton,
      blinkText,
    });
  }
  handleAddCartClick = (pid) => {
    const { addTocartButton, selectedDatesArray } = this.state;

    const isProdData = _get(addTocartButton, pid, undefined);
    // addTocartButton[pid] = { ...addTocartButton[pid], defaultInputValue: 0 };
    // addTocartButton[pid] = { ...addTocartButton[pid], isInputQty: 0 };  moved to if condition button validation
    const selectedProdData = _get(_get(this.state.seasonalProdList, 'data'), pid);
    let delData;
    if (selectedDatesArray[pid]) {
      delData = selectedDatesArray[pid];
    } else {
      delData = _get(selectedProdData, ['delivery', 0]);
    }
    const finalSend = {
      apiToken: this.props.apiToken,
      deliveryMethod: _get(delData, 'delivery_method'),
      deliveryDate: _get(delData, 'delivery_date'),
      qtyPerBox: _get(delData, 'qty_per_box'),
      farmPrice: _get(delData, 'farm_price'),
      landingPrice: _get(delData, 'landing_price'),
      deliveryPrice: _get(delData, 'delivery_price'),
      totalPrice: _get(delData, 'total_price'),
      pickupDate: _get(delData, 'pickup_date'),
      truckPickupDate: _get(delData, 'truck_pickup_date'),
      prodAvailId: _get(delData, 'avail_id'),
      customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId, //
      distCenterId: _get(delData, 'distcenter'),
      locId: _get(_get(_get(selectedProdData, 'info'), _get(delData, 'avail_id')), 'vendor_location_id'),
      transitIds: _get(delData, 'transitIDs'),
      transitDays: '',
      cloneTotalPrice: '',
      user: _get(_get(this.props.loginData, '0.result'), 'cust_name'),
      costPerUnit: _get(delData, 'cost_per_unit'),
      api: 'api',
      productId: pid,
      boxType: _get(_get(_get(selectedProdData, 'info'), _get(delData, 'avail_id')), 'box_type'),
      packUnit: _get(_get(_get(selectedProdData, 'info'), _get(delData, 'avail_id')), 'pack_unit'),
      quantity: (_get(isProdData, 'isInputQty')) / (_get(delData, 'qty_per_box')),
      subscription: 1,
      subscriptionId: _get(this.state.selectSeason, 's_id'),
      selValNext: _get(delData, 'cart_format'),
    };
    if (this.props.apiToken && ((_get(this.props, 'cartType') === 'subscription') || !_get(this.props, 'cartType'))) {
      this.props.addToCart(finalSend);
      addTocartButton[pid] = { ...addTocartButton[pid], isInputQty: '' };
      this.setState({ addTocartButton });
    } else if (_get(this.props, 'cartType') === 'normal' || _get(this.props, 'cartType') === 'pre-book' || _get(this.props, 'cartType') === 'prime') {
      alert('Subscription orders cannot be purchased in combination with single orders at this time. Please clear your cart before adding this product to your cart');
    } else {
      this.props.showLoginModal({ show: true });
    }
    // this.setState({ addTocartButton }); // moved to if condition button validation
  }
  /* for handling change store */
  handleShowChangeStore = () => {
    this.setState({
      showChangeStoreModal: true,
    });
  };
  handleCloseModal = () => {
    this.setState({
      showChangeStoreModal: false,
    });
  };
  /* for changing store id  */
  handleMethodChange = (event) => {
    if (event.target.name === 'store') {
      const seasoneData = this.state.selectSeason;
      const selectedStoreName = _get(_find(_get(this.props.loginData, [0, 'result', 'store_list'], []), { store_id: event.target.value }), 'store_name');
      this.props.setStoreId({
        storeId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.flushCartData();
      this.props.flushCartViewData();
      this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
        selectedStoreName,
        seasonalProdList: [],
        showLoader: true,
        pageNo: 1,
      });

      this.props.getSubscriptionProdList({
        currencyCode: 'USD',
        interval: '_week',
        frequency: _get(seasoneData, 'cycles'),
        catalogRadio: _get(seasoneData, 'name'),
        startDate: moment(_get(seasoneData, 'start_date'), 'YYYY-MM-DD hh:mm:ss a').format('YYYY-MM-DD'),
        endDate: moment(_get(seasoneData, 'end_date'), 'YYYY-MM-DD hh:mm:ss a').format('YYYY-MM-DD'),
        categoryId: this.state.selectedCategory, // 509
        apiToken: _get(this.props, 'apiToken', ''), // 'aa1d259a9d0596d5e2e1cf719b567a50',
        storeId: event.target.value,
        pageNo: 1,
      });
    }
  };
  addToWishlistFavoriteHandle = (pid, iswhislistOrFavorite) => {
    if (iswhislistOrFavorite === 'wishlist') {
      this.props.addToWhishlist({
        apiToken: this.props.apiToken,
        pid,
      });
    }
    if (iswhislistOrFavorite === 'favorite') {
      this.props.addToFavorites({
        apiToken: this.props.apiToken,
        pid,
      });
    }
  }
  resetMoreDetails = (date, deliveryDatesArray, pid) => {
    const deliveryDetails = _find(deliveryDatesArray, o => o.delivery_date === date);
    const selectedDatesArray = { ...this.state.selectedDatesArray, [pid]: deliveryDetails };
    this.setState({ selectedDatesArray });
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <img className='image-responsive custome-desk'
          src='https://d2ob14u1yb5v44.cloudfront.net/media/prebook-page/holiday-banner-lg-up.jpg'
          alt='Pre-Book Banner'
          style={{ width: '100%' }} />
        <img className='image-responsive custome-small'
          src='https://d2ob14u1yb5v44.cloudfront.net/media/prebook-page/holiday-banner-sm-up.jpg'
          alt='Pre-Book Banner'
          style={{ width: '100%' }} />
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className="container">
          <ErrorBoundary>
            <AnnualSubIndex
              pageType='pre-book'
              fromHomeBanner={this.state.fromHomeBanner}
              blinkText={this.state.blinkText}
              scrollToList={this.state.scrollToList}
              type={this.props.type}
              seasonalActionType={this.props.seasonalActionType}
              selectedDatesArray={this.state.selectedDatesArray}
              // imgUrl={this.state.imgUrl}
              // sData={_get(this.props.seasonalHead, 'data', '')}
              selectSeason={this.state.selectSeason}
              checkSelection={this.state.selectedCheck}
              dev_shed={this.state.deliveryShed}
              bloomSlogo={this.state.bloomlogoSmall}
              // onLiClick={this.handleClickEvent}
              sCategories={this.state.seasonalCategories}
              showCat={this.state.showCategory}
              children={this.state.children}
              changeActiveItem={this.changeActiveItem}
              activeItemIndex={this.state.activeItemIndex}
              sDesc={this.state.shortDescription}
              // noNeedDateCalender={this.state.noNeedDateCalender}
              apiToken={this.props.apiToken}
              showMoreDetail={this.state.showMoreDetail}
              seasProdOrder={_get(this.state.seasonalProdList, 'data_order')}
              seasProdDetails={_get(this.state.seasonalProdList, 'data')}
              seasProdDateArray={_get(this.state.seasonalProdList, 'selectedDateArray')}
              handleMoreDetailClick={this.handleMoreDetailClick}
              handleInuputChange={this.handleInuputChange}
              totalAmount={this.state.totalAmount}
              showMaxQtyAlert={this.state.showMaxQtyAlert}
              productId={this.state.productId}
              handleAddCartClick={this.handleAddCartClick}
              disableCartBtn={this.state.disableCartBtn}
              totalAmountToPay={this.state.inputData}
              handleChangeInputFields={this.handleChangeInputFields}
              isAddToCart={this.state.addTocartButton}
              handleShowChangeStore={this.handleShowChangeStore}
              defaultStoreName={this.state.selectedStoreName ? this.state.selectedStoreName : _get(this.props.loginData, [0, 'result', 'default_store_name'], [])}
              totalProductCount={this.state.totalProductCount}
              productDetails={this.state.productDetails}
              pageNo={this.state.pageNo}
              handleScrollInc={this.handleScrollInc}
              showLoader={this.state.showLoader}
              showLoginModal={this.props.showLoginModal}
              addToWishlistFavoriteHandle={this.addToWishlistFavoriteHandle}
              // subProdList={this.state.seasonalProdList}
              resetMoreDetails={this.resetMoreDetails}
              responsive={this.state.responsive}
            />
            <ChangeStoreModal
              storeList={_get(this.props.loginData, [0, 'result', 'store_list'], [])}
              selectedStoreId={this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId}
              showChangeStoreModal={this.state.showChangeStoreModal}
              handleCloseModal={this.handleCloseModal}
              handleMethodChange={this.handleMethodChange}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getseasonalHeadData: () => dispatch(fetchSeasonalSubscriptoinData()),
  getseasonalCategoriesData: data => dispatch(fetchSubscriptionCategories(data)),
  getSubscriptionProdList: data => dispatch(getSeasonalSubscriptionListProd(data)),
  addToCart: data => dispatch(postAddToCartData(data)),
  showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
  addToFavorites: data => dispatch(fetchAddToFavsData(data)),
  addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
  updateCart: data => dispatch(updateCartData(data)),
  setCartType: data => dispatch(setCartTypeData(data)),
  setStoreId: data => dispatch(setStoreId(data)),
  flushCartData: () => dispatch(flushCartData()),
  flushCartViewData: () => dispatch(flushCartViewData()),
  clearCart: data => dispatch(clearCartData(data)),
  setCartId: data => dispatch(setCartId(data)),
});

const mapStateToProps = (state) => {
  const {
    seasonalSubscriptionReducer, loginReducer, cartReducer, myFavouritesReducer, wishListReducer,
  } = state;

  const {
    seasonalHead,
    seasonalCategories,
    seasonalProdList,
    isFetching: isLoading,
    error: seasonalSubscriptionError,
    type: seasonalActionType,
  } = seasonalSubscriptionReducer || [];

  const {
    apiToken,
    currencyCode,
    storeId,
    loginData,
    error: loginError,
    cartId,
    cartCount,
  } = loginReducer || [];

  const {
    addCartResponseDetails,
    type,
    cartType,
    error: addToCartError,
  } = cartReducer || [];

  const {
    addToFavs,
    type: favouriteType,
    error: addToFavError,
  } = myFavouritesReducer || [];

  const {
    addToWishlist,
    type: wishlistType,
    error: addToWishlistError,
  } = wishListReducer || [];

  const error = !_isEmpty(seasonalSubscriptionError) || _isError(seasonalSubscriptionError) || !_isEmpty(addToFavError) || _isError(addToFavError) || !_isEmpty(addToWishlistError) || _isError(addToWishlistError) || !_isEmpty(addToCartError) || _isError(addToCartError) || !_isEmpty(loginError) || _isError(loginError) || undefined;

  return {
    seasonalHead,
    seasonalCategories,
    seasonalProdList,
    isLoading,
    apiToken,
    currencyCode,
    storeId,
    loginData,
    addCartResponseDetails,
    favouriteType,
    wishlistType,
    addToFavs,
    addToWishlist,
    type,
    cartType,
    error,
    seasonalActionType,
    cartId,
    cartCount,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(AnnualSubscriptionContainer));
