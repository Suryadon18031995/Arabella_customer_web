import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-bootstrap/lib/Modal';
// import Modal from 'react-bootstrap-modal';
// import Button from 'react-bootstrap/lib/Button';

import ChatBot from 'react-simple-chatbot';
//import SimpleForm from './SimpleForm';
//import Review from './Review';
import Select from "react-select";


import connect from 'react-redux/lib/connect/connect';
import Checkbox from '@material-ui/core/Checkbox';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _groupBy from 'lodash/groupBy';
import Redirect from 'react-router/Redirect';


import axios from 'axios';
import Link from 'react-router-dom/Link';
import logoIcon from './assets/images/LOGO.png';
import navBarIcon from './assets/images/navbar-icon-three.png';
import { mapCustomerRegisterData } from './utils/commonMapper';
import './assets/stylesheets/mediversal.css';
import swal from 'sweetalert';
import {
  fetchLoginResponseData,
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
import {
  fetchOnlineSalesMainData,
  fetchOnlineSalesSubData,
} from './actions/buyMedicine';
import { fetchCustomerRegisterData, fetchTrackUrlData, clearRegisterData } from './actions/register';
import { fetchCategoriesAutoCompleteResult } from './actions/bkm_listing';
import ErrorBoundary from '../src/containers/ErrorBoundary.jsx';
import ReorderImage from './assets/images/reorder.png';
import CategoriesComponenet from './components/Header/categoriesComponent.jsx';
import Suggetion from './components/Header/SuggetionComponent.jsx';
import ScrollApp from './components/ScrollTopComponent/scroll.jsx';
import ErrorHandler from './components/Hoc/ErrorHandler.jsx';
import DropDownMenu from './components/BKMComponent/DropDownMenuComponent.jsx';
import { LoginLoader } from './components/Loader/Loader.jsx';
// import PopupImage from './assets/images/popup_banner.jpg';
import PaypalImage from './assets/images/Paypal_BKM.png';
import SecureImage from './assets/images/security_BKM.png';
import GodaddyImage from './assets/images/godaddy-seal.jpg';
import MaModal from './components/Common/MaterialUIModal.jsx';
import mediversal from './assets/svg/1.svg';
import login from './assets/svg/5.svg';
import medicine from './assets/svg/6.svg';
import test from './assets/svg/7.svg';
import care from './assets/svg/8.svg';
import doc from './assets/svg/9.svg';
import google from './assets/svg/74.svg';
import facebook from './assets/svg/75.svg';
import register from './assets/svg/76.svg';
import favicon from './assets/svg/73.svg';
import pres from './assets/svg/pres.jpg';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: '',
      age: '',
      name:'',
      mobile:'',
      data:[],
      data1:[],
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { gender, age, name, mobile } = steps;

    this.setState({ gender, age, name, mobile });
    
  }

  componentDidMount()
  {
    console.log(this.props);
    //this.state.data.push(this.props.values[0]);
    //his.state.data1.push(this.props.values1[0]);
   this.setState({
      data: this.props.values[0],
   })
   this.setState({
    data1: this.props.values1[0],
 })
    console.log(this.state.data);
    console.log(this.state);
  }

  render() {
    const { gender, age, name, mobile } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td>{mobile.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
            <tr>
              <td>Data</td>
              {this.state.data.map((contact) => (
              <td>{contact.label}</td>
              ))};
            </tr>
            <tr>
              <td>Data1</td>
              {this.state.data1.map((contact) => (
              <td>{contact.label}</td>
              ))};
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};


class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      values: []
    };
    this.triggetNext = this.triggetNext.bind(this);
  }
  onChangeCheckbox = e => {
    const isChecked = !this.state.checked;
    this.setState({
      checked: isChecked,
      values: isChecked ? this.props.options : this.state.values
    });
  };
  onChange = opt => {
    const allOptionsSelected = opt.length === this.props.options.length;
    this.setState({
      checked: allOptionsSelected ? true : false,
      values: opt
    });
    console.log(this.state.values);
  };

  triggetNext() {
    console.log(this.state.values);
    this.props.values.push(this.state.values);
     console.log(this.props);
     
     this.setState({ trigger: true }, () => {
       this.props.triggerNextStep(this.state.values,true);
     });
   }
  render() {
    return (
      <div className="App">
        <div className="row">
        <Select width='220px'
          isMulti
          onChange={this.onChange}
          options={this.props.options}
          value={this.state.values}
        />
        </div>
        <br/>
        <div class="form-row">
                      <div class="col-md-12 text-center">
                          <button type="submit" class="btn btn-primary" onClick={()=>this.triggetNext()}>Submit</button>
                      </div>
                  </div>
      </div>
    );
  }
}

class MultiSelect1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      values: []
    };
    this.triggetNext = this.triggetNext.bind(this);
  }
  onChangeCheckbox = e => {
    const isChecked = !this.state.checked;
    this.setState({
      checked: isChecked,
      values: isChecked ? this.props.options1 : this.state.values
    });
  };
  onChange = opt => {
    const allOptionsSelected = opt.length === this.props.options1.length;
    this.setState({
      checked: allOptionsSelected ? true : false,
      values: opt
    });
    console.log(this.state.values1);
  };

  triggetNext() {
    console.log(this.state.values1);
    this.props.values1.push(this.state.values);
     console.log(this.props);
     
     this.setState({ trigger: true }, () => {
       this.props.triggerNextStep(this.state.values1,true);
     });
   }
  render() {
    return (
      <div className="App">
        <div className="row">
        <Select width='220px'
          isMulti
          onChange={this.onChange}
          options={this.props.options1}
          value={this.state.values}
        />
        </div>
        <br/>
        <div class="form-row">
                      <div class="col-md-12 text-center">
                          <button type="submit" class="btn btn-primary" onClick={()=>this.triggetNext()}>Submit</button>
                      </div>
                  </div>
      </div>
    );
  }
}

class MultiSelect2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      values: []
    };
    this.triggetNext = this.triggetNext.bind(this);
  }
  onChangeCheckbox = e => {
    const isChecked = !this.state.checked;
    this.setState({
      checked: isChecked,
      values: isChecked ? this.props.options2 : this.state.values
    });
  };
  onChange = opt => {
    const allOptionsSelected = opt.length === this.props.options2.length;
    this.setState({
      checked: allOptionsSelected ? true : false,
      values: opt
    });
    console.log(this.state.values2);
  };

  triggetNext() {
    console.log(this.state.values2);
    this.props.values2.push(this.state.values);
     console.log(this.props);
     
     this.setState({ trigger: true }, () => {
       this.props.triggerNextStep(this.state.values2,true);
     });
   }
  render() {
    return (
      <div className="App">
        <div className="row">
        <Select width='220px'
          isMulti
          onChange={this.onChange}
          options={this.props.options2}
          value={this.state.values}
        />
        </div>
        <br/>
        <div class="form-row">
                      <div class="col-md-12 text-center">
                          <button type="submit" class="btn btn-primary" onClick={()=>this.triggetNext()}>Submit</button>
                      </div>
                  </div>
      </div>
    );
  }
}

class MultiSelect3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      values: []
    };
    this.triggetNext = this.triggetNext.bind(this);
  }
  onChangeCheckbox = e => {
    const isChecked = !this.state.checked;
    this.setState({
      checked: isChecked,
      values: isChecked ? this.props.options3 : this.state.values
    });
  };
  onChange = opt => {
    const allOptionsSelected = opt.length === this.props.options3.length;
    this.setState({
      checked: allOptionsSelected ? true : false,
      values: opt
    });
    console.log(this.state.values3);
  };

  triggetNext() {
    console.log(this.state.values);
    this.props.values3.push(this.state.values);
     console.log(this.props);
     
     this.setState({ trigger: true }, () => {
       this.props.triggerNextStep(this.state.values3,true);
     });
   }
  render() {
    return (
      <div className="App">
        <div className="row">
        <Select width='220px'
          isMulti
          onChange={this.onChange}
          options={this.props.options3}
          value={this.state.values}
        />
        </div>
        <br/>
        <div class="form-row">
                      <div class="col-md-12 text-center">
                          <button type="submit" class="btn btn-primary" onClick={()=>this.triggetNext()}>Submit</button>
                      </div>
                  </div>
      </div>
    );
  }
}

