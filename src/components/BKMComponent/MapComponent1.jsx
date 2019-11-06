import React from 'react';
import { compose, withProps, withHandlers } from 'recompose';

// const fetch = require('isomorphic-fetch');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require('react-google-maps');
const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAnbp1AL1bhIBlk7Q2DfMvUeFMiNOIQ7nk&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {/* {props.markers && !_isEmpty(props.markers[0]) && props.markers[0].map((marker, index) => (
        <Marker
          key={index}// {marker.photo_id}
          position={{ lat: marker.lat, lng: marker.lng }}// {{ lat: marker.latitude, lng: marker.longitude }}
          icon= 'http://maps.google.com/mapfiles/ms/micons/green-dot.png'
        />
      ))} */}
       {props.markers && props.markers.flight.map((marker, index) => (
        <Marker
          key={index}// {marker.photo_id}
          position={{ lat: marker[0].lat, lng: marker[0].lng }}// {{ lat: marker.latitude, lng: marker.longitude }}
          icon= 'http://maps.google.com/mapfiles/ms/micons/green-dot.png'
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>);

export default MapWithAMarkerClusterer;

