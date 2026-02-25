// src/utils/markerIcons.js

export const userIcon = {
  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
};

export function getHospitalIcon(type) {
  // convert type ke lowercase agar case-insensitive
  const icons = {
    hospital: { url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" },
    clinic: { url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png" },
    centro: { url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png" },
    apotik: { url: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png" },
  };

  if (!type) return icons.hospital;

  return icons[type.toLowerCase()] || icons.hospital;
}