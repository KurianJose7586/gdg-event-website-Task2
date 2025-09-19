"use client";

import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Manually create the icon to ensure the image paths are correct.
const defaultIcon = new L.Icon({
    iconUrl: '/leaflet/marker-icon.png',
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    shadowUrl: '/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const Map = () => {
  const position: [number, number] = [28.366806, 77.541384];

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Pass the custom icon to the Marker component */}
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          Galgotias University <br /> The event is here!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;