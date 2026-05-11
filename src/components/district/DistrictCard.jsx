import { motion } from "framer-motion";
import { Hospital, Pill, Stethoscope, Landmark, ArrowRight, MapPin } from "lucide-react";

export default function DistrictCard({ district, stats, onClick, onDetail }) {
  const BASE_URL = "http://localhost:4000";

  const statItems = [
    { label: "Hospital", value: stats.HOSPITAL || 0, icon: <Hospital size={16} />, color: "text-red-500" },
    { label: "Apotik", value: stats.APOTIK || 0, icon: <Pill size={16} />, color: "text-purple-500" },
    { label: "Centro", value: stats.CENTRO || 0, icon: <Landmark size={16} />, color: "text-amber-500" },
    { label: "Klinik", value: stats.CLINIC || 0, icon: <Stethoscope size={16} />, color: "text-blue-500" },
  ];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all border border-slate-100 overflow-hidden group"
    >
      {/* Image Header */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={district.image ? `${BASE_URL}${district.image}` : "https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=600"}
          alt={district.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
          <MapPin size={20} className="text-emerald-400" />
          <h3 className="font-bold text-2xl tracking-tight">{district.name}</h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((item) => (
            <div key={item.label} className="bg-slate-50 p-3 rounded-2xl flex items-center gap-3">
              <div className={`${item.color} bg-white p-2 rounded-xl shadow-sm`}>
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-bold text-slate-700">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetail();
            }}
            className="w-full py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            Ver Detalhes
            <ArrowRight size={16} />
          </button>
          
          <button
            onClick={onClick}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-600/20"
          >
            Haree iha Mapa
          </button>
        </div>
      </div>
    </motion.div>
  );
}
