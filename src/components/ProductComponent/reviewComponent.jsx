import React from 'react';
import StarRatings from 'react-star-ratings';

const ReviewComponent = React.forwardRef((props, ref) => {
    if (props.productDetails && props.productDetails.info) {
        const { info } = props.productDetails;
    return (
        <div className="row">
            <div className="reviewsDiv" id="reviewsDiv" ref={ref}>
                <div className="write-review">
                    <h3>Write Your Own Review</h3></div>
                <p>You're Reviewing: {info.name}</p>
                <div className="input-field">
                    <label className="required"><em>*</em>Nickname</label>
                    <input type="text" className="field-input" name="name" onChange={props.handleChange} />
                    <br /><span style={{ color: 'red' }}>{props.errors.name}</span>
                </div>
                <div className="input-field">
                    <label className="required"><em>*</em>Summary Of Your Review</label>
                    <input type="text" className="field-input" onChange={props.handleChange} name="reviewTitle" />
                    <br /><span style={{ color: 'red' }}>{props.errors.reviewTitle}</span>
                </div>
                <div className="input-field">
                    <label className="required"><em>*</em>Review</label>
                    <textarea type="text" className="field-input" onChange={props.handleChange} name="reviewDetails" />
                    <br /><span style={{ color: 'red' }}>{props.errors.reviewDetails}</span>
                </div>
                <div className="input-field">
                    <label className="required"><em>*</em>How do you rate this product?</label>
                    <StarRatings
                        rating={props.rating}
                        starRatedColor="blue"
                        changeRating={props.changeRating}
                        numberOfStars={5}
                        name='rating'
                        className="field-input"
                    />
                    <br /><span style={{ color: 'red' }}>{props.errors.rating}</span>
                </div>

                <div className="input-box">
                    <button type="button" title="Submit Review" className="button btn-cart" onClick={() => props.submitReviews()}>
                        <span>Submit Review</span>
                    </button>
                </div>
            </div>
        </div>
    );
    }
});

export default ReviewComponent;
