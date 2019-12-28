import React from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _get from 'lodash/get';
import { NavLink } from 'react-router-dom';

import * as vendorActions from '../../actions/vendorArtist';
import '../../assets/stylesheets/main.css';
import Loading from '../../components/VendorProfile/Loading.jsx';
import MaModal from '../../components/Common/MaterialUIModal.jsx';

class ProductUpdate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: '', 
            showModal: false,
            attributes: {
                entity_id: "",
                product_type: "",
                revenue_model: "",
                delivery_type: "",
                name: "",
                description: "",
                price: "",
                manufacturing_lead_time: "",
                start_date: "",
                expiry_date: "",
                category: "",
                sub_category: "",
                box_weight: "",
                box_length: "",
                box_width: "",
                box_height: "",
                zipcode_constraint: "",
                partenering: "",
                vendor: "",
            },
            mapping: {
                entity_id: "productId",
                product_type: "productType",
                revenue_model: "revenueModel",
                delivery_type: "deliveryType",
                name: "title",
                description: "productDescription",
                price: "price",
                manufacturing_lead_time: "",
                start_date: "startDate",
                expiry_date: "expiryDate",
                category: "category",
                sub_category: "subCategory",
                box_weight: "weight",
                box_length: "length",
                box_width: "width",
                box_height: "height",
                zipcode_constraint: "zipcodeConstraint",
                partenering: "",
                vendor: "artistId",
            },
            productEditing: '',
            artistId: ''
        }
    }

    componentDidMount() {
        const artistDetails = this.props.artistDetails;
        if(artistDetails.code === 1) {
            this.props.fetchProductRequirements();
            this.props.fetchArtistProducts({ artistId: artistDetails.result.vendor_id });
            this.setState({
                artistId: artistDetails.result.vendor_id,
                attributes: {...this.state.attributes, vendor: artistDetails.result.vendor_id}
            });
        }
        else {
            this.props.history.replace('/artist/login');
        }
    }

    componentDidUpdate(prevProps) {
        
        if(prevProps.updatingProduct && !this.props.updatingProduct) {
            this.props.fetchArtistProducts({ artistId: this.state.artistId });
        }
    }

    manageTableSearchHandler = event => {

        this.setState({
            searchText: event.target.value
        });
    }

    showModal = product => {
        
        this.setState(prevState => ({
            showModal: !prevState.showModal,
            attributes: product,
            productEditing: product.entity_id
        }));
    }

    handleSelectChange = (event) => {
        
        const attributes = {...this.state.attributes};
        attributes[event.target.name] = event.target.value;
        this.setState({ attributes });
    }

    handleInputChange = (event) => {
        const attributes = {...this.state.attributes};
        attributes[event.target.name] = event.target.value;
        this.setState({ attributes });
    }

    updateProductHandler = () => {

        const data = {};
        for(const attribute in this.state.attributes) {
            if(this.state.mapping[attribute])
                data[this.state.mapping[attribute]] = this.state.attributes[attribute];
        }
        this.props.updateProduct(data);
        this.setState({
            showModal: false
        })
    }

    render() {

        console.log('attributes', this.state.attributes);
        const productRequirements = _get(this.props.productRequirements, 'attributes', {});
        
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
                        {/* <th>Manufacturing Lead Time</th> */}
                        {/* <th>Start Date</th> */}
                        {/* <th>Expiry Date</th> */}
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Weight</th>
                        <th>Length</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th>Delivery Constraint</th>
                        {/* <th>Partnering</th> */}
                        <th>Edit</th>
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
                                <td>{ _get(productRequirements, ['product_type', row.product_type], '') }</td>
                                <td>{ _get(productRequirements, ['revenue_model', row.revenue_model], '') }</td>
                                <td>{ _get(productRequirements, ['delivery_type', row.delivery_type], '') }</td>
                                <td>{ row.name }</td>
                                <td>{ row.description }</td>
                                <td>{ row.price }</td>
                                {/* <td>{ row.manufacturing_lead_time }</td> */}
                                {/* <td>{ row.start_date }</td> */}
                                {/* <td>{ row.expiry_date }</td> */}
                                <td>{ _get(productRequirements, ['categories', row.category], '') }</td>
                                <td>{ row.sub_category }</td>
                                <td>{ row.box_weight }</td>
                                <td>{ row.box_length }</td>
                                <td>{ row.box_width }</td>
                                <td>{ row.box_height }</td>
                                <td>{ _get(productRequirements, ['zipcode_constraint', row.zipcode_constraint], '') }</td>
                                {/* <td>{ row.partenering }</td> */}
                                <td>
                                    <button 
                                        className="btn btn-outline-danger btn-sm" 
                                        onClick={ this.showModal.bind(null, row) }
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        );
                    }
                });
            }

            tableMarkup = (
                <section>
                    { searchMarkup }
                    <div className="container-spacing amp-responsive">
                        <table className="table table-bordered">
                            {thead}
                            {tbody}
                        </table>
                    </div>
                </section>
            );
        }

        const modal = (
            <MaModal open={ this.state.showModal } handleCloseModal={ this.showModal }>
                <section>
                    <section style={{ borderBottom: '1px solid #000' }}>
                        <h4>Product Update</h4>
                    </section>
                    <section style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Type of Product</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <select className="form-control" name="product_type" onChange={ this.handleSelectChange } value={this.state.attributes.product_type}>
                                    <option value="" defaultValue="selected">* Please select</option>
                                    <option value="5392">Regular Sale</option>
                                    <option value="5391">Rental Model</option>
                                    <option value="5390">Deliver at Customer Location</option>
                                    <option value="5389">Deliver Online</option>
                                    <option value="5388">Live Art Performance</option>
                                    <option value="5387">Training and Socialize</option>
                                </select>
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Revenue Model</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <select className="form-control" name="revenue_model" onChange={this.handleSelectChange} value={this.state.attributes.revenue_model}>
                                    <option value="" defaultValue="selected">* Please select</option>
                                    <option value="5385">On Rent</option>
                                    <option value="5386">One Time Sale</option>
                                </select>
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Delivery Type</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <select className="form-control" name="delivery_type" onChange={this.handleSelectChange} value={this.state.attributes.delivery_type}>
                                    <option value="" defaultValue="selected">* Please select</option>
                                    <option value="5396">Deliver Online</option>
                                    <option value="5395">Pickup By Shipping Service</option>
                                    <option value="5394">Drop At Shipping Service</option>
                                    <option value="5393">Delivery At Customer Doorstep</option>
                                </select>
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Title</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='name' onChange={this.handleInputChange} value={this.state.attributes.name} />
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Product Description</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='description' onChange={this.handleInputChange} value={this.state.attributes.description} />
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Price of the Product</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='price' onChange={this.handleInputChange} value={this.state.attributes.price} />
                            </div>
                        </div>
                        {/* <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Manufacturing Lead Time</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='manufacturing_lead_time' onChange={this.handleInputChange} value={this.state.attributes.manufacturing_lead_time} />
                            </div>
                        </div> */}
                        {/* <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Start Date</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='start_date' onChange={this.handleInputChange} value={this.state.attributes.start_date} />
                            </div>
                        </div> */}
                        {/* <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Expiry Date</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='expiry_date' onChange={this.handleInputChange} value={this.state.attributes.expiry_date} />
                            </div>
                        </div> */}
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Art Category</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <select className="form-control" name="category" onChange={this.handleInputChange} value={this.state.attributes.category}>
                                    <option value="" defaultValue="selected">* Please select Category</option>
                                    { Object.keys(_get(productRequirements, ['categories'], {})).map(currentCategoryId => (
                                        <option value={ currentCategoryId }>{ _get(productRequirements, ['categories', currentCategoryId], {}) }</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Art Sub Category</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='sub_category' onChange={this.handleInputChange} value={this.state.attributes.sub_category} />
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Weight of the product</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='box_weight' onChange={this.handleInputChange} value={this.state.attributes.box_weight} />
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-6'>
                                <label>Length of the Product</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-6'>
                                <input className="form-control" name='box_length' onChange={this.handleInputChange} value={this.state.attributes.box_length} />
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Width of Product</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='box_width' onChange={this.handleInputChange} value={this.state.attributes.box_width} />
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Height of the Product</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <input className="form-control" name='box_height' onChange={this.handleInputChange} value={this.state.attributes.box_height} />
                            </div>
                        </div>
                        <div className='container-spacing'>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <label>Is Delivery Constraint to your Zip Code</label>
                            </div>
                            <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                                <select className="form-control" name="zipcode_constraint" onChange={this.handleSelectChange} value={this.state.attributes.zipcode_constraint}>
                                    <option value="" defaultValue="selected">* Please select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                    </section>
                    <div className='container-spacing'>
                        <div className='row col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                            <button 
                                className="col-lg-6 btn btn-success btn-sm"
                                onClick={ this.updateProductHandler }
                            >
                                Update
                            </button>
                            <button 
                                className="col-lg-6 btn btn-danger btn-sm"
                                onClick={ this.showModal.bind(null, {}) }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </section>
            </MaModal>
        );

        return (
            <section className="container-fluid">
                {
                    modal
                }
                <section className="container-spacing">
                    { tableMarkup }
                </section>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProductRequirements: () => dispatch(vendorActions.fetchProductRequirements()),
    fetchArtistProducts: data => dispatch(vendorActions.fetchArtistProducts(data)),
    updateProduct: data => dispatch(vendorActions.updateProduct(data)),
});

const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        productsList,
        isFetching: isLoading,
        updatingProduct,
        error: vendorArtistError,
        artistDetails,
        productRequirements
    } = vendorArtistsReducer || [];

    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        productsList,
        isLoading,
        error,
        updatingProduct,
        artistDetails,
        productRequirements
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);