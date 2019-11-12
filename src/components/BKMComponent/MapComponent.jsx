import React from 'react';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

const lineSymbol = {
  path: 'M 0,-1 0,1',
  strokeOpacity: 1,
  strokeWeight: 2,
  scale: 3,
};
const doubleLine = {
  path: 'M 0.5,-1 0.5,1 M -0.5,-1 -0.5,1',
  strokeOpacity: 1,
  strokeWeight: 1,
  scale: 3,
};

const color = ['#FF0000', '#000080', '#0000FF'];
const icons = [
[{
  icon: lineSymbol,
  offset: '0%',
  repeat: '6px',
}],
[{
  icon: lineSymbol,
  offset: '50%',
  repeat: '15px',
}],
[{
  icon: doubleLine,
  offset: '0%',
  repeat: '6px',
}],
];

const createMarker = (pos, len, index, trackingId, props) => {
  if (len === 1) {
    return <Marker onClick={props.onToggleOpen} key={index}
    position={{ lat: pos[0].lat, lng: pos[0].lng }}
    icon= 'http://maps.google.com/mapfiles/ms/micons/green-dot.png'>
    {props.state.isOpen &&
    <InfoWindow onCloseClick={props.onToggleOpen}>
    <div className="">{trackingId}</div>
    </InfoWindow>}
    </Marker>;
  } else if (len === 2) {
    return (
    <div><Marker onClick={props.onToggleOpen} key={index}
    position={{ lat: pos[0].lat, lng: pos[0].lng }}
    icon= 'http://maps.google.com/mapfiles/ms/micons/green-dot.png'>
    {props.state.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
    <div className="">{trackingId}</div>
    </InfoWindow>}
    </Marker>
    <Marker onClick={props.onToggleOpen} key={index}
    position={{ lat: pos[1].lat, lng: pos[1].lng }}
    icon= 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'>
    {props.state.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
    <div className="">{trackingId}</div>
    </InfoWindow>}
    </Marker>
    </div>);
  } else if (len === 3) {
    return (<div><Marker onClick={props.onToggleOpen} key={index}
      position={{ lat: pos[0].lat, lng: pos[0].lng }}
      icon= 'http://maps.google.com/mapfiles/ms/micons/green-dot.png'>
      {props.state.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
    <div className="">{trackingId}</div>
    </InfoWindow>}
    </Marker>
      <Marker onClick={props.onToggleOpen} key={index}
      position={{ lat: pos[1].lat, lng: pos[1].lng }}
      icon= 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'>
      {props.state.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
    <div className="">{trackingId}</div>
    </InfoWindow>}
    </Marker>
      <Marker onClick={props.onToggleOpen} key={index}
      position={{ lat: pos[2].lat, lng: pos[2].lng }}
      icon= 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'>
      {props.state.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
    <div className="">{trackingId}</div>
    </InfoWindow>}
    </Marker>
    </div>);
  }
};

const MapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAnbp1AL1bhIBlk7Q2DfMvUeFMiNOIQ7nk&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px', marginTop: '22px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    UNSAFE_componentWillMount() {
        this.setState({
            // zoomToMarkers: (map) => {
            //     const bounds = new window.google.maps.LatLngBounds();
            //     if (!_isEmpty(map)) {
            //     map && map.props && map.props.children[1] && map.props.children[1].props.children[0].props.children.forEach((child) => {
            //         if (child.type === Marker) {
            //             bounds.extend(new window.google.maps.LatLng(child.props.position.lat, child.props.position.lng));
            //         }
            //     });
            //     map.fitBounds(bounds);
            //   }
            // },
        });
    },
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
)(props => (
  <GoogleMap
  ref={props.zoomToMarkers}
  defaultZoom={8}
  defaultCenter={{ lat: -34.397, lng: 150.644 }}
  // center={props.getCenter(props)}
  >
  {props.markers.flight && props.markers.flight.map((marker, index) => {
  <Polyline
                path= {[marker.index, marker.index + 1]}
                geodesic={true}
                options={{
                    strokeColor: color[index],
                    strokeOpacity: 0,
                    strokeWeight: 2,
                    icons: icons[index],
                }}
            />;
    })}
  <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
    {props.markers.flight &&
    props.markers.flight.map((marker, index) => {
      const len = marker.length;
      // const trackingId = props.markers.tracking_id;
        return createMarker(marker, len, index, props.markers.tracking_id[index], props);
      // if (props.markers.tracking_id instanceof Array) {
      //   return createMarker(marker, len, index, trackingId[index], props);
      // }
        // return createMarker(marker, len, index, trackingId, props);
    })}
     </MarkerClusterer>
  </GoogleMap>
));

<MapComponent isMarkerShown />;

export default MapComponent;
