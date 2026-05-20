import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { filterHospitals as apiFilterHospitals } from "../services/hospitalService";
import { fetchDistricts } from "../services/districtService";
import { DISEASES } from "../utils/morasConstants";
import Filtermoras from "../components/filtermoras/Filtermoras";
import HospitalCard from "../components/filtermoras/HospitalCard";
import PageHeader from "../components/ui/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX, Loader2 } from "lucide-react";

export default function Moras() {
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [debouncedDisease, setDebouncedDisease] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Districts
  useEffect(() => {
    fetchDistricts().then((data) => setDistricts(data));
  }, []);

  // Debounce Disease Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDisease(selectedDisease);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(handler);
  }, [selectedDisease]);

  // Load Filtered Hospitals
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    
    setLoading(true);
    setHospitals([]); 

    apiFilterHospitals(selectedDistrictId, debouncedDisease)
      .then((data) => {
        if (isMounted) {
          setHospitals(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;
        
        console.error("Filter Error:", err);
        if (isMounted) {
          setHospitals([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [selectedDistrictId, debouncedDisease]);

  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="p-8 max-w-7xl mx-auto space-y-12">
        <PageHeader
          title="Buka Fasilidade tuir Moras"
          description="Página ne’e ajuda ita atu buka fasilidade saúde (Hospital, Klinik ka Apotik) ne’ebé bele atende moras ka nesesidade ne’ebé ita hasoru."
        />

        <Filtermoras
          districts={districts.map((d) => ({ id: d.id, name: d.name }))}
          diseases={DISEASES}
          selectedDistrict={selectedDistrictId}
          selectedDisease={selectedDisease}
          onDistrictChange={setSelectedDistrictId}
          onDiseaseChange={setSelectedDisease}
        />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Rezultadu Pesquiza</h2>
            <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold">
              {hospitals.length} Fasilidade hetan
            </span>
          </div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
                >
                  <Loader2 size={40} className="text-emerald-500 animate-spin" />
                  <p className="text-slate-400 font-medium">Buka dadus...</p>
                </motion.div>
              ) : hospitals.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {hospitals.map((h, index) => (
                    <motion.div
                      key={h.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <HospitalCard
                        hospital={h}
                        onClick={() =>
                          navigate("/", {
                            state: {
                              focusHospital: {
                                hospital: h,
                              },
                            },
                          })
                        }
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-slate-400"
                >
                  <SearchX size={64} className="opacity-20" />
                  <div className="text-center">
                    <p className="text-lg font-bold">Dadus hospital la iha</p>
                    <p className="text-sm">Koko fali ho filter seluk.</p>
                  </div>
                  {(selectedDisease || selectedDistrictId) && (
                    <button 
                      onClick={() => {
                        setSelectedDisease("");
                        setSelectedDistrictId("");
                      }}
                      className="mt-4 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-200 transition-colors"
                    >
                      Hamoos Filter
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
