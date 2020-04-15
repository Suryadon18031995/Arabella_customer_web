import React from 'react';
import thunk from 'redux-thunk';
import ReactDom from 'react-dom';
import { Switch } from 'react-router-dom';
import Provider from 'react-redux/lib/components/Provider';
import { createLogger } from 'redux-logger/src/index';
import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
// import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import fetchMiddleware from './middlewares/fetchMiddleware';

import reducer from './reducers';

import EmptyLayout from './EmptyLayout.jsx';
import HeaderLayout from './HeaderLayout.jsx';
import ArtistLayout from './ArtistLayout.jsx';
import ContactUsContainer from './containers/ContactUs.jsx';
// import VendorRegistration from './containers/VendorRegistration.jsx';
import ReturnsAndRefundsPolicy from './containers/ReturnsAndRefundsPolicy.jsx';
import OurVendors from './containers/OurVendors.jsx';
import CategoryContainer from './containers/ShopByCategory/CategoryConatiner.jsx';
import ShopByFlowersContainer from './containers/ShopByFlowers/ShopByFlowersContainer.jsx';
import NewArrivalsContainer from './containers/ShopByCategory/NewArrivals.jsx';
import FloralSuppliesContainer from './containers/ShopByCategory/FloralSupplies.jsx';
// import PreMadeBouquetsContainer from './containers/ShopByCategory/PreMadeBouquets.jsx';
import NextDayDeliveryContainer from './containers/ShopByCategory/NextDayDelivery.jsx';
import catalogsearch from './containers/ShopByCategory/catalogsearch.jsx';
import HomeContainer from './containers/HomeContainer/HomeContainers.jsx';
import HomePageOne from './containers/HomePageOne/HomePageOne.jsx';
import HomePageTwo from './containers/HomePageTwo/HomePageTwo.jsx';
import HomePageThree from './containers/HomePageThree/HomePageThree.jsx';
import RegisterContainer from './containers/RegisterContainer.jsx';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer.jsx';
import AboutUsContainer from './containers/AboutUsContainer/AboutUs.jsx';
import SustainabilityContainer from './containers/AboutUsContainer/Sustainability.jsx';
import ForgotPasswordContainer from './containers/HomeContainer/ForgotPasswordContainer.jsx';
import MyCartContainer from './containers/MyCartContainer.jsx';
import PrivacyPolicyContainer from './containers/AboutUsContainer/PrivacyPolicy.jsx';
import TermsContainer from './containers/AboutUsContainer/TermsContainer.jsx';
import FAQVendorContainer from './containers/AboutUsContainer/FAQVendorContainer.jsx';
import FAQCustomerContainer from './containers/AboutUsContainer/FAQCustomerContainer.jsx';
import FreshDealsContainer from './containers/FreshDeals/FreshDealsContainer.jsx';
import TrackOrderContainer from './containers/TrackOrderContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import BestsellerContainer from './containers/ShopByCategory/BestsellerContainer.jsx';
// import FallCollectionContainer from './containers/ShopByCategory/FallCollectionContainer.jsx';
import WeddingFlowersContainer from './containers/ShopByCategory/WeddingFlowersContainer.jsx';
import LogoutContainer from './containers/LogoutContainer.jsx';
import BlogContainer from './containers/Blog/BlogContainer.jsx';
import ArticleContainer from './containers/Blog/ArticleContainer.jsx';
import CategoryPost from './containers/Blog/CategoryPost.jsx';
import ArchivePost from './containers/Blog/ArchivePost.jsx';
import TagsBlogContainer from './containers/Blog/TagsBlogContainer.jsx';
import AuthorBlogContainer from './containers/Blog/AuthorBlogContainer.jsx';
import SearchBlogContainer from './containers/Blog/SearchBlogContainer.jsx';
import PastPurrchaseContainer from './containers/PastPurchaseContainer.jsx';
import CheckOutContainer from './containers/MyAccount/CheckOutContainer.jsx';
import ErrorContainer from './containers/ErrorContainer.jsx';
// import PrimeMembership from './containers/PrimeMembership.jsx';

