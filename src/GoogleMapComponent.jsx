// src/components/GoogleMapComponent.js
import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  height: "800px",
  width: "100%"
};
const center = {
  lat: 37.7749,
  lng: -122.4194
};

const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDyWau177aZz12QPehbOqhi8MCDfNIjN3I",
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedPlace(place);
        setMarker({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.log('No geometry available for the selected place');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onSearchClick = () => {
    if (selectedPlace && selectedPlace.geometry) {
      setMarker({
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      });
    } else {
      console.log('Please select a valid place');
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search a location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </Autocomplete>
        <button onClick={onSearchClick} style={{ marginLeft: '10px', padding: '6px 12px', fontSize: '14px' }}>Search</button>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={marker ? marker : center}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
