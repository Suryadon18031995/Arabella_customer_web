
import * as GERIATRIC_CARE_CONSTANTS from '../constants/geriatricCare';
import axios from 'axios';

const apiUrl = 'https://uat.mediversal.tech/index.php/api/';

export const recievedEmergencyHealthDetails = data => ({
  type: GERIATRIC_CARE_CONSTANTS.RECEIVED_EMERGENCY_HEALTH,
   data,
   receivedAt: Date.now(),
})  
export const recievedEmergencyHealthError = (err) => ({
  type: GERIATRIC_CARE_CONSTANTS.RECEIVED_EMERGENCY_HEALTH_ERROR,
  errorCode: err,
})

export const fetchEmergencyHealthData = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=955')
      .then(res => dispatch(recievedEmergencyHealthDetails(res.data)))
      .catch(err => dispatch(recievedEmergencyHealthError(err)))
  }
}
export const recievedTestimonialsDetails = data => ({
  type: GERIATRIC_CARE_CONSTANTS.RECEIVED_GC_TESTIMONIALS,
   data,
   receivedAt: Date.now(),
})  
export const recievedTestimonialsError = (err) => ({
  type: GERIATRIC_CARE_CONSTANTS.RECEIVED_GC_TESTIMONIALS_ERROR,
  errorCode: err,
})

export const fetchTestimonialsData = () => {
  return dispatch => {
    axios.post(apiUrl+'category/homeCatIcons?parent_cat_id=946')
      .then(res => dispatch(recievedTestimonialsDetails(res.data)))
      .catch(err => dispatch(recievedTestimonialsError(err)))
  }
}