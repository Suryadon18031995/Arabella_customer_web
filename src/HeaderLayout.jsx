import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _groupBy from 'lodash/groupBy';
import Redirect from 'react-router/Redirect';
import Link from 'react-router-dom/Link';
import {
  fetchLoginData,
  receiveHideLoginModalData,
  requestUserLogout,
  updateCartData,
  fetchCategoriesList,
  setZipcodeData,
  postNewsletterSubscription,
  clearNewsletterSubscription,
} from './actions/login';
import {
  fetchRemoveFromCartData,
  fetchFirstCartData,
  fetchRemoveExpiredProductData,
  setCartTypeData,
} from './actions/cart';
import { fetchTrackUrlData } from './actions/register';
import { fetchCategoriesAutoCompleteResult } from './actions/bkm_listing';
import ReorderImage from './assets/images/reorder.png';
import CategoriesComponenet from './components/Header/categoriesComponent.jsx';
import Suggetion from './components/Header/SuggetionComponent.jsx';
import ScrollApp from './components/ScrollTopComponent/scroll.jsx';
import ErrorHandler from './components/Hoc/ErrorHandler.jsx';
import { LoginLoader } from './components/Loader/Loader.jsx';
// import PopupImage from './assets/images/popup_banner.jpg';
import PaypalImage from './assets/images/Paypal_BKM.png';
import SecureImage from './assets/images/security_BKM.png';
import GodaddyImage from './assets/images/godaddy-seal.jpg';

class HeaderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handlePopupShow = this.handlePopupShow.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showBloomKonnectMenu = this.showBloomKonnectMenu.bind(this);
    // this.showCart = this.showCart.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.toggleCartDropdown = this.toggleCartDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.mblMenu = this.mblMenu.bind(this);
    this.state = {
      zipcode: undefined,
      zipcodeInit: undefined,
      show: false,
      password: undefined,
      email: undefined,
      loginResult: !_isEmpty(props.loginData) ? _get(props.loginData, [0, 'message']) : undefined,
      bloomKonnectMenu: false,
      hover: false,
      totalProd: [],
      // totalProd: props.showCartResult ? _get(props, 'showCartResult', 0) : _get(props.loginData, [0, 'cartDetails', 'result'], 0),
      wishListProduct: _get(props, 'showWishListData', _get(props.loginData, [0, 'wishListDetails', 'result'])),
      wishListTotalProduct: _get(props, 'addToWishlist.totalCount', _get(props.loginData, [0, 'wishListDetails', 'totalCount'])),
      favouriteProducts: undefined,
      favouriteTotalProduct: _get(props.addToFavs, 'product_count', _get(props.loginData, [0, 'favrtDetails', 'product_count'])),
      showError: false,
      // showCartData: false,
      handleCartClick: false,
      showMsg: true,
      showPopup: false,
      errors: {},
      totalProdInCart: 0,
      subtotal: 0,
      // totalProdInCart: _isEmpty(props.firstCartData) ? _get(props.loginData, [0, 'cartDetails', 'total_products_in_cart'], 0) : _get(props.firstCartData, ['cart', 0, 'total_products_in_cart'], 0),
      // subtotal: _isEmpty(props.firstCartData) ? _get(props.loginData, [0, 'cartDetails', 'subtotal']) : _get(props.firstCartData, ['cart', 0, 'subtotal']),
      cateGoriesList: undefined,
      headerSearchRedirect: false,
      searchText: '',
      searchedData: {},
      mouseEvent: false,
      popupCall: false,
      redirectToDetailsPage: false,
      url: undefined,
      productId: undefined,
      condition: false,
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      showRemoveIcon: true,
      navbarFixedTop: '',
      subscribeEmail: '',
      newsletterSubscriptionMessage: '',
      newsletterSubscriptionStatus: '',
      showLargeDropDowns: '',
    };
    this.props.hideLoginModal({ show: false });
  }

  componentDidUpdate(prevProps) {
    if (_get(prevProps, 'location.pathname') !== _get(this.props, 'location.pathname')) {
      if (_get(this.props, 'location.pathname') === '/checkout/onepage') {
        this.setState({ showRemoveIcon: false });
      } else {
        this.setState({ showRemoveIcon: true });
      }
      //   this.props.postTrackUrl({
      //     // url: _get(this.props, 'location.pathname'),
      //     url: window.location.href,
      //     apiToken: this.props.apiToken,
      //   });
      if (this.state.newsletterSubscriptionMessage) {
        this.setState({ newsletterSubscriptionMessage: undefined });
      }
    }
    // if (!_isEmpty(this.props.firstCartData) && this.props.cartType === 'RECEIVED_FIRST_CART_SEARCH' && this.state.totalProdInCart !== _get(this.props.firstCartData, ['cart', 0, 'total_products_in_cart'], 0) && (_get(this.props, 'location.pathname') !== '/customer/account/head' && _get(this.props, 'location.pathname') !== '/salesRep')) {
    //   const arrayLength = _get(this.props.firstCartData, ['cart', 0, 'result'], []).length;
    //   this.setState({
    //     totalProdInCart: _get(this.props.firstCartData, ['cart', 0, 'total_products_in_cart'], 0),
    //     totalProd: arrayLength > 3 ? _get(this.props.firstCartData, ['cart', 0, 'result']).slice(arrayLength - 3, arrayLength).reverse() : _get(this.props.firstCartData, ['cart', 0, 'result'], []).reverse(),
    //     subtotal: _get(this.props.firstCartData, ['cart', 0, 'subtotal'], 0),
    //   });
    // }
    // if (this.props.cartType === 'RECEIVED_MOVE_TO_WISHLIST' && this.state.totalProdInCart !== _get(this.props.moveToWishListData, ['cartDetails', 0, 'total_products_in_cart'])) {
    //   const arrayLength = _get(this.props.moveToWishListData, ['cartDetails', 0, 'result'], []).length;
    //   this.setState({
    //     totalProdInCart: _get(this.props.moveToWishListData, ['cartDetails', 0, 'total_products_in_cart'], 0),
    //     totalProd: arrayLength > 3 ? _get(this.props.moveToWishListData, ['cartDetails', 0, 'result']).slice(arrayLength - 3, arrayLength).reverse() : _get(this.props.moveToWishListData, ['cartDetails', 0, 'result'], []).reverse(),
    //     subtotal: _get(this.props.moveToWishListData, ['cartDetails', 0, 'subtotal'], 0),
    //   });
    // }
    // if (prevProps.apiToken && (prevProps.apiToken !== this.props.apiToken)) { // this.props.apiToken && 
    //   this.setState({ totalProdInCart: _get(this.props.loginData, [0, 'result', 'total_product_in_cart']) }, () => { });
    // }
    if (this.props.newType === 'FLUSH_CART_DATA' && this.state.totalProdInCart) {
      this.setState({
        totalProd: undefined,
        totalProdInCart: 0,
      });
    }
    // Update cart count from sales rep login
    // if (_get(this.props, 'location.pathname') !== '/view-cart' && (this.props.newType === 'RECEIVED_SALESREP_LOGIN') && this.state.totalProdInCart !== _get(this.props.loginData, [0, 'result', 'total_product_in_cart'])) {
    //   this.setState({
    //     totalProdInCart: _get(this.props.loginData, [0, 'result', 'total_product_in_cart']),
    //   }, () => { });
    // }
    if (this.props.apiToken && (prevProps.apiToken !== this.props.apiToken) && !this.props.cartFormat) {
      this.props.setCartFormatData(_get(this.props.loginData, [0, 'cartDetails', 'result', 0, 'type'], ''));
    }
  }

  loginDataFun = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.handleValidation()) {
        this.setState({
          popupCall: true,
        });
        this.props.getLoginData({
          email: this.state.email,
          password: this.state.pass,
        });
      }
    }
  };

  loginclickFun = () => {
    if (this.handleValidation()) {
      this.setState({
        popupCall: true,
      });
      this.props.getLoginData({
        email: this.state.email,
        password: this.state.pass,
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  handleChangeZip() {
    if (this.state.zipcode === '') {
      this.setState({
        zipcode: this.state.zipcodeInit,
        showPopup: false,
      });
      !this.props.apiToken && this.props.setZipcodeData(this.state.zipcodeInit);
    } else {
      this.setState({ showPopup: false });
      !this.props.apiToken && this.props.setZipcodeData(this.state.zipcode);
    }
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;

    // Email
    if (this.state.email === '') {
      formIsValid = false;
      errors.email = 'This is a required field.';
    }

    if (typeof this.state.email !== 'undefined' && this.state.email !== '') {
      const lastAtPos = this.state.email.lastIndexOf('@');
      const lastDotPos = this.state.email.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.email = 'Email is not valid';
      }
    }

    if (this.state.pass === '') {
      formIsValid = false;
      errors.pass = 'this is a required field';
    }

    if (typeof this.state.pass !== 'undefined' && this.state.pass !== '') {
      if (this.state.pass.length < 6) {
        formIsValid = false;
        errors.pass =
          'Please enter 6 or more characters. Leading or trailing spaces will be ignored.';
      }
    }
    this.setState({ errors });
    return formIsValid;
  }

  handlePopupShow() {
    this.setState({ showPopup: true });
  }

  handlePopupClose() {
    this.setState({ showPopup: false });
  }

  handleExit() {
    this.setState({
      show: false,
    });
    if (_isEmpty(this.props.apiToken)) {
      this.props.clearLoginData();
      this.props.hideLoginModal({ show: false });
    }
  }
  showBloomKonnectMenu() {
    this.setState({ bloomKonnectMenu: !this.state.bloomKonnectMenu });
  }

  // showCart = () => {
  //   this.setState({
  //     showCartData: true,
  //     handleCartClick: true,
  //   });
  //   this.props.getCartData({ quoteId: this.state.cart_id });
  // };

  showRegister = () => {
    this.setState({
      show: false,
    });
    this.props.hideLoginModal({ show: false });
  };

  forgotPassword = () => {
    this.setState({
      show: false,
    });
    this.props.hideLoginModal({ show: false });
  }

  toggleCartDropdown = (elementId, menuElementId) => {
    const ele = document.getElementById(elementId);
    const eleMenu = menuElementId && document.getElementById(menuElementId);
    let claerClass;
    let clearClass;
    if (ele != null) {
      switch (elementId) {
        // eslint-disable-next-line no-case-declarations
        case 'wishlistCart':
          ele.classList.toggle('hover-Menu-Class');
          eleMenu.classList.toggle('hover-Wishlist-cart');
          claerClass = () => {
            ele.classList.toggle('hover-Menu-Class');
          };
          setTimeout(claerClass, 1000);
          clearClass = () => {
            eleMenu.classList.toggle('hover-Wishlist-cart');
          };
          setTimeout(clearClass, 1000);
          this.props.updateCart({ showFavsCart: false });
          break;
        // eslint-disable-next-line no-case-declarations
        case 'favouritesCart':
          ele.classList.toggle('hover-Menu-Class');
          eleMenu.classList.toggle('hover-Wishlist-cart');
          claerClass = () => {
            ele.classList.toggle('hover-Menu-Class');
          };
          setTimeout(claerClass, 1000);
          clearClass = () => {
            eleMenu.classList.toggle('hover-Wishlist-cart');
          };
          setTimeout(clearClass, 1000);
          this.props.updateCart({ showFavsCart: false });
          break;
        default: ele.classList.toggle('hoverClass');
          claerClass = () => {
            // alert('Hello');
            ele.classList.toggle('hoverClass');
          };
          setTimeout(claerClass, 1000);
          this.props.updateCart({ show: false });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.totalProdInCart !== nextProps.cartCount) {
      this.setState({
        totalProdInCart: nextProps.cartCount,
        subtotal: nextProps.cartTotal,
        totalProd: nextProps.cartProducts,
      });
    }
    if (!_isEmpty(_get(nextProps, 'firstCartData')) && this.props.cartType !== 'RECEIVED_ADD_TO_CART' && this.props.cartType !== 'REQUEST_ADD_TO_CART' && this.props.cartCount !== _get(nextProps.firstCartData, ['cart', 0, 'total_products_in_cart'], 0)) {
      // if (_get(nextProps, ['firstCartData', 'cart', 0, 'code']) === 1) {
        this.props.updateCart({
          show: false,
          cartCount: _get(nextProps.firstCartData, ['cart', 0, 'total_products_in_cart'], 0),
          cartTotal: _get(nextProps.firstCartData, ['cart', 0, 'subtotal'], 0),
          cartProducts: _get(nextProps.firstCartData, ['cart', 0, 'result'], []),
        });
      // }
    }
    if (!_isEmpty(_get(nextProps, 'loginData')) && this.state.popupCall && nextProps.match.path !== '/view-cart') {
      this.setState({
        loginResult: _get(nextProps.loginData, [0, 'message']),
      });
      if (_get(nextProps.loginData, [0, 'message']) === 'success') {
        this.setState({
          show: false,
          // totalProd: _get(nextProps.loginData, [0, 'cartDetails', 'result']),
          // totalProdInCart: _get(nextProps.loginData, [0, 'cartDetails', 'total_products_in_cart'], 0),
          // subtotal: _get(nextProps.loginData, [0, 'cartDetails', 'subtotal'], 0),
          wishListProduct: _get(nextProps.loginData, [0, 'wishListDetails', 'result']),
          wishListTotalProduct: _get(nextProps.loginData, [0, 'wishListDetails', 'totalCount']),
          favouriteTotalProduct: _get(nextProps.loginData, [0, 'favrtDetails', 'product_count']),
        });
        let tempFavouriteData = {};
        const detailsTemp = [];
        tempFavouriteData = Object.assign(
          {},
          // this.state.favouriteProducts,
          _get(nextProps.loginData, [0, 'favrtDetails', 'result']),
        );
        tempFavouriteData &&
          Object.entries(tempFavouriteData).map(([keys, val]) => {
            detailsTemp.push(val.info);
          });
        this.setState({
          favouriteProducts: detailsTemp,
        });
      } else {
        this.setState(
          {
            show: false,
            showError: true,
            popupCall: false,
          },
          () => {
            alert('Invalid login or password.');
          },
        );
      }
      // this.props.hideLoginModal({ show: false });
    }
    if (!_isEmpty(_get(nextProps, 'showLoginModal')) && _get(nextProps, 'showLoginModal.show')) {
      this.handleShow('login');
    }
    if (!_isEmpty(_get(nextProps, 'updateCartDetails')) && _get(nextProps, 'updateCartDetails.show')) {
      this.toggleCartDropdown('myCartId');
    }
    if (!_isEmpty(_get(nextProps, 'updateCartDetails')) && _get(nextProps, 'updateCartDetails.showFavsCart')) {
      this.toggleCartDropdown('favouritesCart', 'myAccountMenu');
    }
    if (!_isEmpty(_get(nextProps, 'updateCartDetails')) && _get(nextProps, 'updateCartDetails.showWishlistCart')) {
      this.toggleCartDropdown('wishlistCart', 'myAccountMenu');
    }
    if (!_isEmpty(_get(nextProps, 'categoriesListData')) && _get(nextProps, 'categoriesListData.status') === 'true' && !_isEmpty(_get(nextProps, 'categoriesListData.data'))) {
      let cateGoriesList = _get(nextProps, 'categoriesListData.data');
      cateGoriesList = _groupBy(cateGoriesList, o => o.name && o.name[0].toLowerCase());
      this.setState({
        cateGoriesList,
      });
    }
    /* getting autocomplete data from header searched  */
    if (!_isEmpty(_get(nextProps, 'autoCompleteData'))
      && !_isEmpty(_get(nextProps, 'autoCompleteData.productIdlist'))
      && _get(nextProps, 'autoCompleteData.msg') === 'successfull'
      && this.props.type === 'REQUEST_CATEGORY_SEARCH_RESULT'
    ) {
      if (this.state.searchText) {
        this.setState(() => ({
          searchedData: _get(nextProps, 'autoCompleteData'),
          mouseEvent: true,
        }));
      }
    }
    // if (!_isEmpty(nextProps.showCartResult) && _get(nextProps.addCartResponseDetails, 'total_products_in_cart')) {
    //   this.setState({
    //     totalProd: nextProps.showCartResult,
    //     totalProdInCart: _get(nextProps.addCartResponseDetails, 'total_products_in_cart'),
    //     subtotal: _get(nextProps.addCartResponseDetails, 'subtotal'),
    //   });
    // }
    if (!_isEmpty(nextProps.showWishListData)) {
      this.setState({
        wishListProduct: nextProps.showWishListData,
        wishListTotalProduct: _get(nextProps.addToWishlist, 'totalCount'),
      });
    }
    if (!_isEmpty(nextProps.showFavsData)) {
      const tempObj = Object.values(nextProps.showFavsData) && Object.values(nextProps.showFavsData).map(o => o.info);
      this.setState({
        favouriteProducts: tempObj,
        favouriteTotalProduct: _get(nextProps.addToFavs, 'product_count'),
      });
    }
    if (!_isEmpty(_get(nextProps, 'RemoveFromCartData'))) {
      if (_get(nextProps, 'RemoveFromCartData.code') === 1) {
        this.props.getCartData({ apiToken: this.props.apiToken });
        this.props.removeExpiredProducts({ apiToken: this.props.apiToken, cartId: this.props.cartId });
      }
    }

    if (nextProps.newsletterData && nextProps.newType === 'RECEIVED_NEWSLETTER_SUBSCRIPTION') {
      this.setState({
        newsletterSubscriptionMessage: _get(nextProps.newsletterData, 'message'),
        newsletterSubscriptionStatus: _get(nextProps.newsletterData, 'status'),
      });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      this.props.clearNewsletterData();
    }
  }

  handleEmailChange = (event) => {
    // console.log('event:', event.target.value);
    this.setState({ subscribeEmail: event.target.value });
  }

  handleSubscribe = () => {
    this.props.postNewsletterSubscription({ emailId: this.state.subscribeEmail });
  }

  componentWillMount() {
    // if (_isEmpty(this.props.apiToken)) {
    //   fetch('https://geoip-db.com/json/')
    //   .then(response => response.json())
    //   .then((json) => {
    //     const ipAddress = json.IPv4;
    //     fetch(`http://ipinfo.io/${ipAddress}/json`)
    //       .then(response => response.json())
    //       .then((json) => {
    //         const zipcode = json.postal;
    //         this.setState({
    //           zipcode,
    //           zipcodeInit: zipcode,
    //         });
    //         !this.props.apiToken && this.props.setZipcodeData(zipcode);
    //       }).catch(function (error) {
    //         console.log('error:', error);
    //       });
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    // }
    this.props.getCategoriesData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.props.storeId,
      // sort: this.state.sortValue,
      // pageNo: 1,
    });
    if (this.props.cartCount) {
      this.setState({
        totalProdInCart: this.props.cartCount,
        subtotal: this.props.cartTotal,
        totalProd: this.props.cartProducts,
      });
    }
  }
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    const lessThanOneDayAgo = (date) => {
      const DAY = 1000 * 60 * 60 * 24; // 24 hours login time
      const oneDayBefore = Date.now() - DAY;
      return date < oneDayBefore;
    };
    if (this.props.apiToken && this.props.lastUpdatedToken && lessThanOneDayAgo(this.props.lastUpdatedToken)) {
      this.props.clearLoginData();
    }

    if (this.props.showCartResult) {
      let showCartResult = _get(this.props, 'showCartResult', []);
      if (showCartResult.length > 3) {
        showCartResult = showCartResult.slice(showCartResult.length - 3, showCartResult.length);
      }
      showCartResult.reverse();
      this.setState({ totalProd: showCartResult });
    }

    this.props.postTrackUrl({
      // url: _get(this.props, 'location.pathname'),
      url: window.location.href,
      apiToken: this.props.apiToken,
    });

    document.addEventListener('click', this.handleClickOutside, true);
    this.setState(() => ({
      searchedData: {},
    }));

    window.addEventListener('scroll', () => {
      const element = document.getElementById('slideNav');
      const elementWantclassName1 = document.getElementById('bkmLogo');
      const elementWantclassName2 = document.getElementById('desktopOnly');
      const h = window.innerHeight;
      if (h > 80) {
        if (window.scrollY > 30) {
          this.setState({ navbarFixedTop: 'navbar-fixed-top' });
          element && element.classList.add('animated');
          elementWantclassName1 && elementWantclassName1.classList.add('scroll');
          elementWantclassName2 && elementWantclassName2.classList.add('scroll');
        } else {
          this.setState({ navbarFixedTop: '' });
          element && element.classList.remove('animated');
          elementWantclassName1 && elementWantclassName1.classList.remove('scroll');
          elementWantclassName2 && elementWantclassName2.classList.remove('scroll');
        }
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
    this.setState(() => ({
      isOpen: false,
      mouseEvent: false,
      searchText: '',
    }));
  }

  /* for Header Search Box. */
  handleClickSearch = () => {
    this.setState({
      headerSearchRedirect: true, // uncheck for redirection.
      mouseEvent: false,
    });
  }
  keyPress = (e) => {
    let inputValue = null;
    inputValue = e.target.value;
    if (e.keyCode === 13) {
      this.setState({
        headerSearchRedirect: true, // uncheck for redirection.
        searchText: inputValue,
        mouseEvent: false,
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (inputValue.length > 3) {
        this.props.getCategoryAutoCompleteData({
          // value: inputValue,
          q: inputValue,
          apiToken: this.props.apiToken,
          storeId: this.props.storeId,
        });
      } else {
        this.setState(() => ({
          searchedData: {},
        }));
        return null;
      }
    }
    return false;
  }
  // show autocomplete if data is already there.
  handleMouseEvent = (event) => {
    if (!event.target.value) {
      this.setState(() => ({
        searchedData: {},
      }));
    } else {
      this.setState(() => ({ mouseEvent: true }));
    }
  }
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }
  handleAllResultRedirection = () => {
    this.setState({
      headerSearchRedirect: true, // uncheck for redirection.

      mouseEvent: false,
    });
  }

  /**
  * Alert if clicked on outside of element
  */
  handleClickOutside = (event) => {
    const domNode = document.getElementById('dropdownMenuDesktop3');
    const domNode1 = document.getElementById('dropdownMenuMobile3');
    if (!domNode && !domNode.contains(event.target) && !domNode1 && !domNode1.contains(event.target)) {
      this.setState({ isOpen: false });
    }
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState(() => ({ mouseEvent: false, searchText: '' }));
    }
  }
  handleClose() {
    this.setState({ show: false });
  }


  handleShow = (id) => {
    // if (window.screen.width >= 768) {
    this.setState({ show: true });
    // } else {
    //   this.state.condition && this.setState({ condition: !this.state.condition });
    //   this.props.history.push(id === 'login' ? '/login' : '/register');
    // }
  }
  mblMenu() {
    this.setState({ condition: !this.state.condition });
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleOpen1 = () => {
    this.setState({ isOpen1: !this.state.isOpen1 });
  };
  toggleOpen2 = () => {
    this.setState({ isOpen2: !this.state.isOpen2 });
  };
  toggleOpen3 = () => {
    this.setState({ isOpen3: !this.state.isOpen3 });
  };
  onSearchTextChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ searchText: value }));
  }
  handleClick = () => {
    this.props.history.push('/view-cart');
  };
  handleClickForMyAccount = () => {
    this.props.history.push('/customer/account');
  };
  showProductDetailPage = (productId, urlKey) => {
    this.setState(() => ({
      url: urlKey,
      productId,
      mouseEvent: false,
    }));
  };

  removeProduct = (cartRid) => {
    this.props.getaddRemoveUpdateProduct({
      apiToken: this.props.apiToken, itemId: cartRid,
    }, 'DELETE');
  }

  handleMouseEnter = () => {
    this.setState({ showLargeDropDowns: 'custom-class-trail' });
  }

  handleMouseLeave = () => {
    this.setState({ showLargeDropDowns: '' });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const menuClass = `dropdown-menu ${this.state.isOpen ? 'show' : ''}`;
    const menuClass1 = `dropdown-menu ${this.state.isOpen1 ? 'show' : ''}`;
    const menuClass2 = `dropdown-menu ${this.state.isOpen2 ? 'show' : ''}`;
    const menuClass3 = `dropdown-menu ${this.state.isOpen3 ? 'show' : ''}`;
    const { searchText, searchedData, mouseEvent } = this.state;
    const prodList = _get(searchedData, 'productIdlist');
    const prodListData = _get(searchedData, 'searchProdResult');
    if (this.state.headerSearchRedirect) {
      this.setState({
        headerSearchRedirect: false,
        mouseEvent: false,
      });
      return (<Redirect to={{
        pathname: '/catalogsearch/result/',
        search: '',
        state: { searchedData, searchText },
      }} />);
    }

    let deliverToZip;
    if (this.state.showMsg) {
      deliverToZip = (
        <div className='deliver-pincode-link-div'>
          <a
            className="link-account"
            id="link-Register"
            onClick={this.handlePopupShow}
            title=""
          >
            Deliver to{' '}
            <strong>{this.state.zipcode}</strong>
          </a>
        </div>
      );
    }

    return (
      <div className="App">

        <div className={`navbar navbar-custom ${this.state.navbarFixedTop}`} role="navigation" id="slideNav">
          <div className="container-fluid">
            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12">
              <a className={this.state.condition ? 'navbar-toggle hemburger-menu animated' : 'navbar-toggle hemburger-menu'} onClick={this.mblMenu} >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </a>
              <Link id="bkmLogo" className="bkm-logo" to="/">Project name</Link>
              <div className="pull-right visible-xs">
                <Link to="/view-cart" className="btn btn-deffault cart-mbl">
                  <span className="cart-qty">0</span>
                  <span className="cart-icon">
                    <i className="fa fa-shopping-cart" ></i>
                  </span>
                </Link>
              </div>
            </div>

            <div id="slidemenu" className={this.state.condition ? 'col-lg-8 col-sm-8 col-md-8 animated' : 'col-lg-8 col-sm-8 col-md-8'}>
              <div className={this.props.apiToken ? 'custom-search-pincode col-lg-7 col-sm-8 col-md-7 hidden-xs' : 'custom-search-pincode col-lg-9 col-sm-9 col-md-9 hidden-xs'} >
                <div className="col-lg-offset-1 col-lg-9 col-lg-offset-2 col-sm-offset-1 col-sm-9 col-sm-offset-2 col-md-offset-1 col-md-9 col-md-offset-2 col-xs-12">
                  <div className="search-container" ref={this.setWrapperRef}>

                    <input
                      type="text"
                      className={`search-input ${(this.props.searchLoading && (this.props.searchType === 'REQUEST_CATEGORY_SEARCH_RESULT')) ? 'search-loader' : ''}`}
                      placeholder="Search Item here"
                      value={searchText}
                      onChange={this.onSearchTextChange}
                      onKeyUp={event => this.keyPress(event)}
                      onMouseDown={event => this.handleMouseEvent(event)}
                    />
                    <i className={`${(this.props.searchLoading && (this.props.searchType === 'REQUEST_CATEGORY_SEARCH_RESULT')) ? 'custom-spinner' : ''}`} area-hidden='true' />

                    <button type="submit" onClick={this.handleClickSearch}><i className="fa fa-search"></i></button>
                    {prodList && prodListData && mouseEvent &&
                      <Suggetion
                        searchedData={searchedData}
                        handleAllResultRedirection={this.handleAllResultRedirection}
                        showProductDetailPage={this.showProductDetailPage}
                      />
                    }
                  </div>
                </div>

                {/* <div className={this.props.apiToken ? 'col-lg-5 col-sm-5 col-md-5 col-xs-6' : 'col-lg-3 col-sm-3 col-md-3 col-xs-6'}>
                  <div className="dropdown globe" id="dropdownMenuMobile1">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" aria-haspopup="true" >
                      <i className="fa fa-globe" aria-hidden="true"></i>BloomKonnect Marketplace
                    </button>
                    <div className="dropdown-content">
                      <a className="dropdown-item">China </a>
                      <a className="dropdown-item" >BloomKonnect Marketplace</a>
                      <a className="dropdown-item">España</a>
                    </div>
                  </div>
                </div> */}

                {/* {this.props.apiToken ? '' : <div className="col-lg-2 col-sm-2 col-md-2 col-xs-6">
                  <div className="deliver-pincode" >
                    <i className="fa fa-map-marker " aria-hidden="true"></i> {deliverToZip}


                    <Modal show={this.state.showPopup} onHide={this.handlePopupClose}>
                      <div className="deliveryZipPopup">
                        <div className="pin-container a-center form-inline">
                          <button className="pin-container-close fa fa-close" onClick={this.handlePopupClose}></button>
                          <h2>Enter a Zip Code</h2>
                          <input
                            type="text"
                            className="form-control"
                            name="zipcode"
                            id="zipcode"
                            onChange={this.handleChange}
                            value={this.state.zipcode}
                          />
                          <button
                            type="submit"
                            title="Submit"
                            onClick={() => this.handleChangeZip()}
                          >
                            Apply
                  </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
                } */}
              </div>
              <div className={this.props.apiToken ? 'custom-sign-register col-lg-5 col-sm-4 col-md-5 no-padding' : 'custom-sign-register col-lg-3 col-sm-3 col-md-3 no-padding'}>

                <div>{(!this.props.apiToken) ?

                  <div>
                    <div className="width-auto col-lg-4 col-xs-8">

                      <a id="link-Register" onClick={() => this.handleShow('register')} title="Register" className="icon"><i className="fa fa-sign-out" aria-hidden="true"></i> Register Now</a>
                    </div>
                    <div className="width-auto col-lg-1 hidden-xs">
                      <span className="icon-bar">|</span>
                    </div>
                    <div className="width-auto col-lg-4 col-xs-4">
                      <a id="link-login" onClick={() => this.handleShow('login')} title="Login" className="icon"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</a>
                    </div>
                    <div className="width-auto col-lg-4 hidden-lg hidden-sm hidden-md hidden-xs">
                      <span className="icon-bar">|</span>
                    </div>
                    <div className="width-auto col-lg-4 col-xs-4 hidden-lg hidden-sm">
                      {this.props.apiToken && <Link to="/view-cart" className="icon cart-mbl-inner"><i className="fa fa-shopping-cart" ></i> 0  Cart</Link>
                      }</div>
                  </div>

                  :

                  // { /* condition */ }
                  <div>

                    <div className="dropdown authenticate-dropbtn link-account">
                      <Link onClick={this.mblMenu} to="/view-cart" className="btn icon cart-mbl-inner"><i className="fa fa-shopping-cart" ></i>    My Cart({this.state.totalProdInCart}) </Link>
                      <div className="authenticate-dropdown-content" id="myCartId">
                        {/* <div className="em-container-js-topcart topcart-popup" id="ss-topcart-popup" style={linkStyle}> */}
                        <div className="topcart-popup-content">
                          {this.state.totalProdInCart === 0 ? (
                            <div className="topcart-content">
                              <p
                                className="amount-content"
                                style={{ color: '#fdb927' }}
                              >
                                {' '}
                                (You have no items in your shopping cart.)
                        </p>
                            </div>
                          ) : (
                              <div>
                                <div className="topcart-content">
                                  <p className="amount-content ">
                                    {' '}
                                    (There are{' '}
                                    <button onClick={this.handleClick}>
                                      {this.state.totalProdInCart} items
                            </button>{' '}
                                    in your shopping cart.)
                          </p>
                                  <ol className="em-topcart-list">
                                    {
                                      // this.state.loginShow &&
                                      this.state.totalProd &&
                                      this.state.totalProd.map((thisProd, index) => (
                                        <li className="item" key={index}>
                                          {this.state.showRemoveIcon && <a onClick={() => this.removeProduct(thisProd.cart_rid)} title='Remove This item'>
                                            <i className="fa fa-times-circle"></i>
                                          </a>}
                                          <div className="product-image">
                                            <Link to={`/${thisProd.url_key}.html`} title={thisProd.name} className="product-image">
                                              <img src={thisProd.image} width="75" alt={thisProd.name} />
                                            </Link>
                                          </div>
                                          <div className="product-details">
                                            <p className="product-name">
                                              <Link to={`/${thisProd.url_key}.html`}>{thisProd.name}</Link>
                                            </p>
                                            <strong>
                                              {thisProd.qty * thisProd.qty_per_box}
                                            </strong>{' '}
                                            x{' '}
                                            <span className="price">
                                              {thisProd.product_price_currency}
                                            </span>
                                          </div>
                                        </li>
                                      ))}
                                  </ol>
                                </div>
                                <div className="actions">
                                  <p className="subtotal">
                                    <span className="cart_subTotal">Cart Subtotal</span>
                                    <span className="price">
                                      ${this.state.subtotal}
                                    </span>
                                  </p>
                                  <div className="wrapper_bottom_button">
                                    <div className="goto-cart">
                                      <button onClick={this.handleClick}>
                                        <span>
                                          {/* <i style={{ fontSize: '20px' }} className="fa">
                                            &#xf07a;
                                                          </i> */}
                                          <i className="fa">
                                            &#xf07a;
                                                          </i>
                                          <span> My Cart</span>
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                        {/* </div> */}
                      </div>

                    </div>
                    <div className={this.props.apiToken ? 'icon dropdown menu-large logged-inuser' : 'dropdown menu-large logged-inuser'} id='myAccountMenu'>
                      <div className="dropdown" >
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                        > <Link onClick={this.mblMenu} to='/customer/account'><span className='my-account-link-color'><i className="fa fa-user" /> My Account   </span></Link></button>
                        <div className='my-account-dropdown-content' >

                          <div className="secondary-dropdown" id='wishlistCart'>
                            <button className="authenticate-dropbtn">
                              <a><i style={{ fontSize: '20px' }} className="fa" >&#xf004;</i> My Wish List ({this.state.wishListTotalProduct ? this.state.wishListTotalProduct : 0})</a>
                            </button>
                            <div className="my-account-secondry-dropdown-content" >
                              <span className="secondary-head">Wish List</span>
                              <ul>
                                {
                                  this.state.wishListProduct &&
                                  this.state.wishListProduct.map((wishListPro, index) => (
                                    <li key={index}>
                                      <div className="product-image">
                                        <Link
                                          to={`/${wishListPro.url_key}.html`}
                                          title={wishListPro.name}
                                          className="product-image"
                                        >
                                          <img
                                            src={wishListPro.image}
                                            width="75"
                                            alt={wishListPro.name}
                                          />
                                        </Link>
                                      </div>
                                      <div className="product-details">
                                        <p className="product-name">
                                          <Link to={`/${wishListPro.url_key}.html`}>{wishListPro.name}</Link>
                                        </p>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                              <Link className="secondary-add-btn" to="/customer/account/wishlist" target="_blank">     <span className="secondary-bottom">My Wish List</span></Link>
                            </div>
                          </div>
                          <div className="secondary-dropdown" id='favouritesCart'>
                            <button className="authenticate-dropbtn">
                              <a><i style={{ fontSize: '20px' }} className="fa" >&#xf006;</i> My Favorites ({this.state.favouriteTotalProduct ? this.state.favouriteTotalProduct : 0})</a>
                            </button>
                            <div className="my-account-secondry-dropdown-content">
                              <span className="secondary-head">My Favourite</span>
                              <ul>
                                {
                                  _get(this.state, 'favouriteProducts', []) &&
                                  this.state.favouriteProducts &&
                                  this.state.favouriteProducts.map((favouriteProd, index) => (
                                    index < 3 && <li key={index}>
                                      <div className="product-image">
                                        <Link
                                          to={`/${favouriteProd.url_key}.html`}
                                          title={favouriteProd.name}
                                          className="product-image"
                                        >
                                          <img
                                            src={favouriteProd.image}
                                            width="75"
                                            alt={favouriteProd.name}
                                          />
                                        </Link>
                                      </div>
                                      <div className="product-details">
                                        <p className="product-name">
                                          <Link to={`/${favouriteProd.url_key}.html`}>{favouriteProd.name}</Link>
                                        </p>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                              <Link className="secondary-add-btn" to="/customer/account/favourites" target="_blank">     <span className="secondary-bottom">My Favourite</span></Link>
                            </div>
                          </div>
                          <Link to="/customer/account"><i className="fa fa-user"></i>  My Account</Link>
                          {this.props.primeUser === '1' && <Link to="/customer/account/premium"><i className="fa fa-user"></i>  Premium Member</Link>}
                          {this.props.salesRepFlag && <Link to="/customer/account/head"><i className="fa fa-user"></i> Back To Sales Rep</Link>}
                          <Link to="/customer/pastPurchase"><img src={ReorderImage} /> Past Purchases</Link>
                          <Link className="dropdown-item" to='/logoutSuccess'>   <i className="fa fa-sign-out"></i> logout</Link>
                        </div>
                      </div>
                    </div>
                    {this.props.primeUser === '1' && <div className='dropdown prime-label'>Premium Member</div>}
                    <div className="dropdown authenticate-dropbtn hidden-lg hidden-sm hidden-md">
                      <Link onClick={this.mblMenu} to='/logoutSuccess'>
                        <span className='my-account-link-color icon'>
                          <i className="fa fa-sign-out" /> Log out   </span>
                      </Link>
                    </div>
                  </div>
                }</div>
              </div>

              {/* modal */}
              <Modal style={{ marginTop: '75px' }}
                show={this.state.show}
                onHide={this.handleClose}
                onExit={this.handleExit}
              >
                <div className="modal-content">

                  <div className="popup-content" id="em-popup">
                    {/* <img className="login-popup-bgimage"
                    alt=""
                    src={PopupImage}
                  /> */}
                    {this.props.isLoading && <LoginLoader />}
                    <div className="popup-subscribe">
                      <Modal.Header
                        closeButton
                        style={{
                          marginTop: '-5%',
                          marginBottom: '26px',
                        }}
                      />
                      <div className="em-wrapper-newsletter">
                        <div className="em-newsletter-style05">
                          <div className="block-subscribe err">
                            <div id="em-popup-login">
                              <div className="em-block-title">
                                <h2 className="text-left" style={{ paddingLeft: '10px' }}>
                                  <span>
                                    <b>LOGIN</b>
                                  </span>
                                </h2>
                              </div>
                              <div className="block-content">
                                <div className="form-subscribe-content">
                                  <div className="em-block-title">
                                    <h6 className="text-left" style={{ font: '11px/1.35 Gotham_Book_Regular, Raleway,Lato,Helvetica, Arial, sans-serif', margin: '0 0 1rem' }}>
                                      Welcome To Our New Portal!{' '}
                                      <br />
                                      For Existing Customers,
                                      Please Use Your Email ID
                                      Instead Of Your Username To
                                      Login.
                                                  </h6>
                                  </div>
                                  {this.state.showError && (
                                    <ul className="messages">
                                      <li className="error-msg">
                                        <ul>
                                          <li>
                                            <span>
                                              Invalid login or
                                              password.
                                                          </span>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  )}
                                  <div className="input-box">
                                    <label>Email</label>
                                    <input
                                      type="email"
                                      name="login[username]"
                                      id="email"
                                      title="Login"
                                      value={this.state.email}
                                      onChange={
                                        this.handleInputChange
                                      }
                                      onKeyUp={this.loginDataFun.bind(this)}
                                      className="input-text required-entry validate-email"
                                    />
                                    <span
                                      style={{ color: 'red' }}
                                    >
                                      {this.state.errors.email}
                                    </span>
                                  </div>
                                  <div className="input-box">
                                    <label>Password</label>
                                    <input
                                      type="password"
                                      name="login[password]"
                                      id="pass"
                                      title="Login"
                                      value={this.state.password}
                                      onChange={
                                        this.handleInputChange
                                      }
                                      onKeyUp={this.loginDataFun.bind(this)}
                                      className="input-text required-entry validate-password"
                                    />
                                    <span
                                      style={{ color: 'red' }}
                                    >
                                      {this.state.errors.pass}
                                    </span>
                                  </div>
                                  <div
                                    className="input-box text-right"
                                    style={{
                                      margin: '-15px 0 8%',
                                    }}
                                  >
                                    <Link
                                      className=""
                                      to="/forgotPassword"
                                      onClick={this.forgotPassword}
                                    >
                                      Forgot Password ?
                                                  </Link>
                                  </div>
                                  <div className="actions">
                                    <button id="send2" className="login-btn" name="send" type="submit" title="Login" onClick={() => this.loginclickFun()}>
                                      <span>
                                        <span>Login</span>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="em-popup-nologin">
                              <div className="block-content">
                                <div className="form-subscribe-content">
                                  <div className="em-block-title">
                                    <h2 className="text-left">
                                      <span>
                                        <b>REGISTER TODAY</b>
                                      </span>
                                    </h2>
                                  </div>
                                  <div className="em-block-title">
                                    <h6 className="text-left">
                                      Please register here to see
                                      market prices
                                                  </h6>
                                  </div>
                                  <div className="actions reg-form">
                                    <Link
                                      to="/register"
                                      onClick={this.showRegister}
                                      id="sshow-register-form"
                                      className="button-link"
                                    >
                                      REGISTER
                                                  </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <ul className="nav navbar-nav hidden-lg hidden-sm hidden-md col-xs-12">
                {/* <li className=""><a onClick={this.mblMenu} href="/seasonal-flower-subscription.html">Seasonal Subscription</a></li> */}
                {/* <li className=""><a onClick={this.mblMenu} href="/prebook">Mother's Day Pre-Book</a></li> */}
                <li className=""><Link onClick={this.mblMenu} to="/wholesale-flowers/fresh-deals.html"><i className="fa fa-list"></i> Fresh Deals</Link></li>

                <li className="category dropdown menu-large" id="dropdownMenuMobile3" >
                  <a className="dropdown-toggle" data-toggle="dropdown" id='dropdownMenuMobileLink3'
                    aria-haspopup="true"><i className="fa fa-list"></i> Shop by Flowers
                   <i className="fa fa-angle-down pull-right" onClick={this.toggleOpen}></i>
                  </a>
                  <div className={`megamenu row ${menuClass}`}>
                    <CategoriesComponenet
                      cateGoriesList={this.state.cateGoriesList}
                      mblMenu={this.mblMenu} />
                  </div>
                </li>
                <li className="dropdown menu-large" id="dropdownMenuMobile2">
                  <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-list"></i> Shop by Category
                  <i className="fa fa-angle-down pull-right" onClick={this.toggleOpen1} ></i>
                  </a>
                  <ul className={`dropdown-menu col-xs-12 ${menuClass1}`}>
                    <li><Link onClick={this.mblMenu} to="/new-arrivals.html"> New Arrivals </Link></li>
                    {/* <li><a onClick={this.mblMenu} href="/preMadeBouquets"> Pre-Made Bouquets </a></li> */}
                    {/* <li><a onClick={this.mblMenu} href="/nextday-delivery"> Next Day Delivery </a></li> */}
                    <li><Link onClick={this.mblMenu} to="/best-seller.html">Bestsellers Collection</Link></li>
                    {/* <li><a onClick={this.mblMenu} href="/FallCollectionContainer">Fall Collection</a></li> */}
                    <li><Link onClick={this.mblMenu} to="/wedding-flowers.html">Wedding Flowers</Link></li>
                    <li><Link onClick={this.mblMenu} to="/wholesale-flowers/floral-supplies.html">Floral Supplies</Link></li>
                    <li><Link onClick={this.mblMenu} to="/wholesale-flowers/local-delivery.html">Local Delivery</Link></li>
                    {/* <li><a onClick={this.mblMenu} href="/seasonal-flower-subscription.html">Seasonal Subscription</a></li> */}
                    {/* <li><a onClick={this.mblMenu} href="/annual-flower-subscription.html">Annual Subscription</a></li> */}
                    {/* <li><a onClick={this.mblMenu} href="/prebook-flower-subscription.html">Prebook Subscription</a></li> */}
                  </ul>
                </li>
                <li className=""><Link onClick={this.mblMenu} to="/nextday-delivery.html"> Next Day Delivery </Link></li>
                <li className=""><Link onClick={this.mblMenu} to="/premium-membership.html"> BKM Premium Member </Link></li>
                <li className="dropdown menu-large " id="dropdownMenuMobile4">
                  <a className="dropdown-toggle " data-toggle="dropdown"><i className="fa fa-list"></i> Subscribe & Save
                <i className="fa fa-angle-down pull-right" onClick={this.toggleOpen3}></i>
                  </a>
                  <ul className={`dropdown-menu col-xs-12 ${menuClass3}`}>
                    {/* <li><Link onClick={this.mblMenu} to="/prebook-flower-subscription.html">Holiday Pre-book</Link></li> */}
                    <li><Link onClick={this.mblMenu} to="/annual-flower-subscription.html">Annual Subscription</Link></li>
                  </ul>
                </li>
                {/* <li className=""><Link onClick={this.mblMenu} to="/annual-flower-subscription.html"> Annual Subscription </Link></li> */}
                <li className="dropdown menu-large " id="dropdownMenuMobile3">
                  <a className="dropdown-toggle " data-toggle="dropdown"><i className="fa fa-list"></i> Why bloomkonnect
                <i className="fa fa-angle-down pull-right" onClick={this.toggleOpen2}></i>
                  </a>
                  <ul className={`dropdown-menu col-xs-12 ${menuClass2}`}>
                    <li><Link onClick={this.mblMenu} to="/about-us">About Us</Link></li>
                    <li><Link onClick={this.mblMenu} to="/about-us#howitwork">How it Works</Link></li>
                    <li><Link onClick={this.mblMenu} to="/about-us#features">Benefits</Link></li>
                    <li><Link onClick={this.mblMenu} to="/about-us#pricing">Pricing</Link></li>
                    <li><Link onClick={this.mblMenu} to="/sustainable_floral_fund">Sustainability</Link></li>
                  </ul>
                </li>
              </ul>

            </div>
            <div className="col-lg-12 col-sm-12 hidden-xs">
              <ul className="nav navbar-nav desktop-only" id="desktopOnly">
                {/* <li className=""><a href="/seasonal-flower-subscription.html">Seasonal Subscription</a></li> */}
                {/* <li className=""><a href="/prebook">Mother's day prebook</a></li> */}
                <li className=""><Link to="/wholesale-flowers/fresh-deals.html">Fresh Deals</Link></li>

                <li className="category" id="dropdownMenuDesktop3">
                  <Link className="dropdown-toggle" type="button"
                    id="dropdownMenuButtonDesktopLink3"
                    data-toggle="dropdown"
                    aria-haspopup="true" to="/wholesale-flowers.html">Shop by Flowers
                    <i className="fa fa-angle-down pull-right custom-arrow"
                      onMouseEnter={this.handleMouseEnter}
                      onMouseLeave={this.handleMouseLeave}
                    ></i>
                  </Link>
                  <div className="dropdown-content custom-translate"
                    id={this.state.showLargeDropDowns}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}>
                    <CategoriesComponenet
                      cateGoriesList={this.state.cateGoriesList} />
                  </div>
                </li>
                <li className="dropdown menu-large" id="dropdownMenuDesktop2">
                  <a className="dropdown-toggle" data-toggle="dropdown">Shop by Category
                  <i className="fa fa-angle-down pull-right custom-arrow" ></i>
                  </a>
                  <ul className="dropdown-content">
                    <li><Link to="/new-arrivals.html"> New Arrivals </Link></li>
                    {/* <li><a href="/preMadeBouquets"> Pre-Made Bouquets </a></li> */}
                    {/* <li><a href="/nextday-delivery"> Next Day Delivery </a></li> */}
                    <li><Link to="/best-seller.html">Bestsellers Collection</Link></li>
                    {/* <li><a href="/FallCollectionContainer">Fall Collection</a></li> */}
                    <li><Link to="/wedding-flowers.html">Wedding Flowers</Link></li>
                    <li><Link to="/wholesale-flowers/floral-supplies.html">Floral Supplies</Link></li>
                    <li><Link to="/wholesale-flowers/local-delivery.html">Local Delivery</Link></li>
                    {/* <li><Link to="/seasonal-flower-subscription.html">Seasonal Subscription</Link></li> */}
                    {/* <li><Link to="/annual-flower-subscription.html">Annual Subscription</Link></li> */}
                    {/* <li><Link to="/prebook-flower-subscription.html">Prebook Subscription</Link></li> */}

                    {/* <li className=""><Link to="/premium-membership.html"> Premium </Link></li> */}
                  </ul>
                </li>
                <li className=""><Link to="/nextday-delivery.html"> Next Day Delivery </Link></li>
                <li className=""><Link to="/premium-membership.html"> BKM Premium Member </Link></li>
                <li className="dropdown menu-large" id="dropdownMenuDesktop4">
                  <a className="dropdown-toggle highlighted-col" data-toggle="dropdown">Subscribe & Save
                  <span className="pull-right"><i className="fa fa-angle-down pull-right custom-arrow" ></i></span>
                  </a>
                  <ul className="dropdown-content">
                    {/* <li><Link to="/prebook-flower-subscription.html" style={{ textTranform: 'none' }}>Holiday Pre-book</Link></li> */}
                    <li><Link to="/annual-flower-subscription.html">Annual Subscription</Link></li>
                  </ul>
                </li>
                <li className="dropdown menu-large" id="dropdownMenuDesktop3">
                  <a className="dropdown-toggle" data-toggle="dropdown">Why bloomkonnect
                  <span className="pull-right"><i className="fa fa-angle-down pull-right custom-arrow" ></i></span>
                  </a>
                  <ul className="dropdown-content">
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/about-us#howitwork">How it Works</Link></li>
                    <li><Link to="/about-us#features">Benefits</Link></li>
                    <li><Link to="/about-us#pricing">Pricing</Link></li>
                    <li><Link to="/sustainable_floral_fund">Sustainability</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className={this.state.condition ? 'menu-overlay animated' : 'menu-overlay'} > </div>
          </div>
        </div>
        <div>
          {this.state.newsletterSubscriptionMessage ?
            <ul className={this.state.newsletterSubscriptionStatus === 'false' ? '' : 'review-success'}>
              <li className={this.state.newsletterSubscriptionStatus === 'false' ? 'error-subscriptionmsg' : 'success-msg'}>
                <ul>
                  <li className='review-success-li'>
                    <span>
                      <span className={this.state.newsletterSubscriptionStatus === 'false' ? 'glyphicon glyphicon-alert icon-span' : 'glyphicon glyphicon-ok icon-span'} />
                      {this.state.newsletterSubscriptionMessage}
                    </span>
                  </li>
                </ul>
              </li>
            </ul> : ''}
        </div>
        {this.props.children}
        <div className="em-footer-bottom">
          <div className="fotter-container container">
            <div className="row-one a-center">
              <ul>
                <li><Link to="/track-order">Track Order</Link>|</li>
                <li><Link to="/contacts">Contact Us</Link>|</li>
                <li><Link to="/privacy-policy">Privacy Policy</Link>|</li>
                <li><Link to="/term-and-conditions">Terms & Conditions</Link>|</li>
                <li><Link to="/vendors">Our Vendors</Link>|</li>
                {/* <li><Link to="/umicrosite/vendor/register/">Vendor Registration</Link>|</li> */}
                <li><a href="https://bloomkonnect.com:8443/umicrosite/vendor/register/">Vendor Registration</a>|</li>
                <li><Link to="/faq-vendor">FAQ Vendor</Link>|</li>
                <li><Link to="/faq-customer">FAQ Customer</Link>|</li>
                <li><Link to="/sustainable_floral_fund">Sustainability</Link>|</li>
                <li><Link to="/returns-and-refunds-policy">Returns and Refunds Policy</Link>|</li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="row-two">
              <div className="block col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center mobile-only">
                <input
                  className="email-search-input"
                  name="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  placeholder="Sign-up For Our Email Newsletter"
                  type="text"
                  value={this.state.subscribeEmail}
                  onChange={this.handleEmailChange}
                />
                <button type="submit" className="email-submit-input" onClick={this.handleSubscribe}>
                  Subscribe
                </button>
              </div>
              <div className="block col-lg-4 col-md-4 col-sm-12 col-xs-12 footer-images-logo">
                <img src={PaypalImage} alt='Payapal' />
                <img src={SecureImage} alt='Secure' />
                <img src={GodaddyImage} alt='Godaddy' />
              </div>
              <div className="block social-icon col-lg-4 col-md-4 col-sm-12 col-xs-12 right">
                <span className="social-title">Stay Connected with Us!</span>
                <ul>
                  <li>
                    <a
                      title="Facebook"
                      href="https://www.facebook.com/BloomKonnect-354654801406029/"
                      target="_blank"
                    >
                      <span className="social-icon fa fa-facebook fa-2x" />
                    </a>
                  </li>
                  <li>
                    <a
                      title="Twitter"
                      href="https://twitter.com/bloomkonnect"
                      target="_blank"
                    >
                      <span className="social-icon fa fa-twitter fa-2x" />
                    </a>
                  </li>
                  <li>
                    <a
                      title="Instagram"
                      href="https://www.instagram.com/bloomkonnect/"
                      target="_blank"
                    >
                      <span className="social-icon fa fa-instagram fa-2x" />
                    </a>
                  </li>
                  <li>
                    <a
                      title="Pintrest"
                      href="https://www.pinterest.com/bloomkonnect/"
                      target="_blank"
                    >
                      <span className="social-icon fa fa-pinterest fa-2x" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-xs-12" >
              <center>
                Copyright @ 2016| BloomKonnect | All rights reserved
              </center>
              <div className="back-top-top">
                <ScrollApp />
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}
const mapDispatchToProps = dispatch => ({
  getLoginData: data => dispatch(fetchLoginData(data)),
  hideLoginModal: data => dispatch(receiveHideLoginModalData(data)),
  clearLoginData: () => dispatch(requestUserLogout()),
  updateCart: data => dispatch(updateCartData(data)),
  getCategoriesData: data => dispatch(fetchCategoriesList(data)),
  getCategoryAutoCompleteData: data => dispatch(fetchCategoriesAutoCompleteResult(data)),
  setZipcodeData: data => dispatch(setZipcodeData(data)),
  getaddRemoveUpdateProduct: (data, type) => dispatch(fetchRemoveFromCartData(data, type)),
  postTrackUrl: data => dispatch(fetchTrackUrlData(data)),
  getCartData: data => dispatch(fetchFirstCartData(data)),
  postNewsletterSubscription: data => dispatch(postNewsletterSubscription(data)),
  clearNewsletterData: () => dispatch(clearNewsletterSubscription()),
  removeExpiredProducts: data => dispatch(fetchRemoveExpiredProductData(data)),
  setCartFormatData: data => dispatch(setCartTypeData(data)),
});

const mapStateToProps = (state) => {
  const {
    loginReducer, cartReducer, bkmReducer, wishListReducer, myFavouritesReducer,
  } = state;

  const {
    loginData,
    isFetching: isLoading,
    showLoginModal,
    hideLoginModal,
    apiToken,
    updateCartDetails,
    categoriesListData,
    error: loginError,
    lastUpdatedToken,
    newsletterData,
    type: newType,
    salesRepUser,
    salesRepFlag,
    cartId,
    primeUser,
    storeId,
    cartCount,
    cartProducts,
    cartTotal,
  } = loginReducer || [];

  const {
    firstCartData,
    showCartResult,
    addCartResponseDetails,
    type: cartType,
    cartType: cartFormat,
    RemoveFromCartData,
    moveToWishListData,
    error: cartError,
  } = cartReducer || [];

  const { showWishListData, addToWishlist, error: wishlistError } = wishListReducer || [];

  const { autoCompleteData, type, isFetching: searchLoading, type: searchType, error: bkmError } = bkmReducer || [];

  const { showFavsData, addToFavs, error: favouriteError } = myFavouritesReducer || [];

  const error = !_isEmpty(bkmError) || _isError(bkmError) || !_isEmpty(wishlistError) || _isError(wishlistError) || !_isEmpty(favouriteError) || _isError(favouriteError) || !_isEmpty(cartError) || _isError(cartError) || !_isEmpty(loginError) || _isError(loginError);

  return {
    loginData,
    firstCartData,
    isLoading,
    showLoginModal,
    hideLoginModal,
    apiToken,
    updateCartDetails,
    categoriesListData,
    autoCompleteData,
    type,
    showCartResult,
    addCartResponseDetails,
    showWishListData,
    addToWishlist,
    showFavsData,
    addToFavs,
    cartType,
    cartFormat,
    RemoveFromCartData,
    moveToWishListData,
    error,
    lastUpdatedToken,
    newsletterData,
    searchLoading,
    searchType,
    newType,
    salesRepUser,
    salesRepFlag,
    cartId,
    primeUser,
    storeId,
    cartCount,
    cartProducts,
    cartTotal,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(HeaderLayout));

// export default HeaderLayout;
