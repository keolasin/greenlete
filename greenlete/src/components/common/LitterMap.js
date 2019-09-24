import React, { useState } from "react";
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl
} from "react-map-gl";

import LitterPin from "./LitterPin";
import MapControlPanel from "./MapControlPanel";

import { styles } from "../styles/litterMap";

const mapboxToken =
  "pk.eyJ1Ijoia2VvbGFzaW4iLCJhIjoiY2swc2p2c3d4MDNoYjNjcXNpbm1jZnVveSJ9.3-_l7T7UWK8ds9-iH1pnyw";

export default function LitterMap(props) {
  // setting state
  const [viewport, setViewport] = useState({
    latitude: 37.729,
    longitude: -122.36,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });

  const initialCoordinates = {
    latitude: viewport.latitude,
    longitude: viewport.longitude
  };

  const [marker, setMarker] = useState(initialCoordinates);
  const [events, setEvents] = useState({});

  let updateViewport = viewport => {
    setViewport(viewport);
  };

  let logDragEvent = (name, event) => {
    setEvents({
      ...events,
      [name]: event.lngLat
    });
  };

  let onMarkerDragStart = event => {
    logDragEvent("onDragStart", event);
  };

  let onMarkerDrag = event => {
    logDragEvent("onDrag", event);
  };

  let onMarkerDragEnd = event => {
    setMarker({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0]
    });
  };

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onViewportChange={updateViewport}
      mapboxApiAccessToken={mapboxToken}
    >
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        onDragStart={onMarkerDragStart}
        onDrag={onMarkerDrag}
        onDragEnd={onMarkerDragEnd}
      >
        <LitterPin size={20} />
      </Marker>
      <div className="nav" style={styles.navStyle}>
        <NavigationControl onViewportChange={updateViewport} />
        <GeolocateControl
          style={styles.geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </div>

      <MapControlPanel
        containerComponent={props.containerComponent}
        events={events}
        isForm={true}
        latitude={marker.latitude}
        longitude={marker.longitude}
        userData={props.userData}
      />
    </MapGL>
  );
}
