import React from 'react';
import _get from 'lodash/get';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import moment from 'moment';

const dateColumn = cell => (<span>{moment(cell).format('MMM DD, YYYY hh:mm A')}</span>);

export default function PointTransactions(props) {
    return (
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <BootstrapTable data={_get(props, 'rewardsData.recent_transactions', [])} bordered={false} sortIndicator search pagination>
                            <TableHeaderColumn
                                dataAlign='center' width='5%'
                                dataField='transaction_id' isKey
                                >
                                 #
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataAlign='center' width='25%'
                                dataField='title'
                                thStyle={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                }}
                                tdStyle={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                }}
                                >
                                Action
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataAlign='right' width='10%'
                                dataField='point_amount'
                                // dataFormat={priceFormat}
                                thStyle={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                }}
                                tdStyle={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                }}
                                >
                                Point Balance Change
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataAlign='center' width='10%'
                                dataField='created_time'
                                thStyle={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                }}
                                tdStyle={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                }}
                                dataFormat={dateColumn}
                                >
                                Creation Date
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataAlign='center' width='10%'
                                dataField='expiration_date'
                                // dataFormat={statusColumn}
                                thStyle={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                }}
                                tdStyle={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                }}
                                >
                                Expiration Date
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataAlign='center' width='10%'
                                dataField='status'
                                // dataFormat={statusColumn}
                                >
                                Status
                            </TableHeaderColumn>
                        </BootstrapTable>
            </div>
    );
}
