// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _get from 'lodash/get';
import Redirect from 'react-router/Redirect';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import VendorPendingReviews from '../../components/MyAccount/VendorPendingReviews.jsx';
import Loader from '../../components/Loader/Loader.jsx';
// import Pagination from '../../components/Common/Pagination.jsx';
import '../../assets/stylesheets/VendorPendingReviews.css';
import { fetchVendorPendingReviewsData, fetchPostVendorPendingReviewData, fetchProductVendorReviews } from '../../actions/vendorReviews';
import { mapVendorReviewData } from '../../utils/commonMapper';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import { fetchProductReviews } from '../../actions/products';
import { setOrderId } from '../../actions/myOrder';

class VendorPendingReviewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorQuality: undefined,
            nickName: this.props.firstName,
            reviewSummary: undefined,
            review: undefined,
            incrementId: undefined,
            arrayData: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: undefined,
            totalItems: undefined,
            pageNumbers: [],
            showSuccessMsg: false,
            shipmentId: undefined,
            errors: {},
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'MY ACCOUNT',
                },
            ],
            pendingReviewArray: [],
            showReview: false,
            rating: 0,
            vendorId: undefined,
            viewOrder: false,
        };
    }

    changeRating = (newRating) => {
        this.setState({
            rating: newRating,
        });
    }

    hoverVendorRatings = (vendorId) => {
        this.setState({ hoverVendorReviewsData: [] }, () => this.props.getProductReviews({ vendorId }));
    }

    hoverProductRatings = (productId) => {
        this.setState({ hoverProductReviewsData: [] }, () => this.props.getMyProductReviews({ productId }));
    }

    handleViewOrder = (orderId) => {
        this.setState({
            viewOrder: true,
            orderId,
        });
        this.props.setOrderId(orderId);
    }

    componentDidMount() {
        document.title = 'My Vendor Pending Reviews';
        this.props.fetchVenderPendingReviewsData({ apiToken: this.props.apiToken, pageNo: this.state.currentPage });
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(nextProps.vendorReviewsData)) {
            const totalPages = _get(nextProps.vendorReviewsData, 'total_pages');
            const totalItems = _get(nextProps.vendorReviewsData, 'total_orders');
            const pageNumbers = [];
            let i = 1;
            while (i <= totalPages) {
                pageNumbers.push(i);
                i += 1;
            }
            _get(nextProps.vendorReviewsData, 'result').map((thisReview, ind) => {
                thisReview.products_ordered && thisReview.products_ordered.map((thisProduct, indx) => {
                    this.state.pendingReviewArray.push({
                        productName: thisProduct.product_name,
                        urlKey: thisProduct.url_key,
                        orderNo: thisReview.order_id,
                        vendorName: thisReview.vendor_name,
                        deliveryDate: thisProduct.delivery_date,
                        image: thisProduct.image,
                        vendorId: thisReview.vendor_id,
                        shipmentId: thisReview.shipment_id,
                        productRating: thisProduct.product_ratings,
                        vendorRating: thisProduct.vendor_ratings,
                        productId: thisProduct.product_id,
                    });
                });
            });
            this.setState({
                arrayData: _get(nextProps.vendorReviewsData, 'result'),
                pageNumbers,
                totalPages,
                totalItems,
            });
        }

        if (!_isEmpty(nextProps.reviewsResponseData) && _get(nextProps, 'reviewsResponseData.code') === 1) {
            this.setState({ showSuccessMsg: true, showReview: false });
        }

        if (!_isEmpty(_get(nextProps, 'productVendorReviews'))) {
            this.setState({
                hoverVendorReviewsData: _get(nextProps, 'productVendorReviews'),
            });
        }

        if (!_isEmpty(nextProps.productReviewsData)) {
            this.setState({
                hoverProductReviewsData: nextProps.productReviewsData,
            });
        }
    }

    // changeRating = (incrementId, newRating) => {
    //     this.setState({
    //         vendorQuality: newRating,
    //         incrementId,
    //     });
    // }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    toggleReviewModal = (vendorId, shipmentId) => {
        this.setState({ showReview: !this.state.showReview, vendorId, shipmentId });
    }

    onPageChanged = (currentPage) => {
        this.setState({ pendingReviewArray: [] }, () =>
            this.props.fetchVenderPendingReviewsData({
                apiToken: this.props.apiToken,
                pageNo: currentPage,
            }));
        this.setState({ currentPage });
    }

    handleSubmitReview = () => {
        const errors = {};
        if (!this.state.rating) {
            errors.rating = true;
        }
        if (!this.state.review) {
            errors.review = true;
        }
        if (!this.state.reviewSummary) {
            errors.reviewSummary = true;
        }
        if (!this.state.nickName) {
            errors.nickName = true;
        }

        if (_isEmpty(errors)) {
            const reqBody = mapVendorReviewData({
                ...this.state,
                ...this.props,
                // vendorId,
                // shipmentId,
            });
            this.props.fetchPostVendorReviewData(reqBody);
        } else {
            this.setState({
                errors,
                // shipmentId,
            });
        }
    }

    // handleSubmitReview = (vendorId, shipmentId) => {
    //     const errors = {};
    //     if (!this.state.vendorQuality) {
    //         errors.vendorQuality = true;
    //     }
    //     if (!this.state.review) {
    //         errors.review = true;
    //     }
    //     if (!this.state.reviewSummary) {
    //         errors.reviewSummary = true;
    //     }
    //     if (_isEmpty(errors)) {
    //         const reqBody = mapVendorReviewData({
    //             ...this.state,
    //             ...this.props,
    //             vendorId,
    //             shipmentId,
    //         });
    //         this.props.fetchPostVendorReviewData(reqBody);
    //     } else {
    //         this.setState({
    //             errors,
    //             shipmentId,
    //         });
    //     }
    // }

    render() {
        // if (_get(this, 'props.isLoading')) {
        //     return (
        //         <div className="container" style={{ minHeight: '500px' }}>
        //             <div className="col-md-3">
        //                 <OneColumLeft
        //                     salesRepUser={this.props.salesRepUser}
        //                     primeUser={this.props.primeUser}
        //                 />
        //             </div>
        //             <div>
        //                 <Loader />
        //             </div>
        //         </div>
        //     );
        // }
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }

        if (this.state.viewOrder) {
            return <Redirect push to={{
                pathname: '/customer/account/viewOrder',
                state: { orderId: this.state.orderId },
            }} />;
        }

        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">
                    <div className='container-block'>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <ErrorBoundary>
                                <OneColumLeft
                                    salesRepUser={this.props.salesRepUser}
                                    primeUser={this.props.primeUser}
                                    rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                                />
                            </ErrorBoundary>
                        </div>
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            {this.state.showSuccessMsg ? <ul className='review-success'>
                                <li className='success-msg'>
                                    <ul>
                                        <li className='review-success-li'>
                                            <span>
                                                <span className='glyphicon glyphicon-ok icon-span' />
                                                Your review has been accepted for moderation.
                                    </span>
                                        </li>
                                    </ul>
                                </li>
                            </ul> : ''}
                            <h2>My Vendor Pending Reviews</h2>
                            <div>
                                <div>
                                    {/* <span className='col-lg-6 col-md-6 col-sm-12'>
                                        {_get(this.state, 'totalItems')}  Item(s)
                                    </span> */}
                                    {/* <span className='col-lg-6 col-md-6  col-sm-12'>
                                    <ErrorBoundary>
                                        <Pagination totalRecords={this.state.totalItems}
                                            currentPage={this.state.currentPage}
                                            pageLimit={this.state.itemsPerPage}
                                            pageNeighbours={2}
                                            onPageChanged={this.onPageChanged} />
                                    </ErrorBoundary>
                                    </span> */}
                                </div>
                                <ul>
                                    {/* {Array.isArray(this.state.arrayData) &&
                                        this.state.arrayData.length > 0 &&
                                        this.state.arrayData.map((eachReview, indexR) =>
                                            <ErrorBoundary>
                                            <VendorPendingReviews rating={3.5} key={indexR}
                                                {...this.state}
                                                eachReview={eachReview}
                                                changeRating={this.changeRating}
                                                handleInputChange={this.handleInputChange}
                                                handleSubmitReview={this.handleSubmitReview}
                                            />
                                            </ErrorBoundary>)} */}
                                    <ErrorBoundary>
                                        <VendorPendingReviews
                                            {...this.state}
                                            pendingReviewArray={this.state.pendingReviewArray}
                                            handleInputChange={this.handleInputChange}
                                            handleSubmitReview={this.handleSubmitReview}
                                            totalItems={this.state.totalItems}
                                            totalItems={this.state.totalItems}
                                            itemsPerPage={this.state.itemsPerPage}
                                            onPageChanged={this.onPageChanged}
                                            showReview={this.state.showReview}
                                            toggleReviewModal={this.toggleReviewModal}
                                            changeRating={this.changeRating}
                                            rating={this.state.rating}
                                            hoverVendorRatings={this.hoverVendorRatings}
                                            hoverVendorReviewsData={this.state.hoverVendorReviewsData}
                                            hoverProductRatings={this.hoverProductRatings}
                                            hoverProductReviewsData={this.state.hoverProductReviewsData}
                                            handleViewOrder={this.handleViewOrder}
                                        />
                                    </ErrorBoundary>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchVenderPendingReviewsData: data => dispatch(fetchVendorPendingReviewsData(data)),
    fetchPostVendorReviewData: data => dispatch(fetchPostVendorPendingReviewData(data)),
    getProductReviews: data => dispatch(fetchProductVendorReviews(data)),
    getMyProductReviews: data => dispatch(fetchProductReviews(data)),
    setOrderId: data => dispatch(setOrderId(data)),
});

const mapStateToProps = (state) => {
    const { vendorReviewsReducer, loginReducer, productReviewsReducer, myOrderReducer } = state;

    const {
        vendorReviewsData,
        isFetching: isLoading,
        reviewsResponseData,
        productVendorReviews,
        error: vendorReviewsError,
    } = vendorReviewsReducer || [];

    const {
        apiToken,
        firstName,
        localeId,
        storeId,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        productReviewsData,
    } = productReviewsReducer || [];

    const {
        orderId,
    } = myOrderReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(vendorReviewsError) || _isError(vendorReviewsError);

    return {
        vendorReviewsData,
        isLoading,
        apiToken,
        firstName,
        localeId,
        storeId,
        salesRepUser,
        reviewsResponseData,
        error,
        productVendorReviews,
        primeUser,
        productReviewsData,
        orderId,
        userProfileData,
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ErrorHandler(VendorPendingReviewContainer));
