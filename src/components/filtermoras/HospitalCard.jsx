import { MapPin, Activity, Navigation, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function HospitalCard({ hospital, onClick }) {
  const BASE_URL = "http://localhost:4000";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all group cursor-pointer"
    >
      <div className="flex flex-col h-full space-y-6">
        <div className="h-40 rounded-3xl overflow-hidden relative group-hover:shadow-lg transition-all">
          {hospital.image ? (
            <img 
              src={`${BASE_URL}${hospital.image}`} 
              alt={hospital.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
              <Activity size={48} />
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-emerald-700 uppercase">
            {hospital.type || "Fasilidade"}
          </div>
        </div>

        <div className="flex justify-between items-start pt-2">
          <div className="space-y-1">
            <h3 className="font-bold text-xl text-slate-900 leading-tight">
              {hospital.name}
            </h3>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin size={14} className="text-emerald-500" />
              <span className="text-xs font-medium">{hospital.district?.name || hospital.district}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Activity size={14} className="text-emerald-500" />
            Especialidade
          </div>
          <div className="flex flex-wrap gap-2">
            {(() => {
              const diseasesArray = Array.isArray(hospital.diseases) 
                ? hospital.diseases 
                : (typeof hospital.diseases === 'string' ? hospital.diseases.split(',') : ["Geral"]);
              
              const displayLimit = 6;
              const hasMore = diseasesArray.length > displayLimit;
              const visibleDiseases = hasMore ? diseasesArray.slice(0, displayLimit) : diseasesArray;

              return (
                <>
                  {visibleDiseases.map((d, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-100 transition-colors"
                    >
                      {d}
                    </span>
                  ))}
                  {hasMore && (
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl text-[10px] font-bold border border-emerald-200">
                      + {diseasesArray.length - displayLimit} seluk
                    </span>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-slate-900 group-hover:bg-emerald-600 text-white py-4 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-slate-900/10 group-hover:shadow-emerald-600/20">
            <Navigation size={18} />
            Hatudu iha Mapa
          </button>
        </div>
      </div>
    </motion.div>
  );
}
