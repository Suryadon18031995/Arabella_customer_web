import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _groupBy from 'lodash/groupBy';
import Modal from 'react-bootstrap/lib/Modal';
import Redirect from 'react-router/Redirect';
import RegisterComponent from './../components/BKMComponent/RegisterComponent.jsx';
import CategoriesComponenet from './../components/Header/categoriesComponent.jsx';
import ScrollApp from './../components/ScrollTopComponent/scroll.jsx';
import { fetchCustomerRegisterData, fetchStateListData, fetchTrackUrlData } from './../actions/register';
import { mapCustomerRegisterData } from './../utils/commonMapper';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

// eslint-disable-next-line camelcase
function new_script(src) {
  return new Promise(((resolve, reject) => {
    // eslint-disable-next-line no-var
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', () => {
      resolve();
    });
    script.addEventListener('error', (e) => {
      reject(e);
    });
    document.body.appendChild(script);
  }));
}

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePopupShow = this.handlePopupShow.bind(this);
    this.handlePopupShow = this.handlePopupShow.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
    this.mblMenu = this.mblMenu.bind(this);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      company: undefined,
      emailAddress: undefined,
      billingStreet1: undefined,
      billingCity: undefined,
      billingTelephone: undefined,
      billingZip: undefined,
      vatId: '',
      subcriptionInput: 'yes',
      password: undefined,
      confirmation: undefined,
      showStates: true,
      selectValue: 'US',
      getStates: true,
      errors: '',
      stateValue: false,
      selectStateValue: '',
      checkRecaptcha: [],
      checked: true,
      stateListRes: undefined,
      registerSuccessRes: false,
      showMsg: true,
      showPopup: false,
      fields: {
        pinCode: '560001',
      },
      searchText: '',
      condition: false,
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      cateGoriesList: undefined,
      navbarFixedTop: '',
    };
  }

  callback = () => {
  };

  verifyCallback = (response) => {
    this.setState({
      checkRecaptcha: response.length,
    });
  };

  handlePopupShow() {
    this.setState({ showPopup: true });
  }

  handleChangeZipcode = () => {
    if (_get(this.state, 'fields.pinCode') === '') {
      this.setState({
        fields: { ...this.state.fields, pinCode: '560001' },
        showPopup: false,
      });
    } else {
      this.setState({ showPopup: false });
    }
  }
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

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleChange = (event) => {
    this.setState({
      selectValue: event.target.value,
    });
    if (event.target.value === 'US') {
      this.setState({
        showStates: true,
      });
    } else {
      this.setState({
        showStates: false,
      });
    }
  }

  handleStateChange = (event) => {
    this.setState({
      stateValue: true,
      selectStateValue: event.target.value,
    });
  }

  customerRegisterData = () => {
    if (this.handleValidation()) {

      if (this.state.checked !== true) {
        this.setState({
          subcriptionInput: 'no',
        });
      }
      const reqBody = mapCustomerRegisterData(this.state);
      this.props.getRegisterData(reqBody);
      //  this.setState({ isLoading: false });

    }
  }

  componentDidMount() {
    document.title = 'Register';
    new_script('https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit').then(() => {
    })
      .catch((err) => {
        console.log(err);
      });
    this.props.postTrackUrl({
      // url: _get(this.props, 'location.pathname'),
      url: window.location.href,
      apiToken: this.props.apiToken,
    });
    this.props.getStateListData({ countryCode: this.state.selectValue });

    window.addEventListener('scroll', () => {

      const h = window.innerHeight;
      if (h > 80) {
        if (window.scrollY > 30) {
          this.setState({ navbarFixedTop: 'navbar-fixed-top' });

        } else {
          this.setState({ navbarFixedTop: '' });

        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEmpty(_get(nextProps, 'stateListData'))) {
      if (_get(nextProps.stateListData, [0, 'code']) === 1) {
        this.setState({
          stateListRes: _get(nextProps.stateListData, [0, 'result']),
        });
      }
    }
    if (!_isEmpty(_get(nextProps, 'registerData'))) {
      if (_get(nextProps.registerData, [0, 'code']) === 1) {
        this.setState({
          registerSuccessRes: true,
        });
      } else {
        alert(_get(nextProps.registerData, [0, 'message']));
      }
    }
    if (!_isEmpty(_get(nextProps, 'categoriesListData')) && !_isEmpty(_get(nextProps, 'categoriesListData.data'))) {
      let cateGoriesList = _get(nextProps, 'categoriesListData.data');
      cateGoriesList = _groupBy(cateGoriesList, o => !_isEmpty(o.name) && o.name[0].toLowerCase());
      this.setState({
        cateGoriesList,
      });
    }
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;

    //  FirstName
    if (this.state.firstName === undefined || this.state.firstName === '') {
      formIsValid = false;
      errors.firstName = 'Please fill out this field';
    }

    // lastName
    if (this.state.lastName === undefined || this.state.lastName === '') {
      formIsValid = false;
      errors.lastName = 'Please fill out this field';
    }

    // company
    if (this.state.company === undefined || this.state.company === '') {
      formIsValid = false;
      errors.company = 'Please fill out this field';
    }

    // street
    if (this.state.billingStreet1 === undefined || this.state.billingStreet1 === '') {
      formIsValid = false;
      errors.billingStreet1 = 'Please fill out this field';
    }

    // city
    if (this.state.billingCity === undefined || this.state.billingCity === '') {
      formIsValid = false;
      errors.billingCity = 'Please fill out this field';
    }

    // telephone
    if (this.state.billingTelephone === undefined || this.state.billingTelephone === '') {
      formIsValid = false;
      errors.billingTelephone = 'Please fill out this field';
    }

    if (this.state.billingTelephone !== undefined) {
      if (this.state.billingTelephone.length < 10) {
        formIsValid = false;
        errors.billingTelephone = 'Please Lengthen this text to 10 Numbers';
      } else {
        const re = /^[0-9\b]+$/;
        if (re.test(this.state.billingTelephone)) {
          // formIsValid = true;
        } else {
          formIsValid = false;
          errors.billingTelephone = 'Please Provide Numeric value';
        }
      }
    }

    // password
    if (this.state.password === undefined || this.state.password === '') {
      formIsValid = false;
      errors.password = 'Please fill out this field';

    }

    if (this.state.password !== undefined) {
      if (this.state.password.length < 6) {
        formIsValid = false;
        errors.password = 'Please lengthen this text to 6 characters or more';
      }
    }

    // confirm password
    if (this.state.confirmation === undefined || this.state.confirmation === '') {
      formIsValid = false;
      errors.confirmation = 'Please fill out this field';
    }

    if (this.state.confirmation !== undefined) {
      if (this.state.confirmation.length < 6) {
        formIsValid = false;
        errors.confirmation = 'Please lengthen this text to 6 characters or more';
      }
    }

    // Email
    if (this.state.emailAddress === undefined || this.state.emailAddress === '') {
      formIsValid = false;
      errors.emailAddress = 'Please fill out this field';
    }

    if (this.state.emailAddress !== undefined && this.state.emailAddress !== '') {
      const lastAtPos = this.state.emailAddress.lastIndexOf('@');
      const lastDotPos = this.state.emailAddress.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.emailAddress.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.emailAddress.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors.emailAddress = 'Email is not valid';
      }
    }

    // state
    if (this.state.stateValue !== true) {
      formIsValid = false;
      errors.stateValue = 'Please select an item in the list';
    }

    // zip
    if (this.state.billingZip === undefined || this.state.billingZip === '') {
      formIsValid = false;
      errors.billingZip = 'Please fill out this field';
    }

    if (this.state.billingZip !== undefined && this.state.billingZip !== '') {
      if (this.state.billingZip.length < 5) {
        formIsValid = false;
        errors.billingZip = 'Please lengthen this text to 5 characters or more';
      }
    }

    if (this.state.billingZip !== undefined) {
      const re = /^[0-9\b]+$/;
      if (re.test(this.state.billingZip)) {
        // formIsValid = true;
      } else {
        formIsValid = false;
        errors.billingZip = 'Please Provide Numeric value';
      }
    }

    if (this.state.password !== this.state.confirmation) {
      alert('Password do not match');
    }

    this.setState({ errors });
    return formIsValid;
  }

  handlePopupClose() {
    this.setState({ showPopup: false });
  }
  mblMenu() {
    this.setState({ condition: !this.state.condition });
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
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
  onSearchTextChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ searchText: value }));
  }
  /* for Header Search Box. */
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
          value: inputValue,
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
  handleAllResultRedirection = () => {
    this.setState({
      headerSearchRedirect: true, // uncheck for redirection.
      mouseEvent: false,
    });
  };
  showProductDetailPage = (productId, urlKey) => {
    this.setState(() => ({
      url: urlKey,
      productId,
      mouseEvent: false,
    }));
  };
  handleChangeZip = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  handleClick = () => {
    this.props.history.push('/view-cart');
  };
  handleClickForMyAccount = () => {
    this.props.history.push('/customer/account');
  };
  render() {
    if (this.state.registerSuccessRes === true) {
      return <Redirect push to="/RegisterSuccess" />;
    }
    const menuClass = `dropdown-menu ${this.state.isOpen ? 'show' : ''}`;
    const menuClass1 = `dropdown-menu ${this.state.isOpen1 ? 'show' : ''}`;
    const menuClass2 = `dropdown-menu ${this.state.isOpen2 ? 'show' : ''}`;
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
      <div>
        <div className={`navbar navbar-custom ${this.state.navbarFixedTop}`} role="navigation" id="slideNav">
          <div className="container-fluid">
            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12">
              <a className={this.state.condition ? 'navbar-toggle hemburger-menu animated' : 'navbar-toggle hemburger-menu'} onClick={this.mblMenu} >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </a>
              <a id="bkmLogo" className="bkm-logo" href="/">Project name</a>
              <div className="pull-right visible-xs">
                <a href="/view-cart" className="btn btn-deffault cart-mbl">
                  <span className="cart-qty">0</span>
                  <span className="cart-icon">
                    <i className="fa fa-shopping-cart" ></i>
                  </span>
                </a>
              </div>
            </div>

            <div id="slidemenu" className={this.state.condition ? 'col-lg-8 col-sm-8 col-md-8 animated' : 'col-lg-8 col-sm-8 col-md-8'}>
              <div className={this.props.apiToken ? 'custom-search-pincode col-lg-8 col-sm-8 col-md-9 hidden-xs' : 'custom-search-pincode col-lg-9 col-sm-9 col-md-9 hidden-xs'} >

                <div className="col-lg-offset-1 col-lg-9 col-lg-offset-2 col-sm-offset-1 col-sm-9 col-sm-offset-2 col-md-offset-1 col-md-9 col-md-offset-2 col-xs-12">
                  <div className="search-container" ref={this.setWrapperRef}>

                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search Item here"
                      value={searchText}
                      onChange={this.onSearchTextChange}
                      onKeyUp={event => this.keyPress(event)}
                      onMouseDown={event => this.handleMouseEvent(event)}
                    />
                    <button type="submit"><i className="fa fa-search"></i></button>
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
                            onChange={this.handleChangeZipcode}
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
              <div className={this.props.apiToken ? 'custom-sign-register col-lg-4 col-sm-4 col-md-3 no-padding' : 'custom-sign-register col-lg-3 col-sm-3 col-md-3 no-padding'}>

                <div>{(!this.props.apiToken) ?

                  <div>
                    <div className="width-auto col-lg-4 col-xs-8">

                      <a id="link-Register" title="Register" className="icon"><i className="fa fa-sign-out" aria-hidden="true"></i> Register Now</a>
                    </div>
                    <div className="width-auto col-lg-1 hidden-xs">
                      <span className="icon-bar">|</span>
                    </div>
                    <div className="width-auto col-lg-4 col-xs-4">
                      <a id="link-login" href='/login' title="Login" className="icon"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</a>
                    </div>
                    <div className="width-auto col-lg-4 hidden-lg hidden-sm hidden-md hidden-xs">
                      <span className="icon-bar">|</span>
                    </div>
                    <div className="width-auto col-lg-4 col-xs-4 hidden-lg hidden-sm">
                      {this.props.apiToken && <a href="/view-cart" className="icon cart-mbl-inner"><i className="fa fa-shopping-cart" ></i> 0  Cart</a>
                      }</div>
                  </div>

                  :
                  // { /* condition */ }
                  <div>

                    <div className="dropdown authenticate-dropbtn link-account">
                      <a onClick={this.mblMenu} href="/view-cart" className="btn icon cart-mbl-inner"><i className="fa fa-shopping-cart" ></i>    My Cart({this.state.totalProdInCart}) </a>
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
                                          <div className="product-image">
                                            <a href="#" title={thisProd.name} className="product-image">
                                              <img src={thisProd.image} width="75" alt={thisProd.name} />
                                            </a>
                                          </div>
                                          <div className="product-details">
                                            <p className="product-name">
                                              <a href="#">{thisProd.name}</a>
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
                                          <i style={{ fontSize: '20px' }} className="fa">
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
                                  // this.state.loginShow &&
                                  this.state.wishListProduct &&
                                  this.state.wishListProduct.map((wishListPro, index) => (
                                    <li key={index}>
                                      <div className="product-image">
                                        <a
                                          href={wishListPro.product_url}
                                          title={wishListPro.name}
                                          className="product-image"
                                        >
                                          <img
                                            src={wishListPro.image}
                                            width="75"
                                            alt={wishListPro.name}
                                          />
                                        </a>
                                      </div>
                                      <div className="product-details">
                                        <p className="product-name">
                                          <a href="#">{wishListPro.name}</a>
                                        </p>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                              <a className="secondary-add-btn" href="/customer/account/wishlist" target="_blank">     <span className="secondary-bottom">My Wish List</span></a>
                              {/* <span className="secondary-bottom">My Wish List</span> */}
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
                                  // this.state.loginShow &&
                                  _get(this.state, 'favouriteProducts', []) &&
                                  this.state.favouriteProducts &&
                                  this.state.favouriteProducts.map((favouriteProd, index) => (
                                    <li key={index}>
                                      <div className="product-image">
                                        <a
                                          href="#"
                                          title={favouriteProd.name}
                                          className="product-image"
                                        >
                                          <img
                                            src={favouriteProd.image}
                                            width="75"
                                            alt={favouriteProd.name}
                                          />
                                        </a>
                                      </div>
                                      <div className="product-details">
                                        <p className="product-name">
                                          <a href="#">{favouriteProd.name}</a>
                                        </p>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                              <a className="secondary-add-btn" href="/customer/account/favourites" target="_blank">     <span className="secondary-bottom">My Favourite</span></a>
                            </div>
                          </div>
                          <a href="/customer/account"><i className="fa fa-gear"></i>  My Account</a>
                          <a href="/customer/pastPurchase"><img src={'ReorderImage'} /> Past Purchases</a>
                          <a className="dropdown-item" href="/LogoutContainer">   <i className="fa fa-sign-out"></i> logout</a>
                        </div>
                      </div>
                    </div>

                  </div>
                }</div>
              </div>

              <ul className="nav navbar-nav hidden-lg hidden-sm hidden-md col-xs-12">
                {/* <li className=""><a onClick={this.mblMenu} href="/seasonal-flower-subscription.html">Seasonal Subscription                         </a></li> */}
                <li className=""><a onClick={this.mblMenu} href="/wholesale-flowers/fresh-deals.html"><i className="fa fa-list"></i> Fresh Deals</a></li>
                <li className="category dropdown menu-large" id="dropdownMenuMobile3" >
                  <a className="dropdown-toggle" data-toggle="dropdown" id='dropdownMenuMobileLink3'
                    aria-haspopup="true"><i className="fa fa-list"></i> Shop by Flowers
          <i className="fa fa-angle-down pull-right" onClick={this.toggleOpen}></i>
                  </a>
                  <div className={`megamenu row ${menuClass}`}>
                    <ErrorBoundary>
                      <CategoriesComponenet
                        cateGoriesList={this.state.cateGoriesList} />
                    </ErrorBoundary>
                  </div>
                </li>
                <li className="dropdown menu-large" id="dropdownMenuMobile2">
                  <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-list"></i> Shop by Category
                  <i className="fa fa-angle-down pull-right" onClick={this.toggleOpen1} ></i>
                  </a>
                  <ul className={`dropdown-menu col-xs-12 ${menuClass1}`}>
                    <li><a onClick={this.mblMenu} href="/new-arrivals.html"> New Arrivals </a></li>
                    {/* <li><a onClick={this.mblMenu} href="/preMadeBouquets"> Pre-Made Bouquets </a></li> */}
                    {/* <li><a onClick={this.mblMenu} href="/nextday-delivery"> Next Day Delivery </a></li> */}
                    <li><a onClick={this.mblMenu} href="/best-seller.html">Bestsellers Collection</a></li>
                    {/* <li><a onClick={this.mblMenu} href="/FallCollectionContainer">Fall Collection</a></li> */}
                    <li><a onClick={this.mblMenu} href="/wedding-flowers.html">Wedding Flowers</a></li>
                    <li><a onClick={this.mblMenu} href="/wholesale-flowers/floral-supplies.html">Floral Supplies</a></li>
                  </ul>
                </li>
                <li className=""><a onClick={this.mblMenu} href="/nextday-delivery"> Next Day Delivery </a></li>
                <li className="dropdown menu-large" id="dropdownMenuMobile3">
                  <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-list"></i> Why bloomkonnect
                <i className="fa fa-angle-down pull-right" onClick={this.toggleOpen2}></i>
                  </a>
                  <ul className={`dropdown-menu col-xs-12 ${menuClass2}`}>
                    <li><a onClick={this.mblMenu} href="/about-us">About Us</a></li>
                    <li><a onClick={this.mblMenu} href="/about-us">How it Works</a></li>
                    <li><a onClick={this.mblMenu} href="/about-us">Benefits</a></li>
                    <li><a onClick={this.mblMenu} href="/about-us">Pricing</a></li>
                    <li><a onClick={this.mblMenu} href="/sustainable_floral_fund">Sustainability</a></li>
                  </ul>
                </li>
              </ul>

            </div>
            <div className="col-lg-12 col-sm-12 hidden-xs">
              <ul className="nav navbar-nav desktop-only" id="desktopOnly">
                {/* <li className=""><a href="/seasonal-flower-subscription.html">Seasonal Subscription                         </a></li> */}
                <li className=""><a href="/wholesale-flowers/fresh-deals.html">Fresh Deals</a></li>

                <li className="dropdown category" id="dropdownMenuDesktop3">
                  <a className="dropdown-toggle" type="button"
                    id="dropdownMenuButtonDesktopLink3"
                    data-toggle="dropdown"
                    aria-haspopup="true" href="/wholesale-flowers">Shop by Flowers
                    {/* <i className="fa fa-angle-down " ></i> */}
                  </a>
                  <div className="dropdown-content">
                    <ErrorBoundary>
                      <CategoriesComponenet
                        cateGoriesList={this.state.cateGoriesList} />
                    </ErrorBoundary>
                  </div>
                </li>
                <li className="dropdown menu-large" id="dropdownMenuDesktop2">
                  <a className="dropdown-toggle" data-toggle="dropdown">Shop by Category
                  {/* <i className="fa fa-angle-down " ></i> */}
                  </a>
                  <ul className="dropdown-content">
                    <li><a href="/new-arrivals.html"> New Arrivals </a></li>
                    {/* <li><a href="/preMadeBouquets"> Pre-Made Bouquets </a></li> */}
                    {/* <li><a href="/nextday-delivery"> Next Day Delivery </a></li> */}
                    <li><a href="/best-seller.html">Bestsellers Collection</a></li>
                    {/* <li><a href="/FallCollectionContainer">Fall Collection</a></li> */}
                    <li><a href="/wedding-flowers.html">Wedding Flowers</a></li>
                    <li><a href="/wholesale-flowers/floral-supplies.html">Floral Supplies</a></li>
                  </ul>
                </li>
                <li className=""><a href="/nextday-delivery"> Next Day Delivery </a></li>
                <li className="dropdown menu-large" id="dropdownMenuDesktop3">
                  <a className="dropdown-toggle" data-toggle="dropdown">Why bloomkonnect
                  {/* <span className="pull-right"><i className="fa fa-angle-down " ></i></span> */}
                  </a>
                  <ul className="dropdown-content">
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/about-us">How it Works</a></li>
                    <li><a href="/about-us">Benefits</a></li>
                    <li><a href="/about-us">Pricing</a></li>
                    <li><a href="/sustainable_floral_fund">Sustainability</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className={this.state.condition ? 'menu-overlay animated' : 'menu-overlay'} > </div>
          </div>
        </div>
        <ErrorBoundary>
          <RegisterComponent
            state={this.state}
            isFetching={this.props.isLoading}
            handleInputChange={this.handleInputChange}
            customerRegisterData={this.customerRegisterData}
            handleChange={this.handleChange}
            handleStateChange={this.handleStateChange}
            callback={this.callback}
            verifyCallback={this.verifyCallback}
            handleCheck={this.handleCheck}
            stateListData={this.props.stateListData}
          />
        </ErrorBoundary>
        <div className="back-top-top">
          <ScrollApp />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRegisterData: data => dispatch(fetchCustomerRegisterData(data)),
  getStateListData: data => dispatch(fetchStateListData(data)),
  postTrackUrl: data => dispatch(fetchTrackUrlData(data)),
});

const mapStateToProps = (state) => {
  const { registerReducer, loginReducer } = state;

  const {
    registerData,
    stateListData,
    isFetching: isLoading,
    error: registerError,
  } = registerReducer || [];

  const {
    apiToken,
    categoriesListData,
    error: loginError,
  } = loginReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(registerError) || _isError(registerError);

  return {
    registerData,
    stateListData,
    isLoading,
    apiToken,
    categoriesListData,
    error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(RegisterContainer));
