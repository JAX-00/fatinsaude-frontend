import { useEffect, useState } from "react";
import {
  fetchDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "../services/districtService";

export default function DistrictPage() {
  const [districts, setDistricts] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // =============================
  // Load districts
  // =============================
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

  // =============================
  // Create or Update
  // =============================
  const handleSubmit = async () => {
    if (!name) return;

    try {
      if (editingId) {
        await updateDistrict(editingId, { name });
        setEditingId(null);
      } else {
        await createDistrict({ name });
      }

      setName("");
      loadDistricts();
    } catch (error) {
      console.error("Error saving district:", error);
    }
  };

  // =============================
  // Edit district
  // =============================
  const handleEdit = (district) => {
    setName(district.name);
    setEditingId(district.id);
  };

  // =============================
  // Delete district
  // =============================
  const handleDelete = async (id) => {
    try {
      await deleteDistrict(id);
      loadDistricts();
    } catch (error) {
      console.error("Error deleting district:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">District Management</h1>

      {/* ================= FORM ================= */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="District name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-2">
        {districts.map((d) => (
          <div
            key={d.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{d.name}</span>

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