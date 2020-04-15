import _get from 'lodash/get';

const mapAddToCartApiData = (reqbody) =>
  //  const cartArray = [];
  //  cartArray.push(_get(reqbody, 'delivery_method', ' '));
  //  cartArray.push(_get(reqbody, 'delivery_date', ' '));
  //  cartArray.push(_get(reqbody, 'qty_per_box', ' '));
  //  cartArray.push(_get(reqbody, 'farm_price', ' '));
  //  cartArray.push(_get(reqbody, 'landing_price', ' '));
  //  cartArray.push(_get(reqbody, 'delivery_price', ' '));
  //  cartArray.push(_get(reqbody, 'total_price', ' '));
  //  cartArray.push(_get(reqbody, 'pickup_date', ' '));
  //  cartArray.push(_get(reqbody, 'truck_pickup_date', ' '));
  //  cartArray.push(_get(reqbody, 'prod_avail_id', ' '));
  //  cartArray.push(_get(reqbody, 'customer_store_id', ' '));
  //  cartArray.push(_get(reqbody, 'dist_center_id', ' '));
  //  cartArray.push(_get(reqbody, 'loc_id', ' '));
  //  cartArray.push(_get(reqbody, 'transit_ids', ' '));
  //  cartArray.push(_get(reqbody, 'transit_days', ' '));
  //  cartArray.push(_get(reqbody, 'user', ' '));
  //  cartArray.push(_get(reqbody, 'cost_per_unit', ' '));

  //  console.log('concat:', cartArray.join());

  ({
    apiToken: _get(reqbody, 'apiToken'),
    // customerStoreId: _get(reqbody, 'customerStoreId'),
    // user: _get(reqbody, 'user'),
    // deliveryMethod: _get(reqbody, 'delivery_method'),
    // deliveryDate: _get(reqbody, 'delivery_date'),
    // qtyPerBox: _get(reqbody, 'qty_per_box'),
    // farmPrice: _get(reqbody, 'farm_price'),
    // landingPrice: _get(reqbody, 'landing_price'),
    // deliveryPrice: _get(reqbody, 'delivery_price'),
    // totalPrice: _get(reqbody, 'totalAmount').toFixed(4),
    // pickupDate: _get(reqbody, 'pickup_date'),
    // truckPickupDate: _get(reqbody, 'truck_pickup_date'),
    // prodAvailId: _get(reqbody, 'avail_id'),
    // distCenterId: _get(reqbody, 'distcenter') || '',
    api: 'api',
    // locId: _get(reqbody, 'loc_ID'),
    productId: _get(reqbody, 'pid'),
    // transitDays: '',
    cloneTotalPrice: '',
    // transitIds: _get(reqbody, 'transitIDs'),
    // costPerUnit: _get(reqbody, 'cost_per_unit'),
    boxType: _get(reqbody[reqbody.avail_id], 'box_type', '') || _get(reqbody, 'box_type', ''),
    packUnit: _get(reqbody[reqbody.avail_id], 'pack_unit', '') || _get(reqbody, 'pack_unit', ''),
    quantity: _get(reqbody, 'unitQty') ? _get(reqbody, 'unitQty') / _get(reqbody, 'qty_per_box') : _get(reqbody, 'qty_ordered') / _get(reqbody, 'qty_per_box'),
    // quantity: _get(reqbody, 'unitQty') / _get(reqbody, 'qty_per_box'),,
    selValNext: _get(reqbody, 'cart_format'),
  })
  ;

const mapCustomerRegisterData = data => ({
  first_name: _get(data, 'firstName'),
  last_name: _get(data, 'lastName'),
  company: _get(data, 'company'),
  email: _get(data, 'email'),
  telephone: _get(data, 'telephone'),
  street_address: _get(data, 'streetAddress'),
  city: _get(data, 'city'),
  zip_code: _get(data, 'zipCode'),
  country: _get(data, 'country'),
  state: _get(data, 'state'),
  tax_id: _get(data, 'taxId'),
  password: _get(data, 'password'),
  confirm_password: _get(data, 'confirmPassword'),
  newslet_sub: _get(data, 'newsletSub'),
});

