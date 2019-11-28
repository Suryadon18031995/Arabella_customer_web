import React from 'react';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Modal from 'react-bootstrap/lib/Modal';
import _values from 'lodash/values';
import bannerImg from '../../assets/images/bloom_logo.png';
// import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';

export default function PDFComponent(props) {
    const dataReg = _get(props, ['pdfData', 'result']);
    const tableData = _values(_get(props, ['pdfData', 'result', 'table_data']));
    if (props.showPdf === true) {
        return (
            <div id="pdfPage" style={{ display: 'none' }}>
                <div className="row" style={{ textAlign: 'center', paddingTop: '5%' }}>
                    <img src={bannerImg} width="200" height="50" />
                </div>
                {dataReg && !_isEmpty(_get(dataReg, ['table_data'])) &&

                    <div>
                        <div className="row">
                            <div className="col-md-5 pdf-consolidated" >
                                <p className="customP">{_get(dataReg, ['company_address', 'company_name'])}</p>
                                <p className="customP">{_get(dataReg, ['company_address', 'company_street1'])}</p>
                                <p className="customP">{_get(dataReg, ['company_address', 'city_region_pincode'])}</p>
                            </div>
                            <div className="col-md-5">
                                {/* <p className="customP"> Bill To</p> */}

                                <div className="consolidated-billhead">Bill To</div>
                                <div className="consolidated-billbody">

                                    <p className="customP">{_get(dataReg, ['default_billing_address', 'billing_name'])}</p>
                                    <p className="customP">{_get(dataReg, ['default_billing_address', 'billing_company'])}</p>
                                    <p className="customP">{_get(dataReg, ['default_billing_address', 'billing_street'])}</p>
                                    <p className="customP">{_get(dataReg, ['default_billing_address', 'city_region_pincode'])}</p>
                                    <p className="customP">{_get(dataReg, ['default_billing_address', 'billing_telephone'])}</p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <BootstrapTable className="table-large pdfTable" data={tableData}>
                                <TableHeaderColumn
                                    dataAlign='center' width='20%'
                                    dataField='invoice_date' isKey>
                                    Invoice Date
                            </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='10%'
                                    dataField='invoice_number'>
                                    Invoice Number
                            </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='20%'
                                    dataField='order_number'>
                                    Order Number
                        </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='center' width='20%'
                                    dataField='invoice_amount'>
                                    Invoice Amount
                        </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                }
            </div>
        );
            }
    const bloomKonnectAddr = _get(props.pdfData, 'result.bloomkonnect_address');
    const billAddr = _get(props.pdfData, 'result.billing_address');
    const shipAddr = _get(props.pdfData, 'result.shipping_address');
    const orderTableData = _get(props.pdfData, 'result.table_data');
    return (
        <div id="pdfPage" style={{ display: 'none' }}>
            <div className="row" style={{ textAlign: 'center', paddingTop: '5%' }}>
                <img src={bannerImg} width="200" height="50" />
            </div>
            {_get(props.pdfData, 'result') &&
                <div>
                    <div className="bloomAddr-pdf">
                        <div>{bloomKonnectAddr.company_name}</div>
                        <div>{bloomKonnectAddr.company_street1}</div>
                        <div>{bloomKonnectAddr.company_street2}</div>
                        <div>{bloomKonnectAddr.city_region_pincode}</div>
                    </div>
                    <div className="pdf-invoice">
                        <h1>Invoice</h1>
                        <table>
                            <tr>
                                <td className="invoice-content">Inv Date</td>
                                <td>{_get(props.pdfData, 'result.inv_date')}</td>
                            </tr>
                            <tr>
                                <td className="invoice-content">Inv Number</td>
                                <td>{_get(props.pdfData, 'result.inv_number')}</td>
                            </tr>
                            <tr>
                                <td className="invoice-content"> SO Number</td>
                                <td>{_get(props.pdfData, 'result.so_number')}</td>
                            </tr>
                            <tr>
                                <td className="invoice-content">SO Date</td>
                                <td>{_get(props.pdfData, 'result.so_date')}</td>
                            </tr>
                        </table>
                    </div>


                    <div className="bill-to">
                        <div className="bill-to-content">
                            <div className="bill-to-head">Bill To</div>

                            <div className="bill-to-body">
                                <span>  {billAddr.billing_name}</span><br />
                                <span>   {billAddr.billing_street1}</span><br />
                                <span>   {billAddr.billing_street2}</span><br />
                                <span> {billAddr.city_region_pincode}</span><br />
                            </div>
                            <div className="bill-to-custcode">Cust code</div>
                            <div className="bill-to-custcode">{_get(props.pdfData, 'result.cust_code')}</div>
                        </div>
                    </div>
                    <div className="ship-to">

                        <div className="ship-to-head">Ship To</div>
                        <div className="ship-to-body">
                            <span>{shipAddr.shipping_name}</span>
                            <span>{shipAddr.shipping_street1}</span><br />
                            <span>{shipAddr.shipping_street2}</span><br />
                            <span>{shipAddr.city_region_pincode}</span><br />
                        </div>
                    </div>
                    <div className="pdf-order-detail">
                        <table>
                            <thead>

                                <th></th>
                                <th></th>
                                <th></th>
                                <th className="pdf-order-blank">Farm Ship</th>
                                <th className="pdf-order-blank">Truck Pickup</th>
                                <th className="pdf-order-blank">Delivery</th>

                                <tr className="pdf-order-head">
                                    <th>Product Name</th>
                                    <th>Vendor</th>
                                    <th>Ship Method</th>
                                    <th> Date</th>
                                    <th> Date</th>
                                    <th> Date</th>
                                    <th>Box</th>
                                    <th>UM</th>
                                    <th>Pack</th>
                                    <th>#Box</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Ext Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(orderTableData).map((thisData) => {
                                    return <tr>
                                        <td>{thisData[1].product_name}</td>
                                        <td>{thisData[1].vendor}</td>
                                        <td>{thisData[1].ship_method}</td>
                                        <td>{thisData[1].farm_ship_date}</td>
                                        <td>{thisData[1].truck_pickup_date}</td>
                                        <td>{thisData[1].delivery_date}</td>
                                        <td>{thisData[1].box}</td>
                                        <td>{thisData[1].um}</td>
                                        <td>{thisData[1].pack}</td>
                                        <td>{thisData[1]['#box']}</td>
                                        <td>{thisData[1].qty}</td>
                                        <td>{thisData[1].price}</td>
                                        <td>{thisData[1].ext_price}</td>
                                    </tr>;
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="box-summary">

                        <h5>*** BOX COUNT SUMMARY *** </h5>
                        <div className="box-summary-content">
                            <span>EB:{_get(props.pdfData, 'result.eb')}</span><br />
                            <span>HB:{_get(props.pdfData, 'result.hb')}</span><br />
                            <span>QB:{_get(props.pdfData, 'result.qb')}</span><br />
                            <span>FB:{_get(props.pdfData, 'result.fb')}</span><br />
                        </div>
                    </div>
                    <div className="pdf-total">
                        <table>
                            <tr>
                                <td>SUB-TOTAL</td>
                                <td>{_get(props.pdfData, 'result.sub_total')}</td>
                            </tr>
                            <tr>
                                <td>DISCOUNT</td>
                                <td>{_get(props.pdfData, 'result.discount')}</td>      </tr>
                            <tr>
                                <td>SHIP-FEE</td>
                                <td>{_get(props.pdfData, 'result.ship_fee')}</td>      </tr>
                            <tr>
                                <td>GRAND TOTAL </td>
                                <td>{_get(props.pdfData, 'result.grand_total')}</td>      </tr>
                        </table>
                    </div>
                </div>

            }
        </div>
    );
}

