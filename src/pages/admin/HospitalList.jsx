import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHospitals, deleteHospital } from "../../services/hospitalService";
import { Plus, Search, MapPin, Phone, Trash2, Edit2, Loader2, Hospital as HospitalIcon, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { clsx } from "clsx";

export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const ITEMS_PER_PAGE = 5;

  const loadHospitals = async () => {
    setLoading(true);
    try {
      const data = await fetchHospitals();
      setHospitals(data);
    } catch (err) {
      toast.error("Gagal load data hospital");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteHospital(confirmDelete);
      toast.success("Hospital hamos ho susesu");
      loadHospitals();
    } catch (err) {
      toast.error("Gagal hamos hospital");
    } finally {
      setConfirmDelete(null);
    }
  };

  const filteredHospitals = hospitals.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    (h.district?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHospitals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredHospitals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jestaun Hospital</h1>
          <p className="text-slate-500 text-sm">Organiza dadus fasilidade saude hotu-hotu.</p>
        </div>
        <Link 
          to="/admin/hospitals/new" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all w-fit"
        >
          <Plus size={20} />
          Aumenta Hospital
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <HospitalIcon size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Fasilidade</p>
            <p className="text-2xl font-bold text-slate-900">{hospitals.length}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Buka tuir naran ka distritu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
            <p className="text-slate-400 font-bold">Loader dadus...</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Hospital</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Localizasaun</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Kontatu</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Aksaun</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {paginatedData.map((h) => (
                  <motion.tr 
                    key={h.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center text-slate-400">
                          {h.image ? (
                            <img src={`http://localhost:4000${h.image}`} alt={h.name} className="w-full h-full object-cover" />
                          ) : (
                            <HospitalIcon size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{h.name}</p>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{h.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-sm font-medium">{h.district?.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        <span className="text-sm font-medium">{h.phone || "-"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          to={`/admin/hospitals/edit/${h.id}`}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => setConfirmDelete(h.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {paginatedData.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <p className="text-slate-400 font-bold">Dadus hospital la iha</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
        title="Hamos Hospital"
        message="Ita fiar katak atu hamos hospital ne'e?"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
