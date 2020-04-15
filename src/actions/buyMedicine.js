
import * as BUY_MEDICINE_CONSTANTS from '../constants/buyMedicine';
import axios from 'axios';

const apiUrl = 'https://uat.mediversal.tech/index.php/api/';

export const recievedOnlineSalesMain = data => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_ONLINE_SALES_MAIN,
   data,
   receivedAt: Date.now(),
})  
export const recievedOnlineSalesMainError = (err) => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_ONLINE_SALES_MAIN_ERROR,
  errorCode: err,
})

export const fetchOnlineSalesMainData = () => {
  return dispatch => {
    axios.post(apiUrl+'category/onlineSaleHomeCat?parent_cat_id=910')
      .then(res => dispatch(recievedOnlineSalesMain(res.data)))
      .catch(err => dispatch(recievedOnlineSalesMainError(err)))
  }
}
export const recievedOnlineSalesSubDetails = data => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_ONLINE_SALES_SUB,
   data,
   receivedAt: Date.now(),
})  
export const recievedOnlineSalesSubError = (err) => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_ONLINE_SALES_SUB_ERROR,
  errorCode: err,
})

export const fetchOnlineSalesSubData = () => {
  return dispatch => {
    axios.post(apiUrl+'category/onlineSaleHomeCat?parent_cat_id=805')
      .then(res => dispatch(recievedOnlineSalesSubDetails(res.data)))
      .catch(err => dispatch(recievedOnlineSalesSubError(err)))
  }
}

export const recievedAllHcDetails = data => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_SHOP_HC_DETAIL,
   data,
   receivedAt: Date.now(),
})  
export const recievedAllHcDetailsError = (err) => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_SHOP_HC_ERROR,
  errorCode: err,
})

export const fetchAllHCData = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=915')
      .then(res => dispatch(recievedAllHcDetails(res.data)))
      .catch(err => dispatch(recievedAllHcDetailsError(err)))
  }
}

export const recievedGenericMedicineDetails = data => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_GENERIC_MEDICINE_DETAIL,
   data,
   receivedAt: Date.now(),
})  
export const recievedGMError = (err) => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_GENERIC_MEDICINE_ERROR,
  errorCode: err,
})

export const fetchGenericMedicine = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=930')
      .then(res => dispatch(recievedGenericMedicineDetails(res.data)))
      .catch(err => dispatch(recievedGMError(err)))
  }
}

export const recievedExploreDetails = data => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_EXPLORE_DETAIL,
   data,
   receivedAt: Date.now(),
})  
export const recievedExploreDetailsError = (err) => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_EXPLORE_DETAIL_ERROR,
  errorCode: err,
})

export const fetchExploreDetail = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=941')
      .then(res => dispatch(recievedExploreDetails(res.data)))
      .catch(err => dispatch(recievedExploreDetailsError(err)))
  }
}


export const recievedPostReviewDetails = data => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_REVIEW_POST_SUBMIT_DETAIL,
   data,
   receivedAt: Date.now(),
})  
export const recievedPostReviewDetailsError = (err) => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_REVIEW_POST_SUBMIT_ERROR,
  errorCode: err,
})



export const submitProductReviewData = (data) => {
    console.log(data);
  return dispatch => {
    axios.post('https://uat.mediversal.tech/index.php/api/review/SubmitProductReview',qs.stringify(data))
      .then(res => dispatch(recievedPostReviewDetails(res.data)))
      .catch(err => dispatch(recievedPostReviewDetailsError(err)))
  }
}


export const recievedFeaturedBrandDetails = data => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_FEATURED_BRAND_DETAIL,
   data,
   receivedAt: Date.now(),
})  
export const recievedFeaturedBrandError = (err) => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_FEATURED_BRAND_ERROR,
  errorCode: err,
})

export const fetchFeaturedBrandMedicine = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=931')
      .then(res => dispatch(recievedFeaturedBrandDetails(res.data)))
      .catch(err => dispatch(recievedFeaturedBrandError(err)))
  }
}



export const recievedTopBrandDetails = data => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_TOP_BRAND_DETAIL,
   data,
   receivedAt: Date.now(),
})  
export const recievedTopBrandError = (err) => ({
  type: BUY_MEDICINE_CONSTANTS.RECEIVED_TOP_BRAND_ERROR,
  errorCode: err,
})

export const fetchTopBrandMedicine = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=936')
      .then(res => dispatch(recievedTopBrandDetails(res.data)))
      .catch(err => dispatch(recievedTopBrandError(err)))
  }
}