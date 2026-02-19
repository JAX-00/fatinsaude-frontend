import { InfoWindow } from "@react-google-maps/api";

export default function HospitalInfo({
  hospital,
  onClose,
  onRoute,
  onEmergency,
}) {
  if (!hospital) return null;

  return (
    <InfoWindow
      key={hospital.id || hospital.name}
      position={hospital.position}
      onCloseClick={onClose}
    >
      <div
        className="
          bg-white rounded-lg shadow-lg border overflow-hidden
          w-fit max-w-[90vw] sm:max-w-[360px]
        "
      >
        {/* IMAGE */}
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full object-cover h-24 sm:h-28"
        />

        <div className="p-3 space-y-1.5 text-sm">
          <h3 className="font-bold text-base sm:text-lg text-center mb-1">
            {hospital.name}
          </h3>

          <p><b>⏰ Operasaun:</b> {hospital.operationalTime}</p>
          <p><b>📍 Distritu:</b> {hospital.district}</p>
          <p><b>☎️ Kontaktu:</b> {hospital.phone}</p>

          {/* ACTIONS */}
          <div className="flex gap-2 mt-2">
            <a
              href={`tel:${hospital.phone}`}
              className="
                flex-1 text-center
                bg-blue-600 text-white py-2 rounded
                text-xs sm:text-sm
              "
            >
              📞 Call
            </a>

            {hospital.emergency === "Yes" && hospital.ambulance && (
              <button
                onClick={() => onEmergency(hospital.ambulance)}
                className="
                  flex-1 bg-red-600 text-white py-2 rounded
                  text-xs sm:text-sm
                "
              >
                🚑 Ambulans
              </button>
            )}
          </div>

          <button
            onClick={() => onRoute(hospital)}
            className="
              mt-2 w-full
              bg-green-600 text-white py-2 rounded
              text-xs sm:text-sm
            "
          >
            ➡️ Ba iha neba
          </button>
        </div>
      </div>
    </InfoWindow>
  );
}
