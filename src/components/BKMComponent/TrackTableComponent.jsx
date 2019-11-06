import React from 'react';
import _get from 'lodash/get';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import MapComponent from '../../components/BKMComponent/MapComponent.jsx';
import greenMarker from '../../assets/images/green_marker.png';
import redMarker from '../../assets/images/red_marker.png';
import blueMarker from '../../assets/images/blue_marker.svg';
import dottedLine from '../../assets/images/dotted-line.svg';
import redLine from '../../assets/images/red_line.png';

export default function TrackTableComponent(props) {
    return (
    <div>
{_get(props.state, 'showMap') === true && _get(props.state, 'clickedRadioBtn') === 'order_id' &&
<div className="map-component">
    <legend id="legend" className="map-info">
    <div className="col-md-12 col-sm-12">
    <div className="col-md-1 col-sm-2">
        <img src={greenMarker}/>:Origin
    </div>
    <div className="col-md-2 col-sm-2">
        <img src={redMarker}/>:Present Location
    </div>
    <div className="col-md-2 col-sm-2">
        <img src={blueMarker}/>:Destination
    </div>
    <div className="col-md-2 col-sm-2">
        <img src={redLine} style={{ width: '27px' }}/>:Delivered
    </div>
    <div className="col-md-3 col-sm-2">
        <img src={dottedLine} style={{ width: '27px' }}/>:Yet to be Delivered
    </div>
    <div className="col-md-2 col-sm-2">
        <input className="reset-btn" type="button" name="reset" value="Reset Map" id="reset"/>
    </div>
    </div>
    </legend>
    <MapComponent
        state={props.state}
        markers={props.state.mapDetails}
        onToggleOpen={props.onToggleOpen}
        bounds={props.bounds}
    />

     <div className="table-component">
        {Object.keys(_get(props.state, 'orderDetails')).map((key) => {
            return (<div>
                <h4>{key}</h4>
                <div>
                    <table className="table-bordered view-order-table">
                        <thead>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Box Count</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th>Delivery Date</th>
                            <th>Invoice Date</th>
                            <th>Invoice No</th>
                            <th>Invoice Amount</th>
                            <th>Write Review</th>
                            <th>Track Details</th>
                        </thead>
                        <tbody>
                            {Object.entries(_get(props.state, ['orderDetails', key])).map((product, pKey) => {
                              return <tr key={pKey}>
                                <td><img className="thumimg" src={product[1].image} /></td>
                                <td><a onClick={() => props.handleWriteReview(product[1].product_id, product[1].url_key)}>{product[1].product_name}</a></td>
                                <td>{product[1].box_count}</td>
                                <td>{product[1].price}</td>
                                <td>{product[1].total_price}</td>
                                <td>{product[1].delivery_date}</td>
                                <td>{product[1].invoice_date}</td>
                                <td>{product[1].invoice_number}</td>
                                <td>{product[1].total_price}</td>
                                <td><Button className="view-order-btn" onClick={() => props.handleWriteReview(product[1].product_id, product[1].url_key)}>Click</Button></td>
                                <td><Button className="view-order-btn" onClick={() => props.handleTrackDetails(product[1].track_details)} >View</Button></td>
                              </tr>;
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            );
        })
        }
    </div>
    {/* track Details Modal */}
    <Modal show={props.state.show} onHide={props.handleClose}>
        <Modal.Header closeButton />
        <div className="vieworder-tablegrid">
            <table id="beh_popup" className="vieworder-tablepopup" >
                <thead style={{ background: '#F1F1F1' }}>
                    <tr class="table-active">
                        <th>Sl No</th>
                        <th>Product Name</th>
                        <th>Delivery Method</th>
                        <th>Tracking Number</th>
                        <th>Box Id</th>
                        <th>Box Status</th>
                    </tr>
                </thead>
                <tbody>
                    {_get(props.state, 'trackDetails') && Object.entries(_get(props.state, 'trackDetails')).map((track, key) => {
                        return <tr>
                            <td>{key + 1}</td>
                            <td>{track[1].product_name}</td>
                            <td>{track[1].delivery_method}</td>
                            <td>{track[1].tracking_number ? track[1].tracking_number : track[1].box_id}</td>
                            <td>{track[1].box_id}</td>
                            <td>{track[1].box_status}</td>
                        </tr>;
                    })
                    }
                </tbody>
            </table>
        </div>
    </Modal>
</div>}
{_get(props.state, 'showMap') === false && _get(props.state, 'clickedRadioBtn') === 'order_id' &&
<div>
    <div>
        <div>
            <h3><strong>Items Ordered</strong></h3>
            <table className="table table-bordered vieworder-table" id="box_id_null_det">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Delivery Date</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    {_get(props.state, 'orderDetails') && Object.entries(_get(props.state, 'orderDetails')).map((product, key) => {
                        return <tr>
                            <td>{key + 1}</td>
                            <td>{product[1].product_name}</td>
                            <td>{product[1].product_sku}</td>
                            <td>{product[1].delivery_date}</td>
                            <td>{product[1].price}</td>
                            <td>{product[1].qty}</td>
                            <td>{product[1].row_total}</td>
                        </tr>;
                    })}
                    <tr>
                    </tr>
                    <th colSpan="6" style={{ textAlign: 'right', border: '1px solid #ddd' }}>SubTotal</th>
                    <td colSpan="7" style={{ textAlign: 'center', border: '1px solid #ddd' }}>{props.state.subTotal}</td>
                    <tr>
                    </tr>
                    <th colSpan="6" style={{ textAlign: 'right', border: '1px solid #ddd' }}>Shipping and Handling</th>
                    <td colSpan="7" style={{ textAlign: 'center', border: '1px solid #ddd' }}>{props.state.shippingAndHandling}</td>
                    <tr>
                    </tr>
                    <th colSpan="6" style={{ textAlign: 'right' }}>GrandTotal</th>
                    <td colSpan="7" style={{ textAlign: 'center' }}>{props.state.grandTotal}</td>
                </tbody>
            </table>
        </div>
    </div>
</div>
}
{_get(props.state, 'showMap') === true && _get(props.state, 'clickedRadioBtn') === 'track_id' &&
<div className="map-component">
    <legend id="legend" className="map-info">
    <div className="col-md-12 col-sm-12">
    <div className="col-md-1 col-sm-2">
        <img src={greenMarker}/>:Origin
    </div>
    <div className="col-md-2 col-sm-2">
        <img src={redMarker}/>:Present Location
    </div>
    <div className="col-md-2 col-sm-2">
        <img src={blueMarker}/>:Destination
    </div>
    <div className="col-md-2 col-sm-2">
        <img src={redLine} style={{ width: '27px' }}/>:Delivered
    </div>
    <div className="col-md-3 col-sm-2">
        <img src={dottedLine} style={{ width: '27px' }}/>:Yet to be Delivered
    </div>
    <div className="col-md-2 col-sm-2">
        <input className="reset-btn" type="button" name="reset" value="Reset Map" id="reset"/>
    </div>
    </div>
    </legend>
    <MapComponent
        state={props.state}
        markers={props.state.mapDetails}
        onToggleOpen={props.onToggleOpen}
        bounds={props.bounds}
    />

     <div className="table-component">
        {Object.keys(_get(props.state, 'orderDetails')).map((key) => {
            return (<div>
                <h4>{key}</h4>
                <div>
                    <table className="table-bordered view-order-table">
                        <thead>
                            <th>Sl. No</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            {props.apiToken && <th>Price</th>}
                            {props.apiToken && <th>Total Price</th>}
                            <th>Delivery Date</th>
                        </thead>
                        <tbody>
                            {Object.entries(_get(props.state, ['orderDetails', key])).map((product, pKey) => {
                              return <tr key={pKey}>
                                <td>{pKey + 1}</td>
                                <td>{product[1].product_name}</td>
                                <td>{product[1].box_count}</td>
                                {props.apiToken && <td>{product[1].price}</td>}
                                 {props.apiToken && <td>{product[1].total_price}</td>}
                                <td>{product[1].delivery_date}</td>
                              </tr>;
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            );
        })
        }
    </div>
</div>}

{ _get(props.state, 'showMap') === false && _get(props.state, 'clickedRadioBtn') === 'track_id' &&
<div>
    <div>
        <div>
            <h3><strong>Items Ordered</strong></h3>
            <table className="table table-bordered vieworder-table" id="box_id_null_det">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Delivery Date</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    {_get(props.state, 'orderDetails') && Object.entries(_get(props.state, 'orderDetails')).map((product, key) => {
                        return <tr>
                            <td>{key + 1}</td>
                            <td>{product[1].product_name}</td>
                            <td>{product[1].product_sku}</td>
                            <td>{product[1].delivery_date}</td>
                            <td>{product[1].price}</td>
                            <td>{product[1].qty}</td>
                            <td>{product[1].row_total}</td>
                        </tr>;
                    })}
                    <tr>
                    </tr>
                    <th colSpan="6" style={{ textAlign: 'right', border: '1px solid #ddd' }}>SubTotal</th>
                    <td colSpan="7" style={{ textAlign: 'center', border: '1px solid #ddd' }}>{props.state.subTotal}</td>
                    <tr>
                    </tr>
                    <th colSpan="6" style={{ textAlign: 'right', border: '1px solid #ddd' }}>Shipping and Handling</th>
                    <td colSpan="7" style={{ textAlign: 'center', border: '1px solid #ddd' }}>{props.state.shippingAndHandling}</td>
                    <tr>
                    </tr>
                    <th colSpan="6" style={{ textAlign: 'right' }}>GrandTotal</th>
                    <td colSpan="7" style={{ textAlign: 'center' }}>{props.state.grandTotal}</td>
                </tbody>
            </table>
        </div>
    </div>
</div>
}
    </div>
    );
}
