export default function EmergencyConfirm({
  isOpen,
  phoneNumber,
  isOnline,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center shadow-xl">
        <h2 className="text-xl font-bold text-red-600 mb-3">
          ⚠️ Emergency Call
        </h2>

        <p className="text-gray-700 mb-4">
          Ita boot hakarak liga ambulans?
          <br />
          <span className="font-semibold">{phoneNumber}</span>
        </p>

        {!isOnline && (
          <p className="text-sm text-red-500 mb-3">
            📵 Ita agora offline. Favor liga manual.
          </p>
        )}

        <div className="flex gap-3">
          {/* Cancel */}
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Kansela
          </button>

          {/* Confirm */}
          <a
            href={isOnline ? `tel:${phoneNumber}` : undefined}
            onClick={onClose}
            className={`flex-1 py-2 rounded text-white text-center ${
              isOnline
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Liga Agora
          </a>
        </div>
      </div>
    </div>
  );
}
