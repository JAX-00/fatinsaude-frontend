import { Marker } from "@react-google-maps/api";

export default function UserMarker({ position }) {
  if (!position) return null;

  return (
    <Marker
      position={position}
      title="Hau iha ne'e"
      icon={{
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "blue",
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 1,
      }}
    />
  );
}
