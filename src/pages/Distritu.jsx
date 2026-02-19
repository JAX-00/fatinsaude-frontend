import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DistrictCard from "../components/district/DistrictCard";
import DistrictDetailModal from "../components/district/DistrictDetailModal";
import { countByType } from "../utils/districtHelpers";
import PageHeader from "../components/ui/PageHeader";

import useFetch from "../hooks/useFetch";
import { fetchDistricts } from "../services/districtService";

import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";

export default function Distritu() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const navigate = useNavigate();

  // ✅ HANYA SATU useFetch
  const { data: districts = [], loading, error } = useFetch(fetchDistricts);

  if (loading) return <Loader />;
  if (error) return <ErrorState />;

  return (
    <div className="p-4 max-w-7xl mx-auto">

      <PageHeader
        title="Fasilidade Saude Iha Distritu Timor-Leste"
        description="Página ida ne’e buka lista fasilidade saúde iha kada distritu, inklui hospital no klinik."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {districts.map((district) => {
          const stats = countByType(district.hospitals || []);

          return (
            <DistrictCard
              key={district.id}
              district={district}
              stats={stats}
              onClick={() =>
                navigate("/", {
                  state: {
                    district, // langsung kirim object dari API
                  },
                })
              }
              onDetail={() => setSelectedDistrict(district)}
            />
          );
        })}
      </div>

      <DistrictDetailModal
        district={selectedDistrict}
        onClose={() => setSelectedDistrict(null)}
        onSelectHospital={(h) => {
          setSelectedDistrict(null);
          navigate("/", {
            state: {
              focusHospital: {
                hospital: h,
              },
            },
          });
        }}
      />
    </div>
  );
}
