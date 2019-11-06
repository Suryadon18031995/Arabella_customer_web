// eslint-disable-next-line no-unused-vars
import React from 'react';
// import _get from 'lodash/get';
// eslint-disable-next-line import/no-extraneous-dependencies
import Panel from 'react-bootstrap/lib/Panel';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListGroup from 'react-bootstrap/lib/ListGroup';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
// import Link from 'react-router-dom/Link';

export default function OneColumnLeftMyAccount(props) {
    return (
        <div>
            <Panel>
                <Panel.Heading><h4><b>MY Account</b></h4></Panel.Heading>
                <Panel.Body>
                    <ListGroup>
                        <ListGroupItem href={'/customer/account'}>
                            Account Dashboard
                        </ListGroupItem>
                        <ListGroupItem href={'/customer/account/edit'}>
                            Account Information
                        </ListGroupItem>
                        <ListGroupItem href={'/customer/account/address'}>Address Book</ListGroupItem>
                        {/* <ListGroupItem href={'/customer/account/billing_agreement'}>Billing Agreement</ListGroupItem> */}
                        <ListGroupItem href={'/customer/account/orders'}>My Orders</ListGroupItem>
                        <ListGroupItem href={'/customer/account/recuring_profile'}>Recuring Profile</ListGroupItem>
                        <ListGroupItem href={'/customer/account/reviews'}>My Product Reviews</ListGroupItem>
                        {/* <ListGroupItem href={'/customer/account/tags'}>My Tags</ListGroupItem> */}
                        <ListGroupItem href={'/customer/account/wishlist'}>My Wishlist</ListGroupItem>
                        <ListGroupItem href={'/customer/account/pending'}>My Vendor Pending Reviews</ListGroupItem>
                        <ListGroupItem href={'/customer/account/vendor_reviews'}>My Vendor Reviews</ListGroupItem>
                        {props.salesRepUser === 'yes' ?
                            <ListGroupItem href={'/salesRep'}>Salesrep</ListGroupItem>
                            : ''
                        }
                        {props.primeUser === '1' ?
                            <React.Fragment>
                            <ListGroupItem href={'/customer/account/premium'}>Premium Member</ListGroupItem>
                            <ListGroupItem href={'/customer/account/rewards'}>My Rewards ${props.rewardsPointAmount}</ListGroupItem>
                            </React.Fragment>
                            : ''
                        }
                    </ListGroup>
                </Panel.Body>
            </Panel>
        </div >
    );
}

