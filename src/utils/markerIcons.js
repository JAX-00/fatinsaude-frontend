// src/utils/markerIcons.js

export const userIcon = {
  url: "http://maps.google.com/mapfiles/kml/pal2/icon10.png",
};

export function getHospitalIcon(type) {
  const icons = {
    hospital: { 
      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    },
    clinic: { 
      url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    },
    centro: { 
      url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    },
    apotik: { 
      url: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    },
  };

  if (!type) return icons.hospital;

  return icons[type.toLowerCase()] || icons.hospital;
}