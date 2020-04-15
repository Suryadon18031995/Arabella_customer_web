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
                <Panel.Heading><h4><b>MY ACCOUNT</b></h4></Panel.Heading>
                <Panel.Body>
                    <ListGroup>
                        <ListGroupItem href={'/customer/account'}>
                           MY ACCOUNT
                        </ListGroupItem>
                        <ListGroupItem href={'/customer/account/orders'}>MY ORDERS</ListGroupItem>
                        <ListGroupItem href={'/customer/account/address'}>ADDRESS BOOK</ListGroupItem>
                        <ListGroupItem href={'/customer/account/edit'}>
                          MY REWARDS
                        </ListGroupItem>
                        <ListGroupItem href={'/customer/account/edit'}>
                          MY RATINGS AND REVIEWS
                        </ListGroupItem>
                        {/* <ListGroupItem href={'/customer/account/billing_agreement'}>Billing Agreement</ListGroupItem> */}
                       
                      
                    </ListGroup>
                </Panel.Body>
            </Panel>
        </div >
    );
}

