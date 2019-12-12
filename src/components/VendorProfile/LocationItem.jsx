import React from 'react';

const locationItem = props => {

    return (
        <div className='location-carousel-item' onClick={props.click.bind(null, props.id)}>
            <p className='location-item-name'>{ props.name }</p>
            <p>{ props.address }</p>
            <p>{ props.street }</p>
            <p>{ props.csz }</p>
        </div>
    );
}

export default locationItem;