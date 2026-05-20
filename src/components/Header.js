import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo_mutin from "../assets/Logo_mutin.png";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard, Map as MapIcon, Info, Filter, Home as HomeIcon } from "lucide-react";
import { clsx } from "clsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Mapa", path: "/", icon: <MapIcon size={18} /> },
    { name: "Distritu", path: "/distritu", icon: <HomeIcon size={18} /> },
    { name: "Filter Moras", path: "/filtermoras", icon: <Filter size={18} /> },
    { name: "Informasaun Geral", path: "/informasaun", icon: <Info size={18} /> },
  ];

  return (
    <>
      <header className="bg-emerald-900/95 backdrop-blur-md text-white z-50 shadow-lg border-b border-white/10 flex-shrink-0">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group transition-all">
            <img
              src={logo_mutin}
              alt="Logo Mutin"
              className="h-8 sm:h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-lg font-bold leading-tight">
                Saude-Fatin
              </h1>
              <span className="text-[10px] sm:text-xs text-emerald-300 font-medium tracking-wider uppercase">
                Timor-Leste
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  location.pathname === link.path
                    ? "bg-white/15 text-white shadow-inner"
                    : "text-emerald-100 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="w-px h-6 bg-white/20 mx-2" />

            {user ? (
              <Link
                to="/admin"
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-emerald-500/20"
              >
                <LayoutDashboard size={18} />
                Dashboard Admin
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all border border-white/20"
              >
                Admin Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-label={menuOpen ? "Taka Menu" : "Loke Menu"}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-emerald-900 shadow-2xl p-6 flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo_mutin} alt="Logo" className="h-10" />
                <h2 className="font-bold text-white">Menu</h2>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={clsx(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                      location.pathname === link.path
                        ? "bg-emerald-800 text-white shadow-lg"
                        : "text-emerald-100 hover:bg-emerald-800/50"
                    )}
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
                {user ? (
                  <Link
                    to="/admin"
                    className="bg-emerald-500 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard Admin
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="bg-white/10 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