class MultiSelect4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      values: []
    };
    this.triggetNext = this.triggetNext.bind(this);
  }
  onChangeCheckbox = e => {
    const isChecked = !this.state.checked;
    this.setState({
      checked: isChecked,
      values: isChecked ? this.props.options4 : this.state.values
    });
  };
  onChange = opt => {
    const allOptionsSelected = opt.length === this.props.options4.length;
    this.setState({
      checked: allOptionsSelected ? true : false,
      values: opt
    });
    console.log(this.state.values4);
  };

  triggetNext() {
    console.log(this.state.values4);
    this.props.values4.push(this.state.values);
     console.log(this.props);
     
     this.setState({ trigger: true }, () => {
       this.props.triggerNextStep(this.state.values4,true);
     });
   }
  render() {
    return (
      <div className="App">
        <div className="row">
        <Select width='220px'
          isMulti
          onChange={this.onChange}
          options={this.props.options4}
          value={this.state.values}
        />
        </div>
        <br/>
        <div class="form-row">
                      <div class="col-md-12 text-center">
                          <button type="submit" class="btn btn-primary" onClick={()=>this.triggetNext()}>Submit</button>
                      </div>
                  </div>
      </div>
    );
  }
}


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
    this.showLoginData = this.showLoginData.bind(this);
    this.toggleCartDropdown = this.toggleCartDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.mblMenu = this.mblMenu.bind(this);
    this.state = {
          firstName: undefined,
          lastName: undefined,
          email: undefined,
          telephone: undefined,
          password: undefined,
          confirmPassword: undefined,
          company: 'NA',
          streetAddress: 'NA',
          city: 'NA',
          zipCode: 'NA',
          country: 'NA',
          state: 'NA',
          taxId: 'NA',
          newsletSub: 'NA',
          zipcode:'',
      
      loginEmail: undefined,
      loginPassword: undefined,
      loading: false,
      categoryData: [],
      navData: [],
      testData: [  ],
      showLogin: false,
      loginForm: false,
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
      catData: undefined,
      catId:'',
      catName:'',
      catLevel:[],
      catDescription:'',
      catImage:'',
      link: false,
      id1: undefined,
      id2: undefined,
      checked: false,
      file: null,
      zipData: undefined,
      showChat: false,
      floating: true,
      options:[
        { label: "खांसी", value: 1 },
        { label: "बुखार", value: 2 },
        { label: "सांस लेने में दिक्कत", value: 3 },
        { label: "इनमे से कोई भी नहीं", value: 4 }
      ],
      options1:[
        { label: "मधुमेह", value: 1 },
        { label: "उच्च रक्त धाब/हाइपरटेंशन", value: 2 },
        { label: "फेफड़ों की बीमारी", value: 3 },
        { label: "दिल की बीमारी", value: 4 },
        { label: "इनमे से कोई भी नहीं", value: 5 }
      ],
      options2:[
        { label: "पिछले 14 दिनों में विदेश यात्रा की", value: 1 },
        { label: "हाल ही में किसी COVID-19 पॉजिटिव व्यक्ति से मिलना हुआ है या ऐसे किसी व्यक्ति के साथ रहे हैं", value: 2 },
        { label: "मैं स्वास्थ्यकर्मी हूँ", value: 3 },
        { label: "इनमे से कोई भी नहीं", value: 4 }
      ],
      options3:[
        { label: "हाल ही में किसी COVID-19 पॉजिटिव व्यक्ति से मिलना हुआ है या ऐसे किसी व्यक्ति के साथ रहा हूँ", value: 1 },
        { label: "मैं एक स्वास्थ्य कर्मचारी हूं और मैंने सुरक्षात्मक गियर के बिना एक COVID-19 पुष्ट मामले की जांच की", value: 2 },
        { label: "इनमे से कोई भी नहीं", value: 3 }
      ],
      options4:[
        { label: "5 दिन से कम", value: 1 },
        { label: "5 दिन से ज्यादा", value: 2 },
        { label: "14 दिन से ज्यादा", value: 5 }
      ],
      values:[],
      values1:[],
      values2:[],
      values3:[],
      values4:[],

    };
    this.props.hideLoginModal({ show: false });
   // this.uploadFiles = this.uploadFiles.bind(this);
   //this.handleChange = this.handleChange.bind(this)
  }

 

  onChange(e) {
    //return files.map(this.uploadFile);
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })
    let files=e.target.files;
    console.log("hhh");
    console.warn("file  jj",files);
    let reader= new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onLoad=(e)=>{
      console.warn(e.target.result);
    }
}

