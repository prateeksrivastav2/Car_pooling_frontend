import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = L.icon({
    iconUrl: 'https://maps.mappls.com/images/from.png',
    iconSize: [32, 32],
});

const Map = () => {
    const [markerData, setMarkerData] = useState([]);
    const [map, setMap] = useState(null); // State to hold the map object
    const [mapCenter, setMapCenter] = useState([28.612964, 77.229463]); // Default center

    useEffect(() => {
        // Function to geocode addresses and set marker data
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

            // Remove any null values from the marker data array
            const filteredMarkerData = markerDataArray.filter((marker) => marker !== null);
            setMarkerData(filteredMarkerData);
        };

        // Call the geocodeAddresses function
        geocodeAddresses();
    }, []);

    useEffect(() => {
        if (map && markerData.length > 0) {
            // Set map center
            map.panTo(markerData[0].position);
            setMapCenter(markerData[0].position);
        }
    }, [map, markerData]);

    return (
        <div id="map" style={{ height: "50vh", width: "40vw",alignItems:'center'
        ,justifyContent:'center' }}>
            <MapContainer
                center={mapCenter}
                zoom={15}
                style={{ height: "100%" }}
                whenCreated={setMap} // Assign the map object to the state
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
