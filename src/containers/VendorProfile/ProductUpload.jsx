import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';

import * as vendorActions from '../../actions/vendorArtist';
import '../../assets/stylesheets/main.css';
import Loading from '../../components/VendorProfile/Loading.jsx';

class ProductUpload extends Component {
    state = {
        attributes: {
            productType: '',
            revenueModel: '',
            deliveryType: '',
            title: '',
            description: '',
            price: '',
            leadTime: '',
            startDate: '',
            expiryDate: '',
            category: '',
            subCategory: '',
            weight: '',
            length: '',
            width: '',
            height: '',
            deliveryConstraint: '',
            infoCust: '',
            detailsInfo: '',
            mediaFiles: '',
            detailsOfMedia: '',
            groupEvent: '',
            noOfPeople: '',
            prerequisits: '',
            duration: '',
            partnering: '',
            selVendor: '',
            selVendProd: '',
            selectAvail: '',
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
        if(this.props.isLoading === false && prevProps.isLoading === true) {
            alert(this.props.productUploadData.message);
            this.setState({
                attributes: {
                    productType: '',
                    revenueModel: '',
                    deliveryType: '',
                    title: '',
                    description: '',
                    price: '',
                    leadTime: '',
                    startDate: '',
                    expiryDate: '',
                    category: '',
                    subCategory: '',
                    weight: '',
                    length: '',
                    width: '',
                    height: '',
                    deliveryConstraint: '',
                    infoCust: '',
                    detailsInfo: '',
                    mediaFiles: '',
                    detailsOfMedia: '',
                    groupEvent: '',
                    noOfPeople: '',
                    prerequisits: '',
                    duration: '',
                    partnering: '',
                    selVendor: '',
                    selVendProd: '',
                    selectAvail: '',
                }
            });
        }
    }

    handleSelectChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);

