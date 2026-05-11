import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDistrict,
  updateDistrict,
  fetchDistrictById,
} from "../services/districtService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { MapPin, Image as ImageIcon, Save, ArrowLeft, Loader2 } from "lucide-react";

export default function DistrictForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:4000";

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchDistrictById(id).then((data) => {
      setName(data.name);
      setLatitude(data.latitude || "");
      setLongitude(data.longitude || "");
      if (data.image) {
        setPreview(`${BASE_URL}${data.image}`);
      }
    });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await updateDistrict(id, formData);
        toast.success("Distritu atualiza ho susesu");
      } else {
        await createDistrict(formData);
        toast.success("Distritu foun aumenta ona");
      }

      navigate("/districts");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Erro wainhira rai dadus");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Header */}
        <div className="bg-emerald-600 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {id ? "Atualiza Distritu" : "Aumenta Distritu Foun"}
            </h1>
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest mt-1">Formulariu Dadus Distritu</p>
          </div>
          <button
            onClick={() => navigate("/districts")}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            {/* NAME */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" />
                Naran Distritu <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Baucau, Dili..."
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-700 font-medium"
                required
              />
            </div>

            {/* COORDINATES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Latitude <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Ex: -8.123"
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-700 font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Longitude <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Ex: 125.123"
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-700 font-medium"
                  required
                />
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <ImageIcon size={16} className="text-emerald-600" />
                Imajen Distritu
              </label>
              
              <div className="relative flex flex-col items-center gap-6 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-emerald-300 transition-all group">
                {preview ? (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold text-xs">Klik atu troka imajen</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 shadow-sm transition-colors">
                      <ImageIcon size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-600">Klik atu upload imajen</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG to'o 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/districts")}
              className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
            >
              Kansela
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {id ? "Atualiza Dadus" : "Rai Dadus Foun"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}