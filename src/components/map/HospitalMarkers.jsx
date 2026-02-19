import { Marker } from "@react-google-maps/api";
import { getHospitalIcon } from "../../utils/markerIcons";
import { Fragment } from "react";

export default function HospitalMarkers({ hospitals, activeType, onSelect }) {
  return (
    <Fragment>
      {hospitals
        .filter((h) => activeType === "ALL" || h.type === activeType)
        .map((hospital) => (
          <Marker
            key={hospital.id}
            position={hospital.position}
            icon={{
              ...getHospitalIcon(hospital.type),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onClick={() => onSelect(hospital)}
          />
        ))}
    </Fragment>
  );
}
