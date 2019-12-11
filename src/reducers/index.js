import combineReducers from 'redux/lib/combineReducers';
import loginReducer from './login';
import bkmReducer from './bkm_listing';
import productDetailReducer from './products';
import relatedProductReducer from './relatedProducts';
import wishListReducer from './wishList';
import vendorReviewsReducer from './vendorReviews';
import cartReducer from './cartReducer';
import registerReducer from './register';
import contactReducer from './contact';
import trackOrderReducer from './trackOrder';
import myFavouritesReducer from './myfavourites';
import salesRepReducer from './salesRep';
import pastPurchaseReducer from './pastPurchase';
import recurringProfileReducer from './recurringProfiles';
import seasonalSubscriptionReducer from './seasionalSubscriptionReducer';
import allAddressReducer from './address';
import myOrderReducer from './myOrder';
import productReviewsReducer from './productReviews';
import tagsReducer from './tags';
import accountInformationReducer from './accountInformation';
import placeOrderReducer from './placeOrder';
import viewsReducer from './recenttViewsReducer';
import blogReducer from './blog';
import vendorArtistsReducer from './vendorArtists';

const commonReducer = (state = 'initialState', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialReducer = (
  state = {
    strainState: 1,
  },
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  initialReducer,
  commonReducer,
  bkmReducer,
  productDetailReducer,
  loginReducer,
  cartReducer,
  seasonalSubscriptionReducer,
  relatedProductReducer,
  registerReducer,
  contactReducer,
  trackOrderReducer,
  salesRepReducer,
  wishListReducer,
  vendorReviewsReducer,
  myFavouritesReducer,
  recurringProfileReducer,
  allAddressReducer,
  myOrderReducer,
  productReviewsReducer,
  tagsReducer,
  accountInformationReducer,
  pastPurchaseReducer,
  placeOrderReducer,
  viewsReducer,
  blogReducer,
  vendorArtistsReducer
});

export default rootReducer;
