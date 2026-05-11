import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Hospital, 
  BookOpen, 
  Users,
  LogOut, 
  Settings,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Log out ho susesu");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Distritu", path: "/districts", icon: MapIcon },
    { name: "Hospital", path: "/admin/hospitals", icon: Hospital },
    { name: "Edukasaun", path: "/admin/education", icon: BookOpen },
    { name: "User Admin", path: "/admin/users", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col relative z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
            S
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-white tracking-tight">SaudeAdmin</span>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                location.pathname === item.path
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} className={location.pathname === item.path ? "text-white" : "text-slate-400 group-hover:text-emerald-400"} />
              {isSidebarOpen && <span className="text-sm font-bold">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400 font-bold text-sm"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Sair</span>}
          </button>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white"
        >
          {isSidebarOpen ? <ChevronRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">
              {navItems.find(i => i.path === location.pathname)?.name || "Pagina"}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Administrator</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Saude-Fatin System</p>
             </div>
             <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
