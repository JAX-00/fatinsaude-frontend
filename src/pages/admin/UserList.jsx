import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, createUser, updateUser } from "../../services/userService";
import { Plus, Trash2, Key, Loader2, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "ADMIN" });

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      toast.error("Gagal load data user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Ita hakarak hamos user ne'e?")) return;
    try {
      await deleteUser(id);
      toast.success("User hamos ho susesu");
      loadUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal hamos user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        toast.success("User atualiza ona");
      } else {
        await createUser(formData);
        toast.success("User foun aumenta ona");
      }
      setShowModal(false);
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "", role: "ADMIN" });
      loadUsers();
    } catch (err) {
      toast.error("Gagal simpan user");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jestaun User Admin</h1>
          <p className="text-slate-500 text-sm">Maneja se mak bele asesu ba dashboard ne'e.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
        >
          <Plus size={20} />
          Aumenta Admin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {loading ? (
             <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
               <Loader2 className="animate-spin text-emerald-500" size={40} />
               <p className="text-slate-400 font-bold">Loader dadus...</p>
             </div>
          ) : users.map((user) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <UserIcon size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{user.name || "Sem Nome"}</p>
                  <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {user.role}
                </span>
                <div className="flex gap-2">
                   <button 
                    onClick={() => {
                      setEditingUser(user);
                      setFormData({ name: user.name || "", email: user.email, password: "", role: user.role });
                      setShowModal(true);
                    }}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                   >
                    <Key size={14} />
                   </button>
                   <button 
                    onClick={() => handleDelete(user.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                   >
                    <Trash2 size={14} />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="bg-emerald-600 p-8 text-white">
              <h2 className="text-xl font-bold">{editingUser ? "Atualiza User" : "Aumenta User Foun"}</h2>
              <p className="text-emerald-100 text-xs mt-1">Preense dadus tuir mai ne'e</p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Naran Kompletu</label>
                <input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  {editingUser ? "Password Foun (Kosongkan jika tidak ganti)" : "Password"}
                </label>
                <input 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium"
                  required={!editingUser}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 transition-all">Kansela</button>
                <button type="submit" className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">
                  Rai Dadus
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
