import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;

export default function MapContainer() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCfd5Y2N_AcjQUF75P41a51zvRAm3DXkg4", // save key in .env.local file
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo<LatLngLiteral>(() => ({ lat: 51.34, lng: 12.36 }), []);
  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
