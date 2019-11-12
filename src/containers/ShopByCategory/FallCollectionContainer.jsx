import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import moment from 'moment';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import _values from 'lodash/values';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListingComponent from '../../components/BKMComponent/ListingComponent.jsx';
import FilterComponent from '../../components/BKMComponent/FilterComponent.jsx';

import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import {
  fetchBKMListingData,
  fetchFilterCategoryData,
} from '../../actions/bkm_listing';
import { postAddToCartData, setCartTypeData } from '../../actions/cart';
import {
  mapAddToCartApiData,
  mapProductSearchData,
} from '../../utils/commonMapper';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { fetchAddToWishlistData } from '../../actions/wishList';
import { receiveShowLoginModalData, updateCartData } from '../../actions/login';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import { compareAndSortDates } from '../../helpers/commonUtil';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

import lazyLoader from '../../assets/images/lazy-loader.gif';

/* product review and vendor review hover effects are not added for this container */

class FallCollectionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitQty: {},
      totalAmount: {},
      inputValid: {},
      showMaxQtyAlert: false,
      productId: undefined,
      url: undefined,
      listData: [],
      productDetails: [],
      shippingMethodsArrData: [],
      deliveryDetails: [],
      displayData: [],
      availId: undefined,
      pageNo: 1,
      totalProductCount: undefined,
      showAscendSort: true,
      filtersEnabled: false,
      enableClearAll: false,
      redirectToDetailsPage: false,
      searchStartDate: undefined,
      searchEndDate: undefined,
      showChangeStoreModal: false,
      showMoreDetail: {},
      dateObjectArray: [],
      viewType: 'list',
      filters: {},
      loginFlag: !_isEmpty(this.props.apiToken),
      sortValue: 'index',
      selectedStoreId: undefined,
      selectedStoreName: undefined,
      categoryFilterData: [],
      categoryFilterDataTemp: [],
      category: [],
      color: [],
      farm: [],
      location: [],
      boxType: [],
      variety: [],
      uom: [],
      length: [],
      grade: [],
      methodUpdated: false,
      blinkText: {},
      method: '?',
      showMoreAvail: {},
      moreAvail: {},
      applyFilter: false,
      breadCrumbsList: [
        {
          link: '/',
          name: 'home',
        },
        {
          link: '/wholesale-flowers.html',
          name: 'Shop Flowers',
        },
        {
          link: undefined,
          name: 'FALL COLLECTION',
        },
      ],
      // cartType: _get(this.props, 'cartType.cartType') ? _get(this.props, 'cartType.cartType') : undefined,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.getFiltersData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      pageType: 'seasonal',
    });
  }

  componentDidMount() {
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      pageType: 'seasonal',
      sort: this.state.sortValue,
      pageNo: 1,
      zipcode: _get(this.props, 'zipcode'),
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEmpty(nextProps.filtersData)) {
      const shippingMethodsData = [];
      const filterMethodDataTemp = _get(nextProps.filtersData, 'method');
      filterMethodDataTemp &&
        Object.entries(filterMethodDataTemp).map(([key, value]) =>
          shippingMethodsData.push(value));

      const categoryFilterData = _values(_get(nextProps.filtersData, 'category')) &&
        _values(_get(nextProps.filtersData, 'category')).map(o =>
          ({ key: o.key.toString(), count: o.count, label: o.label[o.key] }));

      this.setState({
        shippingMethodsArrData: shippingMethodsData,
        filtersEnabled: false,
        filters: nextProps.filtersData,
        categoryFilterData,
        categoryFilterDataTemp: categoryFilterData,
      });
    }
    if (!_isEmpty(nextProps.bkmSearchData)) {
      const detailsTemp = [];
      const deliveryDataTemp = [];
      const displayDataTemp = [];
      let listDataTemp = [];
      const datesArrayTemp = [];
      let count = 0;
      let moreAvail = {};
      let showMoreAvail = {};
      if (this.state.pageNo === 1 || this.state.filtersEnabled) {
        const temp = _get(nextProps.bkmSearchData, 'products.result', {});
        listDataTemp = [
          ...Object.keys(temp).map((value, key) => ({ [value]: temp[value] })),
        ];
        count = _get(nextProps.bkmSearchData, 'products.product_count');
      } else {
        const temp = _get(nextProps.bkmSearchData, 'products.result', {});
        listDataTemp = [
          ...this.state.listData,
          ...Object.keys(temp).map((value, key) => ({ [value]: temp[value] })),
        ];
        count = _get(nextProps.bkmSearchData, 'products.product_count');
      }
      listDataTemp && listDataTemp.length &&
        listDataTemp.map((valTemp) => {
          const val = Object.values(valTemp)[0];
          if (val.more_avail && Object.values(val.more_avail).length > 0) {
            Object.keys(val.more_avail).forEach((avaiId) => {
              const minPrice = _get(_minBy(val.more_avail[avaiId], 'total_price_currency'), 'total_price_format');
              const maxPrice = _get(_maxBy(val.more_avail[avaiId], 'total_price_currency'), 'total_price_format');
              let approxPrice;
              if (minPrice === maxPrice) {
                approxPrice = minPrice;
              } else {
                approxPrice = `${minPrice} - ${maxPrice}`;
              }
              val.info[avaiId].approxPrice = approxPrice;
            });
            moreAvail = {
              ...moreAvail,
              [val.info.pid]: val.more_avail,
            };
            showMoreAvail = {
              ...showMoreAvail,
              [val.info.pid]: false,
            };
          }
          detailsTemp.push(val.info);
          val.delivery ? deliveryDataTemp.push(val.delivery) : '';
          deliveryDataTemp && deliveryDataTemp.map((val1, key1) => {
            val1.sort(compareAndSortDates);
            deliveryDataTemp[key1] = val1;
          });
          !_isEmpty(val.delivery) && displayDataTemp.push(val.delivery[0]);
          const datesArr = {};
          _filter(val.delivery).forEach((o) => {
            datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
          });
          datesArrayTemp.push(datesArr);
        });

      this.setState({
        listData: listDataTemp,
        totalProductCount: count,
        productDetails: detailsTemp,
        deliveryDetails: deliveryDataTemp,
        displayData: displayDataTemp,
        filtersEnabled: false,
        dateObjectArray: datesArrayTemp,
        moreAvail,
        showMoreAvail,
      });
    }
    if (!_isEmpty(nextProps.addCartResponseDetails) && (this.props.type === 'REQUEST_ADD_TO_CART') && (this.props.cartCount !== _get(nextProps.addCartResponseDetails, ['total_products_in_cart']))) {
      this.props.updateCart({
        show: true,
        cartCount: _get(nextProps.addCartResponseDetails, ['total_products_in_cart']),
        cartTotal: _get(nextProps.addCartResponseDetails, ['subtotal']),
        cartProducts: _get(nextProps.addCartResponseDetails, ['result']),
      });
      // this.props.setCartType({ cartType: 'normal' });
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
    this.setState(
      {
        pageNo: pNo + 1,
      },
      () => {
        if (this.state.productDetails.length < this.state.totalProductCount) {
          if (!this.state.enableClearAll && !this.state.methodUpdated) {
            this.props.getBkmListSearchData({
              currencyCode: this.props.currencyCode,
              apiToken: this.props.apiToken,
              storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
              pageType: 'seasonal',
              sort: this.state.sortValue,
              pageNo: this.state.pageNo,
              zipcode: _get(this.props, 'zipcode'),
            });
          } else if (this.state.methodUpdated) {
            this.props.getBkmListSearchData({
              currencyCode: this.props.currencyCode,
              apiToken: this.props.apiToken,
              storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
              sort: this.state.sortValue,
              pageType: 'seasonal',
              pageNo: this.state.pageNo,
              method: this.state.method,
            });
          } else {
            const reqBody = mapProductSearchData({
              ...this.state,
              currencyCode: this.props.currencyCode,
              apiToken: this.props.apiToken,
              storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
              pageNo: this.state.pageNo,
              pageType: 'seasonal',
            });
            this.props.getBkmListSearchData(reqBody);
          }
        }
      },
    );
  };

  handleMethodChange = (event) => {
    if (event.target.name === 'store') {
      const selectedStoreName = _get(_find(_get(this.props.loginData, [0, 'result', 'store_list'], []), { 'store_id': event.target.value }), 'store_name');
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
        selectedStoreName,
      });
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: event.target.value,
        pageType: 'seasonal',
        sort: this.state.sortValue,
        pageNo: 1,
      });
    } else {
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        pageType: 'seasonal',
        sort: this.state.sortValue,
        pageNo: 1,
        method: event.target.value === '?' ? '' : event.target.value,
      });
      this.setState({
        listData: [],
        totalProductCount: 0,
        productDetails: [],
        deliveryDetails: [],
        displayData: [],
        dateObjectArray: [],
        methodUpdated: true,
        enableClearAll: true,
        pageNo: 1,
        method: event.target.value,
      });
    }
  };

  handleInuputChange = (event, prodData, deliData) => {
    let totalTemp = 0;
    let flag = false;
    const { blinkText, totalAmount, inputValid } = this.state;
    inputValid[prodData.pid] = true;
    if (!isNaN(event.target.value) && event.target.value >= _get(deliData, 'qty_per_box') &&
      event.target.value <= _get(deliData, 'floorallowed') && event.target.value % _get(deliData, 'qty_per_box') === 0) {
      inputValid[prodData.pid] = false;
    }
    if (event.target.value >= _get(deliData, 'qty_per_box')) {
      totalTemp = (event.target.value) * _get(deliData, 'total_price_currency');
    }
    if (event.target.value >= _get(deliData, 'floorallowed')) {
      flag = true;
      totalTemp = 0;
    }
    if (event.target.value % _get(deliData, 'qty_per_box') !== 0) {
      blinkText[prodData.pid] = 'blink';
    } else {
      blinkText[prodData.pid] = '';
    }
    totalAmount[prodData.pid] = totalTemp;
    this.setState({
      unitQty: { ...this.state.unitQty, [prodData.pid]: Number(event.target.value) ? Number(event.target.value) : '' },
      totalAmount,
      showMaxQtyAlert: flag,
      productId: prodData.pid,
      blinkText,
      inputValid,
    });
  }

  handleAddCartClick = (prodData, deliData) => {
    if (this.props.apiToken && ((_get(this.props, 'cartType') === 'normal') || (!_get(this.props, 'cartType')))) {
      const reqBody = mapAddToCartApiData({
        ...this.state,
        ...prodData,
        ...deliData,
        totalAmount: this.state.totalAmount[prodData.pid],
        unitQty: this.state.unitQty[prodData.pid],
        user: this.props.user,
        apiToken: this.props.apiToken,
        customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      });
      this.props.addToCart(reqBody);
      this.setState({
        unitQty: { ...this.state.unitQty, [prodData.pid]: 0 },
        totalAmount: { ...this.state.totalAmount, [prodData.pid]: 0 },
      });
    } else if (_get(this.props, 'cartType') === 'subscription') {
      alert('Subscription orders cannot be purchased in combination with single orders at this time. Please clear your cart before adding this product to your cart');
    } else if (_get(this.props, 'cartType') === 'pre-book') {
      alert("Hello! Your Mother's Day PreBook products must be purchased separately from everyday product on the marketplace. Please complete your everyday purchases and continue shopping for your other favorite products!");
    } else if (_get(this.props, 'cartType') === 'prime') {
      alert("Normal orders cannot be purchased in combination with premium orders at this time. Please clear your cart before adding premium to your cart!");
    } else if (_isEmpty(this.props.apiToken)) {
      this.props.showLoginModal({ show: true });
    }
  };

  sortingOrderClick = () => {
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      sort: this.state.sortValue,
      pageType: 'seasonal',
      pageNo: 1,
      sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
    });
    this.setState({
      showAscendSort: !this.state.showAscendSort,
      pageNo: 1,
      totalProductCount: 0,
      productDetails: [],
    });
  };

  handleSortChange = (event) => {
    this.setState({
      sortValue: event.target.value,
      totalProductCount: 0,
      productDetails: [],
      pageNo: 1,
    });
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      pageType: 'seasonal',
      sort: event.target.value,
      pageNo: 1,
    });
  };

  handleFilterCheckBoxChange = (event) => {
    const arr = _get(this.state, event.target.name, []);
    if (event.target.checked) {
      arr.push(event.target.value);
    } else {
      _pull(arr, event.target.value);
    }
    this.setState({
      applyFilter: true,
      [event.target.name]: [...arr],
    });
  };

  handleCategorySearch = (event) => {
    const searchValue = event.target.value;
    if (!_isEmpty(event.target.value)) {
      const categoryFilterData = this.state.categoryFilterDataTemp.filter((obj) => {
        return obj.label.toLowerCase().match(searchValue.toLowerCase());
      });
      this.setState({
        categoryFilterData,
      });
    }
  }

  handleCustomFilter = () => {
    const reqBody = mapProductSearchData({
      ...this.state,
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      pageNo: 1,
      pageType: 'seasonal',
    });
    this.setState({
      filtersEnabled: true,
      enableClearAll: true,
      applyFilter: false,
      pageNo: 1,
    });
    this.props.getBkmListSearchData(reqBody);
    this.props.getFiltersData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      category: this.state.category ? this.state.category.join('_') : 0,
      color: this.state.color ? this.state.color.join('_') : 0,
      farm: this.state.farm ? this.state.farm.join('_') : 0,
      location: this.state.location ? this.state.location.join('_') : 0,
      boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
      variety: this.state.variety ? this.state.variety.join('_') : 0,
      uom: this.state.uom ? this.state.uom.join('_') : 0,
      length: this.state.length ? this.state.length.join('_') : 0,
      grade: this.state.grade ? this.state.grade.join('_') : 0,
      pageType: 'seasonal',
    });
  };

  handleClearAll = () => {
    this.setState({
      filtersEnabled: false,
      enableClearAll: false,
      applyFilter: false,
      category: [],
      color: [],
      farm: [],
      location: [],
      boxType: [],
      variety: [],
      uom: [],
      length: [],
      grade: [],
      searchStartDate: undefined,
      searchEndDate: undefined,
      pageNo: 1,
      method: '?',
      methodUpdated: false,
      totalProductCount: 0,
      productDetails: [],
    }, () => {
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        pageType: 'seasonal',
        sort: this.state.sortValue,
        pageNo: 1,
      });
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.props.storeId,
        pageType: 'seasonal',
      });
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: moment(date).format('MM/DD/YYYY'),
    });
  };

  handleSearchClick = () => {
    this.setState({
      enableClearAll: true,
      listData: [],
      totalProductCount: 0,
      productDetails: [],
      deliveryDetails: [],
      displayData: [],
      dateObjectArray: [],
      pageNo: 1,
    });
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      sort: this.state.sortValue,
      pageType: 'seasonal',
      pageNo: 1,
      searchStartDate: this.state.searchStartDate,
      searchEndDate: this.state.searchEndDate,
    });
  };

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

  handleMoreDetailClick = (productId) => {
    this.setState({
      showMoreDetail: {
        ...this.state.showMoreDetail,
        [productId]: !_get(this.state.showMoreDetail, productId, false),
      },
      // productId,
    });
  };

  handleMoreAvailClick = (productId) => {
    this.setState({
      showMoreAvail: {
        ...this.state.showMoreAvail,
        [productId]: !_get(this.state.showMoreAvail, productId, false),
      },
    });
  }

  ProductSwitch = (event, index, pId) => {
    const datesArr = {};
    const dataTempAvail = _get(this.state.moreAvail, [pId, event]);
    dataTempAvail.forEach((o) => {
      datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
    });
    const dateObjectArray = [...this.state.dateObjectArray];
    const displayData = [...this.state.displayData];
    dateObjectArray[index] = datesArr;
    // eslint-disable-next-line prefer-destructuring
    displayData[index] = dataTempAvail[0];
    this.setState({
      displayData,
      dateObjectArray,
    });
  }

  resetMoreDetails = (date, index, pid) => {
    const dataTempAvail = _filter(this.state.deliveryDetails[index], [
      'delivery_date',
      date,
    ])[0];
    this.setState({
      displayData: { ...this.state.displayData, [index]: dataTempAvail },
      unitQty: { ...this.state.unitQty, [pid]: '' },
      totalAmount: { ...this.state.totalAmount, [pid]: 0 },
    });
  };

  handleViewClick = (viewType) => {
    this.setState({
      viewType,
    });
  };
  handleAddToWishlist = (productId) => {
    this.props.addToWhishlist({
      apiToken: this.props.apiToken,
      productId,
    });
  }

  handleAddToFavorites = (productId) => {
    this.props.addToFavorites({
      apiToken: this.props.apiToken,
      productId,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
    });
  }
  render() {
    return (
      <div>
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className="container">
          <div className='container-block'>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <ErrorBoundary>
                <FilterComponent
                  searchStartDate={this.state.searchStartDate}
                  searchEndDate={this.state.searchEndDate}
                  filterData={this.state.filters}
                  filtersEnabled={this.state.filtersEnabled}
                  enableClearAll={this.state.enableClearAll}
                  category={this.state.category}
                  color={this.state.color}
                  farm={this.state.farm}
                  location={this.state.location}
                  boxType={this.state.boxType}
                  variety={this.state.variety}
                  uom={this.state.uom}
                  length={this.state.length}
                  grade={this.state.grade}
                  apiToken={this.props.apiToken}
                  method={this.state.method}
                  categoryData={_get(this.state, 'categoryFilterData')}
                  colorsData={_get(this.state, 'filters.color')}
                  boxTypeData={_get(this.state, 'filters.box_type')}
                  varietyData={_get(this.state, 'filters.variety')}
                  unitsData={_get(this.state, 'filters.product_um')}
                  lengthData={_get(this.state, 'filters.length')}
                  gradeData={_get(this.state, 'filters.grade')}
                  farmsData={_get(this.state, 'filters.udropship_vendor')}
                  stateCityData={_get(this.state, 'filters.udropship_vendor_loc')}
                  shippingMethodsArrData={this.state.shippingMethodsArrData}
                  handleCategorySearch={this.handleCategorySearch}
                  handleFilterCheckBoxChange={this.handleFilterCheckBoxChange}
                  handleCustomFilter={this.handleCustomFilter}
                  handleClearAll={this.handleClearAll}
                  handleMethodChange={this.handleMethodChange}
                  handleDateChange={this.handleDateChange}
                  handleSearchClick={this.handleSearchClick}
                />
              </ErrorBoundary>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
              <ErrorBoundary>
                <InfiniteScroll
                  scrollThreshold={0.3}
                  dataLength={this.state.productDetails.length}
                  next={this.handleScrollInc}
                  hasMore={
                    this.state.productDetails.length < this.state.totalProductCount
                  }
                  loader={this.state.pageNo !== 1 &&
                    <span className="infinite-loader-class">
                      <img
                        src={lazyLoader}
                        alt="lazy-loader"
                      />
                    </span>
                  }
                >

                  <div className='shop-flowers-title'>
                    <h1>Fall Collection</h1>
                  </div>
                  <ListingComponent
                    {...this.state}
                    metaDesc={_get(this.props.bkmSearchData, 'products.meta_description')}
                    isLoading={this.props.isLoading}
                    apiToken={this.props.apiToken}
                    storeName={this.props.storeName}
                    handleInuputChange={this.handleInuputChange}
                    handleAddCartClick={this.handleAddCartClick}
                    sortingOrderClick={this.sortingOrderClick}
                    handleSortChange={this.handleSortChange}
                    handleCustomFilter={this.handleCustomFilter}
                    handleShowChangeStore={this.handleShowChangeStore}
                    handleMoreDetailClick={this.handleMoreDetailClick}
                    handleMoreAvailClick={this.handleMoreAvailClick}
                    ProductSwitch={this.ProductSwitch}
                    resetMoreDetails={this.resetMoreDetails}
                    handleViewClick={this.handleViewClick}
                    handleAddToFavorites={this.handleAddToFavorites}
                    handleAddToWishlist={this.handleAddToWishlist}
                  />
                </InfiniteScroll>
              </ErrorBoundary>
              <div className='display-item-count'>
                Items{' '}
                <span id='up'>
                  {this.state.productDetails && this.state.productDetails.length}
                </span>{' '}
                of <span id="pcount">{this.state.totalProductCount ? this.state.totalProductCount : 0}</span> total
          </div>
            </div>
            <ErrorBoundary>
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBkmListSearchData: data => dispatch(fetchBKMListingData(data)),
  addToCart: data => dispatch(postAddToCartData(data)),
  // getBkmCartData: data => dispatch(fetchCartData(data)),
  getFiltersData: data => dispatch(fetchFilterCategoryData(data)),
  addToFavorites: data => dispatch(fetchAddToFavsData(data)),
  addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
  showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
  updateCart: data => dispatch(updateCartData(data)),
  setCartType: data => dispatch(setCartTypeData(data)),
});

