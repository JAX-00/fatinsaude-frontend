import { useEffect, useState } from "react";
import {
  fetchDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "../services/districtService";
import toast from "react-hot-toast";

export default function DistrictPage() {
  const BASE_URL = process.env.REACT_APP_API_URL.replace("/api/v1", "");
  const [districts, setDistricts] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Load districts
  const loadDistricts = async () => {
    try {
      const data = await fetchDistricts();
      setDistricts(data);
    } catch (error) {
      console.error("Error loading districts:", error);
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  // Create or Update
  const handleSubmit = async () => {
    if (!name) return;

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (image) {
        formData.append("image", image);
      }

      if (editingId) {
        await updateDistrict(editingId, formData);
        setEditingId(null);
      } else {
        await createDistrict(formData);
      }

      setName("");
      setImage(null);

      loadDistricts();
    } catch (error) {
      console.error("Error saving district:", error);
    }
  };

  // Edit
  const handleEdit = (district) => {
    setName(district.name);
    setEditingId(district.id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus district ini?")) return;

    try {
      await deleteDistrict(id);
      toast.success("District berhasil dihapus");
      loadDistricts();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">District Management</h1>
      {/* FORM */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="District name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          className="border p-2 rounded"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {districts.map((d) => (
          <div
            key={d.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              {d.image && (
                <img
                  src={`${BASE_URL}${d.image}`}
                  alt={d.name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}

              <span>{d.name}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(d)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(d.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}