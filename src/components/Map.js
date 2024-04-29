import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = L.icon({
    iconUrl: 'https://maps.mappls.com/images/from.png',
    iconSize: [32, 32],
});

const Map = () => {
    const [markerData, setMarkerData] = useState([]);
    const [map, setMap] = useState(null); 
    const [mapCenter, setMapCenter] = useState([28.612964, 77.229463]); 

    useEffect(() => {

        const geocodeAddresses = async () => {
            const addresses = [
                "Gopal Nagar Kanpur",
                "Noida Sector 107"
            ];

            const markerDataArray = await Promise.all(
                addresses.map(async (address) => {
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
                        const data = await response.json();
                        if (data.length > 0) {
                            const { lat, lon } = data[0];
                            return { position: [parseFloat(lat), parseFloat(lon)], address };
                        } else {
                            console.error(`No coordinates found for address: ${address}`);
                            return null;
                        }
                    } catch (error) {
                        console.error(`Error geocoding address: ${address}`, error);
                        return null;
                    }
                })
            );

            const filteredMarkerData = markerDataArray.filter((marker) => marker !== null);
            setMarkerData(filteredMarkerData);
        };

        
        geocodeAddresses();
    }, []);

    useEffect(() => {
        if (map && markerData.length > 0) {
            map.panTo(markerData[0].position);
            setMapCenter(markerData[0].position);
        }
    }, [map, markerData]);

    return (
        <div id="map" style={{ height: "80vh", width: "60vw" }}>
            <MapContainer
                center={mapCenter}
                zoom={15}
                style={{ height: "100%" }}
                whenCreated={setMap} 
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markerData.map((marker, index) => (
                    <Marker key={index} position={marker.position} icon={customIcon}>
                        <Popup>{marker.address}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
