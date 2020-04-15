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
import hosNetwork from '../../assets/svg/13.svg';
import medicine from '../../assets/svg/14.svg';
import labtest from '../../assets/svg/15.svg';
import gc from '../../assets/svg/16.svg';
import kids from '../../assets/svg/17.svg';
import diagnosis from '../../assets/svg/18.svg';
import test from '../../assets/svg/19.svg';
import carousel1 from  '../../assets/svg/12.svg';
import carousel2 from  '../../assets/svg/13.svg';
import carousel3 from  '../../assets/svg/14.svg';
import car from '../../assets/svg/10.svg';
import green2Blue from  '../../assets/svg/11.svg';

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
      responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
      redirectToRegistration: false,
      redirectToListing: false,
    };
  }

  componentDidMount() {
    document.title = 'Mediversal';
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
   

    return (
           <div>
                <div id="myCarousel" className="carousel slide caoroseldata" style={{backgroundImage: `url(${car})`}} data-ride="carousel" >
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                      <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                       <div className="item active row">
                           <div className="col-sm-6">
                               <img src={carousel1} style={{width:'100%',height:'410px',marginTop:'20px'}}/>
                          </div>
                       <div className="col-sm-6">
                           <div className="carousel-caption">
                          
                          </div>      
                        </div>
                    </div>
                    <div className="item  row">
                          <div className="col-sm-6">
                            <img src={carousel2} style={{width:'100%',height:'410px',marginTop:'20px'}}/>
                          </div>
                          <div className="col-sm-6">
                             <div className="carousel-caption">
                          
                             </div>      
                          </div>
                    </div>
                    <div className="item  row">
                        <div className="col-sm-6">
                           <img src={carousel3} style={{width:'100%',height:'410px',marginTop:'20px'}}/>
                       </div>
                         <div className="col-sm-6">
                        <div className="carousel-caption">
                          
                        </div>      
                      </div>
                    </div>
                  </div>
                  </div>
              
        <div className="row whiteSection">
                <div className="col-sm-7 text-box">
                <h2 className="f-45b">Our Hospital Networks</h2>
                <h4 className="f-25b">Landing Page</h4>
                <p className="f-16b">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua.</p>
              </div>
    	        <div className="col-sm-5">
	    	        <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={hosNetwork} />
	          </div>
        </div>
         
    <div className="row greenToBlue"  style={{backgroundImage: `url(${green2Blue})`}}>
    <div className="col-sm-5">
        <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={carousel1} />
      </div>
      <div className="col-sm-7 text-box">
        <h2 className="f-45w">Book Appointment</h2>
        <h4 className="f-25w">Landing Page</h4>
        <p className="f-16w">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      
    </div>
        <div className="row whiteSection"> 
        <a href="/catalog/category/view/s/pharma/id/896/">        
        <div className="col-sm-7 text-box">
            <h2 className="f-45b">Buy Medicine</h2>
            <h4 className="f-25b">Landing Page</h4>
            <p className="f-16b">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="col-sm-5">
            <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={medicine}/>
          </div>
          </a> 
        </div>
        <div className="row blueToGreen"  style={{backgroundImage: `url(${car})`}}>
        <a href="/catalog/category/view/s/lab-test/id/807/">   
        <div className="col-sm-5">
            <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={labtest} />
          </div>
          <div className="col-sm-7 text-box">
            <h2 className="f-45w">Book Lab Test</h2>
            <h4 className="f-25w">Landing Page</h4>
            <p className="f-16w">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          </a>
      </div>
      
   
    <div className="row whiteSection" >
      <a href="/catalog/category/view/s/geriatrics-care/id/808/">
        <div className="col-sm-7 text-box">
          <h2 className="f-45b">Geriatric Care</h2>
          <h4 className="f-25b">Landing Page</h4>
          <p className="f-16b">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="col-sm-5">
          <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={gc}/>
        </div>      
        
      </a>
      </div>
     
    <div className="row  greenToBlue" style={{backgroundImage: `url(${green2Blue})`}}>
      <div className="col-sm-5">
        <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={diagnosis}/>
      </div>
      <div className="col-sm-7 p-100">
        <h2 className="f-45w">Self Diagnosis</h2>
        <h4 className="f-25w">Landing Page</h4>
        <p className="f-16w">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
    <div className="row whiteSection">
        <div className="col-sm-7 text-box">
          <h2 className="f-45b">Special Needs for Kids</h2>
          <h4 className="f-25b">Landing Page</h4>
          <p className="f-16b">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="col-sm-5">
          <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={kids}/>
        </div>
      </div>
    <div className="row blueToGreen" style={{backgroundImage: `url(${car})`}}>  
      <a href="/Category/957">    
        <div className="col-sm-12 p-100">
           <center>
            <h2 className="f-45">About Us</h2>
            <span className="f-25w">Mediversal</span>
            <span className="f-16w">is a team of highly experienced Healthcare Experts, Management Professionals, Senior Doctors, Technicians.
            Nursing &amp; Support staffs who are best in their respective fields. Mediversal is commited to provide world class services in 
            affordable cost.</span>
          </center>
        </div>
       </a>
    </div>
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
