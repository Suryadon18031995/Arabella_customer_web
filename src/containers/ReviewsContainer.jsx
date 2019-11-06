import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _get from 'lodash/get';
import Redirect from 'react-router/Redirect';
import RecentReviews from '../components/MyAccount/RecentViews.jsx';
import { fetchProductVendorReviews } from '../actions/vendorReviews';
import Loader from '../components/Loader/Loader.jsx';
import VendorReviewsComponent from '../components/MyAccount/VendorReviewsComponent.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

class ReviewsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recentViewsData: this.props.recentViews || undefined,
            vendorId: _get(this.props, 'location.state.vendorId', this.props.vendorId),
            pageNo: 1,
            reviews: undefined,
            redirectToMyAccount: false,
            vendorName: _get(this.props, 'location.state.vendorName', this.props.vendorName),
        };
    }

    componentDidMount() {
        this.props.getProductVendorReviews({
            vendorId: _get(this.state, 'vendorId'),
            pageNo: 1,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'recentViews'))) {
            this.setState({
                recentViewsData: _get(nextProps, 'recentViews'),
            });
        }
        if (!_isEmpty(_get(nextProps, 'productVendorReviews'))) {
            this.setState({
                reviews: _get(nextProps, 'productVendorReviews.data'),
            });
        }
    }

    handleViewAllClick = () => {
        this.setState({ redirectToMyAccount: true });
    }

    render() {
        if (this.state.redirectToMyAccount) {
            return <Redirect push to="/customer/account" />;
        }
        if (_get(this, 'props.isLoading')) {
            return (
                <div className="loaderDiv" style={{ minHeight: '400px' }}>
                    <Loader />
                </div>
            );
        }
        return (
            <div className="container">
                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col-md-9 col-lg-9 col-sm-9">
                        <ErrorBoundary>
                            <VendorReviewsComponent
                                vendorName={this.state.vendorName}
                                reviews={this.state.reviews} />
                        </ErrorBoundary>
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-3">
                        <ErrorBoundary>
                            <RecentReviews
                                recentViewsData={this.state.recentViewsData}
                                apiToken={this.props.apiToken}
                                handleViewAllClick={this.handleViewAllClick}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getProductVendorReviews: (data, type) => dispatch(fetchProductVendorReviews(data, type)),
});

const mapStateToProps = (state) => {
    const { viewsReducer, vendorReviewsReducer, loginReducer } = state;

    const {
        recentViews,
        error: viewsError,
    } = viewsReducer || [];

    const {
        productVendorReviews,
        isFetching: isLoading,
        error: vendorReviewsError,
    } = vendorReviewsReducer || [];

    const {
        apiToken,
        error: loginError,
    } = loginReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(vendorReviewsError) || _isError(vendorReviewsError) || !_isEmpty(viewsError) || _isError(viewsError);
    return {
        recentViews,
        productVendorReviews,
        isLoading,
        apiToken,
        error,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ReviewsContainer));
