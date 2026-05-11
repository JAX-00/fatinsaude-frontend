// src/components/map/HospitalMarkers.jsx
import { Marker } from "@react-google-maps/api";
import { getHospitalIcon } from "../../utils/markerIcons";
import { Fragment } from "react";

export default function HospitalMarkers({ hospitals, activeType, onSelect }) {
  // 1. Pastikan hospitals adalah array dan tidak kosong
  if (!Array.isArray(hospitals) || hospitals.length === 0) return null;

  return (
    <Fragment>
      {hospitals
        .filter((h) => {
          // 2. Tambahkan pengecekan properti 'type' agar tidak undefined
          if (!h || !h.type) return false;
          return (
            activeType === "ALL" || 
            h.type.toLowerCase() === activeType.toLowerCase()
          );
        })
        .map((hospital) => {
          // 3. Pastikan latitude & longitude ada sebelum render marker
          if (!hospital.latitude || !hospital.longitude) return null;

          const iconData = getHospitalIcon(hospital.type);
          
          return (
            <Marker
              key={hospital.id}
              position={{ 
                lat: Number(hospital.latitude), 
                lng: Number(hospital.longitude) 
              }}
              icon={
                window.google
                  ? {
                      url: iconData.url,
                      scaledSize: new window.google.maps.Size(40, 40),
                      anchor: iconData.anchor ? new window.google.maps.Size(iconData.anchor[0], iconData.anchor[1]) : undefined,
                    }
                  : undefined
              }
              onClick={() => onSelect(hospital)}
              animation={window.google?.maps.Animation.DROP}
            />
          );
        })}
    </Fragment>
  );
}
