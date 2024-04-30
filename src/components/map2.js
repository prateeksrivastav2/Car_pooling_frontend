import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const Map2 = ({ destinations }) => {
    const [markerData, setMarkerData] = useState([]);
    const [mapCenter, setMapCenter] = useState([28.612964, 77.229463]); // Default center

    useEffect(() => {
        const geocodeAddresses = async () => {
            if (!Array.isArray(destinations) || destinations.length === 0) {
                return;
            }
            const addresses = [...destinations];
            const markerDataArray = await Promise.all(
                addresses.map(async (address) => {
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                                address
                            )}`
                        );
                        const data = await response.json();
                        if (data.length > 0) {
                            const { lat, lon } = data[0];
                            return { position: [parseFloat(lat), parseFloat(lon)], address };
                        } else {
                            // console.error(`No coordinates found for address: ${address}`);
                            return null;
                        }
                    } catch (error) {
                        // console.error(`Error geocoding address: ${address}, error`);
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
    }, [destinations]);

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
                {markerData.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        icon={

                            L.icon({
                                iconUrl: "https://www.mappls.com/images/from.png",
                                iconSize: [32, 32],
                            })

                        }
                    >
                        <Popup>{marker.address}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map2;
