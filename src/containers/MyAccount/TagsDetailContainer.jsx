import React, { Component } from 'react';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import TagsDetailComponent from '../../components/MyAccount/TagsDetailComponent.jsx';
import { fetchProductTagDetails, removeProductTagDetails } from '../../actions/products';
import Loader from '../../components/Loader/Loader.jsx';
import { mapAddToCartApiData } from '../../utils/commonMapper';
import { postAddToCartData } from '../../actions/cart';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import TagDetailsProductsComponenet from '../../components/MyAccount/TagDetailsProductsComponenet.jsx';
import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import { fetchAddToWishlistData } from '../../actions/wishList';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { receiveShowLoginModalData, updateCartData } from '../../actions/login';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class TagsDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {
            data: undefined,
            tagId: _get(this.props, 'history.location.state.tagId'),
            data2: undefined,
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
            redirectToListPage: false,
            viewType: 'list',
            go: false,
            listData: [],
            inputValid: {},
            productDetails: [],
            deliveryDetails: [],
            displayData: [],
            blinkText: {},
            totalAmount: {},
            displayMore: [],
            filtersEnabled: false,
            dateObjectArray: [],
            tagName: undefined,
            showChangeStoreModal: false,
            selectedStoreName: undefined,
            storeName: this.props.storeName,
        };
    }
    goBack() {
        this.props.history.goBack();
    }
    removeTag = () => {
        this.props.deleteTagDetails({
            apiToken: _get(this.props, 'apiToken'),
            tagId: _get(this.props, 'history.location.state.tagId'),
        });
    }

    handleShowChangeStore = () => {
        this.setState({
            showChangeStoreModal: true,

        });
    };
    handleCloseModal = () => {
        this.setState({
            showChangeStoreModal: false,
        });
    };
    handleMoreDetailClick = (productId) => {
        this.setState({
            showMoreDetail: {
                ...this.state.showMoreDetail,
                [productId]: !_get(this.state.showMoreDetail, productId, false),
            },
        });
    };
    resetMoreDetails = (date, index) => {
        const dataTempAvail = _filter(this.state.deliveryDetails[index], [
            'delivery_date',
            date,
        ])[0];
        this.setState({
            displayData: { ...this.state.displayData, [index]: dataTempAvail },
        });
    };
    componentDidMount() {
        if (_get(this.props, 'history.location.state.tagId')) {
            this.props.getTagDetails({
                apiToken: _get(this.props, 'apiToken'),
                tagId: _get(this.props, 'history.location.state.tagId'),
            });
        } else {
            this.setState({
                redirectToListPage: true,
            });
        }
    }
    handleMethodChange = (event) => {
        if (event.target.name === 'store') {
            // const selectedStoreName = _get(_find(_get(this.props.loginData, [0, 'result', 'store_list'], []), { store_id: event.target.value }), 'store_name');
            const x = _find(_get(this.props.loginData, '0.result.store_list', []), { store_id: event.target.value });
            const selectedStoreName = _get(x, 'store_name');
            this.setState({
                showChangeStoreModal: false,
                selectedStoreId: event.target.value,
                storeName: selectedStoreName,
            });
            if (_get(this.props, 'history.location.state.tagId')) {
                this.props.getTagDetails({
                    apiToken: _get(this.props, 'apiToken'),
                    tagId: _get(this.props, 'history.location.state.tagId'),
                    storeId: this.state.selectedStoreId,
                });
            } else {
                this.setState({
                    redirectToListPage: true,
                });
            }
        }
    };
    handleMoreavailclick = (productId) => {
        this.setState({
            showMore: {
                ...this.state.showMore,
                [productId]: !_get(this.state.showMore, productId, false),
            },
            dispalyMoreAvails: !this.state.dispalyMoreAvails,
        });
    };
    ProductSwatch = (event, index) => {
        const datesArr = {};
        const dataTempAvail = _get(this.state.displayMore, [index, event]);
        dataTempAvail && dataTempAvail.forEach((o) => {
            datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
        });

        this.setState({
            datesArr,
            displayData: { ...this.state.displayData, [index]: dataTempAvail[0] },
        });
    };
    handleAddToWishlist = (productId) => {
        this.props.addToWhishlist({
            apiToken: this.props.apiToken,
            productId,
        });
    }

    handleAddToFavorites = () => {
        this.props.addToFavorites({
            apiToken: this.props.apiToken,
            productId: this.state.productId,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        });
    }

    handleInuputChange = (event, prodData, deliData) => {
        let totalTemp = 0;
        let flag = false;
        const { blinkText, totalAmount, inputValid } = this.state;
        inputValid[prodData.pid] = true;
        if (!isNaN(event.target.value) && event.target.value >= _get(deliData, 'qty_per_box') &&
            event.target.value <= _get(deliData, 'floorallowed') && event.target.value % _get(deliData, 'qty_per_box') === 0) {
            inputValid[prodData.pid] = false;
        }
        if (event.target.value >= _get(deliData, 'qty_per_box')) {
            totalTemp = event.target.value * _get(deliData, 'total_price_currency');
        }
        if (event.target.value >= _get(deliData, 'floorallowed')) {
            flag = true;
            totalTemp = 0;
        }
        if (event.target.value % _get(deliData, 'qty_per_box') !== 0) {
            blinkText[prodData.pid] = 'blink';
        } else {
            blinkText[prodData.pid] = '';
        }
        totalAmount[prodData.pid] = totalTemp;
        this.setState({
            unitQty: event.target.value,
            totalAmount,
            showMaxQtyAlert: flag,
            productId: prodData.pid,
            blinkText,
            inputValid,
        });
    };
    handleAddCartClick = (prodData, deliData) => {
        if (this.props.apiToken) {
            const reqBody = mapAddToCartApiData({
                ...this.state,
                ...prodData,
                ...deliData,
                totalAmount: this.state.totalAmount[prodData.pid],
                user: this.props.user,
                apiToken: this.props.apiToken,
                customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            });
            this.props.addToCart(reqBody);
        } else {
            this.props.showLoginModal({ show: true });
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(nextProps.tagsDetailsData)) {
            this.setState({
                tagName: _get(nextProps, ['tagsDetailsData', 'data', 'tag_name']),
            });
            if (!_isEmpty(nextProps, 'tagsDetailsData.data.results')) {
                const listDataTemp = _get(nextProps, 'tagsDetailsData.data.results');
                // const productDetails = _get(nextProps, 'tagsDetailsData.data.results');
                const detailsTemp = [];
                const deliveryDataTemp = [];
                const displayDataTemp = [];
                const displayMoreTemp = [];
                const datesArrayTemp = [];
                listDataTemp &&
                    Object.entries(listDataTemp).map(([key, val]) => {
                        detailsTemp.push(val.info);
                        val.delivery ? deliveryDataTemp.push(val.delivery) : '';
                        !_isEmpty(val.delivery) && displayDataTemp.push(val.delivery[0]);

                        displayMoreTemp.push(val.more_avail);// today
                        const datesArr = {};
                        _filter(val.delivery).forEach((o) => {
                            datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
                        });

                        datesArrayTemp.push(datesArr);
                    });
                this.setState({
                    go: true,
                    listData: listDataTemp,
                    productDetails: detailsTemp,
                    deliveryDetails: deliveryDataTemp,
                    displayData: displayDataTemp,
                    displayMore: displayMoreTemp,
                    filtersEnabled: false,
                    dateObjectArray: datesArrayTemp,
                });
            }
        }
        if (!_isEmpty(nextProps.deleteTags)) {
            this.setState({
                data3: _get(nextProps, 'deleteTags'),
            });
        }
        if (!_isEmpty(nextProps.addCartResponseDetails) && (this.props.type === 'REQUEST_ADD_TO_CART') && (this.props.cartCount !== _get(nextProps.addCartResponseDetails, ['total_products_in_cart']))) {
            this.props.updateCart({
                show: true,
                cartCount: _get(nextProps.addCartResponseDetails, ['total_products_in_cart']),
                cartTotal: _get(nextProps.addCartResponseDetails, ['subtotal']),
                cartProducts: _get(nextProps.addCartResponseDetails, ['result']),
            });
        }
        if (!_isEmpty(nextProps.addToFavs) && this.props.favouriteType === 'REQUEST_ADD_TO_FAVORITES') {
            this.props.updateCart({ showFavsCart: true });
        }
        if (!_isEmpty(nextProps.addToWishlist) && this.props.wishlistType === 'REQUEST_SUBMIT_ADD_TO_WISHLIST') {
            this.props.updateCart({ showWishlistCart: true });
        }
    }
    render() {
        if (_get(this, 'props.isLoading')) {
            return (
                <div className="container">
                    <div className="col-md-3">
                        <OneColumLeft
                            salesRepUser={this.props.salesRepUser}
                            primeUser={this.props.primeUser}
                            rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                        />
                    </div>
                    <div>
                        <Loader />
                    </div>
                </div>
            );
        }
        if (this.state.redirectToListPage) {
            return <Redirect push to={{
                pathname: '/customer/account/tags',
            }} />;
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
                            <div className="tagDetailContainer">
                                <ErrorBoundary>
                                    <TagsDetailComponent
                                        tagName={this.state.tagName}
                                        removeTag={this.removeTag}
                                        addToCart={this.addToCart} />
                                </ErrorBoundary>
                                {this.state.productDetails && this.state.productDetails.map((thisData, index) => {
                                    return (
                                        <ErrorBoundary>
                                            <TagDetailsProductsComponenet
                                                index={index} key={index}
                                                {...this.state}
                                                thisData={thisData}
                                                viewType={this.state.viewType}
                                                dateObjectArray={this.state.dateObjectArray}
                                                totalAmount={this.state.totalAmount}
                                                dataToShow={this.state.dataToShow}
                                                showMaxQtyAlert={this.state.showMaxQtyAlert}
                                                productId={this.state.productId}
                                                apiToken={this.props.apiToken}
                                                showMoreDetail={this.state.showMoreDetail}
                                                deliveryData={this.state.displayData[index]}
                                                handleInuputChange={this.handleInuputChange}
                                                handleAddCartClick={this.handleAddCartClick}
                                                handleShowChangeStore={this.handleShowChangeStore}
                                                handleMoreDetailClick={this.handleMoreDetailClick}
                                                resetMoreDetails={this.resetMoreDetails}
                                                handleAddToWishlist={this.handleAddToWishlist}
                                                handleAddToFavorites={this.handleAddToFavorites}
                                                myfavalert={this.myfavalert}
                                                totalPriceToPay={this.state.totalPriceToPay}
                                                toggleMoreAvail={this.toggleMoreAvail}
                                                dispalyMoreAvails={this.state.dispalyMoreAvails}
                                                ProductSwatch={this.ProductSwatch}
                                                productDetails={this.state.productDetails}
                                                moreavaildata={this.state.displayMore[index]}
                                                handleMoreavailclick={this.handleMoreavailclick}
                                                disableCartBtn={this.state.disableCartBtn}
                                                showMore={this.state.showMore}
                                                // storeName={_get(this.props.loginData, [0, 'result', 'default_store_name'])}
                                                storeName={this.state.storeName}
                                            />
                                        </ErrorBoundary>
                                    );
                                })
                                }
                            </div>
                            <div style={{ clear: 'both' }}>
                                <button onClick={this.goBack}>Go Back</button>
                            </div>
                        </div>
                    </div>
                    <ErrorBoundary>
                        <ChangeStoreModal
                            storeList={_get(this.props.loginData, [0, 'result', 'store_list'], [])}
                            selectedStoreId={this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId}
                            showChangeStoreModal={this.state.showChangeStoreModal}
                            handleCloseModal={this.handleCloseModal}
                            handleMethodChange={this.handleMethodChange}
                        />
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    getTagDetails: data => dispatch(fetchProductTagDetails(data)),
    deleteTagDetails: data => dispatch(removeProductTagDetails(data)),
    updateCart: data => dispatch(updateCartData(data)),
    addCartData: data => dispatch(postAddToCartData(data)),
    addToCart: data => dispatch(postAddToCartData(data)),
    showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
    addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
    addToFavorites: data => dispatch(fetchAddToFavsData(data)),
});

