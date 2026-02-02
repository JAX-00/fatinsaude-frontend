export default function MapFilter({ value, onChange }) {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg px-3 py-2 w-56">
      <label className="block text-xs font-semibold mb-1">
        Filter Fasilidade Saude
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md px-2 py-1.5 text-sm focus:ring-2 focus:ring-red-500"
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
