import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';

import * as vendorActions from '../../actions/vendorArtist';
import '../../assets/stylesheets/main.css';
import Loading from '../../components/VendorProfile/Loading.jsx';
import Location from '../../components/VendorProfile/Location.jsx';
import LocationDetails from '../../components/VendorProfile/LocationDetails.jsx';

class ArtistLogistics extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artistId: '',
            responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
            activeLocation: '',
            editMode: false,
            createMode: false,
            editLogistics: {
                loc_logistics_id: "",
                vendor_id: "",
                location_id: "",
                freight_forwarder_id: "",
                vendor_country_id: "IN",
                origin_country_id: "IN",
                cost_channel_id: "",
                leadtime: "",
                buffer_days: "",
                booking_days_adj: "",
                subscription_set: "",
                allow_add_chg: "",
                hide_from_guest: "",
                customer_truck_req: "",
                lead_time_to_box_handler: "",
                usefilabels: "",
                shipping_account_number: "",
                shipping_user: "",
                shipping_password: "",
                shipping_access_license: "",
                sun: "",
                mon: "",
                tue: "",
                wed: "",
                thu: "",
                fri: "",
                sat: "",
                sunday_timing: "",
                monday_timing: "",
                tuesday_timing: "",
                wednesday_timing: "",
                thursday_timing: "",
                friday_timing: "",
                saturday_timing: "",
                isActive: ""
            },
            editLogisticsFormat: {
                loc_logistics_id: "",
                vendor_id: "",
                location_id: "",
                freight_forwarder_id: "",
                vendor_country_id: "IN",
                origin_country_id: "IN",
                cost_channel_id: "",
                leadtime: "",
                buffer_days: "",
                booking_days_adj: "",
                subscription_set: "",
                allow_add_chg: "",
                hide_from_guest: "",
                customer_truck_req: "",
                lead_time_to_box_handler: "",
                usefilabels: "",
                shipping_account_number: "",
                shipping_user: "",
                shipping_password: "",
                shipping_access_license: "",
                sun: "",
                mon: "",
                tue: "",
                wed: "",
                thu: "",
                fri: "",
                sat: "",
                sunday_timing: "",
                monday_timing: "",
                tuesday_timing: "",
                wednesday_timing: "",
                thursday_timing: "",
                friday_timing: "",
                saturday_timing: "",
                isActive: ""
            },
            mapping: {
                loc_logistics_id: "logisticsId",
                vendor_id: "artistId",
                location_id: "locId",
                freight_forwarder_id: "freightForwarderId",
                vendor_country_id: "countryId",
                cost_channel_id: "costChannelId",
                leadtime: "leadTime",
                buffer_days: "bufferDays",
                booking_days_adj: "bookDaysAdjust",
                subscription_set: "subscriptionSet",
                allow_add_chg: "allowAddChange",
                hide_from_guest: "hideFromGuest",
                customer_truck_req: "customerTruckReq",
                lead_time_to_box_handler: "leadTimeBoxHandler",
                usefilabels: "useFiLabels",
                shipping_account_number: "shippingNumber",
                shipping_user: "shippingUser",
                shipping_password: "shippingPassword",
                shipping_access_license: "shippingAccessLicense",
                sun: "sunday",
                mon: "monday",
                tue: "tuesday",
                wed: "wednesday",
                thu: "thursday",
                fri: "friday",
                sat: "saturday",
                sunday_timing: "sundayTiming",
                monday_timing: "mondayTiming",
                tuesday_timing: "tuesdayTiming",
                wednesday_timing: "wednesdayTiming",
                thursday_timing: "thursdayTiming",
                friday_timing: "fridayTiming",
                saturday_timing: "saturdayTiming",
                isActive: "is_active"
            }
        }
    }

    componentDidMount() {

        const artistDetails = this.props.artistDetails;
        if(artistDetails.code === 1) {
            this.props.fetchLogisticSettings({ artistId: artistDetails.result.vendor_id });
            this.setState({
                artistId: artistDetails.result.vendor_id,
                editLogistics: {...this.state.editLogistics, vendor_id: artistDetails.result.vendor_id},
                editLogisticsFormat: {...this.state.editLogisticsFormat, vendor_id: artistDetails.result.vendor_id},
            });
        }
        else {
            this.props.history.replace('/artist/login');
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.updatingLogistics && !this.props.updatingLogistics) {
            this.props.fetchLogisticSettings({ artistId: this.state.artistId });
        }
    }

    manageLocationClick = locationId => {

        if(locationId !== 'new') {
            this.setState({
                activeLocation: locationId
            });
        }
        else {
            alert('Add New Location, Yet to be coded');
        }
    }

    manageLogisticsEdit = data => {

        this.setState({
            editMode: true,
            createMode: false,
            editLogistics: data
        });
    }

    manageLogisticsSave = () => {
        
        const saveObject = {};
        const editLogistics = this.state.editLogistics;
        Object.keys(editLogistics).forEach(currentKey => {
            const mappingKey = (this.state.mapping[currentKey] !== undefined ? this.state.mapping[currentKey] : currentKey);
            saveObject[mappingKey] = editLogistics[currentKey];
        });

        if(this.state.createMode) {
            this.props.addLogisticSettings(saveObject);
        }
        else {
            this.props.updateLogisticSettings(saveObject);
        }
        this.setState({
            editMode: false,
            createMode: false,
            editLogistics: this.state.editLogisticsFormat
        });
    }

    manageAddLogisticsHandler = () => {
        
        this.setState({
            createMode: true,
            editMode: true,
            editLogistics: { ...this.state.editLogisticsFormat, location_id: this.state.activeLocation }
        });
    }

    manageValueChangeHandler = (event, type, isCheckbox = false) => {

        console.log(event.target.value, type);

        this.setState({
            editLogistics: {...this.state.editLogistics, [type]: (isCheckbox ? (event.target.checked ? 'Y' : 'N') : event.target.value)}
        });
    }

    render() {

        let locationDetails = null;
        if(this.state.activeLocation !== '' && !this.props.isLoading) {
            locationDetails = (                    
                <div className="amp-responsive">
                    <LocationDetails 
                        details={ this.props.locationDetails['logistic_details'][this.state.activeLocation] } 
                        ff={ this.props.locationDetails['ff'] }
                        cc={ this.props.locationDetails['cc'] }
                        editMode={ this.state.editMode }
                        createMode={ this.state.createMode }
                        logistics= { this.state.editLogistics }
                        edit={ this.manageLogisticsEdit }
                        save={ this.manageLogisticsSave }
                        manageValueChangeHandler={ this.manageValueChangeHandler }
                    />
                </div>
            );
        }

        return (
            <section className="container-fluid">
                <Loading
                    display={(this.props.isLoading ? '' : 'none' )}
                />
                <section className="container-fluid container-spacing">
                    <ul className="nav nav-pills nav-fill navbar-dark bg-dark">
                        <li className="nav-item">
                            <NavLink 
                                to="/artist/logistics" 
                                className="nav-link amp-artist-link"
                                activeClassName="artist-active-link"
                            >
                                Logistic Settings
                            </NavLink>
                        </li>
                    </ul>
                </section>
                <section>
                    <Location 
                        responsive={ this.state.responsive }
                        data={ this.props.locationDetails }
                        click={ (locationId) => this.manageLocationClick(locationId) }
                    />
                </section>
                <section className='container-fluid container-spacing'>
                    { locationDetails === null ? null :
                        <div className="col-lg-12" style={{ textAlign: 'right' }}>
                            <button 
                                className="btn btn-outline-success btn-sm" 
                                onClick={this.manageAddLogisticsHandler}
                            >
                                ADD Logistics
                            </button>
                        </div>  
                    }
                    { locationDetails }
                </section>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchLogisticSettings: data => dispatch(vendorActions.fetchLogisticSettings(data)),
    updateLogisticSettings: data => dispatch(vendorActions.updateLogisticSettings(data)),
    addLogisticSettings: data => dispatch(vendorActions.addLogisticSettings(data)),
});

const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        locationDetails,
        isFetching: isLoading,
        error: vendorArtistError,
        updatingLogistics,
        artistDetails
    } = vendorArtistsReducer || [];

  
    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        locationDetails,
        isLoading,
        error,
        artistDetails,
        updatingLogistics
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistLogistics);