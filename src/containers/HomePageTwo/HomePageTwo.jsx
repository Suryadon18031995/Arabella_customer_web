import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import { Link } from 'react-router-dom';
import Redirect from 'react-router/Redirect';
import MetaTags from 'react-meta-tags';
import AliceCarousel from 'react-alice-carousel';
import HomeComponent from '../../components/BKMComponent/HomeComponent.jsx';
import HomeFooterContentComponent from '../../components/BKMComponent/HomeFooterContentComponent.jsx';
import HomeWholeSaleComponent from '../../components/BKMComponent/HomeWholeSaleComponent.jsx';
import HomeContentComponent from '../../components/BKMComponent/HomeContentComponent.jsx';
import { requestUserLogout } from '../../actions/login';
import { fetchHomePageNewArrivalsProducts, fetchHomePageNewArrivalsSPProducts, fetchHomePageFreshDealsProducts, fetchHomePageFreshDealsSPProducts, fetchHomePageBestSellerProducts, fetchHomePageBestSellerSPProducts } from '../../actions/bkm_listing';
import { fetchLabTestimonials, fetchLabSHCData } from '../../actions/labTest';
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
      testimonialData:[],
      labTestShopHC:[],
      activeItemIndexNA: 0,
      activeItemIndexBS: 0,
      activeItemIndexFD: 0,
      responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
      redirectToRegistration: false,
      redirectToListing: false,
      currentIndex: 0,
      itemsInSlide: 1,
      currentIndex1: 0,
      itemsInSlide1: 1,
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

    this.props.getLabTestimonials();
    this.props.getLabShopByHC();
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
    console.log(nextProps);
     
    if(!_isEmpty(nextProps.labTestimonials))
   {
     if(nextProps.labTestimonials.code === 1)
     {
      const testimonialData= _get(nextProps.labTestimonials, `result.data`);
      if(testimonialData != null)
      {
       this.setState({
        children: this.createTestimonialChildren({ testimonialData }),
       });
      }
     }
   
   }
   if(!_isEmpty(nextProps.labSHCData))
   {
     if(nextProps.labSHCData.code === 1)
     {
      const labTestShopHC= _get(nextProps.labSHCData, `result.data`);
      if(labTestShopHC != null)
      {
       this.setState({
        hchildren: this.createSHCChildren({ labTestShopHC }),
       });
      }
     }
   
   }
  }

  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide;
    this.setState({ currentIndex })
  }
 
  slideNextPage = () => {
    const {
      itemsInSlide,
      children: { length },
    } = this.state
    let currentIndex = this.state.currentIndex + itemsInSlide
    if (currentIndex > length) currentIndex = length
 
    this.setState({ currentIndex })
  }

  slidePrevPage1 = () => {
    const currentIndex1 = this.state.currentIndex1 - this.state.itemsInSlide1;
    this.setState({ currentIndex1 })
  }
 
  slideNextPage1 = () => {
    const {
      itemsInSlide1,
      hchildren: { length },
    } = this.state
    let currentIndex1 = this.state.currentIndex1 + itemsInSlide1
    if (currentIndex1 > length) currentIndex1 = length
 
    this.setState({ currentIndex1 })
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

createTestimonialChildren = ({ testimonialData }) => Object.keys(testimonialData).map(i =>
 
                      <div key={i} style={{height: '190px',border: '3px solid #0087b0',width:'250px',position:'relative'}}>
                                <div style={{padding:'25px'}}>
                                  <p><b>{_get(testimonialData[i], 'name')}</b></p>
                                  <br/>
                                   <br/>
                                   <b>Price:</b>{_get(testimonialData[i], 'price')}
                                   </div>
                                   <div style={{borderTop: '0px'}}> 
                                      <a className="button-css" href={`/Lab-Test-Product-Details/${_get(testimonialData[i], 'id')}`}>Add</a>
                                   </div>
                                </div>
 );


 createSHCChildren = ({ labTestShopHC }) => Object.keys(labTestShopHC).map(i =>
 
               <div key={i} style={{height: '220px',border: '3px solid #0087b0',width:'250px',position:'relative'}}>
                            <div style={{padding:'25px'}}>
                                          <p><b>{_get(labTestShopHC[i], 'name')}</b>
                                         
                                          <br/><br/>
                                          <b>Price:</b>{_get(labTestShopHC[i], 'price')}

                                          <br/><br/><br/>
                                          <a style={{color:'black'}} href={`/Lab-Test-Product-Details/${_get(labTestShopHC[i], 'id')}`}>>> KNOW MORE</a>
                                          </p>
                                          <br/>
                                   </div>
                                   
                                   <div style={{borderTop: '0px'}}>  
                                   <a className="button-css"  href={`/Lab-Test-Product-Details/${_get(labTestShopHC[i], 'id')}`}>Add</a>
                                   </div>
                            </div>
);
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

  console.log(this.state.testimonialData);
  console.log(this.state.labTestShopHC);

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
                  <br/>
                  <div className="row">
                    <div className="col-sm-1" style={{paddingTop:'60px'}}>
                            <center>
                            <a onClick={this.slidePrevPage}> <span style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
                            </center>
                            </div>
                            <div className="col-sm-10">
                            <AliceCarousel
                             dotsDisabled={true}
                             buttonsDisabled={true}
                              items={this.state.children}
                              responsive={this.state.responsive}
                              slideToIndex={this.state.currentIndex}
                              onInitialized={this.handleOnSlideChange}
                              onSlideChanged={this.handleOnSlideChange}
                              onResized={this.handleOnSlideChange}
                            />
                         </div>
                            <div className="col-sm-1" style={{paddingTop:'60px'}}>
                            <center>
                             <a onClick={this.slideNextPage}> <span  style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                             </center>
                            </div>
                      </div>
                     <br/>
                  <div className="divider">
                  <center>Shop by Health Concern&nbsp;</center>
                </div>
                <br/><br/>
              <div className="row">
                        <div className="col-sm-1" style={{paddingTop:'84px'}}>
                            <center>
                            <a onClick={this.slidePrevPage1}> <span style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
                            </center>
                            </div>
                            <div className="col-sm-10">
                            <AliceCarousel
                             dotsDisabled={true}
                             buttonsDisabled={true}
                              items={this.state.hchildren}
                              responsive={this.state.responsive}
                              slideToIndex={this.state.currentIndex1}
                              onInitialized={this.handleOnSlideChange}
                              onSlideChanged={this.handleOnSlideChange}
                              onResized={this.handleOnSlideChange}
                            />
                         </div>
                            <div className="col-sm-1" style={{paddingTop:'84   px'}}>
                            <center>
                             <a onClick={this.slideNextPage1}> <span  style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                             </center>
                            </div>
                      </div>
                      <br/>
              <hr className="blue-hr"></hr>
                

        
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogoutData: () => dispatch(requestUserLogout()),
  getLabTestimonials: () => dispatch(fetchLabTestimonials()),
  getLabShopByHC: () => dispatch(fetchLabSHCData()),

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
  const { bkmReducer, loginReducer ,labTestReducer } = state;

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

  const {
    labTestimonials,
    labSHCData,
  } = labTestReducer || [];

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
    labTestimonials,
    labSHCData,
    isLoading,
    error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(HomePageOne));
