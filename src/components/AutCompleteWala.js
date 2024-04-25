import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    // Initialize the map once the component is mounted
    const initializeMap = () => {
      // Create a new map using the mappls library
      const map = new window.mappls.Map('map', {
        center: { lat: 28.612964, lng: 77.229463 }
      });
    };

    // Load the map library script asynchronously
    const loadMapLibrary = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.mappls.com/advancedmaps/api/20e4db11-06a7-480e-ba0c-ab474f5a6c10/map_sdk?v=3.0&layer=vector';
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    };

    if (typeof window.mappls !== 'undefined') {
      initializeMap();
    } else {
      loadMapLibrary();
    }
  }, []);

  return (
    <>
    yaha pe map dikhega
    <div id="map">

    </div>

    </>
  );
};

export default MapComponent;
