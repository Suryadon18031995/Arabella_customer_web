import React from 'react';
import { Route } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';

import OrderManagementTabs from '../../components/VendorProfile/OrderManagementTabs.jsx';
import OrderManagementTable from '../../components/VendorProfile/OrderManagementTable.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import * as vendorActions from '../../actions/vendorArtist';
import PODetails from '../../components/VendorProfile/PODetails.jsx';
import RaiseInvoiceModal from '../../components/VendorProfile/RaiseInvoiceModal.jsx';

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
                        click: this.poClickHandler
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
                        click: this.poClickHandler
                    },
                    'Status': 'item_status', 
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth',
                    'Move to Ship': {
                        text: 'Move to Ship',
                        class: 'btn btn-sm btn-info',
                        click: this.poClickHandler
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
                        click: this.poClickHandler
                    }, 
                    'Status': 'item_status', 
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth',
                    'Move to Ship': {
                        type: 'button',
                        text: 'Move to Ship',
                        class: 'btn btn-sm btn-info',
                        click: this.poClickHandler
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
                        click: this.poClickHandler
                    },
                    'Status': 'item_status', 
                    'PO': 'po_num', 
                    'Location': 'ven_city', 
                    'Shipping Method': 'deli_meth',
                    'Move to Ship': {
                        type: 'button',
                        text: 'Move to Ship',
                        class: 'btn btn-sm btn-info',
                        click: this.poClickHandler
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
                        click: this.poClickHandler
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
                        click: this.poClickHandler.bind(null, 'Confirm'),
                    }
                },
                shippingToday: {
                    'Move Multiple POs to Ship': {
                        key: 'mmpts',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.poClickHandler.bind(null, 'Move to Ship'),
                    },
                    'Reject Multiple POs': {
                        key: 'rmp',
                        class: 'btn btn-sm btn-outline-danger',
                        style: { marginRight: '10px' },
                        click: this.poClickHandler.bind(null, 'Reject'),
                    }
                },
                pastFuture: {
                    'Move Multiple POs to Ship': {
                        key: 'mmpts',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.poClickHandler.bind(null, 'Move to Ship'),
                    },
                    'Reject Multiple POs': {
                        key: 'rmp',
                        class: 'btn btn-sm btn-outline-danger',
                        style: { marginRight: '10px' },
                        click: this.poClickHandler.bind(null, 'Reject'),
                    }
                },
                rejected: {

                },
                complete: {
                    'Move Multiple POs to Ship': {
                        key: 'mmpts',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.poClickHandler.bind(null, 'Move to Ship'),
                    },
                    'Reject Multiple POs': {
                        key: 'rmp',
                        class: 'btn btn-sm btn-outline-danger',
                        style: { marginRight: '10px' },
                        click: this.poClickHandler.bind(null, 'Reject'),
                    }
                },
                shipped: {
                    'Invoice Multiple POs': {
                        key: 'imp',
                        class: 'btn btn-sm btn-outline-info',
                        style: { marginRight: '10px' },
                        click: this.invoiceMultiplePOsHandler,
                    },
                    'Reject Multiple POs': {
                        key: 'rmp',
                        class: 'btn btn-sm btn-outline-danger',
                        style: { marginRight: '10px' },
                        click: this.poClickHandler.bind(null, 'Reject'),
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
            checked: [],
            showModal: false,
            showInvoiceModal: false,
            modalTitle: '',
            activePOs: '',
            selectedItemIds: {},
            confirmQty: {},
            raiseInvoiceInputs: {
                artistId: '',
                globalRef: '',
                globalInvDate: '',
                chargeAmount: '',
                chargeType: ''
            },
            defaultRaiseInvoiceInputs: {
                artistId: '',
                globalRef: '',
                globalInvDate: '',
                chargeAmount: '',
                chargeType: ''
            },
            artistId: ''
        }
    }

    componentDidMount() {

        const artistDetails = this.props.artistDetails;
        if(artistDetails.code === 1) {
            const tab = this.props.location.pathname.split('/')[3];
            this.props.getPOManagementDetails({
                artistId: artistDetails.result.vendor_id,
                tab: tab,
                status: this.state.status[tab]
            });
            this.setState({
                artistId: artistDetails.result.vendor_id,
                raiseInvoiceInputs: {...this.state.raiseInvoiceInputs, artistId: artistDetails.result.vendor_id},
                defaultRaiseInvoiceInputs: {...this.state.defaultRaiseInvoiceInputs, artistId: artistDetails.result.vendor_id},
            });
        }
        else {
            this.props.history.replace('/artist/login');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
        // to clear the selected po on change of tab
        if((prevProps.location.pathname !== this.props.location.pathname) || (prevProps.poStatusUpdating && !this.props.poStatusUpdating) || (prevProps.raisingInvoice && !this.props.raisingInvoice)) {

            const tab = this.props.location.pathname.split('/')[3];
            this.setState({
                checked: [],
                tab: tab,
                showModal: false,
                modalTitle: '',
                activePOs: '',
                selectedItemIds: {},
                confirmQty: {}
            });

            this.props.getPOManagementDetails({
                artistId: this.state.artistId,
                status: this.state.status[tab]
            });
        }
    }

    manageCheckboxHandler = (event, tab, po) => {
        console.log('manageCheckboxHandler');
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

    poClickHandler = (type, pos = this.state.checked) => {

        console.log(type, pos)
        console.log('confirmPOHandler');
        const itemIds = pos.map(po => this.props.data.result[po]['item_id']).join(',');
        
        if(itemIds.length > 0) {
            this.props.poDetails({ itemIds: itemIds });
            this.setState({
                showModal: true,
                modalTitle: type,
                activePOs: pos,
                selectedItemIds: {},
                confirmQty: {}
            })
        }
        else {
            alert(`Please Select POs to ${type}`);
        }
    }

    poActionHandler = () => {
        console.log('confirmSelectedPOs');

        let type = '';
        switch(this.state.modalTitle) {
            case 'Confirm': type = 'confirm'; break;
            case 'Reject': type = 'reject'; break;
            case 'Move to Ship': type = 'ship'; break;
        }

        const itemIds = Object.keys(this.state.selectedItemIds);

        if(itemIds.length > 0) {
            console.log('API DATA', {
                artistId: this.state.artistId,
                type: type,
                itemIds: itemIds.join(','),
                itemData: itemIds.map(itemId => this.state.selectedItemIds[itemId])
            });
            // this.props.poAction({
            //     artistId: this.state.artistId,
            //     type: type,
            //     itemIds: itemIds.join(','),
            //     itemData: itemIds.map(itemId => this.state.selectedItemIds[itemId])
            // });
            this.setState({
                showModal: false,
                showInvoiceModal: false,
                modalTitle: '',
                activePOs: '',
                selectedItemIds: {},
                confirmQty: {}
            });
        }
        else {
            alert(`Please Select Items to ${this.state.modalTitle}`);
        }
    }

    invoiceMultiplePOsHandler = () => {

        const itemIds = this.state.checked.map(po => this.props.data.result[po]['item_id']).join(',');
        
        if(itemIds.length > 0) {
            this.props.getRaiseVendorInvoiceDetails({ itemIds: itemIds });
            this.setState({
                showModal: false,
                showInvoiceModal: true,
                modalTitle: '',
                activePOs: '',
                selectedItemIds: {},
                confirmQty: {}
            });
        }
        else {
            alert(`Please Select POs to Raise Invoice`);
        }
    }

    raiseInvoiceInputsChangeHandler = (event, type) => {

        console.log('raiseInvoiceInputsChangeHandler', event.target.value, type);
        const raiseInvoiceInputs = {...this.state.raiseInvoiceInputs};
        raiseInvoiceInputs[type] = event.target.value;
        this.setState({
            raiseInvoiceInputs
        })
    }

    raiseInvoieHandler = (itemIds) => {
        
        const inputValues = this.state.raiseInvoiceInputs;
        const itemInvData = itemIds.map(itemId => ({ item_id: itemId, ref_num: inputValues.globalRef, inv_date: inputValues.globalInvDate }))

        console.log('raiseInvoieHandler', {
            ...inputValues,
            itemIds: itemIds.join(','),
            itemInvData
        });
        this.props.raiseVendorInvoice({
            ...inputValues,
            itemIds: itemIds.join(','),
            itemInvData
        });
        this.setState({
            showModal: false,
            showInvoiceModal: false,
            modalTitle: '',
            activePOs: '',
            selectedItemIds: {},
            confirmQty: {},
            raiseInvoiceInputs: {...this.state.defaultRaiseInvoiceInputs }
        });
    }

    closeModal = () => {
        
        this.setState({
            showModal: false,
            showInvoiceModal: false,
            modalTitle: '',
            activePOs: '',
            selectedItemIds: {},
            confirmQty: {},
            raiseInvoiceInputs: {...this.state.defaultRaiseInvoiceInputs }
        });
    }

    manageSelectItems = (event, itemId, actualQty, confirmQty) => {

        if(event.target.checked) {
            const selectedItemIds = {...this.state.selectedItemIds};
            selectedItemIds[itemId] = { item_id: itemId, actual_qty: actualQty, accepting_qty: confirmQty }
            this.setState({
                selectedItemIds,
            });
        }
        else {
            const selectedItemIds = {...this.state.selectedItemIds};
            delete selectedItemIds[itemId]
            this.setState({
                selectedItemIds,
            });
        }
    }

    changeQtyHandler = (event, itemId) => {

        const value = event.target.value;
        const confirmQty = {...this.state.confirmQty};
        confirmQty[itemId] = value;

        const selectedItemIds = {...this.state.selectedItemIds};
        if(selectedItemIds[itemId]) selectedItemIds[itemId] = { ...selectedItemIds[itemId], accepting_qty: value };

        this.setState({
            confirmQty,
            selectedItemIds
        })
    }

    render() {

        const poData = (this.props.data.code === 1 ? this.props.data.result : {});
        
        let poDetailsModal = null;
        if(this.state.showModal) {
            poDetailsModal = (
                <PODetails 
                    data={ this.props.poData }
                    showModal={ this.state.showModal }           
                    activePOs={ this.state.activePOs }
                    selectedItemIds={ this.state.selectedItemIds }
                    confirmQty={ this.state.confirmQty }
                    closeModal={ this.closeModal }
                    manageSelectItems={ this.manageSelectItems }
                    changeQtyHandler={ this.changeQtyHandler }
                    title={ this.state.modalTitle }
                    click={ this.poActionHandler }
                />
            );
        }

        let showInvoiceModal = null;
        if(this.state.showInvoiceModal && !this.props.fetchingRID) {
            showInvoiceModal = (
                <RaiseInvoiceModal 
                    showModal={ this.state.showInvoiceModal }
                    closeModal={ this.closeModal }
                    data={ this.props.ridData }
                    inputs={ this.state.raiseInvoiceInputs }
                    changeInputs={ this.raiseInvoiceInputsChangeHandler }
                    closeModal={ this.closeModal }
                    raiseInvoice={ this.raiseInvoieHandler }
                />
            );
        }

        return (
            <section>
                <OrderManagementTabs />
                { poDetailsModal }
                { showInvoiceModal }
                <Route 
                    path={`${this.props.match.path}/newPOs`} 
                    exact 
                    component={ () => (
                        <OrderManagementTable 
                            data={poData} 
                            tableHeaders={this.state.tableHeaders.newPOs} 
                            buttons={this.state.buttons.newPOs} 
                            checked={this.state.checked} 
                            tab="newPOs"
                            loading={ this.props.isLoading || this.props.fetchingRID }
                        />)
                    } 

                />
                <Route 
                    path={`${this.props.match.path}/shippingToday`} 
                    exact 
                    component={ () => (
                        <OrderManagementTable 
                            data={this.state.shippingTodayData} 
                            tableHeaders={this.state.tableHeaders.shippingToday} 
                            buttons={this.state.buttons.shippingToday} 
                            checked={this.state.checked} 
                            tab="shippingToday" 
                            loading={ this.props.isLoading || this.props.fetchingRID }
                        />) 
                    } 
                />
                <Route 
                    path={`${this.props.match.path}/pastFuture`} 
                    exact 
                    component={ () => (
                        <OrderManagementTable 
                            data={poData} 
                            tableHeaders={this.state.tableHeaders.pastFuture} 
                            buttons={this.state.buttons.pastFuture} 
                            checked={this.state.checked} 
                            tab="pastFuture"
                            loading={ this.props.isLoading || this.props.fetchingRID }
                        />
                        )
                    }
                />
                <Route 
                    path={`${this.props.match.path}/rejected`} 
                    exact 
                    component={ () => (
                        <OrderManagementTable 
                            data={poData} 
                            tableHeaders={this.state.tableHeaders.rejected} 
                            buttons={this.state.buttons.rejected} 
                            checked={this.state.checked} 
                            tab="rejected"
                            loading={ this.props.isLoading || this.props.fetchingRID } 
                        />) 
                    } 
                />
                <Route 
                    path={`${this.props.match.path}/complete`} 
                    exact 
                    component={ () => (
                        <OrderManagementTable 
                            data={poData} 
                            tableHeaders={this.state.tableHeaders.complete} 
                            buttons={this.state.buttons.complete} 
                            checked={this.state.checked} 
                            tab="complete"
                            loading={ this.props.isLoading || this.props.fetchingRID } 
                        />) 
                    } 
                />
                <Route 
                    path={`${this.props.match.path}/shipped`} 
                    exact 
                    component={ () => (
                        <OrderManagementTable 
                            data={poData} 
                            tableHeaders={this.state.tableHeaders.shipped} 
                            buttons={this.state.buttons.shipped} 
                            checked={this.state.checked} 
                            tab="shipped"
                            loading={ this.props.isLoading || this.props.fetchingRID }
                        />) 
                    }
                />
                <Route 
                    path={`${this.props.match.path}/invoiced`} 
                    exact 
                    component={ () => (
                        <OrderManagementTable 
                            data={poData} 
                            tableHeaders={this.state.tableHeaders.invoiced} 
                            buttons={this.state.buttons.invoiced} 
                            checked={this.state.checked} 
                            tab="invoiced"
                            loading={ this.props.isLoading || this.props.fetchingRID } 
                        />) 
                    }
                />
                <Route 
                    path={`${this.props.match.path}/all`} 
                    exact 
                    component={ () => (
                        <OrderManagementTable 
                            data={poData} 
                            tableHeaders={this.state.tableHeaders.all} 
                            buttons={this.state.buttons.all} 
                            checked={this.state.checked} 
                            tab="all"
                            loading={ this.props.isLoading || this.props.fetchingRID } 
                        />) 
                    } 

                />
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getPOManagementDetails: data => dispatch(vendorActions.fetchPOManagementDetails(data)),
    poDetails: data => dispatch(vendorActions.poDetails(data)),
    poAction: data => dispatch(vendorActions.poAction(data)),
    getRaiseVendorInvoiceDetails: data => dispatch(vendorActions.getRaiseVendorInvoiceDetails(data)),    
    raiseVendorInvoice: data => dispatch(vendorActions.raiseVendorInvoice(data)),
});
  
const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        data,
        isFetching: isLoading,
        error: vendorArtistError,
        poData,
        poStatusUpdating,
        fetchingRID,
        ridData,
        raisingInvoice,
        artistDetails
    } = vendorArtistsReducer || [];

  
    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        data,
        isLoading,
        error,
        poData,
        poStatusUpdating,
        fetchingRID,
        ridData,
        raisingInvoice,
        artistDetails
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ErrorHandler(OrderManagement));