const mapStateToProps = (state) => {
  const {
    bkmReducer, loginReducer, cartReducer, myFavouritesReducer, wishListReducer,
  } = state;

  const {
    addCartResponseDetails,
    type,
    cartType,
    error: cartError,
  } = cartReducer || [];

  const {
    addToFavs,
    type: favouriteType,
    error: favouriteError,
  } = myFavouritesReducer || [];

  const {
    addToWishlist,
    type: wishlistType,
    error: wishlistError,
  } = wishListReducer || [];

  const {
    bkmCartData,
    bkmSearchData,
    filtersData,
    isFetching: isLoading,
    error: bkmError,
  } = bkmReducer || [];

  const {
    apiToken,
    currencyCode,
    storeId,
    loginData,
    user,
    storeName,
    zipcode,
    error: loginError,
    cartCount,
  } = loginReducer || [];

  const error = !_isEmpty(wishlistError) || _isError(wishlistError) || !_isEmpty(favouriteError) || _isError(favouriteError) || !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(cartError) || _isError(cartError) || !_isEmpty(bkmError) || _isError(bkmError);

  return {
    bkmCartData,
    bkmSearchData,
    isLoading,
    apiToken,
    currencyCode,
    storeId,
    filtersData,
    loginData,
    user,
    storeName,
    zipcode,
    addCartResponseDetails,
    type,
    addToFavs,
    favouriteType,
    addToWishlist,
    wishlistType,
    cartType,
    error,
    cartCount,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(FallCollectionContainer));