        const attributes = {...this.state.attributes};
        attributes[event.target.name] = event.target.value;
        this.setState({ attributes });
    }

    handleInputChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        const attributes = {...this.state.attributes};
        attributes[event.target.name] = event.target.value;
        this.setState({ attributes });
    }

    handleUploadClick = () => {
        // const formData = new FormData();
        // formData.append('attributes', this.state.attributes);
        this.props.createProduct(this.state.attributes);
    }

    handleMediaChange = (event) => {
        console.log('name:', event.target.files[0]);
        const formData = new FormData();
        formData.set('username', 'Groucho');
        formData.append('accountnum', 123456);
        console.log(formData);
    }

    render() {

        return (
            <section className='container-fluid'>
                <Loading
                    display={(this.props.isLoading ? '' : 'none' )}
                />
                <section className="container-fluid container-spacing">
                    <ul className="nav nav-pills nav-fill navbar-dark bg-dark">
                        <li className="nav-item">
                            <NavLink 
                                to="/artist/productUpload" 
                                className="nav-link amp-artist-link"
                                activeClassName="artist-active-link"
                            >
                                Add Product
                            </NavLink>
                        </li>
                    </ul>
                </section>
                <section className="col-xs-12">
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Type of Product</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <select className="form-control" name="productType" onChange={this.handleSelectChange} value={this.state.attributes.productType}>
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
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Revenue Model</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <select className="form-control" name="revenueModel" onChange={this.handleSelectChange} value={this.state.attributes.revenueModel}>
                                <option value="" defaultValue="selected">* Please select</option>
                                <option value="5385">On Rent</option>
                                <option value="5386">One Time Sale</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Delivery Type</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <select className="form-control" name="deliveryType" onChange={this.handleSelectChange} value={this.state.attributes.deliveryType}>
                                <option value="" defaultValue="selected">* Please select</option>
                                <option value="5396">Deliver Online</option>
                                <option value="5395">Pickup By Shipping Service</option>
                                <option value="5394">Drop At Shipping Service</option>
                                <option value="5393">Delivery At Customer Doorstep</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Title</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='title' onChange={this.handleInputChange} value={this.state.attributes.title} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Product Description</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='description' onChange={this.handleInputChange} value={this.state.attributes.description} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Upload Product Media</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" type='file' accept='image/*' name='media' onChange={this.handleMediaChange} value={this.state.attributes.media} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Price of the Product</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='price' onChange={this.handleInputChange} value={this.state.attributes.price} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Manufacturing Lead Time</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='leadTime' onChange={this.handleInputChange} value={this.state.attributes.leadTime} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Start Date</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='startDate' onChange={this.handleInputChange} value={this.state.attributes.startDate} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Expiry Date</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='expiryDate' onChange={this.handleInputChange} value={this.state.attributes.expiryDate} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Art Category</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='category' onChange={this.handleInputChange} value={this.state.attributes.category} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Art Sub Category</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='subCategory' onChange={this.handleInputChange} value={this.state.attributes.subCategory} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Art Description</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            {/* <input className="form-control" name='artDesc' onChange={this.handleInputChange} value={this.state.attributes.artDesc} /> */}
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Weight of the product</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='weight' onChange={this.handleInputChange} value={this.state.attributes.weight} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Length of the Product</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='length' onChange={this.handleInputChange} value={this.state.attributes.length} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Width of Product</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='width' onChange={this.handleInputChange} value={this.state.attributes.width} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Height of the Product</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='height' onChange={this.handleInputChange} value={this.state.attributes.height} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Is Delivery Constraint to your Zip Code</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <select className="form-control" name="deliveryConstraint" onChange={this.handleSelectChange} value={this.state.attributes.deliveryConstraint}>
                                <option value="" defaultValue="selected">* Please select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    {this.state.attributes.productType === '5389' ?
                        <React.Fragment>
                            <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <label>Need Info From Customer</label>
                                </div>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <select className="form-control" name="infoCust" onChange={this.handleSelectChange} value={this.state.attributes.infoCust}>
                                        <option value="" defaultValue="selected">* Please select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <label>Details of Information Required</label>
                                </div>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <input className="form-control" name='detailsInfo' onChange={this.handleInputChange} value={this.state.attributes.detailsInfo} />
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <label>Need Media Files From Customer</label>
                                </div>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <select className="form-control" name="mediaFiles" onChange={this.handleSelectChange} value={this.state.attributes.mediaFiles}>
                                        <option value="" defaultValue="selected">* Please select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <label>Details of media files Required</label>
                                </div>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <input className="form-control" name='detailsOfMedia' onChange={this.handleInputChange} value={this.state.attributes.detailsOfMedia} />
                                </div>
                            </div>
                        </React.Fragment>
                        : ''}
                    {this.state.attributes.productType === '5388' ?
                        <React.Fragment>
                            <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <label>Is this a Group Event</label>
                                </div>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <select className="form-control" name="groupEvent" onChange={this.handleSelectChange} value={this.state.attributes.groupEvent}>
                                        <option value="" defaultValue="selected">* Please select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <label>Number of People in Group</label>
                                </div>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <input className="form-control" name='noOfPeople' onChange={this.handleInputChange} value={this.state.attributes.noOfPeople} />
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <label>Duration of the Event</label>
                                </div>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <input className="form-control" name='duration' onChange={this.handleInputChange} value={this.state.attributes.duration} />
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-12 col-xs-12 col-sm-12 container-spacing'>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <label>Any Pre-requiste required for the Event</label>
                                </div>
                                <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                    <input className="form-control" name='prerequisits' onChange={this.handleInputChange} value={this.state.attributes.prerequisits} />
                                </div>
                            </div>
                        </React.Fragment>
                        : ''}
                    <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Are you Partnering with any of our Vendor</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <select className="form-control" name="partnering" onChange={this.handleSelectChange} value={this.state.attributes.partnering}>
                                <option value="" defaultValue="selected">* Please select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Select Vendor</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='selVendor' onChange={this.handleInputChange} value={this.state.attributes.selVendor} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Select Vendor Product</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='selVendProd' onChange={this.handleInputChange} value={this.state.attributes.selVendProd} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <label>Select Availability</label>
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                            <input className="form-control" name='selectAvail' onChange={this.handleInputChange} value={this.state.attributes.selectAvail} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 container-spacing'>
                        <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6' style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <button className='btn btn-raised btn-success' onClick={this.handleUploadClick}>Upload Product</button>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    createProduct: data => dispatch(vendorActions.createProducts(data)),
});

const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        productUploadData,
        isFetching: isLoading,
        error: vendorArtistError,
    } = vendorArtistsReducer || [];

  
    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        productUploadData,
        isLoading,
        error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpload);