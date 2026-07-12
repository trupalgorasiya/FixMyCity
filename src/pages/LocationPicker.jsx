import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/LocationPicker.css"

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapClickHandler({ position, setPosition, onLocationSelect }) {
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        onLocationSelect({
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
          address: data.display_name || "",
          pincode: data.address?.postcode || "",
        });

        map.flyTo([lat, lng], 16);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>Selected Complaint Location</Popup>
    </Marker>
  ) : null;
}

export default function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState([23.0225, 72.5714]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition([coords.latitude, coords.longitude]);
      },
      () => {}
    );
  }, []);

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const lat = coords.latitude;
      const lng = coords.longitude;

      setPosition([lat, lng]);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await response.json();

      onLocationSelect({
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
        address: data.display_name || "",
        pincode: data.address?.postcode || "",
      });
    });
  };

  return (
    <div className="location-map">

      <MapContainer
        center={position}
        zoom={15}
        style={{
          height: "420px",
          width: "100%",
          borderRadius: "16px",
        }}
      >
        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler
          position={position}
          setPosition={setPosition}
          onLocationSelect={onLocationSelect}
        />
      </MapContainer>

      <button
        type="button"
        className="location-btn primary"
        onClick={useCurrentLocation}
      >
        📍 Use My Current Location
      </button>

    </div>
  );
}