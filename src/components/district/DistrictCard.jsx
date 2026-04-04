export default function DistrictCard({
  district,
  stats,
  onClick,
  onDetail,
}) {
   const BASE_URL = process.env.REACT_APP_API_URL.replace("/api/v1", "");

  return (
    <div
      onClick={onClick}
      className="bg-[#087BA7] rounded-xl shadow-md overflow-hidden cursor-pointer
                hover:shadow-xl transition transform hover:-translate-y-2 
              text-white"
    >
      <img
        src={district.image ? `${BASE_URL}${district.image}` : "/no-image.png"}
        alt={district.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{district.name}</h3>

        <div className="text-sm space-y-1">
          <p>🏥 Hospital: {stats.Hospital || 0}</p>
          <p>💊 Apotik: {stats.Apotik || 0}</p>
          <p>🏥 Centro: {stats.Centro || 0}</p>
          <p>🩺 Clinic: {stats.Clinic || 0}</p>
          <p className="font-semibold pt-1">
            Total: {district.hospitals?.length || 0}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetail();
          }}
          className="mt-4 w-full bg-[#031A6A] py-2 rounded-lg"
        >
          Informasaun Detailho
        </button>
      </div>
    </div>
  );
}