import './assets/stylesheets/main.css';
import './assets/stylesheets/main.less';
import './assets/stylesheets/mediversal.css';
import ProductDetailContainer from './containers/ProductContainer/ProductDetailContainer.jsx';
import ProfileDetailContainer from './containers/MyAccount/ProfileDetailContainer.jsx';
/* My Account Containers START:  */
import MyAccountDashBoardContainer from './containers/MyAccount/MyAccountDashBoardContainer.jsx';
import InformationContainer from './containers/MyAccount/InformationContainer.jsx';
import MyRewardsContainer from './containers/MyAccount/MyRewardsContainer.jsx';
import AddressBookContainer from '././containers/MyAccount/AddressBook/AddressBookContainer.jsx';
import AddNewAddressContainer from '././containers/MyAccount/AddressBook/AddNewAddressContainer.jsx';
import MyOrderContainer from './containers/MyAccount/MyOrderContainer.jsx';
import RecuringProfileContainer from './containers/MyAccount/RecuringProfileContainer.jsx';
import ProductReviewContainer from './containers/MyAccount/ProductReviewContainer.jsx';
import TagsContainer from './containers/MyAccount/TagsContainer.jsx';
import WishListContainer from './containers/MyAccount/WishListContainer.jsx';
import VendorPendingReviewContainer from './containers/MyAccount/VendorPendingReviewContainer.jsx';
import VendorReviewsContainer from './containers/MyAccount/VendorReviewsContainer.jsx';
import SalesRepsContainer from './containers/MyAccount/SalesRepsContainer.jsx';
import TagsDetailContainer from './containers/MyAccount/TagsDetailContainer.jsx';
import MyFavouriteContainer from './containers/MyAccount/MyFavouriteContainer.jsx';
import ViewOrderContainer from './containers/MyAccount/ViewOrderContainer.jsx';
import CheckOutSuccessContainer from './containers/MyAccount/CheckOutSuccessContainer.jsx';
// import PrintOrderContainer from './containers/MyAccount/PrintOrderContainer.jsx';
import ReviewsContainer from './containers/ReviewsContainer.jsx';
import FirstDataContainer from './containers/MyAccount/FirstDataContainer.jsx';
import ReOrderCOntainer from './containers/MyAccount/ReOrderContainer.jsx';
import PayPalContainer from './containers/MyAccount/PayPalContainer.jsx';
import SalesRepHead from './containers/MyAccount/SalesRepHead.jsx';
// import MothersDayPrebookContainer from './containers/MothersDayPrebook/MothersDayPrebookContainer.jsx';
import NotFoundComponent from './components/NotFound.jsx';
// import AdminPage from './containers/AdminPage.jsx';
// import PrimeMemberDashboard from './containers/MyAccount/PrimeMemberDashboard.jsx';
import SubscriptionTerms from './components/SeasonalSubscription/SubscriptionTerms.jsx';
// import PrimeTerms from './components/Prime/PrimeTerms.jsx';
import PrimeMembershipProgram from './containers/PrimeMembershipPage.jsx';
// import PrimeMembershipPageBenefit from './containers/PrimeMembershipPageBenefit.jsx';
import CCAvenueResponseHandler from './containers/MyAccount/CCAvenueResponse.jsx';
import VendorProfile from './containers/VendorProfile/VendorProfile.jsx';
import VendorRegistration from './containers/VendorProfile/VendorRegistration.jsx';
import OrderManagement from './containers/VendorProfile/OrderManagement.jsx';
import ProductUpload from './containers/VendorProfile/ProductUpload.jsx';
import ProductUpdate from './containers/VendorProfile/ProductUpdate.jsx';
import ArtistLogistics from './containers/VendorProfile/ArtistLogistics.jsx';
import ArtistLogin from './containers/VendorProfile/ArtistLogin.jsx';
/* My Account Containers END;  */

library.add(faCircle, faCheckCircle);

// ReactGA.initialize('UA-80071347-1');
// ReactGA.pageview('/');

const tagManagerArgs = {
  gtmId: 'GTM-NZV8QW',
  events: {
    ecomm_event: 'ecomm_event',
  },
};

