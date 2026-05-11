import { Search, MapPin, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Filtermoras({
  districts,
  diseases,
  selectedDistrict,
  selectedDisease,
  onDistrictChange,
  onDiseaseChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-emerald-900 text-white rounded-[2.5rem] p-8 mb-12 shadow-2xl shadow-emerald-900/20 relative overflow-hidden group"
    >
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-bold text-emerald-300 uppercase tracking-widest">
            <Activity size={18} />
            Buka Tuir Moras
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buka moras (Ez: Malaria, TBC...)"
              className="w-full bg-white/10 border border-white/20 text-white p-4 pr-12 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all hover:bg-white/15 placeholder:text-emerald-400/50"
              value={selectedDisease}
              onChange={(e) => onDiseaseChange(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400">
              <Search size={18} />
            </div>
          </div>
          <p className="text-[10px] text-emerald-400/60 font-medium">Ita bele hakerek naran moras ne'ebé ita buka.</p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-bold text-emerald-300 uppercase tracking-widest">
            <MapPin size={18} />
            Haree iha Distritu
          </label>
          <div className="relative">
            <select
              className="w-full bg-white/10 border border-white/20 text-white p-4 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:outline-none appearance-none cursor-pointer transition-all hover:bg-white/15"
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e.target.value)}
            >
              <option value="" className="text-slate-900">Timor-Leste Laran (Todos Distritos)</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id} className="text-slate-900">{d.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400">
              <MapPin size={18} />
            </div>
          </div>
          <p className="text-[10px] text-emerald-400/60 font-medium">Buka fasilidade ne'ebé besik liu ita.</p>
        </div>
      </div>
    </motion.div>
  );
}
