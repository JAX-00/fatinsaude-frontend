import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import hospitals from "../data/hospitalData";

const containerStyle = { width: "100%", height: "750px" };
const defaultCenter = { lat: -8.874217, lng: 125.727539 };

// Fungsi bantu untuk pilih icon berdasarkan tipe rumah sakit
const getMarkerIcon = (type) => {
  switch (type) {
    case "Apotik":
      return "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
    case "Centro":
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    case "Clinic":
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    case "Hospital":
    default:
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  }
};

export default function Home() {
  // const hasGeoLocatedRef = useRef(false);

  const [userLocation, setUserLocation] = useState(null);

  const [selectedHospital, setSelectedHospital] = useState(null);

  // TARUH DI SINI
  console.log("User Location:", userLocation);

  const location = useLocation();
  const districtState = location.state?.district;
  const focusHospital = location.state?.focusHospital;

  const [center, setCenter] = useState(defaultCenter);

  const [zoom, setZoom] = useState(10); // default jauh

  // INI YANG SERING LUPA
  const [isManualMove, setIsManualMove] = useState(false);

  //popup bollu ambulance
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);
  const [pendingCall, setPendingCall] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // GPS REALTIME (Disable)
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(userPos);
      },
      (error) => console.warn("GPS error:", error),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    if (!isManualMove && !districtState && !focusHospital) {
      setCenter(userLocation);
      setZoom(13);
    }
  }, [userLocation, isManualMove, districtState, focusHospital]);

  // Jika datang dari Distritu.js, update center map
  useEffect(() => {
    if (districtState && !focusHospital) {
      setCenter(districtState.hospitals[0].position);
      setZoom(13);
    }
  }, [districtState, focusHospital]);

  // zoom ke spesifik
  useEffect(() => {
    if (focusHospital) {
      setCenter(focusHospital.position);
      setZoom(focusHospital.zoom || 16);
      setSelectedHospital(focusHospital.hospital); // buka InfoWindow
      setIsManualMove(true); //  hentikan auto move
    }
  }, [focusHospital]);

  //user effect untuk popup offlien dan online
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // search fasilitas rumah sakit
  const [activeType, setActiveType] = useState("ALL");

  const [directions, setDirections] = useState(null);

  // ⬇️ TARUH DI SINI
  const handleRoute = (hospital) => {
    if (!userLocation) {
      alert("Lokasi anda belum tersedia");
      return;
    }

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: userLocation,
        destination: hospital.position,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);

          if (mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            result.routes[0].overview_path.forEach((p) => bounds.extend(p));
            mapRef.current.fitBounds(bounds);
          }
        } else {
          console.error("Directions error:", status);
        }
      },
    );
  };

  const mapRef = useRef(null);

  return (
    <div className="p-4 flex justify-center">
      <div className="relative w-full max-w-[calc(100%-20px)] h-[750px] rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom} // pakai state zoom
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* FILTER DROPDOWN */}
          <div
            className="
    absolute top-4 left-4 z-10
    bg-white rounded-lg shadow-lg
    px-3 py-2
    w-56 sm:w-64 lg:w-72
  "
          >
            <label className="block text-xs font-semibold mb-1">
              Filter Fasilidade Saude
            </label>

            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="
      w-full border border-gray-300
      rounded-md px-2 py-1.5 text-sm
      focus:outline-none focus:ring-2 focus:ring-red-500
    "
            >
              <option value="ALL">All</option>
              <option value="Hospital">Hospital</option>
              <option value="Apotik">Apotik</option>
              <option value="Clinic">Clinic</option>
              <option value="Centro">Centro</option>
            </select>
          </div>

          {/* Pontu posisaun user */}
          {userLocation && (
            <Marker
              position={userLocation}
              title="Hau iha ne'e"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE, // bentuk lingkaran
                scale: 8, // ukuran lingkaran
                fillColor: "blue", // warna isi lingkaran
                fillOpacity: 1, // transparansi
                strokeColor: "white", // warna pinggir
                strokeWeight: 1, // tebal garis pinggir
              }}
            />
          )}

          {/* Marker rumah sakit */}
          {hospitals
            .filter((h) => activeType === "ALL" || h.type === activeType)
            .map((hospital, index) => (
              <Marker
                key={index}
                position={hospital.position}
                icon={{
                  url: getMarkerIcon(hospital.type),
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => {
                  setDirections(null); // ⬅️ reset rute lama
                  setSelectedHospital(hospital);
                  // setCenter(hospital.position);
                  setZoom(16);
                  setIsManualMove(true);
                }}
              />
            ))}

          {/* InfoWindow rumah sakit */}
          {selectedHospital && (
            <InfoWindow
              position={selectedHospital.position}
              onCloseClick={() => {
                setSelectedHospital(null);
                setDirections(null);
              }}
            >
              <div
                className="w-[95vw] max-w-[360px]
    sm:w-80
    md:w-72
    bg-white rounded-lg shadow-lg
    overflow-hidden border border-gray-200"
              >
                {/* Gambar rumah sakit */}
                <img
                  src={selectedHospital.image} // contoh nama file di public/images
                  alt={selectedHospital.name}
                  className="w-full h-24 object-cover text-center"
                />

                {/* pop up wahira klik lokasi */}
                <div className="p-3">
                  <h3 className="font-bold text-base sm:text-lg mb-2 text-center">
                    {selectedHospital.name}
                  </h3>
                  <p className="text-xs sm:text-sm mb-1">
                    <span className="font-semibold">Operational Time:</span>{" "}
                    {selectedHospital.operationalTime}
                  </p>
                  <p className="text-xs sm:text-sm mb-1">
                    <span className="font-semibold">Distrik:</span>{" "}
                    {selectedHospital.district}
                  </p>

                  <p className="text-sm mb-3">
                    <span className="font-semibold">Call Center:</span>{" "}
                    {selectedHospital.phone}
                  </p>

                  {/* TOMBOL */}
                  <div className="flex gap-2 sticky bottom-0 bg-white pt-2">
                    {/* Call Center */}
                    <a
                      href={`tel:${selectedHospital.phone}`}
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
                    >
                      ☎️ Call Center
                    </a>

                    {/* Ambulance */}
                    {selectedHospital.emergency === "Yes" &&
                      selectedHospital.ambulance && (
                        <button
                          onClick={() => {
                            setPendingCall(selectedHospital.ambulance);
                            setShowEmergencyConfirm(true);
                          }}
                          className="
    flex-1 bg-red-600 text-white py-2 rounded text-sm
    transition-all duration-200
    hover:bg-red-700 hover:scale-105
    active:scale-95
    animate-pulse
  "
                        >
                          🚑 Ambulans
                        </button>
                      )}
                  </div>
                  <button
                    onClick={() => handleRoute(selectedHospital)}
                    className="
    mt-3 w-full bg-blue-600 text-white
    py-2 rounded-lg
    hover:bg-blue-700 transition
  "
                  >
                    🚗 Hela Dalan
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}

          {/* MAP LEGEND */}
          <div
            className="
    absolute bottom-4 left-4 z-10
    bg-white rounded-lg shadow-lg
    space-y-2

    w-52 p-3 text-sm
    sm:w-44 sm:p-2 sm:text-xs
  "
          >
            <p className="font-bold text-gray-800 mb-1">Informasaun Mapa</p>

            {/* Apotik */}
            <div className="flex items-center gap-2">
              <img
                src="http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
                alt="Apotik"
                className="w-6 h-6 sm:w-5 sm:h-5"
              />
              <span>Apotik</span>
            </div>

            {/* Clinic */}
            <div className="flex items-center gap-2">
              <img
                src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                alt="Clinic"
                className="w-6 h-6 sm:w-5 sm:h-5"
              />
              <span>Clinic</span>
            </div>

            {/* Hospital */}
            <div className="flex items-center gap-2">
              <img
                src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                alt="Hospital"
                className="w-6 h-6 sm:w-5 sm:h-5"
              />
              <span>Hospital</span>
            </div>

            {/* Centro */}
            <div className="flex items-center gap-2">
              <img
                src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                alt="Centro"
                className="w-6 h-6 sm:w-5 sm:h-5"
              />
              <span>Centro</span>
            </div>

            {/* Lokasi Anda */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600"></span>
              <span>Hau iha ne'e</span>
            </div>
          </div>
          {directions && (
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
          )}

          {directions && (
            <button
              onClick={() => setDirections(null)}
              className="
      absolute top-4 right-4 z-10
      bg-white px-4 py-2 rounded-lg shadow
    "
            >
              ❌ Hapus Rute
            </button>
          )}

          {/* DEBUG USER LOCATION */}
          {/* <div
            className="
    absolute top-20 left-4 z-20
    bg-black/80 text-white text-xs
    px-3 py-2 rounded-lg
    max-w-xs
  "
          >
            <p className="font-semibold mb-1">📍 Debug Lokasi</p>

            {!userLocation && (
              <p className="text-red-400">Lokasi: ❌ belum tersedia</p>
            )}

            {userLocation && (
              <>
                <p className="text-green-400">Lokasi: ✅ tersedia</p>
                <p>Lat: {userLocation.lat}</p>
                <p>Lng: {userLocation.lng}</p>
              </>
            )}
          </div> */}
        </GoogleMap>

        {showEmergencyConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center">
              <h2 className="text-xl font-bold text-red-600 mb-3">
                ⚠️ Emergency Call
              </h2>

              <p className="text-gray-700 mb-4">
                Ita boot hakarak liga ambulans?
                <br />
                <span className="font-semibold">{pendingCall}</span>
              </p>

              {!isOnline && (
                <p className="text-sm text-red-500 mb-3">
                  📵 Ita agora offline. Favor liga manual.
                </p>
              )}

              <div className="flex gap-3">
                {/* Cancel */}
                <button
                  onClick={() => {
                    setShowEmergencyConfirm(false);
                    setPendingCall(null);
                  }}
                  className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
                >
                  Kansela
                </button>

                {/* Confirm */}
                <a
                  href={isOnline ? `tel:${pendingCall}` : undefined}
                  className={`flex-1 py-2 rounded text-white text-center ${
                    isOnline
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => setShowEmergencyConfirm(false)}
                >
                  Liga Agora
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
