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

          return (
            <Marker
              key={hospital.id}
              position={{ 
                lat: Number(hospital.latitude), 
                lng: Number(hospital.longitude) 
              }}
              // 4. Cegah error jika window.google belum dimuat
              icon={
                window.google
                  ? {
                      ...getHospitalIcon(hospital.type),
                      scaledSize: new window.google.maps.Size(40, 40),
                    }
                  : undefined
              }
              onClick={() => onSelect(hospital)}
            />
          );
        })}
    </Fragment>
  );
}
