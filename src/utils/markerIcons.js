export const userIcon = {
  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
};

export function getHospitalIcon(type) {
  const icons = {
    Hospital: {
      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    },
    Clinic: {
      url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    },
    Centro: {
      url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    },
    Apotik: {
      url: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    },
  };

  return icons[type] || icons.Hospital;
}
