import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEducation, updateEducation, fetchEducationById } from "../../services/educationService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Type, 
  Layers, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Save, 
  ArrowLeft, 
  Loader2 
} from "lucide-react";

export default function EducationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Atendimentu Primeiru",
    description: "",
    content: "",
    videoUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchEducationById(id).then(data => {
        setFormData({
          title: data.title,
          category: data.category,
          description: data.description || "",
          content: data.content || "",
          videoUrl: data.videoUrl || "",
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
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (imageFile) data.append("file", imageFile);

      if (id) {
        await updateEducation(id, data);
        toast.success("Konten atualiza ho susesu");
      } else {
        await createEducation(data);
        toast.success("Konten foun aumenta ona");
      }
      navigate("/admin/education");
    } catch (err) {
      toast.error("Gagal simpan konten");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
      >
        <div className="bg-emerald-600 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{id ? "Edit Konten" : "Aumenta Konten Foun"}</h1>
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest mt-1">Portal Edukasaun Saude</p>
          </div>
          <button onClick={() => navigate("/admin/education")} className="p-2 hover:bg-white/20 rounded-xl transition-all">
            <ArrowLeft size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Type size={16} className="text-emerald-600" /> Titulu Konten
                </label>
                <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Layers size={16} className="text-emerald-600" /> Kategoria
                </label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium">
                  <option value="Atendimentu Primeiru">Atendimentu Primeiru (First Aid)</option>
                  <option value="CPR">CPR / RJP</option>
                  <option value="Prevensaun">Prevensaun Moras</option>
                  <option value="Geral">Informasaun Geral</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <FileText size={16} className="text-emerald-600" /> Deskripsaun Badak
                </label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium h-32" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <ImageIcon size={16} className="text-emerald-600" /> Imajen Kapa
                </label>
                <div className="relative group h-48 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center gap-2">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={32} className="text-slate-300" />
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Video size={16} className="text-emerald-600" /> Video URL (YouTube)
                </label>
                <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <BookOpen size={16} className="text-emerald-600" /> Konten Kompletu (Text)
            </label>
            <textarea name="content" value={formData.content} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium h-64" placeholder="Hakere detalhu atendimentu iha ne'e..." />
          </div>

          <div className="flex gap-4 pt-8">
            <button type="button" onClick={() => navigate("/admin/education")} className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all">Kansela</button>
            <button type="submit" disabled={loading} className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              {id ? "Atualiza Dadus" : "Rai Konten Foun"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
