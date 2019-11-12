import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import VendorReviewsComponent from '../../components/MyAccount/VendorReviewsComponent.jsx';
import { fetchMyVendorreviews, fetchProductVendorReviews } from '../../actions/vendorReviews';
import Loader from '../../components/Loader/Loader.jsx';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class VendorReviewsContainer extends Component {
    state = {
        reviews: undefined,
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
        firstLoad: true,
        hoverLaod: false,
        hoverVendorReviewsData: [],
    }

    hoverRatings = (vendorId) => {
        this.setState({ hoverVendorReviewsData: [], hoverLoad: true, firstLoad: false }, () => this.props.getProductReviews({ vendorId }));
    }

    componentDidMount() {
        document.title = 'My Vendor Reviews';
        this.setState({ hoverLoad: false, firstLoad: true }, () => this.props.getReviewsData({ apiToken: this.props.apiToken }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'myReviewsData')) && this.state.firstLoad) {
            this.setState({
                reviews: _get(nextProps, 'myReviewsData.data'),
            });
        }

        if (!_isEmpty(_get(nextProps, 'productVendorReviews'))) {
            this.setState({
                hoverVendorReviewsData: _get(nextProps, 'productVendorReviews'),
            });
        }
    }
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
                            <ErrorBoundary>
                                <VendorReviewsComponent
                                    reviews={this.state.reviews}
                                    hoverRatings={this.hoverRatings}
                                    hoverVendorReviewsData={this.state.hoverVendorReviewsData}
                                    totalReviews={this.state.totalReviews} />
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getReviewsData: (data, type) => dispatch(fetchMyVendorreviews(data, type)),
    getProductReviews: data => dispatch(fetchProductVendorReviews(data)),
});

const mapStateToProps = (state) => {
    const {
        loginReducer,
        vendorReviewsReducer,
    } = state;

    const {
        salesRepUser,
        apiToken,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        myReviewsData,
        productVendorReviews,
        isFetching: isLoading,
        error: vendorReviewsError,
    } = vendorReviewsReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(vendorReviewsError) || _isError(vendorReviewsError);

    return {
        salesRepUser,
        apiToken,
        myReviewsData,
        isLoading,
        error,
        primeUser,
        productVendorReviews,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(VendorReviewsContainer));

