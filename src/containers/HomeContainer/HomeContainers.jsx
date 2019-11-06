import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import HomeComponent from '../../components/BKMComponent/HomeComponent.jsx';
import HomeFooterContentComponent from '../../components/BKMComponent/HomeFooterContentComponent.jsx';
import HomeWholeSaleComponent from '../../components/BKMComponent/HomeWholeSaleComponent.jsx';
import HomeContentComponent from '../../components/BKMComponent/HomeContentComponent.jsx';
import { requestUserLogout } from '../../actions/login';
import '../../assets/stylesheets/homePage.css';
import { fetchHomePageNewArrivalsProducts, fetchHomePageNewArrivalsSPProducts, fetchHomePageFreshDealsProducts, fetchHomePageFreshDealsSPProducts, fetchHomePageBestSellerProducts, fetchHomePageBestSellerSPProducts } from '../../actions/bkm_listing';
import { customLoader as CustomLoader } from '../../components/Loader/Loader.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: 'index',
      childrenNA: [],
      childrenBS: [],
      childrenFD: [],
      activeItemIndexNA: 0,
      activeItemIndexBS: 0,
      activeItemIndexFD: 0,
      responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } }
    };
  }

  componentDidMount() {
    document.title = 'Wholesale Flowers, Bulk Fresh Flowers | Bloomkonnect.com';
    const lessThanOneDayAgo = (date) => {
      const DAY = 1000 * 60 * 60 * 24; // 24 hours login time
      const oneDayBefore = Date.now() - DAY;
      return date < oneDayBefore;
    };
    if (this.props.apiToken && this.props.lastUpdatedToken && lessThanOneDayAgo(this.props.lastUpdatedToken)) {
      this.props.getLogoutData();
    }

    // New Arrivals  
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      pageType: 'newarrival',
      sort: this.state.sortValue,
      pageNo: 1,
      zipcode: _get(this.props, 'zipcode'),
    });

    this.props.getBkmNewArrivalsSPSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      pageType: 'newarrival',
      sort: this.state.sortValue,
      pageNo: 2,
      zipcode: _get(this.props, 'zipcode'),
    });

    // New Arrivals

    // Best Seller

    this.props.getBkmBestSellerSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      pageType: 'bseller',
      sort: this.state.sortValue,
      pageNo: 1,
      zipcode: _get(this.props, 'zipcode'),
    });

    this.props.getBkmBestSellerSPSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      pageType: 'bseller',
      sort: this.state.sortValue,
      pageNo: 2,
      zipcode: _get(this.props, 'zipcode'),
    });

    // Best Seller

    // Fresh Deals

    this.props.getBkmFreshDealsSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      deals: 'true',
      sort: this.state.sortValue,
      pageNo: 1,
      zipcode: _get(this.props, 'zipcode'),
    });

    this.props.getBkmFreshDealsSPSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      deals: 'true',
      sort: this.state.sortValue,
      pageNo: 2,
      zipcode: _get(this.props, 'zipcode'),
    });
    // Fresh Deals
  }

  populateArray = (nextProps, type, childrenProducts) => {
    const products = [...childrenProducts];

    if (!_isEmpty(_get(nextProps, type))) {
      const bkmSearchData = _get(nextProps, type);

      if (_get(bkmSearchData, 'products.status')) {
        const bkmSearchResult = _get(bkmSearchData, 'products.result');

        // eslint-disable-next-line no-restricted-syntax
        for (let productKey in bkmSearchResult) {
          if (bkmSearchResult.hasOwnProperty(productKey)) {
            products.push({
              name: bkmSearchResult[productKey]['info']['name'],
              image: bkmSearchResult[productKey]['info']['image'],
              url_key: bkmSearchResult[productKey]['info']['url_key'],
              productId: bkmSearchResult[productKey]['info']['pid'],
            });
          }
        }
      }
    }

    return products;
  }

  componentWillReceiveProps(nextProps) {
    let newArrivals, freshDeals, bestSellers;

    newArrivals = this.populateArray(nextProps, 'newArrivalsSearchData', []);
    newArrivals = this.populateArray(nextProps, 'newArrivalsSPSearchData', newArrivals);

    freshDeals = this.populateArray(nextProps, 'freshDealsSearchData', []);
    freshDeals = this.populateArray(nextProps, 'freshDealsSPSearchData', freshDeals);

    bestSellers = this.populateArray(nextProps, 'bestSellerSearchData', []);
    bestSellers = this.populateArray(nextProps, 'bestSellerSPSearchData', bestSellers);

    this.setState({
      childrenNA: this.createChildren(newArrivals),
      childrenBS: this.createChildren(bestSellers),
      childrenFD: this.createChildren(freshDeals),
    });
  }

  createChildren = products => products.map(element =>
    <Link key={element.productId}
      to={{
        // pathname: `/${element.url_key}#${element.productId}`,
        pathname: `/${element.url_key}.html`, // hash: element.productId,
        // state: { productId: element.productId },
      }}
    >
      <div key={element.productId} className="carouselParentDiv">
        <div className="carouselImgDiv">
          <img src={element.image} className="carouselImg" style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
        <div className="carouselTextDiv">
          <div className="product-name product-name-resp">
            <span>{element.name}</span>
          </div>
          <div className="add-to-cart">
            <span className="btn btn-cart">ADD TO CART</span>
          </div>
        </div>
      </div>
    </Link>);

  render() {
    const {
      activeItemIndexNA,
      activeItemIndexBS,
      activeItemIndexFD,
      childrenNA,
      childrenBS,
      childrenFD,
      responsive
    } = this.state;

    let checkBSLoading;

    if (_get(this, 'props.isLoading')) {
      checkBSLoading = (
        <div>
          <CustomLoader />
          <CustomLoader />
          <CustomLoader />
        </div>
      );
    } else {
      checkBSLoading = (
        <div>
          <HomeContentComponent
            rowTitle="FRESH DEALS"
            children={this.state.childrenFD}
            responsive={this.state.responsive}
          />
          <HomeContentComponent
            rowTitle="NEW ARRIVALS"
            children={this.state.childrenNA}
            responsive={this.state.responsive}
          />
          <HomeContentComponent
            rowTitle="BEST SELLERS"
            children={this.state.childrenBS}
            responsive={this.state.responsive}
          />
        </div>
      );
    }

    return (
      <div className="container-fluid no-padding">
        <MetaTags>
          {/* 
            <title>Page 1</title> 
            */}
          <meta name="description" content="BloomKonnect’s global marketplace offering a wide selection of fresh flowers from farms around the world with supply-chain sources globally to deliver flowers to the US and Singapore." />
        </MetaTags>
        <ErrorBoundary>
          <HomeComponent />
          <div className="main-prod">
            <HomeWholeSaleComponent />
          </div>
          <div className="main-prod">
            {checkBSLoading}
          </div>
          <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding">
            <HomeFooterContentComponent />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogoutData: () => dispatch(requestUserLogout()),

  // New Arrivals
  getBkmListSearchData: data => dispatch(fetchHomePageNewArrivalsProducts(data)),
  getBkmNewArrivalsSPSearchData: data => dispatch(fetchHomePageNewArrivalsSPProducts(data)),

  // Fresh Deals
  getBkmFreshDealsSearchData: data => dispatch(fetchHomePageFreshDealsProducts(data)),
  getBkmFreshDealsSPSearchData: data => dispatch(fetchHomePageFreshDealsSPProducts(data)),

  // Best Seller
  getBkmBestSellerSearchData: data => dispatch(fetchHomePageBestSellerProducts(data)),
  getBkmBestSellerSPSearchData: data => dispatch(fetchHomePageBestSellerSPProducts(data)),
});

const mapStateToProps = (state) => {
  const { bkmReducer, loginReducer } = state;

  const {
    newArrivalsSearchData,
    freshDealsSearchData,
    bestSellerSearchData,
    newArrivalsSPSearchData,
    freshDealsSPSearchData,
    bestSellerSPSearchData,
    isFetching: isLoading,
    error: bkmError,
  } = bkmReducer || [];

  const {
    apiToken,
    lastUpdatedToken,
    currencyCode,
    storeId,
    zipcode,
    error: loginError,
  } = loginReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(bkmError) || _isError(bkmError);

  return {
    apiToken,
    lastUpdatedToken,
    currencyCode,
    storeId,
    zipcode,
    newArrivalsSearchData,
    freshDealsSearchData,
    bestSellerSearchData,
    newArrivalsSPSearchData,
    freshDealsSPSearchData,
    bestSellerSPSearchData,
    isLoading,
    error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(HomeContainer));
