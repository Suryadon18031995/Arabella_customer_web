import React, { Component } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import connect from 'react-redux/lib/connect/connect';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import ReOrderComponent from '../../components/MyAccount/ReOrderComponent.jsx';
import { fetchReOrderData } from '../../actions/myOrder';
import Loader from '../../components/Loader/Loader.jsx';
import { compareAndSortDates } from '../../helpers/commonUtil';
import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import { fetchAddToWishlistData } from '../../actions/wishList';
import { updateCartData, flushCartData, setCartId } from '../../actions/login';
import { mapAddToCartApiData } from '../../utils/commonMapper';
import { setCartTypeData, postAddToCartData, bulkAddToCartData, clearCartData, flushCartViewData } from '../../actions/cart';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class ReOrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: _get(this.props, 'history.location.state.orderNumber', this.props.orderId),
      totalAmount: {},
      dateObjectArray: [],
      blinkText: {},
      inputValid: {},
      showChangeStoreModal: false,
      selectedStoreId: undefined,
      // cartType: _get(this.props, 'cartType.cartType') ? _get(this.props, 'cartType.cartType') : undefined,
    };
  }

  handleBulkAddToCart = () => {
    const reorderBody = [];
    this.state.productDetails && this.state.productDetails.map((thisData, index) => {
      const deliveryData = this.state.displayData[index];
      const reqBody = mapAddToCartApiData({
        ...this.state,
        ...thisData,
        ...deliveryData,
        totalAmount: !_isEmpty(this.state.totalAmount) ? this.state.totalAmount[thisData.pid] : thisData.qty_ordered * deliveryData.total_price_currency,
        user: this.props.user,
        apiToken: this.props.apiToken,
        customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      });
      reorderBody.push(reqBody);
    });
    this.props.bulkAddToCart({ reorderBody });
  }

  // handleAddCartClick = (prodData, deliData) => {
  //   if ((_get(this.props, 'cartType') === 'normal') || (!_get(this.props, 'cartType')) {
  //     const reqBody = mapAddToCartApiData({
  //       ...this.state,
  //       ...prodData,
  //       ...deliData,
  //       totalAmount: !_isEmpty(this.state.totalAmount) ? this.state.totalAmount[prodData.pid] : prodData.qty_ordered * deliData.total_price_currency,
  //       user: this.props.user,
  //       apiToken: this.props.apiToken,
  //       customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
  //     });
  //     this.props.addToCart(reqBody);
  //   } else if (_get(this.props, 'cartType') === 'subscription') {
  //     alert('Subscription orders cannot be purchased in combination with single orders at this time. Please clear your cart before adding this product to your cart');
  //   }
  // }

  resetMoreDetails = (date, index) => {
    const dataTempAvail = _filter(this.state.deliveryDetails[index], [
      'delivery_date',
      date,
    ])[0];
    this.setState({
      displayData: { ...this.state.displayData, [index]: dataTempAvail },
    });
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
      unitQty: event.target.value,
      totalAmount,
      showMaxQtyAlert: flag,
      productId: prodData.pid,
      blinkText,
      inputValid,
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

  handleMethodChange = (event) => {
    if (event.target.name === 'store') {
      const selectedStoreName = _get(_find(_get(this.props.loginData, [0, 'result', 'store_list'], []), { 'store_id': event.target.value }), 'store_name');
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
        selectedStoreName,
      });
      this.props.flushCartData();
      this.props.flushCartViewData();
      this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
      //   this.props.getBkmListSearchData({
      //     currencyCode: this.props.currencyCode,
      //     apiToken: this.props.apiToken,
      //     storeId: event.target.value,
      //     sort: this.state.sortValue,
      //     pageNo: 1,
      //   });
    } else {
      //   this.props.getBkmListSearchData({
      //     currencyCode: this.props.currencyCode,
      //     apiToken: this.props.apiToken,
      //     storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      //     sort: this.state.sortValue,
      //     pageNo: 1,
      //     method: event.target.value === '?' ? '' : event.target.value,
      //   });
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

  handleMoreDetailClick = (productId) => {
    this.setState({
      showMoreDetail: {
        ...this.state.showMoreDetail,
        [productId]: !_get(this.state.showMoreDetail, productId, false),
      },
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
    displayData[index] = dataTempAvail[0];
    this.setState({
      displayData,
      dateObjectArray,
    });
  }

  handleAddToWishlist = (productId) => {
    this.props.addToWhishlist({
      apiToken: this.props.apiToken,
      productId,
    });
  }

  componentDidMount() {
    this.props.getReOrderData({ apiToken: this.props.apiToken, incrementId: this.state.orderId, pageNo: 1 });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEmpty(_get(nextProps, 'reorderData'))) {
      if (!_isEmpty(_get(nextProps, 'reorderData.status')) === true) {
        this.setState({ reOrderData: _get(nextProps, 'reorderData') });
        const detailsTemp = [];
        const deliveryDataTemp = [];
        const displayDataTemp = [];
        let listDataTemp = [];
        const datesArrayTemp = [];
        let moreAvail = {};
        let showMoreAvail = {};
        if (this.state.pageNo === 1) {
          const temp = _get(nextProps.reorderData, 'data');
          listDataTemp = [
            ...Object.keys(temp).map((value, key) => ({ [value]: temp[value] })),
          ];
        } else {
          const temp = _get(nextProps.reorderData, 'data');
          listDataTemp = [
            //   ...this.state.listData,
            ...Object.keys(temp).map((value, key) => ({ [value]: temp[value] })),
          ];
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
          productDetails: detailsTemp,
          deliveryDetails: deliveryDataTemp,
          displayData: displayDataTemp,
          filtersEnabled: false,
          dateObjectArray: datesArrayTemp,
          moreAvail,
          showMoreAvail,
        });
      }
    }
    if (!_isEmpty(nextProps.addToWishlist) && this.props.wishlistType === 'REQUEST_SUBMIT_ADD_TO_WISHLIST') {
      this.props.updateCart({ showWishlistCart: true });
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
    if (!_isEmpty(nextProps.bulkAddToCart) && this.props.type === 'REQUEST_BULK_ADD_TO_CART') {
      this.props.updateCart({ show: true });
      this.props.setCartType({ cartType: 'normal' });
    }
  }

  render() {
    if (_get(this, 'props.isLoading')) {
      return (
        <div className="container" style={{ minHeight: '500px' }}>
          <Loader />
        </div>
      );
    }
    if (!this.props.apiToken) {
      return <Redirect push to={{
        pathname: '/login',
      }} />;
    }
    return (
      <div className="container">
        <ErrorBoundary>
          <ReOrderComponent
            {...this.state}
            storeName={this.props.storeName}
            handleInuputChange={this.handleInuputChange}
            handleAddCartClick={this.handleAddCartClick}
            handleShowChangeStore={this.handleShowChangeStore}
            handleMoreDetailClick={this.handleMoreDetailClick}
            handleMoreAvailClick={this.handleMoreAvailClick}
            ProductSwitch={this.ProductSwitch}
            resetMoreDetails={this.resetMoreDetails}
            handleAddToWishlist={this.handleAddToWishlist}
            handleBulkAddToCart={this.handleBulkAddToCart}
            particularAddToCartClick={this.particularAddToCartClick}
          />
        </ErrorBoundary>
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getReOrderData: data => dispatch(fetchReOrderData(data)),
  addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
  updateCart: data => dispatch(updateCartData(data)),
  setCartType: data => dispatch(setCartTypeData(data)),
  addToCart: data => dispatch(postAddToCartData(data)),
  bulkAddToCart: data => dispatch(bulkAddToCartData(data)),
  clearCart: data => dispatch(clearCartData(data)),
  flushCartData: () => dispatch(flushCartData()),
  flushCartViewData: () => dispatch(flushCartViewData()),
  setCartId: data => dispatch(setCartId(data)),
});

const mapStateToProps = (state) => {
  const {
    loginReducer, myOrderReducer, wishListReducer, cartReducer,
  } = state;

  const {
    apiToken,
    cartId,
    currencyCode,
    storeName,
    storeId,
    loginData,
    error: loginError,
    cartCount,
  } = loginReducer || [];

  const {
    viewOrderData,
    orderId,
    reorderData,
    isFetching: isLoading,
    error: myOrderError,
  } = myOrderReducer || [];

  const {
    addToWishlist,
    type: wishlistType,
    error: wishlistError,
  } = wishListReducer || [];

  const {
    cartType,
    addCartResponseDetails,
    bulkCartData,
    error: cartError,
  } = cartReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(myOrderError) || _isError(myOrderError) || !_isEmpty(wishlistError) || _isError(wishlistError) || !_isEmpty(cartError) || _isError(cartError);

  return {
    apiToken,
    cartId,
    viewOrderData,
    addToWishlist,
    currencyCode,
    storeId,
    orderId,
    reorderData,
    storeName,
    loginData,
    isLoading,
    wishlistType,
    cartType,
    addCartResponseDetails,
    bulkCartData,
    error,
    cartCount,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ReOrderContainer));
