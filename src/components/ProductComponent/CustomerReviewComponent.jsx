import React from 'react';
import StarRatings from 'react-star-ratings';

const CustomerReviewComponent = React.forwardRef((props, ref) => {
    if (props.productReviewData && props.productReviewData.result && props.productReviewData.result.length > 0) {
        return (
        <div className="row cust-reviews-div">
                <div className='col-xs-12' id="review-list" ref={ref}>
                    <h2>CUSTOMER REVIEWS</h2>
                    <table className='cust-reviews'>
                        <tbody>
                            {props.productReviewData && props.productReviewData.result &&
                                props.productReviewData.result.map((eachReview, index) => {
                                    return (<tr key={index}>
                                        <td>
                                            {eachReview.nickname}
                                        </td>
                                        <td className="rev-star">
                                            {eachReview.rating_code}
                                            <StarRatings
                                                rating={Number(eachReview.rating_value) ? Number(eachReview.rating_value) : 0}
                                                starRatedColor="#fdb927"
                                                starDimension="15px"
                                                starSpacing="1px"
                                                numberOfStars={5}
                                                name='rating'
                                                className="field-input"
                                            />
                                        </td>
                                        <td>
                                            {eachReview.detail}
                                        </td>
                                    </tr>);
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
       
});

export default CustomerReviewComponent;
