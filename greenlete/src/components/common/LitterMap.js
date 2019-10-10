import React, { useState } from "react";
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl
} from "react-map-gl";

import LitterPin from "./LitterPin";
import DraggablePin from "./DraggablePin";
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
  const [popupInfo, setPopupInfo] = useState();

  let updateViewport = viewport => {
    setViewport(viewport);
  };

  let renderLitterMarker = (litter, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={parseFloat(litter.longitude)}
        latitude={parseFloat(litter.latitude)}
      >
        <LitterPin
          size={20}
          onClick={() => {
            setPopupInfo(litter);
            console.log(`clicked ${litter}`);
          }}
        />
      </Marker>
    );
  };

  let renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <h4 style={styles.text}>
            Litter grabbed here:{" "}
            <strong style={styles.headText}>{popupInfo.quantity}</strong>
          </h4>
        </Popup>
      )
    );
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
      {/* first, render any litter locations the user may have */}
      {props.userLitter ? props.userLitter.map(renderLitterMarker) : null}
      {renderPopup()}

      {/* render a draggable marker to set location of new litter */}
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
        <DraggablePin size={30} />
      </Marker>

      {/* viewport controls for map (zoom, geolocate) */}
      <section className="mapNav" style={styles.navStyle}>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <NavigationControl
          onViewportChange={updateViewport}
          style={styles.controlStyle}
        />
      </section>

      {/* render info component for adding a new piece of litter, this component will render a form modal given the location the user selects on the map*/}
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
