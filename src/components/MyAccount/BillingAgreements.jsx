// eslint-disable-next-line no-unused-vars
import React from 'react';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';

const viewColumn = (cell, row, enumObject, index) => (
    <span>
        View
    </span>
);

export default function BillingAgreementTable(props) {
    return (
        <div>
            <BootstrapTable className="table-large" data={props.data}>
                <TableHeaderColumn
                    dataAlign='center' width='20%'
                    dataField='refId' isKey>
                    Reference ID
                    </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center' width='10%'
                    dataField='status'>
                    Status
                    </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center' width='20%'
                    dataField='createdAt'>
                    Created At
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center' width='20%'
                    dataField='updatedAt'>
                    Updated At
                    </TableHeaderColumn>
                    <TableHeaderColumn
                    dataAlign='center' width='20%'
                    dataField='pMethod'>
                    Payment Method
                    </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center' width='10%'
                    dataFormat={(cell, row, enumObject, index) => viewColumn(cell, row, enumObject, index)}>
                    </TableHeaderColumn>
            </BootstrapTable>
        </div>
    );
}
