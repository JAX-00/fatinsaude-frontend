import { DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export default function DirectionsLayer({
  mapRef,
  userLocation,
  destination,
  onClear,
}) {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!destination || !userLocation) return;

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: userLocation,
        destination: destination.position,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);

          if (mapRef?.current) {
            const bounds =
              new window.google.maps.LatLngBounds();
            result.routes[0].overview_path.forEach((p) =>
              bounds.extend(p),
            );
            mapRef.current.fitBounds(bounds);
          }
        } else {
          console.error("Directions error:", status);
        }
      },
    );
  }, [destination, userLocation, mapRef]);

  if (!directions) return null;

  return (
    <>
      <DirectionsRenderer
        directions={directions}
        options={{
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#2563eb",
            strokeWeight: 5,
          },
        }}
      />

      <button
        onClick={() => {
          setDirections(null);
          onClear?.();
        }}
        className="absolute top-4 right-4 z-10 bg-white px-4 py-2 rounded-lg shadow"
      >
        ❌ Hapus Rute
      </button>
    </>
  );
}
