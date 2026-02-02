import { Link } from "react-router-dom";
import { useState } from "react";
import logo_mutin from "../assets/Logo_mutin.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#031A6A] text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex">
          <img src={logo_mutin} alt="Logo Mutin" className="h-[28px] mr-2" />
          <h1 className="text-xl font-bold">Saude Fatin Timor-Leste</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">
            Mapa
          </Link>
          <Link to="/distritu" className="hover:underline">
            Distritu
          </Link>
          <Link to="/kazugrave" className="hover:underline">
            Tipu Kazu
          </Link>
          <Link to="/informasaun" className="hover:underline">
            Informasaun Geral
          </Link>
        </nav>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-3">
          <Link to="/" className="block hover:underline">
            Home
          </Link>
          <Link to="/distritu" className="block hover:underline">
            Distritu
          </Link>
          <Link to="/informasaun" className="block hover:underline">
            Informasaun Geral
          </Link>
          <Link to="/filtermoras" className="block hover:underline">
            Filter Moras
          </Link>
        </div>
      )}
    </header>
  );
}