const mapProductSearchData = data => ({
  currency_code: _get(data, 'currency_ode'),
  api_token: _get(data, 'api_token'),
  store_id: _get(data, 'store_id'),
  sort: _get(data, 'sortValue'),
  page_no: _get(data, 'page_no'),
  category: data.category ? data.category.join('_') : undefined,
  color: data.color ? data.color.join('_') : undefined,
  farm: data.farm ? data.farm.join('_') : undefined,
  location: data.location ? data.location.join('_') : undefined,
  boxType: data.boxType ? data.boxType.join('_') : undefined,
  variety: data.variety ? data.variety.join('_') : undefined,
  uom: data.uom ? data.uom.join('_') : undefined,
  length: data.length ? data.length.join('_') : undefined,
  grade: data.grade ? data.grade.join('_') : undefined,
  method: data.method === '?' ? undefined : data.method,
  deals: _get(data, 'deals'),
  pageType: _get(data, 'pageType'),
  searchStartDate: _get(data, 'searchStartDate'),
  searchEndDate: _get(data, 'searchEndDate'),
});

const mapVendorReviewData = data => ({
  name: _get(data, 'nickName'),
  shipmentId: _get(data, 'shipmentId', ''),
  reviewTitle: _get(data, 'reviewSummary'),
  reviewDetails: _get(data, 'review'),
  vendorRating: _get(data, 'rating', 0),
  apiToken: _get(data, 'apiToken'),
  storeId: _get(data, 'localeId'),
  vendorId: _get(data, 'vendorId'),
});

const mapAddAddressData = data => ({
  apiToken: _get(data, 'apiToken'),
  firstName: _get(data, 'firstname'),
  lastName: _get(data, 'lastname'),
  company: _get(data, 'company'),
  addressLine1: _get(data, 'Address1'),
  addressLine2: _get(data, 'Address2'),
  city: _get(data, 'city'),
  countryId: _get(data, 'countryId'),
  state: _get(data, 'region'),
  zipCode: _get(data, 'zipcode'),
  phone: _get(data, 'telephone'),
  isShipping: 0,
  isBilling: 0,
});

const mapEditAddressData = data => ({
  apiToken: _get(data, 'apiToken'),
  firstName: _get(data, 'firstname'),
  lastName: _get(data, 'lastname'),
  company: _get(data, 'company'),
  addressLine1: _get(data, 'address_line1'),
  addressLine2: _get(data, 'address_line2'),
  city: _get(data, 'city'),
  countryId: _get(data, 'country_id'),
  state: _get(data, 'state'),
  zipCode: _get(data, 'zipcode'),
  phone: _get(data, 'telephone'),
  addressId: _get(data, 'addressId'),
  // email: _get(this.state.newBillInfo, ''),
  // countryId: _get(this.state.newBillInfo, 'US'),
  // stateId: "32",
  // fax: _get(this.state.newBillInfo, 'fax'),
  isShipping: 0,
  isBilling: 0,
});

const mapPaypalData = data => ({
  apiToken: _get(data, 'apiToken'),
  storeId: _get(data, 'storeId'),
  shippingAddrId: _get(data, 'shippingAddrId'),
  billingAddrId: _get(data, 'billingAddrId'),
  currencyCode: _get(data, 'currencyCode'),
  payMethod: _get(data, 'paymentType'),
  cardNo: _get(data, 'creditnumber'),
  ExpMonth: _get(data, 'expirymonth'),
  ExpYear: _get(data, 'expiryyear'),
  cvv: _get(data, 'cvv'),
  firstName: _get(data, 'firstname'),
  lastName: _get(data, 'lastname'),
  billingAddress: {
    line1: _get(data, 'address_line1'),
    city: _get(data, 'city'),
    state: _get(data, 'state'),
    postalCode: _get(data, 'zipcode'),
    countryCode: _get(data, 'country'),
  },
  transactions: [{
    total: _get(data, 'grandTotal'),
    currency: _get(data, 'currencyCode'),
    subtotal: _get(data, 'subTotal'),
    tax: 0,
    shippingCharges: 0,
    description: 'paypal transactions',
  }],
});

