import React from 'react';
import { Route } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';

import OrderManagementTabs from '../../components/VendorProfile/OrderManagementTabs.jsx';
import OrderManagementTable from '../../components/VendorProfile/OrderManagementTable.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import * as vendorActions from '../../actions/vendorArtist';

class OrderManagement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {  
            newData: {
                "319_8_171120": {
                    "ord_incr_id": "100000241",
                    "po_num": "319_8_171120",
                    "item_status": "processing",
                    "pickup_date": "2019-11-22",
                    "item_id": "562",
                    "qty_ord": 4,
                    "acc_qty": 4,
                    "ven_city": "Bogota",
                    "deli_meth": "K&N_Florida Beauty",
                    "subscr": "0",
                    "ord_id": "319",
                    "store_name": null,
                    "ship_flag": "yes"
                },
                "318_8_171120": {
                    "ord_incr_id": "100000240",
                    "po_num": "318_8_171120",
                    "item_status": "processing",
                    "pickup_date": "2019-11-21",
                    "item_id": "561",
                    "qty_ord": 2,
                    "acc_qty": 2,
                    "ven_city": "Bogota",
                    "deli_meth": "K&N_Florida Beauty",
                    "subscr": "0",
                    "ord_id": "318",
                    "store_name": null,
                    "ship_flag": "yes"
                }
            },
            shippingTodayData: {

            },
            pastFutureData: {
                "431_8_171213_1": {
                    "ord_incr_id": "100000317",
                    "po_num": "431_8_171213_1",
                    "item_status": "ready_to_ship",
                    "pickup_date": "2019-11-21",
                    "item_id": "716",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "K&N_Florida Beauty",
                    "subscr": "0",
                    "ord_id": "431",
                    "store_name": "Boonstle Inc",
                    "ship_flag": "yes"
                },
                "431_274_171213_7": {
                    "ord_incr_id": "100000317",
                    "po_num": "431_274_171213_7",
                    "item_status": "ready_to_ship",
                    "pickup_date": "2019-11-22",
                    "item_id": "717",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 2",
                    "subscr": "0",
                    "ord_id": "431",
                    "store_name": "Boonstle Inc",
                    "ship_flag": "yes"
                }
            },
            rejectedData: {
                "448_274_171215_8": {
                    "ord_incr_id": "100000319",
                    "po_num": "448_274_171215_8",
                    "item_status": "reject",
                    "pickup_date": "2017-12-15",
                    "item_id": "735",
                    "qty_ord": 2,
                    "acc_qty": 2,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 3",
                    "subscr": "0",
                    "ord_id": "448",
                    "store_name": "Flower Station",
                    "ship_flag": "yes"
                }
            },
            completeData: {
                "431_8_171213_1": {
                    "ord_incr_id": "100000317",
                    "po_num": "431_8_171213_1",
                    "item_status": "complete",
                    "pickup_date": "2017-12-13",
                    "item_id": "718",
                    "qty_ord": 2,
                    "acc_qty": 2,
                    "ven_city": "Bogota",
                    "deli_meth": "K&N_Florida Beauty",
                    "subscr": "0",
                    "ord_id": "431",
                    "store_name": "Boonstle Inc",
                    "ship_flag": "yes"
                }
            },
            shippedData: {
                "453_274_171215_8": {
                    "ord_incr_id": "100000324",
                    "po_num": "453_274_171215_8",
                    "item_status": "shipped",
                    "pickup_date": "2017-12-15",
                    "item_id": "746",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 3",
                    "subscr": "0",
                    "ord_id": "453",
                    "ship_flag": "yes",
                    "store_name": "Flower Station",
                    "cust_name": "Stephen Romito"
                }
            },
            invoicedData: {
                "459_274_171216_8": {
                    "ord_incr_id": "100000330",
                    "po_num": "459_274_171216_8",
                    "item_status": "invoiced",
                    "pickup_date": "2017-12-16",
                    "item_id": "757",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 3",
                    "subscr": "0",
                    "ord_id": "459",
                    "cust_name": "Vanessa Kutrubis",
                    "tot_cost": 40,
                    "charge_amt": 0,
                    "tot_inv": 40,
                    "store_name": "Studio 9 Events",
                    "ref_num": "70953"
                },
                "455_274_171215_8": {
                    "ord_incr_id": "100000326",
                    "po_num": "455_274_171215_8",
                    "item_status": "invoiced",
                    "pickup_date": "2017-12-15",
                    "item_id": "750",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 3",
                    "subscr": "0",
                    "ord_id": "455",
                    "cust_name": "Doug Glomb",
                    "tot_cost": 28,
                    "charge_amt": 0,
                    "tot_inv": 28,
                    "store_name": "Chalet Floral and Events",
                    "ref_num": "70938"
                }
            },
            allData: {
                "459_274_171216_8": {
                    "ord_incr_id": "100000330",
                    "po_num": "459_274_171216_8",
                    "item_status": "invoiced",
                    "pickup_date": "2017-12-16",
                    "item_id": "757",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 3",
                    "subscr": "0",
                    "ord_id": "459",
                    "store_name": "Studio 9 Events",
                    "ship_flag": "yes"
                },
                "455_274_171215_8": {
                    "ord_incr_id": "100000326",
                    "po_num": "455_274_171215_8",
                    "item_status": "invoiced",
                    "pickup_date": "2017-12-15",
                    "item_id": "750",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 3",
                    "subscr": "0",
                    "ord_id": "455",
                    "store_name": "Chalet Floral and Events",
                    "ship_flag": "yes"
                },
                "453_274_171215_8": {
                    "ord_incr_id": "100000324",
                    "po_num": "453_274_171215_8",
                    "item_status": "shipped",
                    "pickup_date": "2017-12-15",
                    "item_id": "746",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 3",
                    "subscr": "0",
                    "ord_id": "453",
                    "store_name": "Flower Station",
                    "ship_flag": "yes"
                },
                "431_8_171213_1": {
                    "ord_incr_id": "100000317",
                    "po_num": "431_8_171213_1",
                    "item_status": "complete",
                    "pickup_date": "2017-12-13",
                    "item_id": "718_716",
                    "qty_ord": 3,
                    "acc_qty": 3,
                    "ven_city": "Bogota",
                    "deli_meth": "K&N_Florida Beauty",
                    "subscr": "0",
                    "ord_id": "431",
                    "store_name": "Boonstle Inc",
                    "ship_flag": "yes"
                },
                "431_274_171213_7": {
                    "ord_incr_id": "100000317",
                    "po_num": "431_274_171213_7",
                    "item_status": "ready_to_ship",
                    "pickup_date": "2019-11-22",
                    "item_id": "717",
                    "qty_ord": 1,
                    "acc_qty": 1,
                    "ven_city": "Bogota",
                    "deli_meth": "UPS Worldwide 2",
                    "subscr": "0",
                    "ord_id": "431",
                    "store_name": "Boonstle Inc",
                    "ship_flag": "yes"
                },
                "319_8_171120": {
                    "ord_incr_id": "100000241",
                    "po_num": "319_8_171120",
                    "item_status": "processing",
                    "pickup_date": "2019-11-22",
                    "item_id": "562",
                    "qty_ord": 4,
                    "acc_qty": 4,
                    "ven_city": "Bogota",
                    "deli_meth": "K&N_Florida Beauty",
                    "subscr": "0",
                    "ord_id": "319",
                    "store_name": null,
                    "ship_flag": "yes"
                },
                "318_8_171120": {
                    "ord_incr_id": "100000240",
                    "po_num": "318_8_171120",
                    "item_status": "processing",
                    "pickup_date": "2019-11-21",
                    "item_id": "561",
                    "qty_ord": 2,
                    "acc_qty": 2,
                    "ven_city": "Bogota",
                    "deli_meth": "K&N_Florida Beauty",
                    "subscr": "0",
                    "ord_id": "318",
                    "store_name": null,
                    "ship_flag": "yes"
                }
            },
            tableHeaders: {
                newPOs: {
                    'Select': {
                        type: 'checkbox',
                        change: this.manageCheckboxHandler
                    }, 
                    'PO Number': 'object_key', 
                    'Customer Store Name': 'store_name', 
                    'Farm Ship Date': 'pickup_date', 
                    'Number of Boxes': 'qty_ord', 
                    'Status': 'item_status', 
                    'Confirm PO': {
                        type: 'button',
                        text: 'Confirm',
                        class: 'btn btn-sm btn-success',
                        click: this.confirmPOHandler
                    }, 
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth'
                },
                shippingToday: {
                    'Select': {
                        type: 'checkbox',
                        change: this.manageCheckboxHandler
                    }, 
                    'PO Number': 'object_key', 
                    'Customer Store Name': 'store_name', 
                    'Farm Ship Date': 'pickup_date', 
                    'Number of Boxes': 'qty_ord', 
                    'Reject PO': {
                        type: 'button',
                        text: 'Reject',
                        class: 'btn btn-sm btn-danger',
                        click: this.rejectPOHandler
                    },
                    'Status': 'item_status', 
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth',
                    'Move to Ship': {
                        text: 'Move to Ship',
                        class: 'btn btn-sm btn-info',
                        click: this.movePOToShipHandler
                    },
                },
                pastFuture: {
                    'Select': {
                        type: 'checkbox',
                        change: this.manageCheckboxHandler
                    }, 
                    'PO Number': 'object_key', 
                    'Customer Store Name': 'store_name', 
                    'Farm Ship Date': 'pickup_date', 
                    'Number of Boxes': 'qty_ord',
                    'Reject PO': {
                        type: 'button',
                        text: 'Reject',
                        class: 'btn btn-sm btn-danger',
                        click: this.rejectPOHandler
                    }, 
                    'Status': 'item_status', 
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth',
                    'Move to Ship': {
                        type: 'button',
                        text: 'Move to Ship',
                        class: 'btn btn-sm btn-info',
                        click: this.movePOToShipHandler
                    },
                },
                rejected: { 
                    'PO Number': 'object_key', 
                    'Customer Store Name': 'store_name', 
                    'Farm Ship Date': 'pickup_date', 
                    'Number of Boxes': 'qty_ord',
                    'Status': 'item_status', 
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth',
                },
                complete: { 
                    'Select': {
                        type: 'checkbox',
                        change: this.manageCheckboxHandler
                    }, 
                    'PO Number': 'object_key', 
                    'Customer Store Name': 'store_name', 
                    'Farm Ship Date': 'pickup_date', 
                    'Number of Boxes': 'qty_ord',
                    'Reject PO': {
                        type: 'button',
                        text: 'Reject',
                        class: 'btn btn-sm btn-danger',
                        click: this.rejectPOHandler
                    },
                    'Status': 'item_status', 
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth',
                    'Move to Ship': {
                        type: 'button',
                        text: 'Move to Ship',
                        class: 'btn btn-sm btn-info',
                        click: this.movePOToShipHandler
                    },
                },
                shipped: { 
                    'Select': {
                        type: 'checkbox',
                        change: this.manageCheckboxHandler
                    }, 
                    'PO Number': 'object_key', 
                    'Customer Store Name': 'store_name', 
                    'Farm Ship Date': 'pickup_date', 
                    'Number of Boxes': 'qty_ord',
                    'Reject PO': {
                        type: 'button',
                        text: 'Reject',
                        class: 'btn btn-sm btn-danger',
                        click: this.rejectPOHandler
                    },
                    'Status': 'item_status', 
                    'Assign PO': '',
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth',
                },
                invoiced: { 
                    'PO Number': 'object_key', 
                    'Customer Store Name': 'store_name', 
                    'Farm Ship Date': 'pickup_date', 
                    'Total Cost': 'tot_cost',
                    'Total Add Charge': 'charge_amt',
                    'Total Invoiced Amount': 'tot_inv',
                    'Reference': 'ref_num',   
                    'Location': 'ven_city', 
                    'PO': '',
                    'Customer Name': 'cust_name',
                    'More Details': {
                        type: 'button',
                        text: 'View More',
                        class: 'btn btn-sm btn-info',
                        click: () => { console.log('view more') }
                    },
                },
                all: { 
                    'PO Number': 'object_key', 
                    'Customer Store Name': 'store_name', 
                    'Farm Ship Date': 'pickup_date', 
                    'Number of Boxes': 'qty_ord',
                    'Status': 'item_status', 
                    'PO': '',
                    'Location': 'ven_city',
                }
            },
            buttons: {
                newPOs: {
                    'Confirm Multiple POs': {
                        key: 'cmp',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.confirmPOHandler
                    }
                },
                shippingToday: {
                    'Move Multiple POs to Ship': {
                        key: 'mmpts',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.movePOToShipHandler
                    },
                    'Reject Multiple POs': {
                        key: 'rmp',
                        class: 'btn btn-sm btn-outline-danger',
                        style: { marginRight: '10px' },
                        click: this.rejectPOHandler
                    }
                },
                pastFuture: {
                    'Move Multiple POs to Ship': {
                        key: 'mmpts',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.movePOToShipHandler
                    },
                    'Reject Multiple POs': {
                        key: 'rmp',
                        class: 'btn btn-sm btn-outline-danger',
                        style: { marginRight: '10px' },
                        click: this.rejectPOHandler
                    }
                },
                rejected: {

                },
                complete: {
                    'Move Multiple POs to Ship': {
                        key: 'mmpts',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.movePOToShipHandler
                    },
                    'Reject Multiple POs': {
                        key: 'rmp',
                        class: 'btn btn-sm btn-outline-danger',
                        style: { marginRight: '10px' },
                        click: this.rejectPOHandler
                    }
                },
                shipped: {
                    'Invoice Multiple POs': {
                        key: 'imp',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.movePOToShipHandler
                    },
                    'Reject Multiple POs': {
                        key: 'rmp',
                        class: 'btn btn-sm btn-outline-danger',
                        style: { marginRight: '10px' },
                        click: this.rejectPOHandler
                    }
                },
                invoiced: {

                },
                all: {

                }
            },
            tab: 'newPOs',
            status: {
                newPOs: 'processing',
                shippingToday: 'today_pickup',
                rejected: 'rejected',
                pastFuture: 'future_pickup',
                complete: 'complete',
                shipped: 'shipped',
                invoiced: 'invoiced',
                all: 'all'
            },
            checked: []
        }
    }

    componentDidMount() {
        this.props.getPOManagementDetails({
            artistId: 441,
            status: this.state.status[this.state.tab]
        });
    }

    manageCheckboxHandler = (event, tab, po) => {

        this.setState(prevState => {

            const checked = (prevState.tab === tab ? [...this.state.checked] : []);
            const index = checked.indexOf(po);
            
            if(index === -1)
                checked.push(po);
            else
                checked.splice(index, 1);

            return {
                checked,
                tab
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        
        // to clear the selected po on change of tab
        if(prevProps.location.pathname !== this.props.location.pathname) {
            
            const tab = this.props.location.pathname.split('/')[3];
            this.setState({
                checked: [],
                tab: tab
            });

            this.props.getPOManagementDetails({
                artistId: 441,
                status: this.state.status[tab]
            });
        }
    }

    confirmPOHandler = (pos) => {
        console.log('confirm', pos);
    }

    rejectPOHandler = (pos) => {
        console.log('reject', pos);
    }

    movePOToShipHandler = (pos) => {
        console.log('move', pos);
    }

    render() {

        const poData = (this.props.data.code === 1 ? this.props.data.result : {});

        return (
            <section>
                <OrderManagementTabs />
                <Route 
                    path={`${this.props.match.path}/newPOs`} 
                    exact 
                    component={ () => <OrderManagementTable data={poData} tableHeaders={this.state.tableHeaders.newPOs} buttons={this.state.buttons.newPOs} checked={this.state.checked} tab="newPOs" /> } 

                />
                <Route 
                    path={`${this.props.match.path}/shippingToday`} 
                    exact 
                    component={ () => <OrderManagementTable data={this.state.shippingTodayData} tableHeaders={this.state.tableHeaders.shippingToday} buttons={this.state.buttons.shippingToday} checked={this.state.checked} tab="shippingToday" /> } 

                />
                <Route 
                    path={`${this.props.match.path}/pastFuture`} 
                    exact 
                    component={ () => <OrderManagementTable data={poData} tableHeaders={this.state.tableHeaders.pastFuture} buttons={this.state.buttons.pastFuture} checked={this.state.checked} tab="pastFuture" /> } 

                />
                <Route 
                    path={`${this.props.match.path}/rejected`} 
                    exact 
                    component={ () => <OrderManagementTable data={poData} tableHeaders={this.state.tableHeaders.rejected} buttons={this.state.buttons.rejected} checked={this.state.checked} tab="rejected" /> } 

                />
                <Route 
                    path={`${this.props.match.path}/complete`} 
                    exact 
                    component={ () => <OrderManagementTable data={poData} tableHeaders={this.state.tableHeaders.complete} buttons={this.state.buttons.complete} checked={this.state.checked} tab="complete" /> } 

                />
                <Route 
                    path={`${this.props.match.path}/shipped`} 
                    exact 
                    component={ () => <OrderManagementTable data={poData} tableHeaders={this.state.tableHeaders.shipped} buttons={this.state.buttons.shipped} checked={this.state.checked} tab="shipped" /> } 

                />
                <Route 
                    path={`${this.props.match.path}/invoiced`} 
                    exact 
                    component={ () => <OrderManagementTable data={poData} tableHeaders={this.state.tableHeaders.invoiced} buttons={this.state.buttons.invoiced} checked={this.state.checked} tab="invoiced" /> } 

                />
                <Route 
                    path={`${this.props.match.path}/all`} 
                    exact 
                    component={ () => <OrderManagementTable data={poData} tableHeaders={this.state.tableHeaders.all} buttons={this.state.buttons.all} checked={this.state.checked} tab="all" /> } 

                />
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getPOManagementDetails: data => dispatch(vendorActions.fetchPOManagementDetails(data)),
});
  
const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        data,
        isFetching: isLoading,
        error: vendorArtistError,
    } = vendorArtistsReducer || [];

  
    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        data,
        isLoading,
        error
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ErrorHandler(OrderManagement));