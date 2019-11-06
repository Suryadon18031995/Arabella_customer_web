import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Datetime from 'react-datetime';
import _get from 'lodash/get';
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';

const ViewOrderColumn = (cell, row, props) => (
    <span className="view-order"
        onClick={() => props.handleViewOrder(_get(row, 'increment_id', ''))}
    >{cell}</span>
);

const ViewInvoiceAndOpenTermOrderColumn = (cell, row, props) => (
    <span className="view-order"
        onClick={() => props.handleViewInvoiceOrder(cell)}
    >{cell}</span>
);

const DownloadColumn = (cell, row, props) => (
    // <span className="download-inv"
    //     onClick={() => props.handleDownload(_get(row, 'order_increment_id'), _get(row, 'invoice_increment_id'))}
    // >
        <a href={_get(row, 'download')} style={{ color: '#888' }}>Download</a>
        // {/* </span> */}
);

function removeTime(cell, row) {
    const remTime = moment(cell).format('YYYY-MM-DD');
    return (
        <div>{remTime}</div>
    );
}

function cancelAction(cell, row, props) {
    return (
        <span>
            {row.order_type !== 'Normal' && row.order_type !== 'Pre-book' &&
                <span>{cell && row.box_count !== '0' ? cell :
                        <Button style={{ padding: '1px 12px' }}
                            disabled={row.box_count === '0'}
                            // disabled
                            onClick={() => props.handleCancelSubscriptionOrder(row.box_count, row.entity_id)}
                        >
                            <span>{row.box_count !== '0' ? 'Cancel' : 'Cancelled' }</span>
                        </Button>
                }</span>}
        </span>
    );
}

function priceFormat(cell, row) {
    const priFor = Number(cell).toFixed(2);
    return (
        <div>{priFor}</div>
    );
}

