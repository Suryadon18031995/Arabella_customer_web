// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import BreadCrumbs from '../components/Common/BreadCrumbs.jsx';

class ReturnsAndRefundsPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'RETURNS AND REFUNDS POLICY',
                },
            ],
        };
    }
    componentDidMount() {
        document.title = 'Returns And Refunds Policy';
    }
    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container container-main">
                    <div className="em-inner-main">
                        <div className="em-main-container em-col1-layout">
                            <div className="row">
                                <div className="em-col-main col-sm-24">
                                    <div className="std">
                                        <div className="page-title">
                                            <h1>Returns and Refunds Policy</h1>
                                        </div>
                                        <p>BloomKonnect stands behind everything purchased through our platforms. We appreciate
                                            your confidence and your business and we will make every effort to provide you with the
                                 freshest quality flowers that meet your requirements.</p>
                                        <p></p>
                                        <p>Although we maintain very strict quality assurance programs at farm level and en route,
                                            you may, on occasion, experience problems due to the perishable nature of the fresh
                                            product. If for any reason this should happen, please refer to the following guidelines
                                when requesting credit.</p>
                                        <ul>
                                            <li>Inspect your product as soon as it arrives. This is extremely important.</li>
                                            <li>Report any problems to your salesperson or customer service representative via
                                                email within as soon as possible but in no case in more than 24 hours of receiving
                                                the product. Please be complete in your description of the problem. Note if the box
                                                appeared damaged when received. This information is essential so we advance the
                                    credit request back to the farm or carrier.</li>
                                            <li>Please provide digital photos of the damaged product that you are requesting credit
                                    for.</li>
                                            <li>Individual photo of the problem. Picture of the box if damaged depicting the issue.</li>
                                            <li>Group photo of all products you are requesting credit on. For example If you are
                                                requesting credit on 24 roses, please position for photo purposes, all 24 stems in the
                                    group photo.</li><li>Photo of the label affixed to flower box containing claimed product.
                                    Make sure the Airway Bill number is included.</li>
                                            <li>Unfortunately under our agreements with the farms, we cannot process credit requests
                                    received after 24 hours from delivery or that do not follow the above requirements.</li>
                                            <li>Your saleperson or customer service representative will instruct you on the return of the
                                    product.</li>
                                        </ul>
                                        <p></p>
                                        <p className="a-center">
                                            <strong>If you have any questions please contact your sales person or call:</strong>
                                        </p>
                                        <p className="a-center">
                                            <strong>1-877-893-9984</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ReturnsAndRefundsPolicy;
