import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _findIndex from 'lodash/findIndex';
import Redirect from 'react-router/Redirect';
import MyCartComponent from './../components/BKMComponent/MyCartComponent.jsx';
import Loader from './../components/Loader/Loader.jsx';
import {
  fetchDiscountCouponData,
  fetchCancelDiscountCouponData,
  fetchFirstCartData,
  fetchRemoveFromCartData,
  fetchUpdateCartData,
  fetchMoveToWishlistData,
  fetchRemoveExpiredProductData,
  setCartTypeData,
  clearCartReducer,
  clearCartData,
  setRemoveCartTypeData,
} from './../actions/cart';
import { setCartId, updateCartData as updateLoginCartData } from './../actions/login';
import BreadCrumbs from '../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from './../containers/ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

class MyCartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.applyDiscountCoupon = this.applyDiscountCoupon.bind(this);
    this.cancelDiscountCoupon = this.cancelDiscountCoupon.bind(this);
    this.source = '';
    this.state = {
      discountCouponValue: undefined,
      couponRes: false,
      showCouponRes: false,
      coupCode: undefined,
      showCouponData: undefined,
      cartResult: undefined,
      code: undefined,
      subTotal: undefined,
      grandTotal: undefined,
      result: undefined,
      cancelCouponVal: undefined,
      sucessClassName: undefined,
      discountVal: undefined,
      errors: '',
      cartErrors: {},
      showCartErrors: false,
      blinkText: false,
      product_details: {},
      productDetails:{},
      productId: undefined,
      move: false,
      productName: undefined,
      qty: undefined,
      pid: [],
      showCheckOut: false,
      breadCrumbsList: [
        {
          link: '/',
          name: 'HOME',
        },
        {
          link: undefined,
          name: 'SHOPPING CART',
        },
      ],
      errQty: {},
    };
  }

  clearShoppingCart = () => {
    // this.props.clearShoppingCartData({ apiToken: this.props.apiToken, cartId: this.props.cartId });
  }

  handleInputChange = (event) => {
    this.setState({
      discountCouponValue: event.target.value,
    });
  }



  updateCart = (cartRid,data,qty) => {
    console.log(cartRid);
    console.log(data);
    console.log(qty);
    console.log(this.state.productDetails);
    //this.setState({ productDetails: this.state.product_details });
    if(data === 'add')
    {
      const { productDetails } = this.state;
        // delete cartErrors[cartRid];
          productDetails[cartRid] = {
            ...productDetails[cartRid],
            quantity: qty + 1,
          };

          //this.setState({ product_details: this.state.productDetails });

          /* qty exchange issue */

          const resultRes = [..._get(this.state, ['cartResult', 0, 'result'])];

          const cartRidObj = _findIndex(resultRes, ['cart_rid', cartRid]);

          resultRes[cartRidObj].qty = qty + 1;

          const cartResult = [...this.state.cartResult];

          cartResult[0].result = resultRes;
          console.log(resultRes);

          /* qty exchange issue */

          this.setState({
            blinkText: false,
            showCartErrors: false,
            productDetails,
            cartResult,
          });

    } 

    if(data === 'sub')
    {

      const { productDetails } = this.state;
      // delete cartErrors[cartRid];
        productDetails[cartRid] = {
          ...productDetails[cartRid],
          quantity: qty - 1,
        };

        //this.setState({ product_details: this.state.productDetails });

        /* qty exchange issue */

        const resultRes = [..._get(this.state, ['cartResult', 0, 'result'])];

        const cartRidObj = _findIndex(resultRes, ['cart_rid', cartRid]);

        resultRes[cartRidObj].qty = qty - 1;

        const cartResult = [...this.state.cartResult];

        cartResult[0].result = resultRes;

        /* qty exchange issue */

        this.setState({
          blinkText: false,
          showCartErrors: false,
          productDetails,
          cartResult,
        });

       
    }

    this.props.getUpdateProduct({
      api_token: this.props.apiToken,
      quote_id: '23528',
      product_details: this.state.productDetails,
    });

    
  
   
  }

  handleInputQty = (qtyPerBox, cartRid, event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value) {
      if (re.test(event.target.value)) {
        if (event.target.value % qtyPerBox !== 0) {

          /* qty exchange issue */

          const resultRes = [..._get(this.state, ['cartResult', 0, 'result'])];

          const cartRidObj = _findIndex(resultRes, ['cart_rid', cartRid]);

          resultRes[cartRidObj].qty = event.target.value / qtyPerBox;

          const cartResult = [...this.state.cartResult];

          cartResult[0].result = resultRes;

          /* qty exchange issue */

          this.setState({
            showCartErrors: false,
            blinkText: true,
            cartErrors: { ...this.state.cartErrors, [cartRid]: true },
            cartResult,
          });
        } else {
          const { productDetails, cartErrors } = this.state;
          delete cartErrors[cartRid];
          productDetails[cartRid] = {
            ...productDetails[cartRid],
            quantity: event.target.value / qtyPerBox,
          };

          /* qty exchange issue */

          const resultRes = [..._get(this.state, ['cartResult', 0, 'result'])];

          const cartRidObj = _findIndex(resultRes, ['cart_rid', cartRid]);

          resultRes[cartRidObj].qty = event.target.value / qtyPerBox;

          const cartResult = [...this.state.cartResult];

          cartResult[0].result = resultRes;

          /* qty exchange issue */

          this.setState({
            blinkText: false,
            showCartErrors: false,
            productDetails,
            cartErrors,
            cartResult,
          });
        }
      } else {
        this.setState({
          showCartErrors: false,
          cartErrors: { ...this.state.cartErrors, [cartRid]: 'Please Provide Numeric value' },
        });
      }
    } else {
      this.setState({
        showCartErrors: false,
        cartErrors: { ...this.state.cartErrors, [cartRid]: 'This is a required field' },
      });
    }
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  continueShopping = () => {
    this.props.history.go(-1);
  }

  

  removeProduct = (cartId) => {
    this.props.getaddRemoveUpdateProduct({
      api_token: this.props.apiToken, item_id: cartId,
    });
  }

  handleMoveToWishlist = (productId) => {
    this.props.moveToWishlist({
      apiToken: this.props.apiToken,
      productId,
      cartId: this.props.cartId,
    });
  }

  applyDiscountCoupon = () => {
    if (this.handleValidation()) {
      this.props.getDiscountCouponData({ code: this.state.discountCouponValue, quoteId: _get(this.props.loginData, [0, 'result', 'cart_id']), apiToken: _get(this.props, 'apiToken') });
    }
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;

    //  FirstName
    if (this.state.discountCouponValue === undefined || this.state.discountCouponValue === '') {
      formIsValid = false;
      errors.discountCouponValue = 'This is a required field';
    }

    this.setState({ errors });
    return formIsValid;
  }

  cancelDiscountCoupon = () => {
    this.props.getCancelDiscountCouponData({ code: this.state.cancelCouponVal, quoteId: this.props.cartId, apiToken: _get(this.props, 'apiToken') });
  }

  handleCheckOut = () => {
    //this.props.removeExpiredProducts({ apiToken: this.props.apiToken, cartId: this.props.cartId });
    //this.source = 'checkout';
    this.setState({
      showCheckOut: true,
    });
  }

  componentDidMount() {
    document.title = 'Shopping Cart';
    //this.props.clearCartData();
    //this.props.setCartType({ cartType: '' });
   /// this.props.RemoveFromCartData = [];
    

    //this.props.setRemoveCartTypeData({ RemoveFromCartData: []});
    this.props.getCartData({ api_token: this.props.apiToken, spending_point: 1 });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //this.props.setRemoveCartType({ RemoveFromCartData: [] });
    console.log(nextProps);
    if (!_isEmpty(_get(nextProps, 'discountCouponData'))) {
      if (_get(nextProps, ['discountCouponData', 0, 'msg']) === 'success') {
        this.setState({
          couponRes: true,
          showCouponRes: true,
          showCouponData: 'was applied',
          coupCode: _get(nextProps, ['discountCouponData', 0, 'coupan_code']),
          cancelCouponVal: _get(nextProps, ['discountCouponData', 0, 'coupan_code']),
          sucessClassName: 'coupon-success-msg',
          discountVal: _get(nextProps, ['discountCouponData', 0, 'discount']),
          grandTotal: _get(nextProps, ['discountCouponData', 0, 'grandTotal']),
          move: false,
        });
      } else {
        this.setState({
          couponRes: false,
          showCouponRes: true,
          showCouponData: 'is not valid',
          coupCode: _get(nextProps, ['discountCouponData', 0, 'coupan_code']),
          sucessClassName: 'coupon-error-msg',
          move: false,
        });
        alert(`coupon code ${_get(nextProps, ['discountCouponData', 0, 'coupan_code'])} is not valid`);
      }
    }
    if (!_isEmpty(_get(nextProps, 'cancelDiscountCouponData'))) {
      if (_get(nextProps, ['cancelDiscountCouponData', 0, 'msg']) === 'success') {
        this.props.getCartData({ apiToken: this.props.apiToken });
        this.setState({
          couponRes: false,
          showCouponRes: true,
          showCouponData: 'was removed',
          discountCouponValue: '',
          sucessClassName: 'coupon-success-msg',
          grandTotal: _get(nextProps, ['firstCartData', 'cart', 0, 'grandtotal']),
          move: false,

        });
      } else {
        this.setState({
          couponRes: true,
          showCouponRes: true,
          showCouponData: 'is not valid',
          coupCode: _get(nextProps, ['discountCouponData', 0, 'coupan_code']),
          sucessClassName: 'coupon-error-msg',
          move: false,
        });
      }
    }
    if (!_isEmpty(_get(nextProps, 'firstCartData'))) {
      if(this.props.cartCount  !== _get(nextProps, 'firstCartData[0].total_products_in_cart'))
      {
      this.props.updateCart({
        show: false,
        cartCount: _get(nextProps, 'firstCartData[0].total_products_in_cart'),
        cartTotal: _get(nextProps, 'firstCartData[0].subtotal'),
        cartProducts: _get(nextProps,'firstCartData[0].result'),
      });
    }
      if (_get(nextProps, 'firstCartData[0].code') === 1) {
        const productDetailsTemp = _get(nextProps, 'firstCartData[0].result');
        console.log(productDetailsTemp);
        const cartNewId = _get(nextProps, 'firstCartData[0].result[0].cart_id');
        if (cartNewId !== this.props.cartId) {
          this.props.setCartId(cartNewId);
        }
        let productDetails = {};
        productDetailsTemp.map((o) => {
          productDetails = {
            ...productDetails,
            [o.cart_rid]: {
              product_id: o.product_id,
              quantity: o.qty,
            },
          };
        });
        console.log(nextProps.firstCartData);
        this.setState({
          cartResult: _get(nextProps, 'firstCartData'),
          code: _get(nextProps, 'firstCartData[0].code'),
          subTotal: _get(nextProps, 'firstCartData[0].subtotal'),
          grandTotal: _get(nextProps, 'firstCartData[0].grandtotal'),
          result: _get(nextProps, 'firstCartData[0].result'),
          discountVal: _get(nextProps, 'firstCartData[0].discount'),
          cancelCouponVal: _get(nextProps, 'firstCartData[0].coupon_code'),
          couponRes: false,
          discountCouponValue: '',
          move: false,
          productDetails,
        });
        console.log(this.state);
        const couponCode = _get(nextProps.firstCartData[0], 'coupon_code');
        if (couponCode !== 'NA') {
          this.setState({
            couponRes: true,
            coupCode: couponCode,
            discountCouponValue: couponCode,
            showCouponRes: false,
            move: false,
          });
        }
      } else {
        
        // this.props.setCartType({ cartType: '' });
        this.setState({
          cartResult: _get(nextProps, 'firstCartData'),
          code: _get(nextProps, ['firstCartData', 'cart', 0, 'code']),
        });
      }
    }
    if (!_isEmpty(_get(nextProps, 'RemoveFromCartData'))) {
      if (_get(nextProps, 'RemoveFromCartData.code') === 1) {
        this.setState({
          showCouponRes: false,
          move: false,
        });
        this.props.getCartData({ api_token: this.props.apiToken, spending_point: 1 });
      }
    }
    if (!_isEmpty(_get(nextProps, 'updateCartData'))) {
      if (_get(nextProps, 'updateCartData.code') === 1) {
        this.setState({
          showCouponRes: false,
          move: false,
        });
        this.props.getCartData({ api_token: this.props.apiToken, spending_point: 1 });
      }
    }
  
    
    // if (!_isEmpty(nextProps.clearedCartData)) {
    //   if (_get(nextProps.clearedCartData, 'code') === 1){
    //     console.log('hey!');
    //   }
    // }
  }
  // onChange = () => {

  // }
  render() {
    console.log(this.state);
    if (this.state.showCheckOut) {
      return <Redirect push to='/checkout/onepage' />;
    }
    if (_get(this, 'props.isLoading')) {
      return (
        <div className="container" style={{ minHeight: '500px' }}>
          <Loader />
        </div>
      );
    }
    return (
      <div>
       
        <div className="container">
          <div className='container-block'>
            <ErrorBoundary>
              <MyCartComponent
                {...this.state}
                applyDiscountCoupon={this.applyDiscountCoupon}
                cancelDiscountCoupon={this.cancelDiscountCoupon}
                cartResult={this.state.cartResult}
                primeUser={this.props.primeUser}
               // cartType={this.props.cartType}
                handleInputChange={this.handleInputChange}
                continueShopping={this.continueShopping}
                handleMoveToWishlist={this.handleMoveToWishlist}
                removeProduct={this.removeProduct}
                handleInputQty={this.handleInputQty}
                updateCart={this.updateCart}
                handleCheckOut={this.handleCheckOut}
                clearShoppingCart={this.clearShoppingCart}
                cycles={_get(this.props, ['firstCartData', 'cart', 0, 'result', 0, 'cycles'])}
              // onChange={this.onChange}
              />
            </ErrorBoundary>
          </div>
        </div>
        <hr className="blue-hr"></hr>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  clearCartData: () => dispatch(clearCartReducer()),
  getCartData: data => dispatch(fetchFirstCartData(data)),
  getDiscountCouponData: data => dispatch(fetchDiscountCouponData(data)),
  getCancelDiscountCouponData: data => dispatch(fetchCancelDiscountCouponData(data)),
  moveToWishlist: data => dispatch(fetchMoveToWishlistData(data)),
  getaddRemoveUpdateProduct: data => dispatch(fetchRemoveFromCartData(data)),
  getUpdateProduct: data => dispatch(fetchUpdateCartData(data)),
  // removeExpiredProducts: data => dispatch(fetchRemoveExpiredProductData(data)),
  setCartType: data => dispatch(setCartTypeData(data)),
  setRemoveCartType: data => dispatch(setRemoveCartTypeData(data)),
  setCartId: data => dispatch(setCartId(data)),
  clearShoppingCartData: data => dispatch(clearCartData(data)),
  updateCart: data => dispatch(updateLoginCartData(data)),
});

const mapStateToProps = (state) => {
  const { loginReducer, cartReducer } = state;

  const {
    loginData,
    apiToken,
    cartId,
    error: loginError,
    primeUser,
  } = loginReducer || [];

  const {
    firstCartData,
    discountCouponData,
    cancelDiscountCouponData,
    totalAmount,
    RemoveFromCartData,
    updateCartData,
    moveToWishListData,
    // removeExpiredProductsData,
    isFetching: isLoading,
    error: cartError,
    clearedCartData,
    type,
    cartType,
  } = cartReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(cartError) || _isError(cartError);

  return {
    loginData,
    apiToken,
    cartId,
    firstCartData,
    discountCouponData,
    cancelDiscountCouponData,
    totalAmount,
    RemoveFromCartData,
    moveToWishListData,
    updateCartData,
    // removeExpiredProductsData,
    isLoading,
    error,
    clearedCartData,
    type,
    primeUser,
    cartType,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(MyCartContainer));
