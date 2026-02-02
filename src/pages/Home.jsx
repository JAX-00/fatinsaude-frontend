import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import hospitals from "../data/hospitalData";

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

export default function Home() {
  const mapRef = useRef(null);
  const location = useLocation();

  const userLocation = useUserLocation();
  const isOnline = useOnlineStatus();

  const districtState = location.state?.district;
  const focusHospital = location.state?.focusHospital;

  const {
    center,
    zoom,
    setZoom,
    setIsManualMove,
  } = useMapCenter({
    userLocation,
    districtState,
    focusHospital,
  });

  const [activeType, setActiveType] = useState("ALL");
  const [selectedHospital, setSelectedHospital] = useState(null);

  const [showEmergency, setShowEmergency] = useState(false);
  const [pendingCall, setPendingCall] = useState(null);

  const [routeTarget, setRouteTarget] = useState(null);

  return (
    <MapView mapRef={mapRef} center={center} zoom={zoom}>
      <MapFilter value={activeType} onChange={setActiveType} />

      <UserMarker position={userLocation} />

      <HospitalMarkers
        hospitals={hospitals}
        activeType={activeType}
        onSelect={(hospital) => {
          setSelectedHospital(hospital);
          setZoom(16);
          setIsManualMove(true);
        }}
      />

      <MapLegend />

      <DirectionsLayer
        mapRef={mapRef}
        userLocation={userLocation}
        destination={routeTarget}
        onClear={() => setRouteTarget(null)}
      />

      <HospitalInfo
        hospital={selectedHospital}
        onClose={() => setSelectedHospital(null)}
        onRoute={(hospital) => setRouteTarget(hospital)}
        
        onEmergency={(phone) => {
          setPendingCall(phone);
          setShowEmergency(true);
        }}
      />

      <EmergencyConfirm
        isOpen={showEmergency}
        phoneNumber={pendingCall}
        isOnline={isOnline}
        onClose={() => {
          setShowEmergency(false);
          setPendingCall(null);
        }}
      />
    </MapView>
  );
}
