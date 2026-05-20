import { motion, AnimatePresence } from "framer-motion";
import { X, Play, BookOpen, Clock, Tag, ExternalLink } from "lucide-react";

export default function EducationDetailModal({ item, onClose }) {
  if (!item) return null;

  const BASE_URL = "http://localhost:4000";

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(item.videoUrl);

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image / Video Section */}
        <div className="relative shrink-0 bg-slate-100">
          {videoId ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="h-64 sm:h-80 overflow-hidden relative">
              {item.image ? (
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <BookOpen size={80} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}
          
          <button
            aria-label="Taka Modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all z-10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-10 space-y-8 custom-scrollbar">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Tag size={14} />
                {item.category}
              </span>
              {item.time && (
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} />
                  {item.time}
                </span>
              )}
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {item.title}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none">
            {item.description && (
              <p className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6 mb-8">
                {item.description}
              </p>
            )}
            
            <div className="text-slate-700 leading-relaxed space-y-6 whitespace-pre-wrap text-base">
              {item.content || "Seidauk iha konten kompletu ba informasaun ne'e."}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-lg shadow-slate-900/10"
          >
            Taka Janela
          </button>
          {item.videoUrl && !videoId && (
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              Haree iha YouTube
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
