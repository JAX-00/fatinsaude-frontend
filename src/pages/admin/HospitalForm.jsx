import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDistricts } from "../../services/districtService";
import { createHospital, updateHospital, fetchHospitalById } from "../../services/hospitalService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  Image as ImageIcon, 
  Save, 
  ArrowLeft, 
  Loader2,
} from "lucide-react";

export default function HospitalForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    districtId: "",
    type: "HOSPITAL",
    latitude: "",
    longitude: "",
    phone: "",
    ambulance: "",
    emergency: "Yes",
    operationTime: "24 hours",
    diseases: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchDistricts().then(setDistricts);
    if (id) {
      setLoading(true);
      fetchHospitalById(id).then(data => {
        setFormData({
          name: data.name,
          districtId: data.districtId,
          type: data.type,
          latitude: data.latitude,
          longitude: data.longitude,
          phone: data.phone || "",
          ambulance: data.ambulance || "",
          emergency: data.emergency ? "Yes" : "No",
          operationTime: data.operationTime || "24 hours",
          diseases: Array.isArray(data.diseases) ? data.diseases.join(", ") : "",
        });
        if (data.image) setPreview(`http://localhost:4000${data.image}`);
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === "diseases") {
          data.append(key, JSON.stringify(formData[key].split(",").map(s => s.trim())));
        } else {
          data.append(key, formData[key]);
        }
      });
      if (imageFile) data.append("file", imageFile);

      if (id) {
        await updateHospital(id, data);
        toast.success("Hospital atualiza ho susesu");
      } else {
        await createHospital(data);
        toast.success("Hospital foun aumenta ona");
      }
      navigate("/admin/hospitals");
    } catch (err) {
      console.error("Save error:", err);
      toast.error(err?.response?.data?.message || "Gagal simpan data");
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-500" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
      >
        <div className="bg-emerald-600 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{id ? "Edit Hospital" : "Aumenta Hospital Foun"}</h1>
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest mt-1">Formulariu Dadus Fasilidade Saude</p>
          </div>
          <button onClick={() => navigate("/admin/hospitals")} className="p-2 hover:bg-white/20 rounded-xl transition-all">
            <ArrowLeft size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          {/* Main Info */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Informasaun Jeral
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Naran Fasilidade <span className="text-red-500">*</span></label>
                <input name="name" value={formData.name} onChange={handleChange} required placeholder="Ex: Hospital Nacional Guido Valadares" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Distritu <span className="text-red-500">*</span></label>
                <select name="districtId" value={formData.districtId} onChange={handleChange} required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium">
                  <option value="">Hili Distritu</option>
                  {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Tipu <span className="text-red-500">*</span></label>
                <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium">
                  <option value="HOSPITAL">Hospital</option>
                  <option value="CLINIC">Clinic</option>
                  <option value="APOTIK">Apotik</option>
                  <option value="CENTRO">Centro de Saude</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Emerjénsia (ER)</label>
                <select name="emergency" value={formData.emergency} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium">
                  <option value="Yes">Sim (Ya)</option>
                  <option value="No">Lae (Tidak)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location & Contact */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Localizasaun & Kontatu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Latitude <span className="text-red-500">*</span></label>
                <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} required placeholder="Ex: -8.556" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Longitude <span className="text-red-500">*</span></label>
                <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} required placeholder="Ex: 125.578" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Telefone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Ex: +670 77..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Ambulánsia</label>
                <input name="ambulance" value={formData.ambulance} onChange={handleChange} placeholder="Ex: 115 / +670..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Servisu & Horariu
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Especialidade / Moras (Komma separated)</label>
                <textarea name="diseases" value={formData.diseases} onChange={handleChange} placeholder="Malaria, Dengue, TBC..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium h-24" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Orariu Operasional</label>
                <input name="operationTime" value={formData.operationTime} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>
            </div>
          </section>

          {/* Image */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Imajen Fasilidade
            </h2>
            <div className="flex flex-col items-center gap-6 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-emerald-300 transition-all group relative">
              {preview ? (
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <p className="text-white font-bold">Klik atu troka imajen</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 shadow-sm transition-colors">
                    <ImageIcon size={32} />
                  </div>
                  <p className="text-sm font-bold text-slate-600">Klik atu upload imajen fasilidade</p>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              )}
            </div>
          </section>

          <div className="flex gap-4 pt-8">
            <button type="button" onClick={() => navigate("/admin/hospitals")} className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all">Kansela</button>
            <button type="submit" disabled={loading} className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              {id ? "Atualiza Dadus" : "Rai Hospital Foun"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
