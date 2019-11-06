// eslint-disable-next-line no-unused-vars
import React from 'react';
import StarRatings from 'react-star-ratings';

export default function StarRating({
    rating = 0,
    starDimension = '12px',
    starSpacing = '1px',
    starEmptyColor = '#434343',
    starRatedColor = '#fdb927',
    starHoverColor = '#fdb927',
    changeRating = () => ({}),
}) {
    return (
        <StarRatings
            rating={rating}
            starDimension={starDimension}
            starSpacing={starSpacing}
            starEmptyColor={starEmptyColor}
            starRatedColor={starRatedColor}
            starHoverColor={starHoverColor}
            changeRating={changeRating}
        />);
}
