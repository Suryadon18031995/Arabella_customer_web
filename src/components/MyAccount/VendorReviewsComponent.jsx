import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import StarRatings from 'react-star-ratings';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';

const displayStars = (cell, row, enumObject, index, props) => (
    <div>
        <div className="vr-display" onMouseOver={() => props.hoverRatings(row.vendor_id)}>
            <StarRatings
                rating={parseInt(row.vendor_quality, 10)}
                starDimension="12px"
                starSpacing="1px"
                starEmptyColor="#434343"
                starRatedColor="#fdb927"
            />
        </div>
        {_get(props.hoverVendorReviewsData, 'total_product') === 0 &&
         <div className="vr-hover">
         <span>No Reviews</span>
     </div>
     }
     {_get(props.hoverVendorReviewsData, 'data') && _get(props.hoverVendorReviewsData, 'total_product') !== 0 &&
     <div className="vr-hover">
         <table className="table vr-hover-table">
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

export default function VendorReviewsComponent(props) {
    const tableData = props.reviews && !_isEmpty(props.reviews) ? props.reviews : undefined;
    if (tableData !== undefined) {
        return (
            <div>
                <h1>Reviews for vendor {props.vendorName}</h1>
                {tableData &&
                    <BootstrapTable className="table-large tableWOheader" data={tableData} pagination>
                    <TableHeaderColumn
                        dataAlign='center' width='0%'
                        dataField='review_date' hidden={true} isKey>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataAlign='center' width='12%'
                        dataField='posted_on'>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataAlign='center' width='12%'
                        dataField='vendor_name'>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataAlign='center' width='15%'
                        dataFormat={(cell, row, enumObject, index) => displayStars(cell, row, enumObject, index, props)}>
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataAlign='center' width='12%'
                        dataField='detail'>
                    </TableHeaderColumn>
                </BootstrapTable>
                }
            </div>
        );
    }
        return (<div>
            <h1>Reviews for vendor {props.vendorName}</h1>
            <h2>No Reviews</h2>
            </div>);
}

