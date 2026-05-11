import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDistricts, deleteDistrict } from "../services/districtService";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ui/ConfirmModal";
import { Plus, Search, Edit2, Trash2, MapPin, ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export default function DistrictListPage() {
  const BASE_URL = "http://localhost:4000";
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const ITEMS_PER_PAGE = 5;

  const loadDistricts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDistricts();
      setDistricts(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  const filtered = districts.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const confirmDeleteAction = async () => {
    try {
      await deleteDistrict(confirmDelete);
      toast.success("District berhasil dihapus");
      loadDistricts();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal hapus district");
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <LayoutDashboard className="text-emerald-600" />
            District Management
          </h1>
          <p className="text-slate-500 mt-1">Konta no jere dadus distritu sira iha Timor-Leste</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/districts/create")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
        >
          <Plus size={20} />
          Aumenta Distritu
        </motion.button>
      </div>

      {/* Stats / Controls */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buka naran distritu..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-700"
          />
        </div>
        <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold whitespace-nowrap">
          Total: {filtered.length} Distritu
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {paginatedData.map((d, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              key={d.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  {d.image ? (
                    <img
                      src={`${BASE_URL}${d.image}`}
                      alt={d.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <MapPin size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate">{d.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-bold">Timor-Leste</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => navigate(`/districts/edit/${d.id}`)}
                  className="flex-1 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(d.id)}
                  className="w-12 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 py-2.5 rounded-xl transition-all flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {paginatedData.length === 0 && !isLoading && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Search size={40} />
            </div>
            <p className="text-slate-400 font-bold">Dadus distritu la iha</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
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
                  currentPage === i + 1
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                    : "text-slate-600 hover:bg-slate-50"
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

      {/* Modals */}
      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Hapus District"
        message="Ita fiar katak atu hamos distritu ne'e?"
        onConfirm={confirmDeleteAction}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}