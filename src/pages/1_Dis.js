import { useState } from "react";
import { useNavigate } from "react-router-dom";

import hospitals from "../data/hospitalData";
import districtMeta from "../data/districtMeta";
import { buildDistrictsFromHospitals } from "../utils/buildDistricts";

export default function Distritu() {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // 🔥 bangun distrik dari hospital
  const districts = buildDistrictsFromHospitals(hospitals).map((d) => ({
    ...d,
    ...districtMeta[d.name],
  }));

  // hitung per tipe
  const countByType = (list) =>
    list.reduce((acc, h) => {
      acc[h.type] = (acc[h.type] || 0) + 1;
      return acc;
    }, {});

  // group fasilitas per tipe
  const groupByType = (list) =>
    list.reduce((acc, h) => {
      if (!acc[h.type]) acc[h.type] = [];
      acc[h.type].push(h);
      return acc;
    }, {});

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold text-center mt-6 mb-3 relative after:block after:w-80 after:h-1 after:bg-[#087BA7] after:mx-auto after:mt-2">
        Fasilidade Saude Iha Distritu Timor-Leste
      </h3>
      <p className="text-center mb-6">
        Página ida ne’e buka lista fasilidade saúde iha kada distritu, inklui
        hospital no klinik.
      </p>

      {/* GRID DISTRIK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {districts.map((district, idx) => {
          const stats = countByType(district.hospitals);

          return (
            <div
              key={idx}
              onClick={() =>
                navigate("/", {
                  state: {
                    district: {
                      name: district.name,
                      hospitals: district.hospitals,
                      center: district.center,
                      zoom: district.zoom || 12,
                    },
                  },
                })
              }
              className="
                bg-[#087BA7] rounded-xl shadow-md overflow-hidden cursor-pointer
                hover:shadow-xl transition transform hover:-translate-y-2 
              text-white"
            >
              <img
                src={district.image}
                alt={district.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{district.name}</h3>

                {/* STATISTIK */}
                <div className="text-sm space-y-1">
                  <p>🏥 Hospital: {stats.Hospital || 0}</p>
                  <p>💊 Apotik: {stats.Apotik || 0}</p>
                  <p>🏥 Centro: {stats.Centro || 0}</p>
                  <p>🩺 Clinic: {stats.Clinic || 0}</p>
                  <p className="font-semibold pt-1">
                    Total Fasilidade Saude: {district.hospitals.length}
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ⛔ jangan trigger klik card
                    setSelectedDistrict(district);
                  }}
                  className="
                    mt-4 w-full bg-[#031A6A] text-white py-2 rounded-lg
                    hover:bg-blue-700 transition
                  "
                >
                  Informasaun Detailho
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DETAIL */}
      {selectedDistrict &&
        (() => {
          const grouped = groupByType(selectedDistrict.hospitals);

          return (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setSelectedDistrict(null)}
            >
              <div
                className="
                bg-white rounded-xl p-6 w-[90%] max-w-lg
                max-h-[80vh] overflow-y-auto
              "
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">
                  {selectedDistrict.name}
                </h3>

                {/* LIST PER TIPE */}
                {Object.entries(grouped).map(([type, list]) => (
                  <div key={type} className="mb-4">
                    <h4 className="font-semibold mb-2">
                      {type} ({list.length})
                    </h4>

                    <ul className="space-y-2">
                      {list.map((h, i) => (
                        <li
                          key={i}
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
                          border rounded-lg p-3 cursor-pointer
                          hover:bg-red-50 transition
                        "
                        >
                          <p className="font-medium">{h.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <button
                  onClick={() => setSelectedDistrict(null)}
                  className="
                  mt-4 w-full bg-[#087BA7] py-2 rounded-lg
                  hover:bg-[#031A6A] transition text-white
                "
                >
                  Taka
                </button>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
