import { motion } from "framer-motion";

export default function PageHeader({ title, description }) {
  return (
    <div className="text-center space-y-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full shadow-sm shadow-emerald-500/20" />
      </motion.div>

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
