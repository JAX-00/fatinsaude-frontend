export default function FirstAidModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{item.title}</h2>

        <ul className="list-disc ml-5 text-gray-700">
          {item.detail.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-6 bg-[#031A6A] text-white px-4 py-2 rounded hover:bg-[#087BA7]"
        >
          Taka
        </button>
      </div>
    </div>
  );
}
