import React, { Component } from 'react';
// import workinprogress from '../../assets/images/workinprogress.gif';
// import _get from 'lodash/get';
// import _isEmpty from 'lodash/isEmpty';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';

const options = {
    page: 1,  // which page you want to show as default
    sizePerPageList: [{
        text: '10', value: 10
    }, {
        text: '20', value: 20
    }], // you can change the dropdown list for size per page
    sizePerPage: 10,  // which size per page you want to locate as default
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3,  // the pagination bar 
    paginationPosition: 'bottom',  // default is bottom, top and both is all available
};

const paymentRefferenceColumn = (cell, row, enumObject, props) => (
    <span onClick={() => props.handleProfileIdClick(row)}>
        {cell}
    </span>
);

export default function RecuringProfileDataTable(props) {
    return (
        <BootstrapTable className="table" data={props.recuringProfile} pagination options={options} >
            <TableHeaderColumn dataAlign='center' width='20%' dataField='payment_referene_id' dataFormat={(cell, row, enumObject) => paymentRefferenceColumn(cell, row, enumObject, props)} isKey>Payment Reference ID</TableHeaderColumn>
            <TableHeaderColumn dataAlign='center' width='20%' dataField='profile_state'>Profile State</TableHeaderColumn>
            <TableHeaderColumn dataAlign='center' width='20%' dataField='created_at'>Created At</TableHeaderColumn>
            <TableHeaderColumn dataAlign='center' width='20%' dataField='updated_at'>Updated At</TableHeaderColumn>
            <TableHeaderColumn dataAlign='center' width='20%' dataField='payment_method'>Payment Method</TableHeaderColumn>
        </BootstrapTable>
    );
}