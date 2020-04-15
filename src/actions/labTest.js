
import * as LAB_TEST_CONSTANTS from '../constants/labTest';
import axios from 'axios';

const apiUrl = 'https://uat.mediversal.tech/index.php/api/';

export const recievedLabTestimonials = data => ({
  type: LAB_TEST_CONSTANTS.RECEIVED_LAB_TESTIMONIALS,
   data,
   receivedAt: Date.now(),
})  
export const recievedLabTestimonialsError = (err) => ({
  type: LAB_TEST_CONSTANTS.RECEIVED_LAB_TESTIMONIALS_ERROR,
  errorCode: err,
})

export const fetchLabTestimonials = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=947')
      .then(res => dispatch(recievedLabTestimonials(res.data)))
      .catch(err => dispatch(recievedLabTestimonialsError(err)))
  }
}

export const recievedLabSHCDetails = data => ({
  type: LAB_TEST_CONSTANTS.RECEIVED_LAB_SHC,
   data,
   receivedAt: Date.now(),
})  
export const recievedLabSHCDetailsError = (err) => ({
  type: LAB_TEST_CONSTANTS.RECEIVED_LAB_SHC_ERROR,
  errorCode: err,
})

export const fetchLabSHCData = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=943')
      .then(res => dispatch(recievedLabSHCDetails(res.data)))
      .catch(err => dispatch(recievedLabSHCDetailsError(err)))
  }
}

