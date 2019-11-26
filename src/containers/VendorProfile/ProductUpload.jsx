import React, { Component } from 'react';
// import _get from 'lodash/get';

class ProductUpload extends Component {
    state = {
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

    handleSelectChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }

    handleInputChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }

    handleUploadClick = () => {
        console.log(this.state);
        const formData = new FormData();
        formData.append('productType', this.state.productType);
        formData.append('revenueModel', this.state.revenueModel);
        console.log('Hey!');
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
            <div className='container'>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '50px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Type of Product</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <select name="productType" onChange={this.handleSelectChange} value={this.state.productType}>
                            <option value="" defaultValue="selected">* Please select</option>
                            <option value="regSale">Regular Sale</option>
                            <option value="rental">Rental Model</option>
                            <option value="deliver">Deliver at Customer Location</option>
                            <option value="online">Deliver Online</option>
                            <option value="liveArt">Live Art Performance</option>
                            <option value="training">Training and Socialize</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Revenue Model</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <select name="revenueModel" onChange={this.handleSelectChange} value={this.state.revenueModel}>
                            <option value="" defaultValue="selected">* Please select</option>
                            <option value="rental">On Rent</option>
                            <option value="sale">One Time Sale</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Delivery Type</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <select name="deliveryType" onChange={this.handleSelectChange} value={this.state.deliveryType}>
                            <option value="" defaultValue="selected">* Please select</option>
                            <option value="online">Deliver Online</option>
                            <option value="pickup">Pickup By Shipping Service</option>
                            <option value="drop">Drop At Shipping Service</option>
                            <option value="delivery">Delivery At Customer Doorstep</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Title</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='title' onChange={this.handleInputChange} value={this.state.title} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Product Description</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='description' onChange={this.handleInputChange} value={this.state.description} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Upload Product Media</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input type='file' accept='image/*' name='media' onChange={this.handleMediaChange} value={this.state.media} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Price of the Product</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='price' onChange={this.handleInputChange} value={this.state.price} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Manufacturing Lead Time</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='leadTime' onChange={this.handleInputChange} value={this.state.leadTime} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Start Date</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='startDate' onChange={this.handleInputChange} value={this.state.startDate} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Expiry Date</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='expiryDate' onChange={this.handleInputChange} value={this.state.expiryDate} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Art Category</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='category' onChange={this.handleInputChange} value={this.state.category} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Art Sub Category</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='subCategory' onChange={this.handleInputChange} value={this.state.subCategory} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Art Description</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        {/* <input name='artDesc' onChange={this.handleInputChange} value={this.state.artDesc} /> */}
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Weight of the product</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='weight' onChange={this.handleInputChange} value={this.state.weight} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Length of the Product</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='length' onChange={this.handleInputChange} value={this.state.length} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Width of Product</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='width' onChange={this.handleInputChange} value={this.state.width} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Height of the Product</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='height' onChange={this.handleInputChange} value={this.state.height} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Is Delivery Constraint to your Zip Code</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <select name="deliveryConstraint" onChange={this.handleSelectChange} value={this.state.deliveryConstraint}>
                            <option value="" defaultValue="selected">* Please select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
                {this.state.productType === 'online' ?
                    <React.Fragment>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <label>Need Info From Customer</label>
                            </div>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <select name="infoCust" onChange={this.handleSelectChange} value={this.state.infoCust}>
                                    <option value="" defaultValue="selected">* Please select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <label>Details of Information Required</label>
                            </div>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <input name='detailsInfo' onChange={this.handleInputChange} value={this.state.detailsInfo} />
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <label>Need Media Files From Customer</label>
                            </div>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <select name="mediaFiles" onChange={this.handleSelectChange} value={this.state.mediaFiles}>
                                    <option value="" defaultValue="selected">* Please select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <label>Details of media files Required</label>
                            </div>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <input name='detailsOfMedia' onChange={this.handleInputChange} value={this.state.detailsOfMedia} />
                            </div>
                        </div>
                    </React.Fragment>
                    : ''}
                {this.state.productType === 'liveArt' ?
                    <React.Fragment>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <label>Is this a Group Event</label>
                            </div>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <select name="groupEvent" onChange={this.handleSelectChange} value={this.state.groupEvent}>
                                    <option value="" defaultValue="selected">* Please select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <label>Number of People in Group</label>
                            </div>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <input name='noOfPeople' onChange={this.handleInputChange} value={this.state.noOfPeople} />
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <label>Duration of the Event</label>
                            </div>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <input name='duration' onChange={this.handleInputChange} value={this.state.duration} />
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <label>Any Pre-requiste required for the Event</label>
                            </div>
                            <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                                <input name='prerequisits' onChange={this.handleInputChange} value={this.state.prerequisits} />
                            </div>
                        </div>
                    </React.Fragment>
                    : ''}
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Are you Partnering with any of our Vendor</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <select name="partnering" onChange={this.handleSelectChange} value={this.state.partnering}>
                            <option value="" defaultValue="selected">* Please select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Select Vendor</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='selVendor' onChange={this.handleInputChange} value={this.state.selVendor} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Select Vendor Product</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='selVendProd' onChange={this.handleInputChange} value={this.state.selVendProd} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px' }}>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <label>Select Availability</label>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6 col-sm-6'>
                        <input name='selectAvail' onChange={this.handleInputChange} value={this.state.selectAvail} />
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12' style={{ marginTop: '10px', textAlign: 'center', marginBottom: '10px' }}>
                    <button className='btn-primary' style={{ padding: '5px' }} onClick={this.handleUploadClick}>Upload Product</button>
                </div>
            </div>
        );
    }
}

export default ProductUpload;