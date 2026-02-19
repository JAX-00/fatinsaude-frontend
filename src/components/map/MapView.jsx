import { GoogleMap } from "@react-google-maps/api";

export default function MapView({
  mapRef,
  center,
  zoom,
  children,
}) {
  return (
    <div className="relative w-full p-2
    h-[75vh]
    sm:h-[75vh]
    md:h-[80vh]
    lg:h-[85vh]
    xl:h-[89vh]
    rounded-md
        overflow-hidden
        bg-gray-200">
      <GoogleMap
       mapContainerClassName="w-full h-full rounded-md"
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
