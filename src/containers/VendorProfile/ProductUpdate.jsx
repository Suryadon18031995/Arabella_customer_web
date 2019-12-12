import React from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import { NavLink } from 'react-router-dom';

import * as vendorActions from '../../actions/vendorArtist';
import '../../assets/stylesheets/main.css';
import Loading from '../../components/VendorProfile/Loading.jsx';

class ProductUpdate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        }
    }

    componentDidMount() {
        this.props.fetchArtistProducts({ artistId: 440 });
    }

    manageTableSearchHandler = event => {

        this.setState({
            searchText: event.target.value
        });
    }

    render() {
        
        let tableMarkup = null;
        if(this.props.isLoading) {
            tableMarkup = (
                <Loading display="" />
            );
        }
        else if(this.props.productsList.code !== 1) {
            tableMarkup = (
                <div className="alert alert-warning">
                    { this.props.productsList.message }
                </div>
            );
        }
        else if(this.props.productsList.code === 1) {

            const searchMarkup = (
                <div className="container-spacing">
                    <div className="col-lg-2">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search..." 
                            value={ this.state.searchText }
                            onChange={ this.manageTableSearchHandler }
                        />
                    </div>
                </div>
            );

            const thead = (
                <thead>
                    <tr>
                        <th>Product Type</th>
                        <th>Revenue Model</th>
                        <th>Delivery Type</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Lead Time</th>
                        <th>Start Date</th>
                        <th>Expiry Date</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Weight</th>
                        <th>Length</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th>Delivery Constraint</th>
                        <th>Partnering</th>
                        <th>Vendor</th>
                    </tr>
                </thead>
            );

            let tbody = null;
            if(this.props.productsList.products.length === 0) {
                tbody = (
                    <tr>
                        <td colSpan="18">No Products Found</td>
                    </tr>
                );
            }
            else {

                tbody = this.props.productsList.products.map(row => {

                    if(this.state.searchText.trim() === '' || Object.values(row).join('\n').toLowerCase().includes(this.state.searchText.toLowerCase())) {
                        return (
                            <tr key={row.entity_id}>
                                <td>{ row.product_type }</td>
                                <td>{ row.revenueModel }</td>
                                <td>{ row.deliveryType }</td>
                                <td>{ row.name }</td>
                                <td>{ row.description }</td>
                                <td>{ row.price }</td>
                                <td>{ row.lead_time }</td>
                                <td>{ row.start_date }</td>
                                <td>{ row.expiry_date }</td>
                                <td>{ row.category }</td>
                                <td>{ row.sub_category }</td>
                                <td>{ row.box_weight }</td>
                                <td>{ row.box_length }</td>
                                <td>{ row.box_width }</td>
                                <td>{ row.box_height }</td>
                                <td>{ row.delivery_constraint }</td>
                                <td>{ row.partenering }</td>
                                <td>{ row.vendor }</td>
                            </tr>
                        );
                    }
                });

                console.log(tbody);
            }

            tableMarkup = (
                <section>
                    { searchMarkup }
                    <div className="container-spacing">
                        <table className="table table-bordered">
                            {thead}
                            {tbody}
                        </table>
                    </div>
                </section>
            );
        }

        return (
            <section className="container-fluid">
                <section className="container-spacing">
                    { tableMarkup }
                </section>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchArtistProducts: data => dispatch(vendorActions.fetchArtistProducts(data)),
});

const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        productsList,
        isFetching: isLoading,
        error: vendorArtistError,
    } = vendorArtistsReducer || [];

  
    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        productsList,
        isLoading,
        error
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);