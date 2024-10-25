/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const useFetch = (
  url: string,
  options: {
    method?: string;
    body?: string;
  } = { method: "GET" }
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetch(url, { ...options });
        if (!fetchedData.ok) {
          throw new Error("Network response not ok");
        }
        const data = await fetchedData.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, options]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
