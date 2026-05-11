import { useEffect, useState } from "react";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../constants/mapConfig";

export default function useMapCenter({
  userLocation,
  districtState,
  focusHospital,
}) {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isManualMove, setIsManualMove] = useState(false);

  // Auto-follow user
  useEffect(() => {
    if (userLocation && !isManualMove && !districtState && !focusHospital) {
      setCenter(userLocation);
      setZoom(13);
    }
  }, [userLocation, isManualMove, districtState, focusHospital]);

  // From district page
  useEffect(() => {
    if (districtState) {
      if (districtState.latitude && districtState.longitude) {
        setCenter({ lat: Number(districtState.latitude), lng: Number(districtState.longitude) });
        setZoom(11.3);
      } else if (districtState.hospitals && districtState.hospitals.length > 0) {
        const h = districtState.hospitals[0];
        setCenter({ lat: Number(h.latitude), lng: Number(h.longitude) });
        setZoom(11.3);
      }
      setIsManualMove(true);
    }
  }, [districtState]);

  // Focus specific hospital
  useEffect(() => {
    if (focusHospital?.hospital) {
      const h = focusHospital.hospital;
      setCenter({ lat: Number(h.latitude), lng: Number(h.longitude) });
      setZoom(16);
      setIsManualMove(true);
    }
  }, [focusHospital]);

  return {
    center,
    zoom,
    setCenter,
    setZoom,
    setIsManualMove,
  };
}
