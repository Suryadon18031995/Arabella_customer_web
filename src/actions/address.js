import _get from 'lodash/get';
import axios from 'axios';
import qs from 'qs';
import * as ADDRESS_CONSTANTS from '../constants/address';
// import * as ALL_ADDRESS_CONSTANTS from '../constants/address';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';



export const recievedAllAddressDetails = data => ({
    type: ADDRESS_CONSTANTS.ALL_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedAllAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.ALL_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })
  
  
  
  export const fetchAllAddressData = (data) => {
      console.log(data);
    return dispatch => {
      axios.post(ADDRESS_CONSTANTS.ALL_ADDRESS_CONSTANTS.URL,qs.stringify(data))
        .then(res => dispatch(recievedAllAddressDetails(res.data)))
        .catch(err => dispatch(recievedAllAddressError(err)))
    }
  }

  export const requestAddAddressData = () => ({
    type: ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.REQUEST,
});

  export const recievedAddAddressDetails = data => ({
    type: ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedAddAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })
  
  
  
  export const fetchAddAddressData = (data) => {
    requestAddAddressData();
      console.log(data);
    return dispatch => {
      axios.post(ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.URL,qs.stringify(data))
        .then(res => dispatch(recievedAddAddressDetails(res.data)))
        .catch(err => dispatch(recievedAddAddressError(err)))
    }
  }

  
  export const requestDeleteAddressData = () => ({
    type: ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.REQUEST,
});

  export const recievedDeleteAddressDetails = data => ({
    type: ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedDeleteAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })


    
  export const fetchDeleteAddress = (data) => {
    requestDeleteAddressData();
      console.log(data);
    return dispatch => {
      axios.post(ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.URL,qs.stringify(data))
        .then(res => dispatch(recievedDeleteAddressDetails(res.data)))
        .catch(err => dispatch(recievedDeleteAddressError(err)))
    }
  }

   
  export const requestEditAddressData = () => ({
    type: ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.REQUEST,
});

  export const recievedEditAddressDetails = data => ({
    type: ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedEditAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })
  
  
  
  export const fetchEditAddress = (data) => {
    requestEditAddressData();
      console.log(data);
    return dispatch => {
      axios.post(ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.URL,qs.stringify(data))
        .then(res => dispatch(recievedEditAddressDetails(res.data)))
        .catch(err => dispatch(recievedEditAddressError(err)))
    }
  }




export const setAddrId = (data, subreddit) => ({
    type: ADDRESS_CONSTANTS.SET_ADDR_ID_CONSTANTS,
    subreddit,
    data,
    receivedAt: Date.now(),
  });
