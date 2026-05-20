import { motion } from "framer-motion";
import { Hospital, Map as MapIcon, BookOpen, Users, ArrowUpRight, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHospitals } from "../../services/hospitalService";
import { fetchDistricts } from "../../services/districtService";
import { fetchEducation } from "../../services/educationService";
import { fetchUsers } from "../../services/userService";

export default function AdminDashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [education, setEducation] = useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const loadAllStats = async () => {
      try {
        const [h, d, e, u] = await Promise.all([
          fetchHospitals(),
          fetchDistricts(),
          fetchEducation(),
          fetchUsers()
        ]);
        setHospitals(h);
        setDistricts(d);
        setEducation(e);
        setUsers(u);
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };
    loadAllStats();
  }, []);

  const getOwnershipStats = (ownershipValue) => {
    const subset = hospitals.filter(h => (h.ownership || "GOVERNO") === ownershipValue);
    const countType = (t) => subset.filter(h => (h.type || "HOSPITAL") === t).length;
    return {
      total: subset.length,
      hospital: countType("HOSPITAL"),
      clinic: countType("CLINIC"),
      centro: countType("CENTRO"),
      apotik: countType("APOTIK"),
    };
  };

  const ownershipCards = [
    { name: "Governo", icon: Activity, data: getOwnershipStats("GOVERNO"), color: "bg-emerald-500", lightBg: "bg-emerald-50" },
    { name: "Privadu", icon: Activity, data: getOwnershipStats("PRIVADU"), color: "bg-blue-500", lightBg: "bg-blue-50" },
    { name: "ONG / NGO", icon: Activity, data: getOwnershipStats("ONG"), color: "bg-purple-500", lightBg: "bg-purple-50" },
    { name: "Seluk (Other)", icon: Activity, data: getOwnershipStats("OTHER"), color: "bg-slate-500", lightBg: "bg-slate-50" },
  ];

  const generalStats = [
    { name: "Total Distritu", value: districts.length.toString(), icon: MapIcon, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Konten Edukasaun", value: education.length.toString(), icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "User Admin", value: users.length.toString(), icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bem-vindo, Admin! 👋</h1>
          <p className="text-slate-500 mt-2 font-medium">Monitoriza no jere dadus saúde Timor-Leste iha ne'e.</p>
        </div>
        <Link to="/" className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1">
          Haree Pájina Públiku <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ownershipCards.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0`}>
                <card.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Kepemilikan</p>
                <h3 className="text-xl font-black text-slate-900">{card.name}</h3>
              </div>
            </div>
            
            <div className="mb-6 flex-1">
              <p className="text-4xl font-extrabold text-slate-900">{card.data.total}</p>
              <p className="text-sm font-medium text-slate-500 mt-1">Total Fasilidade</p>
            </div>

            <div className={`grid grid-cols-2 gap-2 p-3 ${card.lightBg} rounded-2xl`}>
              <div className="text-center p-2 bg-white/60 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Hospital</p>
                <p className="text-lg font-black text-slate-800">{card.data.hospital}</p>
              </div>
              <div className="text-center p-2 bg-white/60 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Clinic</p>
                <p className="text-lg font-black text-slate-800">{card.data.clinic}</p>
              </div>
              <div className="text-center p-2 bg-white/60 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Centro</p>
                <p className="text-lg font-black text-slate-800">{card.data.centro}</p>
              </div>
              <div className="text-center p-2 bg-white/60 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Apotik</p>
                <p className="text-lg font-black text-slate-800">{card.data.apotik}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {generalStats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 leading-none">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group h-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-20 -mb-20 blur-3xl transition-all" />
          
          <div className="relative z-10 space-y-6 flex flex-col md:flex-row md:items-center justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Jere Dadus ho Fasil! 🚀</h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                Husi painél ne'e, ita bele halo jestaun ba dadus distritu, ospitál, no edukasaun saude iha Timor-Leste tomak. 
                Sempre tau matan ba dadus hodi nune'e informasaun iha pájina públiku nafatin loloos.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-6 md:mt-0 shrink-0">
              <Link to="/admin/hospitals/new" className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                Aumenta Hospital
              </Link>
              <Link to="/admin/education/new" className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-white/20 transition-all border border-white/10">
                Aumenta Edukasaun
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
