import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-4 text-sm border-t border-white/5">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="font-medium tracking-wide">
          © 2026 <span className="text-white font-bold">Saude-Fatin</span>. Direitu hotu reservadu.
        </p>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span>Servisu ba Komunidade ho</span>
          <Heart size={14} className="fill-emerald-400" />
          <span>iha Timor-Leste</span>
        </div>
      </div>
    </footer>
  );
}
