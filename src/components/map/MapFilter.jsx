export default function MapFilter({ value, onChange }) {
  return (
    <div className="   absolute z-10
    top-3 left-3
    bg-white rounded-lg shadow-lg
    px-2 py-2
    w-40

    sm:top-4 sm:left-4
    sm:px-3 sm:py-2
    sm:w-56">
      <label className="block text-[10px] sm:text-xs font-semibold mb-1">
        Filter Fasilidade Saude
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md px-2 py-1.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#087BA7]"
      >
        <option value="ALL">All</option>
        <option value="Hospital">Hospital</option>
        <option value="Apotik">Apotik</option>
        <option value="Clinic">Clinic</option>
        <option value="Centro">Centro</option>
      </select>
    </div>
  );
}
