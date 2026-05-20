import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEducation, deleteEducation } from "../../services/educationService";
import { Plus, Search, BookOpen, Trash2, Edit2, Loader2, Play, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "../../components/ui/ConfirmModal";
import EducationDetailModal from "../../components/education/EducationDetailModal";
import { clsx } from "clsx";

export default function EducationList() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const ITEMS_PER_PAGE = 5;

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchEducation();
      setEducation(data);
    } catch (err) {
      toast.error("Gagal load data edukasaun");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteEducation(confirmDelete);
      toast.success("Konten hamos ho susesu");
      loadData();
    } catch (err) {
      toast.error("Gagal hamos konten");
    } finally {
      setConfirmDelete(null);
    }
  };

  const filteredData = education.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edukasuan Saude</h1>
          <p className="text-slate-500 text-sm">Jere konten edukasaun ba publiku (First Aid, CPR, etc).</p>
        </div>
        <Link 
          to="/admin/education/new" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all w-fit"
        >
          <Plus size={20} />
          Aumenta Konten
        </Link>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Buka tuir titulu ka kategoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-emerald-500" size={40} />
              <p className="text-slate-400 font-bold">Loader dadus...</p>
            </div>
          ) : paginatedData.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-emerald-900/5 transition-all"
            >
              <div className="h-40 bg-slate-100 relative">
                {item.image ? (
                  <img src={`http://localhost:4000${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <BookOpen size={48} />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-emerald-600 uppercase">
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{item.description || "Laiha deskripsaun..."}</p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex gap-2">
                    <Link 
                      to={`/admin/education/edit/${item.id}`}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <button 
                      onClick={() => setSelectedEducation(item)}
                      className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                      title="Detail"
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      onClick={() => setConfirmDelete(item.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {item.videoUrl && (
                    <button 
                      onClick={() => setSelectedEducation(item)}
                      className="text-emerald-500 hover:scale-110 transition-transform p-1"
                      title="Haree Video"
                    >
                      <Play size={16} fill="currentColor" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {paginatedData.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-400 font-bold">Dadus edukasaun la iha</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={clsx(
                  "w-10 h-10 rounded-xl font-bold transition-all",
                  currentPage === i + 1 ? "bg-emerald-600 text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <ConfirmModal 
        isOpen={!!confirmDelete}
        title="Hamos Konten"
        message="Ita fiar katak atu hamos konten edukasaun ne'e?"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />

      <AnimatePresence>
        {selectedEducation && (
          <EducationDetailModal 
            item={selectedEducation} 
            onClose={() => setSelectedEducation(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
