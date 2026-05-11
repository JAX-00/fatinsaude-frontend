import { motion } from "framer-motion";
import { Hospital, Map as MapIcon, BookOpen, Users, ArrowUpRight, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHospitals } from "../../services/hospitalService";
import { fetchDistricts } from "../../services/districtService";
import { fetchEducation } from "../../services/educationService";
import { fetchUsers } from "../../services/userService";
import MapView from "../../components/map/MapView";
import { Marker } from "@react-google-maps/api";

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

  const stats = [
    { name: "Total Hospital", value: hospitals.length.toString(), icon: Hospital, color: "bg-blue-500", path: "/admin/hospitals" },
    { name: "Total Distritu", value: districts.length.toString(), icon: MapIcon, color: "bg-emerald-500", path: "/districts" },
    { name: "Konten Edukasaun", value: education.length.toString(), icon: BookOpen, color: "bg-purple-500", path: "/admin/education" },
    { name: "User Admin", value: users.length.toString(), icon: Users, color: "bg-orange-500", path: "/admin/users" },
  ];

  const mapContainerStyle = { width: "100%", height: "100%" };
  const center = { lat: -8.8742, lng: 125.7275 }; // Timor-Leste center

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
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={28} />
              </div>
              <Link to={stat.path} className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                <ArrowUpRight size={20} />
              </Link>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Monitor */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-4 border border-slate-100 shadow-sm overflow-hidden h-[450px] relative">
          <div className="absolute top-8 left-8 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
            <Activity size={16} className="text-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-900">Monitorizasaun Real-time</span>
          </div>
          <MapView
            center={center}
            zoom={8.5}
          >
            {hospitals
              .filter(h => !isNaN(Number(h.latitude)) && !isNaN(Number(h.longitude)))
              .map(h => (
                <Marker 
                  key={h.id} 
                  position={{ lat: Number(h.latitude), lng: Number(h.longitude) }} 
                  icon="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                />
              ))}
          </MapView>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="relative z-10 space-y-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold">Dika hosi ita! 💡</h2>
            <p className="text-slate-400 leading-relaxed">
              Sempre tau matan ba dadus koordinat (Latitude/Longitude) hodi nune'e mapa iha pájina públiku bele hatudu fatin ne'ebé loloos.
            </p>
            <div className="mt-auto space-y-4">
              <Link to="/admin/hospitals/new" className="block w-full bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                Aumenta Hospital
              </Link>
              <Link to="/admin/education/new" className="block w-full bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-white/20 transition-all border border-white/10">
                Aumenta Edukasaun
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
