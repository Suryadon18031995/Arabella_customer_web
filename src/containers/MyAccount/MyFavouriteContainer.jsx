import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import InfiniteScroll from 'react-infinite-scroll-component';
import _find from 'lodash/find';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import Redirect from 'react-router/Redirect';
import MyFavouritesComponent from '../../components/MyAccount/MyFavouritesComponent.jsx';
import { receiveShowLoginModalData, updateCartData, setStoreId, flushCartData, setCartId } from '../../actions/login';
import { fetchMyFavouritesinfo, fetchUpdatedMyfavouriteinfo } from '../../actions/myfavourites';

import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import { postAddToCartData, clearCartData, flushCartViewData } from '../../actions/cart';
import { mapAddToCartApiData } from '../../utils/commonMapper';
import { fetchAddToWishlistData } from '../../actions/wishList';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

import lazyLoader from '../../assets/images/lazy-loader.gif';

class MyFavouriteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            unitQty: undefined,
            totalAmount: undefined,
            showMaxQtyAlert: false,
            productId: undefined,
            listData: {},
            productDetails: [],
            shippingMethodsArrData: [],
            deliveryDetails: [],
            displayData: [],
            availId: undefined,
            totalProductCount: undefined,
            showAscendSort: true,
            color: undefined,
            totalPriceToPay: '',
            disableCartBtn: 'disableBtn',
            filtersEnabled: false,
            searchStartDate: undefined,
            searchEndDate: undefined,
            showChangeStoreModal: false,
            showMoreDetail: {},
            dateObjectArray: [],
            viewType: 'list',
            filters: {},
            loginFlag: !_isEmpty(this.props.apiToken),
            sortValue: 'name',
            selectedStoreId: undefined,
            categoryFilterData: [],
            categoryFilterDataTemp: [],
            go: false,
            dispalyMoreAvails: false,
            showMoreavail: false,
            displayMore: [],
            selectedStoreName: undefined,
            showMore: false,

        };
    }

    componentDidMount() {
        document.title = 'My Favorite';
        this.props.getMyFavouritesData({
            apiToken: this.props.apiToken,
            currencyCode: this.props.currencyCode,
            storeId: this.props.storeId,
            pageNo: 1,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'MyFavouritesInfo'))) {
            const productDetails = _get(nextProps, 'MyFavouritesInfo.result');
            const detailsTemp = [];
            const deliveryDataTemp = [];
            const displayDataTemp = [];
            const displayMoreTemp = [];// today
            let listDataTemp = {};
            const datesArrayTemp = [];
            let dataToShow = {};
            const datesArr = {};
            const dataTempAvail = _get(productDetails, 'delivery[0]');
            const dispalyMoreAvails = productDetails && !_isEmpty(productDetails.more_avail);
            if (dataTempAvail) {
                const avaiId = _get(dataTempAvail, 'avail_id');
                dataToShow = productDetails.info[avaiId];
                dataToShow = { ...dataTempAvail, ...dataToShow };
                _filter(productDetails.delivery, ['avail_id', avaiId]).forEach((o) => {
                    datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
                });
            }


            if (productDetails && !_isEmpty(productDetails.more_avail)) {
                Object.keys(productDetails.more_avail).forEach((avaiId) => {
                    const minPrice = _get(_minBy(productDetails.more_avail[avaiId], 'total_price_currency'), 'total_price_format');
                    const maxPrice = _get(_maxBy(productDetails.more_avail[avaiId], 'total_price_currency'), 'total_price_format');
                    let approxPrice;
                    if (minPrice === maxPrice) {
                        approxPrice = minPrice;
                    } else {
                        approxPrice = `${minPrice} - ${maxPrice}`;
                    }
                    productDetails.info[avaiId].approxPrice = approxPrice;
                });
            }
            let count = 0;
            if (this.state.pageNo === 1) {
                listDataTemp = _get(nextProps.MyFavouritesInfo, 'result');
                count = _get(nextProps.MyFavouritesInfo, 'product_count');
            } else {
                listDataTemp = Object.assign(
                    {},
                    this.state.listData,
                    _get(nextProps.MyFavouritesInfo, 'result'),
                );
                count = _get(nextProps.MyFavouritesInfo, 'product_count');
            }
            listDataTemp &&
                Object.entries(listDataTemp).map(([key, val]) => {
                    (!_isEmpty(val.delivery) || !_isEmpty(val.more_avail)) && detailsTemp.push(val.info);
                    val.delivery ? deliveryDataTemp.push(val.delivery) : '';
                    // displayDataTemp.push(val.delivery);
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
                totalProductCount: count,
                productDetails: detailsTemp,
                deliveryDetails: deliveryDataTemp,
                displayData: displayDataTemp,
                displayMore: displayMoreTemp,//today
                filtersEnabled: false,
                dateObjectArray: datesArrayTemp,
                dispalyMoreAvails,
                dataToShow,
                datesArr,
            });
        }

        // if (!_isEmpty(_get(nextProps, 'MyFavouritesInfo'))) {
        //     this.setState({
        //         result: _get(nextProps, 'MyFavouritesInfo'),
        //     });
        // }
        if (!_isEmpty(_get(nextProps, 'removeMyfavouriteInfo'))) {
            if (_get(nextProps.removeMyfavouriteInfo, 'code') === 1) {
                this.props.getMyFavouritesData({
                    apiToken: this.props.apiToken,
                    currencyCode: this.props.currencyCode,
                    storeId: this.props.storeId,
                    pageNo: 1,
                });
            }
        }
        if (!_isEmpty(nextProps.addCartResponseDetails) && (this.props.type === 'REQUEST_ADD_TO_CART') && (this.props.cartCount !== _get(nextProps.addCartResponseDetails, ['total_products_in_cart']))) {
            this.props.updateCart({
                show: true,
                cartCount: _get(nextProps.addCartResponseDetails, ['total_products_in_cart']),
                cartTotal: _get(nextProps.addCartResponseDetails, ['subtotal']),
                cartProducts: _get(nextProps.addCartResponseDetails, ['result']),
            });
            this.props.setCartId(_get(nextProps.addCartResponseDetails, 'result') && _get(nextProps.addCartResponseDetails, ['result', [0], 'cart_id']));
        }
        if (!_isEmpty(nextProps.addToWishlist) && this.props.wishlistType === 'REQUEST_SUBMIT_ADD_TO_WISHLIST') {
            this.props.updateCart({ showWishlistCart: true });
        }
    }

    handleScrollInc = () => {
        const pNo = this.state.pageNo;
        this.setState(
            {
                pageNo: pNo + 1,
            },
            () => {
                (this.state.productDetails.length < this.state.totalProductCount) && this.props.getMyFavouritesData({
                    currencyCode: this.props.currencyCode,
                    apiToken: this.props.apiToken,
                    storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                    sort: this.state.sortValue,
                    pageNo: this.state.pageNo,
                    zipcode: _get(this.props, 'zipcode'),
                });
            },
        );
    };

    addToCart = () => {
        const reqBody = mapAddToCartApiData({
            ...this.state.dataToShow,
            pid: this.state.productId,
            totalAmount: this.state.totalAmount,
            unitQty: this.state.unitQty,
            apiToken: _get(this.props, 'apiToken'),
            customerStoreId: _get(this.props.loginData, '[0].result.customer_id', '3440'),
            loc_ID: 390,
            user: 'Anuraag Gadde',
        });
        this.props.addCartData(reqBody);
    }
    handleMoreDetailClick = (productId) => {
        this.setState({
            showMoreDetail: {
                ...this.state.showMoreDetail,
                [productId]: !_get(this.state.showMoreDetail, productId, false)
            },
            // productId,
            showMore: {
                // ...this.state.showMore,
                // [productId]: !_get(this.state.showMore, productId, false)
            },
        });
    };
    handleMoreavailclick = (productId) => {
        this.setState({
            showMore: {
                ...this.state.showMore,
                [productId]: !_get(this.state.showMore, productId, false)
            },
            dispalyMoreAvails: !this.state.dispalyMoreAvails,
            // productId,
            showMoreDetail: {},
        });
    };
    toggleMoreAvail = () => {
        this.setState({
            dispalyMoreAvails: !this.state.dispalyMoreAvails,
            showMore: !this.state.showMore,
        });
    }


    handleRemoveMyfavourite = (pid) => {
        this.props.requestRemoveMyfavouriteinfo({ apiToken: this.props.apiToken, productId: pid });
    }
    handleMethodChange = (event) => {
        if (event.target.name === 'store') {
            const selectedStoreName = _get(_find(_get(this.props.loginData, [0, 'result', 'store_list'], []), { 'store_id': event.target.value }), 'store_name');
            this.setState({
                showChangeStoreModal: false,
                selectedStoreId: event.target.value,
                selectedStoreName,
            });
            this.props.flushCartData();
            this.props.flushCartViewData();
            this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
            this.props.setStoreId({
                storeId: event.target.value,
                storeName: selectedStoreName,
            });
            this.props.getMyFavouritesData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: event.target.value,
                sort: this.state.sortValue,
                pageNo: 1,
            });
        } else {
            this.props.getMyFavouritesData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                sort: this.state.sortValue,
                pageNo: 1,
                method: event.target.value,
            });
            this.setState({
                sortValue: event.target.value,
            });
        }
    };

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

    myfavalert = () => {
        alert('Product is already added in My favorites.');
    }
    handleAddToWishlist = (productId) => {
        this.props.addToWhishlist({
            apiToken: this.props.apiToken,
            productId,
        });
    }
    resetMoreDetails = (event) => {
        const dataTempAvail = _filter(this.state.productDetails.delivery, ['delivery_date', event])[0];
        this.setState({
            dataToShow: { ...this.state.dataToShow, ...dataTempAvail, newKey: event },
        });
    }

    // resetMoreDetails = (date, index) => {
    //     const dataTempAvail = _filter(this.state.deliveryDetails[index], ['delivery_date', date])[0];
    //     this.setState({
    //       displayData: { ...this.state.displayData, [index]: dataTempAvail },
    //     });
    //   }

    ProductSwatch = (event, index) => {
        const datesArr = {};
        const dataTempAvail = _get(this.state.displayMore, [index, event]);
        dataTempAvail && dataTempAvail.forEach((o) => {
            datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
        });
        this.setState({
            // dataToShow: { ...this.state.productDetails.info[event], ...dataTempAvail[0], newKey: event },
            datesArr,
            displayData: { ...this.state.displayData, [index]: dataTempAvail[0] },
        });
    }
    handleAddCartClick = (prodData, deliData) => {
        const reqBody = mapAddToCartApiData({
            ...this.state,
            ...prodData,
            ...deliData,
            user: this.props.user,
            apiToken: this.props.apiToken,
            customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        });
        this.props.addToCart(reqBody);
    };

    handleInuputChange = (event, prodData, deliData) => {
        let totalTemp = 0;
        let totalPriceToPay;
        let flag = false;
        let disableCartBtn = 'disableBtn';
        if (event.target.value >= _get(deliData, 'qty_per_box')) {
            totalTemp = event.target.value * _get(deliData, 'total_price_currency');
            const reminder = event.target.value % _get(deliData, 'qty_per_box');
            totalPriceToPay = reminder ? '' : `Total amount payable $${totalTemp.toFixed(2)}`;
            disableCartBtn = reminder ? 'disableBtn' : '';
        }
        if (event.target.value >= _get(deliData, 'floorallowed')) {
            flag = true;
            totalTemp = 0;
        }
        this.setState({
            unitQty: event.target.value,
            totalAmount: totalTemp,
            showMaxQtyAlert: flag,
            productId: prodData.pid,
            totalPriceToPay,
            disableCartBtn,
        });
    };


    render() {
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        return (
            <div className="container">
                <div className='my-favorite-page'>
                    <div className='page-title'>
                        <h1>My Favorite</h1>
                    </div>
                </div>
                <div className='container-block'>
                    <ErrorBoundary>
                        <InfiniteScroll
                            scrollThreshold={0.3}
                            dataLength={this.state.productDetails.length}
                            next={this.handleScrollInc}
                            hasMore={
                                this.state.productDetails.length < this.state.totalProductCount
                            }
                            loader={this.state.pageNo !== 1 &&
                                <span className="infinite-loader-class">
                                    <img
                                        src={lazyLoader}
                                        alt="lazy-loader"
                                    />
                                </span>
                            }>
                            {
                                this.state.go && this.state.productDetails && this.state.productDetails.map((thisData, index) => {
                                    return (
                                        <div key={index}>
                                            <MyFavouritesComponent index={index} key={index}
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
                                                storeName={this.props.storeName}
                                                handleRemoveMyfavourite={this.handleRemoveMyfavourite}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </InfiniteScroll>
                    </ErrorBoundary>
                    <div className='my-favorite-page'>
                        <div className="display-item-count">
                            Items{' '}
                            <span id="up">
                                {this.state.productDetails && this.state.productDetails.length}
                            </span>{' '}
                            of <span id="pcount">{this.state.totalProductCount ? this.state.totalProductCount : 0}</span> total
                        </div>
                    </div>
                    <ChangeStoreModal
                        storeList={_get(this.props.loginData, [0, 'result', 'store_list'], [])}
                        selectedStoreId={this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId}
                        showChangeStoreModal={this.state.showChangeStoreModal}
                        handleCloseModal={this.handleCloseModal}
                        handleMethodChange={this.handleMethodChange}

                    />
                </div></div>);
    }
}


const mapDispatchToProps = dispatch => ({
    getMyFavouritesData: data => dispatch(fetchMyFavouritesinfo(data)),
    addToCart: data => dispatch(postAddToCartData(data)),
    addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
    showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
    updateCart: data => dispatch(updateCartData(data)),
    requestRemoveMyfavouriteinfo: (data, type) => dispatch(fetchUpdatedMyfavouriteinfo(data, type)),
    setStoreId: data => dispatch(setStoreId(data)),
    clearCart: data => dispatch(clearCartData(data)),
    flushCartData: () => dispatch(flushCartData()),
    flushCartViewData: () => dispatch(flushCartViewData()),
    setCartId: data => dispatch(setCartId(data)),
});

const mapStateToProps = (state) => {
    const {
        myFavouritesReducer,
        loginReducer,
        wishListReducer,
        cartReducer,
    } = state;

    const {
        MyFavouritesInfo,
        isFetching: isLoading,
        error: favouriteError,
    } = myFavouritesReducer || [];

    const {
        apiToken,
        cartId,
        currencyCode,
        storeId,
        loginData,
        pageNo,
        user,
        storeName,
        error: loginError,
        cartCount,
    } = loginReducer || [];

    const {
        addCartResponseDetails,
        type,
        error: cartError,
    } = cartReducer || [];

    const {
        addToWishlist,
        type: wishlistType,
        error: wishlistError,
    } = wishListReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(wishlistError) || _isError(wishlistError) || !_isEmpty(cartError) || _isError(cartError) || !_isEmpty(favouriteError) || _isError(favouriteError);

    return {
        MyFavouritesInfo,
        cartId,
        isLoading,
        apiToken,
        currencyCode,
        storeId,
        pageNo,
        loginData,
        user,
        storeName,
        addCartResponseDetails,
        type,
        addToWishlist,
        wishlistType,
        error,
        cartCount,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(MyFavouriteContainer));
