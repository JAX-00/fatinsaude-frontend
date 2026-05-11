import { InfoWindow } from "@react-google-maps/api";
import { Phone, Navigation, Clock, MapPin, Ambulance } from "lucide-react";
import { motion } from "framer-motion";

export default function HospitalInfo({
  hospital,
  onClose,
  onRoute,
  onEmergency,
}) {
  if (!hospital) return null;

  // Normalize image path if it starts with /uploads
  const imageUrl = hospital.image?.startsWith("http") 
    ? hospital.image 
    : `http://localhost:4000${hospital.image}`;

  return (
    <InfoWindow
      position={{
        lat: hospital.latitude,
        lng: hospital.longitude,
      }}
      onCloseClick={onClose}
    >
      <div className="w-[280px] sm:w-[320px] bg-white rounded-xl overflow-hidden shadow-2xl font-poppins">
        {/* Banner Image */}
        <div className="relative h-32 bg-slate-200">
          <img
            src={imageUrl}
            alt={hospital.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400";
            }}
          />
          <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-emerald-700 uppercase tracking-wider shadow-sm">
            {hospital.type}
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {hospital.name}
            </h3>
            <div className="flex items-center gap-1 text-slate-500 mt-1">
              <MapPin size={14} className="text-emerald-600" />
              <span className="text-xs">{hospital.district?.name || "Desconhecido"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-100">
            <div className="flex items-start gap-2">
              <Clock size={16} className="text-emerald-500 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Operasaun</p>
                <p className="text-xs font-medium text-slate-700">{hospital.operationTime || "24/7"}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={16} className="text-emerald-500 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Kontaktu</p>
                <p className="text-xs font-medium text-slate-700">{hospital.phone || "---"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex gap-2">
              {hospital.phone && hospital.phone !== "---" && (
                <a
                  href={`tel:${hospital.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  <Phone size={14} />
                  Ligan
                </a>
              )}
              {hospital.ambulance && hospital.ambulance !== "---" && (
                <button
                  onClick={() => onEmergency(hospital.ambulance)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  <Ambulance size={14} />
                  Ambulans
                </button>
              )}
            </div>

            <button
              onClick={() => onRoute({
                ...hospital,
                position: { lat: hospital.latitude, lng: hospital.longitude }
              })}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-600/20"
            >
              <Navigation size={16} />
              Hatudu Dalan
            </button>
          </div>
        </div>
      </div>
    </InfoWindow>
  );
}