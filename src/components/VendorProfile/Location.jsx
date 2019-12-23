import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import LocationItem from './LocationItem.jsx';

const location = props => {

    let locationListMarkup = null;
    if(props.data.code === 1) {

        const locations = [];
        // locations.push(<LocationItem key='add-location' id="new" name="ADD NEW LOCATION" address="" street="" csz="" click={props.click} />);
        const locationIds = Object.keys(props.data.loc_details);
        if(locationIds.length > 0) {
            locationIds.forEach(currentLocationId => {

                const currentLocation = props.data.loc_details[currentLocationId];
                locations.push(<LocationItem key={currentLocationId} id={currentLocationId} name={currentLocation.loc_name} address={currentLocation.address} street={currentLocation.street} csz={ `${currentLocation.city}, ${currentLocation.state}, ${currentLocation.zip_code}` } click={props.click} />)
            });
        }

        locationListMarkup = (
            <AliceCarousel
                items = { locations }
                responsive = { props.responsive }
                dotsDisabled
                infinite = {false}
            />
        );
    }
    else {
        <div className="alert alert-warning">
            { props.data.message }
        </div>
    }

    return (
        <div className='container-fluid container-spacing'>
            { locationListMarkup }
        </div>
    );
}

export default location;