import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const SearchComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDyWau177aZz12QPehbOqhi8MCDfNIjN3I',
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedPlace(place);
      } else {
        console.log('No geometry available for the selected place');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onSearchClick = () => {
    if (selectedPlace && selectedPlace.geometry) {
      const location = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };
      navigate('/map', { state: { location } });
    } else {
      console.log('Please select a valid place');
    }
  };

  const onNearMyLocationClick = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          navigate('/map', { state: { location, nearby: true } });
          setLoadingLocation(false);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLoadingLocation(false);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <div className="flex items-center space-x-2">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Search a location"
              className="border p-2 rounded w-64"
            />
          </Autocomplete>
          <button
            onClick={onSearchClick}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
          <button
            onClick={onNearMyLocationClick}
            className={`bg-green-500 text-white p-2 rounded ${loadingLocation ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loadingLocation}
          >
            Near My Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
