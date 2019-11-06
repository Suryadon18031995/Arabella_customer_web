import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _get from 'lodash/get';
import Redirect from 'react-router/Redirect';
import _filter from 'lodash/filter';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListingComponent from '../components/BKMComponent/ListingComponent.jsx';
import ChangeStoreModal from '../components/Common/ChangeStoreModal.jsx';
import { postAddToCartData, clearCartData, flushCartViewData } from '../actions/cart';
import { mapAddToCartApiData } from '../utils/commonMapper';
import { fetchAddToFavsData } from '../actions/myfavourites';
import { fetchAddToWishlistData } from '../actions/wishList';
import { receiveShowLoginModalData, flushCartData } from '../actions/login';
import { fetchPastPurchaseData } from '../actions/pastPurchase';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';
import lazyLoader from '../assets/images/lazy-loader.gif';

class PastPurchaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleBkmClick: false,
      unitQty: undefined,
      totalAmount: {},
      showMaxQtyAlert: false,
      productId: undefined,
      url: undefined,
      listData: {},
      productDetails: [],
      shippingMethodsArrData: [],
      deliveryDetails: [],
      displayData: [],
      moreAvailData: [],
      availId: undefined,
      pageNo: 1,
      totalProductCount: undefined,
      showAscendSort: true,
      color: undefined,
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
      categoryFilterData: [],
      categoryFilterDataTemp: [],
      orderValue: 'frq_order',
      pastPurchaseData: true,
      blinkText: {},
      inputValid: {},
    };
  }

  componentWillMount() {
    document.title = 'Past Purchase';
    this.props.getPastPurchaseData({
      apiToken: this.props.apiToken,
      orderType: this.state.orderValue,
      pageNo: this.state.pageNo,
      // storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEmpty(_get(nextProps.pastPurchaseData, 'data'))) {
      const detailsTemp = [];
      const deliveryDataTemp = [];
      const displayDataTemp = [];
      let listDataTemp = {};
      const moreAvailDataTemp = [];
      const datesArrayTemp = [];
      let count = 0;
      if (this.state.pageNo === 1) {
        listDataTemp = _get(nextProps.pastPurchaseData, 'data');
        count = _get(nextProps.pastPurchaseData, 'pcount');
      } else {
        listDataTemp = Object.assign(
          {},
          this.state.listData,
          _get(nextProps.pastPurchaseData, 'data'),
        );
        count = _get(nextProps.pastPurchaseData, 'pcount');
      }
      listDataTemp &&
        Object.entries(listDataTemp).map(([key, val]) => {
          detailsTemp.push(val.info);
          val.delivery ? deliveryDataTemp.push(val.delivery) : '';
          moreAvailDataTemp.push(val.more_avail);
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
        moreAvailData: moreAvailDataTemp,
        displayData: displayDataTemp,
        dateObjectArray: datesArrayTemp,
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
        (this.state.productDetails.length < this.state.totalProductCount) && this.props.getPastPurchaseData({
          apiToken: this.props.apiToken,
          orderType: this.state.orderValue,
          pageNo: this.state.pageNo,
          // storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        });
      },
    );
  };
  handleAddCartClick = (prodData, deliData) => {
    if (this.props.apiToken) {
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
    } else {
      this.props.showLoginModal({ show: true });
    }
  };
  sortingOrderClick = () => {
    this.props.getPastPurchaseData({
      apiToken: this.props.apiToken,
      orderType: this.state.orderValue,
      pageNo: this.state.pageNo,
      // storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
    });
  };
  showProductDetailPage = (productId, url) => {
    this.setState({
      redirectToDetailsPage: true,
      productId,
      url,
    });
  };
  handleMoreDetailClick = (productId) => {
    this.setState({
      showMoreDetail: {
        ...this.state.showMoreDetail,
        [productId]: !_get(this.state.showMoreDetail, productId, false),
      },
    });
  };
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
    });
  }
  handleMethodChange = (event) => {
    if (event.target.name === 'store') {
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
      });
      this.props.flushCartData();
      this.props.flushCartViewData();
      this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
      this.props.getPastPurchaseData({
        apiToken: this.props.apiToken,
        orderType: this.state.orderValue,
        pageNo: this.state.pageNo,
        // storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      });
    } else {
      this.props.getPastPurchaseData({
        apiToken: this.props.apiToken,
        orderType: this.state.orderValue,
        pageNo: this.state.pageNo,
        // storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        method: event.target.value,
      });
      this.setState({
        sortValue: event.target.value,
      });
    }
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

  handleSelectOrderOption = (event) => {
    this.setState({
      orderValue: event.target.value,
    });
    this.props.getPastPurchaseData({
      apiToken: this.props.apiToken,
      orderType: this.state.orderValue,
      pageNo: this.state.pageNo,
      // storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
    });
  }


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


  render() {
    if (this.state.redirectToDetailsPage) {
      return <Redirect push to={{
        pathname: `/${this.state.url}.html`,
        state: { productId: this.state.productId },
      }} />;
    }
    if (!this.props.apiToken) {
      return <Redirect push to={{
        pathname: '/login',
      }} />;
    }
    return (
      <div className="container past-purchase-container" style={{ width: '95%' }}>

        <div className="col-lg-12 col-md-12 col-sm-9" style={{ padding: '40px' }}>
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
                <h1>Your Past Purchase</h1>
              </div>
              <hr />
              {/* <div className="col-lg-3 col-md-3 col-sm-6"> */}
              <ul className="list-inline pp">
                <li><p>Sort by:</p></li>
                <li>
                  <select className="form-control dd" id="sortt" value={this.state.orderValue} onChange={this.handleSelectOrderOption}>
                    <option value="frq_order">Frequently Purchased</option>
                    <option value="recent_order">Recently Purchased</option>
                  </select>
                </li>
              </ul>
              {/* </div> */}
              {/* <div className="display-item-count">
                  Items{' '}
                  <span id="up">
                    {this.state.productDetails && this.state.productDetails.length}
                  </span>{' '}
                  of <span id="pcount">{this.state.totalProductCount ? this.state.totalProductCount : 0}</span> total
                </div> */}
              <ListingComponent
                {...this.state}
                pastPurchaseData={this.state.pastPurchaseData}
                isLoading={this.props.isLoading}
                apiToken={this.props.apiToken}
                handleInuputChange={this.handleInuputChange}
                handleAddCartClick={this.handleAddCartClick}
                sortingOrderClick={this.sortingOrderClick}
                handleSortChange={this.handleSortChange}
                handleCustomFilter={this.handleCustomFilter}
                showProductDetailPage={this.showProductDetailPage}
                handleShowChangeStore={this.handleShowChangeStore}
                handleMoreDetailClick={this.handleMoreDetailClick}
                resetMoreDetails={this.resetMoreDetails}
                handleViewClick={this.handleViewClick}
                handleAddToFavorites={this.handleAddToFavorites}
                handleAddToWishlist={this.handleAddToWishlist}
              />
            </InfiniteScroll>
          </ErrorBoundary>
          <div className="display-item-count">
            Items{' '}
            <span id="up">
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPastPurchaseData: data => dispatch(fetchPastPurchaseData(data)),
  addToCart: data => dispatch(postAddToCartData(data)),
  addToFavorites: data => dispatch(fetchAddToFavsData(data)),
  addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
  showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
  clearCart: data => dispatch(clearCartData(data)),
  flushCartData: () => dispatch(flushCartData()),
  flushCartViewData: () => dispatch(flushCartViewData()),
});

const mapStateToProps = (state) => {
  const { pastPurchaseReducer, loginReducer } = state;

  const {
    pastPurchaseData,
    isFetching: isLoading,
    error: pastPurchaseError,
  } = pastPurchaseReducer || [];

  const {
    apiToken,
    cartId,
    currencyCode,
    storeId,
    loginData,
    user,
    error: loginError,
  } = loginReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(pastPurchaseError) || _isError(pastPurchaseError);

  return {
    currencyCode,
    cartId,
    storeId,
    loginData,
    user,
    apiToken,
    isLoading,
    pastPurchaseData,
    error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(PastPurchaseContainer));
