import { useRef, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { fetchHospitals } from "../services/hospitalService";

import useUserLocation from "../hooks/useUserLocation";
import useOnlineStatus from "../hooks/useOnlineStatus";
import useMapCenter from "../hooks/useMapCenter";

import MapView from "../components/map/MapView";
import UserMarker from "../components/map/UserMarker";
import HospitalMarkers from "../components/map/HospitalMarkers";
import HospitalInfo from "../components/map/HospitalInfo";
import MapLegend from "../components/map/MapLegend";
import MapFilter from "../components/map/MapFilter";
import DirectionsLayer from "../components/map/DirectionsLayer";
import EmergencyConfirm from "../components/modal/EmergencyConfirm";
import DistrictDetailModal from "../components/district/DistrictDetailModal";
import LocationStatus from "../components/map/LocationStatus";

export default function Home() {
  const mapRef = useRef(null);
  const location = useLocation();

  const { location: userLocation, status: locationStatus } = useUserLocation();
  const [showLocationModal, setShowLocationModal] = useState(false);
  // Saat user klik Directions
const handleRouteClick = (hospital) => {
  if (!userLocation) {
    setShowLocationModal(true); // munculkan modal warning
    return;
  }
  setRouteTarget(hospital);
};

  const isOnline = useOnlineStatus();

  const districtState = location.state?.district;
  const focusHospital = location.state?.focusHospital;

  const { center, zoom, setZoom, setIsManualMove } = useMapCenter({
    userLocation,
    districtState,
    focusHospital,
  });

  // ====== State ======
  const [activeType, setActiveType] = useState("ALL");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [errorHospitals, setErrorHospitals] = useState(null);

  const [routeTarget, setRouteTarget] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [pendingCall, setPendingCall] = useState(null);

  // ====== Callbacks ======
  const handleSelectHospital = useCallback(
    (hospital) => {
      setSelectedHospital(hospital);
      setZoom(16);
      setIsManualMove(true);
    },
    [setZoom, setIsManualMove]
  );

  // ====== Effect: focusHospital ======
  // useEffect(() => {
  //   if (focusHospital?.hospital) {
  //     handleSelectHospital(focusHospital.hospital);
  //   }
  // }, [focusHospital, handleSelectHospital]);

  // ====== Effect: fetch hospitals ======
useEffect(() => {
  // Hapus atau komentari baris ini:
  // if (!selectedDistrict) return; 

  setLoadingHospitals(true);
  setErrorHospitals(null);

  // Jika selectedDistrict null, kirim undefined atau handle di service
  fetchHospitals(selectedDistrict?.id) 
    .then((data) => {
      console.log("Data berhasil masuk:", data);
      setHospitals(data);
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      setErrorHospitals("Dadus la bele simu. Favor koko fali.");
    })
    .finally(() => setLoadingHospitals(false));
}, [selectedDistrict]);

  useEffect(() => {
  console.log("Hospitals:", hospitals);
}, [hospitals]);

useEffect(() => {
  console.log("Selected hospital:", selectedHospital);
}, [selectedHospital]);

useEffect(() => {
  setSelectedHospital(null);
}, [activeType]);

  return (
    <MapView mapRef={mapRef} center={center} zoom={zoom}>
      {/* Filter */}
      <MapFilter value={activeType} onChange={setActiveType} />

      {/* User Location */}
      <UserMarker position={userLocation} />

<LocationStatus
  status={locationStatus}
  showModal={showLocationModal}
  onRetry={() => {
    setShowLocationModal(false);
    window.location.reload();
  }}
/>

      {/* Loading & Error */}
      {loadingHospitals && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow z-50">
          Loading hospital...
        </div>
      )}

      {errorHospitals && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow z-50">
          {errorHospitals}
        </div>
      )}

      {/* Hospital Markers */}
      <HospitalMarkers
        hospitals={hospitals}
        activeType={activeType}
        onSelect={handleSelectHospital}
      />

      {/* Map Legend */}
      <MapLegend />

      {/* Directions */}
      <DirectionsLayer
        mapRef={mapRef}
        userLocation={userLocation}
        destination={routeTarget}
        onClear={() => setRouteTarget(null)}
      />

      {/* Hospital Info */}
<HospitalInfo
  hospital={selectedHospital}
  onClose={() => setSelectedHospital(null)}
  onRoute={handleRouteClick}  // <- ini ganti dari setRouteTarget langsung
  onEmergency={(phone) => {
    setPendingCall(phone);
    setShowEmergency(true);
  }}
/>

      {/* Emergency Modal */}
      <EmergencyConfirm
        isOpen={showEmergency}
        phoneNumber={pendingCall}
        isOnline={isOnline}
        onClose={() => {
          setShowEmergency(false);
          setPendingCall(null);
        }}
      />

      {/* District Detail Modal */}
      <DistrictDetailModal
        district={selectedDistrict}
        onClose={() => setSelectedDistrict(null)}
        onSelectHospital={handleSelectHospital}
        onSelectDistrict={(district) => setSelectedDistrict(district)}
      />
    </MapView>
  );
}