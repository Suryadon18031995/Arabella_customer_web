// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import { Redirect } from 'react-router';
import Loader from '../../components/Loader/Loader.jsx';
import WishListComponent from '../../components/MyAccount/WishListComponent.jsx';
import { fetchWishlistinfo, fetchUpdatedWishlistinfo } from '../../actions/wishList';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class WishListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: undefined,
            redirectToAccountPage: false,
            removefromWishlist: false,
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
        };
    }

    componentDidMount() {
        document.title = 'My Wishlist';
        this.props.getWishlistData({ apiToken: this.props.apiToken });
    }
    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'wishListInfo'))) {
            this.setState({
                result: _get(nextProps, 'wishListInfo'),
            });
        }

        if (!_isEmpty(_get(nextProps, 'removeWishListInfo'))) {
            if (_get(nextProps.removeWishListInfo, 'code') === 1) {
                this.props.getWishlistData({ apiToken: this.props.apiToken });
            }
        }
    }

    handleBackButtonClick = () => {
        this.setState({
            redirectToAccountPage: true,

        });
    }

    handleRemoveWishlist = (pid) => {
        this.props.requestRemoveWishlistinfo({ apiToken: this.props.apiToken, productId: pid });
    }


    render() {
        if (this.state.redirectToAccountPage) {
            return <Redirect push to={{
                pathname: '/customer/account',
            }} />;
        }
        if (_get(this, 'props.isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }
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
                        <ErrorBoundary>
                            <WishListComponent
                                state={this.state}
                                handleBackButtonClick={this.handleBackButtonClick}
                                handleRemoveWishlist={this.handleRemoveWishlist}
                                salesRepUser={this.props.salesRepUser}
                                primeUser={this.props.primeUser}
                                rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                            />
                        </ErrorBoundary>
                    </div >
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getWishlistData: (data, type) => dispatch(fetchWishlistinfo(data, type)),
    requestRemoveWishlistinfo: (data, type) => dispatch(fetchUpdatedWishlistinfo(data, type)),
});

const mapStateToProps = (state) => {
    const { wishListReducer, loginReducer } = state;

    const {
        wishListInfo,
        removeWishListInfo,
        isFetching: isLoading,
        error: wishlistError,
    } = wishListReducer || [];

    const {
        loginData,
        apiToken,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(wishlistError) || _isError(wishlistError);

    return {
        wishListInfo,
        removeWishListInfo,
        loginData,
        isLoading,
        apiToken,
        salesRepUser,
        error,
        primeUser,
        userProfileData,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(WishListContainer));
