import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import TrackOrderComponent from './../components/BKMComponent/TrackOrderComponent.jsx';
import { fetchTrackOrderData } from '../actions/trackOrder';
import MapComponent from './../components/BKMComponent/MapComponent.jsx';
import loader from '../assets/images/loader2.gif';
import BreadCrumbs from '../components/Common/BreadCrumbs.jsx';
import TrackTableComponent from '../components/BKMComponent/TrackTableComponent.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

class TrackOrderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      radioCheckVal: 'order_id',
      radioVal: undefined,
      errors: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      showOurTable: 'no',
      tableResult: undefined,
      showMap: false,
      isMarkerShown: false,
      toShowPop: undefined,
      showTable: false,
      isOpen: false,
      breadCrumbsList: [
        {
          link: '/',
          name: 'home',
        },
        {
          link: undefined,
          name: 'TRACK ORDER',
        },
      ],
      markers: undefined,
      clickedRadioBtn: undefined,
    };
  }

  componentDidMount() {
    document.title = 'Track Order';
  }

  getCenter = (props) => {
    this.bounds = new window.google.maps.LatLngBounds();

    props.markers.flight && props.markers.flight.map((marker, index) => {
      const position = new window.google.maps.LatLng(marker[index].lat, marker[index].lng);
      this.bounds.extend(position);
    });

    return this.bounds.getCenter();
  }

  onToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(tableType, itemId, allTableDet, invNum) {
    let toShowPop;
    if (!_isEmpty(invNum)) {
      toShowPop = allTableDet[tableType][invNum][itemId];
    } else {
      toShowPop = allTableDet[tableType][itemId];
    }
    this.setState({
      show: true,
      toShowPop,
    });
  }

  getRadioVal = (event) => {
    this.setState({
      radioVal: event.target.value,
    });
  }

  getRadioCheckVal = (event) => {
    this.setState({
      radioCheckVal: event.target.name,
    });
  }

  trackOrder = () => {
    if (this.handleValidation()) {
      this.props.getTrackData({ radio: this.state.radioCheckVal, val: this.state.radioVal });
      this.setState({
        showMap: false,
        clickedRadioBtn: this.state.radioCheckVal,
      });
    }
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;

    if (this.state.radioVal === undefined) {
      formIsValid = false;
      errors.radioVal = 'This is a required field.';
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleWriteReview = (pid, urlKey) => {
    this.setState({
      productId: pid,
      showProd: true,
      urlKey,
    });
  }

  handleTrackDetails = (trackDetails) => {
    this.setState({
      show: true,
      trackDetails,
    });
  }

  handleMoreProductDetail = (productMoreData) => {
    this.setState({
      productMoreData,
      showMoreData: true,
    });
  }

  onToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEmpty(_get(nextProps, 'trackOrderData'))) {
      if (_get(nextProps.trackOrderData, [0, 'code']) === 1) {
        this.setState({
          orderDetails: _get(nextProps.trackOrderData, [0, 'order_items']),
          orderNumber: _get(nextProps.trackOrderData, [0, 'increment_id']),
          mapDetails: _get(nextProps.trackOrderData, [0, 'map_details']),
          shippingAndHandling: _get(nextProps.trackOrderData, [0, 'shipping_and_handling']),
          grandTotal: _get(nextProps.trackOrderData, [0, 'grand_total']),
          subTotal: _get(nextProps.trackOrderData, [0, 'sub_total']),
        });
      } else if (_get(nextProps.trackOrderData, [0, 'code']) === -1) {
        this.setState({ clickedRadioBtn: undefined });
        alert('No Record found');
      }
      if (_get(nextProps.trackOrderData, [0, 'has_map']) === 'yes') {
        this.setState({
          showMap: true,
          showTable: true,
        });
      } else {
        this.setState({
          showMap: false,
          showTable: false,
        });
      }
      if (!_isEmpty(_get(nextProps.trackOrderData, 'track'))) {
        this.setState({
          showMap: true,
        });
        _get(nextProps.trackOrderData, 'track').map((thisStatus, key) => {
          if (thisStatus.status === 'shipped') {
            this.setState({ status: 'In Transit' });
          } else {
            this.setState({ status: thisStatus.status });
          }
        });
      }
    }
  }

  render() {
    if (_get(this, 'props.isLoading')) {
      return (
        <div className="container">
          <div className='loader-wrapper'>
            <img src={loader} alt="lazy-loader" />
          </div>
        </div>
      );
    }

    if (this.state.showProd) {
      return <Redirect push to={{
        pathname: `/${this.state.urlKey}.html`,
        state: { productId: this.state.productId },
      }} />;
    }

    return (
      <div>
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className="container">
          <ErrorBoundary>
            <TrackOrderComponent
              state={this.state}
              getRadioVal={this.getRadioVal}
              trackOrder={this.trackOrder}
              getRadioCheckVal={this.getRadioCheckVal}
              handleShow={this.handleShow}
              handleClose={this.handleClose}
              apiToken={this.props.apiToken}
              markers={this.props.trackOrderData}
              onToggleOpen={this.onToggleOpen}
              bounds={this.bounds}
            />
          </ErrorBoundary>
          {((_get(this.state, 'clickedRadioBtn') === 'order_id') || (_get(this.state, 'clickedRadioBtn') === 'track_id')) &&
            <ErrorBoundary>
              <TrackTableComponent
                state={this.state}
                handleShow={this.handleShow}
                handleClose={this.handleClose}
                handleWriteReview={this.handleWriteReview}
                handleTrackDetails={this.handleTrackDetails}
                handleMoreProductDetail={this.handleMoreProductDetail}
                onToggleOpen={this.onToggleOpen}
                apiToken={this.props.apiToken}
              />
            </ErrorBoundary>
          }
          {/* {this.state.showMap &&
            <MapComponent
              state={this.state}
              markers={this.props.trackOrderData}
              onToggleOpen={this.onToggleOpen}
              bounds={this.bounds}
            />} */}
          {/* {this.state.showMap &&
            <MapWithAMarkerClusterer markers={this.state.markers} />
            } */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTrackData: data => dispatch(fetchTrackOrderData(data)),
});

const mapStateToProps = (state) => {
  const { trackOrderReducer, loginReducer } = state;

  const {
    trackOrderData,
    isFetching: isLoading,
    error: trackOrderError,
  } = trackOrderReducer || [];

  const {
    apiToken,
    error: loginError,
  } = loginReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(trackOrderError) || _isError(trackOrderError);

  return {
    trackOrderData,
    apiToken,
    isLoading,
    error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(TrackOrderContainer));