const mapfirstData = (data) => {
  let amount; let type; let rewardPointsUsed;
  if (_get(data, 'cartType') === 'normal') {
    // amount = parseFloat(_get(data, 'grandTotal').replace(/,/g, '')) * 100;
    amount = Math.round(100 * _get(data, 'grandTotal', 0).replace(/,/g, ''));
    if (_get(data, 'rewardPointsUsed') > 0) {
      amount = Math.round(100 * _get(data, 'grandTotal', 0).replace(/,/g, '')) - _get(data, 'rewardPointsUsed');
    }
    type = 0;
    rewardPointsUsed = _get(data, 'rewardPointsUsed');
  } else if (_get(data, 'cartType') === 'subscription') {
    amount = 0;
    type = 1;
    rewardPointsUsed = 0;
  } else if (_get(data, 'cartType') === 'pre-book') {
    amount = 0;
    type = 2;
    // rewardPointsUsed = _get(data, 'rewardPointsUsed');
  } else if (_get(data, 'cartType') === 'prime') {
    if (_get(data, 'demoExpired') === '1') {
      amount = Math.round(100 * _get(data, 'grandTotal', 0).replace(/,/g, ''));
    } else {
      amount = 0;
      type = 3;
    }
  }
  const expDate = _get(data, 'expiryyear') ? _get(data, 'expiryyear').slice(2, 4) : '';
  let tempObj = {
    amount: amount.toString(),
    currencyCode: _get(data, 'currencyCode'),
    street: _get(data, 'address_line1'),
    city: _get(data, 'city'),
    stateProvince: _get(data, 'state'),
    zipPostalCode: _get(data, 'zipcode'),
    country: _get(data, 'country'),
    apiToken: _get(data, 'apiToken'),
    payMethod: _get(data, 'paymentType'),
    storeId: _get(data, 'storeId'),
    shippingAddrId: _get(data, 'shippingAddrId'),
    billingAddrId: _get(data, 'billingAddrId'),
    tokenize: _get(data, 'tokenize'),
    type,
    rewardPointsUsed,
    frequency: _get(data, 'cycles'),
    billingAddress: _get(data, 'defaultBillingInfo'),
  };
  if (_get(data, 'tokenize') === false) {
    tempObj = {
      ...tempObj,
      credit_card: {
        cardNumber: _get(data, 'creditnumber'),
        cvv: _get(data, 'cvv'),
        expDate: _get(data, 'expirymonth') + expDate,
        cardholderName: _get(data, 'firstname') + _get(data, 'lastname'),
      },
    };
  } else {
    tempObj = {
      ...tempObj,
      tokenVal: _get(data, 'tokenVal'),
      token: {
        type: _get(data, 'type'),
        cardholder_name: _get(data, ['defaultBillingInfo', 'cardholderName']),
        exp_date: _get(data, 'expiryDate'),
        value: _get(data, 'value'),
      },
    };
  }
  return tempObj;
};

const mapAuthorizeNetData = (data) => {
  let amount;
  let type;
  let rewardPointsUsed;
  const transactionType = 'AUTHONLYTRANSACTION'; // 'AUTHCAPTURETRANSACTION';
  if (_get(data, 'cartType') === 'normal') {
    amount = parseFloat(_get(data, 'grandTotal', 0).replace(/,/g, ''));
    if (_get(data, 'rewardPointsUsed') > 0) {
      amount = parseFloat(_get(data, 'grandTotal', 0).replace(/,/g, '')) - (_get(data, 'rewardPointsUsed') / 100);
    }
    type = 0;
    rewardPointsUsed = _get(data, 'rewardPointsUsed');
  } else if (_get(data, 'cartType') === 'subscription') {
    amount = 0;
    type = 1;
    rewardPointsUsed = 0;
  } else if (_get(data, 'cartType') === 'pre-book') {
    amount = 0;
    type = 2;
  } else if (_get(data, 'cartType') === 'prime') {
    if (_get(data, 'demoExpired') === '1') {
      amount = parseFloat(_get(data, 'grandTotal', 0).replace(/,/g, ''));
    } else {
      amount = 0;
      type = 3;
    }
  }
  const expDate = _get(data, 'expiryyear') ? _get(data, 'expiryyear').slice(2, 4) : '';
  return {
    amount: amount.toString(),
    currencyCode: _get(data, 'currencyCode'),
    firstName: _get(data, 'firstname'),
    lastName: _get(data, 'lastname'),
    company: _get(data, 'company'),
    street: _get(data, 'address_line1'),
    city: _get(data, 'city'),
    stateProvince: _get(data, 'state'),
    zipPostalCode: _get(data, 'zipcode'),
    country: _get(data, 'country'),
    apiToken: _get(data, 'apiToken'),
    payMethod: _get(data, 'paymentType'),
    storeId: _get(data, 'storeId'),
    shippingAddrId: _get(data, 'shippingAddrId'),
    billingAddrId: _get(data, 'billingAddrId'),
    tokenize: _get(data, 'tokenize'),
    type,
    rewardPointsUsed,
    frequency: _get(data, 'cycles'),
    billingAddress: _get(data, 'defaultBillingInfo'),
    cardNumber: _get(data, 'value') || _get(data, 'creditnumber'),
    cvv: _get(data, 'cvv') || '999',
    expDate: _get(data, 'expiryDate') || (_get(data, 'expirymonth') + expDate),
    cardholderName: _get(data, 'firstname') + _get(data, 'lastname'),
    transactionType,
  };
};

const mapBraintreeData = (data) => {
  let amount;
  let type;
  let rewardPointsUsed;
  const transactionType = 'false'; // true for capture;
  if (_get(data, 'cartType') === 'normal') {
    amount = parseFloat(_get(data, 'grandTotal', 0).replace(/,/g, ''));
    if (_get(data, 'rewardPointsUsed') > 0) {
      amount = parseFloat(_get(data, 'grandTotal', 0).replace(/,/g, '')) - (_get(data, 'rewardPointsUsed') / 100);
    }
    type = 0;
    rewardPointsUsed = _get(data, 'rewardPointsUsed');
  } else if (_get(data, 'cartType') === 'subscription') {
    amount = 0;
    type = 1;
    rewardPointsUsed = 0;
  } else if (_get(data, 'cartType') === 'pre-book') {
    amount = 0;
    type = 2;
  } else if (_get(data, 'cartType') === 'prime') {
    if (_get(data, 'demoExpired') === '1') {
      amount = parseFloat(_get(data, 'grandTotal', 0).replace(/,/g, ''));
    } else {
      amount = 0;
      type = 3;
    }
  }
  const expDate = _get(data, 'expiryyear') ? _get(data, 'expiryyear').slice(2, 4) : '';
  return {
    amount: amount.toString(),
    currencyCode: _get(data, 'currencyCode'),
    firstName: _get(data, 'firstname'),
    lastName: _get(data, 'lastname'),
    company: _get(data, 'company'),
    street: _get(data, 'address_line1'),
    city: _get(data, 'city'),
    stateProvince: _get(data, 'state'),
    zipPostalCode: _get(data, 'zipcode'),
    country: _get(data, 'country'),
    apiToken: _get(data, 'apiToken'),
    payMethod: _get(data, 'paymentType'),
    storeId: _get(data, 'storeId'),
    shippingAddrId: _get(data, 'shippingAddrId'),
    billingAddrId: _get(data, 'billingAddrId'),
    tokenize: _get(data, 'tokenize'),
    type,
    rewardPointsUsed,
    frequency: _get(data, 'cycles'),
    billingAddress: _get(data, 'defaultBillingInfo'),
    cardNumber: _get(data, 'value') || _get(data, 'creditnumber'),
    cvv: _get(data, 'cvv') || '999',
    expDate: _get(data, 'expiryDate') || (_get(data, 'expirymonth') + expDate),
    cardholderName: _get(data, 'firstname') + _get(data, 'lastname'),
    transactionType,
  };
};

const mapCCAvenueData = data => ({
  merchantId: 124693,
  orderId: 123456,
  currency: 'INR',
  orderAmount: parseFloat(_get(data, 'grandTotal', 0)),
  redirectUrl: 'http://localhost:3001/payment/ccavenue/placeOrder',
  cancelUrl: 'http://localhost:3001//payment/ccavenue/cancelOrder',
  // redirectUrl: 'http://127.0.0.01:3010/ccavResponseHandler',
  // cancelUrl: 'http://127.0.0.01:3010/ccAvenueCancelHandler',
  language: 'EN',
  billingName: _get(data, 'firstname'),
  billingAddress: _get(data, 'address_line1'),
  billingCity: _get(data, 'city'),
  billingState: _get(data, 'state'),
  billingZip: _get(data, 'zipcode'),
  billingCountry: 'India' || _get(data, 'country'),
  billingTel:  _get(data, 'telephone'),
  billingEmail: 'test@gmail.com',
  deliveryName: 'Sam',
  deliveryAddress: 'Vile Parle',
  deliveryCity: 'Mumbai',
  deliveryState: 'Maharashtra',
  deliveryZip: 400038,
  deliveryCountry: 'India',
  deliveryTel: '0123456789',
  merchantParam1: 'Info.',
  merchantParam2: 'Info.',
  merchantParam3: 'Info.',
  merchantParam4: 'Info.',
  promoCode: '',
  customerIdentifier: '',
  apiToken: _get(data, 'apiToken'),
});

export {
  mapAddToCartApiData,
  mapCustomerRegisterData,
  mapProductSearchData,
  mapVendorReviewData,
  mapAddAddressData,
  mapEditAddressData,
  mapPaypalData,
  mapfirstData,
  mapAuthorizeNetData,
  mapBraintreeData,
  mapCCAvenueData,
};
