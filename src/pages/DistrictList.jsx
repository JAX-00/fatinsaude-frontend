import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDistricts, deleteDistrict } from "../services/districtService";
import toast, { Toaster } from "react-hot-toast";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function DistrictListPage() {
  const BASE_URL = process.env.REACT_APP_API_URL?.replace("/api/v1", "") || "";
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const ITEMS_PER_PAGE = 5;

  // =============================
  // LOAD DATA
  // =============================
  const loadDistricts = async () => {
    try {
      const data = await fetchDistricts();
      setDistricts(data);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Gagal load data";
      toast.error(message);
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  // =============================
  // FILTER SEARCH
  // =============================
  const filtered = districts.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // =============================
  // PAGINATION
  // =============================
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // =============================
  // DELETE ACTION (AMBIL ERROR BACKEND)
  // =============================
  const confirmDeleteAction = async () => {
    try {
      await deleteDistrict(confirmDelete);

      toast.success("District berhasil dihapus");
      loadDistricts();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Gagal hapus district";

      toast.error(message);
    } finally {
      setConfirmDelete(null);
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <>
      <Toaster position="top-right" />

      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">
            District Management
          </h1>

          <button
            onClick={() => navigate("/district/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add District
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page saat search
          }}
          className="border p-2 mb-4 w-full rounded"
        />

        {/* TABLE */}
        <table className="w-full border rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((d) => (
              <tr key={d.id}>
                {/* IMAGE */}
                <td className="p-2 border text-center">
                  {d.image ? (
                    <img
                      src={`${BASE_URL}${d.image}`}
                      alt={d.name}
                      className="w-12 h-12 object-cover rounded mx-auto"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No Image
                    </span>
                  )}
                </td>

                {/* NAME */}
                <td className="p-2 border">{d.name}</td>

                {/* ACTION */}
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/district/edit/${d.id}`)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setConfirmDelete(d.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Hapus District"
        message="Apakah yakin ingin menghapus district ini?"
        onConfirm={confirmDeleteAction}
        onCancel={() => setConfirmDelete(null)}
      />
    </>
  );
}