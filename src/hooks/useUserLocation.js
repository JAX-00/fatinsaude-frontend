import { useEffect, useState } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | granted | denied

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("granted");
      },
      (err) => {
        console.warn("GPS error:", err);
        setStatus("denied");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return { location, status };
}