export default function HospitalCard({ hospital, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        group bg-white rounded-xl border-2 border-[#087BA7]
        shadow-md p-5 cursor-pointer
        transition hover:-translate-y-2 hover:shadow-xl
      "
    >
      <h3 className="font-bold text-lg mb-2">
        {hospital.name}
      </h3>

      <p className="text-sm text-gray-600">
        📍 <b>Distritu:</b> {hospital.district}
      </p>

      <p className="text-sm text-gray-600 mb-4">
        🦠 <b>Moras:</b> {hospital.diseases.join(", ")}
      </p>

      <span className="inline-block px-4 py-2 rounded-full bg-[#087BA7] text-white">
        Loke Mapa →
      </span>
    </div>
  );
}
