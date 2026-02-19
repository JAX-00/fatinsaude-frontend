import { useEffect, useState } from "react";

export default function useFetch(fetchFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    fetchFn()
      .then((res) => active && setData(res))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));

    return () => (active = false);
  }, [fetchFn]);

  return { data, loading, error };
}
