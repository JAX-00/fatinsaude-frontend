export default function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3 text-sm space-y-2 w-52">
      <p className="font-bold mb-1">Informasaun Mapa</p>

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

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
        <span>Hau iha ne'e</span>
      </div>
    </div>
  );
}

function LegendItem({ icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <img src={icon} alt={label} className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );
}
