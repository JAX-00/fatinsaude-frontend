export default function FirstAidCard({ item, onDetail }) {
  return (
    <div className="group bg-[#031A6A] text-white rounded-lg overflow-hidden shadow-md transition-all hover:-translate-y-2">
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-40 object-cover group-hover:scale-110 transition"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-sm mt-2">{item.desc}</p>

        <button
          onClick={() => onDetail(item)}
          className="mt-4 bg-[#087BA7] px-4 py-2 rounded hover:bg-gray-200 hover:text-[#031A6A]"
        >
          Informasaun Detailho
        </button>
      </div>
    </div>
  );
}
