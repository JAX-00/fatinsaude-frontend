export function filterHospitals(hospitals, district, disease) {
  return hospitals.filter((h) => {
    const matchDistrict = district ? h.district === district : true;
    const matchDisease = disease ? h.diseases.includes(disease) : true;
    return matchDistrict && matchDisease;
  });
}
