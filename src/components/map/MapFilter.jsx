import { motion } from "framer-motion";
import { LayoutGrid, Hospital, Pill, Stethoscope, Landmark } from "lucide-react";
import { clsx } from "clsx";

export default function MapFilter({ value, onChange }) {
  const filters = [
    { id: "ALL", name: "Hotu", icon: <LayoutGrid size={16} /> },
    { id: "HOSPITAL", name: "Hospital", icon: <Hospital size={16} /> },
    { id: "APOTIK", name: "Apotik", icon: <Pill size={16} /> },
    { id: "CLINIC", name: "Klinik", icon: <Stethoscope size={16} /> },
    { id: "CENTRO", name: "Centro", icon: <Landmark size={16} /> },
  ];

  return (
    <div className="absolute z-20 top-4 left-4 right-4 sm:right-auto pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex flex-wrap gap-2 p-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white pointer-events-auto"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
              value === f.id
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            {f.icon}
            <span className="hidden sm:inline">{f.name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
