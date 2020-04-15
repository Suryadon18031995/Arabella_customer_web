import React, { Component } from 'react';
import moment from 'moment';
// import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import JsSHA from 'jssha';
import MyOrderComponent from '../../components/MyAccount/MyOrderComponent.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import {
    fetchMyOrderData,
    fetchMyInvoiceData,
    fetchOpenTermData,
    fetchViewOrderData,
    fetchDownloadInvoiceData,
    setOrderId,
    fetchMultipleOrderPaymentOpenTermsData,
    cancelSubscriptionOrder,
} from '../../actions/myOrder';
import TrackTableComponent from '../../components/BKMComponent/TrackTableComponent.jsx';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import PDFComponent from '../../components/MyAccount/PDFComponent.jsx';
import { setFirstDataRedirection } from '../../actions/placeOrder';
import { fetchAllAddressData } from '../../actions/address';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

const selected = [];
const unselected = [];

class MyOrderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOrder: false,
            viewOpenTerm: false,
            viewMyOrder: false,
            viewInvoice: false,
            back: false,
            downloadPdf: undefined,
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
            fromDate: moment().subtract(1, 'week').format('YYYY-MM-DD'),
            toDate: moment().format('YYYY-MM-DD'),
            pdfData: undefined,
            showPdf: false,
            pageid: 'WSP-KABLO-cgrpBAB55g',
            key: 'JeY9Kv7_vVuMuQPLFYyV',
            sequence: Math.floor(Math.random() * 10000),
            timestamp: moment(new Date()).unix(),
            getHashValue: undefined,
            selectedTotal: 0,
            filtDateFrom: undefined,
            filtDateTo: undefined,
            myOrderRes: undefined,
        };
    }

    getHash = () => {
        const string = [this.state.pageid,
        this.state.sequence,
        this.state.timestamp,
        this.state.selectedTotal,
        this.props.currencyCode,
        ].join('^');
        const shaObj = new JsSHA('SHA-1', 'TEXT');
        shaObj.setHMACKey(this.state.key, 'TEXT');
        shaObj.update(string);
        const hmac = shaObj.getHMAC('HEX');
        return hmac;
    };

    componentDidMount() {
        document.title = 'My Orders';
        this.setState({
            viewMyOrder: true,
        });
      this.props.getMyOrderData({
        api_token: _get(this.props, 'apiToken'),
       });
    }

    myOrderFun = () => {
        this.setState({
            viewMyOrder: true,
            viewInvoice: false,
            viewOpenTerm: false,
        });
        this.props.getMyOrderData({ apiToken: _get(this.props, 'apiToken') });
    }

    myInvoiceFun = () => {
        this.setState({
            viewInvoice: true,
            viewMyOrder: false,
            viewOpenTerm: false,
        });
        this.props.getMyInvoiceData({ apiToken: _get(this.props, 'apiToken') });
    }

    downloadConsolidatedInvoices = () => {
        this.setState({
            downloadPdf: true,
        });
        const reqBody = {
            isConsolidated: true,
            apiToken: _get(this.props, 'apiToken'),
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
        };
        this.props.getPdfData(reqBody);
    }

    openTermFun = () => {
        this.setState({
            viewOpenTerm: true,
            viewInvoice: false,
            viewMyOrder: false,
        });
        this.props.getOpenTermData({ apiToken: _get(this.props, 'apiToken') });
        this.props.getFirstDataRedirection({ showFirstDataRedirection: 'myOrder' });
        this.props.getAllAddressData({ apiToken: this.props.apiToken });
    }

    handleViewOrder = (orderId) => {
        this.setState({
            viewOrder: true,
            // orderId,
        });
        this.props.setOrderId(orderId);
    }

    handleViewInvoiceOrder = (orderId) => {
        this.setState({
            viewOrder: true,
            // orderId,
        });
        this.props.setOrderId(orderId);
    }

    handleDownload = (orderId, incrementId) => {
        this.setState({
            downloadPdf: true,
        });
        const reqBody = {
            apiToken: this.props.apiToken,
            isConsolidated: false,
            invoiceNumber: incrementId,
            incrementId: orderId,
        };
        this.props.getPdfData(reqBody);
    }

    handleBackClick = () => {
        this.setState({ back: true });
    }
    handleDateChange = (e, dateKey) => {
        const tempDt = moment(e).format('YYYY-MM-DD');
        const typeToset = dateKey.type;
        this.setState({
            [typeToset]: tempDt,
        });
    }

    handleFilterOrders = () => {
        const myOrderRes = this.state.myOrderResData.filter(each => moment(each.created_at).format('YYYY-MM-DD') >= this.state.filtDateFrom && moment(each.created_at).format('YYYY-MM-DD') <= this.state.filtDateTo);
        this.setState({ myOrderRes });
    }

    onRowSelect = (row, isSelected, e) => {
        let Total = Number(this.state.selectedTotal);
        if (`${isSelected}` === 'false') {
            Total -= Number(`${row.price}`);
            _pull(selected, row.invoice_increment_id);
            this.setState({
                selectedTotal: Total.toFixed(2),
                selected,
            });
        } else {
            Total += Number(`${row.price}`);
            selected.push(row.invoice_increment_id);
            this.setState({
                selectedTotal: Total.toFixed(2),
            });
        }
    }

    onSelectAll = (isSelected, rows) => {
        let Total = Number(this.state.selectedTotal);
        if (isSelected) {
            rows.map((thisData) => {
                Total += Number(thisData.price);
                selected.push(thisData.invoice_increment_id);
            });
            this.setState({
                selectedTotal: Total.toFixed(2),
            });
        } else {
            rows.map((thisData) => {
                Total -= Number(thisData.price);
                _pull(selected, thisData.invoice_increment_id);
            });
            this.setState({
                selectedTotal: Total.toFixed(2),
                selected,
            });
        }
    }

    getCheckedInvoice = () => {
        this.setState({
            getHashValue: this.getHash(),
        });
    }

    processDownLoadPdf = (req) => {
        // this.setState({
        //     pdfData: req,
        // });
        // if (this.state.downloadPdf && _get(req, ['result', 'table_data'])) {
        //     const invoiceNo = _get(req, ['result, inv_number']);
        //     const input = document.getElementById('pdfPage');
        //     input.setAttribute('style', 'display: block;');
        //     html2canvas(input)
        //         .then((canvas) => {
        //             const imgData = canvas.toDataURL('image/png');
        //             const pdf = new JsPDF(); // 'p', 'px', 'a4');
        //             const width = pdf.internal.pageSize.getWidth();
        //             const height = pdf.internal.pageSize.getHeight();
        //             pdf.addImage(imgData, 'PNG', 5, 10, width, (100));
        //             if (this.state.showPdf) {
        //                 pdf.save('Consolidated_Statement.pdf');
        //             } else {
        //                 pdf.save(`${_get(req, 'result.inv_number')}.pdf`);
        //             }
        //             input.setAttribute('style', 'display: none;');
        //         });
        // }
    }

    handleCancelSubscriptionOrder = (boxCount, entityId) => {
        const confirmation = window.confirm(`$${boxCount * 10} will be charged against ${boxCount} boxes for canceling this order. Are you sure you want to cancel?`);
        if (confirmation) {
            this.props.cancelSubscriptionOrder({ apiToken: this.props.apiToken, entityId });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        let selectedTotal = 0;
        if (!_isEmpty(_get(nextProps, 'myOrderData'))) {
            const myOrderRes = _get(nextProps, 'myOrderData[0].result');
            this.setState({
                myOrderRes: _get(nextProps, 'myOrderData[0].result'),
                myOrderResData: _get(nextProps, 'myOrderData[0].result'),
                filtDateFrom: moment(_get(_minBy(myOrderRes, 'created_at'), 'created_at')).format('YYYY-MM-DD'),
                filtDateTo: moment(_get(_maxBy(myOrderRes, 'created_at'), 'created_at')).format('YYYY-MM-DD'),
            });
        }
        if (!_isEmpty(_get(nextProps, 'myInvoiceData'))) {
            this.setState({ myInvoiceRes: _get(nextProps, 'myInvoiceData.data') });
        }
        if (!_isEmpty(_get(nextProps, 'openTermData'))) {
            Object.entries(_get(nextProps, 'openTermData.data')).map(([key, val]) => {
                if (val.status === 'outstanding') {
                    selected.push(val.invoice_increment_id);
                    selectedTotal += Number(val.price);
                } else {
                    unselected.push(val.invoice_increment_id);
                }
            });
            this.setState({
                openTermRes: _get(nextProps, 'openTermData.data'),
                selected,
                unselected,
                selectedTotal: selectedTotal.toFixed(2),
            });
        }
        if (!_isEmpty(_get(nextProps, 'viewOrderData'))) {
            if (_get(nextProps, ['viewOrderData', 0, 'code']) === 1) {
                this.setState({
                    tableResult: _get(nextProps, ['viewOrderData', 0]),
                    showOurTable: _get(nextProps.viewOrderData, [0, 'has_map']),
                });
            }
            if (_get(nextProps.viewOrderData, [0, 'has_map']) === 'yes') {
                this.setState({
                    showMap: true,
                    showTable: true,
                });
            } else {
                this.setState({
                    showMap: false,
                    showTable: false,
                });
            }
        }
        if (!_isEmpty(_get(nextProps, 'invoicePdfData'))) {
            if (_get(nextProps, ['invoicePdfData', 0, 'code']) === 1) {
                const result = _get(nextProps, ['invoicePdfData', 0, 'result']);
                if (result.hasOwnProperty('shipping_address')) {
                    this.setState({ showPdf: false });
                    this.processDownLoadPdf(_get(nextProps, ['invoicePdfData', 0]));
                } else if (!_isEmpty(_get(nextProps, ['invoicePdfData', 0, 'result', 'table_data']))) { // && this.state.downloadPdf) {
                    this.setState({ showPdf: true });
                    this.processDownLoadPdf(_get(nextProps, ['invoicePdfData', 0]));
                }
            }
            // if (_get(nextProps, ['invoicePdfData', 0, 'code']) === 1 && !_isEmpty(_get(nextProps, ['invoicePdfData', 0, 'result', 'table_data']))) { // && this.state.downloadPdf) {
            //     this.processDownLoadPdf(_get(nextProps, ['invoicePdfData', 0]));
            // }
        }
        if (!_isEmpty(_get(nextProps, 'multipleOrderPaymentData'))) {
            // console.log('multipleorderPyamnetOpentermsData', _get(nextProps, 'multipleOrderPaymentData'));
        }

        if (!_isEmpty(_get(nextProps, 'allAddressData'))) {
            const defaultBillInfo = _find(_get(nextProps, ['allAddressData', 'result', 0], []), { entity_id: _get(nextProps, 'allAddressData.billingAddressId') });
            this.setState({ defaultBillInfo });
        }
        if (!_isEmpty(_get(nextProps, 'cancelSubscriptionData'))) {
            alert('Canceled Successfully.');
            this.props.getMyOrderData({ apiToken: _get(this.props, 'apiToken') });
        }
    }

    render() {
        console.log(this.state);
        if (_get(this, 'props.isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }
        if (this.state.viewOrder) {
            return <Redirect push to={{
                pathname: '/customer/account/viewOrder',
                state: { orderId: this.state.orderId },
            }} />;
        }
        if (this.state.back) {
            return <Redirect push to="/customer/account" />;
        }
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        return (
            <div>
                <div className="container">
                    <div className='container-block'>
                        <ErrorBoundary>
                            <MyOrderComponent
                                salesRepUser={this.props.salesRepUser}
                                primeUser={this.props.primeUser}
                                orderRes={this.props.myOrderData}
                                myOrderFun={this.myOrderFun}
                                myInvoiceFun={this.myInvoiceFun}
                                openTermFun={this.openTermFun}
                                myOrderRes={this.state.myOrderRes}
                                myInvoiceRes={this.state.myInvoiceRes}
                                openTermRes={this.state.openTermRes}
                                handleViewOrder={this.handleViewOrder}
                                state={this.state}
                                handleBackClick={this.handleBackClick}
                                handleDownload={this.handleDownload}
                                onRowSelect={this.onRowSelect}
                                downloadConsolidatedInvoices={this.downloadConsolidatedInvoices}
                                handleDateChange={this.handleDateChange}
                                handleViewInvoiceOrder={this.handleViewInvoiceOrder}
                                onSelectAll={this.onSelectAll}
                                getCheckedInvoice={this.getCheckedInvoice}
                                handleFilterOrders={this.handleFilterOrders}
                                handleCancelSubscriptionOrder={this.handleCancelSubscriptionOrder}
                                rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                            />
                            <TrackTableComponent
                                state={this.state}
                                handleShow={this.handleShow}
                                handleClose={this.handleClose}
                                apiToken={this.props.apiToken}
                            />
                            <PDFComponent
                                pdfData={this.state.pdfData}
                                showPdf={this.state.showPdf}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
                <hr className="blue-hr"></hr>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getMyOrderData: data => dispatch(fetchMyOrderData(data)),
    getMyInvoiceData: data => dispatch(fetchMyInvoiceData(data)),
    getOpenTermData: data => dispatch(fetchOpenTermData(data)),
    getViewOrderData: data => dispatch(fetchViewOrderData(data)),
    getPdfData: data => dispatch(fetchDownloadInvoiceData(data)),
    setOrderId: data => dispatch(setOrderId(data)),
    getFirstDataRedirection: data => dispatch(setFirstDataRedirection(data)),
    getMultipleOrderPaymentFirstData: data => dispatch(fetchMultipleOrderPaymentOpenTermsData(data)),
    getAllAddressData: data => dispatch(fetchAllAddressData(data)),
    cancelSubscriptionOrder: data => dispatch(cancelSubscriptionOrder(data)),
});

const mapStateToProps = (state) => {
    const { loginReducer, myOrderReducer, allAddressReducer } = state;

    const {
        apiToken,
        currencyCode,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        allAddressData,
        error: allAddressError,
    } = allAddressReducer || [];

    const {
        myOrderData,
        myInvoiceData,
        openTermData,
        viewOrderData,
        invoicePdfData,
        orderId,
        multipleOrderPaymentData,
        isFetching: isLoading,
        error: myOrderError,
        cancelSubscriptionData,
    } = myOrderReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(allAddressError) || _isError(allAddressError) || !_isEmpty(myOrderError) || _isError(myOrderError);

    return {
        apiToken,
        myOrderData,
        myInvoiceData,
        openTermData,
        currencyCode,
        viewOrderData,
        isLoading,
        invoicePdfData,
        orderId,
        multipleOrderPaymentData,
        salesRepUser,
        allAddressData,
        error,
        primeUser,
        cancelSubscriptionData,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(MyOrderContainer));

