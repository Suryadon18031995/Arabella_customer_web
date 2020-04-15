import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import { Link } from 'react-router-dom';
import Redirect from 'react-router/Redirect';
import MetaTags from 'react-meta-tags';
import HomeComponent from '../../components/BKMComponent/HomeComponent.jsx';
import HomeFooterContentComponent from '../../components/BKMComponent/HomeFooterContentComponent.jsx';
import HomeWholeSaleComponent from '../../components/BKMComponent/HomeWholeSaleComponent.jsx';
import HomeContentComponent from '../../components/BKMComponent/HomeContentComponent.jsx';
import { requestUserLogout } from '../../actions/login';
import { fetchHomePageNewArrivalsProducts, fetchHomePageNewArrivalsSPProducts, fetchHomePageFreshDealsProducts, fetchHomePageFreshDealsSPProducts, fetchHomePageBestSellerProducts, fetchHomePageBestSellerSPProducts } from '../../actions/bkm_listing';
import { customLoader as CustomLoader } from '../../components/Loader/Loader.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import artistBanner from '../../assets/images/artist_banner.png';
import logoIcon from '../../assets/images/LOGO.png';
import navBarIcon from '../../assets/images/navbar-icon-three.png';
import arrowIcon from '../../assets/images/aRROW.png';
import joinHandsIcon from '../../assets/images/Banner-9.png';
import banner11 from '../../assets/images/Banner-11.png';
import banner12 from '../../assets/images/Banner-12.png';
import banner13 from '../../assets/images/Banner-13.png';
import banner14 from '../../assets/images/Banner-14.png';
import labtest from  '../../assets/svg/15.svg';

