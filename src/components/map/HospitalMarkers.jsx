// src/components/map/HospitalMarkers.jsx
import { Marker } from "@react-google-maps/api";
import { getHospitalIcon } from "../../utils/markerIcons";
import { Fragment } from "react";

export default function HospitalMarkers({ hospitals, activeType, onSelect }) {
  if (!Array.isArray(hospitals) || hospitals.length === 0) return null;

  return (
    <Fragment>
      {hospitals
        .filter((h) => {
          if (!h || !h.type) return false;
          return (
            activeType === "ALL" || 
            h.type.toLowerCase() === activeType.toLowerCase()
          );
        })
        .map((hospital) => {
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
