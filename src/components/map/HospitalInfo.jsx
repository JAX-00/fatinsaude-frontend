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
      position={hospital.position}
      onCloseClick={onClose}
    >
      <div className="w-[95vw] max-w-[360px] bg-white rounded-lg shadow-lg overflow-hidden border">
        {/* Image */}
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-24 object-cover"
        />

        <div className="p-3">
          <h3 className="font-bold text-lg text-center mb-2">
            {hospital.name}
          </h3>

          <p className="text-sm">
            <b>Operational Time:</b> {hospital.operationalTime}
          </p>
          <p className="text-sm">
            <b>Distrik:</b> {hospital.district}
          </p>
          <p className="text-sm mb-3">
            <b>Call Center:</b> {hospital.phone}
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <a
              href={`tel:${hospital.phone}`}
              className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
            >
              ☎️ Call
            </a>

            {hospital.emergency === "Yes" &&
              hospital.ambulance && (
                <button
                  onClick={() => onEmergency(hospital.ambulance)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 text-sm animate-pulse"
                >
                  🚑 Ambulans
                </button>
              )}
          </div>

          <button
            onClick={() => onRoute(hospital)}
            className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            🚗 Hela Dalan
          </button>
        </div>
      </div>
    </InfoWindow>
  );
}
