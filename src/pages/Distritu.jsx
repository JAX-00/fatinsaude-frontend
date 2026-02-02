import { useState } from "react";
import { useNavigate } from "react-router-dom";

import hospitals from "../data/hospitalData";
import districtMeta from "../data/districtMeta";
import { buildDistrictsFromHospitals } from "../utils/buildDistricts";
import DistrictCard from "../components/district/DistrictCard";
import DistrictDetailModal from "../components/district/DistrictDetailModal";
import { countByType } from "../utils/districtHelpers";
import PageHeader from "../components/ui/PageHeader";



export default function Distritu() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const navigate = useNavigate();

  const districts = buildDistrictsFromHospitals(hospitals).map((d) => ({
    ...d,
    ...districtMeta[d.name],
  }));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      
      <PageHeader title="Fasilidade Saude Iha Distritu Timor-Leste" description="Página ida ne’e buka lista fasilidade saúde iha kada distritu, inklui hospital no klinik."/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {districts.map((district, idx) => {
          const stats = countByType(district.hospitals);

          return (
            <DistrictCard
              key={idx}
              district={district}
              stats={stats}
              onClick={() =>
                navigate("/", {
                  state: {
                    district: {
                      name: district.name,
                      hospitals: district.hospitals,
                      center: district.center,
                      zoom: district.zoom || 12,
                    },
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
        onSelectHospital={(h) =>
          navigate("/", {
            state: {
              focusHospital: {
                position: h.position,
                zoom: 16,
                hospital: h,
              },
            },
          })
        }
      />
    </div>
  );
}

