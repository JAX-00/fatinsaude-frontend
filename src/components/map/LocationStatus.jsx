import React from "react";

export default function LocationStatus({ status, showModal, onRetry }) {
  // Jika GPS aktif atau loading → tidak tampil apa-apa
  if (status === "granted" || status === "loading") return null;

  return (
    <>
      {/* Soft Warning Badge (atas kanan) */}
      <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded shadow text-sm z-40">
        ⚠ GPS tidak aktif. Aktifkan lokasi untuk rute.
      </div>

      {/* Modal untuk user klik Directions / retry */}
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-3">
              📍 Location Required
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Untuk mendapatkan rute dan rumah sakit terdekat, aktifkan lokasi anda.
            </p>
            <button
              onClick={onRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}
    </>
  );
}