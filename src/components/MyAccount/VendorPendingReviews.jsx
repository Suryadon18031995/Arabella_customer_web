// eslint-disable-next-line no-unused-vars
import React from 'react';
import _get from 'lodash/get';
import Link from 'react-router-dom/Link';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import StarRatings from 'react-star-ratings';
import Pagination from '../../components/Common/Pagination.jsx';
import '../../assets/stylesheets/vendorReviews.css';

const displayProductStars = (cell, row, props) => (
    <div>
        <div className="pr-vend-pending" onMouseOver={() => props.hoverProductRatings(row.productId)}>
        <StarRatings
            rating={parseFloat(row.productRating, 10) || 0}
            starDimension="12px"
            starSpacing="1px"
            starEmptyColor="#434343"
            starRatedColor="#fdb927"
        />
        </div>
        {_get(props.hoverProductReviewsData, 'total_reviews') === 0 &&
         <div className="pr-vend-pending-hover">
         <span>No Reviews</span>
     </div>
     }
     {_get(props.hoverProductReviewsData, 'result') && _get(props.hoverProductReviewsData, 'total_reviews') !== 0 &&
     <div className="pr-vend-pending-hover">
         <table className="table pr-vend-pending-hover-table">
             <thead>
                 <th>Ratings</th>
                 <th>Product Reviews</th>
             </thead>
             <tbody>
             {
                 _get(props.hoverProductReviewsData, 'result').map((eachReview, indx) => {
                     if (indx < 5) {
                         return (<tr key={indx}>
                             <td>
                                 <StarRatings
                                     rating={Number(eachReview.rating_value) ? Number(eachReview.rating_value) : 0}
                                     starDimension="12px"
                                     starSpacing="1px"
                                     starEmptyColor="#434343"
                                     starRatedColor="#fdb927"
                                 />
                             </td>
                             <td>{eachReview.detail}</td>
                         </tr>);
                     }
                 })
             }
             </tbody>
         </table>
         {_get(props.hoverProductReviewsData, 'total_reviews') > 5 &&
            <a href={`/${row.urlKey}.html#reviewList`}>
                 <span>See {Number(_get(props.hoverProductReviewsData, 'total_reviews')) - 5} more reviews</span>
            </a>
         }
     </div>
     }
    </div>
);

const displayVendorStars = (cell, row, props) => (
    <div>
        <div className="vr-vend-pending" onMouseOver={() => props.hoverVendorRatings(row.vendorId)}>
        <StarRatings
            rating={parseFloat(row.vendorRating, 10) || 0}
            starDimension="12px"
            starSpacing="1px"
            starEmptyColor="#434343"
            starRatedColor="#fdb927"
        />
        </div>
        {_get(props.hoverVendorReviewsData, 'total_product') === 0 &&
         <div className="vr-vend-pending-hover">
         <span>No Reviews</span>
     </div>
     }
     {_get(props.hoverVendorReviewsData, 'data') && _get(props.hoverVendorReviewsData, 'total_product') !== 0 &&
     <div className="vr-vend-pending-hover">
         <table className="table vr-vend-pending-hover-table">
             <thead>
                 <th>Ratings</th>
                 <th>Vendor Reviews</th>
             </thead>
             <tbody>
             {
                 _get(props.hoverVendorReviewsData, 'data').map((eachReview, indx) => {
                     if (indx < 5) {
                         return (<tr key={indx}>
                             <td>
                                 <StarRatings
                                     rating={Number(eachReview.vendor_quality) ? Number(eachReview.vendor_quality) : 0}
                                     starDimension="12px"
                                     starSpacing="1px"
                                     starEmptyColor="#434343"
                                     starRatedColor="#fdb927"
                                 />
                             </td>
                             <td>{eachReview.detail}</td>
                         </tr>);
                     }
                 })
             }
             </tbody>
         </table>
         {_get(props.hoverVendorReviewsData, 'total_product') > 5 &&
            //  <a href={`/${row.url_key}.html#reviewList`}>
                 <span>See {Number(_get(props.hoverVendorReviewsData, 'total_product')) - 5} more reviews</span>
            //  </a>
         }
     </div>
     }
    </div>
);

