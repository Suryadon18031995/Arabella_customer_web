/* eslint-disable quotes */
/* eslint-disable quote-props */
import React from 'react';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import _find from 'lodash/find';
import _sortBy from 'lodash/sortBy';
import _endsWith from 'lodash/endsWith';
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import HrCommon from '../../components/Common/HrCommon.jsx';
import ProductDetailComponent from '../../components/ProductComponent/ProductDetailComponent.jsx';
import detailIcon from '../../assets/images/8.png';
import banner11 from '../../assets/images/Banner-11.png';
import banner12 from '../../assets/images/Banner-12.png';
import banner13 from '../../assets/images/Banner-13.png';
import banner14 from '../../assets/images/Banner-14.png';
import Loader from '../../components/Loader/Loader.jsx';
import {
  fetchProductDetails,
  fetchRelatedProducts,
  postTags, postReviews,
  fetchProductReviews,
  fetchUpsellingProducts,
} from '../../actions/products';
import { mapAddToCartApiData } from '../../utils/commonMapper';
import { postAddToCartData, clearCartData, flushCartViewData } from '../../actions/cart';
// import { receiveShowLoginModalData } from '../../actions/login';
import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { fetchAddToWishlistData } from '../../actions/wishList';
// import { download } from '../../actions/download';
import { receiveShowLoginModalData, updateCartData, setStoreId, flushCartData, setCartId } from '../../actions/login';
// import jsPDF from 'jspdf';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import updateRecentViewsData from '../../actions/recentViews';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ReviewComponent from '../../components/ProductComponent/reviewComponent.jsx';
import CustomerReviewComponent from '../../components/ProductComponent/CustomerReviewComponent.jsx';
import { fetchProductVendorReviews } from '../../actions/vendorReviews';

class ProductDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.custrev = React.createRef();
    this.toggleImgModalFn = this.toggleImgModalFn.bind(this);
    this.state = {
      handleProductDetailClick: false,
      listData: {},
      productDetails: [],
      productId: this.props.match.params && this.props.match.params.id && this.props.match.params.id.split('-').pop().split('.').shift(), // this.props.location.hash && this.props.location.hash.substring(1),
      showMoreDetails: false,
      submitReviewAlert: false,
      submitTagAlert: false,
      selectedDate: undefined,
      dispalyMoreAvails: false,
      totalPriceToPay: '',
      disableCartBtn: 'disableBtn',
      showAlertDiv: false,
      rating: 0,
      alertData: false,
      fields: {},
      // blinkText: {},
      isAuthenticated: false,
      errors: {},
      showChangeStoreModal: false,
      storeName: this.props.storeName,
      showImageModal: false,
      productImageUrl: undefined,
      breadCrumbsList: [
        {
          link: '/',
          name: 'HOME',
        },
        {
          link: undefined,
          name: 'BUY ARTIFACTS',
        },
      ],
      currentUrl: undefined,
      freshdeal: false,
      responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
      productReviewData: [],
      blinkText: '',
      redirectToVendorRevPage: false,
      vendorId: '',
      vendorName: '',
      upsellChildrens: undefined,
      quantity: undefined,
      redirectNotFound: false,
      showCustReview: false,
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields.name) {
      formIsValid = false;
      errors.name = "This is a required field.";
    }
    if (typeof fields.name !== "undefined") {
      if (!fields.name.match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors.name = "Nickname is not valid";
      }
    }
    if (!fields.reviewTitle) {
      formIsValid = false;
      errors.reviewTitle = "This is a required field.";
    }
    if (!fields.reviewDetails) {
      formIsValid = false;
      errors.reviewDetails = "This is a required field.";
    }
    if (this.state.rating == 0) {
      formIsValid = false;
      errors.rating = "This is a required field.";
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleChange = (event) => {
    const { fields } = this.state;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
  }

  submitReviews = () => {
    if (_isEmpty(this.props.apiToken)) {
      this.props.showLoginModal({ show: true });
    } else if (this.handleValidation()) {
      const reqBody = ({
        apiToken: _get(this.props, 'apiToken'),
        productId: _get(this.state, 'productId'),
        storeId: this.props.localeId,
        qualityRating: _get(this.state, 'rating'),
        ...this.state.fields,
      });
      this.props.submitReviewsData(reqBody);
    }
    this.setState({
      submitReviewAlert: true,
    });
  }

  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
  }

  showLoginPopup = () => {
    this.props.showLoginModal({ show: true });
  }

  toggleMoreDetail = () => {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails,
      dispalyMoreAvails: false,
    });
  }

  toggleMoreAvail = () => {
    this.setState({
      dispalyMoreAvails: !this.state.dispalyMoreAvails,
      showMoreDetails: false,
    });
  }

  resetMoreDetails = (event) => {
    const dataTempAvail = _filter(this.state.productDetails.delivery, ['delivery_date', event])[0];
    this.setState({
      dataToShow: { ...this.state.dataToShow, ...dataTempAvail, newKey: event },
    });
  }

  ProductSwatch = (event) => {
    const datesArr = {};
    const dataTempAvail = _get(this.state.productDetails, `more_avail.${[event]}`);
    dataTempAvail.forEach((o) => {
      datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
    });
    this.setState({
      dataToShow: { ...this.state.productDetails.info[event], ...dataTempAvail[0], newKey: event },
      datesArr,
    });
  }

  toggleImgModalFn = (url, length, ind) => {
    this.setState({
      showImageModal: !(this.state.showImageModal),
      productImageUrl: { url, length, ind },
    });
  }

  handleAddToWishlist = () => {
    this.props.addToWhishlist({
      apiToken: this.props.apiToken,
      productId: this.state.productId,
    });
  }

  handleAddToFavorites = () => {
    this.props.addToFavorites({
      apiToken: this.props.apiToken,
      productId: this.state.productId,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
    });
  }

  focusReview = () => {
    this.setState({ showCustReview: true });
  }

  vendorRatingsHover = (vendorId) => {
    this.props.getProductReviews({ vendorId });
  }

  componentDidMount() {
    if (this.state.productId && Number.isInteger(Number(this.state.productId))) {
      this.props.getProductDetails({
        "currencyCode": _get(this.props, 'currencyCode'),
        "apiToken": _get(this.props, 'apiToken'),
        "storeId": _get(this.props, 'storeId'),
        "pageNo": 1,
        "productId": this.state.productId,
      });
      this.props.getMyProductReviews({
        "productId": this.state.productId,
      });
    } else {
      this.setState({ redirectNotFound: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEmpty(nextProps.productDetailsData)) {
      const productDetails = _get(nextProps.productDetailsData, `productDetail.result.${this.state.productId}`);
      if (!productDetails || _isEmpty(productDetails)) {
        return this.setState({
          redirectNotFound: true,
        });
      }
      const rewardLine = _get(nextProps.productDetailsData, 'productDetail.rewardpoint');
      const overView = _get(nextProps.productDetailsData, 'productDetail.over_view');
      let datesArray = _get(productDetails, 'delivery', []);
      if (datesArray.length > 0) {
        datesArray = _sortBy(datesArray, o => o.delivery_date);
      }
      if (_get(productDetails, 'info')) {
        document.title = _get(productDetails, 'info.page_title') ? _get(productDetails, 'info.page_title') : _get(productDetails, 'info.name');
        const metaDesc = _get(productDetails, 'info.meta_description');
        const metaTitle = _get(productDetails, 'info.meta_title');
        const productInfo = {
          name: _get(productDetails, 'info.name'),
          img: _get(productDetails, 'info.image'),
          pid: _get(productDetails, 'info.pid'),
          ratings: _get(productDetails, 'info.product_rating_count'),
          price: _get(productDetails, 'info.price_range'),
          time: moment().format('x'),
        };
        this.props.updateRecentViews({ productInfo });
        // }
        // productDetails.delivery = datesArray;
        const dataTempAvail = _get(productDetails, 'delivery[0]');
        let dataToShow = {};
        const datesArr = {};
        const dispalyMoreAvails = productDetails && !_isEmpty(productDetails.more_avail);
        if (dataTempAvail) {
          const avaiId = _get(dataTempAvail, 'avail_id');
          dataToShow = productDetails.info[avaiId];
          dataToShow = { ...dataTempAvail, ...dataToShow };
          _filter(productDetails.delivery, ['avail_id', avaiId]).forEach((o) => {
            datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
          });
        }
        if (productDetails && !_isEmpty(productDetails.more_avail)) {
          Object.keys(productDetails.more_avail).forEach((avaiId) => {
            const minPrice = _get(_minBy(productDetails.more_avail[avaiId], 'total_price_currency'), 'total_price_format');
            const maxPrice = _get(_maxBy(productDetails.more_avail[avaiId], 'total_price_currency'), 'total_price_format');
            let approxPrice;
            if (minPrice === maxPrice) {
              approxPrice = minPrice;
            } else {
              approxPrice = `${minPrice} - ${maxPrice}`;
            }
            productDetails.info[avaiId].approxPrice = approxPrice;
          });
        }
        const breadCrumbsList = [
          {
            link: '/',
            name: 'HOME',
          },
          {
            link: undefined,
            name: 'BUY ARTIFACTS',
          },
        ];
        if (this.state.currentUrl && this.state.currentUrl !== window.location.href) {
          window.location.reload();
        }

        this.setState({
          productDetails,
          overView,
          dataToShow,
          datesArr,
          dispalyMoreAvails,
          breadCrumbsList,
          currentUrl: window.location.href,
          metaDesc,
          metaTitle,
          rewardLine,
        });
      }
    }
    if (!_isEmpty(nextProps.relatedProductsData)) {
      const relatedProducts = _get(nextProps, 'relatedProductsData');
      this.setState({
        children: this.createChildren({ relatedProducts }),
      });
    }
    if (!_isEmpty(nextProps.postTagsData)) {
      this.setState({
        showAlertDiv: true,
        alertData: '1 tag(s) have',
      });
    }
    if (!_isEmpty(nextProps.apiToken)) {
      this.setState({
        isAuthenticated: true,
      });
    }
    if (!_isEmpty(nextProps.productReviewsData)) {
      this.setState({
        showAlertDiv: true,
        alertData: 'Your review has',
      });
    }


    if (!_isEmpty(nextProps.addCartResponseDetails) && (this.props.type === 'REQUEST_ADD_TO_CART') && (this.props.cartCount !== _get(nextProps.addCartResponseDetails, ['total_products_in_cart']))) {
      this.props.updateCart({
        show: true,
        cartCount: _get(nextProps.addCartResponseDetails, ['total_products_in_cart']),
        cartTotal: _get(nextProps.addCartResponseDetails, ['subtotal']),
        cartProducts: _get(nextProps.addCartResponseDetails, ['result']),
      });
      this.props.setCartId(_get(nextProps.addCartResponseDetails, 'result') && _get(nextProps.addCartResponseDetails, ['result', [0], 'cart_id']));
    }
    if (!_isEmpty(nextProps.addToFavs) && this.props.favouriteType === 'REQUEST_ADD_TO_FAVORITES') {
      this.props.updateCart({ showFavsCart: true });
    }
    if (!_isEmpty(nextProps.addToWishlist) && this.props.wishlistType === 'REQUEST_SUBMIT_ADD_TO_WISHLIST') {
      this.props.updateCart({ showWishlistCart: true });
    }


    //     if (!_isEmpty(nextProps.addToFavs)) {
    //       // const str = "hello world";
    //       // const arr = new Uint8Array(str.length);
    //       // str.split("").forEach((a, b) => {
    //       //   arr[b] = a.charCodeAt();
    //       // });
    //      // const arr = new Blob([JSON.stringify(nextProps.addToFavs)], {type : 'application/json'});
    //       // download(arr, "textUInt8Array.pdf");
    //      const doc = new jsPDF();

    // doc.text('Hello world!', 10, 10);
    // doc.save('a4.pdf');

    //     }

    if (!_isEmpty(nextProps.productReviewData)) {
      this.setState({
        productReviewData: nextProps.productReviewData,
      });
    }
    if (!_isEmpty(nextProps.upsellProductsData)) {
      const upsellProducts = _get(nextProps, 'upsellProductsData.0.result');
      if (!_isEmpty(upsellProducts)) {
        this.setState({
          upsellChildrens: this.createUpsellChildrens({ upsellProducts }),
        });
      }
    }

    if (!_isEmpty(_get(nextProps, 'productVendorReviews'))) {
      this.setState({
        productVendorReviews: _get(nextProps, 'productVendorReviews'),
      });
    }
  }

  handleRedirectClick = () => {
    this.setState({
      handleProductDetailClick: true,
      showData: true,
    });
  }

  handleShowChangeStore = () => {
    this.setState({
      showChangeStoreModal: true,
    });
  }
  handleCloseModal = () => {
    this.setState({
      showChangeStoreModal: false,
    });
  };
  // carousel settings
  UNSAFE_componentWillMount() {
    this.setState({
      children: [],

      // activeItemIndex: 0,
    });

    // setTimeout(() => {
    //   this.setState({
    //     children: this.createChildren(20),
    //   });
    // }, 100);
    if (this.state.productId && this.props.match && !isNaN(this.state.productId)) {
      const pdtUrl = this.props.match.params && this.props.match.params.id;
      if (pdtUrl && _endsWith(pdtUrl, '.html')) {
        this.props.getRelatedProducts({
          "productId": this.state.productId,
        });
        this.props.getUpsellProducts({
          "productId": this.state.productId,
          "apiToken": _get(this.props, 'apiToken'),
        });
      } else {
        this.setState({
          redirectNotFound: true,
        });
      }
    }
  }

  reloadProductsData = (data) => {
    this.setState({
      productId: data,
    }, () => {
      this.props.getProductDetails({
        "currencyCode": _get(this.props, 'currencyCode'),
        "apiToken": _get(this.props, 'apiToken'),
        "storeId": _get(this.props, 'storeId'),
        "pageNo": 1,
        "productId": this.state.productId,
      });
      this.props.getRelatedProducts({
        "productId": this.state.productId,
      });
      this.props.getUpsellProducts({
        "productId": this.state.productId,
        "apiToken": _get(this.props, 'apiToken'),
      });
    });
  }

  // createChildren = n => _range(n).map(i => <div key={i} style={{
  //   height: 200, background: '#309087', width: 200, borderRadius: '50%', textAlign: 'center', verticalAlign: 'middle',
  // }}>{i}</div>);

  createChildren = ({ relatedProducts }) => Object.keys(relatedProducts).map(i =>
    <div key={i} className="carouselParentDiv" onClick={() => this.reloadProductsData(i)}>
      <div className="carouselImgDiv">
        <img src={_get(relatedProducts[i], 'imageurl')} width="100%" height="100%" className="carouselImg" />
      </div>
      <div className="carouselTextDiv">
        {/* <p>{_get(relatedProducts[i], 'name')}</p>
        <button type="button" className="btn btn-info">Add to Cart</button> */}
        <div className="product-name product-name-resp">
          <span>{_get(relatedProducts[i], 'name')}</span>
        </div>
        <div className="add-to-cart">
          <span className="btn btn-cart">ADD TO CART</span>
        </div>
      </div>
    </div>);

  createUpsellChildrens = ({ upsellProducts }) => Object.keys(upsellProducts).map(i =>
    <div key={i} className="carouselParentDiv" onClick={() => this.reloadProductsData(i)}>
      <div className="carouselImgDiv">
        <img src={_get(upsellProducts[i], 'image_url')} width="100%" height="100%" className="carouselImg" />
      </div>
      <div className="carouselTextDiv">
        <div className="product-name product-name-resp">
          <span>{_get(upsellProducts[i], 'name')}</span>
        </div>
        <div className="add-to-cart">
          <span className="btn btn-cart">ADD TO CART</span>
        </div>
      </div>
    </div>);

  // changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });
  // Ends carousel stuff

  handleMethodChange = (event) => {
    if (event.target.name === 'store') {
      const x = _find(_get(this.props.loginData, '0.result.store_list', []), { 'store_id': event.target.value });
      const selectedStoreName = _get(x, 'store_name');
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.setStoreId({
        storeId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.flushCartData();
      this.props.flushCartViewData();
      this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
      this.props.getProductDetails({
        "currencyCode": _get(this.props, 'currencyCode'),
        "apiToken": _get(this.props, 'apiToken'),
        "storeId": this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        "pageNo": 1,
        "productId": this.state.productId,
      });
    }
  };
  // input validation

  handleInuputChange = (event, deliData) => {

    let totalTemp = 0;
    let totalPriceToPay, inputQty, blinkText;

    inputQty = event.target.value;

    // const { blinkText, totalAmount, inputValid } = this.state;

    let disableCartBtn = 'disableBtn';
    const flag = inputQty >= _get(deliData, 'floorallowed');
    if (!flag) {
      totalTemp = (inputQty) * _get(deliData, 'total_price');
      const reminder = inputQty % _get(deliData, 'qty_per_box');

      totalPriceToPay = (inputQty > 0 && reminder === 0) ? `Total amount payable $${totalTemp.toFixed(2)}` : '';
      disableCartBtn = (inputQty > 0 && reminder === 0) ? '' : 'disableBtn';
      blinkText = (inputQty > 0 && reminder === 0) ? '' : ' blink';
    }
    // if (event.target.value % _get(deliData, 'qty_per_box') !== 0) {
    //   blinkText[_get(this.props, 'productId')] = 'blink';
    // } else {
    //   blinkText[_get(this.props, 'productId')] = '';
    // }

    // totalAmount[_get(this.props, 'productId')] = totalTemp;
    this.setState({
      unitQty: inputQty,
      totalAmount: totalTemp,
      // totalAmount,
      showMaxQtyAlert: flag,
      totalPriceToPay,
      disableCartBtn,
      blinkText,
      quantity: inputQty,
    });
  }
  // end of input validation

  addToCart = () => {

    const reqBody = mapAddToCartApiData({
      ...this.state.dataToShow,
      pid: this.state.productId,
      totalAmount: this.state.totalAmount,
      unitQty: this.state.unitQty,
      apiToken: _get(this.props, 'apiToken'),
      customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      loc_ID: 390,
      user: this.props.user,
    });
    this.props.addCartData(reqBody);

    this.setState({
      quantity: 0
    });
  }

  // handle tags related fn
  handleTagInputChange = (event) => {
    this.setState({
      tagsInput: event.target.value,
    });
  }

  addTags = () => {
    const reqBody = ({
      productId: this.state.productId,
      apiToken: _get(this.props, 'apiToken'),
      tags: this.state.tagsInput,
    });
    this.props.addTagsData(reqBody);
    this.setState({
      submitTagAlert: true,
    });
  }

  handleVendorReviewClick = (vendorId, vendorName) => {
    this.setState({
      redirectToVendorRevPage: true,
      vendorId,
      vendorName,
    });
  }

  handleProdReviewClick = () => {
    window.scrollTo(0, 1300);
  }

  render() {
    if (this.state.showCustReview) {
      window.scrollTo({
        top: this.custrev.current.offsetTop - 0, // could be negative value
        behavior: 'smooth',
      });
    }

    if (this.state.handleProductDetailClick) {
      return <Redirect push to="/" />;
    }
    // if (this.state.redirectNotFound) {
    //   return <Redirect to="/404" />;
    // }
    if (this.props.history.location.hash === '#reviewForm' && this.inputRef.current !== null) {
      // this.inputRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      window.scrollTo({
        top: this.inputRef.current.offsetTop - 0, // could be negative value
        behavior: 'smooth',
      });
    } else if (this.props.history.location.hash === '#reviewList' && this.custrev.current !== null) {
      window.scrollTo({
        top: this.custrev.current.offsetTop - 0, // could be negative value
        behavior: 'smooth',
      });
    }


    if (this.state.redirectToVendorRevPage) {
      return <Redirect push
        to={{
          pathname: `/product/reviews/${this.state.vendorId}`,
          state: { vendorId: this.state.vendorId, vendorName: this.state.vendorName },
        }}
      />;
    }

    if (_get(this, 'props.isLoading')) {
      return (
        <div className="loaderDiv" style={{ minHeight: '400px' }}>
          <Loader />
        </div>
      );
    }

    return (
      <div>
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
              <img src={detailIcon} alt='' width='100%' />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
              <h3>PRODUCT TITLE</h3>
              <hr />
              <div>
                Lorem i psum dolor si t a met, consectetuer a di p i sci nge li t , sed
di a m nonummy ni bh eui smod Lorem i psum do lo r si t am et , co nsec-
tetue r a di pi sci ngeli t, sed di a m nonummy ni bh eu i sm o d co nsec-
tetue r a di pi sci ngeli t, sed di a m nonummy ni bh eu i sm o d co nsec-
tetue r a di pi sci ngeli t, sed di a m nonummy ni bh eu i sm o d
                </div>
              <hr />
              <div>
                Based on 43 Reviews 4.6 out of 5 
                <StarRatings
                                rating={4.6}
                                starDimension="16px"
                                starSpacing="2px"
                                starEmptyColor="#434343"
                                starRatedColor="#f06530"
                            />
              </div>
              <div className='mt-3 font-weight-bold price-tag'>
              ₹ 1, 000. 00
              </div>
              <div className='mt-3'>
              Qty <input type='number' />
              </div>
              <div className='mt-3'>
             Sizes<br/>
             <input type='text' /> 
             Inches/Cm
              </div>
              <div className='mt-3'>
              Colors
              </div>
              <div className='mt-3 detail-page-add'>
              <button type="button" className="btn custom-class-button">ADD TO CART</button>
              <span>
                Free Shipping
              </span><br/>
              <span>
                Secure Payment
              </span>
              </div>
            </div>
          </div>
          <div>
            <HrCommon title='You Might Like' />
            <div className='row text-center detail-you-might-like'>
              <div className='col-3'>
                <img src={banner11} alt='' />
              </div>
              <div className='col-3'>
                <img src={banner12} alt='' />
              </div>
              <div className='col-3'>
                <img src={banner13} alt='' />
              </div>
              <div className='col-3'>
                <img src={banner14} alt='' />
              </div>
            </div>
          </div>
        </div>
        {/* <ErrorBoundary>
          <ProductDetailComponent
            // ref={this.inputRef}
            primeUser={this.props.primeUser}
            rewardLine={this.state.rewardLine}
            metaDesc={this.state.metaDesc}
            metaTitle={this.state.metaTitle}
            handleRedirectClick={this.handleRedirectClick}
            productDetails={this.state.productDetails}
            overView={this.state.overView}
            dataToShow={this.state.dataToShow}
            toggleMoreDetail={this.toggleMoreDetail}
            showMoreDetails={this.state.showMoreDetails}
            datesArr={this.state.datesArr}
            resetMoreDetails={this.resetMoreDetails}
            selectedDate={this.state.selectedDate}
            dispalyMoreAvails={this.state.dispalyMoreAvails}
            toggleMoreAvail={this.toggleMoreAvail}
            ProductSwatch={this.ProductSwatch}
            children={this.state.children}
            // changeActiveItem={this.changeActiveItem}
            // activeItemIndex={this.state.activeItemIndex}
            handleInuputChange={this.handleInuputChange}
            totalPriceToPay={this.state.totalPriceToPay}
            showMaxQtyAlert={this.state.showMaxQtyAlert}
            disableCartBtn={this.state.disableCartBtn}
            addToCart={this.addToCart}
            handleTagInputChange={this.handleTagInputChange}
            addTags={this.addTags}
            showAlertDiv={this.state.showAlertDiv}
            quantity={this.state.quantity}

            submitReviewAlert={this.state.submitReviewAlert}
            submitTagAlert={this.state.submitTagAlert}

            changeRating={this.changeRating}
            rating={this.state.rating}
            submitReviews={this.submitReviews}
            alertData={this.state.alertData}
            handleChange={this.handleChange}
            errors={this.state.errors}
            isAuthenticated={this.state.isAuthenticated}
            showLoginPopup={this.showLoginPopup}
            storeName={this.state.storeName}
            handleShowChangeStore={this.handleShowChangeStore}
            toggleImgModalFn={this.toggleImgModalFn}
            productImageUrl={this.state.productImageUrl}
            showImageModal={this.state.showImageModal}
            handleAddToFavorites={this.handleAddToFavorites}
            handleAddToWishlist={this.handleAddToWishlist}
            responsive={this.state.responsive}
            productReviewData={this.state.productReviewData}
            handleProdReviewClick={this.handleProdReviewClick}
            handleVendorReviewClick={this.handleVendorReviewClick}
            upsellChildrens={this.state.upsellChildrens}
            blinkText={this.state.blinkText}
            focusReview={this.focusReview}
            productVendorReviews={this.state.productVendorReviews}
            vendorRatingsHover={this.vendorRatingsHover}
          />
          <CustomerReviewComponent
            ref={this.custrev}
            productReviewData={this.state.productReviewData}
          />
          <ReviewComponent
            ref={this.inputRef}
            changeRating={this.changeRating}
            rating={this.state.rating}
            submitReviews={this.submitReviews}
            alertData={this.state.alertData}
            handleChange={this.handleChange}
            errors={this.state.errors}
            productDetails={this.state.productDetails}
          />
          <ChangeStoreModal
            storeList={_get(this.props.loginData, [0, 'result', 'store_list'], [])}
            selectedStoreId={this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId}
            showChangeStoreModal={this.state.showChangeStoreModal}
            handleCloseModal={this.handleCloseModal}
            handleMethodChange={this.handleMethodChange}
          />
        </ErrorBoundary> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProductDetails: data => dispatch(fetchProductDetails(data)),
  addCartData: data => dispatch(postAddToCartData(data)),
  getRelatedProducts: data => dispatch(fetchRelatedProducts(data)),
  addTagsData: data => dispatch(postTags(data)),
  submitReviewsData: data => dispatch(postReviews(data)),
  showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
  addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
  addToFavorites: data => dispatch(fetchAddToFavsData(data)),
  updateCart: data => dispatch(updateCartData(data)),
  updateRecentViews: data => dispatch(updateRecentViewsData(data)),
  getMyProductReviews: data => dispatch(fetchProductReviews(data)),
  getUpsellProducts: data => dispatch(fetchUpsellingProducts(data)),
  setStoreId: data => dispatch(setStoreId(data)),
  clearCart: data => dispatch(clearCartData(data)),
  flushCartData: () => dispatch(flushCartData()),
  flushCartViewData: () => dispatch(flushCartViewData()),
  setCartId: data => dispatch(setCartId(data)),
  getProductReviews: data => dispatch(fetchProductVendorReviews(data)),
});

const mapStateToProps = (state) => {
  const {
    productDetailReducer,
    cartReducer,
    loginReducer,
    relatedProductReducer,
    myFavouritesReducer,
    wishListReducer,
    productReviewsReducer,
    viewsReducer,
    vendorReviewsReducer,
  } = state;
  const {
    productDetailsData,
    postTagsData,
    productReviewsData,
    isFetching: isLoading,
    upsellProductsData,
    error: PDTerror,
  } = productDetailReducer || [];

  const {
    loginData,
    showLoginModal,
    apiToken,
    cartId,
    currencyCode,
    storeId,
    localeId,
    user,
    storeName,
    error: loginError,
    primeUser,
    cartCount,
  } = loginReducer || [];

  const {
    relatedProductsData,
    // isFetching: isLoading,
    error: relatedProdError,
  } = relatedProductReducer || [];

  const {
    addCartResponseDetails,
    type,
    error: addToCartError,
  } = cartReducer || [];

  const {
    addToWishlist,
    type: wishlistType,
    error: addToWishlistError,
  } = wishListReducer || [];


  const {
    addToFavs,
    type: favouriteType,
    error: addToFavError,
  } = myFavouritesReducer || [];

  const { productReviewsData: productReviewData } = productReviewsReducer || [];

  const { recentViews } = viewsReducer || '';

  const { productVendorReviews } = vendorReviewsReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(PDTerror) || _isError(PDTerror) || !_isEmpty(addToFavError) || _isError(addToFavError) || !_isEmpty(addToWishlistError) || _isError(addToWishlistError) || !_isEmpty(addToCartError) || _isError(addToCartError) || !_isEmpty(relatedProdError) || _isError(relatedProdError) || undefined;

  return {
    cartId,
    productDetailsData,
    isLoading,
    addCartResponseDetails,
    loginData,
    relatedProductsData,
    postTagsData,
    showLoginModal,
    apiToken,
    currencyCode,
    storeId,
    localeId,
    user,
    productReviewsData,
    storeName,
    addToFavs,
    favouriteType,
    wishlistType,
    addToWishlist,
    type,
    productReviewData,
    recentViews,
    upsellProductsData,
    error,
    productVendorReviews,
    primeUser,
    cartCount,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ProductDetailContainer));
