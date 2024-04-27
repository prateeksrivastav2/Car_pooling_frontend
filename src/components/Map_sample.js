import React, { useEffect } from 'react';
import mapmyindia from 'mapmyindia-map-sdk';

const MapComponent = () => {
  useEffect(() => {
    const map = new mapmyindia.Map(document.getElementById('map'), {
      center: [28.61, 77.23], // Center the map at a specific location
      zoom: 12, // Set the zoom level
      // Add your MapmyIndia API key here
      accessToken: 'YOUR_MAPMYINDIA_API_KEY',
    });

    // Add a marker to the map
    const marker = new mapmyindia.Marker().setLngLat([28.61, 77.23]).addTo(map);
    
    return () => {
      map.remove(); // Cleanup when the component unmounts
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