const formatImgCell = (cell, row) => (
    <div> <a href={`/${row.urlKey}.html`}><img src={row.image} style={{ width: '100%' }}></img> </a></div>
);

const formatNameCell = (cell, row) => (
    <div><a style={{ color: '#888' }} href={`/${row.urlKey}.html`}>{row.productName}</a></div>
);

const viewColumn = (cell, row, enumObject, index, props) => (
    <div onClick={() => props.toggleReviewModal(row.vendorId, row.shipmentId)} style={{ cursor: 'pointer' }}>
        Write Review
    </div>
);

const ViewOrderColumn = (cell, row, props) => (
    <span className="view-order" /* style={{ color: '#888' }} */
        onClick={() => props.handleViewOrder(_get(row, 'orderNo', ''))}
    >{cell}</span>
);

export default function VendorPendingReviews(props) {
    return (
        <div>
            <BootstrapTable className="vendor-pending" data={props.pendingReviewArray} search>
                <TableHeaderColumn
                    dataAlign='center'
                    dataField='orderNo' isKey
                    dataFormat={(cell, row) => ViewOrderColumn(cell, row, props)}>
                    Order Number
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center'
                    dataFormat={(cell, row) => formatImgCell(cell, row)}>
                    Product Image
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center'
                    dataFormat={(cell, row) => formatNameCell(cell, row)}>
                    Product Name
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center'
                    dataFormat={(cell, row) => displayProductStars(cell, row, props)}>
                    Product Rating
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center'
                    dataField='deliveryDate'>
                    Delivery Date
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center'
                    dataField='vendorName'>
                    Vendor Name
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center'
                    dataFormat={(cell, row) => displayVendorStars(cell, row, props)}>
                    Vendor Rating
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign='center'
                    dataFormat={(cell, row, enumObject, index) => viewColumn(cell, row, enumObject, index, props)}>
                    Write Vendor Review
                </TableHeaderColumn>
            </BootstrapTable>
            <span className='col-lg-6 col-md-6  col-sm-12'>
                <Pagination totalRecords={props.totalItems}
                    currentPage={props.currentPage}
                    pageLimit={props.itemsPerPage}
                    pageNeighbours={2}
                    onPageChanged={props.onPageChanged} />
            </span>
            <Modal show={props.showReview} onHide={() => props.toggleReviewModal()} >
                <Modal.Header closeButton>
                    <Modal.Title className="mod-header">Write Your Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="input-fields">
                            <label><em>*</em>Name</label>
                            <input type="text" name="nickName" className="review-field" defaultValue={props.nickName} onChange={props.handleInputChange}/>
                            {_get(props.errors, 'nickName') && <span className='error-color'>This is a required field.</span>}
                        </div>
                        <div className="input-fields">
                            <label><em>*</em>Summary of Your Review</label>
                            <input type="text" name="reviewSummary" className="review-field" onChange={props.handleInputChange}/>
                            {_get(props.errors, 'reviewSummary') && <span className='error-color'>This is a required field.</span>}
                        </div>
                        <div className="input-fields">
                            <label><em>*</em>Review</label>
                            <textarea type="text" name="review" className="review-field" onChange={props.handleInputChange}/>
                            {_get(props.errors, 'review') && <span className='error-color'>This is a required field.</span>}
                        </div>
                        <div className="input-fields">
                            <label><em>*</em>Vendor Rating</label>
                            <StarRatings
                                rating={parseFloat(props.rating, 10) || 0}
                                starDimension="30px"
                                starSpacing="1px"
                                starEmptyColor="#434343"
                                starRatedColor="#fdb927"
                                changeRating={props.changeRating}
                                numberOfStars={5}
                                name='rating'
                                title={parseFloat(props.rating, 10) || 0}
                            />
                            {_get(props.errors, 'rating') && <span className='error-color'>Please select one of each of the ratings above</span>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={() => props.toggleReviewModal()}>Close</Button> */}
                    <Button className="mod-btn" onClick={props.handleSubmitReview}>Submit Review</Button>
                </Modal.Footer>
            </Modal>
        </div>
        // <div style={{ paddingBottom: '20px' }}>
        //     <div className='vender-pending-reviews'>
        //         <h3 className='shipment-no'>Shipment #{_get(props.eachReview, 'shipment_id', '')}</h3>
        //         {/* <h3>{_get(props.eachReview, 'vendor_name', '')}</h3> */}
        //         <h3><Link style={{ color: 'inherit' }}to='/'>{_get(props.eachReview, 'vendor_name', '')}</Link></h3>
        //         <span>
        //             <StarRating rating={props.rating} />
        //         </span>
        //         <span>26 Review(s)</span>
        //     </div>
        //     <div>
        //         <BootstrapTable data={_get(props.eachReview, 'products_ordered', [])}>
        //             <TableHeaderColumn
        //                 dataAlign='center' width='50%'
        //                 dataField='product_name' isKey>
        //                 Product Name
        //             </TableHeaderColumn>
        //             <TableHeaderColumn
        //                 dataAlign='center' width='25%'
        //                 dataField='procuct_sku'>
        //                 SKU
        //             </TableHeaderColumn>
        //             <TableHeaderColumn
        //                 dataAlign='center' width='25%'
        //                 dataField='qty_ordered'>
        //                 Qty Shipped
        //             </TableHeaderColumn>
        //         </BootstrapTable>
        //     </div>
        //     <div>
        //         <label style={{ float: 'left' }}><em>*</em>vendor_quality : </label>
        //         <span>
        //             <StarRating
        //                 rating={_get(props.eachReview, 'increment_id', '') === props.incrementId ? props.vendorQuality : 0}
        //                 starDimension='20px'
        //                 starSpacing='3px'
        //                 changeRating={rating => props.changeRating(_get(props.eachReview, 'increment_id', ''), rating)} />
        //         <br/></span>
        //         {props.errors && props.errors.vendorQuality && props.shipmentId === _get(props.eachReview, 'shipment_id') && <span className='error-color'>Please select one of each of the ratings above</span>}
        //     </div>
        //     <div className='vender-pending-reviews'>
        //         <span>
        //             <em>*</em><label>Nickname </label>
        //         </span>
        //         <span>
        //             <input className='input-vpr' type='text' name='nickName' defaultValue={props.nickName} onChange={props.handleInputChange} />
        //         </span>

        //         <span>
        //             <em>*</em><label>Summary Of Your Review </label>
        //         </span>
        //         <span>
        //             <input className={`input-vpr ${props.errors && props.errors.reviewSummary && props.shipmentId === _get(props.eachReview, 'shipment_id') ? 'validation-failed' : ''}`} type='text' name='reviewSummary' onChange={props.handleInputChange} />
        //         </span>
        //         {props.errors && props.errors.reviewSummary && props.shipmentId === _get(props.eachReview, 'shipment_id') && <span className='error-color'>This is a required field.</span>}
        //         <span>
        //             <em>*</em><label>Review </label>
        //         </span>
        //         <span>
        //             <textarea className={props.errors && props.errors.reviewSummary && props.shipmentId === _get(props.eachReview, 'shipment_id') ? 'validation-failed' : ''} type='text' name='review' onChange={props.handleInputChange} />
        //         </span>
        //         {props.errors && props.errors.review && props.shipmentId === _get(props.eachReview, 'shipment_id') && <span className='error-color'>This is a required field.</span>}
        //         <span style={{ width: '15%' }}>
        //         <Button onClick={() => props.handleSubmitReview(_get(props.eachReview, 'vendor_id'), _get(props.eachReview, 'shipment_id'))}>Submit Review</Button>
        //         </span>
        //     </div>
        // </div>
    );
}
