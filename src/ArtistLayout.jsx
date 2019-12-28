import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';

import * as vendorActions from './actions/vendorArtist';

class ArtistLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artistId: '',
            artistName: '',
            apiToken: ''
        }
    }

    componentDidMount() {

        const artistDetails = this.props.artistDetails;
        console.log(this.props.artistDetails);
        if(artistDetails.code === 1) {
            this.setState({
                artistId: artistDetails.result.vendor_id,
                artistName: artistDetails.result.vendor_name,
                apiToken: artistDetails.result.api_token,
            });
        }
        else {
            this.props.history.replace('/artist/login');
        }
    }

    componentDidUpdate() {
        const artistDetails = this.props.artistDetails;
        if(_isEmpty(artistDetails)) {
            this.props.history.replace('/artist/login');
        }
    }

    logoutHandler = () => {
        this.props.logout({
            email: '',
            apiToken: this.state.apiToken,
            vendor_id: this.state.artistId
        });
    }

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
                        <li className="nav-item">
                            <NavLink 
                                to="#" 
                                className="nav-link amp-artist-link"
                                activeClassName="artist-active-link"
                            >
                                <span 
                                    style={{ fontSize: '13px', borderBottom: '1px solid #FFF' }} 
                                    title="Click to Logout"
                                    onClick={ this.logoutHandler }
                                >
                                    { this.state.artistName }
                                </span>
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

const mapDispatchToProps = dispatch => ({
    logout: (data) => dispatch(vendorActions.logout(data)),
});

const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        locationDetails,
        isFetching: isLoading,
        error: vendorArtistError,
        artistDetails
    } = vendorArtistsReducer || [];

  
    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        locationDetails,
        isLoading,
        error,
        artistDetails,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistLayout);