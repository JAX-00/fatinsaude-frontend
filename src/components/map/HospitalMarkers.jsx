import { Marker } from "@react-google-maps/api";
import { hospitalIcons } from "../../utils/markerIcons";


export default function HospitalMarkers({
  hospitals,
  activeType,
  onSelect,
}) {
  return hospitals
    .filter((h) => activeType === "ALL" || h.type === activeType)
    .map((hospital) => (
      <Marker
        key={hospital.id}
        position={hospital.position}
        icon={{
          url: hospitalIcons(hospital.type),
          scaledSize: new window.google.maps.Size(40, 40),
        }}
        onClick={() => onSelect(hospital)}
      />
    ));
}