// TagManager.initialize(tagManagerArgs);

const middleware = [thunk, fetchMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  blacklist: ['bkmReducer'],
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  // reducer,
  persistedReducer,
  applyMiddleware(...middleware),
);

export const persistor =
  // let store = createStore(persistedReducer, applyMiddleware(...middleware))
  persistStore(store);

function RouteWithLayout({ layout, component, ...rest }) {
  // debugger;
  // ReactGA.pageview(rest.location.pathname);
  return (
    <Route
      {...rest}
      render={props =>
        React.createElement(
          layout,
          props,
          React.createElement(component, props),
        )
      }
    />
  );
}

// @to1do: drive url routes from a config file for central control
ReactDom.render(
  <div>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/"
              component={HomeContainer}
            />
             <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/catalog/category/view/s/pharma/id/896/"
              component={HomePageOne}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/catalog/category/view/s/lab-test/id/807/"
              component={HomePageTwo}
            />
			      <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/catalog/category/view/s/geriatrics-care/id/808/"
              component={HomePageThree}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/catalog/category/view/s/doctor-appointment/id/809/"
              component={HomePageThree}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/Product-Details/:id"
              component={ProductDetailContainer}
            />
            {/* <RouteWithLayout
              layout={EmptyLayout}
              exact
              path="/admin"
              component={AdminPage}
            />
            <RouteWithLayout
              layout={EmptyLayout}
              exact
              path="/index.php/admin"
              component={AdminPage}
            />
            <RouteWithLayout
              layout={EmptyLayout}
              exact
              path="/bkm/vendor"
              component={AdminPage}
            />
            <RouteWithLayout
              layout={EmptyLayout}
              exact
              path="/whm"
              component={AdminPage}
            />
            <RouteWithLayout
              layout={EmptyLayout}
              exact
              path="/cpanel"
              component={AdminPage}
            /> */}
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/wholesale-flowers/fresh-deals"
              component={FreshDealsContainer}
            />
            
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/annual-flower-subscription-terms"
              component={SubscriptionTerms}
            />
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/prebook-flower-subscription-terms"
              component={PrebookTerms}
            /> */}
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/premium-terms"
              component={PrimeTerms}
            /> */}
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/prebook-flower-subscription"
              component={PrebookSubscriptionContainer}
            /> */}
            {/* My account routes Starts: */}
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account"
              component={MyAccountDashBoardContainer}
            />
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/premium"
              component={PrimeMemberDashboard}
            /> */}
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/edit"
              component={InformationContainer}
            />
            <RouteWithLayout // @todo
              layout={HeaderLayout}
              exact
              path="/customer/account/rewards"
              component={MyRewardsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/rewards/settings"
              component={MyRewardsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/rewards/points"
              component={MyRewardsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/address"
              component={AddressBookContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/orders"
              component={MyOrderContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/recuring_profile"
              component={RecuringProfileContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/reviews"
              component={ProductReviewContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/tags"
              component={TagsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/wishlist"
              component={WishListContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/pending"
              component={VendorPendingReviewContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/vendor_reviews"
              component={VendorReviewsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/favourites"
              component={MyFavouriteContainer}
            />

            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/salesRep"
              component={SalesRepsContainer}
            />
            {/* My accounts reoutes ends; */}

            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/listing-products"
              component={ShopByFlowersContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/new-arrivals"
              component={NewArrivalsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/wholesale-flowers/floral-supplies"
              component={FloralSuppliesContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/wholesale-flowers/local-delivery"
              component={FloralSuppliesContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/catalogsearch/result/"
              component={catalogsearch}
            />
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/preMadeBouquets"
              component={PreMadeBouquetsContainer}
            /> */}
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/nextday-delivery"
              component={NextDayDeliveryContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/best-seller"
              component={BestsellerContainer}
            />{' '}
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/FallCollectionContainer"
              component={FallCollectionContainer}
            />{' '} */}
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/wedding-flowers"
              component={WeddingFlowersContainer}
            />
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/premium-products"
              component={PrimeMembership}
            /> */}
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/premium-membership"
              component={PrimeMembershipProgram}
            />
             <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/ccavResponseHandler"
              component={CCAvenueResponseHandler}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/ccAvenueCancelHandler"
              component={CCAvenueResponseHandler}
            />
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/premium-member-benefits"
              component={PrimeMembershipPageBenefit}
            /> */}
            <RouteWithLayout
              layout={EmptyLayout}
              exact
              path="/register"
              component={RegisterContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/about-us"
              component={AboutUsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/about-us#features"
              component={AboutUsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/about-us#howitwork"
              component={AboutUsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/about-us#pricing"
              component={AboutUsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/blog"
              component={BlogContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/blog/category/:id"
              component={CategoryPost}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/blog/archive/:id"
              component={ArchivePost}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/blog/author/:id"
              component={AuthorBlogContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/blog/tags/:id"
              component={TagsBlogContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/blog/search"
              component={SearchBlogContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/blog/:id"
              component={ArticleContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/sustainable_floral_fund"
              component={SustainabilityContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/forgotPassword"
              component={ForgotPasswordContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/view-cart"
              component={MyCartContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/contacts"
              component={ContactUsContainer}
            />
            {/* <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/umicrosite/vendor/register/"
              component={VendorRegistration}
            /> */}
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/privacy-policy"
              component={PrivacyPolicyContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/term-and-conditions"
              component={TermsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/returns-and-refunds-policy"
              component={ReturnsAndRefundsPolicy}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/vendors"
              component={OurVendors}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/faq-vendor"
              component={FAQVendorContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/faq-customer"
              component={FAQCustomerContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/track-order/"
              component={TrackOrderContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/ErrorsPage"
              component={ErrorContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/login"
              component={LoginContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/logoutSuccess"
              component={LogoutContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/head"
              component={SalesRepHead}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/RegisterSuccess"
              component={RegisterSuccessContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/profileDetail"
              component={ProfileDetailContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/tags/detail/:tagId"
              component={TagsDetailContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/address/new"
              component={AddNewAddressContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/address/edit"
              component={AddNewAddressContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/pastPurchase"
              component={PastPurrchaseContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/checkout/onepage"
              component={CheckOutContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/viewOrder"
              component={ViewOrderContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/checkout/onepage/success"
              component={CheckOutSuccessContainer}
            />
            {/* <RouteWithLayout
              layout={EmptyLayout}
              exact
              path="/print/order/:id"
              component={PrintOrderContainer}
            /> */}
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/wholesale-flowers/all-flowers/:id"
              component={CategoryContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              // exact
              path="/wholesale-flowers/:id"
              component={CategoryContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/product/reviews/:id"
              component={ReviewsContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/firstData"
              component={FirstDataContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/customer/account/re-order"
              component={ReOrderCOntainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/paypal"
              component={PayPalContainer}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/vendor-profile"
              component={VendorProfile}
            />
            <RouteWithLayout
              layout={EmptyLayout}
              exact
              path="/vendor-registration"
              component={VendorRegistration}
            />
            <Route
              // layout={ArtistLayout}
              path="/artist/login"
              component={ArtistLogin}
            />
            <RouteWithLayout
              layout={ArtistLayout}
              path="/artist/orderManagement"
              component={OrderManagement}
            />
            <RouteWithLayout
              layout={ArtistLayout}
              exact
              path="/artist/productUpload"
              component={ProductUpload}
            />
            <RouteWithLayout
              layout={ArtistLayout}
              exact
              path="/artist/productUpdate"
              component={ProductUpdate}
            />
            <RouteWithLayout
              layout={ArtistLayout}
              exact
              path="/artist/logistics"
              component={ArtistLogistics}
            />
           
            <RouteWithLayout
              layout={HeaderLayout}
              exact
              path="/404"
              component={NotFoundComponent}
            />
            <RouteWithLayout
              layout={HeaderLayout}
              component={NotFoundComponent}
            />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </div>,
  document.getElementById('content-wrapper'),
);
