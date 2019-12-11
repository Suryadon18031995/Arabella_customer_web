import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from './assets/images/LOGO.png';

class ArtistLayout extends React.Component {

    render() {

        return (
            <div className="artist-container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand amp-artist-logo" href="#">Funkar</a>
                    </div>
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <NavLink 
                                to="/artist/orderManagement/newPOs" 
                                className="nav-link amp-artist-link"
                                activeClassName="artist-active-link"
                            >
                                ORDERS
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/artist/productUpload" 
                                className="nav-link amp-artist-link"
                                activeClassName="artist-active-link"
                            >
                                PRODUCT UPLOAD
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/artist/productUpdate" 
                                className="nav-link amp-artist-link"
                                activeClassName="artist-active-link"
                            >
                                PRODUCT UPDATE
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/artist/logistics" 
                                className="nav-link amp-artist-link"
                                activeClassName="artist-active-link"
                            >
                                LOGISTICS
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <section style={{ width: '100%' }}>
                    { this.props.children }
                </section>
            </div>
        );
    }
}

export default ArtistLayout;