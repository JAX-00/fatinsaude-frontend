// src/utils/markerIcons.js

export const userIcon = {
  url: "http://maps.google.com/mapfiles/kml/pal2/icon10.png",
};

export function getHospitalIcon(type) {
  const icons = {
    hospital: { 
      url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_redH.png",
      anchor: [20, 40]
    },
    clinic: { 
      url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_greenC.png",
      anchor: [20, 40]
    },
    centro: { 
      url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellowC.png",
      anchor: [20, 40]
    },
    apotik: { 
      url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_purpleP.png",
      anchor: [20, 40]
    },
  };

  if (!type) return icons.hospital;

  return icons[type.toLowerCase()] || icons.hospital;
}