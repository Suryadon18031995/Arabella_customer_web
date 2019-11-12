// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import ProductReviewTable from '../../components/MyAccount/ProductReviews.jsx';
import { fetchProductReviews, fetchHoverProductReviews } from '../../actions/products';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class ProductReviewContainer extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.toggleDetailModalFn = this.toggleDetailModalFn.bind(this);

        this.state = {
            data: undefined,
            toggleDetailModal: false,
            detailData: {},
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
            hoverLoad: false,
            hoverProductReviewsData: [],
        };
    }
    goBack() {
        this.props.history.goBack();
    }
    toggleDetailModalFn(row) {
        this.setState({
            toggleDetailModal: !(this.state.toggleDetailModal),
            detailData: row,
        });
    }

    hoverRatings = (productId) => {
        this.setState({ hoverProductReviewsData: [], hoverLoad: true, firstLoad: false }, () => this.props.fetchHoverProductReviews({
            productId,
        }));
    }

    componentDidMount() {
        document.title = 'My Product Reviews';
        this.setState({ hoverLoad: false, firstLoad: true }, () => this.props.getMyProductReviews({
            apiToken: _get(this.props, 'apiToken'),
        }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(nextProps.productReviewsData) && this.state.firstLoad) {
            const totalPages = _get(nextProps.productReviewsData, 'total_pages');
            const totalItems = _get(nextProps.productReviewsData, 'total_orders');
            const pageNumbers = [];
            let i = 1;
            while (i <= totalPages) {
                pageNumbers.push(i);
                i += 1;
            }
            this.setState({
                data: nextProps.productReviewsData,
                pageNumbers,
                totalPages,
                totalItems,
            });
        }

        if (!_isEmpty(nextProps.hoverProductReviewsData) && this.state.hoverLoad) {
            this.setState({
                hoverProductReviewsData: nextProps.hoverProductReviewsData,
                totalReviews: _get(nextProps.hoverProductReviewsData, 'total_reviews'),
            });
        }
    }
    render() {
        // if (_get(this, 'props.isLoading')) {
        //     return (
        //         <div className="container">
        //             <div className="col-md-3">
        //             <ErrorBoundary>
        //                 <OneColumLeft
        //                     salesRepUser={this.props.salesRepUser}
        //                     primeUser={this.props.primeUser}
        //                 />
        //             </ErrorBoundary>
        //             </div>
        //             {/* <div>
        //                 <Loader />
        //             </div> */}
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
                            <div>
                                <h2>My Product Reviews</h2>
                                <ErrorBoundary>
                                    <ProductReviewTable data={this.state.data}
                                        toggleDetailModalFn={this.toggleDetailModalFn}
                                        toggleDetailModal={this.state.toggleDetailModal}
                                        detailData={this.state.detailData}
                                        hoverRatings={this.hoverRatings}
                                        hoverProductReviewsData={this.state.hoverProductReviewsData}
                                        totalReviews={this.state.totalReviews} />
                                </ErrorBoundary>
                                <div>
                                    <button onClick={this.goBack}>Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    getMyProductReviews: data => dispatch(fetchProductReviews(data)),
    fetchHoverProductReviews: data => dispatch(fetchHoverProductReviews(data)),
});

const mapStateToProps = (state) => {
    const {
        productReviewsReducer, loginReducer,
    } = state;

    const {
        apiToken,
        user,
        salesRepUser,
        storeId,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        productReviewsData,
        hoverProductReviewsData,
        isFetching: isLoading,
        error: productsReviewError,
    } = productReviewsReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(productsReviewError) || _isError(productsReviewError);

    return {
        productReviewsData,
        isLoading,
        apiToken,
        user,
        storeId,
        salesRepUser,
        error,
        primeUser,
        hoverProductReviewsData,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ProductReviewContainer));