const mapStateToProps = (state) => {
    const {
        tagsReducer, loginReducer, cartReducer, myFavouritesReducer, wishListReducer,
    } = state;

    const {
        apiToken,
        salesRepUser,
        currencyCode,
        storeId,
        loginData,
        pageNo,
        user,
        storeName,
        error: loginError,
        primeUser,
        userProfileData,
        cartCount,
    } = loginReducer || [];

    const {
        tagsDetailsData,
        deleteTags,
        isFetching: isLoading,
        error: tagsError,
    } = tagsReducer || [];

    const {
        addCartResponseDetails,
        type,
        error: cartError,
    } = cartReducer || [];

    const {
        addToFavs,
        type: favouriteType,
        error: favouriteError,
    } = myFavouritesReducer || [];

    const {
        addToWishlist,
        type: wishlistType,
        error: wishlistError,
    } = wishListReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(wishlistError) || _isError(wishlistError) || !_isEmpty(favouriteError) || _isError(favouriteError) || !_isEmpty(cartError) || _isError(cartError) || !_isEmpty(tagsError) || _isError(tagsError);

    return {
        tagsDetailsData,
        isLoading,
        apiToken,
        deleteTags,
        salesRepUser,
        addCartResponseDetails,
        type,
        currencyCode,
        storeId,
        loginData,
        pageNo,
        user,
        storeName,
        addToFavs,
        addToWishlist,
        favouriteType,
        wishlistType,
        error,
        primeUser,
        userProfileData,
        cartCount,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(TagsDetailContainer));
