import firstAidData from "../data/firstAidData";
import useFirstAid from "../hooks/useFirstAid";

import FirstAidCard from "../components/firstaid/FirstAidCard";
import FirstAidModal from "../components/firstaid/FirstAidModal";
import PageHeader from "../components/ui/PageHeader";

export default function InformasaunGeral() {
  const { selected, openDetail, closeDetail } = useFirstAid();

  return (
    <div className="p-4">
      <PageHeader title="Atendementu Primeiru (First Aids)" description="Informasaun básiku kona-ba atendimentu primeiru antes ambulánsia mai." />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {firstAidData.map((item) => (
          <FirstAidCard
            key={item.id}
            item={item}
            onDetail={openDetail}
          />
        ))}
      </div>

      <FirstAidModal item={selected} onClose={closeDetail} />
    </div>
  );
}
