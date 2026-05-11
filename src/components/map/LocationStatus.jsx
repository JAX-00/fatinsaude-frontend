import React from "react";
import { MapPin, AlertTriangle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LocationStatus({ status, showModal, onRetry }) {
  // Jika GPS aktif atau loading → tidak tampil apa-apa
  if (status === "granted" || status === "loading") return null;

  return (
    <>
      {/* Soft Warning Toast (Top Center) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md"
        >
          <div className="bg-amber-100 p-2 rounded-full">
            <AlertTriangle size={18} className="text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Localizacao Desativada</p>
            <p className="text-xs font-medium">Loke GPS atu hetan rute loos.</p>
          </div>
        </motion.div>
      </div>

      {/* Modal for explicitly requested actions (e.g. Directions) */}
      <AnimatePresence>
        {showModal && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/40 backdrop-blur-[2px] z-[100] p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <MapPin size={40} />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  Presiza Localizacao
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Atu hetan dalan (rute) no hatene hospital ne'ebé besik liu, favor loke asesu lokasi iha ita-nia telemovel.
                </p>
              </div>

              <button
                onClick={onRetry}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 group"
              >
                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                Koko Fali Agora
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}