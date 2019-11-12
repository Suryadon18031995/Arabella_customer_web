import React, { Component } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import moment from 'moment';
// import JsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import ViewOrderComponent from '../../components/MyAccount/ViewOrderComponent.jsx';
import {
    fetchViewOrderData,
    // fetchDownloadInvoiceData
} from '../../actions/myOrder';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import PDFComponent from '../../components/MyAccount/PDFComponent.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class ViewOrderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOrder: false,
            showMap: false,
            isMarkerShown: false,
            toShowPop: undefined,
            showTable: false,
            isOpen: false,
            show: false,
            trackDetails: undefined,
            productMoreData: undefined,
            showMoreData: false,
            showProd: false,
            urlKey: undefined,
            showPrintOrder: false,
            orderId: _get(this.props, 'location.state.orderId', this.props.orderId),
            showLeftTabAndMoreDetails: false,
            showReorder: false,
            downloadPdf: undefined,
            pdfData: undefined,
            showPdf: false,
        };
    }

    handlePrintOrder = () => {
        this.setState({ showPrintOrder: true });
    }

    onToggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleMoreProductClose = () => {
        this.setState({ showMoreData: false });
    }

    handleTrackDetails = (trackDetails) => {
        this.setState({
            show: true,
            trackDetails,
        });
    }

    handleMoreProductDetail = (productMoreData) => {
        this.setState({
            productMoreData,
            showMoreData: true,
        });
    }

    handleWriteReview = (pid, urlKey) => {
        this.setState({
            productId: pid,
            showProd: true,
            urlKey,
        });
    }

    handleBack = () => {
        this.props.history.go(-1);
    }

    handleReorder = () => {
        this.setState({ showReorder: true });
    }

    // handleDownload = (orderId, incrementId) => {
    //     this.setState({
    //         downloadPdf: true,
    //     });
    //     const reqBody = {
    //         apiToken: this.props.apiToken,
    //         isConsolidated: false,
    //         invoiceNumber: incrementId,
    //         incrementId: orderId,
    //     };
    //     this.props.getPdfData(reqBody);
    // }

    // processDownLoadPdf = (req) => {
    //     this.setState({
    //         pdfData: req,
    //     });
    //     if (this.state.downloadPdf && _get(req, ['result', 'table_data'])) {
    //         const invoiceNo = _get(req, ['result, inv_number']);
    //         const input = document.getElementById('pdfPage');
    //         input.setAttribute('style', 'display: block;');
    //         html2canvas(input)
    //             .then((canvas) => {
    //                 const imgData = canvas.toDataURL('image/png');
    //                 const pdf = new JsPDF(); // 'p', 'px', 'a4');
    //                 const width = pdf.internal.pageSize.getWidth();
    //                 const height = pdf.internal.pageSize.getHeight();
    //                 pdf.addImage(imgData, 'PNG', 5, 10, width, 200);
    //                 pdf.save(`${_get(req, 'result.inv_number')}.pdf`);
    //                 input.setAttribute('style', 'display: none;');
    //             });
    //     }
    // }

    componentDidMount() {
        // const orderId = _get(this.props, 'location.state.orderId');
        this.props.getViewOrderData({
            incrementId: this.state.orderId, apiToken: _get(this.props, 'apiToken'), currencyCode: this.props.currencyCode,
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'viewOrderData'))) {
            if (_get(nextProps, ['viewOrderData', 0, 'code']) === 1) {
                const orderDate = moment(_get(nextProps.viewOrderData, [0, 'order_date'])).format('MMMM Do YYYY');
                this.setState({
                    shippingAndHandling: _get(nextProps.viewOrderData, [0, 'shipping_and_handling']),
                    grandTotal: _get(nextProps.viewOrderData, [0, 'grand_total']),
                    subTotal: _get(nextProps.viewOrderData, [0, 'sub_total']),
                    orderDetails: _get(nextProps.viewOrderData, [0, 'order_items']),
                    orderDate,
                    orderNumber: _get(nextProps.viewOrderData, [0, 'increment_id']),
                    mapDetails: _get(nextProps.viewOrderData, [0, 'map_details']),
                    status: _get(nextProps.viewOrderData, [0, 'status']),
                    shippingAddress: _get(nextProps.viewOrderData, [0, 'shipping_address']),
                    billingAddress: _get(nextProps.viewOrderData, [0, 'billing_address']),
                    paymentMethod: _get(nextProps.viewOrderData, [0, 'payment_method']),
                    soUrl: _get(nextProps.viewOrderData, [0, 'so']),
                });
            }
            if (_get(nextProps.viewOrderData, [0, 'has_map']) === 'yes') {
                this.setState({
                    showMap: true,
                    showTable: true,
                    showLeftTabAndMoreDetails: true,
                });
            } else {
                this.setState({
                    showMap: false,
                    showTable: false,
                    showLeftTabAndMoreDetails: false,
                });
            }
        }
        // if (!_isEmpty(_get(nextProps, 'invoicePdfData'))) {
        //     if (_get(nextProps, ['invoicePdfData', 0, 'code']) === 1) {
        //         const result = _get(nextProps, ['invoicePdfData', 0, 'result']);
        //         if (result.hasOwnProperty('shipping_address')) {
        //             this.setState({ showPdf: false });
        //             this.processDownLoadPdf(_get(nextProps, ['invoicePdfData', 0]));
        //         } else if (!_isEmpty(_get(nextProps, ['invoicePdfData', 0, 'result', 'table_data']))) { // && this.state.downloadPdf) {
        //             this.setState({ showPdf: true });
        //             this.processDownLoadPdf(_get(nextProps, ['invoicePdfData', 0]));
        //         }
        //     }
        //     // if (_get(nextProps, ['invoicePdfData', 0, 'code']) === 1 && !_isEmpty(_get(nextProps, ['invoicePdfData', 0, 'result', 'table_data']))) { // && this.state.downloadPdf) {
        //     //     this.processDownLoadPdf(_get(nextProps, ['invoicePdfData', 0]));
        //     // }
        // }
    }

    render() {
        if (this.state.showProd) {
            return <Redirect push to={{
                pathname: `/${this.state.urlKey}.html`,
                state: { productId: this.state.productId },
            }} />;
        }

        if (this.state.showReorder) {
            return <Redirect push to={{
                pathname: '/customer/account/re-order',
                state: { orderNumber: this.state.orderNumber },
            }} />;
        }

        if (_get(this, 'props.isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }
        if (this.state.viewOrder) {
            return <Redirect push to={{
                pathname: '/viewOrder',
                state: { orderId: this.state.orderId },
            }} />;
        }
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        return (
            <div>
                <div className="container" style={{ minHeight: '450px' }}>
                    <ErrorBoundary>
                        <ViewOrderComponent
                            state={this.state}
                            onToggleOpen={this.onToggleOpen}
                            handleClose={this.handleClose}
                            handleTrackDetails={this.handleTrackDetails}
                            handleMoreProductDetail={this.handleMoreProductDetail}
                            handleMoreProductClose={this.handleMoreProductClose}
                            handleWriteReview={this.handleWriteReview}
                            handleBack={this.handleBack}
                            handleReorder={this.handleReorder}
                        // handleDownload={this.handleDownload}
                        />
                    </ErrorBoundary>
                </div>
                <PDFComponent
                    pdfData={this.state.pdfData}
                    showPdf={this.state.showPdf}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getViewOrderData: data => dispatch(fetchViewOrderData(data)),
    // getPdfData: data => dispatch(fetchDownloadInvoiceData(data)),
});

const mapStateToProps = (state) => {
    const { loginReducer, myOrderReducer } = state;

    const {
        apiToken,
        currencyCode,
        error: loginError,
    } = loginReducer || [];

    const {
        viewOrderData,
        orderId,
        isFetching: isLoading,
        error: myOrderError,
        // invoicePdfData,
    } = myOrderReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(myOrderError) || _isError(myOrderError);

    return {
        apiToken,
        viewOrderData,
        currencyCode,
        orderId,
        isLoading,
        error,
        // invoicePdfData,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ViewOrderContainer));
