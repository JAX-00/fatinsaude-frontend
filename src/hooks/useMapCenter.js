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
    if (districtState && !focusHospital) {
      setCenter(districtState.hospitals[0].position);
      setZoom(13);
      setIsManualMove(true);
    }
  }, [districtState, focusHospital]);

  // Focus specific hospital
  useEffect(() => {
    if (focusHospital) {
      setCenter(focusHospital.position);
      setZoom(focusHospital.zoom || 16);
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
