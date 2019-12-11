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
            responsive: { 480: { items: 2 }, 760: { items: 3 }, 900: { items: 4 } },
            activeLocation: '',
            editMode: false,
            editLogistics: {},
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
        this.props.fetchLogisticSettings({ artistId: 441 });
    }

    componentDidUpdate(prevProps, prevState) {
        
        if(prevProps.updatingLogistics && !this.props.updatingLogistics) {
            this.props.fetchLogisticSettings({ artistId: 441 });
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
        this.props.updateLogisticSettings(saveObject);
        this.setState({
            activeLocation: '',
            editMode: false,
            editLogistics: {}
        })
    }

    manageValueChangeHandler = (event, type) => {
        
        this.setState({
            editLogistics: {...this.state.editLogistics, [type]: event.target.value}
        });
    }

    render() {

        let locationDetails = null;
        if(this.state.activeLocation !== '') {
            locationDetails = (
                <div className="amp-responsive">
                    <LocationDetails 
                        details={ this.props.locationDetails['logistic_details'][this.state.activeLocation] } 
                        editMode={ this.state.editMode }
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
                    { locationDetails }
                </section>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchLogisticSettings: data => dispatch(vendorActions.fetchLogisticSettings(data)),
    updateLogisticSettings: data => dispatch(vendorActions.updateLogisticSettings(data)),
});

const mapStateToProps = (state) => {
    const {
        vendorArtistsReducer,
    } = state;

    const {
        locationDetails,
        isFetching: isLoading,
        error: vendorArtistError,
        updatingLogistics
    } = vendorArtistsReducer || [];

  
    const error = !_isEmpty(vendorArtistError) || _isError(vendorArtistError);
  
    return {
        locationDetails,
        isLoading,
        error,
        updatingLogistics
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistLogistics);