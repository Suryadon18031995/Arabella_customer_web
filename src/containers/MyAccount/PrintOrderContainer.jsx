import React, { Component } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import { fetchViewOrderData } from '../../actions/myOrder';
import Loader from '../../components/Loader/Loader.jsx';
import Logo from '../../assets/images/bloom_logo_small.png';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class ViewOrderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlKey: undefined,
            productId: undefined,
            orderId: _get(this.props, 'match.params.id', this.props.orderId),
        };
    }

    handleWindowClose = () => {
        window.close();
    }
    componentDidMount() {
        const orderId = _get(this.props, 'match.params.id');
        this.props.getViewOrderData({
            incrementId: orderId, apiToken: _get(this.props, 'apiToken'), currencyCode: this.props.currencyCode,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'viewOrderData'))) {
            if (_get(nextProps, ['viewOrderData', 0, 'code']) === 1) {
                let orderDetails = Object.values(_get(nextProps.viewOrderData, [0, 'order_items'], {}));
                orderDetails = orderDetails.flat();
                const subTotal = orderDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalamount, 0);
                const orderDate = moment(_get(nextProps.viewOrderData, [0, 'order_date'])).format('MMMM Do YYYY');
                this.setState({
                    shippingAndHandling: _get(nextProps.viewOrderData, [0, 'shipping_and_handling']),
                    // grandTotal: _get(nextProps.viewOrderData, [0, 'grand_total']),
                    // subTotal: _get(nextProps.viewOrderData, [0, 'sub_total']),
                    orderDetails,
                    orderDate,
                    orderNumber: _get(nextProps.viewOrderData, [0, 'increment_id']),
                    status: _get(nextProps.viewOrderData, [0, 'status']),
                    shippingAddress: _get(nextProps.viewOrderData, [0, 'shipping_address']),
                    shippingMethod: _get(nextProps.viewOrderData, [0, 'shipping_method']),
                    billingAddress: _get(nextProps.viewOrderData, [0, 'billing_address']),
                    paymentMethod: _get(nextProps.viewOrderData, [0, 'payment_method']),
                    subTotal: parseFloat(subTotal).toFixed(2),
                    grandTotal: parseFloat(subTotal).toFixed(2),
                });
            }
            setTimeout(() => {
                window.print();
            }, 1000);
        }
    }

    render() {
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
            <div className="container">
                <div>
                    <div>
                        <img className="print-logo" src={Logo}></img>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 textWeight'>
                        <div>Order #{_get(this.state, 'orderNumber')}</div>
                        <div>Order Date: {_get(this.state, 'orderDate')}</div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 textWeight'>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <h4>Shipping Address</h4>
                            <div>
                                <span>{_get(this.state.shippingAddress, 'name')}</span><br />
                                <span>{_get(this.state.shippingAddress, 'street1')}</span><br />
                                <span>{_get(this.state.shippingAddress, 'street2')}</span><br />
                                <span>{_get(this.state.shippingAddress, 'city_region_postcode')}</span><br />
                                <span>{_get(this.state.shippingAddress, 'country')}</span><br />
                                <span>{_get(this.state.shippingAddress, 'telephone')}</span><br />
                            </div>
                            <div>
                                <span>Shipping Method</span><br />
                                <span>{_get(this.state, 'shippingMethod')}</span>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <h4>Billing Address</h4>
                            <div>
                                <span>{_get(this.state.billingAddress, 'name')}</span><br />
                                <span>{_get(this.state.billingAddress, 'street1')}</span><br />
                                <span>{_get(this.state.billingAddress, 'street2')}</span><br />
                                <span>{_get(this.state.billingAddress, 'city_region_postcode')}</span><br />
                                <span>{_get(this.state.billingAddress, 'country')}</span><br />
                                <span>{_get(this.state.billingAddress, 'telephone')}</span><br />
                            </div>
                            <div>
                                <span>Payment Method</span><br />
                                <span>{_get(this.state, 'paymentMethod')}</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <h3><strong>Items Ordered</strong></h3>
                        <table className="table table-bordered vieworder-table" id="print-table">
                            <thead>
                                <tr>
                                    <th>Sl No</th>
                                    <th className='textWeight'>Product Name</th>
                                    <th className='textWeight'>SKU</th>
                                    <th className='textWeight'>Delivery Date</th>
                                    <th className='textWeight'>Price</th>
                                    <th className='textWeight'>Qty</th>
                                    <th className='textWeight'>Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_get(this.state, 'orderDetails') && Object.entries(_get(this.state, 'orderDetails')).map((product, key) => <tr className='text-center' key={key}>
                                    <td>{key + 1}</td>
                                    <td>{product[1].name}</td>
                                    <td>{product[1].product_sku}</td>
                                    <td>{product[1].delivery_date}</td>
                                    <td>${product[1].total_price}</td>
                                    <td>{product[1].qty_per_box}</td>
                                    <td>${parseFloat(product[1].totalamount).toFixed(2)}</td>
                                </tr>)}
                                <tr>
                                </tr>
                                <th colSpan="6" style={{ textAlign: 'right', border: '1px solid #ddd' }}>SubTotal</th>
                                <td colSpan="7" style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                    ${this.state.subTotal}
                                </td>
                                <tr>
                                </tr>
                                <th colSpan="6" style={{ textAlign: 'right', border: '1px solid #ddd' }}>
                                    Shipping and Handling
                            </th>
                                <td colSpan="7" style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                    ${this.state.shippingAndHandling > 0 ? parseFloat(this.state.shippingAndHandling).toFixed(2) : '0.00'}
                                </td>
                                <tr>
                                </tr>
                                <th colSpan="6" style={{ textAlign: 'right' }}><strong>GrandTotal</strong></th>
                                <td colSpan="7" style={{ textAlign: 'center' }}><strong>${this.state.shippingAndHandling > 0 ? (this.state.grandTotal + this.state.shippingAndHandling) : this.state.grandTotal}</strong></td>
                            </tbody>
                        </table>
                        <Button onClick={() => this.handleWindowClose()}>Close Window</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getViewOrderData: data => dispatch(fetchViewOrderData(data)),
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
    } = myOrderReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(myOrderError) || _isError(myOrderError);

    return {
        apiToken,
        viewOrderData,
        currencyCode,
        orderId,
        isLoading,
        error,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ViewOrderContainer));

