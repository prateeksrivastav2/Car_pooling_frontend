import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const Map = ({ startingLocation, destinations }) => {
  const [markerData, setMarkerData] = useState([]);
  const [mapCenter, setMapCenter] = useState([28.612964, 77.229463]); // Default center

  useEffect(() => {
    const geocodeAddresses = async () => {
      if (!Array.isArray(destinations) || destinations.length === 0) {
        return;
      }

      const addresses = [startingLocation, ...destinations];
      const parseXmlData = (xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const places = xmlDoc.getElementsByTagName("place");

        const coordinates = [];

        for (const place of places) {
          const lat = place.getAttribute("lat");
          const lon = place.getAttribute("lon");

          if (lat && lon) {
            coordinates.push({ lat: parseFloat(lat), lon: parseFloat(lon) });
          }
        }

        return coordinates;
      };
      const markerDataArray = await Promise.all(
        addresses.map(async (address) => {
          try {
            const response = await axios.get(
              `https://us1.locationiq.com/v1/search?key=pk.7fbc8c7ec4d1648d96a0057e321a9884&q=${encodeURIComponent(address)}`
            );
            const data = response.data;
            const coordinates = parseXmlData(data);
            return { position: [parseFloat(coordinates[0].lat), parseFloat(coordinates[0].lon)], address };
          } catch (error) {
            console.error(`Error geocoding address: ${address}`, error);
            return null;
          }
        })
      );

      const filteredMarkerData = markerDataArray.filter(
        (marker) => marker !== null
      );
      setMarkerData(filteredMarkerData);
    };

    geocodeAddresses();
  }, [startingLocation, destinations]);

  useEffect(() => {
    if (markerData.length > 0) {
      setMapCenter(markerData[0].position);
    }
  }, [markerData]);

  return (
    <div
      id="map"
      style={{
        height: "80vh",
        width: "50vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MapContainer
        center={mapCenter}
        zoom={15}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerData.length > 0 && markerData.map((marker, index) => (
          marker.position && (
            <Marker
              key={index}
              position={marker.position}
              icon={
                index === 0
                  ? L.icon({
                    iconUrl: "https://www.mappls.com/images/from.png",
                    iconSize: [32, 32],
                  })
                  : L.icon({
                    iconUrl: "https://maps.mappls.com/images/to.png",
                    iconSize: [32, 32],
                  })
              }
            >
              <Popup>{marker.address}</Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
