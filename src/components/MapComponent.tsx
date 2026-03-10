"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Position = { lat: number; lng: number };

function DraggableMarker({
  position,
  draggable,
  onPositionChange,
}: {
  position: Position;
  draggable: boolean;
  onPositionChange: (pos: Position) => void;
}) {
  const markerRef = useRef<L.Marker>(null);

  useMapEvents({
    click(e) {
      if (draggable) {
        onPositionChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={icon}
      draggable={draggable}
      ref={markerRef}
      eventHandlers={{
        dragend() {
          const marker = markerRef.current;
          if (marker) {
            const latlng = marker.getLatLng();
            onPositionChange({ lat: latlng.lat, lng: latlng.lng });
          }
        },
      }}
    />
  );
}

function RecenterMap({ position }: { position: Position }) {
  const map = useMap();
  useEffect(() => {
    map.setView([position.lat, position.lng], map.getZoom());
  }, [map, position.lat, position.lng]);
  return null;
}

export default function MapComponent({
  position,
  draggable,
  onPositionChange,
}: {
  position: Position;
  draggable: boolean;
  onPositionChange: (pos: Position) => void;
}) {
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        position={position}
        draggable={draggable}
        onPositionChange={onPositionChange}
      />
      <RecenterMap position={position} />
    </MapContainer>
  );
}