export default function MyOrderComponent(props) {
    const selectRowProp = {
        mode: 'checkbox',
        // clickToSelect: false,
        selected: props.state.selected, // give a default selected row.
        unselectable: props.state.unselected,
        onSelect: props.onRowSelect,
        onSelectAll: props.onSelectAll,
    };
    const yesterday = Datetime.moment().subtract(7, 'day');
    const subDay = moment(_get(yesterday, '_d')).format('YYYY-MM-DD');

    let payClass;
    if (_get(props.state, 'selectedTotal') <= 0) {
        payClass = 'pay-method';
    } else if (_get(props.state, 'selectedTotal') > 0) {
        payClass = 'pay-meth';
    }

    return (
        <div className="container">
            <div className='container-block'>
                <div className="col-md-3 col-sm-4 col-xs-12">
                    <OneColumLeft
                        salesRepUser={props.salesRepUser}
                        primeUser={props.primeUser}
                        rewardsPointAmount={props.rewardsPointAmount}
                    />
                </div>
                <div className="order-buttons">
                    <Button onClick={props.myOrderFun}><span>MY ORDERS</span></Button>&nbsp;&nbsp;
                    <Button onClick={props.myInvoiceFun}><span>MY INVOICES</span></Button>&nbsp;&nbsp;
                    {/* <Button onClick={props.openTermFun}><span>OPEN TERMS ORDERS</span></Button>&nbsp;&nbsp; */}
                </div>
                {props.state.viewMyOrder &&
                    <div className="myOrder">
                        <ul className="list-inline my-order-li">
                            <li className="list-inline-item">Order Date: </li>
                            <li className="list-inline-item"><span>From</span> </li>
                            <li className="list-inline-item">
                                <Datetime onChange={e => props.handleDateChange(e, { type: 'filtDateFrom' })} dateFormat="YYYY-MM-DD" timeFormat={false} closeOnSelect={true} defaultValue={props.state.filtDateFrom} />
                            </li>
                            <li className="list-inline-item"><span>To</span> </li>
                            <li className="list-inline-item">
                                <Datetime onChange={e => props.handleDateChange(e, { type: 'filtDateTo' })} dateFormat="YYYY-MM-DD" timeFormat={false} closeOnSelect={true} defaultValue={props.state.filtDateTo} />
                            </li>
                            <li className="order-buttons"><Button onClick={() => props.handleFilterOrders()}><span>Submit</span></Button></li>
                        </ul>
                        <BootstrapTable data={_get(props, 'myOrderRes', [])} bordered={false} sortIndicator search pagination>
                            <TableHeaderColumn dataSort
                                dataAlign='center' width='20%'
                                dataField='increment_id' isKey
                                dataFormat={(cell, row) => ViewOrderColumn(cell, row, props)}>
                                Order #
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort
                                dataAlign='right' width='10%'
                                dataField='grand_total'
                                dataFormat={priceFormat}>
                                Price
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort
                                dataAlign='center' width='25%'
                                dataField='created_at'
                                dataFormat={removeTime}>
                                Order Date
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort
                                dataAlign='center' width='15%'
                                dataField='status'>
                                Status
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort
                                dataAlign='center' width='20%'
                                dataField='shipto'
                                >
                                Ship Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort
                                dataAlign='center' width='15%'
                                dataField='order_type'
                                // dataFormat={priceFormat}
                                >
                                Type
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataAlign='center' width='35%'
                                dataField='transaction_id'
                                dataFormat={(cell, row) => cancelAction(cell, row, props)}
                                >
                                Action/Id
                            </TableHeaderColumn>
                        </BootstrapTable>
                        {/* <Button onClick={props.handleBackClick}>BACK</Button> */}
                    </div>
                }
                {props.state.viewInvoice &&
                    <div>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <span><b>Invoice From</b></span>
                                <Datetime onChange={e => props.handleDateChange(e, { type: 'fromDate' })} dateFormat="YYYY-MM-DD" timeFormat={false} closeOnSelect={true} defaultValue={subDay} />
                            </li>
                            <li className="list-inline-item">
                                <span><b>Invoice To</b></span>
                                <Datetime onChange={e => props.handleDateChange(e, { type: 'toDate' })} dateFormat="YYYY-MM-DD" timeFormat={false} closeOnSelect={true} defaultValue={new Date()} />
                            </li>
                            <li><Button className="consolidated-invoice" onClick={() => props.downloadConsolidatedInvoices()}>Download Consolidated Invoice</Button></li>
                        </ul>
                        <div className="myInvoice">
                            <BootstrapTable data={_get(props, 'myInvoiceRes', [])} bordered={false} sortIndicator search pagination>
                                <TableHeaderColumn dataSort
                                    dataAlign='center' width='15%'
                                    dataField='invoice_increment_id' isKey>
                                    Invoice #
                                </TableHeaderColumn>
                                <TableHeaderColumn dataSort
                                    dataAlign='center' width='15%'
                                    dataField='price'
                                    dataFormat={priceFormat}>
                                    Invoice Amount
                                </TableHeaderColumn>
                                <TableHeaderColumn dataSort
                                    dataAlign='center' width='15%'
                                    dataField='order_increment_id'
                                    dataFormat={(cell, row) => ViewInvoiceAndOpenTermOrderColumn(cell, row, props)}>
                                    Order #
                                </TableHeaderColumn>
                                <TableHeaderColumn dataSort
                                    dataAlign='center' width='15%'
                                    dataField='created_at'
                                    dataFormat={removeTime}>
                                    Invoice Date
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='15%'
                                    dataFormat={(cell, row) => DownloadColumn(cell, row, props)}>
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                        {/* <Button onClick={props.handleBackClick}>BACK</Button> */}
                    </div>
                }
                {props.state.viewOpenTerm &&
                    <div className="open-term">
                        <h4>Open Terms Order</h4>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <span>Amount to pay(in USD)</span>
                                <input type="text" id="grand_pay" value={props.state.selectedTotal} className="form-control" disabled /></li>
                            <li className="list-inline-item">
                                <form method="post" action="https://www.sandbox.paypal.com/cgi-bin/webscr">
                                    <input type="hidden" name="business" value="stripathi@kabloomcorp.com" />
                                    <input type="hidden" name="cmd" value="_xclick" />
                                    <input type="hidden" name="item_name" value="checkedInvoiceOrder" />
                                    <input name="custom" id="paypal_description" value={props.state.selected} type="hidden" />
                                    <input type="hidden" name="x_currency_code" value='USD' />
                                    <input type="hidden" name="amount" value={_get(props.state, 'selectedTotal')} />
                                    <Button className={payClass} type="submit">Pay using Paypal</Button>
                                </form>
                            </li>
                            <li className="list-inline-item">
                                <form method="post" action="https://demo.globalgatewaye4.firstdata.com/payment">
                                    <input type="hidden" name="x_login" value={_get(props.state, 'pageid')} />
                                    <input type="hidden" name="x_description" id="x_description" value={props.state.selected} />
                                    <input type="hidden" name="x_fp_sequence" value={_get(props.state, 'sequence')} />
                                    <input type="hidden" name="x_fp_timestamp" value={_get(props.state, 'timestamp')} />
                                    <input type="hidden" name="x_currency_code" value='USD' />
                                    <input type="hidden" name="x_amount" value={_get(props.state, 'selectedTotal')} />
                                    <input type="hidden" name="x_fp_hash" value={_get(props.state, 'getHashValue')} />
                                    <input type="hidden" name="x_show_form" value="PAYMENT_FORM" />
                                    <input type="hidden" name="x_type" value="AUTH_ONLY" />
                                    <input type="hidden" placeholder="enter firstname" name="x_first_name" value={_get(props.state, 'defaultBillInfo.firstname')} />
                                    <input type="hidden" placeholder="enter lastname" name="x_last_name" value={_get(props.state, 'defaultBillInfo.lastname')} />
                                    <input type="hidden" placeholder="enter company" name="x_user1" value={_get(props.state, 'defaultBillInfo.company')} />
                                    <input type="hidden" placeholder="enter address" name="x_address" value={_get(props.state, 'defaultBillInfo.address_line1').length >= 28 ? _get(props.state, 'defaultBillInfo.address_line1').substr(0, 27) : _get(props.state, 'defaultBillInfo.address_line1')} />
                                    <input type="hidden" placeholder="enter city" name="x_city" value={_get(props.state, 'defaultBillInfo.city')} />
                                    <input type="hidden" placeholder="enter state" name="x_state" value={_get(props.state, 'defaultBillInfo.state')} />
                                    <input type="hidden" placeholder="enter zipcode" name="x_zip" value={_get(props.state, 'defaultBillInfo.zipcode')} />
                                    <input type="hidden" placeholder="enter country" name="x_country" value={_get(props.state, 'defaultBillInfo.country')} />
                                    <input type="hidden" placeholder="enter phone" name="x_user2" value={_get(props.state, 'defaultBillInfo.telephone')} />
                                    <input type="hidden" name="enable_level3_processing" value='TRUE' />
                                    <Button className={payClass} onClick={props.getCheckedInvoice} type="submit">Pay using Firstdata</Button>
                                </form>
                            </li>
                        </ul>
                        <div className="openTermsOrder">
                            <BootstrapTable data={_get(props, 'openTermRes', [])} selectRow={selectRowProp} bordered={false}>
                                <TableHeaderColumn
                                    dataAlign='center' width='15%'
                                    isKey dataField='invoice_increment_id'>
                                    Invoice #
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='15%'
                                    dataField='price'
                                    dataFormat={priceFormat}>
                                    Invoice Amount
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='15%'
                                    dataField='order_increment_id'
                                    dataFormat={(cell, row) => ViewInvoiceAndOpenTermOrderColumn(cell, row, props)}>
                                    Order #
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='15%'
                                    dataField='created_at'
                                    dataFormat={removeTime}>
                                    Invoice Date
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='15%'
                                    dataFormat={(cell, row) => DownloadColumn(cell, row, props)}>
                                    Action
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='15%'
                                    dataField='status'>
                                    Status
                                    </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                        {/* <Button onClick={props.handleBackClick}>BACK</Button> */}
                    </div>
                }

            </div>
        </div>);
}
