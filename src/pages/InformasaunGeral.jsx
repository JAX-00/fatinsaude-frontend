import { useState, useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Info, Heart, ChevronRight, Share2, Loader2, SearchX } from "lucide-react";
import { fetchEducation } from "../services/educationService";

export default function InformasaunGeral() {
  const [activeTab, setActiveTab] = useState("Hotu");
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categories = ["Hotu", "Atendimentu Primeiru", "CPR", "Prevensaun"];
  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    fetchEducation().then(data => {
      setEducationData(data);
      setLoading(false);
    });
  }, []);

  const filteredData = activeTab === "Hotu" 
    ? educationData 
    : educationData.filter(d => d.category === activeTab);

  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="p-8 max-w-7xl mx-auto space-y-12">
        <PageHeader
          title="Sentru Edukasaun Saude"
          description="Ita-nia portal ba informasaun saúde ne'ebé kredível no fasil atu komprende. Aprende oinsá salva moris ho ajuda primeiru."
        />

        {/* Categories Tab */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === cat
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Card (Hero) */}
        {activeTab === "Hotu" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[400px] rounded-[3rem] overflow-hidden group shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200"
              alt="Hero Education"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/40 to-transparent" />
            <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-xl space-y-6">
              <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit">
                Especial CPR
              </span>
              <h2 className="text-4xl font-extrabold text-white leading-tight">
                Importánsia husi CPR ba Públiku
              </h2>
              <p className="text-emerald-100 text-lg">
                Ita mós bele salva moris. Aprende teknika báziku CPR hodi prepara an ba emerjénsia.
              </p>
              <button className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-50 transition-all w-fit group">
                <Play size={18} className="fill-emerald-900" />
                Haree Video Tutorial
              </button>
            </div>
          </motion.div>
        )}

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-emerald-500" size={40} />
                <p className="text-slate-400 font-bold">Buka dadus edukasaun...</p>
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all border border-slate-100 flex flex-col group"
                >
                  <div className="h-48 overflow-hidden relative">
                    {item.image ? (
                      <img src={`${BASE_URL}${item.image}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <BookOpen size={48} />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-emerald-700 uppercase">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                      <button className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Lee fali
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400 flex flex-col items-center gap-4">
                <SearchX size={64} className="opacity-20" />
                <p className="text-lg font-bold">Dadus edukasaun la iha</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
