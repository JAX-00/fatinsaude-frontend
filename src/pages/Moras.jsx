import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitals from "../data/hospitalData";

import { DISTRICTS, DISEASES } from "../utils/morasConstants";
import { filterHospitals } from "../utils/morasHelpers";

import Filtermoras from "../components/filtermoras/Filtermoras";
import HospitalCard from "../components/filtermoras/HospitalCard";
import PageHeader from "../components/ui/PageHeader";

export default function Moras() {
  const navigate = useNavigate();

  const [district, setDistrict] = useState("");
  const [disease, setDisease] = useState("");

  const filteredHospitals = filterHospitals(
    hospitals,
    district,
    disease
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
     <PageHeader title="Fasilidade Saude ne’ebe bele Atende Kazu ka Moras" description="Página ne’e ajuda Buka kazu ka moras ne’ebé ita hasoru, no hetan
        ospital, klinik ka apotek ne’ebé bele atende ita-nia moras ne’e."/>

      <Filtermoras
        districts={DISTRICTS}
        diseases={DISEASES}
        selectedDistrict={district}
        selectedDisease={disease}
        onDistrictChange={setDistrict}
        onDiseaseChange={setDisease}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((h) => (
          <HospitalCard
            key={h.id}
            hospital={h}
            onClick={() =>
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
        ))}

        {filteredHospitals.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            Laiha Hospital mak hanesan filterasaun.
          </p>
        )}
      </div>
    </div>
  );
}
