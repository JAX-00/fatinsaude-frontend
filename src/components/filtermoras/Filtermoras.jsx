export default function Filtermoras({
  districts,
  diseases,
  selectedDistrict,
  selectedDisease,
  onDistrictChange,
  onDiseaseChange,
}) {
  return (
    <div className="rounded-xl shadow-md p-4 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#087BA7]">
      <div>
        <label className="block font-semibold mb-1 text-sm text-white">
          Filter Moras
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedDisease}
          onChange={(e) => onDiseaseChange(e.target.value)}
        >
          <option value="">Listas Moras Sira</option>
          {diseases.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1 text-sm text-white">
          Filter Distritu
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedDistrict}
          onChange={(e) => onDistrictChange(e.target.value)}
        >
          <option value="">Distritu Hotu</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
