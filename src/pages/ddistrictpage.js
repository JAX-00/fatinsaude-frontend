import { useEffect, useState } from "react";
import {
  fetchDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "../services/districtService";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function DistrictPage() {
  const BASE_URL =
    process.env.REACT_APP_API_URL?.replace("/api/v1", "") || "";

  const [districts, setDistricts] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =============================
  // Load districts
  // =============================
  const loadDistricts = async () => {
    try {
      const data = await fetchDistricts();
      setDistricts(data);
    } catch (error) {
      console.error("Error loading districts:", error);
      toast.error("Gagal memuat data");
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  // =============================
  // Create / Update
  // =============================
  const handleSubmit = async () => {
    if (!name || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      if (editingId) {
        await updateDistrict(editingId, formData);
        toast.success("District berhasil diupdate");
        setEditingId(null);
      } else {
        await createDistrict(formData);
        toast.success("District berhasil ditambahkan");
      }

      setName("");
      setImage(null);
      loadDistricts();
    } catch (error) {
      console.error(error);
      toast.error("Gagal simpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =============================
  // Edit
  // =============================
  const handleEdit = (district) => {
    setName(district.name);
    setEditingId(district.id);
    window.scrollTo(0, 0);
  };

  // =============================
  // Delete Confirm Action
  // =============================
  const confirmDeleteAction = async () => {
    try {
      await deleteDistrict(confirmDelete);
      toast.success("District berhasil dihapus");
      loadDistricts();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus data");
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          District Management
        </h1>

        {/* ================= FORM ================= */}
        <div className="flex flex-col gap-3 mb-6 border p-4 rounded-lg bg-gray-50 shadow-sm">
          <input
            className="border p-2 rounded"
            placeholder="District name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="file"
            className="border p-2 rounded bg-white"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting
              ? "Processing..."
              : editingId
              ? "Update District"
              : "Add District"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setName("");
                setImage(null);
              }}
              className="text-sm text-gray-500 underline"
            >
              Batal Edit
            </button>
          )}
        </div>

        {/* ================= LIST ================= */}
        <div className="space-y-2">
          {districts.map((d) => (
            <div
              key={d.id}
              className="flex justify-between items-center border p-3 rounded shadow-sm"
            >
              <div className="flex items-center gap-3">
                {d.image && (
                  <img
                    src={`${BASE_URL}${d.image}`}
                    alt={d.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <span className="font-medium">{d.name}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => setConfirmDelete(d.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONFIRM DELETE ================= */}
      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Hapus District"
        message="Apakah Anda yakin ingin menghapus district ini?"
        onConfirm={confirmDeleteAction}
        onCancel={() => setConfirmDelete(null)}
      />
    </>
  );
}