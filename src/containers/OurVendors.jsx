// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

class OurVendors extends Component {
    componentDidMount() {
        document.title = 'Our Vendors';
    }
    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <div className="container container-main">
                <div className="em-main-container em-col1-layout">
                    <div className="row">
                        <div className="em-col-main col-sm-24">
                            <div className="std">
                                <img align="center" src="https://d2ob14u1yb5v44.cloudfront.net/media/wysiwyg/comingsoon.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default OurVendors;
