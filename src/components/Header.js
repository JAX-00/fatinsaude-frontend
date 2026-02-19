import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo_mutin from "../assets/Logo_mutin.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Tutup menu ketika klik di luar menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#mobileMenu") && !e.target.closest("#burgerBtn")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <header className="bg-[#031A6A] text-white fixed w-full z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={logo_mutin}
              alt="Logo Mutin"
              className="h-[24px] sm:h-[28px]"
            />
            <h1 className="text-sm sm:text-xl font-bold">
              Saude Fatin Timor-Leste
            </h1>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-6 text-sm sm:text-base">
            <Link to="/" className="hover:underline">
              Mapa
            </Link>
            <Link to="/distritu" className="hover:underline">
              Distritu
            </Link>
            <Link to="/filtermoras" className="hover:underline">
              Filter Moras
            </Link>
            <Link to="/informasaun" className="hover:underline">
              Informasaun Geral
            </Link>
          </nav>

          {/* Burger Button */}
          <button
            id="burgerBtn"
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Spacer supaya konten tidak tertutup header */}
      <div className="h-16 sm:h-15" />

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobileMenu"
          className="
            fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40
          "
        >
          <div className="bg-[#031A6A] rounded-lg w-3/4 p-6 flex flex-col gap-4 text-center relative">
            {/* Tombol X */}
            <button
              className="absolute top-2 right-3 text-white text-2xl font-bold"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <Link
              to="/"
              className="text-white text-lg font-semibold hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/distritu"
              className="text-white text-lg font-semibold hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Distritu
            </Link>
            <Link
              to="/informasaun"
              className="text-white text-lg font-semibold hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Informasaun Geral
            </Link>
            <Link
              to="/filtermoras"
              className="text-white text-lg font-semibold hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Filter Moras
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
