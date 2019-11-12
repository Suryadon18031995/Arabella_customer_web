import React from 'react';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import moment from 'moment';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import _values from 'lodash/values';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
// import _minBy from 'lodash/minBy';
// import _maxBy from 'lodash/maxBy';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListingComponent from '../../components/BKMComponent/ListingComponent.jsx';
import FilterComponent from '../../components/BKMComponent/FilterComponent.jsx';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import {
    fetchBKMListingData,
    fetchFilterCategoryData,
    fetchCategoriesfinalSearchResult,
} from '../../actions/bkm_listing';
// import Loader from '../../components/Loader/Loader.jsx';
// import Modal from 'react-bootstrap/lib/Modal';
import { postAddToCartData, flushCartViewData, clearCartData } from '../../actions/cart';
import {
    mapAddToCartApiData,
    mapProductSearchData,
} from '../../utils/commonMapper';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { fetchAddToWishlistData } from '../../actions/wishList';
import { receiveShowLoginModalData, updateCartData, setStoreId, flushCartData, setCartId } from '../../actions/login';
import { compareAndSortDates } from '../../helpers/commonUtil';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import { fetchProductReviews } from '../../actions/products';
import { fetchProductVendorReviews } from '../../actions/vendorReviews';
import lazyLoader from '../../assets/images/lazy-loader.gif';

class BestsellerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleBkmClick: false,
            unitQty: {},
            totalAmount: {},
            showMaxQtyAlert: false,
            productId: undefined,
            url: undefined,
            listData: {},
            prodOrder: [],
            productDetails: [],
            shippingMethodsArrData: [],
            deliveryDetails: [],
            displayData: [],
            availId: undefined,
            pageNo: 1,
            totalProductCount: undefined,
            showAscendSort: true,
            filtersEnabled: false,
            enableClearAll: false,
            redirectToDetailsPage: false,
            searchStartDate: undefined,
            searchEndDate: undefined,
            showChangeStoreModal: false,
            showMoreDetail: {},
            dateObjectArray: [],
            viewType: 'list',
            filters: {},
            loginFlag: !_isEmpty(this.props.apiToken),
            sortValue: 'index',
            selectedStoreId: undefined,
            selectedStoreName: undefined,
            categoryFilterData: [],
            categoryFilterDataTemp: [],
            colorsFilterData: [],
            colorsFilterDataTemp: [],
            farmsFilterData: [],
            farmsFilterDataTemp: [],
            stateCityFilterData: [],
            stateCityFilterDataTemp: [],
            boxTypeFilterData: [],
            boxTypeFilterDataTemp: [],
            varietyFilterData: [],
            varietyFilterDataTemp: [],
            uomFilterData: [],
            uomFilterDataTemp: [],
            lengthFilterData: [],
            lengthFilterDataTemp: [],
            gradeFilterData: [],
            gradeFilterDataTemp: [],
            blinkText: {},
            applyFilter: false,
            catDescription: '',
            category: [],
            color: [],
            farm: [],
            location: [],
            boxType: [],
            variety: [],
            uom: [],
            length: [],
            grade: [],
            methodUpdated: false,
            method: '?',
            passedSearchedData: {},
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: '/wholesale-flowers.html',
                    name: 'Shop Flowers',
                },
                {
                    link: undefined,
                    name: 'SEARCH RESULT FOR ""',
                },
            ],
        };
    }

    UNSAFE_componentWillMount() {
        if (_get(this.props.location, 'state.searchText')) {
            this.setState({
                passedSearchedData: _get(this.props.location, 'state'),
                breadCrumbsList: [
                    {
                        link: '/',
                        name: 'home',
                    },
                    {
                        link: '/wholesale-flowers.html',
                        name: 'Shop Flowers',
                    },
                    {
                        link: undefined,
                        name: `SEARCH RESULT FOR "${_get(this.props.location, 'state.searchText')}"`,
                    },
                ],
            }, () => {
                this.props.getFiltersData({
                    currencyCode: this.props.currencyCode,
                    apiToken: this.props.apiToken,
                    storeId: this.props.storeId,
                    sort: this.state.sortValue,
                    pageNo: 1,
                    q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
                });
            });
        }
    }

    ratingsHover = (productId) => {
        this.setState({ productReviewData: [] });
        this.props.getMyProductReviews({
            productId,
        });
    }

    vendorRatingsHover = (vendorId) => {
        this.setState({ productVendorReviews: [] });
        this.props.getProductReviews({ vendorId });
    }

    componentDidMount() {
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.props.storeId,
            pageType: 'bseller',
            sort: this.state.sortValue,
            pageNo: 1,
            zipcode: _get(this.props, 'zipcode'),
        }); */
        if (this.props.searchText || this.state.passedSearchedData.searchText) {
            this.props.getHeaderSearchResult({
                q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
                storeId: this.props.storeId,
                currencyCode: this.props.currencyCode,
                pageNo: 1,
                apiToken: this.props.apiToken,
                zipCode: this.props.zipcode,
            }, this.state.passedSearchedData.searchText);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.apiToken !== this.props.apiToken) {
            this.props.getFiltersData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: this.props.storeId,
                q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
            });
            this.setState({
                filtersEnabled: false,
                enableClearAll: false,
                category: [],
                color: [],
                farm: [],
                location: [],
                boxType: [],
                uom: [],
                length: [],
                grade: [],
                searchStartDate: undefined,
                searchEndDate: undefined,
                totalProductCount: 0,
                productDetails: [],
                listData: [],
                prodOrder: [],
                deliveryDetails: [],
                displayData: [],
                dateObjectArray: [],
                shippingMethodsArrData: [],
                filters: {},
                categoryFilterData: [],
                categoryFilterDataTemp: [],
                colorsFilterData: [],
                colorsFilterDataTemp: [],
                farmsFilterData: [],
                farmsFilterDataTemp: [],
                stateCityFilterData: [],
                stateCityFilterDataTemp: [],
                boxTypeFilterData: [],
                boxTypeFilterDataTemp: [],
                varietyFilterData: [],
                varietyFilterDataTemp: [],
                uomFilterData: [],
                uomFilterDataTemp: [],
                lengthFilterData: [],
                lengthFilterDataTemp: [],
                gradeFilterData: [],
                gradeFilterDataTemp: [],
            });
            // if (this.props.searchText || this.state.passedSearchedData.searchText) {
            //     this.props.getHeaderSearchResult({
            //         q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
            //         storeId: this.props.storeId,
            //         currencyCode: this.props.currencyCode,
            //         pageNo: 1,
            //         apiToken: this.props.apiToken,
            //         zipCode: this.props.zipcode,
            //     }, this.state.passedSearchedData.searchText);
            //     }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(nextProps.filtersData)) {
            const shippingMethodsData = [];
            const filterMethodDataTemp = _get(nextProps.filtersData, 'method');
            filterMethodDataTemp &&
                Object.entries(filterMethodDataTemp).map(([key, value]) =>
                    shippingMethodsData.push(value));

            const categoryFilterData = _values(_get(nextProps.filtersData, 'category')) &&
                _values(_get(nextProps.filtersData, 'category')).map(o =>
                    ({ key: o.key.toString(), count: o.count, label: o.label[o.key] }));

            const colorsFilterData = _get(nextProps.filtersData, 'color') && Object.values(_get(nextProps.filtersData, 'color'));

            const farmsFilterData = _get(nextProps.filtersData, 'udropship_vendor') && Object.values(_get(nextProps.filtersData, 'udropship_vendor'));

            const stateCityFilterData = _get(nextProps.filtersData, 'udropship_vendor_loc') && Object.values(_get(nextProps.filtersData, 'udropship_vendor_loc'));

            const boxTypeFilterData = _get(nextProps.filtersData, 'box_type') && Object.values(_get(nextProps.filtersData, 'box_type'));

            const varietyFilterData = _get(nextProps.filtersData, 'variety') && Object.values(_get(nextProps.filtersData, 'variety'));

            const uomFilterData = _get(nextProps.filtersData, 'product_um') && Object.values(_get(nextProps.filtersData, 'product_um'));

            const lengthFilterData = _get(nextProps.filtersData, 'length') && Object.values(_get(nextProps.filtersData, 'length'));

            const gradeFilterData = _get(nextProps.filtersData, 'grade') && Object.values(_get(nextProps.filtersData, 'grade'));

            this.setState({
                shippingMethodsArrData: shippingMethodsData,
                filtersEnabled: false,
                filters: nextProps.filtersData,
                categoryFilterData,
                categoryFilterDataTemp: categoryFilterData,
                colorsFilterData,
                colorsFilterDataTemp: colorsFilterData,
                farmsFilterData,
                farmsFilterDataTemp: farmsFilterData,
                stateCityFilterData,
                stateCityFilterDataTemp: stateCityFilterData,
                boxTypeFilterData,
                boxTypeFilterDataTemp: boxTypeFilterData,
                varietyFilterData,
                varietyFilterDataTemp: varietyFilterData,
                uomFilterData,
                uomFilterDataTemp: uomFilterData,
                lengthFilterData,
                lengthFilterDataTemp: lengthFilterData,
                gradeFilterData,
                gradeFilterDataTemp: gradeFilterData,
            });
        }
        /* if (!_isEmpty(nextProps.bkmSearchData)) {
            const detailsTemp = [];
            const deliveryDataTemp = [];
            const displayDataTemp = [];
            let listDataTemp = {};
            const datesArrayTemp = [];
            let count = 0;
            if (this.state.pageNo === 1 || this.state.filtersEnabled) {
                listDataTemp = _get(nextProps.bkmSearchData, 'products.result');
                count = _get(nextProps.bkmSearchData, 'products.product_count');
            } else {
                listDataTemp = Object.assign(
                    {},
                    this.state.listData,
                    _get(nextProps.bkmSearchData, 'products.result')
                );
                count = _get(nextProps.bkmSearchData, 'products.product_count');
            }
            listDataTemp &&
                Object.entries(listDataTemp).map(([key, val]) => {
                    detailsTemp.push(val.info);
                    val.delivery ? deliveryDataTemp.push(val.delivery) : '';
                    !_isEmpty(val.delivery) && displayDataTemp.push(val.delivery[0]);
                    const datesArr = {};
                    _filter(val.delivery).forEach((o) => {
                        datesArr[_get(o, 'pickup_date')] = _get(o, 'total_price_format');
                    });
                    datesArrayTemp.push(datesArr);
                });

            this.setState({
                listData: listDataTemp,
                totalProductCount: count,
                productDetails: detailsTemp,
                deliveryDetails: deliveryDataTemp,
                displayData: displayDataTemp,
                filtersEnabled: false,
                dateObjectArray: datesArrayTemp,
            });
        } */
        if (!_isEmpty(nextProps.finalSearchData) && (this.state.prodOrder.length === 0 || (JSON.stringify(this.state.prodOrder) !== JSON.stringify(_get(nextProps.finalSearchData, '0.product_ids'))))) {
            const detailsTemp = [];
            const deliveryDataTemp = [];
            const displayDataTemp = [];
            let listDataTemp = [];
            const datesArrayTemp = [];
            let count = 0;
            let prodOrder = [];
            if (this.state.pageNo === 1 || this.state.filtersEnabled) {
                const temp = _get(nextProps.finalSearchData, '0.result');
                count = _get(nextProps.finalSearchData, '0.product_count');
                prodOrder = _get(nextProps.finalSearchData, '0.product_ids');
                prodOrder && prodOrder.length && prodOrder.map((eachKey) => {
                    listDataTemp.push({ [eachKey]: temp[eachKey] });
                });
            } else {
                const temp = _get(nextProps.finalSearchData, '0.result');
                listDataTemp = [
                    ...this.state.listData,
                ];
                count = _get(nextProps.finalSearchData, '0.product_count');
                prodOrder = _get(nextProps.finalSearchData, '0.product_ids');
                prodOrder && prodOrder.length && prodOrder.map((eachKey) => {
                    listDataTemp.push({ [eachKey]: temp[eachKey] });
                });
            }

            /*  listDataTemp &&
                 Object.entries(listDataTemp).map(([key, val]) => {
                     orderData.push(key);
                     detailsTemp.push(val.info);
                     val.delivery ? deliveryDataTemp.push(val.delivery) : '';
                     !_isEmpty(val.delivery) && displayDataTemp.push(val.delivery[0]);
                     const datesArr = {};
                     _filter(val.delivery).forEach((o) => {
                         datesArr[_get(o, 'pickup_date')] = _get(o, 'total_price_format');
                     });
                     datesArrayTemp.push(datesArr);
                 }); */
            listDataTemp && listDataTemp.length &&
                listDataTemp.map((valTemp) => {
                    const val = Object.values(valTemp)[0];
                    detailsTemp.push(val.info);
                    val.delivery ? deliveryDataTemp.push(val.delivery) : '';
                    deliveryDataTemp && deliveryDataTemp.map((val1, key1) => {
                        val1.sort(compareAndSortDates);
                        deliveryDataTemp[key1] = val1;
                    });
                    // !_isEmpty(val.delivery) && displayDataTemp.push(val.delivery[0]);
                    if (!_isEmpty(val.delivery)) {
                        displayDataTemp.push(val.delivery[0]);
                    } else {
                        displayDataTemp.push([]);
                    }
                    const datesArr = {};
                    _filter(val.delivery).forEach((o) => {
                        datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
                    });
                    datesArrayTemp.push(datesArr);
                });
            this.setState({
                listData: listDataTemp,
                totalProductCount: count,
                productDetails: detailsTemp,
                deliveryDetails: deliveryDataTemp,
                displayData: displayDataTemp,
                filtersEnabled: false,
                dateObjectArray: datesArrayTemp,
                catDescription: _get(nextProps.finalSearchData, '0.cat_description'),
                prodOrder,
            });
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

        if (!_isEmpty(nextProps.productReviewData)) {
            this.setState({
                productReviewData: nextProps.productReviewData,
            });
        }

        if (!_isEmpty(_get(nextProps, 'productVendorReviews'))) {
            this.setState({
                productVendorReviews: _get(nextProps, 'productVendorReviews'),
            });
        }
    }

    handleScrollInc = () => {
        const pNo = this.state.pageNo;
        this.setState(
            {
                pageNo: pNo + 1,
            },
            () => {
                /* (this.state.productDetails.length < this.state.totalProductCount) && this.props.getBkmListSearchData({
                    currencyCode: this.props.currencyCode,
                    apiToken: this.props.apiToken,
                    storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                    pageType: 'bseller',
                    sort: this.state.sortValue,
                    pageNo: this.state.pageNo,
                    zipcode: _get(this.props, 'zipcode'),
                }); */
                (this.state.productDetails.length < this.state.totalProductCount) &&
                    this.props.getHeaderSearchResult({
                        q: this.state.passedSearchedData.searchText,
                        currencyCode: this.props.currencyCode,
                        apiToken: this.props.apiToken,
                        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                        sort: this.state.sortValue,
                        pageNo: this.state.pageNo,
                        zipCode: this.props.zipcode,
                        category: this.state.category ? this.state.category.join('_') : 0,
                        color: this.state.color ? this.state.color.join('_') : 0,
                        farm: this.state.farm ? this.state.farm.join('_') : 0,
                        location: this.state.location ? this.state.location.join('_') : 0,
                        boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
                        variety: this.state.variety ? this.state.variety.join('_') : 0,
                        uom: this.state.uom ? this.state.uom.join('_') : 0,
                        length: this.state.length ? this.state.length.join('_') : 0,
                        grade: this.state.grade ? this.state.grade.join('_') : 0,
                    }, this.state.passedSearchedData.searchText);
            },
        );
    };

    handleRedirectClick = () => {
        this.setState({
            handleBkmClick: true,
        });
    };

    handleMethodChange = (event) => {
        if (event.target.name === 'store') {
            const selectedStoreName = _get(_find(_get(this.props.loginData, [0, 'result', 'store_list'], []), { store_id: event.target.value }), 'store_name');
            this.setState({
                showChangeStoreModal: false,
                selectedStoreId: event.target.value,
                selectedStoreName,
                listData: [],
                prodOrder: [],
                totalProductCount: 0,
                productDetails: [],
                deliveryDetails: [],
                displayData: [],
                filtersEnabled: false,
                dateObjectArray: [],
                moreAvail: {},
                showMoreAvail: {},
                farmInfo: undefined,
                pageNo: 1,
                shippingMethodsArrData: [],
                filters: {},
                categoryFilterData: [],
                categoryFilterDataTemp: [],
                colorsFilterData: [],
                colorsFilterDataTemp: [],
                farmsFilterData: [],
                farmsFilterDataTemp: [],
                stateCityFilterData: [],
                stateCityFilterDataTemp: [],
                boxTypeFilterData: [],
                boxTypeFilterDataTemp: [],
                varietyFilterData: [],
                varietyFilterDataTemp: [],
                uomFilterData: [],
                uomFilterDataTemp: [],
                lengthFilterData: [],
                lengthFilterDataTemp: [],
                gradeFilterData: [],
                gradeFilterDataTemp: [],
            });
            this.props.setStoreId({
                storeId: event.target.value,
                storeName: selectedStoreName,
            });
            this.props.flushCartData();
            this.props.flushCartViewData();
            this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
            /* this.props.getBkmListSearchData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: event.target.value,
                pageType: 'bseller',
                sort: this.state.sortValue,
                pageNo: 1,
            }); */
            this.props.getHeaderSearchResult({
                q: this.state.passedSearchedData.searchText,
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: event.target.value,
                sort: this.state.sortValue,
                pageNo: 1,
                // zipCode: this.props.zipcode,
            }, this.state.passedSearchedData.searchText);
            this.props.getFiltersData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: event.target.value,
                q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
            });
        } else {
            /* this.props.getBkmListSearchData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                pageType: 'bseller',
                sort: this.state.sortValue,
                pageNo: 1,
                method: event.target.value,
            }); */
            this.props.getHeaderSearchResult({
                q: this.state.passedSearchedData.searchText,
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                sort: this.state.sortValue,
                pageNo: 1,
                // zipCode: this.props.zipcode,
                method: event.target.value,
                category: this.state.category ? this.state.category.join('_') : 0,
                color: this.state.color ? this.state.color.join('_') : 0,
                farm: this.state.farm ? this.state.farm.join('_') : 0,
                location: this.state.location ? this.state.location.join('_') : 0,
                boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
                variety: this.state.variety ? this.state.variety.join('_') : 0,
                uom: this.state.uom ? this.state.uom.join('_') : 0,
                length: this.state.length ? this.state.length.join('_') : 0,
                grade: this.state.grade ? this.state.grade.join('_') : 0,
            }, this.state.passedSearchedData.searchText);
            // @ todo move to common mapper
            this.props.getFiltersData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                method: event.target.value === '?' ? '' : event.target.value,
                category: this.state.category ? this.state.category.join('_') : 0,
                color: this.state.color ? this.state.color.join('_') : 0,
                farm: this.state.farm ? this.state.farm.join('_') : 0,
                location: this.state.location ? this.state.location.join('_') : 0,
                boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
                variety: this.state.variety ? this.state.variety.join('_') : 0,
                uom: this.state.uom ? this.state.uom.join('_') : 0,
                length: this.state.length ? this.state.length.join('_') : 0,
                grade: this.state.grade ? this.state.grade.join('_') : 0,
                q: this.state.passedSearchedData.searchText,
            });
            this.setState({
                // sortValue: event.target.value,
                listData: [],
                prodOrder: [],
                totalProductCount: 0,
                productDetails: [],
                deliveryDetails: [],
                displayData: [],
                dateObjectArray: [],
                methodUpdated: true,
                enableClearAll: true,
                pageNo: 1,
                method: event.target.value,
                shippingMethodsArrData: [],
                filters: {},
                categoryFilterData: [],
                categoryFilterDataTemp: [],
                colorsFilterData: [],
                colorsFilterDataTemp: [],
                farmsFilterData: [],
                farmsFilterDataTemp: [],
                stateCityFilterData: [],
                stateCityFilterDataTemp: [],
                boxTypeFilterData: [],
                boxTypeFilterDataTemp: [],
                varietyFilterData: [],
                varietyFilterDataTemp: [],
                uomFilterData: [],
                uomFilterDataTemp: [],
                lengthFilterData: [],
                lengthFilterDataTemp: [],
                gradeFilterData: [],
                gradeFilterDataTemp: [],
            });
        }
    };

    handleInuputChange = (event, prodData, deliData) => {
        let totalTemp = 0;
        let flag = false;
        const { blinkText, totalAmount } = this.state;
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
            unitQty: { ...this.state.unitQty, [prodData.pid]: Number(event.target.value) ? Number(event.target.value) : '' },
            totalAmount,
            showMaxQtyAlert: flag,
            productId: prodData.pid,
            blinkText,
        });
    };

    handleAddCartClick = (prodData, deliData) => {
        if (this.props.apiToken) {
            const reqBody = mapAddToCartApiData({
                ...this.state,
                ...prodData,
                ...deliData,
                user: this.props.user,
                unitQty: this.state.unitQty[prodData.pid],
                totalAmount: this.state.totalAmount[prodData.pid],
                apiToken: this.props.apiToken,
                customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            });
            this.props.addToCart(reqBody);
            this.setState({
                unitQty: { ...this.state.unitQty, [prodData.pid]: 0 },
                totalAmount: { ...this.state.totalAmount, [prodData.pid]: 0 },
            });
        } else {
            this.props.showLoginModal({ show: true });
        }
    };

    sortingOrderClick = () => {
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageType: 'bseller',
            pageNo: 1,
            sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
        }); */
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageNo: 1,
            // zipCode: this.props.zipcode,
            sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
        }, this.state.passedSearchedData.searchText);
        this.setState({
            showAscendSort: !this.state.showAscendSort,
        });

    };

    handleSortChange = (event) => {
        this.setState({
            sortValue: event.target.value,
            totalProductCount: 0,
            productDetails: [],
        });
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            pageType: 'bseller',
            sort: event.target.value,
            pageNo: 1,
        }); */
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: event.target.value,
            pageNo: 1,
            // zipCode: this.props.zipcode,
            // sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
        }, this.state.passedSearchedData.searchText);
    };

    handleFilterCheckBoxChange = (event) => {
        const arr = _get(this.state, event.target.name, []);
        if (event.target.checked) {
            arr.push(event.target.value);
        } else {
            _pull(arr, event.target.value);
        }
        this.setState({
            applyFilter: true,
            [event.target.name]: [...arr],
        });
    };

    handleCategorySearch = (event) => {
        const searchValue = event.target.value;
        const searchType = event.target.name;
        if (!_isEmpty(event.target.value)) {
            switch (searchType) {
                case 'category': {
                    const categoryFilterData = this.state.categoryFilterDataTemp.filter(obj =>
                        obj.label.toLowerCase().match(searchValue.toLowerCase()));
                    this.setState({
                        categoryFilterData,
                    });
                    break;
                }
                case 'color':
                    {
                        const colorsFilterData = this.state.colorsFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            colorsFilterData,
                        });
                        break;
                    }
                case 'farm':
                    {
                        const farmsFilterData = this.state.farmsFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            farmsFilterData,
                        });
                        break;
                    }
                case 'location':
                    {
                        const stateCityFilterData = this.state.stateCityFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            stateCityFilterData,
                        });
                        break;
                    }
                case 'boxType':
                    {
                        const boxTypeFilterData = this.state.boxTypeFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            boxTypeFilterData,
                        });
                        break;
                    }
                case 'variety':
                    {
                        const varietyFilterData = this.state.varietyFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            varietyFilterData,
                        });
                        break;
                    }
                case 'uom':
                    {
                        const uomFilterData = this.state.uomFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            uomFilterData,
                        });
                        break;
                    }
                case 'length':
                    {
                        const lengthFilterData = this.state.lengthFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            lengthFilterData,
                        });
                        break;
                    }
                case 'grade':
                    {
                        const gradeFilterData = this.state.gradeFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            gradeFilterData,
                        });
                        break;
                    }
                default:
            }
        }
    }

    handleCustomFilter = () => {
        // what we are dooing here ?? .
        // const reqBody = mapProductSearchData({
        //     ...this.state,
        //     currencyCode: this.props.currencyCode,
        //     apiToken: this.props.apiToken,
        //     storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        //     pageNo: 1, // pageNo: this.state.enableClearAll ? this.state.pageNo : 1,
        //   });
        this.setState({
            filtersEnabled: true,
            enableClearAll: true,
            applyFilter: false,
            pageNo: 1, // this.state.enableClearAll ? this.state.pageNo : 1,
            tabKey: 'info',
            farmInfo: undefined,
            totalProductCount: 0,
            productDetails: [],
            listData: [],
            prodOrder: [],
            deliveryDetails: [],
            displayData: [],
            dateObjectArray: [],
            shippingMethodsArrData: [],
            filters: {},
            categoryFilterData: [],
            categoryFilterDataTemp: [],
            colorsFilterData: [],
            colorsFilterDataTemp: [],
            farmsFilterData: [],
            farmsFilterDataTemp: [],
            stateCityFilterData: [],
            stateCityFilterDataTemp: [],
            boxTypeFilterData: [],
            boxTypeFilterDataTemp: [],
            varietyFilterData: [],
            varietyFilterDataTemp: [],
            uomFilterData: [],
            uomFilterDataTemp: [],
            lengthFilterData: [],
            lengthFilterDataTemp: [],
            gradeFilterData: [],
            gradeFilterDataTemp: [],
        });
        // this.props.getBkmListSearchData(reqBody);
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageNo: 1,
            // zipCode: this.props.zipcode,
            sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
            category: this.state.category ? this.state.category.join('_') : 0,
            color: this.state.color ? this.state.color.join('_') : 0,
            farm: this.state.farm ? this.state.farm.join('_') : 0,
            location: this.state.location ? this.state.location.join('_') : 0,
            boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
            variety: this.state.variety ? this.state.variety.join('_') : 0,
            uom: this.state.uom ? this.state.uom.join('_') : 0,
            length: this.state.length ? this.state.length.join('_') : 0,
            grade: this.state.grade ? this.state.grade.join('_') : 0,
            method: this.state.method === '?' ? '' : this.state.method,
        }, this.state.passedSearchedData.searchText);
        this.props.getFiltersData({
            q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            category: this.state.category ? this.state.category.join('_') : 0,
            color: this.state.color ? this.state.color.join('_') : 0,
            farm: this.state.farm ? this.state.farm.join('_') : 0,
            location: this.state.location ? this.state.location.join('_') : 0,
            boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
            variety: this.state.variety ? this.state.variety.join('_') : 0,
            uom: this.state.uom ? this.state.uom.join('_') : 0,
            length: this.state.length ? this.state.length.join('_') : 0,
            grade: this.state.grade ? this.state.grade.join('_') : 0,
            method: this.state.method === '?' ? '' : this.state.method,
        });
    };

    handleClearAll = () => {
        this.setState({
            filtersEnabled: false,
            enableClearAll: false,
            category: [],
            color: [],
            farm: [],
            location: [],
            boxType: [],
            uom: [],
            length: [],
            grade: [],
            searchStartDate: undefined,
            searchEndDate: undefined,
            totalProductCount: 0,
            productDetails: [],
            listData: [],
            prodOrder: [],
            deliveryDetails: [],
            displayData: [],
            dateObjectArray: [],
            shippingMethodsArrData: [],
            filters: {},
            categoryFilterData: [],
            categoryFilterDataTemp: [],
            colorsFilterData: [],
            colorsFilterDataTemp: [],
            farmsFilterData: [],
            farmsFilterDataTemp: [],
            stateCityFilterData: [],
            stateCityFilterDataTemp: [],
            boxTypeFilterData: [],
            boxTypeFilterDataTemp: [],
            varietyFilterData: [],
            varietyFilterDataTemp: [],
            uomFilterData: [],
            uomFilterDataTemp: [],
            lengthFilterData: [],
            lengthFilterDataTemp: [],
            gradeFilterData: [],
            gradeFilterDataTemp: [],
        });
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            pageType: 'bseller',
            sort: this.state.sortValue,
            pageNo: 1,
        }); */
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageNo: 1,
        }, this.state.passedSearchedData.searchText);
        this.props.getFiltersData({
            q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        });
    };

    handleDateChange = (date, name) => {
        this.setState({
            [name]: moment(date).format('MM/DD/YYYY'),
        });
    };

    handleSearchClick = () => {
        this.setState({
            enableClearAll: true,
        });
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageType: 'bseller',
            pageNo: 1,
            searchStartDate: this.state.searchStartDate,
            searchEndDate: this.state.searchEndDate,
        }); */
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageNo: 1,
            searchStartDate: this.state.searchStartDate,
            searchEndDate: this.state.searchEndDate,
            method: this.state.method === '?' ? '' : this.state.method,
            category: this.state.category ? this.state.category.join('_') : 0,
            color: this.state.color ? this.state.color.join('_') : 0,
            farm: this.state.farm ? this.state.farm.join('_') : 0,
            location: this.state.location ? this.state.location.join('_') : 0,
            boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
            variety: this.state.variety ? this.state.variety.join('_') : 0,
            uom: this.state.uom ? this.state.uom.join('_') : 0,
            length: this.state.length ? this.state.length.join('_') : 0,
            grade: this.state.grade ? this.state.grade.join('_') : 0,
        }, this.state.passedSearchedData.searchText);
        this.props.getFiltersData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            method: this.state.method === '?' ? '' : this.state.method,
            category: this.state.category ? this.state.category.join('_') : 0,
            color: this.state.color ? this.state.color.join('_') : 0,
            farm: this.state.farm ? this.state.farm.join('_') : 0,
            location: this.state.location ? this.state.location.join('_') : 0,
            boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
            variety: this.state.variety ? this.state.variety.join('_') : 0,
            uom: this.state.uom ? this.state.uom.join('_') : 0,
            length: this.state.length ? this.state.length.join('_') : 0,
            grade: this.state.grade ? this.state.grade.join('_') : 0,
            q: this.state.passedSearchedData.searchText,
        });
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

    handleMoreDetailClick = (productId) => {
        this.setState({
            showMoreDetail: {
                ...this.state.showMoreDetail,
                [productId]: !_get(this.state.showMoreDetail, productId, false),
            },
            // productId,
        });
    };

    resetMoreDetails = (date, index, pid) => {
        const dataTempAvail = _filter(this.state.deliveryDetails[index], [
            'delivery_date',
            date,
        ])[0];
        this.setState({
            displayData: { ...this.state.displayData, [index]: dataTempAvail },
            unitQty: { ...this.state.unitQty, [pid]: '' },
            totalAmount: { ...this.state.totalAmount, [pid]: 0 },
        });
    };

    handleViewClick = (viewType) => {
        this.setState({
            viewType,
        });
    };
    handleAddToWishlist = (productId) => {
        this.props.addToWhishlist({
            apiToken: this.props.apiToken,
            productId,
        });
    }

    handleAddToFavorites = (productId) => {
        this.props.addToFavorites({
            apiToken: this.props.apiToken,
            productId,
        });
    }

    createMarkup = content => ({ __html: content });

    render() {
        if (this.state.handleBkmClick) {
            return <Redirect push to='/' />;
        }

        if (this.state.redirectToDetailsPage) {
            return <Redirect push to={{
                pathname: `/${this.state.url}.html`,
                state: { productId: this.state.productId },
            }} />;
        }

        // if (_get(this, 'props.isLoading') && this.state.pageNo === 1) {
        //   return (
        //     <div className='container'>
        //       <Loader />
        //     </div>
        //   );
        // }

        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">

                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <ErrorBoundary>
                            <FilterComponent
                                searchStartDate={this.state.searchStartDate}
                                searchEndDate={this.state.searchEndDate}
                                filterData={this.state.filters}
                                filtersEnabled={this.state.filtersEnabled}
                                enableClearAll={this.state.enableClearAll}
                                category={this.state.category}
                                color={this.state.color}
                                farm={this.state.farm}
                                location={this.state.location}
                                boxType={this.state.boxType}
                                variety={this.state.variety}
                                uom={this.state.uom}
                                length={this.state.length}
                                grade={this.state.grade}
                                apiToken={this.props.apiToken}
                                method={this.state.method}
                                categoryData={_get(this.state, 'categoryFilterData')}
                                colorsData={_get(this.state, 'colorsFilterData')}
                                boxTypeData={_get(this.state, 'boxTypeFilterData')}
                                varietyData={_get(this.state, 'varietyFilterData')}
                                unitsData={_get(this.state, 'uomFilterData')}
                                lengthData={_get(this.state, 'lengthFilterData')}
                                gradeData={_get(this.state, 'gradeFilterData')}
                                farmsData={_get(this.state, 'farmsFilterData')}
                                stateCityData={_get(this.state, 'stateCityFilterData')}
                                shippingMethodsArrData={this.state.shippingMethodsArrData}
                                handleCategorySearch={this.handleCategorySearch}
                                handleFilterCheckBoxChange={this.handleFilterCheckBoxChange}
                                handleCustomFilter={this.handleCustomFilter}
                                handleClearAll={this.handleClearAll}
                                handleMethodChange={this.handleMethodChange}
                                handleDateChange={this.handleDateChange}
                                handleSearchClick={this.handleSearchClick}
                            />
                        </ErrorBoundary>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-6 col-xs-12">
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
                                }
                            >

                                <div className='shop-flowers-title'>
                                    <h1>Search Result for "{this.state.passedSearchedData.searchText}"</h1>
                                    {this.state.catDescription ?
                                        <span className='fresh-deal-description' dangerouslySetInnerHTML={this.createMarkup(this.state.catDescription)}>
                                            {/* {this.state.catDescription} */}
                                        </span> : null}
                                </div>
                                <ListingComponent
                                    {...this.state}
                                    metaDesc={_get(this.props.bkmSearchData, 'products.meta_description')}
                                    isLoading={this.props.isLoading}
                                    apiToken={this.props.apiToken}
                                    storeName={this.props.storeName}
                                    handleInuputChange={this.handleInuputChange}
                                    handleAddCartClick={this.handleAddCartClick}
                                    sortingOrderClick={this.sortingOrderClick}
                                    handleSortChange={this.handleSortChange}
                                    handleCustomFilter={this.handleCustomFilter}
                                    handleShowChangeStore={this.handleShowChangeStore}
                                    handleMoreDetailClick={this.handleMoreDetailClick}
                                    resetMoreDetails={this.resetMoreDetails}
                                    handleViewClick={this.handleViewClick}
                                    handleAddToFavorites={this.handleAddToFavorites}
                                    handleAddToWishlist={this.handleAddToWishlist}
                                    productReviewData={this.state.productReviewData}
                                    ratingsHover={this.ratingsHover}
                                    productVendorReviews={this.state.productVendorReviews}
                                    vendorRatingsHover={this.vendorRatingsHover}
                                />
                            </InfiniteScroll>
                        </ErrorBoundary>
                        <div className='display-item-count'>
                            Items{' '}
                            <span id='up'>
                                {this.state.productDetails && this.state.productDetails.length}
                            </span>{' '}
                            of <span id="pcount">{this.state.totalProductCount ? this.state.totalProductCount : 0}</span> total
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
    getBkmListSearchData: data => dispatch(fetchBKMListingData(data)),
    addToCart: data => dispatch(postAddToCartData(data)),
    // getBkmCartData: data => dispatch(fetchCartData(data)),
    getFiltersData: data => dispatch(fetchFilterCategoryData(data)),
    addToFavorites: data => dispatch(fetchAddToFavsData(data)),
    addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
    showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
    getHeaderSearchResult: (data, text) => dispatch(fetchCategoriesfinalSearchResult(data, text)),
    updateCart: data => dispatch(updateCartData(data)),
    setStoreId: data => dispatch(setStoreId(data)),
    flushCartData: () => dispatch(flushCartData()),
    flushCartViewData: () => dispatch(flushCartViewData()),
    clearCart: data => dispatch(clearCartData(data)),
    setCartId: data => dispatch(setCartId(data)),
    getMyProductReviews: data => dispatch(fetchProductReviews(data)),
    getProductReviews: data => dispatch(fetchProductVendorReviews(data)),
});

const mapStateToProps = (state) => {
    const { bkmReducer, loginReducer, cartReducer, productReviewsReducer, vendorReviewsReducer } = state;

    const {
        bkmCartData,
        bkmSearchData,
        filtersData,
        isFetching: isLoading,
        finalSearchData,
        searchText,
        error: bkmError,
    } = bkmReducer || [];

    const {
        apiToken,
        cartId,
        currencyCode,
        storeId,
        loginData,
        user,
        storeName,
        zipcode,
        error: loginError,
        cartCount,
    } = loginReducer || [];

    const {
        addCartResponseDetails,
        type,
        error: addToCartError,
    } = cartReducer || [];

    const { productReviewsData: productReviewData } = productReviewsReducer || [];

    const { productVendorReviews } = vendorReviewsReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(addToCartError) || _isError(addToCartError) || !_isEmpty(bkmError) || _isError(bkmError);

    return {
        bkmCartData,
        bkmSearchData,
        isLoading,
        apiToken,
        cartId,
        currencyCode,
        storeId,
        filtersData,
        loginData,
        user,
        storeName,
        zipcode,
        finalSearchData,
        searchText,
        addCartResponseDetails,
        type,
        error,
        productReviewData,
        productVendorReviews,
        cartCount,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ErrorHandler(BestsellerContainer));
