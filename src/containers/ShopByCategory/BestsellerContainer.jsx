import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import moment from 'moment';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import _values from 'lodash/values';
import _find from 'lodash/find';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import _pull from 'lodash/pull';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListingComponent from '../../components/BKMComponent/ListingComponent.jsx';
import FilterComponent from '../../components/BKMComponent/FilterComponent.jsx';
import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import {
  fetchBKMListingData,
  fetchFilterCategoryData,
} from '../../actions/bkm_listing';
import { postAddToCartData, setCartTypeData, flushCartViewData, clearCartData } from '../../actions/cart';
import {
  mapAddToCartApiData,
  mapProductSearchData,
} from '../../utils/commonMapper';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { fetchAddToWishlistData } from '../../actions/wishList';
import { receiveShowLoginModalData, updateCartData, setStoreId, flushCartData, setCartId } from '../../actions/login';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import { compareAndSortDates } from '../../helpers/commonUtil';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import lazyLoader from '../../assets/images/lazy-loader.gif';
import { fetchProductReviews } from '../../actions/products';
import { fetchProductVendorReviews } from '../../actions/vendorReviews';
import { sortDeliveryDates } from '../../utils/dateUtil';

class BestsellerContainer extends React.Component {
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
      colorsFilterData: [],
      colorsFilterDataTemp: [],
      farmsFilterData: [],
      farmsFilterDataTemp: [],
      stateCityFilterData: [],
      stateCityFilterDataTemp: [],
      boxTypeFilterData: [],
      boxTypeFilterDataTemp: [],
      varietyFilterData: [],
      varietyFilterDataTemp: [],
      uomFilterData: [],
      uomFilterDataTemp: [],
      lengthFilterData: [],
      lengthFilterDataTemp: [],
      gradeFilterData: [],
      gradeFilterDataTemp: [],
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
      applyFilter: false,
      method: '?',
      showMoreAvail: {},
      moreAvail: {},
      tabKey: 'info',
      farmInfo: undefined,
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
          name: 'BESTSELLERS COLLECTION',
        },
      ],
      // cartType: _get(this.props, 'cartType.cartType') ? _get(this.props, 'cartType.cartType') : undefined,
      catDescription: '',
      prevBkmData: {},
      productReviewData: [],
    };
  }

  UNSAFE_componentWillMount() {
    this.props.getFiltersData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      pageType: 'bseller',
    });
  }

  ratingsHover = (productId) => {
    this.setState({ productReviewData: [] }, () => this.props.getMyProductReviews({
      productId,
    }));
  }

  vendorRatingsHover = (vendorId) => {
    this.setState({ productVendorReviews: [] });
    this.props.getProductReviews({ vendorId });
  }

  componentDidMount() {
    document.title = window.location;
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      pageType: 'bseller',
      sort: this.state.sortValue,
      pageNo: 1,
      zipcode: _get(this.props, 'zipcode'),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.apiToken !== this.props.apiToken) {
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.props.storeId,
        pageType: 'bseller',
      });
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.props.storeId,
        pageType: 'bseller',
        sort: this.state.sortValue,
        pageNo: 1,
        zipcode: _get(this.props, 'zipcode'),
      });
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
        listData: [],
        deliveryDetails: [],
        displayData: [],
        dateObjectArray: [],
        shippingMethodsArrData: [],
        filters: {},
        categoryFilterData: [],
        categoryFilterDataTemp: [],
        colorsFilterData: [],
        colorsFilterDataTemp: [],
        farmsFilterData: [],
        farmsFilterDataTemp: [],
        stateCityFilterData: [],
        stateCityFilterDataTemp: [],
        boxTypeFilterData: [],
        boxTypeFilterDataTemp: [],
        varietyFilterData: [],
        varietyFilterDataTemp: [],
        uomFilterData: [],
        uomFilterDataTemp: [],
        lengthFilterData: [],
        lengthFilterDataTemp: [],
        gradeFilterData: [],
        gradeFilterDataTemp: [],
        prevBkmData: {},
      });
    }
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

      const colorsFilterData = _get(nextProps.filtersData, 'color') && Object.values(_get(nextProps.filtersData, 'color'));

      const farmsFilterData = _get(nextProps.filtersData, 'udropship_vendor') && Object.values(_get(nextProps.filtersData, 'udropship_vendor'));

      const stateCityFilterData = _get(nextProps.filtersData, 'udropship_vendor_loc') && Object.values(_get(nextProps.filtersData, 'udropship_vendor_loc'));

      const boxTypeFilterData = _get(nextProps.filtersData, 'box_type') && Object.values(_get(nextProps.filtersData, 'box_type'));

      const varietyFilterData = _get(nextProps.filtersData, 'variety') && Object.values(_get(nextProps.filtersData, 'variety'));

      const uomFilterData = _get(nextProps.filtersData, 'product_um') && Object.values(_get(nextProps.filtersData, 'product_um'));

      const lengthFilterData = _get(nextProps.filtersData, 'length') && Object.values(_get(nextProps.filtersData, 'length'));

      const gradeFilterData = _get(nextProps.filtersData, 'grade') && Object.values(_get(nextProps.filtersData, 'grade'));

      this.setState({
        shippingMethodsArrData: shippingMethodsData,
        filtersEnabled: false,
        filters: nextProps.filtersData,
        categoryFilterData,
        categoryFilterDataTemp: categoryFilterData,
        colorsFilterData,
        colorsFilterDataTemp: colorsFilterData,
        farmsFilterData,
        farmsFilterDataTemp: farmsFilterData,
        stateCityFilterData,
        stateCityFilterDataTemp: stateCityFilterData,
        boxTypeFilterData,
        boxTypeFilterDataTemp: boxTypeFilterData,
        varietyFilterData,
        varietyFilterDataTemp: varietyFilterData,
        uomFilterData,
        uomFilterDataTemp: uomFilterData,
        lengthFilterData,
        lengthFilterDataTemp: lengthFilterData,
        gradeFilterData,
        gradeFilterDataTemp: gradeFilterData,
      });
    }
    if (!_isEmpty(nextProps.bkmSearchData)) {
      if (JSON.stringify(_get(nextProps.bkmSearchData, 'products.result', {})) !== JSON.stringify(this.state.prevBkmData)) {
        const detailsTemp = [];
        const deliveryDataTemp = [];
        const displayDataTemp = [];
        let listDataTemp = [];
        const datesArrayTemp = [];
        let count = 0;
        let moreAvail = {};
        let showMoreAvail = {};
        let farmInfo;
        let temp = {};
        document.title = _get(nextProps.bkmSearchData, 'products.page_title') ? _get(nextProps.bkmSearchData, 'products.page_title') : 'Wholesale Best Selling Flowers online | Buy Top Selling Flowers';

        if (this.state.pageNo === 1 || this.state.filtersEnabled) {
          temp = _get(nextProps.bkmSearchData, 'products.result', {});
          listDataTemp = [
            ...Object.keys(temp).map((value, key) => ({ [value]: temp[value] })),
          ];
          count = _get(nextProps.bkmSearchData, 'products.product_count');
          farmInfo = _get(nextProps.bkmSearchData, 'products.farm');
        } else {
          temp = _get(nextProps.bkmSearchData, 'products.result', {});
          listDataTemp = [
            ...this.state.listData,
            ...Object.keys(temp).map((value, key) => ({ [value]: temp[value] })),
          ];
          count = _get(nextProps.bkmSearchData, 'products.product_count');
          farmInfo = _get(nextProps.bkmSearchData, 'products.farm');
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
            let sortedArray;
            if (val.delivery) {
              sortedArray = [...val.delivery];
              sortedArray.sort(sortDeliveryDates);
              deliveryDataTemp.push(_get(val, 'delivery'));
            }
            // val.delivery ? deliveryDataTemp.push(val.delivery) : '';
            deliveryDataTemp && deliveryDataTemp.map((val1, key1) => {
              val1.sort(compareAndSortDates);
              deliveryDataTemp[key1] = val1;
            });
            // !_isEmpty(val.delivery) && displayDataTemp.push(val.delivery[0]);
            if (!_isEmpty(_get(val, 'delivery'))) {
              displayDataTemp.push(sortedArray[0]);
            } else {
              displayDataTemp.push([]);
            }
            const datesArr = {};
            _filter(sortedArray).forEach((o) => {
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
          farmInfo,
          prevBkmData: temp,
          catDescription: _get(nextProps.bkmSearchData, 'products.cat_description'),
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
      // this.props.setCartType({ cartType: 'normal' });
    }
    if (!_isEmpty(nextProps.addToFavs) && this.props.favouriteType === 'REQUEST_ADD_TO_FAVORITES') {
      this.props.updateCart({ showFavsCart: true });
    }
    if (!_isEmpty(nextProps.addToWishlist) && this.props.wishlistType === 'REQUEST_SUBMIT_ADD_TO_WISHLIST') {
      this.props.updateCart({ showWishlistCart: true });
    }

    if (!_isEmpty(nextProps.productReviewData)) {
      this.setState({
        productReviewData: nextProps.productReviewData,
      });
    }

    if (!_isEmpty(_get(nextProps, 'productVendorReviews'))) {
      this.setState({
        productVendorReviews: _get(nextProps, 'productVendorReviews'),
      });
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
              pageType: 'bseller',
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
              pageNo: this.state.pageNo,
              method: this.state.method === '?' ? '' : this.state.method,
              pageType: 'bseller',
              category: this.state.category ? this.state.category.join('_') : 0,
              color: this.state.color ? this.state.color.join('_') : 0,
              farm: this.state.farm ? this.state.farm.join('_') : 0,
              location: this.state.location ? this.state.location.join('_') : 0,
              boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
              variety: this.state.variety ? this.state.variety.join('_') : 0,
              uom: this.state.uom ? this.state.uom.join('_') : 0,
              length: this.state.length ? this.state.length.join('_') : 0,
              grade: this.state.grade ? this.state.grade.join('_') : 0,
            });
          } else {
            const reqBody = mapProductSearchData({
              ...this.state,
              currencyCode: this.props.currencyCode,
              apiToken: this.props.apiToken,
              storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
              pageNo: this.state.pageNo,
              pageType: 'bseller',
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
        listData: [],
        totalProductCount: 0,
        productDetails: [],
        deliveryDetails: [],
        displayData: [],
        filtersEnabled: false,
        dateObjectArray: [],
        moreAvail: {},
        showMoreAvail: {},
        farmInfo: undefined,
        pageNo: 1,
        shippingMethodsArrData: [],
        filters: {},
        categoryFilterData: [],
        categoryFilterDataTemp: [],
        colorsFilterData: [],
        colorsFilterDataTemp: [],
        farmsFilterData: [],
        farmsFilterDataTemp: [],
        stateCityFilterData: [],
        stateCityFilterDataTemp: [],
        boxTypeFilterData: [],
        boxTypeFilterDataTemp: [],
        varietyFilterData: [],
        varietyFilterDataTemp: [],
        uomFilterData: [],
        uomFilterDataTemp: [],
        lengthFilterData: [],
        lengthFilterDataTemp: [],
        gradeFilterData: [],
        gradeFilterDataTemp: [],
        prevBkmData: {},
      });
      this.props.flushCartData();
      this.props.flushCartViewData();
      this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
      this.props.setStoreId({
        storeId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: event.target.value,
        pageType: 'bseller',
        sort: this.state.sortValue,
        pageNo: 1,
      });
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: event.target.value,
        pageType: 'bseller',
      });
    } else {
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        pageType: 'bseller',
        sort: this.state.sortValue,
        pageNo: 1,
        method: event.target.value === '?' ? '' : event.target.value,
        category: this.state.category ? this.state.category.join('_') : 0,
        color: this.state.color ? this.state.color.join('_') : 0,
        farm: this.state.farm ? this.state.farm.join('_') : 0,
        location: this.state.location ? this.state.location.join('_') : 0,
        boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
        variety: this.state.variety ? this.state.variety.join('_') : 0,
        uom: this.state.uom ? this.state.uom.join('_') : 0,
        length: this.state.length ? this.state.length.join('_') : 0,
        grade: this.state.grade ? this.state.grade.join('_') : 0,
      });
      // @ todo move to common mapper
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        method: event.target.value === '?' ? '' : event.target.value,
        category: this.state.category ? this.state.category.join('_') : 0,
        color: this.state.color ? this.state.color.join('_') : 0,
        farm: this.state.farm ? this.state.farm.join('_') : 0,
        location: this.state.location ? this.state.location.join('_') : 0,
        boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
        variety: this.state.variety ? this.state.variety.join('_') : 0,
        uom: this.state.uom ? this.state.uom.join('_') : 0,
        length: this.state.length ? this.state.length.join('_') : 0,
        grade: this.state.grade ? this.state.grade.join('_') : 0,
        pageType: 'bseller',
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
        shippingMethodsArrData: [],
        filters: {},
        categoryFilterData: [],
        categoryFilterDataTemp: [],
        colorsFilterData: [],
        colorsFilterDataTemp: [],
        farmsFilterData: [],
        farmsFilterDataTemp: [],
        stateCityFilterData: [],
        stateCityFilterDataTemp: [],
        boxTypeFilterData: [],
        boxTypeFilterDataTemp: [],
        varietyFilterData: [],
        varietyFilterDataTemp: [],
        uomFilterData: [],
        uomFilterDataTemp: [],
        lengthFilterData: [],
        lengthFilterDataTemp: [],
        gradeFilterData: [],
        gradeFilterDataTemp: [],
        prevBkmData: {},
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
      totalTemp = event.target.value * _get(deliData, 'total_price_currency');
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
  };

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
      pageType: 'bseller',
      pageNo: 1,
      sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
    });
    this.setState({
      showAscendSort: !this.state.showAscendSort,
      pageNo: 1,
      totalProductCount: 0,
      productDetails: [],
      prevBkmData: {},
    });
  };

  handleSortChange = (event) => {
    this.setState({
      sortValue: event.target.value,
      totalProductCount: 0,
      productDetails: [],
      pageNo: 1,
      prevBkmData: {},
    });
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      pageType: 'bseller',
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
    const searchType = event.target.name;
    if (!_isEmpty(event.target.value)) {
      switch (searchType) {
        case 'category': {
          const categoryFilterData = this.state.categoryFilterDataTemp.filter(obj =>
            obj.label.toLowerCase().match(searchValue.toLowerCase()));
          this.setState({
            categoryFilterData,
          });
          break;
        }
        case 'color':
          {
            const colorsFilterData = this.state.colorsFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              colorsFilterData,
            });
            break;
          }
        case 'farm':
          {
            const farmsFilterData = this.state.farmsFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              farmsFilterData,
            });
            break;
          }
        case 'location':
          {
            const stateCityFilterData = this.state.stateCityFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              stateCityFilterData,
            });
            break;
          }
        case 'boxType':
          {
            const boxTypeFilterData = this.state.boxTypeFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              boxTypeFilterData,
            });
            break;
          }
        case 'variety':
          {
            const varietyFilterData = this.state.varietyFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              varietyFilterData,
            });
            break;
          }
        case 'uom':
          {
            const uomFilterData = this.state.uomFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              uomFilterData,
            });
            break;
          }
        case 'length':
          {
            const lengthFilterData = this.state.lengthFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              lengthFilterData,
            });
            break;
          }
        case 'grade':
          {
            const gradeFilterData = this.state.gradeFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              gradeFilterData,
            });
            break;
          }
        default:
      }
    }
  }

  handleCustomFilter = () => {
    const reqBody = mapProductSearchData({
      ...this.state,
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      pageNo: 1,
      pageType: 'bseller',
    });
    this.setState({
      filtersEnabled: true,
      enableClearAll: true,
      applyFilter: false,
      pageNo: 1,
      tabKey: 'info',
      farmInfo: undefined,
      totalProductCount: 0,
      productDetails: [],
      listData: [],
      deliveryDetails: [],
      displayData: [],
      dateObjectArray: [],
      shippingMethodsArrData: [],
      filters: {},
      categoryFilterData: [],
      categoryFilterDataTemp: [],
      colorsFilterData: [],
      colorsFilterDataTemp: [],
      farmsFilterData: [],
      farmsFilterDataTemp: [],
      stateCityFilterData: [],
      stateCityFilterDataTemp: [],
      boxTypeFilterData: [],
      boxTypeFilterDataTemp: [],
      varietyFilterData: [],
      varietyFilterDataTemp: [],
      uomFilterData: [],
      uomFilterDataTemp: [],
      lengthFilterData: [],
      lengthFilterDataTemp: [],
      gradeFilterData: [],
      gradeFilterDataTemp: [],
      prevBkmData: {},
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
      pageType: 'bseller',
      method: this.state.method === '?' ? '' : this.state.method,
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
      listData: [],
      deliveryDetails: [],
      displayData: [],
      dateObjectArray: [],
      shippingMethodsArrData: [],
      filters: {},
      categoryFilterData: [],
      categoryFilterDataTemp: [],
      colorsFilterData: [],
      colorsFilterDataTemp: [],
      farmsFilterData: [],
      farmsFilterDataTemp: [],
      stateCityFilterData: [],
      stateCityFilterDataTemp: [],
      boxTypeFilterData: [],
      boxTypeFilterDataTemp: [],
      varietyFilterData: [],
      varietyFilterDataTemp: [],
      uomFilterData: [],
      uomFilterDataTemp: [],
      lengthFilterData: [],
      lengthFilterDataTemp: [],
      gradeFilterData: [],
      gradeFilterDataTemp: [],
      prevBkmData: {},
    }, () => {
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        pageType: 'bseller',
        sort: this.state.sortValue,
        pageNo: 1,
      });
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        pageType: 'bseller',
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
      prevBkmData: {},
    });
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      sort: this.state.sortValue,
      pageType: 'bseller',
      pageNo: 1,
      searchStartDate: this.state.searchStartDate,
      searchEndDate: this.state.searchEndDate,
      method: this.state.method === '?' ? '' : this.state.method,
      category: this.state.category ? this.state.category.join('_') : 0,
      color: this.state.color ? this.state.color.join('_') : 0,
      farm: this.state.farm ? this.state.farm.join('_') : 0,
      location: this.state.location ? this.state.location.join('_') : 0,
      boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
      variety: this.state.variety ? this.state.variety.join('_') : 0,
      uom: this.state.uom ? this.state.uom.join('_') : 0,
      length: this.state.length ? this.state.length.join('_') : 0,
      grade: this.state.grade ? this.state.grade.join('_') : 0,
    });
    this.props.getFiltersData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      method: this.state.method === '?' ? '' : this.state.method,
      category: this.state.category ? this.state.category.join('_') : 0,
      color: this.state.color ? this.state.color.join('_') : 0,
      farm: this.state.farm ? this.state.farm.join('_') : 0,
      location: this.state.location ? this.state.location.join('_') : 0,
      boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
      variety: this.state.variety ? this.state.variety.join('_') : 0,
      uom: this.state.uom ? this.state.uom.join('_') : 0,
      length: this.state.length ? this.state.length.join('_') : 0,
      grade: this.state.grade ? this.state.grade.join('_') : 0,
      pageType: 'bseller',
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

  setTabKey = key => this.setState({ tabKey: key });

  createMarkup = content => ({ __html: content });

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
                  colorsData={_get(this.state, 'colorsFilterData')}
                  boxTypeData={_get(this.state, 'boxTypeFilterData')}
                  varietyData={_get(this.state, 'varietyFilterData')}
                  unitsData={_get(this.state, 'uomFilterData')}
                  lengthData={_get(this.state, 'lengthFilterData')}
                  gradeData={_get(this.state, 'gradeFilterData')}
                  farmsData={_get(this.state, 'farmsFilterData')}
                  stateCityData={_get(this.state, 'stateCityFilterData')}
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
            <div className="col-lg-9 col-md-9 col-sm-6 col-xs-12">
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
                    <h1>Bestsellers Collection</h1>
                    {this.state.catDescription ?
                      <span className='fresh-deal-description' dangerouslySetInnerHTML={this.createMarkup(this.state.catDescription)}>
                        {/* {this.state.catDescription} */}
                      </span> : null}
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
                    setTabKey={this.setTabKey}
                    productReviewData={this.state.productReviewData}
                    ratingsHover={this.ratingsHover}
                    productVendorReviews={this.state.productVendorReviews}
                    vendorRatingsHover={this.vendorRatingsHover}
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
  setStoreId: data => dispatch(setStoreId(data)),
  flushCartData: () => dispatch(flushCartData()),
  flushCartViewData: () => dispatch(flushCartViewData()),
  clearCart: data => dispatch(clearCartData(data)),
  setCartId: data => dispatch(setCartId(data)),
  getMyProductReviews: data => dispatch(fetchProductReviews(data)),
  getProductReviews: data => dispatch(fetchProductVendorReviews(data)),
});

const mapStateToProps = (state) => {
  const {
    bkmReducer, loginReducer, cartReducer, myFavouritesReducer, wishListReducer, productReviewsReducer, vendorReviewsReducer,
  } = state;

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

  const {
    bkmCartData,
    bkmSearchData,
    filtersData,
    isFetching: isLoading,
    error: bkmError,
  } = bkmReducer || [];

  const {
    apiToken,
    cartId,
    currencyCode,
    storeId,
    loginData,
    user,
    storeName,
    zipcode,
    error: loginError,
    cartCount,
  } = loginReducer || [];

  const { productReviewsData: productReviewData } = productReviewsReducer || [];

  const { productVendorReviews } = vendorReviewsReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(addToFavError) || _isError(addToFavError) || !_isEmpty(addToWishlistError) || _isError(addToWishlistError) || !_isEmpty(addToCartError) || _isError(addToCartError) || !_isEmpty(bkmError) || _isError(bkmError);

  return {
    bkmCartData,
    bkmSearchData,
    isLoading,
    apiToken,
    cartId,
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
    productReviewData,
    productVendorReviews,
    cartCount,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(BestsellerContainer));