handleChange(event) {
  console.log(event.target.files[0]);
 
}

 

  componentDidUpdate(prevProps) {
    //console.log(prevProps);
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

  handleValidationRegister() {
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


    // telephone
    if (this.state.telephone === undefined || this.state.telephone === '') {
      formIsValid = false;
      errors.telephone = 'Please fill out this field';
    }

    if (this.state.telephone !== undefined) {
      if (this.state.telephone.length < 10) {
        formIsValid = false;
        errors.telephone = 'Please Lengthen this text to 10 Numbers';
      } else {
        const re = /^[0-9\b]+$/;
        if (re.test(this.state.telephone)) {
          // formIsValid = true;
        } else {
          formIsValid = false;
          errors.telephone = 'Please Provide Numeric value';
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
        errors.password = 'Please enter 6 characters or more';
      }
    }

    // confirm password
    if (this.state.confirmPassword === undefined || this.state.confirmPassword === '') {
      formIsValid = false;
      errors.confirmPassword = 'Please fill out this field';
    }

    if (this.state.confirmPassword !== undefined) {
      if (this.state.confirmPassword.length < 6) {
        formIsValid = false;
        errors.confirmPassword = 'Please enter 6 characters or more';
      }
    }

    // Email
    if (this.state.email === undefined || this.state.email === '') {
      formIsValid = false;
      errors.email = 'Please fill out this field';
    }

    if (this.state.email !== undefined && this.state.email !== '') {
      const lastAtPos = this.state.email.lastIndexOf('@');
      const lastDotPos = this.state.email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors.email = 'Email is not valid';
      }
    }

    
    if (this.state.password !== this.state.confirmPassword) {
      alert('Password do not match');
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  }

  

  customerRegisterData = () => {
    if (this.handleValidationRegister()) {
      console.log(this.state.checked);
      if (this.state.checked === true) 
      {
      const reqBody = mapCustomerRegisterData(this.state);
      console.log(reqBody);
      this.props.getRegisterData(reqBody);
      this.setState({ isLoading: false });
      this.showLoginModal();
      this.setState({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        telephone: undefined,
        password: undefined,
        confirmPassword: undefined,
        company: 'NA',
        streetAddress: 'NA',
        city: 'NA',
        zipCode: 'NA',
        country: 'NA',
        state: 'NA',
        taxId: 'NA',
        newsletSub: 'NA',
      });
      }
      else
      {
       alert('Please select terms and conditions') ;
      }
     
    }
  }

  handleInputChange = (event) => {
    console.log([event.target.id]);
    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log(event);
    this.setState({
      errors: {},
    })
    
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

  getData = (data) => {
    console.log(data);
    this.setState({
           catData: data,
           link: true,
         //id1: data.url.substring(data.url.lastIndexOf('/') + 1),
        // id2: data.url.substring(data.url.lastIndexOf('/') + 3),
    });

   
  }

  startChat = () => {
      console.log('start chat');
      
      this.setState({
        showChat: true,
      });
    }

    hideChat = () => {
   
      this.setState({
        showChat: false,
      });
    }

  loginclickFun = () => {
    if (this.handleValidation()) {
      this.setState({
        popupCall: true,
      });
     console.log(this.state.loginEmail);
      this.props.getLoginData({
        email: this.state.loginEmail,
        password: this.state.loginPassword,
      });
    }
     // this.showLoginModal();
      //this.setState({
        //loginEmail: undefined,
        //loginPassword: undefined,
      //});
  };

  handleValidation() {
    const errors = {};
    let formIsValid = true;
    console.log('test');
    console.log(this.state.loginEmail);

    // Email
    if (this.state.loginEmail === undefined) {
      formIsValid = false;
      errors.loginEmail = 'This is a required field.';
    }

    if (typeof this.state.loginEmail !== 'undefined' && this.state.loginEmail !== '') {
      const lastAtPos = this.state.loginEmail.lastIndexOf('@');
      const lastDotPos = this.state.loginEmail.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.loginEmail.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          this.state.loginEmail.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.loginEmail = 'Email is not valid';
      }
    }

    if (this.state.loginPassword === undefined) {
      formIsValid = false;
      errors.loginPassword = 'This is a required field';
    }

    if (typeof this.state.loginPassword !== 'undefined' && this.state.loginPassword !== '') {
      if (this.state.loginPassword.length < 6) {
        formIsValid = false;
        errors.loginPassword =
          'Please enter more than 6 characters.';
      }
    }
    this.setState({ errors });
    console.log(this.state);
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
      showLogin: false,
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

 showRegister  = () => {
    this.setState({
      loginForm: false,
    });
  };

  forgotPassword = () => {
    this.setState({
      showLogin: false,
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
    console.log(nextProps);
    if (!_isEmpty(_get(nextProps, 'registerData'))) {
      if (_get(nextProps.registerData, [0, 'code']) === 1) {
        swal("", "Registered Successfully.", "success");
        this.props.clearRegData();
        this.setState({
          checked: false,
        });
      } else {
        //alert(_get(nextProps.registerData, [0, 'message']));
        swal("", _get(nextProps.registerData, [0, 'message']), "error");
        this.props.clearRegData();
        this.setState({
          checked: false,
        });
      }
    }

    
    if (!_isEmpty(_get(nextProps, 'onlineSalesMain'))) {
      console.log(_get(nextProps, 'onlineSalesMain'));
      if (_get(nextProps.onlineSalesMain, 'code') === 1) {
        console.log(_get(nextProps.onlineSalesMain, 'code'));
        this.setState({
          //...categoryData,
          categoryData: _get(nextProps.onlineSalesMain, 'result.level1')
        })
      }
    }

    
    if (!_isEmpty(_get(nextProps, 'onlineSalesSub')))
     {
      console.log(_get(nextProps, 'onlineSalesSub'));
      if (_get(nextProps, 'onlineSalesSub.code') === 1) {
        console.log(_get(nextProps, 'onlineSalesSub.code'));
        this.setState({
          ///..testData,
          testData: _get(nextProps, 'onlineSalesSub.result.level1')
        })
        
      }
    }
    
    
    if (!_isEmpty(_get(nextProps, 'loginData')) && this.state.popupCall && nextProps.match.path !== '/view-cart') {
      this.setState({
        loginResult: _get(nextProps.loginData, [0, 'message']),
      });
      if (_get(nextProps.loginData, [0, 'message']) === 'success') {
        
        this.setState({
          showLogin: false,
         // cartCount: _get(nextProps.loginData, [0,'total_products_in_cart']),
          //cartProducts: _get(nextProps.loginData, [0,'items']),
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
            showLogin: false,
            showError: true,
            popupCall: false,
          },
          () => {
            //alert('');
            swal("", "Invalid login or password.", "error");
          },
        );
      }
      // this.props.hideLoginModal({ show: false });
    }
   // if (!_isEmpty(_get(nextProps, 'showLoginModal')) && _get(nextProps, 'showLoginModal.show')) {
     // this.handleShow('login');
   // }
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
        //this.props.getCartData({ apiToken: this.props.apiToken });
        //this.props.removeExpiredProducts({ apiToken: this.props.apiToken, cartId: this.props.cartId });
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
    

  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }
    console.log(this.props);
   if(this.props.location.pathname === '/')
    {
      this.props.getMainData();  
    }
    if(this.props.location.pathname === '/')
    {
      this.props.getSubData(); 
    }
    $("#divname").hide();
    axios.post('https://uat.mediversal.tech/index.php/api/customer/getzipcode')
    .then(data => {
      this.setState(state => {
        state.zipcode = data.data.zipcode;
        return state;
      });
      console.log("data", data);

      //HERE IT IS RETURNING EXPECTED DATA       

      console.log(this.state.zipcode);
        }) // this statement will not show you correct result since setState is async 
      .catch(err => {
          console.error("err", err);
      }); 
    //this.props.clearRegData();
   

    const lessThanOneDayAgo = (date) => {
      const DAY = 1000 * 60 * 60 * 24; // 24 hours login time
      const oneDayBefore = Date.now() - DAY;
      return date < oneDayBefore;
    };
    if (this.props.apiToken && this.props.lastUpdatedToken && lessThanOneDayAgo(this.props.lastUpdatedToken)) {
     // this.props.clearLoginData();
    }

    if (this.props.showCartResult) {
      let showCartResult = _get(this.props, 'showCartResult', []);
      if (showCartResult.length > 3) {
        showCartResult = showCartResult.slice(showCartResult.length - 3, showCartResult.length);
      }
      showCartResult.reverse();
      this.setState({ totalProd: showCartResult });
    }

    if(this.props.apiToken !== '')
    {
    //this.props.getCartData({ api_token: this.props.apiToken, spending_point: 1 });
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
    this.setState({ showLogin: false });
  }


  handleShow = (id) => {
    // if (window.screen.width >= 768) {
    this.setState({ showLogin: true });
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

  //removeProduct = (cartRid) => {
    //this.props.getaddRemoveUpdateProduct({
      //apiToken: this.props.apiToken, itemId: cartRid,
    //}, 'DELETE');
  //}

  handleMouseEnter = () => {
    this.setState({ showLargeDropDowns: 'custom-class-trail' });
  }

  handleMouseLeave = () => {
    this.setState({ showLargeDropDowns: '' });
  }

  showLoginModal = () => this.setState(prevState => ({
    showLogin: !prevState.showLogin,
    loginForm: !prevState.loginForm,
  }));

  showLoginData  = () => {
    this.setState({
      loginForm: true,
      
    });
  };

  showPrescriptionModal = () => this.setState(prevState => ({
    showPrescription: !prevState.showPrescription,
  }));



  // eslint-disable-next-line class-methods-use-this
  render() {
   console.log(this.state);
   console.log(this.state.id2);
    if (this.state.link) {
      this.setState({
        link: false,
      });
      return (
        <Redirect push to={{
          pathname: '/Category/'+ this.state.catData.id,
          state: { catId: this.state.catData.id, catName: this.state.catData.name, catLevel: this.state.catData.level, catDescription: this.state.catData.description, catImage: this.state.catData.image },
      }} />
       );
    }
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

    const renderMenu = items => {
      return <ul  class="dropdown-content">
        { items.map(i => {
          return <li >
            <a  href={i.url}>{ i.name }</a>
            {/* i.level && renderMenu(i.level) */}
            </li>
        })}
      </ul>
    }
    
    const Menu =  (data) => {
      console.log(data);
      return <div class="row">
         {data.map((contact) => (
       <div className="col-sm-3 p-10">
                <center>
                  <div class="dropdown">
                  <a href={contact.url}  class="dropbtn">
                    <img src={contact.icon}  style={{height:'50px',width:'50px'}}/>
                    <span className="black-bold">&nbsp;&nbsp;{contact.name}</span>
                   
                  </a>               
                  { renderMenu(contact.level) }
                  </div>
                </center>
               
              
              </div>
             
              
            
         ))}
         </div>
      
    }
    
    return (
      <div className="App">

        <div>
          {this.props.location.pathname !== '/' ? 
          <div>
              <div className="row">
                  <div className="col-sm-3 p-10">
                    <center><a  href="/"><img className="main-image" src={mediversal}/></a></center>
                  </div>
                  <div className="col-sm-6 p-10">
                    <div className="row">
                      <div className="col-sm-9">
                          <div className="search">
                            <button type="submit" className="searchButton1">
                            <i className="fa fa-map-marker"></i>  Delivering to {this.state.zipcode}
                          </button>
                            <input type="text" className="searchTerm" placeholder="Search for Medicine and Lab Test"/>
                            <button type="submit" className="searchButton">
                            <i className="fa fa-search"></i>
                          </button>
                          </div>
                      </div>
                      <div className="col-sm-3">
                      <center><a class="btn" onClick={this.showPrescriptionModal} style={{borderRadius:'10px',margin:'9px',height:'36px',width:'135px',backgroundColor:'#0077BF',textTransform: 'none',fontSize: '10px', paddingTop: '9px'}}>Upload Prescription </a></center>
                      </div>
                   </div>
                   </div>
                   {this.props.apiToken === '' ?
                <div className="col-sm-3 p-10 mt-15">
                  <center><a onClick={this.showLoginModal}><img src={login} style={{height:'15px',width:'15px'}}/>&nbsp;&nbsp;Login / Register</a></center>
                </div>
                : 
                <div className="col-sm-3 p-10 mt-15">
                  <div className="row">
                  <div className="col-sm-3">
                    <div class="dropdown2">
                    <span class="fa-stack  has-badge" style={{fontSize: '1.5em',marginTop:'-10px'}} data-count={this.props.cartCount}>
                        <i class="fa fa-circle fa-stack-2x fa-inverse"></i>
                        <i class="fa fa-shopping-cart fa-stack-2x red-cart"></i>
                 </span>
                         <div class="dropdown-content2">
                          <ul class="list-cart-summary hidden-xs">
                            <li>
                            <span><b>Order Summary</b></span>
                            <span class="cartCount pull-right">{this.props.cartCount} Item(s)</span>
                            </li>
                            <hr></hr>
                            {this.props.cartProducts && this.props.cartProducts.map((contact) => (
                           <li>
                            <span>{contact.name.substring(0, 15)}</span>
                            <span className="pull-right">Qty: {contact.qty}</span>
                           </li>
                            ))}
                            <li class="more-items" style={{display: 'none'}}>
                            <a class="button-text"></a>
                            </li>
                            <br/>

                            <li class="text-center">
                            <a data-value="proceedToCart" href='/view-cart' style={{color:'#0087b0'}} class="button-text btn-proceed-cart">PROCEED TO CART</a>
                            </li>
                            </ul>
                        </div>
                   </div>
                   </div>
                   <div className="col-sm-9">
                   <div class="dropdown3">
                       <span>Welcome {this.props.loginData[0].result.cust_name} !</span>
                         <div class="dropdown-content3">
                         <ul class="list-cart-summary hidden-xs">
                         <li class="more-items">
                            <a class="button-text" href="/customer/account">My Account(Pending)</a>
                            </li>
                            <li class="more-items">
                            <a class="button-text" href="/logoutSuccess">Logout</a>
                            </li>
                            </ul>
                        </div>
                   </div>    
                 </div>
                 </div>

              </div>  
                /*<center>Welcome {this.props.loginData[0].result.cust_name} !</center>
                <React.Fragment>
                <Link to='/view-cart'>My Bag</Link><br/>
              <Link to='/logoutSuccess'>Logout</Link>
              </React.Fragment>
      </div>*/
                }
              </div>
              <div className="row">
              {this.state.categoryData.map((contact) => (
                    <ul className="col-sm-3 p-10">
                      <center>
                          <li className="parent">
                              <a href={contact.url}>
                              <img src={contact.icon}  style={{height:'50px',width:'50px'}}/>
                              <span className="black-bold">&nbsp;&nbsp;                              
                              {contact.name}                              
                              </span>
                              </a>
                              
                             
                              {
                              contact.level && contact.level.length > 0 && contact.include_in_menu === '1' ?
                                <ul className="child" style={{paddingLeft:'80px'}}>
                               {contact.level.map((contact1) => (
                                 <center>
                                   {contact1.include_in_menu === '1' &&
                                <li className="parent">
                                   <a href={contact1.url}>{contact1.name}
                                   { contact1.level && contact1.level.length > 0 ?
                                   <span class="expand">» </span>: '' }
                                   
                                   </a>

                                   { contact1.level && contact1.level.length > 0 &&
                                            <ul className="child" >
                                            {contact1.level.map((contact2) => (
                                             <li className="parent">
                                                <a href={contact2.url}>{contact2.name}</a>
                                                { contact2.level && contact2.level.length > 0 &&
                                                   <span class="expand">» </span> }
                                                
                                               { contact2.level && contact2.level.length > 0 &&
                                                          <ul className="child" >
                                                            {contact2.level.map((contact3) => (
                                                              <li className="parent" href={contact3.url}>
                                                                <a href={contact3.url}>{contact3.name}</a>
                                                                </li>
                                                      
                                                      ))}
                                                      </ul>
                                                }



                                             </li>
                                             
                                             ))}
                                             </ul>
                                      }

                                </li>
                                } </center>
                                              
                                
                                ))}
                                 
                                 </ul>
                             :
                             <li></li>
                              }
                            
                         </li>
                      </center>
                     
                    </ul>
                    
                   ))}
              </div>
              {/*Menu(this.state.categoryData*/}
            <nav className="navbar-default bg-blue" style={{marginBottom: '0px !important',border: '0px !important'}}>
                <div className="container-fluid bg-blue">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav row" style={{float:'none !important'}}>
                    <li className="col-sm-1" style={{paddingLeft: '0px',paddingRight: '0px'}}></li>
                   
                   
                    {this.state.testData.map((contact) => (
                    <li  className="parent1 col-sm-2" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                                 <a onClick={() => this.getData(contact)} style={{color: '#ffffff',fontWeight: '300',fontSize: '14px'}}>
                                 <center>{contact.name}</center>
                                 </a>
                                 
                                
                                 {
                                 contact.level && contact.level.length > 0 ?
                                   <ul className="child1" style={{paddingLeft:'20px'}}>
                                  {contact.level.map((contact1) => (
                                   <li  className="parent1">
                                      <a onClick={() => this.getData(contact1)}  style={{paddingLeft:'10px',textDecoration: 'none',display: 'block',width: '100%',height: '100%'}}>{contact1.name}
                                      { contact1.level && contact1.level.length > 0 ?
                                      <span class="expand1">» </span>: '' }
                                      
                                      </a>
   
                                      { contact1.level && contact1.level.length > 0 ?
                                               <ul className="child1">
                                               {contact1.level.map((contact2) => (
                                                <li   className="parent1">
                                                         <a onClick={() => this.getData(contact2)} style={{paddingLeft:'10px',textDecoration: 'none',display: 'block',width: '100%',height: '100%'}}>{contact2.name}
                                                              { contact2.level && contact2.level.length > 0 ?
                                                              <span class="expand1">» </span>: '' }
                                                              
                                                              </a>

                                                      { contact2.level && contact2.level.length > 0 ?
                                                        <ul className="child1">
                                                        {contact2.level.map((contact3) => (
                                                          <li  className="parent1">
                                                            <a  onClick={() => this.getData(contact3)} style={{paddingLeft:'10px',textDecoration: 'none',display: 'block',width: '100%',height: '100%'}}>{contact3.name}
                                                            { contact3.level && contact3.level.length > 0 ?
                                                              <span class="expand1">» </span>: '' }
                                                            </a>

                                                                      { contact3.level && contact3.level.length > 0 ?
                                                                  <ul className="child1">
                                                                  {contact3.level.map((contact4) => (
                                                                    <li key={contact4}  className="parent1" style={{float:'left'}}>
                                                                      <a onClick={() => this.getData(contact4)}  style={{paddingLeft:'10px',textDecoration: 'none',display: 'block',width: '100%',height: '100%'}}>{contact4.name}</a>
                                                                    </li>
                                                                    
                                                                    ))}
                                                                    </ul>
                                                                    :<li></li>}
                                                          </li>
                                                          
                                                          ))}
                                                          </ul>
                                                          :<li></li>}
                                                </li>
                                                
                                                ))}
                                                </ul>
                                                :<li></li>}
   
                                   </li>
                                  
                                                 
                                   
                                   ))}
                                    
                                    </ul>
                                :
                                <li></li>
                                 }
                               
                            </li>
                       
                    ))}
                      <li className="col-sm-1" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                      </li>
                  </ul>
                  </div>
                </div>
              </nav>
              
              <div className="header-banner-small" > 
              <div className="row fixed-header" id="divname" style={{height:'60px'}}> 
                    <div className="col-sm-1 p-5">
                      <center><img src={favicon} style={{height:'47px',width:'37px'}}/></center>
                    </div>
                    <div className="col-sm-3 p-5"> 
                       <div className="row">
                       {this.state.categoryData.map((contact) => (
                    <div className="col-sm-3 p-5">
                      <center>
                          <li className="parent">
                              <a href={contact.url}>
                              <img src={contact.icon}  style={{height:'37px',width:'37px'}}/>
                              </a>
                              
                             
                              {
                              contact.level && contact.level.length > 0 ?
                                <ul className="child" style={{marginLeft:'20px'}}>
                               {contact.level.map((contact1) => (
                                 <center>
                                  {contact1.include_in_menu === '1' && 
  
                                <li className="parent">
                                   <a href={contact1.url}>{contact1.name}
                                   { contact1.level && contact1.level.length > 0 ?
                                   <span class="expand">» </span>: '' }
                                   
                                   </a>

                                   { contact1.level && contact1.level.length > 0 &&
                                            <ul className="child" >
                                            {contact1.level.map((contact2) => (
                                             <li className="parent">
                                                <a href={contact2.url}>{contact2.name}</a>
                                                { contact2.level && contact2.level.length > 0 ?
                                                 <span class="expand">» </span>: '' }
                                                { contact2.level && contact2.level.length > 0 &&
                                            <ul className="child" >
                                            {contact2.level.map((contact3) => (
                                             <li className="parent">
                                                <a href={contact3.url}>{contact3.name}</a>
                                             </li>
                                             
                                             ))}
                                             </ul>
                                             }



                                             </li>
                                             
                                             ))}
                                             </ul>
                                             }

                                </li>
                                } </center>
                                              
                                
                                ))}
                                 
                                 </ul>
                             :
                             <li></li>
                              }
                            
                         </li>
                      </center>
                     
                    </div>
                    
                   ))}                          
                        </div>
                    </div>
                    <div className="col-sm-7" style={{paddingTop: '6px'}}>
                      <div className="row">
                        <div className="col-sm-9">
                        <center>
                            <div className="search">
                            <button type="submit" className="searchButton1">
                              <i className="fa fa-map-marker"></i>  Delivering to {this.state.zipcode}
                            </button>
                              <input type="text" className="searchTerm" placeholder="Search for Medicine and Lab Test"/>
                              <button type="submit" className="searchButton">
                              <i className="fa fa-search"></i>
                            </button>
                            </div>
                            </center>  
                        </div>
                        <div className="col-sm-3">
                        <center><a style={{borderRadius:'10px',margin:'9px',height:'37px',width:'123px',backgroundColor:'#0077BF',textTransform: 'none',fontSize: '9px', paddingTop: '9px'}} className="btn">Upload <br/> Prescription </a></center>
                        </div>
                      </div>
                    </div>  
                    {this.props.apiToken === '' ?                  
                    <div className="col-sm-1 p-5">
                      <center>
                        <a  onClick={this.showLoginModal}>
                      <img src={login} style={{height:'15px',width:'15px',margin: '20px'}}/>
                      </a>
                      </center>
                    </div>:
                    <div className="col-sm-1 p-5" style={{marginLeft: '-26px',marginTop: '16px'}}>
                    <center>
                    Welcome {this.props.loginData[0].result.fname} 
                   
                    </center>
                  </div>
                    }
                </div>
            </div>
                
                
            </div>:
            <div>
              <div className="row">
                <div className="col-sm-3 p-10">
                  <center><a  href="/"><img className="main-image" src={mediversal}/></a></center>
                </div>
                <div className="col-sm-6 p-10">
                  <div className="row">
                    <div className="col-sm-9">
                        <div className="search">
                          <button type="submit" className="searchButton1">
                          <i className="fa fa-map-marker"></i>  Delivering to {this.state.zipcode}
                        </button>
                          <input type="text" className="searchTerm" placeholder="Search for Medicine and Lab Test"/>
                          <button type="submit" className="searchButton">
                          <i className="fa fa-search"></i>
                        </button>
                        </div>
                    </div>
                    <div className="col-sm-3">
                      <center><a class="btn" onClick={this.showPrescriptionModal} style={{borderRadius:'10px',margin:'9px',height:'36px',width:'135px',backgroundColor:'#0077BF',textTransform: 'none',fontSize: '10px', paddingTop: '9px'}}>Upload Prescription </a></center>
                    </div>
                 </div>
                 </div>
                 {this.props.apiToken === '' ?
                <div className="col-sm-3 p-10 mt-15">
                  <center><a onClick={this.showLoginModal}><img src={login} style={{height:'15px',width:'15px'}}/>&nbsp;&nbsp;Login / Register</a></center>
                </div>
                : 
                <div className="col-sm-3 p-10 mt-15">
              <div className="row">
                  <div className="col-sm-3">
                    <div class="dropdown2">
                    <span class="fa-stack  has-badge" style={{fontSize: '1.5em',marginTop:'-10px'}} data-count={this.props.cartCount}>
                        <i class="fa fa-circle fa-stack-2x fa-inverse"></i>
                        <i class="fa fa-shopping-cart fa-stack-2x red-cart"></i>
                 </span>
                         <div class="dropdown-content2">
                          <ul class="list-cart-summary hidden-xs">
                            <li>
                            <span><b>Order Summary</b></span>
                            <span class="cartCount pull-right">{this.props.cartCount} Item(s)</span>
                            </li>
                            <hr></hr>
                            {this.props.cartProducts && this.props.cartProducts.map((contact) => (
                           <li>
                            <span>{contact.name.substring(0, 15)}</span>
                            <span className="pull-right">Qty: {contact.qty}</span>
                           </li>
                            ))}
                            <li class="more-items" style={{display: 'none'}}>
                            <a class="button-text"></a>
                            </li>
                            <br/>

                            <li class="text-center">
                            <a data-value="proceedToCart" href='/view-cart' style={{color:'#0087b0'}} class="button-text btn-proceed-cart">PROCEED TO CART</a>
                            </li>
                            </ul>
                        </div>
                   </div>
                   </div>
                   <div className="col-sm-9">
                   <div className="dropdown3">
                       <span>Welcome {this.props.loginData[0].result.cust_name} !</span>
                         <div className="dropdown-content3">
                         <ul className="list-cart-summary hidden-xs">
                         <li className="more-items">
                            <a className="button-text" href="/customer/account">My Account(Pending)</a>
                            </li>
                            <li className="more-items">
                            <a className="button-text"  href="/logoutSuccess">Logout</a>
                            </li>
                            </ul>
                        </div>
                   </div>    
                 </div>
                 </div>

              </div>
                }
              </div>
              <div className="row">
              {this.state.categoryData.map((contact) => (
                    <ul className="col-sm-3 p-10">
                      <center>
                          <li className="parent">
                              <a href={contact.url}>
                              <img src={contact.icon}  style={{height:'50px',width:'50px'}}/>
                              <span className="black-bold">&nbsp;&nbsp;                              
                              {contact.name}                              
                              </span>
                              </a>
                              
                             
                              {
                              contact.level && contact.level.length > 0 && contact.include_in_menu === '1' ?
                                <ul className="child" style={{paddingLeft:'80px'}}>
                               {contact.level.map((contact1) => (
                                 <center>
                                   {contact1.include_in_menu === '1' &&
                                <li className="parent">
                                   <a href={contact1.url}>{contact1.name}
                                   { contact1.level && contact1.level.length > 0 ?
                                   <span class="expand">» </span>: '' }
                                   
                                   </a>

                                   { contact1.level && contact1.level.length > 0 &&
                                            <ul className="child" >
                                            {contact1.level.map((contact2) => (
                                             <li className="parent">
                                                <a href={contact2.url}>{contact2.name}</a>
                                                { contact2.level && contact2.level.length > 0 &&
                                                   <span class="expand">» </span> }
                                                
                                               { contact2.level && contact2.level.length > 0 &&
                                                          <ul className="child" >
                                                            {contact2.level.map((contact3) => (
                                                              <li className="parent" href={contact3.url}>
                                                                <a href={contact3.url}>{contact3.name}</a>
                                                                </li>
                                                      
                                                      ))}
                                                      </ul>
                                                }



                                             </li>
                                             
                                             ))}
                                             </ul>
                                      }

                                </li>
                                } </center>
                                              
                                
                                ))}
                                 
                                 </ul>
                             :
                             <li></li>
                              }
                            
                         </li>
                      </center>
                     
                    </ul>
                    
                   ))}
              </div>
              <nav className="navbar-default bg-blue" style={{marginBottom: '0px !important',border: '0px !important'}}>
                <div className="container-fluid bg-blue">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    
                  <ul className="nav row" style={{float:'none !important'}}>
                    <li className="col-sm-1" style={{paddingLeft: '0px',paddingRight: '0px'}}></li>
                   
                    {this.state.testData.map((contact) => (
                    <li  className="parent1 col-sm-2" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                                 <a onClick={() => this.getData(contact)} style={{color: '#ffffff',fontWeight: '300',fontSize: '14px'}}>
                                 <center>{contact.name}</center>
                                 </a>
                                 
                                
                                 {
                                 contact.level && contact.level.length > 0 ?
                                   <ul className="child1" style={{paddingLeft:'20px'}}>
                                  {contact.level.map((contact1) => (
                                   <li  className="parent1">
                                      <a onClick={() => this.getData(contact1)}  style={{paddingLeft:'10px',textDecoration: 'none',display: 'block',width: '100%',height: '100%'}}>{contact1.name}
                                      { contact1.level && contact1.level.length > 0 ?
                                      <span class="expand1">» </span>: '' }
                                      
                                      </a>
   
                                      { contact1.level && contact1.level.length > 0 ?
                                               <ul className="child1">
                                               {contact1.level.map((contact2) => (
                                                <li   className="parent1">
                                                         <a onClick={() => this.getData(contact2)} style={{paddingLeft:'10px',textDecoration: 'none',display: 'block',width: '100%',height: '100%'}}>{contact2.name}
                                                              { contact2.level && contact2.level.length > 0 ?
                                                              <span class="expand1">» </span>: '' }
                                                              
                                                              </a>

                                                      { contact2.level && contact2.level.length > 0 ?
                                                        <ul className="child1">
                                                        {contact2.level.map((contact3) => (
                                                          <li  className="parent1">
                                                            <a  onClick={() => this.getData(contact3)} style={{paddingLeft:'10px',textDecoration: 'none',display: 'block',width: '100%',height: '100%'}}>{contact3.name}
                                                            { contact3.level && contact3.level.length > 0 ?
                                                              <span class="expand1">» </span>: '' }
                                                            </a>

                                                                      { contact3.level && contact3.level.length > 0 ?
                                                                  <ul className="child1">
                                                                  {contact3.level.map((contact4) => (
                                                                    <li key={contact4}  className="parent1" style={{float:'left'}}>
                                                                      <a onClick={() => this.getData(contact4)}  style={{paddingLeft:'10px',textDecoration: 'none',display: 'block',width: '100%',height: '100%'}}>{contact4.name}</a>
                                                                    </li>
                                                                    
                                                                    ))}
                                                                    </ul>
                                                                    :<li></li>}
                                                          </li>
                                                          
                                                          ))}
                                                          </ul>
                                                          :<li></li>}
                                                </li>
                                                
                                                ))}
                                                </ul>
                                                :<li></li>}
   
                                   </li>
                                  
                                                 
                                   
                                   ))}
                                    
                                    </ul>
                                :
                                <li></li>
                                 }
                               
                            </li>
                       
                    ))}
                       <li className="col-sm-1" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                      </li>
                  </ul>
                  </div>
                </div>
              </nav>
              <div className="header-banner-small" > 
                  <div className="row fixed-header" id="divname" style={{height:'60px'}}> 
                    <div className="col-sm-1 p-5">
                      <center><img src={favicon} style={{height:'47px',width:'37px'}}/></center>
                    </div>
                    <div className="col-sm-3 p-5"> 
                       <div className="row">
                       {this.state.categoryData.map((contact) => (
                    <div className="col-sm-3 p-5">
                      <center>
                          <li className="parent">
                              <a href={contact.url}>
                              <img src={contact.icon}  style={{height:'37px',width:'37px'}}/>
                              </a>
                              
                             
                              {
                              contact.level && contact.level.length > 0 && contact.include_in_menu === '1' ?
                                <ul className="child" style={{marginLeft:'20px'}}>
                               {contact.level.map((contact1) => (
                                 <center>
                                   {contact1.include_in_menu === '1' &&
                                <li className="parent">
                                   <a href={contact1.url}>{contact1.name}
                                   { contact1.level && contact1.level.length > 0 ?
                                   <span class="expand">» </span>: '' }
                                   
                                   </a>

                                   { contact1.level && contact1.level.length > 0 && 
                                            <ul className="child">
                                            {contact1.level.map((contact2) => (
                                             <li className="parent">
                                                <a href={contact2.url}>{contact2.name}</a>
                                             </li>
                                             
                                             ))}
                                             </ul>}

                                </li>
                               
                              } </center>             
                                
                                ))}
                                 
                                 </ul>
                             :
                             <li></li>
                              }
                            
                         </li>
                      </center>
                     
                    </div>
                    
                   ))}                          
                        </div>
                    </div>
                    <div className="col-sm-7" style={{paddingTop: '6px'}}>
                      <div className="row">
                        <div className="col-sm-9">
                        <center>
                            <div className="search">
                            <button type="submit" className="searchButton1">
                              <i className="fa fa-map-marker"></i>  Delivering to {this.state.zipcode}
                            </button>
                              <input type="text" className="searchTerm" placeholder="Search for Medicine and Lab Test"/>
                              <button type="submit" className="searchButton">
                              <i className="fa fa-search"></i>
                            </button>
                            </div>
                            </center>  
                        </div>
                        <div className="col-sm-3">
                          <center><a style={{borderRadius:'10px',margin:'9px',height:'37px',width:'123px',backgroundColor:'#0077BF',textTransform: 'none',fontSize: '9px', paddingTop: '9px'}} className="btn">Upload <br/> Prescription </a></center>
                        </div>
                      </div>
                    </div>                    
                    {this.props.apiToken === '' ?                  
                    <div className="col-sm-1 p-5">
                      <center>
                        <a  onClick={this.showLoginModal}>
                      <img src={login} style={{height:'15px',width:'15px',margin: '20px'}}/>
                      </a>
                      </center>
                    </div>:
                    <div className="col-sm-1 p-5" style={{marginLeft: '-26px',marginTop: '16px'}}>
                    <center>
                    Welcome {this.props.loginData[0].result.fname}
                    </center>
                  </div>
                    }
                </div>
                </div>
                 
          </div>
        
        }
        </div>
        
        {this.props.children}
        <MaModal open={this.state.showLogin} handleCloseModal={this.showLoginModal}>
         {this.state.loginForm ? 
          <div className='text-center' style={{marginLeft:'30px',marginRight:'30px'}}>
          <button type="button" className="close" onClick={this.showLoginModal} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" style={{fontSize:'30px'}}>&times;</span>
        </button>
          <div className='cust-margin-login'>          
          <h3>Please Sign In</h3><br/>
          <center><p><i>Enjoy the convenience of a single account across all</i></p></center>
          </div> 
          <div className="row">
          <center>
         <img src={google} style={{height:'70px',width:'70px'}}/>
     
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src={facebook} style={{height:'70px',width:'70px'}}/>  
          </center>
          </div>
          <br/>

          <div className="row">
            <center>
          Or via email
           </center>
           </div>
           <br/>
            <div className="row"  style={{position: 'relative'}}>
                <div className="md-form col-md-3">
              </div>
              <div className="md-form col-md-6">
                <i className="fas fa-envelope prefix"  style={{color:'#2fafcc'}}></i>
                <input type="email" autocomplete="new-password" required name="loginEmail" id="loginEmail" onChange={this.handleInputChange}/>
                <label  for="loginEmail"  style={{fontSize:'12px',marginLeft: '4.0rem',marginTop: '-12px'}}>Email Address</label>
                
              </div>
              <div className="md-form col-md-3">
              <span className={`${ this.state.errors.loginEmail }`? 'blink' : ''}>{this.state.errors.loginEmail}</span>
              </div>
              </div>
              <div className="row"  style={{position: 'relative'}}>
              <div className="md-form col-md-3">
              </div>
              <div className="md-form col-md-6">
                <i className="fa fa-lock prefix"  style={{color:'#2fafcc',fontSize:'26px'}}></i>
                <input type="password" autocomplete="new-password" required name="loginPassword" id="loginPassword" onChange={this.handleInputChange}/>
                <label  for="loginPassword"  style={{fontSize:'12px',marginLeft: '4.0rem',marginTop: '-12px'}}>Create Password</label>
               
              </div>
              <div className="md-form col-md-3">
              <span className={`${ this.state.errors.loginPassword }`? 'blink' : ''}>{this.state.errors.loginPassword}</span>
              </div>
              </div>
              <div>
               <div className="row">
               <div className="md-form col-md-3">
                </div>
                 <div className="md-form col-md-6">
                           <div class="row" style={{marginTop: '-30px'}}>
                               <div className="md-form col-md-3">
                                  
                               </div>
                              <div  className="md-form col-md-9">
                                 <a style={{marginRight: '-100px'}} href="">Forgot password?</a>
                              </div>
                          </div>
                   </div>
                 <div className="md-form col-md-3">
                  </div>
               </div>
               <div class="row">
                 <center>
                      <button className="btn" onClick={this.loginclickFun} style={{height: '36px', width: '200px',fontSize: '15px',backgroundColor:'#0077bf',color:'white'}} type="submit">Sign in</button>
                  </center>
              </div>
              <br/>
                 <div class="row">
                   <center>
                    <p>Not a member?&nbsp;
                        <a onClick={this.showRegister} style={{color:'blue'}}>Register</a>
                    </p>
                    </center>                        
                       
                </div>
            </div>
            <div>

            </div>


           </div>
           :
           <div><div className='text-center' style={{marginLeft:'30px',marginRight:'30px'}}>
           <button type="button" className="close" onClick={this.showLoginModal} data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" style={{fontSize:'30px'}}>&times;</span>
         </button>
           <div className='cust-margin-login'>          
           <h3>Please Register</h3>
           <center><p><i>Enjoy the convenience of a single account across all</i></p></center>
           </div> 
           <div className="row">
           <center>
          <img src={google} style={{height:'50px',width:'50px'}}/>
      
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <img src={facebook} style={{height:'50px',width:'50px'}}/>  
           </center>
           </div>
           <div className="row">
             <center>
           Or via email
            </center>
            </div>
             <div className=" row" style={{position: 'relative',marginTop:'12px'}}>
               <div className="md-form col-md-6">
                 <i className="fas fa-user prefix" style={{color:'#2fafcc'}}></i>
                 <input type="text" id="firstName" autocomplete="new-password" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
                 <label  for="firstName" style={{fontSize:'12px',marginLeft: '4.0rem',marginTop: '-12px'}}>Enter First name</label>
                 <span className={`${ this.state.errors.lastName }`? 'blink' : ''}>{this.state.errors.lastName}</span>
               </div>
               <div className="md-form col-md-6">
                 <i className="fas fa-user prefix" style={{color:'#2fafcc'}}></i>
                 <input type="text" id="lastName" autocomplete="new-password" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}/>
                 <label  for="lastName" style={{fontSize:'12px',marginLeft: '4.0rem',marginTop: '-12px'}}>Enter Last name</label>
                 <span className={`${ this.state.errors.lastName }`? 'blink' : ''}>{this.state.errors.lastName}</span>
               </div>
             </div>
             <div className="row"  style={{position: 'relative',marginTop:'12px'}}>
               <div className="md-form col-md-6">
                 <i className="fas fa-envelope prefix"  style={{color:'#2fafcc'}}></i>
                 <input type="email" autocomplete="new-password" id="email" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                 <label for="email"  style={{fontSize:'12px',marginLeft: '4.0rem',marginTop: '-12px'}}>Email Address</label>
                 <span className={`${ this.state.errors.email }`? 'blink' : ''}>{this.state.errors.email}</span>
               </div>
 
               <div className= "md-form  col-md-6">
                 <i className="fa fa-mobile prefix"  style={{color:'#2fafcc',fontSize:'26px'}}></i>
                 <input type="text" autocomplete="new-password" id="telephone" name="telephone"  value={this.state.telephone} onChange={this.handleInputChange}/>
                 <label  for="telephone"  style={{fontSize:'12px',marginLeft: '4.0rem',marginTop: '-12px'}}>Phone Number</label>
                 <span className={`${ this.state.errors.telephone }`? 'blink' : ''}>{this.state.errors.telephone}</span>
               </div>
               </div>
               <div className="row"  style={{position: 'relative',marginTop:'12px'}}>
               <div className="md-form col-md-6">
                 <i className="fa fa-lock prefix"  style={{color:'#2fafcc',fontSize:'26px'}}></i>
                 <input type="email" autocomplete="new-password" id="password" className="password"  value={this.state.password} onChange={this.handleInputChange}/>
                 <label for="password"  style={{fontSize:'12px',marginLeft: '4.0rem',marginTop: '-12px'}}>Create Password</label>
                 <span className={`${ this.state.errors.password }`? 'blink' : ''}>{this.state.errors.password}</span>
               </div>
               <div className="md-form col-md-6">
                 <i className="fa fa-lock prefix"  style={{color:'#2fafcc',fontSize:'26px'}}></i>
                 <input type="text" autocomplete="new-password" id="confirmPassword" className="confirmPassword"  value={this.state.confirmPassword} onChange={this.handleInputChange}/>
                 <label for="confirmPassword"  style={{fontSize:'12px',marginLeft: '4.0rem',marginTop: '-12px'}}>Confirm Password</label>
                 <span className={`${ this.state.errors.confirmPassword }`? 'blink' : ''}>{this.state.errors.confirmPassword}</span>
               </div>
               </div>
               <div>
               <div class="row">
                       <center>
                                 <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
                                
                             &nbsp;
                                 <label style={{fontColor:'#2fafcc',fontSize:'12px'}}>
                                 Terms and Conditions</label>
                       </center>       
                        
                 </div>
             </div>
             <div>
             <center>
               <a onClick={this.customerRegisterData}>
             <img src={register} style={{height:'65px',width:'200px'}}/>
             </a>
             </center>
 
             </div>
             <br/>
                 <div class="row" style={{marginTop:'-10px'}}>
                   <center>
                    <p>Have an Account?&nbsp;
                        <a onClick={this.showLoginData} style={{color:'blue'}}>Login</a>
                    </p>
                    </center>                        
                       
                </div>
 
 
            </div></div>}
        </MaModal>
        <MaModal open={this.state.showPrescription} handleCloseModal={this.showPrescriptionModal}>
          <div className='text-center'>
            <br/><br/>
              <div className='text-center' style={{marginLeft:'30px',marginRight:'30px'}}>
                 <button type="button" className="close" onClick={this.showPrescriptionModal} data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true" style={{fontSize:'30px'}}>&times;</span>
                  </button>
             </div> 
             <div className="form-group files color">
                  {this.state.file === null?
              <img src={pres} style={{height:'300px',width:'300px'}}/> :
             <img src={this.state.file} style={{height:'300px',width:'300px'}}/>}\
             
              </div>
                <br/><br/>
              <div>

              <center>
                     <label style={{padding: '10px',background: '#007abf',display: 'table', color: '#fff',width:'200px'}}>
                        Browse And Upload
                      <input type="file" name="file" onChange={(e) => this.onChange(e)}/>
                    </label>
                </center> 
              </div>

          </div>
        </MaModal>
        <div className="footer-section-custom mt-4">
          <div className="row p-20">
            <div className="col-sm-4 p-20">
              <ul className="ul-style" >
              <li href="/" style={{fontWeight: '600',fontSize: '14px'}}>
                   Home
                   <br/><br/>
                   </li>
              {this.state.testData.map((contact) => (
                <li style={{fontWeight: '600' ,marginTop:'10px'}}>
                  <a onClick={() => this.getData(contact)} style={{fontSize: '14px'}}>
                   {contact.name} 
                   </a>
                   <br/><br/>
                   </li>

                ))}
              </ul>
            </div>
            <div className="col-sm-4 p-20">
                <h4 className="f-25b">Corporate Office</h4>
                <p className="f-16b">508-509, 5Th Floor, Hariniwas complex,
                <br/>
                Near Dakbunglow Chawk,
                <br/>
                Patna - 800001, Bihar</p>
                <br/><br/>
                <h4 className="f-25b">Head Office</h4>
                <p className="f-16b">508-509, 5Th Floor, Hariniwas complex,
                <br/>
                Near Dakbunglow Chawk,
                <br/>
                Patna - 800001, Bihar</p>
              </div>
              <div className="col-sm-4 p-20">
              <h4 className="f-25b">Hospital Address</h4>
              <p className="f-16b">Mediversal Superspeciality Hospital
              <br/>
              (A unit of Mediversal Healthcare Pvt. Ltd)
              <br/>
              Doctors' Colony, Kankarbagh,
              <br/>
              Patna - 800020, Bihar</p>
              <br/><br/>
              <p className="f-16b">Phone : +919608600365
              <br/>
              Email : info@mediversal.in</p>
            </div>
          </div>
        </div>
        <div className = "footer">Footer</div>
        <div className = "bot">
        <div style ={{display: this.state.showChat ? "" : "none"}}>
        <ErrorBoundary>
        <ChatBot 
        toggleFloating='true'
        className="data-css"
        headerComponent={this.state.floating && (
         <div className="rsc-data">
           <div ></div>
            <h4>Covid 19</h4>
           <a style={{marginRight:'13px'}} onClick={() => this.hideChat()}>X</a>
           </div>
        )}
         handleEnd='true'
         steps={[
          {
            id: '3',
            message: 'आपका लिंग क्या है?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'पुरुष', label: 'पुरुष', trigger: '5' },
              { value: 'महिला', label: 'महिला', trigger: '5' },
              { value: 'अन्य', label: 'अन्य', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'कृपया अपनी आयु लिखें।',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: 'a',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },
          {
            id: 'a',
            message: 'क्या आप नीचे लिखे हुए लक्षणों में से किसी का अनुभव कर रहे हैं?',
            trigger: 'search',
          },
          {
            id: 'search',
            component: <MultiSelect options={this.state.options} values={this.state.values}/>, 
            trigger:'dd'
          },
          {
            id: 'dd',
            user: true,
            trigger: 'ee',
          },
          {
            id: 'ee',
            message: 'क्या आप नीचे लिखे हुए लक्षणों में से किसी का अनुभव कर रहे हैं?',
            trigger: 'ff',
          },
          {
            id: 'ff',
            component: <MultiSelect1 options1={this.state.options1} values1={this.state.values1}/>, 
            trigger:'gg'
          },
          {
            id: 'gg',
            user: true,
            trigger: 'hh',
          },
          {
            id: 'hh',
            message: 'नीचे दिए गए विकल्पों में से कौनसा आपके लिए लागू होता है?',
            trigger: 'ii',
          },
          {
            id: 'ii',
            component: <MultiSelect2 options2={this.state.options2} values2={this.state.values2}/>, 
            trigger:'jj'
          },          
          {
            id: 'jj',
            user: true,
            trigger: 'kk',
          },
          {
            id: 'kk',
            message: 'क्या आपने पिछले 14 दिनों में कोई विदेश यात्रा की है?',
            trigger: 'll',
          },
          {
            id: 'll',
            options: [
              { value: 'हाँ', label: 'हाँ', trigger: 'mm' },
              { value: 'नहीं', label: 'नहीं', trigger: 'mm'},
            ],
          },
          {
            id: 'mm',
            message: 'नीचे दिए गए विकल्पों में से कौनसा आपके लिए लागू होता है?',
            trigger: 'nn',
          },
          {
            id: 'nn',
            component: <MultiSelect3 options3={this.state.options3} values3={this.state.values3}/>, 
            trigger:'oo'
          },          
          {
            id: 'oo',
            user: true,
            trigger: 'pp',
          },
          {
            id: 'pp',
            message: 'यह अंतःक्रिया कब हुई थी?',
            trigger: 'qq',
          },
          {
            id: 'qq',
            component: <MultiSelect4 options4={this.state.options4} values4={this.state.values4}/>, 
            trigger:'rr'
          },          
          {
            id: 'rr',
            user: true,
            trigger: 'ss',
          },
          {
            id: 'ss',
            message: 'नाम',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: 'tt',
          },
          {
            id: 'tt',
            message: 'मोबाइल नंबर',
            trigger: 'mobile',
          },
          {
            id: 'mobile',
            user: true,
            trigger: 'uu',
          },
          {
            id: 'uu',
            message: 'पिन कोड',
            trigger: 'pinCode',
          },
          {
            id: 'pinCode',
            user: true,
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review values={this.state.values} values1={this.state.values1} values2={this.state.values2} values3={this.state.values3} values4={this.state.values4}/>,
            asMessage: true,
            trigger: 'end-message',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            //end: true,
          },      
        ]} />
           </ErrorBoundary>
        </div>      
        {/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
        <div>
          {!this.state.showChat &&       
             <a  onClick={() => this.startChat()} className="chat_on"> <span className="chat_on_icon"><i class="fa fa-comments" aria-hidden="true"></i></span> </a>
            }
        </div>
      </div>  

      </div>

    );
  }
}
const mapDispatchToProps = dispatch => ({
  getMainData: () => dispatch(fetchOnlineSalesMainData()),
  getSubData: () => dispatch(fetchOnlineSalesSubData()), 
  getLoginData: data => dispatch(fetchLoginResponseData(data)),
  getRegisterData: data => dispatch(fetchCustomerRegisterData(data)),
  hideLoginModal: data => dispatch(receiveHideLoginModalData(data)),
  clearLoginData: () => dispatch(requestUserLogout()),
  clearRegData: () => dispatch(clearRegisterData()), 
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
    loginReducer, cartReducer, bkmReducer, wishListReducer, myFavouritesReducer, registerReducer,buyMedicineReducer,
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

  const {
    registerData,
  } = registerReducer || [];

  const {
    testData,
    onlineSalesMain,
    onlineSalesSub,
  } = buyMedicineReducer || [];

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
    registerData,
    onlineSalesMain,
    onlineSalesSub,
    testData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(HeaderLayout));

// export default HeaderLayout;
