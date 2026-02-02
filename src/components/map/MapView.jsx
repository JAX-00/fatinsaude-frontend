import { GoogleMap } from "@react-google-maps/api";

export default function MapView({
  mapRef,
  center,
  zoom,
  children,
}) {
  return (
    <div className="relative w-full h-[750px] rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => {
          if (mapRef) mapRef.current = map;
        }}
      >
        {children}
      </GoogleMap>
    </div>
  );
}
