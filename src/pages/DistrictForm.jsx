import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDistrict,
  updateDistrict,
  fetchDistrictById,
} from "../services/districtService";
import toast from "react-hot-toast";

export default function DistrictForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const BASE_URL =
    process.env.REACT_APP_API_URL?.replace("/api/v1", "") || "";

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =============================
  // LOAD DATA (EDIT MODE)
  // =============================
  useEffect(() => {
    if (!id) return;

    fetchDistrictById(id).then((data) => {
      setName(data.name);

      // tampilkan gambar lama
      if (data.image) {
        setPreview(`${BASE_URL}${data.image}`);
      }
    });
  }, [id, BASE_URL]);

  // =============================
  // HANDLE IMAGE CHANGE
  // =============================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    // preview gambar baru
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // =============================
  // SUBMIT
  // =============================
  const handleSubmit = async () => {
    if (!name || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);

      // hanya kirim image kalau ada perubahan
      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await updateDistrict(id, formData);
        toast.success("District berhasil diupdate");
      } else {
        await createDistrict(formData);
        toast.success("District berhasil ditambahkan");
      }

      navigate("/districts");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Gagal simpan";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {id ? "Edit District" : "Tambah District"}
      </h1>

      <div className="flex flex-col gap-4">
        {/* NAME */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama district"
          className="border p-2 rounded"
        />

        {/* IMAGE PREVIEW */}
        {preview && (
          <div className="text-center">
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded mx-auto border"
            />
            <p className="text-sm text-gray-500 mt-1">
              Preview Gambar
            </p>
          </div>
        )}

        {/* INPUT FILE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 bg-white rounded"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Loading..." : "Simpan"}
        </button>

        {/* BACK */}
        <button
          onClick={() => navigate("/districts")}
          className="text-gray-500 underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}