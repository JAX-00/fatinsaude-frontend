import { useState } from "react";

export default function useFirstAid() {
  const [selected, setSelected] = useState(null);

  const openDetail = (item) => setSelected(item);
  const closeDetail = () => setSelected(null);

  return {
    selected,
    openDetail,
    closeDetail,
  };
}
