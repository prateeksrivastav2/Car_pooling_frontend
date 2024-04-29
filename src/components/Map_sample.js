import React, { useEffect, useRef, useState } from 'react';

const MapWithMarkers = () => {
  const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
  const mapRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoordinates(prevCoordinates => ({
      ...prevCoordinates,
      [name]: value
    }));
  };

  const handleAddMarker = () => {
    const { latitude, longitude } = coordinates;
    if (latitude && longitude) {
      const marker = {
        type: "Feature",
        properties: {
          htmlPopup: `Marker at (${latitude}, ${longitude})`,
        },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      };
      mapRef.current && mapRef.current.addMarker(marker);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.mappls.com/advancedmaps/api/7f1d5157-93f4-454f-8bb4-8fc3387c8707/map_sdk?layer=vector&v=3.0&callback=initMap1';
    script.defer = true;
    script.async = true;

    script.onload = () => {
      const map = new window.mappls.Map("map", {
        center: [28.61, 77.23],
        zoomControl: true,
        location: true,
      });
      mapRef.current = map;
      map.addListener("load", () => {
        console.log('Map loaded');
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '70vh' }}></div>
      <div>
        <input 
          type="text" 
          name="latitude" 
          placeholder="Latitude" 
          value={coordinates.latitude} 
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="longitude" 
          placeholder="Longitude" 
          value={coordinates.longitude} 
          onChange={handleInputChange} 
        />
        <button onClick={handleAddMarker}>Add Marker</button>
      </div>
    </div>
  );
};

export default MapWithMarkers;
