import React from 'react';
import _isEmpty from 'lodash/isEmpty';

import MaModal from '../Common/MaterialUIModal.jsx';

const raiseInvoiceModal = props => {

    let modalBody = null;
    const itemIds = [];
    if(props.data.result && !_isEmpty(props.data.result)) {

        const tbody = [];
        for(const itemId in props.data.result) {
            const currentRow = props.data.result[itemId];
            if(itemIds.indexOf(itemId) === -1) itemIds.push(itemId);
            tbody.push(
                <tr key={ itemId }>
                    <td>{ currentRow['prod_name'] }</td>
                    <td style={{ textAlign: 'center' }}>{ currentRow['acc_qty'] }</td>
                    <td style={{ textAlign: 'center' }}>{ currentRow['pack_size'] }</td>
                    <td style={{ textAlign: 'center' }}>{ currentRow['cost_per_stem'] }</td>
                    <td style={{ textAlign: 'center' }}>{ currentRow['tot_cost'] }</td>
                </tr>
            );
        }

        modalBody = (
            <section>
                <section className="container-spacing">
                    <div className="row">
                        <div className='col-lg-3'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Type of Product</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <select className="form-control" name="charge_type" value={ props.inputs.chargeType } onChange={ (event) => props.changeInputs(event, 'chargeType') }>
                                    <option value="" defaultValue="selected">* Select Charge Type </option>
                                    <option value="BS">Box Surcharge</option>
                                    <option value="LS">Freight Surcharge</option>
                                    <option value="FS">Fuel Surcharge</option>
                                    <option value="HS">Holilday Surcharge</option>
                                    <option value="PS">Packaging Surcharge</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Charge Amount</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input type="text" className="form-control" name="charge_amount" value={ props.inputs.chargeAmount } onChange={ (event) => props.changeInputs(event, 'chargeAmount') } />
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Reference Number</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input type="text" className="form-control" name="reference_number" value={ props.inputs.globalRef } onChange={ (event) => props.changeInputs(event, 'globalRef') } />
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Invoice Date</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input type="text" className="form-control" name="invoice_date" value={ props.inputs.globalInvDate } onChange={ (event) => props.changeInputs(event, 'globalInvDate') } />
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label></label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <button className="btn btn-sm btn-outline-info mx-2" onClick={ props.raiseInvoice.bind(null, itemIds) }>Raise Invoice</button>
                                <button className="btn btn-sm btn-outline-warning mx-2" onClick={ props.closeModal }>Close</button>
                            </div>
                        </div>
                    </div>
                </section>  
                <section className="container-spacing" style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>Product Name</td>
                                <td style={{ textAlign: 'center' }}>Qty</td>
                                <td style={{ textAlign: 'center' }}>Qty Per Box</td>
                                <td style={{ textAlign: 'center' }}>Cost</td>
                                <td style={{ textAlign: 'center' }}>Ext Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                            { tbody }
                        </tbody>
                    </table>
                </section>
            </section>
        );
    }
    else {
        modalBody = (
            <section>
                <h4>No Data Found</h4>
            </section>
        );
    }

    return (
        <MaModal open={ props.showModal } handleCloseModal={ props.showModal } extraStyle={{ width: '80%' }}>
            <section>
                <section style={{ borderBottom: '1px solid #000' }}>
                    <h4>Assign Invoice Multiple POs</h4>
                </section>
                { modalBody }
            </section>
        </MaModal>
    );
}

export default raiseInvoiceModal;