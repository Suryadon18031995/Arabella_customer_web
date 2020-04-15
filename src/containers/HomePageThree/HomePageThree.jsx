import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import { Link } from 'react-router-dom';
import Redirect from 'react-router/Redirect';
import MetaTags from 'react-meta-tags';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeComponent from '../../components/BKMComponent/HomeComponent.jsx';
import HomeFooterContentComponent from '../../components/BKMComponent/HomeFooterContentComponent.jsx';
import HomeWholeSaleComponent from '../../components/BKMComponent/HomeWholeSaleComponent.jsx';
import HomeContentComponent from '../../components/BKMComponent/HomeContentComponent.jsx';
import { requestUserLogout } from '../../actions/login';
import { fetchHomePageNewArrivalsProducts, fetchHomePageNewArrivalsSPProducts, fetchHomePageFreshDealsProducts, fetchHomePageFreshDealsSPProducts, fetchHomePageBestSellerProducts, fetchHomePageBestSellerSPProducts } from '../../actions/bkm_listing';
import { fetchEmergencyHealthData , fetchTestimonialsData } from '../../actions/geriatricCare';
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
import ger from '../../assets/svg/16.svg';
import labtest from  '../../assets/svg/15.svg';
import car from '../../assets/svg/10.svg';
import dummy from '../../assets/svg/dummy.jpg';
import testimonial from '../../assets/svg/testimonials.jpg';
import imc from  '../../assets/svg/401.png';

class HomePageOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: 'index',      
      childrenNA: [],
      childrenBS: [],
      childrenFD: [],
      children: undefined,
      childrenElder: undefined,
      emergencyHealthData: [],
      showEmergencyData:[],
      testimonialsData:[],
      activeItemIndexNA: 0,
      activeItemIndexBS: 0,
      activeItemIndexFD: 0,
      responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
      responsive1: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 3 } },
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
      //this.props.getLogoutData();
    }

    this.props.getEmergencyHealth();
    this.props.getTestimonials();

  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    if(!_isEmpty(nextProps.emergencyHealth))
    {
      if(nextProps.emergencyHealth.code === 1)
      {
       const emergencyHealthData = _get(nextProps.emergencyHealth, `result.data`);
       if(emergencyHealthData != null)
       {
        this.setState({
          childrenElder: this.createChildrenElder({ emergencyHealthData }),
        });
       }
      }
    
    }
    if (!_isEmpty(nextProps.testimonials)) {
      if(nextProps.testimonials.code === 1)
      {
      const testimonialsData = _get(nextProps, 'testimonials.result.data');
      console.log(testimonialsData);
      if(testimonialsData != null)
      {
      this.setState({
        children: this.createChildren({ testimonialsData }),
      });
       }
      }
    }

    
  }

  createChildren = ({ testimonialsData }) => Object.keys(testimonialsData).map(i =>
    <center>
        <div style={{height:'280px',width:'220px',border:'3px solid #007abf'}}>
        <img href={`/Geriatric-Care-Product-Details/${_get(testimonialsData[i], 'id')}`} src={_get(testimonialsData[i], 'image')} style={{marginLeft:'0px',marginTop:'15px',height:'150px',width:'150px'}}/>
  <a href={`/Geriatric-Care-Product-Details/${_get(testimonialsData[i], 'id')}`}><h4>{_get(testimonialsData[i], 'name')}</h4></a>
  <br/>
  <p>Price : {_get(testimonialsData[i], 'price')}</p>
       </div> 
    </center>
  );

  createChildrenElder = ({ emergencyHealthData }) => Object.keys(emergencyHealthData).map(i =>
    <center>
        <div style={{height:'340px',width:'280px',border:'3px solid #007abf'}}>
        <img href={`/Geriatric-Care-Product-Details/${_get(emergencyHealthData[i], 'id')}`} src={_get(emergencyHealthData[i], 'image')} style={{marginLeft:'0px',marginTop:'20px',height:'160px',width:'150px'}}/>
 <br/>
  <a href={`/Geriatric-Care-Product-Details/${_get(emergencyHealthData[i], 'id')}`}><h3>{_get(emergencyHealthData[i], 'name')}</h3></a>
  <br/>
  <p>Price : {_get(emergencyHealthData[i], 'price')}</p>
       </div> 
    </center>
  );

  
  onSlideChange(e) {
    console.debug('Item`s position during a change: ', e.item)
    console.debug('Slide`s position during a change: ', e.slide)
  }
 
  onSlideChanged(e) {
    console.debug('Item`s position after changes: ', e.item)
    console.debug('Slide`s position after changes: ', e.slide)
  }

  
  slidePrevPage1 = () => {
    const currentIndex1 = this.state.currentIndex1 - this.state.itemsInSlide1;
    this.setState({ currentIndex1 })
  }
 
  slideNextPage1 = () => {
    const {
      itemsInSlide1,
      childrenElder: { length },
    } = this.state
    let currentIndex1 = this.state.currentIndex1 + itemsInSlide1
    if (currentIndex1 > length) currentIndex1 = length
 
    this.setState({ currentIndex1 })
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

handleSignUp = () => this.setState({ redirectToRegistration: true });

handleListingRedirect = () => this.setState({ redirectToListing: true });

  render() {
   
  console.log(this.state.showEmergencyData);

    return (
      <div>       
                <div className="row blueToGreen" style={{backgroundImage: `url(${car})`}}>
                  <div className="col-sm-5">
                    <img className="responsive" src={ger} style={{width:'100%',height:'360px',marginTop:'20px'}}/>
                  </div>
                  <div className="col-sm-7 p-100">
                    <h2 className="f-45w">Geriatric Care</h2>
                    <br/>
                    <p className="f-16w">Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do eiusmod tempor incididunt ut labore <br/>et dolore magna aliqua.</p>
                  </div>
                </div>
                <div className="divider">
                  <center  style={{marginRight:'100px',marginLeft:'100px'}}>Complete Care&nbsp;&nbsp;&nbsp;&nbsp;OFFER PRICE&nbsp;:RS 1,00,000&nbsp;&nbsp;&nbsp;&nbsp; Per Year</center>
                </div>
                <br/><br/>
                <div className="container">
                    <div className="row">
                    <div className="col-sm-1" style={{paddingTop:'125px'}}>
                            <center>
                            <a onClick={this.slidePrevPage1}> <span style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
                            </center>
                            </div>
                            <div className="col-sm-10">
                            <AliceCarousel
                             dotsDisabled={true}
                             buttonsDisabled={true}
                              items={this.state.childrenElder}
                              responsive={this.state.responsive1}
                              slideToIndex={this.state.currentIndex1}
                              onInitialized={this.handleOnSlideChange1}
                              onSlideChanged={this.handleOnSlideChange1}
                              onResized={this.handleOnSlideChange1}
                            />
                         </div>
                            <div className="col-sm-1" style={{paddingTop:'125px'}}>
                            <center>
                             <a onClick={this.slideNextPage1}> <span  style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                             </center>
                            </div>
                      </div>
                      </div>
                      <br/>
                      <hr class="blue-hr"/>
                      <br/>
                        <div className="row" >
                            <div className="col-sm-1">
                            </div>
                            <div className="col-sm-10">
                              <div className="row" style={{height:'125px'}}>
                                <div className="col-sm-2">
                                  <img style={{paddingTop:'0px',width: '70px',height: '70px'}} src={dummy}/>
                                </div>
                                <div className="col-sm-2">
                                <img style={{marginTop: '45px',width: '70px',height: '70px'}} src={dummy}/>
                                </div>
                                <div className="col-sm-2">
                                <img style={{paddingTop:'0px',width: '90px',height:'90px'}} src={dummy}/>
                                </div>
                                <div className="col-sm-2">
                                <img style={{marginTop: '45px',width: '70px',height: '70px'}} src={dummy}/>
                                </div>
                                <div className="col-sm-2">
                                  <img style={{marginTop: '45px',width: '70px',height: '70px'}} src={dummy}/>
                                </div>
                                <div className="col-sm-2">
                                <img style={{paddingTop:'0px',width: '90px',height: '90px'}} src={dummy}/>
                                </div>
                              </div>
                            </div>
                            <div class="col-sm-1">
                            </div>
                        </div>
                        
                        <div className="row" >
                            <div className="col-sm-1">
                            </div>
                            <div className="col-sm-10">
                              <div className="row" style={{height:'125p'}}>
                                <div className="col-sm-2">
                                  <img style={{paddingTop:'0px',width: '90px',height: '90px'}} src={dummy}/>
                                </div>
                                <div className="col-sm-8">
                                <center><h3>A Lot Of Happy People</h3></center>
                                </div>
                                <div className="col-sm-2" style={{paddingLeft: '30px'}}>
                                <img style={{paddingTop:'0px',width: '70px',height: '70px'}} src={dummy}/>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-1">
                            </div>
                        </div>
                       
                        <br/>
                        <div className="container">
                          <div className="row">
                          <div className="col-sm-1" style={{paddingTop:'125px'}}>
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
                            <div className="col-sm-1" style={{paddingTop:'125px'}}>
                            <center>
                             <a onClick={this.slideNextPage}> <span  style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                             </center>
                            </div>
                          </div>
                          </div>  
                      <br/><br/>
                      <hr className="blue-hr"></hr>

        
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogoutData: () => dispatch(requestUserLogout()),
  getEmergencyHealth: () => dispatch(fetchEmergencyHealthData()),
  getTestimonials: () => dispatch(fetchTestimonialsData()),
});

const mapStateToProps = (state) => {
  const { loginReducer, geriatricCareReducer }  = state;

  const {
    apiToken,
    lastUpdatedToken,
    currencyCode,
    storeId,
    zipcode,
    error: loginError,
  } = loginReducer || [];

  const{
    emergencyHealth,
    testimonials,
  } = geriatricCareReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) ;

  return {
    apiToken,
    lastUpdatedToken,
    currencyCode,
    storeId,
    zipcode,
    emergencyHealth,
    error,
    testimonials,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(HomePageOne));
