import { useState } from "react";
import firstAidData from "../data/firstAidData";

export default function InformasaunGeral() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-center mt-6 mb-3 relative after:block after:w-80 after:h-1 after:bg-[#087BA7] after:mx-auto after:mt-2">
        Atendementu Primeiru (First Aids)
      </h3>
      <p className="text-center mb-6">
        Informasaun básiku kona-ba Atendimentu primeiru antes ambulánsia mai iha
        situasaun emergénsia.
      </p>
      {/* GRID CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {firstAidData.map((item) => (
          <div
            className="group 
  bg-[#031A6A] text-white rounded-lg overflow-hidden
  shadow-md
  transform transition-all duration-300 ease-out
  hover:-translate-y-3 hover:shadow-2xl
  hover:scale-[1.02]
"
          >
            {/* Gambar */}
            <img
              src={item.img}
              alt={`Gambar ${item.title}`}
              className="
    w-full h-40 object-cover
    transition-transform duration-300
    group-hover:scale-110
  "
            />

            {/* Konten */}
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm mt-2">{item.desc}</p>

              <button
                onClick={() => setSelected(item)}
                className="mt-4 bg-[#087BA7] text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-[#031A6A]"
              >
                Informasaun Detailho
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL / POPUP */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{selected.title}</h2>

            <ul className="list-disc ml-5 mt-2 text-gray-700">
              {selected.detail.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 bg-[#031A6A] text-white px-4 py-2 rounded hover:bg-[#087BA7]"
            >
              Taka
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
