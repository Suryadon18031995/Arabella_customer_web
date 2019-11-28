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

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  UNSAFE_componentWillMount() {
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
    // this.props.getCategoriesData({
    //   currencyCode: this.props.currencyCode,
    //   apiToken: this.props.apiToken,
    //   storeId: this.props.storeId,
    //   // sort: this.state.sortValue,
    //   // pageNo: 1,
    // });
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

    // this.props.postTrackUrl({
    //   // url: _get(this.props, 'location.pathname'),
    //   url: window.location.href,
    //   apiToken: this.props.apiToken,
    // });

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
    // const domNode = document.getElementById('dropdownMenuDesktop3');
    // const domNode1 = document.getElementById('dropdownMenuMobile3');
    // if (!domNode && !domNode.contains(event.target) && !domNode1 && !domNode1.contains(event.target)) {
    //   this.setState({ isOpen: false });
    // }
    // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    //   this.setState(() => ({ mouseEvent: false, searchText: '' }));
    // }
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

        <div>
          

        </div>

        {this.props.children}

        <div className="footer-section-custom mt-4">
          <hr />
          <div className="row">
            <div className="col">
              <ul className='list-unstyled text-center'>
                <li className='mt-4 font-weight-bold'>
                  COMPANY
              </li>
                <li className='mt-4'>
                  About Us
              </li>
                <li className='mt-4'>
                  Blog
              </li>
                <li className='mt-4'>
                  Press
              </li>
                <li className='mt-4'>
                  Careers
              </li>
              </ul>
            </div>
            <div className="col">
              <ul className='list-unstyled text-center'>
                <li className='mt-4 font-weight-bold'>
                  SUPPORT
              </li>
                <li className='mt-4'>
                  FAQ
              </li>
                <li className='mt-4'>
                  Ressend Confirmation Email
              </li>
                <li className='mt-4'>
                  Reschedule My Ticket
              </li>
                <li className='mt-4'>
                  Gift Card Balance
              </li>
              </ul>
            </div>
            <div className="col">
              <ul className='list-unstyled text-center'>
                <li className='mt-4 font-weight-bold'>
                  SUPPORT
              </li>
                <li className='mt-4'>
                  Launch Your Own Business
              </li>
                <li className='mt-4'>
                  Become a Venue
              </li>
                <li className='mt-4'>
                  Local Partner Login
              </li>
              </ul>
            </div>
            <div className="col">
              <ul className='list-unstyled text-center'>
                <li className='mt-4 font-weight-bold'>
                  Follow us online
              </li>
                <li className='mt-4'>

                </li>
              </ul>
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
