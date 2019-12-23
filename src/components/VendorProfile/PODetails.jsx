import React from 'react';
import _isEmpty from 'lodash/isEmpty';

import MaModal from '../Common/MaterialUIModal.jsx';

const poDetails = props => {

    let modalBody = null;
    if(props.data.result && !_isEmpty(props.data.result)) {

        const tbody = [];
        for(const itemId in props.data.result) {
            const currentRow = props.data.result[itemId];
            const isChecked = (props.selectedItemIds[itemId] ? true : false);

            tbody.push(
                <tr key={ itemId }>
                    <td style={{ textAlign: 'center' }}>
                        <input type="checkbox" className="artist-checkbox" onChange={ (event) => props.manageSelectItems(event, itemId, currentRow['conf_box'], (props.confirmQty[itemId] ? props.confirmQty[itemId] : currentRow['conf_box'])) } checked={ isChecked } />
                    </td>
                    <td>{ currentRow['name'] }</td>
                    <td style={{ textAlign: 'center' }}>{ currentRow['box_count'] }</td>
                    <td style={{ textAlign: 'center' }}>
                        <input type="text" className="form-control" value={ (props.confirmQty[itemId] ? props.confirmQty[itemId] : currentRow['conf_box']) } onChange={ (event) => props.changeQtyHandler(event, itemId) } /></td>
                    <td style={{ textAlign: 'center' }}>{ currentRow['pack_size'] }</td>
                    <td style={{ textAlign: 'center' }}>{ currentRow['price'] }</td>
                </tr>
            );
        }

        modalBody = (
            <section>
                <section className="container-spacing" style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td></td>
                                <td>Name</td>
                                <td style={{ textAlign: 'center' }}>Qty</td>
                                <td style={{ textAlign: 'center' }}>Confirm Qty</td>
                                <td style={{ textAlign: 'center' }}>Qty Per Box</td>
                                <td style={{ textAlign: 'center' }}>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            { tbody }
                        </tbody>
                    </table>
                </section>
                <section className='container-spacing'>
                    <div className='row col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                        <button 
                            className="col-lg-6 btn btn-success btn-sm"
                            onClick={ props.click }
                        >
                            {props.title} Selected POs
                        </button>
                        <button 
                            className="col-lg-6 btn btn-danger btn-sm"
                            onClick={ props.closeModal }
                        >
                            Cancel
                        </button>
                    </div>
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
                    <h4>{ props.title }: { props.activePOs.join(', ') }</h4>
                </section>
                { modalBody }
            </section>
        </MaModal>
    );
}

export default poDetails;