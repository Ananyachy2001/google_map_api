// src/components/ParentComponent.js
import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import SearchInputComponent from './SearchInputComponent';
import MapViewComponent from './MapViewComponent';

const libraries = ['places'];

const ParentComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_API_KEY",
    libraries,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelected = (place) => {
    setSelectedPlace({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div>
      <h1>Google Map Search with Autocomplete</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <SearchInputComponent onPlaceSelected={handlePlaceSelected} />
        </div>
        <div style={{ width: '65%' }}>
          <MapViewComponent marker={selectedPlace} />
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
