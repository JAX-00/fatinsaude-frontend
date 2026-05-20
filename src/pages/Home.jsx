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
import { motion, AnimatePresence } from "framer-motion";
import { Search, List, X, SearchX } from "lucide-react";

export default function Home() {
  const mapRef = useRef(null);
  const location = useLocation();

  const { location: userLocation, status: locationStatus } = useUserLocation();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isOnline = useOnlineStatus();
  const districtState = location.state?.district;
  const focusHospital = location.state?.focusHospital;

  const { center, zoom, setZoom, setIsManualMove } = useMapCenter({
    userLocation,
    districtState,
    focusHospital,
  });

  const [activeType, setActiveType] = useState("ALL");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [routeTarget, setRouteTarget] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [pendingCall, setPendingCall] = useState(null);

  const handleRouteClick = (hospital) => {
    if (!userLocation) {
      setShowLocationModal(true);
      return;
    }
    setRouteTarget(hospital);
    setSelectedHospital(null);
  };

  const handleSelectHospital = useCallback(
    (hospital) => {
      setSelectedHospital(hospital);
      setZoom(16);
      setIsManualMove(true);
    },
    [setZoom, setIsManualMove]
  );

  useEffect(() => {
    setLoadingHospitals(true);
    fetchHospitals(selectedDistrict?.id)
      .then((data) => setHospitals(data))
      .catch((err) => {
        console.error("Fetch Error:", err);
      })
      .finally(() => setLoadingHospitals(false));
  }, [selectedDistrict]);

  const filteredHospitals = hospitals.filter((h) => {
    const matchesType = activeType === "ALL" || h.type === activeType;
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="relative h-full overflow-hidden flex flex-col lg:flex-row">
      {/* Side Panel (Desktop) */}
      <AnimatePresence>
        {showSidePanel && (
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            className="absolute lg:relative z-30 w-full lg:w-[400px] h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center bg-emerald-600 text-white">
              <h2 className="font-bold text-xl flex items-center gap-2">
                <List size={20} />
                Lista Fasilidade
              </h2>
              <button aria-label="Taka Pannel" onClick={() => setShowSidePanel(false)} className="hover:bg-white/20 p-1 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Buka naran hospital..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleSelectHospital(h)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                  >
                    <p className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{h.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{h.district?.name} • {h.type}</p>
                  </button>
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-slate-400"
                >
                  <SearchX size={64} className="opacity-20" />
                  <div className="text-center">
                    <p className="text-lg font-bold">Dadus hospital la iha</p>
                    <p className="text-sm">Koko fali ho filter seluk.</p>
                  </div>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="mt-4 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                    >
                      Hamoos Pencarian
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Area */}
      <div className="flex-1 relative">
        <MapView mapRef={mapRef} center={center} zoom={zoom}>
          <MapFilter value={activeType} onChange={setActiveType} />
          <UserMarker position={userLocation} />
          
          <LocationStatus
            status={locationStatus}
            showModal={showLocationModal}
            onRetry={() => {
              setShowLocationModal(false);
              window.location.reload();
            }}
          />

          <HospitalMarkers
            hospitals={hospitals}
            activeType={activeType}
            onSelect={handleSelectHospital}
          />

          <DirectionsLayer
            mapRef={mapRef}
            userLocation={userLocation}
            destination={routeTarget}
            onClear={() => setRouteTarget(null)}
          />

          <HospitalInfo
            hospital={selectedHospital}
            onClose={() => setSelectedHospital(null)}
            onRoute={handleRouteClick}
            onEmergency={(phone) => {
              setPendingCall(phone);
              setShowEmergency(true);
            }}
          />
        </MapView>

        {/* Floating Toggle Panel Button */}
        {!showSidePanel && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setShowSidePanel(true)}
            className="absolute bottom-24 lg:bottom-10 left-6 z-20 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transition-all flex items-center gap-2 font-bold"
          >
            <List size={24} />
            <span className="hidden sm:inline">Hatudu Lista</span>
          </motion.button>
        )}

        {/* Map Legend (Bottom Right) */}
        <div className="absolute bottom-24 lg:bottom-10 right-6 z-20">
          <MapLegend />
        </div>
      </div>

      {/* Modals */}
      <EmergencyConfirm
        isOpen={showEmergency}
        phoneNumber={pendingCall}
        isOnline={isOnline}
        onClose={() => {
          setShowEmergency(false);
          setPendingCall(null);
        }}
      />

      <DistrictDetailModal
        district={selectedDistrict}
        onClose={() => setSelectedDistrict(null)}
        onSelectHospital={handleSelectHospital}
        onSelectDistrict={(district) => setSelectedDistrict(district)}
      />

      {/* Loading Overlay */}
      <AnimatePresence>
        {loadingHospitals && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-white/20 backdrop-blur-[2px] flex items-center justify-center"
          >
            <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-6 h-6 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <span className="font-bold text-slate-700 text-sm tracking-wide">Buka dadus...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}