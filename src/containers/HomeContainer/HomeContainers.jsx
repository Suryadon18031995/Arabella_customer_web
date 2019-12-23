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
        <div className='artist-banner no-margin-custom'>
          <div className='banner-text'>
            <span>FunKar</span> marketplace for artists, particularly those artists who are highly talented
              but never got a big stage to showcase their talent or rather we would say never got
              a small stage to monetize their talent.
            <div className='mt-5'>
              <button type="button" className="btn custom-class-button" onClick={this.handleListingRedirect}>Browse Products</button>
            </div>
          </div>
        </div>
         <div className='search-bar-artist searchbar-artist mt-3'>
          <div className='center-search-div'>
          <div className='row no-margin-custom'>
            <div className='col-6 search-artist-span pr-0 text-right search-artist-span-size font-weight-bold'>
              Find Ev
            </div>
            <div className='col-6 pl-0 search-artist-span-size font-weight-bold'>
              ents <u>In</u>
            </div>
          </div>
          <div className='mt-3 search-input-artist text-center'>
              <input placeholder='Bangalore, Karnataka, India' />
              <button type="button" className="btn custom-class-button">LETS GEAR UP</button>
            </div>
          </div>
        </div>
        
        <div className="mt-3 ml-3 mr-3 mb-3">
            <table width="100%">
              <tbody>
                <tr>
                  <td><hr className='hr-color'/></td>
                  <td className='hr-td-content'>Our Platform</td>
                  <td><hr className='hr-color'/></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div className='row ml-3 mr-3'>
           <div className='col-4 category-img-custom buy-banner p-0'>
            <div className='cat-custom-div'>
              <div className='bottom-alignment-custom'>
              <div>Buy Artifacts</div>
              <img src={arrowIcon} alt=''/>
              </div>
            </div>
           </div>
           <div className='col-4 category-img-custom rent-banner p-0'>
            <div className='cat-custom-div'>
            <div className='bottom-alignment-custom'>
            <div>Rent Artifacts</div>
              <img src={arrowIcon} alt=''/>
              </div>
            </div>
           </div>
           <div className='col-4 category-img-custom exchange-banner p-0'>
            <div className='cat-custom-div'>
            <div className='bottom-alignment-custom'>
            <div>Cultural Exchange Program</div>
              <img src={arrowIcon} alt=''/>
              </div>
            </div>
           </div>
           <div className='col-4 category-img-custom surprise-banner p-0'>
            <div className='cat-custom-div'>
            <div className='bottom-alignment-custom'>
            <div>Surprise Your Loved Ones</div>
              <img src={arrowIcon} alt=''/>
              </div>
            </div>
           </div>
           <div className='col-4 category-img-custom train-banner p-0'>
            <div className='cat-custom-div'>
            <div className='bottom-alignment-custom'>
            <div>Train And Socialize</div>
              <img src={arrowIcon} alt=''/>
              </div>
            </div>
           </div>
           <div className='col-4 category-img-custom buy-banner p-0'>
            <div className='cat-custom-div'>
            <div className='bottom-alignment-custom'>
            <div>XXXXXXXX</div>
              <img src={arrowIcon} alt=''/>
              </div>
            </div>
           </div>
        </div>

       <div className='row mt-5'>
          <div className='col-6 join-hands p-0'>
          <div className='center-search-div text-center'>
              <div className='partner-with-us font-weight-bold'>Partner With <span>Us!</span></div>
              <button type="button" className="btn custom-class-button" onClick={this.handleSignUp}>SIGN UP</button>
            </div>
          </div>
          <div className='col-6 pl-0 pr-0'>
            <img src={joinHandsIcon} alt='' width='100%'/>
          </div>
        </div>

        <div className="mt-3 ml-3 mr-3 mb-3">
            <table width="100%">
              <tbody>
                <tr>
                  <td><hr className='hr-color'/></td>
                  <td className='hr-td-content'>Our Recent <span>#FUNKAR#</span> events</td>
                  <td><hr className='hr-color'/></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div className='row text-center'>
           <div className='col-2'>
              <button type="button" className="btn btn-outline-dark">#PORTRAIT ARTIST</button>
           </div>
           <div className='col-2'>
              <button type="button" className="btn custom-class-button">#PAINTERS</button>
           </div>
           <div className='col-2'>
              <button type="button" className="btn btn-outline-dark">#SAND ARTIST</button>
           </div>
           <div className='col-2'>
              <button type="button" className="btn btn-outline-dark">#SCULPTORS</button>
           </div>
           <div className='col-2'>
              <button type="button" className="btn btn-outline-dark">#SINGERS</button>
           </div>
           <div className='col-2'>
              <button type="button" className="btn btn-outline-dark">#CARNATIC MUSIC</button>
           </div>
        </div>

        <div className='row mt-5 text-center see-more-img'>
          <div className='col-3'>
           <img src={banner11} alt=''/>
          </div>
          <div className='col-3'>
           <img src={banner12} alt=''/>
          </div>
          <div className='col-3'>
           <img src={banner13} alt=''/>
          </div>
          <div className='col-3'>
           <img src={banner14} alt=''/>
          </div>
        </div>

        <div className='mt-5 mb-5 text-center font-weight-bold see-more-hr'>
          SEE MORE
          <hr className=''/>
        </div>

        <div className='row'>
           <div className='col-6 stay-touch'>
            <div className='stay-touch-div font-weight-bold'>
              WELCOME<br/>
              TO A WORLD OF<br/>
              <span>ARTISAN</span>
            </div>
           </div>
           <div className='col-6 stay-touch-right'>
              <h2>Get stay in touch.</h2>
              <hr/>
              <div className='mt-3'>
              Ready to book Events Near Bengaluru , KA? Have questions
              about one of our Artiasan? <span>Send us a note below and we’ll
              respond as quickly as possible.</span>
              </div>
              <div className='mt-3'>
                <input placeholder='First Name' style={{ width: '45%' }}/>
                <input placeholder='Last Name' style={{ width: '45%', float: 'right' }}/>
              </div>
              <div className='mt-3'>
                <input placeholder='Email'/>
              </div>
              <div className='mt-3'>
                <input placeholder='Phone'/>
              </div>
              <div className='mt-3'>
                <input placeholder='Enquiry'/>
              </div>
              <div className='mt-3'>
                <textarea placeholder='Message' rows='6'/>
              </div>
              <div className='mt-3'>
              <button type="button" className="btn custom-class-button">SEND</button>
              </div>
           </div>
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
