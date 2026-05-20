import { motion, AnimatePresence } from "framer-motion";
import { X, Hospital, MapPin, ChevronRight, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

export default function DistrictDetailModal({
  district,
  onClose,
  onSelectHospital,
}) {
  if (!district) return null;

  const groupByType = (list = []) =>
    list.reduce((acc, h) => {
      const type = h.type || "Other";
      if (!acc[type]) acc[type] = [];
      acc[type].push(h);
      return acc;
    }, {});

  const grouped = groupByType(district.hospitals || []);

  const getTypeIcon = (type) => {
    switch (type.toUpperCase()) {
      case "HOSPITAL": return <Hospital className="text-red-500" size={18} />;
      default: return <MapPin className="text-emerald-500" size={18} />;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-emerald-600 text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">{district.name}</h3>
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest mt-1">Lista Fasilidade Saude</p>
          </div>
          <button
            aria-label="Taka Modal"
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {district.hospitals?.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <AlertCircle size={32} />
              </div>
              <p className="text-slate-400 font-medium tracking-wide">Seidauk iha dadus fasilidade ba distritu ne'e.</p>
            </div>
          ) : (
            Object.entries(grouped).map(([type, list]) => (
              <div key={type} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{type}</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg text-[10px] font-bold">{list.length}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {list.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onSelectHospital(h);
                        onClose();
                      }}
                      className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 rounded-2xl transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                          {getTypeIcon(type)}
                        </div>
                        <span className="font-bold text-slate-700 group-hover:text-emerald-800 transition-colors">{h.name}</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all"
          >
            Taka Janela
          </button>
        </div>
      </motion.div>
    </div>
  );
}
