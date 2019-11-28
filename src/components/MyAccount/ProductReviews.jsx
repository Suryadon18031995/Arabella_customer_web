// eslint-disable-next-line no-unused-vars
import React from 'react';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import moment from 'moment';
import _get from 'lodash/get';
import StarRatings from 'react-star-ratings';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Link from 'react-router-dom/Link';

const formatImgCell = (cell, row) => (
    <div> <a href={`/${row.url_key}.html`}><img src={row.img_url} style={{ width: '100%' }}></img> </a></div>
    // <div> <a href={`/${props.thisData.url_key}.html#reviewList`}><img src={row.img_url} style={{ width: '100%' }}></img> </a></div>
);

const viewColumn = (cell, row, enumObject, index, props) => (
    <div onClick={() => props.toggleDetailModalFn(row)} style={{ cursor: 'pointer' }}>
        View Details
    </div>
);

const formatDateCell = (cell, row, enumObject, index) => (
    <span>
        {moment(row.review_date, 'MM-DD-YYYY').format('DD/MM/YYYY')}
    </span>
);

const formatNameCell = (cell, row, enumObject, index) => (
    <span className="product-review-click">
        <Link to={`/${row.url}.html`}>{cell}</Link>
    </span>
);

const displayStars = (cell, row, enumObject, index, props) => (
    <div>
        <div className="pr-display" onMouseOver={() => props.hoverRatings(row.product_id)}>
            <StarRatings
            rating={row.review_count ? parseInt(row.review_count, 10) : 0}
            starDimension="12px"
            starSpacing="1px"
            starEmptyColor="#434343"
            starRatedColor="#fdb927"
        /></div>
         {_get(props.hoverProductReviewsData, 'total_reviews') === 0 &&
            <div className="pr-hover">
            <span>No Reviews</span>
        </div>
        }
        {_get(props.hoverProductReviewsData, 'result') && _get(props.hoverProductReviewsData, 'total_reviews') !== 0 &&
        <div className="pr-hover">
            <table className="table pr-hover-table">
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
                <a href={`/${row.url_key}.html#reviewList`}>
                    <span>See {Number(_get(props.hoverProductReviewsData, 'total_reviews')) - 5} more reviews</span>
                </a>
            }
        </div>
        }
    </div>
);


export default function ProductReviewTable(props) {
    // console.log('props:', props.data);
    return (
        <div>
            {props.data && props.data.result &&
                <div>
                    <BootstrapTable className="table-large tableWOheader" data={props.data.result} pagination>
                        <TableHeaderColumn
                            dataAlign='center' width='0%'
                            dataField='review_date' hidden={true} isKey>
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign='center' width='12%'
                            dataFormat={(cell, row, enumObject, index) => formatDateCell(cell, row, enumObject, index)}>
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign='center' width='10%'
                            dataFormat={(cell, row) => formatImgCell(cell, row)}>
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign='center' width='28%'
                            dataFormat={(cell, row, enumObject, index) => formatNameCell(cell, row, enumObject, index)}
                            dataField='product_name'>
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign='center' width='28%'
                            dataField='vendor_name'></TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign='center' width='20%'
                            dataFormat={(cell, row, enumObject, index) => displayStars(cell, row, enumObject, index, props)}>
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign='center' width='20%'
                            dataField='product_review_details'>
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign='center' width='10%'
                            dataFormat={(cell, row, enumObject, index) => viewColumn(cell, row, enumObject, index, props)}>
                        </TableHeaderColumn>
                    </BootstrapTable>
                    {props.detailData &&
                        <Modal show={props.toggleDetailModal} onHide={() => props.toggleDetailModalFn()} className="reviewDetailModal">
                            <Modal.Header closeButton>
                                <Modal.Title>Review Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <h4>{_get(props.detailData, 'product_name')}</h4>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={_get(props.detailData, 'img_url')} width="200px" />
                                        </div>
                                        <div className="col-md-8">
                                            {/* <p> */}
                                            Your Rating:
                                    <StarRatings
                                                rating={parseInt(_get(props.detailData, 'review_count'), 10)}
                                                starDimension="12px"
                                                starSpacing="1px"
                                                starEmptyColor="#434343"
                                                starRatedColor="#fdb927"
                                            />
                                            {/* </p> */}
                                            <p>Your Review (submitted on {moment(_get(props.detailData, 'review_date'), 'MM-DD-YYYY').format('MMMM DD, YYYY')}):</p>
                                            <p>{_get(props.detailData, 'product_review_details')}</p>
                                        </div>
                                    </div>
                                    <p>Average Customer Rating: {_get(props.detailData, 'review_count')}</p>
                                    <a href={`/${_get(props.detailData, 'url_key')}.html#reviewForm`} title={`/${_get(props.detailData, 'url_key')}`}>
                                        Add Your Review
                                    </a>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => props.toggleDetailModalFn()}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    }
                </div>
            }
        </div>

    );
}
