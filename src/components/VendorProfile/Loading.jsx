import React from 'react';
import loader from '../../assets/images/lazy-loader.gif'

const loading = props => {
    return (
        <div className="loading-div" style={{ display: props.display }}>
            <img className="artist-loader" src={loader} alt={'loading...'} />
        </div>
    );
}

export default loading;