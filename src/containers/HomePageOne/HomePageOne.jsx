/* eslint-disable no-console */
import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import { Link } from 'react-router-dom';
import Redirect from 'react-router/Redirect';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Carousel } from 'react-responsive-carousel';
import MetaTags from 'react-meta-tags';
import HomeComponent from '../../components/BKMComponent/HomeComponent.jsx';
import HomeFooterContentComponent from '../../components/BKMComponent/HomeFooterContentComponent.jsx';
import HomeWholeSaleComponent from '../../components/BKMComponent/HomeWholeSaleComponent.jsx';
import HomeContentComponent from '../../components/BKMComponent/HomeContentComponent.jsx';
import { requestUserLogout } from '../../actions/login';
import { fetchExploreDetail , fetchGenericMedicine , fetchTopBrandMedicine , fetchFeaturedBrandMedicine ,fetchAllHCData } from '../../actions/buyMedicine';
import { fetchHomePageNewArrivalsProducts, fetchHomePageNewArrivalsSPProducts, fetchHomePageFreshDealsProducts, fetchHomePageFreshDealsSPProducts, fetchHomePageBestSellerProducts, fetchHomePageBestSellerSPProducts } from '../../actions/bkm_listing';
//import { fetchAllHCData } from '../../actions/buyMedicine';
//import ErrorBoundary from '../ErrorBoundary.jsx';
//import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
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
import shopping from '../../assets/svg/20.svg';
import payment from '../../assets/svg/21.svg';
import money from '../../assets/svg/22.svg';
import you from '../../assets/svg/23.svg';
import delivery from '../../assets/svg/24.svg';
import res from  '../../assets/svg/25.svg';
import dia from  '../../assets/svg/26.svg';
import bon from  '../../assets/svg/27.svg';
import car from  '../../assets/svg/28.svg';
import kid from  '../../assets/svg/29.svg';
import liv from  '../../assets/svg/30.svg';
import preg from  '../../assets/svg/31.svg';
import thy from  '../../assets/svg/32.svg';
import sto from  '../../assets/svg/33.svg';
import men from  '../../assets/svg/34.svg';
import eye from  '../../assets/svg/35.svg';
import den from  '../../assets/svg/36.svg';
import pil from  '../../assets/svg/37.svg';
import pai from  '../../assets/svg/38.svg';
import proImage from  '../../assets/svg/39.svg';
import him from  '../../assets/svg/53.svg';
import sug from  '../../assets/svg/54.svg';
import ped from  '../../assets/svg/55.svg';
import dur from  '../../assets/svg/56.svg';
import pat from  '../../assets/svg/57.svg';
import sri from  '../../assets/svg/58.svg';
import mah from  '../../assets/svg/59.svg';
import san from  '../../assets/svg/60.svg';
import low from  '../../assets/svg/61.svg';
import ort from  '../../assets/svg/62.svg';
import man from  '../../assets/svg/63.svg';
import acc from  '../../assets/svg/64.svg';
import car1 from '../../assets/svg/10.svg';
import green2Blue from  '../../assets/svg/11.svg';
import imc from  '../../assets/svg/401.png';
import but from  '../../assets/svg/button.jpg';

class HomePageOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: 'index',
      childres: undefined, 
      childrenFeatured: undefined,
      childrenAyurveda: undefined,
      childernExplore: undefined,
      childrenHC:undefined,
      gmData:[],
      childrenNA: [],
      childrenBS: [],
      childrenFD: [],
      healthList:[],
      hcData: [],
      genericMedicine: [],
      featuredBrands: [],
      exploreData: [],
      topBrands:[],
      exploreNew:[],
      currentIndex: 0,
      itemsInSlide: 1,
      currentIndex1: 0,
      itemsInSlide1: 1,
      currentIndex2: 0,
      itemsInSlide2: 1, 
      currentIndex3: 0,
      itemsInSlide3: 1,
      items:[ 
      ],
      activeItemIndexNA: 0,
      activeItemIndexBS: 0,
      activeItemIndexFD: 0,
      valueData: 0,
      responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
      responsive1: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 5 } },
      redirectToRegistration: false,
      redirectToListing: false,

     // galleryItems
    };
  }

  componentDidMount() {
    document.title = 'Mediversal';
    this.props.getGenericMedicine();
     this.props.getExploreData();
     
       this.props.getFeaturedBrand();
   
       this.props.getTopBrand();
    
       this.props.fetchAllHCData();
      
  }


  
  IncrementItem = (props) => {
    console.log(props);
    console.log('surya');
    this.setState({ valueData: this.state.valueData + 1 });
    console.log(this.state.valueData);
  }
  DecreaseItem = (data) => {
    console.log(data);
    this.setState({ valueData: this.state.valueData - 1 });
    console.log(this.state.valueData);
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
    let newArrivals, freshDeals, bestSellers;
     
   // const healthData = _get(nextProps.hcData, []);
    //console.log(healthData);

    newArrivals = this.populateArray(nextProps, 'newArrivalsSearchData', []);
    newArrivals = this.populateArray(nextProps, 'newArrivalsSPSearchData', newArrivals);

    freshDeals = this.populateArray(nextProps, 'freshDealsSearchData', []);
    freshDeals = this.populateArray(nextProps, 'freshDealsSPSearchData', freshDeals);

    bestSellers = this.populateArray(nextProps, 'bestSellerSearchData', []);
    bestSellers = this.populateArray(nextProps, 'bestSellerSPSearchData', bestSellers);

    if (!_isEmpty(nextProps.genericMedicine)) {
      const genericMedicine = _get(nextProps, 'genericMedicine.result.data');
      this.setState({
          gmData: _get(nextProps, 'genericMedicine.result.data'),
      });
      for(let i=0;i<this.setState.gmData;i++)
      {
        var item=0;
        var joined = this.state.gmData.concat(item);
       this.setState.gmData[i] 
      }
      
       console.log(this.state.gmData);

      console.log(genericMedicine);
     
      if(genericMedicine != null)
      {
      this.setState({
        children: this.createChildren({ genericMedicine }),
      });
       }
    }

    if (!_isEmpty(nextProps.exploreData)) {
      const exploreData = _get(nextProps, 'exploreData.result.data');
      console.log(exploreData);
      if(exploreData != null)
      {
      this.setState({
        childrenExplore: this.createChildrenExplore({ exploreData }),
      });
       }
    }

    if (!_isEmpty(_get(nextProps, 'featuredBrand'))) {
      console.log(_get(nextProps, 'featuredBrand'));
      if (_get(nextProps.featuredBrand, 'code') === 1) {
        console.log(_get(nextProps.featuredBrand, 'code'));
        const featuredBrands = _get(nextProps, 'featuredBrand.result.data');
        this.setState({
          childrenFeatured: this.createChildrenFeatured({ featuredBrands }),
        })
      }
    }

    if (!_isEmpty(_get(nextProps, 'topBrand'))) {
      console.log(_get(nextProps, 'topBrand'));
      if (_get(nextProps.topBrand, 'code') === 1) {
        console.log(_get(nextProps.topBrand, 'code'));
        const topBrands = _get(nextProps, 'topBrand.result.data');
        this.setState({
          childrenAyurveda: this.createChildrenAyurveda({ topBrands }),
        })
      }
    }

    if (!_isEmpty(_get(nextProps, 'hcData'))) {
      console.log(_get(nextProps, 'hcData'));
      if (_get(nextProps.hcData, 'code') === 1) {
        console.log(_get(nextProps.hcData, 'code'));
        const hcData = _get(nextProps, 'hcData.result.data');
        this.setState({
          //hcData: _get(nextProps.hcData, 'result.data')
          childrenHc: this.createChildrenHc({ hcData }),
        })
      }
    }

   // healthData = this.populateArray(nextProps.healthConcernData,  []);

    

    console.log(this.state.healthList);

   
  }

  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide;
    this.setState({ currentIndex })
  }
 
  slideNextPage = () => {
    const {
      itemsInSlide,
      childrenExplore: { length },
    } = this.state
    let currentIndex = this.state.currentIndex + itemsInSlide
    if (currentIndex > length) currentIndex = length
 
    this.setState({ currentIndex })
  }
 
  createChildrenExplore = ({ exploreData }) => Object.keys(exploreData).map(i =>
    
                       <div className="text-center" style={{border: '3px solid rgb(0, 135, 176)', borderRadius: '20px',height:'240px',width:'210px'}}> 
                            <a  href={`/Product-Details/${_get(exploreData[i], 'id')}`}>                     
                            <img className="responsive" src={_get(exploreData[i], 'image')} style={{height:'180px',width:'180px',marginTop:'12px'}}/>
                              <br/>
                              <p style={{color:'black',marginTop:'10px'}}>{_get(exploreData[i], 'name')}</p>
                            </a>      
                          </div>
     
    );

    slidePrevPage1 = () => {
      const currentIndex1 = this.state.currentIndex1 - this.state.itemsInSlide1;
      this.setState({ currentIndex1 })
    }
   
    slideNextPage1 = () => {
      const {
        itemsInSlide1,
        childrenFeatured: { length },
      } = this.state
      let currentIndex1 = this.state.currentIndex1 + itemsInSlide1
      if (currentIndex1 > length) currentIndex1 = length
   
      this.setState({ currentIndex1 })
    }
   
    createChildrenFeatured = ({ featuredBrands }) => Object.keys(featuredBrands).map(i =>
      
      <div className="text-center p-lr-0">
      <center>
            <a style={{color:'black'}} href={_get(featuredBrands[i], 'url')}>
              <img className="{img7}" src={_get(featuredBrands[i], 'icon')}/>
            <br/>
            {_get(featuredBrands[i], 'name')}
            
          </a>
          </center>
        </div>
       
      );


      slidePrevPage2 = () => {
        const currentIndex2 = this.state.currentIndex2 - this.state.itemsInSlide2;
        this.setState({ currentIndex2 })
      }
     
      slideNextPage2 = () => {
        const {
          itemsInSlide2,
          childrenAyurveda: { length },
        } = this.state
        let currentIndex2 = this.state.currentIndex2 + itemsInSlide2
        if (currentIndex2 > length) currentIndex2 = length
     
        this.setState({ currentIndex2 })
      }
     
      createChildrenAyurveda = ({ topBrands }) => Object.keys(topBrands).map(i =>
        
        <div className="text-center p-lr-0">
        <center>
              <a style={{color:'black'}} href={_get(topBrands[i], 'url')}>
                <img className="{img7}" src={_get(topBrands[i], 'icon')}/>
              <br/>
              {_get(topBrands[i], 'name')}
              
            </a>
            </center>
          </div>
         
        );

        slidePrevPage3 = () => {
          const currentIndex3 = this.state.currentIndex3 - this.state.itemsInSlide3;
          this.setState({ currentIndex3 })
        }
       
        slideNextPage3 = () => {
          const {
            itemsInSlide3,
            childrenHc: { length },
          } = this.state
          let currentIndex3 = this.state.currentIndex3 + itemsInSlide3
          if (currentIndex3 > length) currentIndex3 = length
       
          this.setState({ currentIndex3 })
        }
       
        createChildrenHc = ({ hcData }) => Object.keys(hcData).map(i =>
          
          <div className="text-center p-lr-0">
          <center>
                <a style={{color:'black'}} href={_get(hcData[i], 'url')}>
                  <img className="{img7}" src={_get(hcData[i], 'icon')}/>
                <br/>
                {_get(hcData[i], 'name')}
                
              </a>
              </center>
            </div>
           
          );

  createChildren = ({ genericMedicine }) => Object.keys(genericMedicine).map(i =>
    <center>
        <div style={{height:'400px',width:'200px'}}>
        <div class="responsive"  style={{backgroundImage:`url(${imc})`,height: '330px',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
        <img src={_get(genericMedicine[i], 'image')} style={{marginLeft:'21px',marginTop:'23px',height:'150px',width:'150px'}}/>
        <div style={{marginTop: '30px'}}>   
              <a href={`/Product-Details/${_get(genericMedicine[i], 'id')}`} class="text-center">{_get(genericMedicine[i], 'name')}</a>
            <br/><br/>
                <div className="row">
                    <div className="col-sm-8" style={{marginLeft:'0px'}}>
                       <div className="cart-info quantity">
                          <div className="btn-increment-decrement" onClick={this.DecreaseItem(_get(genericMedicine[i],'name'))}>-</div>
                             <span className="input-quantity">{this.state.valueData}</span>
                          <div className="btn-increment-increment" onClick={this.IncrementItem(_get(genericMedicine[i]))}>+</div>
                       </div>

                    </div> 
                    <div className="col-sm-4"  style={{marginLeft:'-25px'}}>
  <button className="btn" style={{borderRadius: '15px',border: '#2fafcc 3px solid',background: '#4de2ac',marginTop:'0px',color: '#fff',fontWeight: '700'}}>ADD</button>

                    </div>


                 </div>   
                    
                      <br/> 
            <span  className="text-center">MRP : {_get(genericMedicine[i], 'price')}</span>
          </div>
        </div>
    </div> 
    </center>
  );

handleSignUp = () => this.setState({ redirectToRegistration: true });

handleListingRedirect = () => this.setState({ redirectToListing: true });

slideTo = (i) => this.setState({ currentIndex: i });

onSlideChanged = (e) => this.setState({ currentIndex: e.item });

slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 });

slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 });

//renderThumbs = () =>
  //<ul>{this.state.items.map((item, i) =>
    //<li key={i} onClick={() => this.slideTo(i)}>Thumb {item}</li>)}
  //</ul>;

renderGallery() {
  const { currentIndex, items } = this.state;
 // console.log(items);

  return (<AliceCarousel
    dotsDisabled={false}
    buttonsDisabled={false}
    slideToIndex={currentIndex}
    responsive={this.state.responsive}
    onSlideChanged={this.onSlideChanged}
  >
    { items.map((item, i) =>
     <div style={{height:'400px',width:'200px'}}>
          <div class="responsive"  style={{backgroundImage:`url(${imc})`,height: '330px',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
          <img src={item.image} style={{marginLeft:'21px',marginTop:'23px',height:'150px',width:'150px'}}/>
          <div class="text-center" style={{marginTop: '30px'}}>   
                 {item.name}
              <br/>
              -Dr. Vaidy
              <br/><br/><br/><br/>
              <span>MRP : {item.price}</span>
            </div>
          </div>
       </div> 
     )
      }
  </AliceCarousel>);
}


  render() {
   
  

    return (
      <div>       
               <div className="row greenToBlue" style={{backgroundImage: `url(${green2Blue})`}}>
                  <div className="col-sm-5">
                    <img className="responsive" style={{width:'100%',height:'360px',marginTop:'20px'}} src={medicine}/>
                  </div>
                  <div className="col-sm-7 p-100">
    <h2 className="f-45w">Buy Medicine</h2>
                         <h4 className="f-25w">Landing Page</h4>
                    <p className="f-16w">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
                <div className="row">
                    <div className="row">
                      <div className="col-sm-1">
                      </div>
                      <div className="col-sm-2 p-20">
                        <center className="li-bold">
                          <img className="responsive" src={shopping} style={{width:'100%',height:'100px'}}/>
                          ONLINE SHOPPING
                        </center>
                      </div>
                      <div className="col-sm-2 p-20">
                        <center className="li-bold">
                          <img className="responsive" src={payment} style={{width:'100%',height:'100px'}}/>
                          SECURE PAYMENT
                        </center>
                      </div>
                      <div className="col-sm-2 p-20">
                        <center className="li-bold">
                          <img className="responsive" src={money} style={{width:'100%',height:'100px'}}/>
                          SAVE MONEY
                        </center>
                      </div>
                      <div className="col-sm-2 p-20">
                        <center className="li-bold">
                          <img class="responsive" src={you} style={{width:'100%',height:'100px'}}/>
                          WE WILL HELP YOU
                        </center>
                      </div>
                      <div className="col-sm-2 p-20">
                        <center className="li-bold">
                          <img className="responsive" src={delivery} style={{width:'100%',height:'100px'}}/>
                          HOME DELIVERY
                        </center>
                      </div>
                      <div className="col-sm-1">
                      </div>
                    </div>
                  </div>
                  <div className="divider">
                    <center>Shop by Health Concern&nbsp;</center>
                  </div>
                  <br/>
                  <div className="container"> 
                <div className="row">
                      <br/>
                      <div className="col-sm-1" style={{paddingTop:'40px'}}>
                            <center>
                            <a onClick={this.slidePrevPage3}> <span style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
                            </center>
                        </div>
                        <div className="col-sm-10">
                            <AliceCarousel
                             dotsDisabled={true}
                             buttonsDisabled={true}
                              items={this.state.childrenHc}
                              responsive={this.state.responsive1}
                              slideToIndex={this.state.currentIndex3}
                              onInitialized={this.handleOnSlideChange}
                              onSlideChanged={this.handleOnSlideChange}
                              onResized={this.handleOnSlideChange}
                            />
                         </div>
                            <div className="col-sm-1" style={{paddingTop:'40px'}}>
                                <center>
                                <a onClick={this.slideNextPage3}> <span  style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                                </center>
                            </div>     
                    </div>
                    </div>
                      <br/>
                      <div class="divider">
                                  <center>Generic Medicine</center>
                      </div>
                      <br/><br/>
                <div className="row" style={{paddingLeft: '70px',paddingRight: '22px'}}>
                    <AliceCarousel
                        dotsDisabled={false}
                        buttonsDisabled={false}
                        items={this.state.children}
                        responsive={this.state.responsive}
                        valueData={this.state.valueData}
                        IncrementItem={this.IncrementItem}
                        DecreaseItem={this.DecreaseItem}
                      />
                       
                  </div>
                <br/>
                <div className="divider">
                  <center>Featured Brands</center>
                </div>
                <div className="container"> 
                <div className="row">
                      <br/>
                      <div className="col-sm-1" style={{paddingTop:'40px'}}>
                            <center>
                            <a onClick={this.slidePrevPage1}> <span style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
                            </center>
                        </div>
                        <div className="col-sm-10">
                            <AliceCarousel
                             dotsDisabled={true}
                             buttonsDisabled={true}
                              items={this.state.childrenFeatured}
                              responsive={this.state.responsive}
                              slideToIndex={this.state.currentIndex1}
                              onInitialized={this.handleOnSlideChange}
                              onSlideChanged={this.handleOnSlideChange}
                              onResized={this.handleOnSlideChange}
                            />
                         </div>
                            <div className="col-sm-1" style={{paddingTop:'40px'}}>
                                <center>
                                <a onClick={this.slideNextPage1}> <span  style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                                </center>
                            </div>     
                    </div>
                    </div>
                    <br/>
                <div className="divider">
                  <center>Top Ayurveda Brands</center>
                </div>
                <div className="container"> 
                   <div className="row">
                      <br/>
                       <div className="col-sm-1" style={{paddingTop:'40px'}}>
                            <center>
                            <a onClick={this.slidePrevPage2}> <span style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
                            </center>
                        </div>
                        <div className="col-sm-10">
                            <AliceCarousel
                             dotsDisabled={true}
                             buttonsDisabled={true}
                              items={this.state.childrenAyurveda}
                              responsive={this.state.responsive}
                              slideToIndex={this.state.currentIndex2}
                              onInitialized={this.handleOnSlideChange}
                              onSlideChanged={this.handleOnSlideChange}
                              onResized={this.handleOnSlideChange}
                            />
                           </div>
                            <div className="col-sm-1" style={{paddingTop:'40px'}}>
                                <center>
                                <a onClick={this.slideNextPage2}> <span  style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                                </center>
                            </div>     
                    </div>
                    </div>
                    <br/>
                  <div className="divider">
                    <center>Explore Something New</center>
                  </div>
                    <div className="row p-20">
                      <div className="col-sm-1" style={{paddingTop:'100px'}}>
                            <center>
                            <a onClick={this.slidePrevPage}> <span style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
                            </center>
                        </div>
                        <div className="col-sm-10">
                            <AliceCarousel
                             dotsDisabled={true}
                             buttonsDisabled={true}
                              items={this.state.childrenExplore}
                              responsive={this.state.responsive}
                              slideToIndex={this.state.currentIndex}
                              onInitialized={this.handleOnSlideChange}
                              onSlideChanged={this.handleOnSlideChange}
                              onResized={this.handleOnSlideChange}
                            />
                         </div>
                            <div className="col-sm-1" style={{paddingTop:'100px'}}>
                                <center>
                                <a onClick={this.slideNextPage}> <span  style={{fontSize:'40px'}} className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                                </center>
                            </div>               
                  </div>
                  <hr className="blue-hr"></hr>

        
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogoutData: () => dispatch(requestUserLogout()),
  fetchAllHCData: () => dispatch(fetchAllHCData()),
  getExploreData: () => dispatch(fetchExploreDetail()),
  getGenericMedicine: () => dispatch(fetchGenericMedicine()),
  getFeaturedBrand: () => dispatch(fetchFeaturedBrandMedicine()),
  getTopBrand: () => dispatch(fetchTopBrandMedicine()),
  // New Arrivals
  getBkmListSearchData: data => dispatch(fetchHomePageNewArrivalsProducts(data)),
  getBkmNewArrivalsSPSearchData: data => dispatch(fetchHomePageNewArrivalsSPProducts(data)),

  // Fresh Deals
  getBkmFreshDealsSearchData: data => dispatch(fetchHomePageFreshDealsProducts(data)),
  getBkmFreshDealsSPSearchData: data => dispatch(fetchHomePageFreshDealsSPProducts(data)),

  // Best Seller
  getBkmBestSellerSearchData: data => dispatch(fetchHomePageBestSellerProducts(data)),
  getBkmBestSellerSPSearchData: data => dispatch(fetchHomePageBestSellerSPProducts(data)),

  //getHealthData: data => dispatch(fetchHomePageNewArrivalsProducts());
});

const mapStateToProps = (state) => {
  const { bkmReducer, loginReducer, buyMedicineReducer} = state;

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
    exploreData,
    genericMedicine,
    featuredBrand,
    hcData,
    topBrand,
  } = buyMedicineReducer || [];

  
  
  
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
    exploreData,
    genericMedicine,
    featuredBrand,
    hcData,
    topBrand,
    isLoading,
    error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(HomePageOne));
