import React from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  height: '800px',
  width: '100%',
};
const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDyWau177aZz12QPehbOqhi8MCDfNIjN3I',
    libraries,
  });

  const location = useLocation();
  const marker = location.state?.location || center;

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div className="h-screen">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={marker}>
        <Marker position={marker} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
