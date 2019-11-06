// eslint-disable-next-line no-unused-vars
import React from 'react';
// import moment from 'moment';
import _get from 'lodash/get';
// import _isEmpty from 'lodash/isEmpty';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';

const statusColumn = cell => (<span>{cell === '1' ? 'Active' : 'Inactive'}</span>);

const priceFormat = cell => (<span>$ {Number(cell).toFixed(2)}</span>);

export default function PrimeMembership(props) {
    return (
        <React.Fragment>
            <h1 className='text-center'>My Premium Membership History</h1>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <BootstrapTable data={_get(props, 'primeOrderData.orders', [])} bordered={false} sortIndicator search pagination>
                            <TableHeaderColumn dataSort
                                dataAlign='center' width='15%'
                                dataField='orderId' isKey
                                >
                                Order #
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort
                                dataAlign='center' width='25%'
                                dataField='name'
                                >
                                Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort
                                dataAlign='right' width='10%'
                                dataField='price'
                                dataFormat={priceFormat}
                                >
                                Price
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort
                                dataAlign='center' width='25%'
                                dataField='createdAt'
                                >
                                Order Date
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataAlign='center' width='15%'
                                dataField='active'
                                dataFormat={statusColumn}>
                                Status
                            </TableHeaderColumn>
                        </BootstrapTable>
            </div>
            <div><button className='btn btn-default' onClick={props.handleGoBack}>Back</button></div>
        </React.Fragment>
    );
}
