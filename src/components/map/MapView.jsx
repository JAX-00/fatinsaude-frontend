import { GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

const MAP_STYLES = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
];

export default function MapView({ mapRef, center, zoom, children }) {
  const options = useMemo(
    () => ({
      styles: MAP_STYLES,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      clickableIcons: false,
      gestureHandling: "greedy",
      isFractionalZoomEnabled: true,
    }),
    []
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-emerald-50">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={zoom}
        options={options}
        onLoad={(map) => {
          if (mapRef) mapRef.current = map;
        }}
      >
        {children}
      </GoogleMap>
      
      {/* Subtle overlay to soften map edges */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]" />
    </div>
  );
}
