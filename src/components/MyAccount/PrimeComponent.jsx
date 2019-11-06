// eslint-disable-next-line no-unused-vars
import React from 'react';
import moment from 'moment';
import _get from 'lodash/get';
import Switch from 'material-ui/Switch';
import Link from 'react-router-dom/Link';
// import _isEmpty from 'lodash/isEmpty';

export default function PrimeMembership(props) {
    return (
        <React.Fragment>
            <h1 className='text-center'>My Premium Membership</h1>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 prime-member-comp'>
                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12 prime-member-comp-span'>
                    {_get(props.activePrimeDetails, 'duration')} Month Premium Membership
                </span>
                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12 prime-member-comp-span'>
                    {/* ${(_get(props.activePrimeDetails, 'price') / _get(props.activePrimeDetails, 'duration')).toFixed(3).slice(0, -1)} per Month */}
                    ${_get(props.activePrimeDetails, 'price') && Number(_get(props.activePrimeDetails, 'price')).toFixed(3).slice(0, -1)} per {_get(props.activePrimeDetails, 'duration')} Month
                </span>

                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12 prime-member-comp-span'>
                    Renewal and next Payment
                    </span>
                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12 prime-member-comp-span'>
                    Your membership will expire on {moment(_get(props.primeOrderData, 'primeExp')).format('MMM Do YYYY')}
                </span>

                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12 prime-member-comp-span'>
                    Auto Renewal
                    </span>
                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12 prime-member-comp-span'>
                    {/* <a>{_get(props.primeOrderData, 'primeRenewal') === '1' ? 'Disable' : 'Enable'}</a> */}
                    <Switch
                        checked={props.renewalEnabled}
                        onChange={() => props.handleSwitchChange()}
                        value="checkedB"
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </span>

                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12 prime-member-comp-span'>
                    Payment History
                    </span>
                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12 prime-member-comp-span'>
                    Last Payment  {moment(_get(props.primeOrderData, 'primeStart')).format('MMM Do YYYY')}
                    <br />
                    <a onClick={() => props.handleShowHistory()}>View history</a>
                </span>

                {/* <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Link to='/premium-products.html'>Upgrade/Downgrade</Link>
                </span> */}
                <span className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <a onClick={props.handleCancelClick}>Cancel Membership</a>
                </span>
            </div>
        </React.Fragment>
    );
}
