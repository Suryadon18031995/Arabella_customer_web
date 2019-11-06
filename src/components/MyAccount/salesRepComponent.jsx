import React from 'react';
import _get from 'lodash/get';
// import OneColumLeft from './OneColumnLeftMyAccount.jsx';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';

const salesRepInfoData = (cell, row, enumObject, props) => (
    <span onClick={() => props.handleClick(row)}>
        {cell}{}
    </span>
);

const salesRepStoreInfoData = (cell, row, enumObject, props) => (
    <span onClick={() => props.handleStoreClick(row)}>
        {cell}{}
    </span>
);

export default function SalesRepComponent(props) {
    // console.log('result',_get(props.state,'result'));
    let flag = 2;
    const salesRepLen = props.state.salesRepLen;
    if (_get(props.state.result, [0, 'name'])) {
          flag = 1;
    }
    return (
        <div className="container my-account">
            <div className='container-block'>

                <div className="em-col-main col-sm-12">
                    {salesRepLen > 0 ?
                        <div className="col-lg-6">

                            {flag == 1 ?
                                <div>
                                    <h1>Customer Salesrep:</h1>
                                    <BootstrapTable className="salesrep-table" data={_get(props.state, 'result')} >
                                        <TableHeaderColumn dataAlign='left' width='19%' dataField='name' dataFormat={(cell, row, enumObject) => salesRepInfoData(cell, row, enumObject, props)} isKey>Customer Name</TableHeaderColumn>
                                        <TableHeaderColumn dataAlign='left' width='15%' dataField='credit_limit'>Credit Limit</TableHeaderColumn>
                                        <TableHeaderColumn dataAlign='left' width='15%' dataField='balance_limit'>Balance Limit</TableHeaderColumn>
                                    </BootstrapTable>
                                </div> : <div>
                                    <h1>Choose Store:</h1>
                                    <BootstrapTable className="salesrep-table" data={_get(props.state, 'result')} >
                                        <TableHeaderColumn dataAlign='left' dataField='store_name' dataFormat={(cell, row, enumObject) => salesRepStoreInfoData(cell, row, enumObject, props)} isKey>Store Name</TableHeaderColumn>
                                    </BootstrapTable>
                                    <button className="get-update" onClick={ props.reload.bind(this) }>
                                        <span>Back</span>
                                    </button>
                                </div>

                            }
                        </div> : <div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
