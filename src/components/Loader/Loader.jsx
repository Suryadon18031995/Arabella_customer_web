import React from 'react';
import lazyLoader from '../../assets/images/lazy-loader.gif';

// eslint-disable-next-line import/prefer-default-export
const Loader = () => (
    <div className='loader-wrapper'>
        <img src={ lazyLoader } alt="lazy-loader"/>
    </div>
);

const LoaderListingPage = () => (
    <div className='loader-wrapper-listing'>
        <img src={ lazyLoader } alt="lazy-loader"/>
    </div>
);

const customLoader = () => (
    <div style={{ position: 'relative', marginTop: '50px', textAlign:'center', minHeight: '200px' }}>
        <img src={ lazyLoader } alt="loader"/>
    </div>
);

const LoginLoader = () => (
    <div className='loader-wrapper-login'>
        <img src={ lazyLoader } alt="lazy-loader"/>
    </div>
);

const SubscriptionLoader = ({ type, actionType }) => (
    <React.Fragment>
    <div className='loader-wrapper'>
        <img src={ lazyLoader } alt="lazy-loader"/>
    </div>
    {actionType === 'REQUEST_ADD_FIRST_DATA_CREDIT_CARD' && ((type === 'subscription') || (type === 'pre-book')) ? <div style={{ top: '60%', left: '40%', position: 'fixed' }}>Please don't close the window, Your order is Processing...</div> : null }
    </React.Fragment>
);

export { customLoader, LoaderListingPage, LoginLoader, SubscriptionLoader };
export default Loader;
