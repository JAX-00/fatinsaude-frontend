export const getMArkerIcon = (type) => {
  const icons = {
    Apotik: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    Centro: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    Clinic: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    Hospital: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  };

  return icons[type] || icons.Hospital;
};
