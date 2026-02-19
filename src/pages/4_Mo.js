import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitals from "../data/hospitalData";

// List filter options
const districts = [
  "Baucau",
  "Lautem",
  "Dili",
  "Ainaro",
  "Bobonaro",
  "Oé-Cusse",
  "Covalima",
];
const diseases = [
  "Isin Manas",
  "Kanek Kaman",
  "Malaria",
  "Moras Todan",
  "Covid",
  "Influenza",
  "Maternidade",
];

export default function KazuGrave() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");

  const navigate = useNavigate();

  const filteredHospitals = hospitals.filter((h) => {
    const matchDistrict = selectedDistrict
      ? h.district === selectedDistrict
      : true;
    const matchDisease = selectedDisease
      ? h.diseases.includes(selectedDisease)
      : true;
    return matchDistrict && matchDisease;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Judul */}
      <h3 className="text-2xl font-bold text-center mt-6 mb-3 relative after:block after:w-80 after:h-1 after:bg-[#087BA7] after:mx-auto after:mt-2">
        Fasilidade Saude ne’ebe bele Atende Kazu ka Moras
      </h3>
      <p className="text-center mb-6">
        Página ne’e ajuda Buka kazu ka moras ne’ebé ita hasoru, no hetan
        ospital, klinik ka apotek ne’ebé bele atende ita-nia moras ne’e.
      </p>

      {/* FILTER PANEL */}
      <div className="rounded-xl shadow-md p-4 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#087BA7]">
        {/* Filter Penyakit */}
        <div>
          <label className="block font-semibold mb-1 text-sm text-white">
            Filter Moras
          </label>
          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#031A6A]"
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
          >
            <option value="">Listas Moras Sira</option>
            {diseases.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Distrik */}
        <div>
          <label className="block font-semibold mb-1 text-sm text-white">
            Filter Distritu
          </label>
          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#031A6A]"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Distritu Hotu</option>
            {districts.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID HOSPITAL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((h, idx) => (
          <div
            key={idx}
            onClick={() =>
              navigate("/", {
                state: {
                  focusHospital: {
                    position: h.position,
                    zoom: 16,
                    hospital: h,
                  },
                },
              })
            }
            className="
              group bg-white rounded-xl border-2 border-[#087BA7] shadow-md p-5
              cursor-pointer
              transform transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl 
            hover:border-[#031A6A]
    
            "
          >
            {/* Header */}
            <h3 className="font-bold text-lg mb-2 group-hover:text-[#031A6A]">
              {h.name}
            </h3>

            <p className="text-sm text-gray-600 mb-1">
              📍 <b>Distritu:</b> {h.district}
            </p>

            <p className="text-sm text-gray-600 mb-4">
              🦠 <b>Moras:</b> {h.diseases.join(", ")}
            </p>

            {/* CTA */}
            <div className="mt-auto">
              <span
                className="
    inline-block
    px-4 py-2
    rounded-full
    bg-[#087BA7]
    text-sm font-semibold
    text-white
    transition-all duration-300
    group-hover:bg-[#031A6A]
    group-hover:text-white
    group-hover:underline
  "
              >
                Loke Mapa →
              </span>
            </div>
          </div>
        ))}

        {filteredHospitals.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            Laiha Hospital mak hanesan filterasaun.
          </p>
        )}
      </div>
    </div>
  );
}
