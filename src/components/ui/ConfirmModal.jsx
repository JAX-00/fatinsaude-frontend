import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  isOpen,
  title,
  message, 
  onConfirm,
  onCancel, 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="p-8 text-center space-y-4">
               <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
               <p className="text-slate-500 leading-relaxed">{message}</p>
               
               <div className="flex gap-3 pt-4">
                  <button 
                    onClick={onCancel} 
                    className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
                  >
                    Kansela
                  </button>
                  <button 
                    onClick={onConfirm} 
                    className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-600/20 transition-all"
                  >
                    Hamos
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
