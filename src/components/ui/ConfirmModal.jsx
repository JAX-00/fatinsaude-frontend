export default function ConfirmModal({
  isOpen,
  title,
  message, 
  onConfirm,
  onCancel, 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
        <h2 className="text-lg font-bold mb-3">{title}</h2>
        <p className="text-gray-600 mb-5">{message}</p>

        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 bg-gray-300 py-2 rounded">
            Batal
          </button>

          <button onClick={onConfirm} className="flex-1 bg-red-600 text-white ppy-2 rounded">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
