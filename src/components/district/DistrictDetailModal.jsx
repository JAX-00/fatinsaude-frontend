export default function DistrictDetailModal({
  district,
  onClose,
  onSelectHospital,
}) {
  if (!district) return null;

  const groupByType = (list) =>
    list.reduce((acc, h) => {
      if (!acc[h.type]) acc[h.type] = [];
      acc[h.type].push(h);
      return acc;
    }, {});

  const grouped = groupByType(district.hospitals);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">{district.name}</h3>

        {Object.entries(grouped).map(([type, list]) => (
          <div key={type} className="mb-4">
            <h4 className="font-semibold mb-2">
              {type} ({list.length})
            </h4>

            <ul className="space-y-2">
              {list.map((h, i) => (
                <li
                  key={i}
                  onClick={() => {
    onSelectHospital(h); 
    onClose();           
  }}
                  
                  className="border rounded-lg p-3 cursor-pointer hover:bg-red-50"
                >
                  {h.name}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#087BA7] py-2 rounded-lg text-white"
        >
          Taka
        </button>
      </div>
    </div>
  );
}
