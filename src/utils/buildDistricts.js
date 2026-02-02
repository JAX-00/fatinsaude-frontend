export const buildDistrictsFromHospitals = (hospitals) => {
  const map = {};

  hospitals.forEach((h) => {
    if (!map[h.district]) {
      map[h.district] = {
        name: h.district,
        hospitals: [],
      };
    }
    map[h.district].hospitals.push(h);
  });

  return Object.values(map);
};
