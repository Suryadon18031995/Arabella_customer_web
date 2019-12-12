import React from 'react';
import { NavLink } from 'react-router-dom';

const orderManagementTabs = props => {
    return (
        <section className="container-fluid container-spacing">
            <ul className="nav nav-pills nav-fill navbar-dark bg-dark">
                <li className="nav-item">
                    <NavLink 
                        to="/artist/orderManagement/newPOs" 
                        className="nav-link amp-artist-link"
                        activeClassName="artist-active-link"
                    >
                        New POs
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/artist/orderManagement/shippingToday" 
                        className="nav-link amp-artist-link"
                        activeClassName="artist-active-link"
                    >
                        Shipping Today
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/artist/orderManagement/pastFuture" 
                        className="nav-link amp-artist-link"
                        activeClassName="artist-active-link"
                    >
                        Past/Future Ship Dates
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/artist/orderManagement/rejected" 
                        className="nav-link amp-artist-link"
                        activeClassName="artist-active-link"
                    >
                        Rejected
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/artist/orderManagement/complete" 
                        className="nav-link amp-artist-link"
                        activeClassName="artist-active-link"
                    >
                        Complete
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/artist/orderManagement/shipped" 
                        className="nav-link amp-artist-link"
                        activeClassName="artist-active-link"
                    >
                        Shipped
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/artist/orderManagement/invoiced" 
                        className="nav-link amp-artist-link"
                        activeClassName="artist-active-link"
                    >
                        Invoiced
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/artist/orderManagement/all" 
                        className="nav-link amp-artist-link"
                        activeClassName="artist-active-link"
                    >
                        All Orders
                    </NavLink>
                </li>
            </ul>
        </section>
    );
}

export default orderManagementTabs;