class HomePageOne extends React.Component {
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
      responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
      redirectToRegistration: false,
      redirectToListing: false,
    };
  }

  componentDidMount() {
    document.title = 'Artist Marketplace';
    const lessThanOneDayAgo = (date) => {
      const DAY = 1000 * 60 * 60 * 24; // 24 hours login time
      const oneDayBefore = Date.now() - DAY;
      return date < oneDayBefore;
    };
    if (this.props.apiToken && this.props.lastUpdatedToken && lessThanOneDayAgo(this.props.lastUpdatedToken)) {
      this.props.getLogoutData();
    }

    // New Arrivals  
    // this.props.getBkmListSearchData({
    //   currencyCode: this.props.currencyCode,
    //   apiToken: this.props.apiToken,
    //   storeId: this.props.storeId,
    //   pageType: 'newarrival',
    //   sort: this.state.sortValue,
    //   pageNo: 1,
    //   zipcode: _get(this.props, 'zipcode'),
    // });

    // this.props.getBkmNewArrivalsSPSearchData({
    //   currencyCode: this.props.currencyCode,
    //   apiToken: this.props.apiToken,
    //   storeId: this.props.storeId,
    //   pageType: 'newarrival',
    //   sort: this.state.sortValue,
    //   pageNo: 2,
    //   zipcode: _get(this.props, 'zipcode'),
    // });

    // New Arrivals

    // Best Seller

    // this.props.getBkmBestSellerSearchData({
    //   currencyCode: this.props.currencyCode,
    //   apiToken: this.props.apiToken,
    //   storeId: this.props.storeId,
    //   pageType: 'bseller',
    //   sort: this.state.sortValue,
    //   pageNo: 1,
    //   zipcode: _get(this.props, 'zipcode'),
    // });

    // this.props.getBkmBestSellerSPSearchData({
    //   currencyCode: this.props.currencyCode,
    //   apiToken: this.props.apiToken,
    //   storeId: this.props.storeId,
    //   pageType: 'bseller',
    //   sort: this.state.sortValue,
    //   pageNo: 2,
    //   zipcode: _get(this.props, 'zipcode'),
    // });

    // Best Seller

    // Fresh Deals

    // this.props.getBkmFreshDealsSearchData({
    //   currencyCode: this.props.currencyCode,
    //   apiToken: this.props.apiToken,
    //   storeId: this.props.storeId,
    //   deals: 'true',
    //   sort: this.state.sortValue,
    //   pageNo: 1,
    //   zipcode: _get(this.props, 'zipcode'),
    // });

   
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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

handleSignUp = () => this.setState({ redirectToRegistration: true });

handleListingRedirect = () => this.setState({ redirectToListing: true });

  render() {
    if (this.state.redirectToRegistration) {
        return (
          <Redirect to='/vendor-registration'/>
        );
    }

    if (this.state.redirectToListing) {
      return (
        <Redirect to='/listing-products'/>
      );
  }

    return (
      <div>       
                <div className="row greySection">
                    <div className="col-sm-7 text-box">
                      <h2 className="f-45b">Book Lab Test</h2>
                      <h4 className="f-25b">Landing Page</h4>
                      <p className="f-16b">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="col-sm-5">
                      <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={labtest} />
                    </div>
                </div> 
                <div className="container">
                  <br/>
                    <div className="row">
                      <div className="col-xs-11 col-md-10 col-centered">

                        <div id="carousel" className="carousel slide" data-ride="carousel" data-type="multi" data-interval="5000">
                          <div className="carousel-inner">
                            <div className="item active">
                              <div className="carousel-col">
                                <div className="block">
                                <div style={{padding:'10px'}}>
                                  <p>Thyroid Profile (T3 T4 TSH)</p>
                                  <br/>
                                   Known as Thryroid Profile
                                   <br/>
                                   Total Blood
                                   <br/>
                                   <br/>
                                   Rs 400
                                   </div>
                                   <p style={{marginBottom:'0px'}}>
                                      <button className="btn btn-primary button-css">Add</button>
                                    </p>
                                </div>
                              </div>
                            </div>
                            <div className="item active">
                              <div className="carousel-col">
                              <div className="block">
                                <div style={{padding:'10px'}}>
                                  <p>Complete Blood Count</p>
                                  <br/>
                                   Known as Complete Blood
                                   <br/>
                                   Count Automated Blood
                                   <br/>
                                   <br/>
                                   Rs 400
                                   </div>
                                   <p style={{marginBottom:'0px'}}>
                                      <button className="btn btn-primary button-css">Add</button>
                                    </p>
                                </div>
                              </div>
                            </div>
                            <div className="item active">
                              <div className="carousel-col">
                              <div className="block">
                                <div style={{padding:'10px'}}>
                                  <p>Lipid Profile</p>
                                  <br/>
                                   Known as Lipid Profile
                                   <br/>
                                    Blood
                                   <br/>
                                   <br/>
                                   Rs 400
                                   </div>
                                   <p style={{marginBottom:'0px'}}>
                                      <button className="btn btn-primary button-css">Add</button>
                                    </p>
                                </div>
                              </div>
                            </div>
                            <div className="item active">
                              <div className="carousel-col">
                              <div className="block">
                                <div style={{padding:'10px'}}>
                                  <p>Liver Function Test</p>
                                  <br/>
                                   Known as Liver Function
                                   <br/>
                                   Tests Blood
                                   <br/>
                                   <br/>
                                   Rs 400
                                   </div>
                                   <p style={{marginBottom:'0px'}}>
                                      <button className="btn btn-primary button-css">Add</button>
                                    </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="left carousel-control">
                            <a href="#carousel" role="button" data-slide="prev">
                              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                              <span className="sr-only">Previous</span>
                            </a>
                          </div>
                          <div className="right carousel-control">
                            <a href="#carousel" role="button" data-slide="next">
                              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                              <span className="sr-only">Next</span>
                            </a>
                          </div>
                        </div>

                      </div>
                    </div>
                  <br/>
                  </div>
                  <div className="divider">
                  <center>Shop by Health Concern&nbsp;</center>
                </div>
              <div className="container">
                <div className="row whiteSection" style={{paddingTop: '38px'}}>
                  <div className="col-xs-11 col-md-10 col-centered">

                    <div id="carousel1" className="carousel slide" data-ride="carousel" data-type="multi" data-interval="10000">
                      <div className="carousel-inner">
                        <div className="item active">
                          <div className="carousel-col">
                            <div className="block1">
                            <div style={{padding:'10px'}}>
                                          <p>Healthians Full Body
                                          <br/>
                                          Checkup With Thyroid
                                          <br/>
                                          And CBC
                                          <br/>
                                          <br/>
                                          Includes: 74 Parameters 
                                          <br/><br/>
                                          Blood Glucose Fasting
                                          <br/>
                                          Blood Glucose Fasting
                                          <br/>
                                          Blood Glucose Fasting
                                          <br/><br/>

                                          >> KNOW MORE
                                          </p>
                                          <br/>
                                   </div>
                                   
                                   <p style={{marginBottom:'0px'}}>
                                   <button className="btn btn-primary button-css">Add</button>
                                    </p>
                            </div>
                          </div>
                        </div>
                        <div className="item active">
                          <div className="carousel-col">
                            <div className="block1">
                            <div style={{padding:'10px'}}>
                                          <p>Healthians Full Body
                                          <br/>
                                          Checkup With Thyroid
                                          <br/>
                                          And CBC
                                          <br/>
                                          <br/>
                                          Includes: 74 Parameters 
                                          <br/><br/>
                                          Blood Glucose Fasting
                                          <br/>
                                          Blood Glucose Fasting
                                          <br/>
                                          Blood Glucose Fasting
                                          <br/><br/>

                                          >> KNOW MORE
                                          </p>
                                          <br/>
                                   </div>
                                   
                                   <p style={{marginBottom:'0px'}}>
                                   <button className="btn btn-primary button-css">Add</button>
                                    </p>
                            </div>
                          </div>
                        </div>
                        <div className="item active">
                          <div className="carousel-col">
                            <div className="block1">
                            <div style={{padding:'10px'}}>
                                          <p>Healthians Full Body
                                          <br/>
                                          Checkup With Thyroid
                                          <br/>
                                          And CBC
                                          <br/>
                                          <br/>
                                          Includes: 74 Parameters 
                                          <br/><br/>
                                          Blood Glucose Fasting
                                          <br/>
                                          Blood Glucose Fasting
                                          <br/>
                                          Blood Glucose Fasting
                                          <br/><br/>

                                          >> KNOW MORE
                                          </p>
                                          <br/>
                                   </div>
                                   
                                   <p style={{marginBottom:'0px'}}>
                                   <button className="btn btn-primary button-css">Add</button>
                                    </p>
                            </div>
                          </div>
                        </div>
                        <div className="item active">
                          <div className="carousel-col">
                            <div className="block1">
                            <div style={{padding:'10px'}}>
                                          <p>Healthians Full Body
                                          <br/>
                                          Checkup With Thyroid
                                          <br/>
                                          And CBC
                                          <br/>
                                          <br/>
                                          Includes: 74 Parameters 
                                          <br/><br/>
                                          Blood Glucose Fasting
                                          <br/>
                                          Blood Glucose Fasting
                                          <br/>
                                          Blood Glucose Fasting
                                          <br/><br/>

                                          >> KNOW MORE
                                          </p>
                                          <br/>
                                   </div>
                                   
                                   <p style={{marginBottom:'0px'}}>
                                   <button className="btn btn-primary button-css">Add</button>
                                    </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="left carousel-control">
                        <a href="#carousel1" role="button" data-slide="prev">
                          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                          <span className="sr-only">Previous</span>
                        </a>
                      </div>
                      <div className="right carousel-control">
                        <a href="#carousel1" role="button" data-slide="next">
                          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                          <span className="sr-only">Next</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <hr className="blue-hr"></hr>
                

        
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
)(ErrorHandler(HomePageOne));
