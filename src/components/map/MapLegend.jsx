export default function MapLegend() {
  return (
    <div
      className="
        absolute z-10
        bottom-3 left-3
        bg-white rounded-lg shadow-lg
        p-2 w-40
        text-[10px] space-y-1

        sm:bottom-4 sm:left-4
        sm:p-3 sm:w-52
        sm:text-sm sm:space-y-2
      "
    >
      <p className="font-bold mb-1 sm:mb-2">
        Informasaun Mapa
      </p>

      <LegendItem
        icon="http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
        label="Apotik"
      />
      <LegendItem
        icon="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        label="Clinic"
      />
      <LegendItem
        icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        label="Hospital"
      />
      <LegendItem
        icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        label="Centro"
      />

      <div className="flex items-center gap-1 sm:gap-2">
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-600"></span>
        <span>Hau iha ne'e</span>
      </div>
    </div>
  );
}

function LegendItem({ icon, label }) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <img
        src={icon}
        alt={label}
        className="w-4 h-4 sm:w-5 sm:h-5"
      />
      <span>{label}</span>
    </div>
  );
}
